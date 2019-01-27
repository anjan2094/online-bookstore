const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/bookproject', { useNewUrlParser: true })

const UserSchema = new mongoose.Schema({
  "name":String,
  "want-to-read": [],
  "reading": [],
  "read": []
}, { collection: 'userList' })

const allUser = module.exports = mongoose.model('allUser', UserSchema);

module.exports.checkUser = function (name) {
  // console.log(name);
  return new Promise((resolve)=>{
    allUser.findOne({'name':name},{_id:0,name:1})
    .then(data=>{
      // console.log(data)
      resolve(data);
    })
  })
}

module.exports.signup = function (name) {
  return new Promise((resolve)=>{
    allUser.create({'name':name})
    .then(data=>{
      // console.log(data)
      resolve(data);
    })
  })
}

module.exports.addList = function (name, list, id) {
  return new Promise((resolve)=>{
    allUser.update({'name':name},{$push:{[list]:id}})
    .then(data=>{
      resolve(data);
    })
  })
}
module.exports.getList = function (name,list) {
  return new Promise((resolve)=>{
    allUser.find({'name':name},{_id:0,[list]:'$'+list})
    .then(data=>{
      resolve(data);
    })
  })
}
module.exports.deleteList = function (name,list,id) {
  console.log('list name--->', list)
  // console.log(typeof name);
  console.log(typeof id);
  console.log('name--->', name)
  console.log('isbn no--->', id)
  return new Promise((resolve)=>{
    allUser.update({"name":name},{$pull:{[list]:id}})
    .then(data=>{
      console.log('output', data)
      resolve(data);
    })
  })
}