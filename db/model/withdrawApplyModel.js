// 电子钱包
const mongoose = require("mongoose");

var withdrawApplySchema = new mongoose.Schema({
  PetitionCode: {
    type: String,
    default: `TX${new Date().getTime()}`
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
  PayTime: {
    type: Number
  },
  FundOrderState: {
    type: String
  } // 提现单状态(枚举 FundCasheOrderBasicState)
})
var withdrawApply = mongoose.model('withdrawApply', withdrawApplySchema)
module.exports = withdrawApply