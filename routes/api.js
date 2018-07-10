var express = require('express');
var router = express.Router();
const Note = require('./../model/index.js').Note;

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  if(req.session.user){
    Note.findAll({raw:true},{
      where:{
        uid:req.session.user.id
      }
    }).then(notes => {
      res.send({status:0,data:notes});
    }).catch(function(){
      res.send({
        status:1,
        errorMsg:'数据库异常'
      })
    })
  }else{
    Note.findAll({raw:true}).then(notes => {
      res.send({status:0,data:notes});
    }).catch(function(){
      res.send({
        status:1,
        errorMsg:'数据库异常'
      })
    })
  }
});

router.post('/notes/add', function(req, res, next) {
  if(!req.session.user){
    return res.send({
      status:'1',
      errorMsg:'请先登录'
    })
  }
  let uid = req.session.user.id;
  let id = parseInt(Math.random()*1000000);
  if(req.body.note === ''){
    return res.send({
      status:1,
      errorMsg:'文本内容不能为空'
    })
  }
  let text = req.body.note;
  Note.create({text:text,uid:uid,id:id})
    .then((notes) => {
      res.send({
        status:0,
        data:notes
      })
    })
    .catch(() => {
      res.send({
        status:1,
        errorMsg:'数据库异常'
      })
    })
});

router.post('/notes/edit', function(req, res, next) {
  if(!req.session.user){
    return res.send({
      status:'1',
      errorMsg:'请先登录'
    })
  }
  let uid = req.session.user.id;
  let id = req.body.id;
  if(req.body.note === ''){
    return res.send({
      status:1,
      errorMsg:'文本内容不能为空'
    })
  }
  let text = req.body.note;
  console.log('api 的信息================')
  console.log(req.body)
  Note.update({text:text},{where:{uid:uid,id:id}})
    .then((notes) => {
      res.send({
        status:0,
        data:notes.data
      })
    })
    .catch(() => {
      res.send({
        status:1,
        errorMsg:'数据库异常'
      })
    })

});

router.post('/notes/delete', function(req, res, next) {
  if(!req.session.user){
    return res.send({
      status:'1',
      errorMsg:'请先登录'
    })
  }
  let uid = req.session.user.id;
  let id = req.body.id;
  Note.destroy({where:{uid:uid,id:id}})
    .then((notes) => {
      res.send({
        status:0,
        data:notes.data
      })
    })
    .catch(() => {
      res.send({
        status:1,
        errorMsg:'数据库异常'
      })
    })
});

module.exports = router;
