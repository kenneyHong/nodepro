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
  }, // 户名
  LastOpenTime: {
    type: Number,
    default: new Date().getTime()
  }, // 开通时间
  CreateTime: {
    type: Number,
    default: new Date().getTime()
  }, // 创建时间
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
  CityId: {
    type: String
  }, // 市编号
  AreaId: {
    type: String
  }, // 区编号
  ProvinceName: {
    type: String
  }, // 省
  CityName: {
    type: String
  }, // 市
  AreaName: {
    type: String
  }, // 区
  Address: {
    type: String
  }, // 详细地址
  PayPassword: {
    type: String,
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
  }, // 商户类型
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
    type: String,
    default: '3'
  } // 申请单状态(枚举 TunePetitionOrderBasicState)
})
var Wallet = mongoose.model('wallet', walletSchema)
module.exports = Wallet