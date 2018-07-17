require('less/note.less');

var Toast = require('./toast.js').Toast;
var Event = require('module/event.js');

function Note(opts){
  this.initOpts(opts);
  this.createNote();
  this.bindEvent();
}
Note.prototype = {

  defaultOpts: {
    id: '',   //Note的 id
    $ct: $('#content').length>0?$('#content'):$('body'),  //默认存放 Note 的容器
    context: 'input here'  //Note 的内容
  },

  initOpts: function (opts) {
    console.log(opts);
    this.opts = $.extend({}, this.defaultOpts, opts||{});
    if(this.opts.id){
       this.id = this.opts.id;
    }
  },

  createNote: function () {
    var tpl =  '<div class="note">'
              + '<div class="note-head"><span class="time"></span><i class="icon iconfont icon-close delete"></i></div>'
              + '<div class="note-ct" contenteditable="true"></div>'
              +'</div>';
    this.$note = $(tpl);
    this.$note.find('.note-ct').html(this.opts.context);
    this.$note.find('.time').text(this.opts.date);
    this.opts.$ct.append(this.$note);
    if(!this.id){
      let top = this.opts.$ct.height();
      this.$note.css('top', `${top}px`);  //新增放到右边
    }
  },
  setLayout: function(){
    var self = this;
    if(self.clk){
      clearTimeout(self.clk);
    }
    self.clk = setTimeout(function(){
      Event.fire('waterfall');
    },100);
  },

  bindEvent: function () {
    var self = this,
        $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete');

    $delete.on('click', function(){
      self.delete();
    })

    //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
    $noteCt.on('focus', function() {
      if($noteCt.html()=='input here') $noteCt.html('');
      $noteCt.data('before', $noteCt.html());
    }).on('blur paste', function() {
      if( $noteCt.data('before') != $noteCt.html() ) {
        $noteCt.data('before',$noteCt.html());
        self.setLayout();
        

        if(self.id){
          self.edit($noteCt.html())
          console.log($noteCt)
          console.log($noteCt.html())
        }else{
          self.add($noteCt.html())
        }
      }
    });

    //设置笔记的移动
    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
          evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY}); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function(){
       $note.removeClass('draggable').removeData('pos');
    });

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        left: e.pageX-$('.draggable').data('evtPos').x
      });
    });
  },

  edit: function (msg) {
    var self = this;
    $.post('/api/notes/edit',{
        id: self.id,
        note: msg
      }).done(function(ret){
      if(ret.status === 0){
        Toast('更新成功');
      }else{
        Toast(ret.errorMsg);
      }
    })
  },

  add: function (msg){
    console.log('addd...');
    var self = this;
    $.post('/api/notes/add', {note: msg})
      .done(function(ret){
        if(ret.status === 0){
          Toast('新增成功');
          self.$note.css('bottom', 'auto');
        }else{
          self.$note.remove();
          Event.fire('waterfall')
          Toast(ret.errorMsg);
        }
      });
    //todo
  },

  delete: function(){
    var self = this;
    $.post('/api/notes/delete', {id: this.id})
      .done(function(ret){
        if(ret.status === 0){
          Toast('删除成功');
          self.$note.remove();
          Event.fire('waterfall')
        }else{
          Toast(ret.errorMsg);
        }
    });

  }

};

module.exports.Note = Note;

