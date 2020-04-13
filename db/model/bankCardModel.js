// 银行卡
const mongoose = require("mongoose");

var bankCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },  // 用户名
  AccountName: {
    type: String,
    required: true
  }, // 开户名称
  BankId: {
    type: String,
    required: true
  }, // 银行
  AccountCode: {
    type: String,
    required: true
  }, // 卡号
  ProvId: {
    type: String,
    required: true
  }, // 开户省份
  CityId: {
    type: String,
    required: true
  }, // 开户城市
  Fqhho: {
    type: String,
    required: true
  }, // 开户网点
  Mobile: {
    type: String,
  },  // 手机
  EwalletType: {
    type: String,
    default: '0'
  } // 账户类型
})
var BankCard = mongoose.model('bankCard', bankCardSchema)
module.exports = BankCard