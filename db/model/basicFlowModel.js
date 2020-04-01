// 流水 
const mongoose = require("mongoose");

var basicFlowSchema = new mongoose.Schema({
  FlowNumber: {
    type: String,
    default: `LS${new Date().getTime()}`
  }, // 流水号
  name: {
    type: String,
    required: true
  },  // 用户名
  AccountName: {
    type: String,
    required: true
  }, // 户名
  CapitalCode: {
    type: String
  }, // 资金账号
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
  Balance: {
    type: String,
    default: '0'
  }, // 余额
  LogType: {
    type: Number,
    required: true
  }, // 收支类型(枚举 EwalletLogIOType)
  SoureOrder: {
    type: String,
    default: 'xxxxxx'
  }, // 来源单号
  SoureType: {
    type: String
  }, // 来源(枚举 EwalletLogSourceType)
  PayAmount: {
    type: String,
    default: '0'
  }, // 交易金额
  ServeFee: {
    Type: Number,
    default: 0
  }, // 服务费
  Note: {
    type: String
  }, // 备注
  EwalletType: {
    type: Number,
    required: true
  }, // 账户类型(枚举 EwalletLogBalanceType)
})
var BasicFlow = mongoose.model('basicFlow', basicFlowSchema)
module.exports = BasicFlow