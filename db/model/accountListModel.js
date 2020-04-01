// 账户列表
const mongoose = require("mongoose");

var accountlistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },  // 用户名
  AccountName: {
    type: String,
    required: true
  }, // 资金账号
  LastOpenTime: {
    type: Number,
    default: new Date().getTime()
  }, // 开户时间
  CharacterType: {
    type: Number,
    default: 2101,
  }, // 商户类型
  BankEcode: {
    type: String,
    default: '123444422221'
  }, // 
  CompanyCode: {
    type: String,
    default: 'lcb-001'
  },
  CompanyName: {
    type: String,
    default: 'lcb'
  },
  StoreCode: {
    type: String,
    default: 'lcb-001'
  },
  StoreName: {
    type: String,
    default: 'lcb'
  },
  SubSumed: {
    type: Number,
    default: 0
  },
  BaseSumed: {
    type: Number,
    default: 0
  },
  OpSumed: {
    type: Number,
    default: 0
  },
  SubValid: {
    type: Number,
    default: 0
  },
  BaseValid: {
    type: Number,
    default: 0
  },
  OpValid: {
    type: Number,
    default: 0
  },
  SubLock: {
    type: Number,
    default: 0
  },
  BaseLock: {
    type: Number,
    default: 0
  },
  OpLock: {
    type: Number,
    default: 0
  },
  State: {
    type: String,
    default: '1'
  },
  EwalletType: {
    type: String,
    default: '0'
  }
})
var AccountList = mongoose.model('accountlist', accountlistSchema)
module.exports = AccountList