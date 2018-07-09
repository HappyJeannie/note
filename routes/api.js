var express = require('express');
var router = express.Router();
const Note = require('./../model/index.js').Note;

/* GET users listing. */
router.get('/notes', function(req, res, next) {
  Note.findAll({raw:true}).then(notes => {
    res.send({status:0,data:notes});
  }).catch(()=>{
    res.send({
      status:1,
      errorMsg:'数据库异常'
    })
  })
});

router.post('/notes/add', function(req, res, next) {
  if(req.body.note === ''){
    return res.send({
      status:1,
      errorMsg:'文本内容不能为空'
    })
  }
  let text = req.body.note;
  let uid = parseInt(Math.random()* 100000);
  Note.create({text:text,uid:uid})
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
  if(req.body.note === ''){
    return res.send({
      status:1,
      errorMsg:'文本内容不能为空'
    })
  }
  let text = req.body.note;
  let uid = req.body.id;
  Note.update({text:text,uid:uid},{where:{uid:uid}})
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
  let uid = req.body.id;
  Note.destroy({where:{uid:uid}})
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
