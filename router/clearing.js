const express = require('express');
const router = express.Router();
const AccountList = require('../db/model/accountListModel')
const Wallet = require('../db/model/walletModel')
const { sendError, sendCorrect } = require('../confings/utilities');
const { walletList, accountList, accountDeteil } = require('../datas/goods');

// 创建电子钱包账户列表数据
router.get('/createAccountList', (req, res, next) => {
  const data = { ...accountList }
  AccountList.insertMany(data).then(result => {
    res.send(sendCorrect('创建成功'));
  }).catch(err => {
    res.send(sendError('创建失败', err));
  })
})

/**
 * @api {get} /clearing/getAccountList 电子钱包列表
 * @apiName /clearing/getAccountList/
 * @apiGroup User
 *
 * @apiParam {String} CapitalCode 资金账号
 * @apiParam {String} AccountName 户名
 * @apiParam {String} BankEcode 银行电子账号
 * @apiParam {String} LastOpenTime 开户时间
 * @apiParam {String} CharacterType 商户类型(枚举 CharacterType)
 * @apiParam {String} CompanyCode 公司编码
 * @apiParam {String} CompanyName 公司名称
 * @apiParam {String} StoreCode 门店编码
 * @apiParam {String} StoreName 门店名称
 * @apiParam {String} State 账户状态
 * @apiParam {String} PageSize *分页条数
 * @apiParam {String} PageIndex *分页索引
 * @apiParam {String} OrderBy *排序字段(1: 开户时间 2: 资金账号)
 * @apiParam {String} IsAsced *是否升序(1: 正序 3: 倒序)
 * 
 * @apiSuccess {String} CapitalCode 资金账号
 * @apiSuccess {String} AccountName 户名
 * @apiSuccess {String} BankEcode 银行电子账号
 * @apiSuccess {String} LastOpenTime 开户时间
 * @apiSuccess {String} CharacterType 商户类型(枚举 CharacterType)
 * @apiSuccess {String} CompanyCode 公司编码
 * @apiSuccess {String} CompanyName 公司名称
 * @apiSuccess {String} StoreCode 门店编码
 * @apiSuccess {String} StoreName 门店名称
 * @apiSuccess {Number} SubSumed 账户余额(总金额)
 * @apiSuccess {Number} BaseSumed 账户余额(基本账户)
 * @apiSuccess {Number} OpSumed 账户余额(运营账户)
 * @apiSuccess {Number} SubValid 可用金额(总金额)
 * @apiSuccess {Number} BaseValid 可用金额(基本账户)
 * @apiSuccess {Number} OpValid 可用金额(运营账户)
 * @apiSuccess {Number} SubLock 锁定金额(总金额)
 * @apiSuccess {Number} BaseLock 锁定金额(基本账户)
 * @apiSuccess {Number} OpLock 锁定金额(运营账户)
 * @apiSuccess {Number} State 账户状态(枚举 EwalletMasterState)
 * @apiSuccess {Number} EwalletType 账户类型(枚举 EwalletMasterEwalletType) 
 * @apiSuccess {Number} Count 总数
 * 
 */

