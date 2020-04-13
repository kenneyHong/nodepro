// 充值
const mongoose = require("mongoose");

var rechargeRecordSchema = new mongoose.Schema({
  RechargeCode: {
    type: String,
    default: `CZ${new Date().getTime()}`
  }, // 单据编号
  name: {
    type: String,
    required: true
  },  // 用户名
  AccountName: {
    type: String,
    required: true
  }, // 户名
  CreateTime: {
    type: Number,
    default: new Date().getTime()
  }, // 创建时间
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
  Amount: {
    type: String,
    default: '0'
  }, // 金额
  BasicBalance: {
    type: String,
    default: '0'
  }, // 基本余额
  OperationBalance: {
    type: String,
    default: '0'
  }, // 运营余额
  ServeFee: {
    Type: Number,
    default: 0
  }, // 服务费
  Note: {
    type: String
  }, // 备注
  PaymentType: {
    type: Number,
    required: true
  },  // 充值方式(枚举 PaymentType)
  EwalletType: {
    type: Number,
    required: true
  }, // 账户类型(枚举 EwalletLogBalanceType)
  CbackIsOK: {
    type: Number,
    required: true
  }, // 支付状态(枚举 CbackIsOK)
})
var RechargeRecord = mongoose.model('rechargeRecord', rechargeRecordSchema)
module.exports = RechargeRecord