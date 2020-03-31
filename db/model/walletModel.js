// 电子钱包
const mongoose = require("mongoose");

var walletSchema = new mongoose.Schema({
  PetitionCode: {
    type: String,
    default: `KT${new Date().getTime()}`
  }, // 单据编号
  name: {
    type: String,
    required: true
  },  // 用户名
  AccountName: {
    type: String,
    required: true
  },
  LastOpenTime: {
    type: Number,
    default: new Date().getTime()
  },
  BankEcode: {
    type: String,
    default: '123444422221'
  }, // 银行电子账号
  SubbkCode: {
    type: String
  }, // 归属支行号
  SubbkName: {
    type: String
  }, // 归属支行名称
  CreditCode: {
    type: String
  }, // 统一社会信用代码
  LegalName: {
    type: String
  }, // 法定代表人姓名
  Idcard: {
    type: String,
    required: true
  }, // 身份证号码
  Mobile: {
    type: String,
    required: true
  }, // 手机号码
  Email: {
    type: String,
    required: true
  }, // 邮箱
  ProvinceId: {
    type: String
  }, // 省编号
  ProvinceId: {
    type: String
  }, // 市编号
  ProvinceId: {
    type: String
  }, // 区编号
  ProvinceName: {
    type: String
  }, // 省
  CityName: {
    type: String
  }, // 市
  TownName: {
    type: String
  }, // 区
  Address: {
    type: String
  }, // 详细地址
  PayPassword: {
    type: String,
    required: true
  }, // 支付密码
  EwalletState: {
    type: String,
    default: '1'
  }, // 账户状态(枚举 EwalletMasterState)
  EwalletType: {
    type: String,
    default: '0'
  }, // 账户类型(枚举 EwalletMasterEwalletType)
  CharacterType: {
    type: Number,
    default: 2101,
  },
  CompanyCode: {
    type: String
  },
  CompanyName: {
    type: String
  },
  StoreCode: {
    type: String
  },
  StoreName: {
    type: String
  },
  CheckTime: {
    type: Number
  }, // 审核时间
  CheckUser: {
    type: String
  }, // 审核人
  TuneOrderState: {
    type: String
  } // 申请单状态(枚举 TunePetitionOrderBasicState)
})
var Wallets = mongoose.model('wallets', walletSchema)
module.exports = Wallets