// 获取电子钱包账户列表数据
router.get('/getAccountList', (req, res, next) => {
  const query = req.query
  if(!query.OrderBy) {
    return res.send(sendError('OrderBy必传'));
  }
  if(!query.IsAsced) {
    return res.send(sendError('IsAsced必传'));
  }
  if(!query.PageSize) {
    return res.send(sendError('PageSize必传'));
  }
  if(!query.PageIndex) {
    return res.send(sendError('PageIndex必传'));
  }
  const obj = {}
  const orderArr = ['LastOpenTime', 'CapitalCode']
  if(query.CapitalCode && query.CapitalCode != '') {
    obj.CapitalCode = query.CapitalCode
  }
  if(query.AccountName && query.AccountName != '') {
    obj.AccountName = query.AccountName
  }
  if(query.BankEcode && query.BankEcode != '') {
    obj.BankEcode = query.BankEcode
  }
  if(query.LastOpenTime && query.LastOpenTime != '') {
    obj.LastOpenTime = query.LastOpenTime
  }
  if(query.CharacterType && query.CharacterType != '') {
    obj.CharacterType = query.CharacterType
  }
  if(query.CompanyCode && query.CompanyCode != '') {
    obj.CompanyCode = query.CompanyCode
  }
  if(query.CompanyName && query.CompanyName != '') {
    obj.CompanyName = query.CompanyName
  }
  if(query.StoreCode && query.StoreCode != '') {
    obj.StoreCode = query.StoreCode
  }
  if(query.StoreName && query.StoreName != '') {
    obj.StoreName = query.StoreName
  }
  if(query.State && (query.State != '' || query.State != 0)) {
    obj.State = query.State
  }
  AccountList.find(obj).limit(Number(query.PageSize)).skip((query.PageIndex - 1) * Number(query.PageSize)).sort({[orderArr[query.OrderBy - 1]]: query.IsAsced == 3 ? -1 : 1 }).exec().then(items => {
    AccountList.count().then(totle => {
      const objs = {
        Subset: items,
        Count: totle
      }
      res.send(sendCorrect('', objs))
    })
  })
})

/**
 * @api {get} /clearing/getAccountList 电子钱包列表
 * @apiName /clearing/getAccountList/
 * @apiGroup Wallet
 *
 * @apiParam {String} PetitionCode 单据编号
 * @apiParam {String} AccountName 户名
 * @apiParam {String} CreateTime 创建时间
 * @apiParam {String} CharacterType 商户类型(枚举 CharacterType)
 * @apiParam {String} CompanyCode 公司编码
 * @apiParam {String} CompanyName 公司名称
 * @apiParam {String} StoreCode 门店编码
 * @apiParam {String} StoreName 门店名称
 * @apiParam {String} EwalletState 状态(枚举 EwalletState)
 * @apiParam {String} PageSize *分页条数
 * @apiParam {String} PageIndex *分页索引
 * @apiParam {String} OrderBy *排序字段(1: 创建时间)
 * @apiParam {String} IsAsced *是否升序(1: 正序 3: 倒序)
 * 
 * @apiSuccess {String} PetitionCode 单据编号
 * @apiSuccess {String} AccountName 户名
 * @apiSuccess {String} CreateTime 创建时间
 * @apiSuccess {String} name 创建人
 * @apiSuccess {String} BankEcode 银行电子账号
 * @apiSuccess {String} SubbkCode 归属支行号
 * @apiSuccess {String} SubbkName 归属支行名称
 * @apiSuccess {String} LegalName 法定代表人姓名
 * @apiSuccess {String} CreditCode 统一社会信用代码
 * @apiSuccess {String} Idcard 身份证号码
 * @apiSuccess {String} Mobile 手机号码
 * @apiSuccess {String} Email 邮箱
 * @apiSuccess {String} ProvinceId 省编号
 * @apiSuccess {String} CityId 市编号
 * @apiSuccess {String} ProvinceId 区编号
 * @apiSuccess {String} ProvinceName 省
 * @apiSuccess {String} CityName 市
 * @apiSuccess {String} AreaName 区
 * @apiSuccess {String} EwalletState 账户状态(枚举 EwalletMasterState)
 * @apiSuccess {String} EwalletType 账户类型(枚举 EwalletMasterEwalletType)
 * @apiSuccess {String} CharacterType 商户类型(枚举 CharacterType)
 * @apiSuccess {String} CompanyCode 公司编码
 * @apiSuccess {String} CompanyName 公司名称
 * @apiSuccess {String} StoreCode 门店编码
 * @apiSuccess {String} StoreName 门店名称
 * @apiSuccess {String} CheckTime 审核时间
 * @apiSuccess {String} CheckUser 审核人
 * @apiSuccess {String} EwalletState 申请单状态(枚举 EwalletState)
 * 
 */
