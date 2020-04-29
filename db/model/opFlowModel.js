// 流水 
const mongoose = require("mongoose");

var opFlowSchema = new mongoose.Schema({
  FlowNumber: {
    type: String,
    default: `BSLS${new Date().getTime()}`
  }, // 流水号
  name: {
    type: String,
    required: true
  },  // 操作人
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
  }, // 操作时间
  Balance: {
    type: Number,
    default: 0
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
    type: Number,
    default: 0
  }, // 金额
  Note: {
    type: String
  }, // 备注
})
var OpFlow = mongoose.model('opFlow', opFlowSchema)
module.exports = OpFlow