var Toast = require('./toast.js').Toast;
var Note = require('./note.js').Note;
var Toast = require('./toast.js').Toast;
var Event = require('module/event.js');


var NoteManager = (function(){

  function load() {
    $.get('/api/notes')
      .done(function(ret){
        console.log('输出信息')
        console.log(ret);
        
        if(ret.status == 0){
          $.each(ret.data, function(idx, article) {
              new Note({
                id: article.id,
                context: article.text,
                username: article.username,
                date:article.createdAt.split(' ')[0]
              });
          });

          Event.fire('waterfall');
        }else{
          Toast(ret.errorMsg);
        }
      })
      .fail(function(){
        Toast('网络异常');
      });


  }

  function add(){
    new Note();
  }

  return {
    load: load,
    add: add
  }

})();

module.exports.NoteManager = NoteManager