router.get('/getAccountList', (req, res, next) => {
  const query = req.query
  if(!query.OrderBy) {
    return res.send(sendError('OrderBy必传'));
  }
  if(!query.IsAsced) {
    return res.send(sendError('IsAsced必传'));
  }
  if(!query.PageSize) {
    return res.send(sendError('PageSize必传'));
  }
  if(!query.PageIndex) {
    return res.send(sendError('PageIndex必传'));
  }
  const obj = {}
  if(query.PetitionCode && query.PetitionCode != '') {
    obj.PetitionCode = query.PetitionCode
  }
  if(query.AccountName && query.AccountName != '') {
    obj.AccountName = query.AccountName
  }
  if(query.CharacterType && query.CharacterType != '') {
    obj.CharacterType = query.CharacterType
  }
  if(query.CompanyCode && query.CompanyCode != '') {
    obj.CompanyCode = query.CompanyCode
  }
  if(query.CompanyName && query.CompanyName != '') {
    obj.CompanyName = query.CompanyName
  }
  if(query.StoreCode && query.StoreCode != '') {
    obj.StoreCode = query.StoreCode
  }
  if(query.StoreName && query.StoreName != '') {
    obj.StoreName = query.StoreName
  }
  if(query.TuneOrderState && (query.TuneOrderState != '' || query.TuneOrderState != 0)) {
    obj.TuneOrderState = query.TuneOrderState
  }
  Wallet.find(obj).limit(Number(query.PageSize)).skip((query.PageIndex - 1) * Number(query.PageSize)).sort({CreateTime: query.IsAsced == 3 ? -1 : 1 }).exec().then(items => {
    Wallet.count().then(totle => {
      const objs = {
        Subset: items,
        Count: totle
      }
      res.send(sendCorrect('', objs))
    })
  })
})

/**
 * @api {post} /clearing/openAccountWallet 开通电子钱包
 * @apiName /clearing/openAccountWallet/
 * @apiGroup Wallet
 *
 * @apiParam {String} AccountName *户名
 * @apiParam {String} EwalletType *账户类型 (枚举 EwalletMasterEwalletType)
 * @apiParam {String} CreditCode *统一社会信用代码
 * @apiParam {String} LegalName *姓名
 * @apiParam {String} Mobile *手机号码
 * @apiParam {String} Idcard *身份证号码
 * @apiParam {String} Email *邮箱
 * @apiParam {String} ProvinceName *省
 * @apiParam {String} CityName *市
 * @apiParam {String} AreaName *区
 * @apiParam {String} Address *详细地址
 * 
 */
router.post('/openAccountWallet', (req, res, next) => {
  const data = req.body
  if(data.EwalletType != 1 || data.EwalletType != 3) {
    return res.send(sendError('请选择账户类型'));
  }
  if(data.Mobile == 0 || data.Mobile == '') {
    return res.send(sendError('请输入手机号码'));
  }
  if(data.LegalName == 0 || data.LegalName == '') {
    return res.send(sendError('请输入姓名'));
  }
  if(data.Email == 0 || data.Email == '') {
    return res.send(sendError('请输入邮箱'));
  }
  if(data.Idcard == 0 || data.Idcard == '') {
    return res.send(sendError('请输入身份证号码'));
  }
  if(data.EwalletType == 1) {
    if(data.CreditCode == 0 || data.CreditCode == '') {
      return res.send(sendError('请输入统一社会信用代码'));
    }
    if(data.ProvinceName == 0 || data.ProvinceName == '') {
      return res.send(sendError('请选择省'));
    }
    if(data.CityName == 0 || data.CityName == '') {
      return res.send(sendError('请选择市'));
    }
    if(data.AreaName == 0 || data.AreaName == '') {
      return res.send(sendError('请选择区'));
    }
    if(data.Address == 0 || data.Address == '') {
      return res.send(sendError('请输入详细地址'));
    }
  }
  Wallet.insertMany(walletList).then(result => {
    console.log(result)
    res.send(sendCorrect('创建成功'));
  }).catch(err => {
    console.log(err)
    res.send(sendError('创建失败', err));
  })
})

module.exports = router