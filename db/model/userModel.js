// 用户
const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },  // 用户名
  password: {
    type: String,
    required: true
  }, // 密码
  walletState: {
    type: String,
    default: 1
  }, // 电子钱包开通状态
  CharacterType: {
    type: Number,
    default: 2101,
  },
  EwalletCashbindState: {
    type: Number,
    default: 1
  } // 电子钱包的提现绑卡的状态
})
var User = mongoose.model('user', userSchema)
// User.insertMany({
//   name: 'lcb',
//   password: '12312321'
// }).then(data => {
//   console.log(data)
// }).catch(err => {
//   console.log(err)
// })
module.exports = User