const path = require('path');
const Sequelize = require('sequelize');

const sequelize = new Sequelize(undefined,undefined,undefined,{
  host:'localhost',
  dialect:'sqlite',
  storage:path.join(__dirname,'./../database/database.sqlite')
})

// sequelize
//   .authenticate()
//   .then(() => {
//     console.log('Connection has been established successfully.');
//   })
//   .catch(err => {
//     console.error('Unable to connect to the database:', err);
//   });

  const Note = sequelize.define('note', {
    text: {
      type: Sequelize.STRING
    },
    uid:{
      type:Sequelize.STRING
    }
  });
  
  // force: true will drop the table if it already exists
  Note.sync()
  //.then(() => {
  //   // Table created
  //   Note.create({
  //     text: 'John',
  //     uid: 'Hancock222'
  //   })
  // }).then(() => {
  //   Note.findAll({raw:true}).then(notes => {
  //     console.log(notes)
  //   })
  // })

  module.exports.Note = Note