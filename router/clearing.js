const express = require('express');
const router = express.Router();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/runoob';
const client = new MongoClient(url, { useUnifiedTopology: true });
const { sendError, sendCorrect } = require('../confings/utilities');
const { goodsData, accountList, accountDeteil } = require('../datas/goods');

// 创建电子钱包账户列表数据
router.get('/createAccountList', (req, res, next) => {
  client.connect((err,clients) => {
    if(!err) {
      const collection = clients.db('test').collection('accountlist');
      const deteilCollection = clients.db('test').collection('accountDeteil');
      const data = { ...accountList }
      const deteil = { ...accountDeteil }
      collection.insertOne(data, (err, result) => {
        console.log(err, result)
        if(!err) {
          deteilCollection.insertOne(deteil)
          res.send(sendCorrect('创建成功'));
        } else {
          res.send(sendError('创建失败', err));
        }
      })
    } else {
      res.send(sendError('创建失败'));
    }
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
 * @apiParam {String} OrderBy *排序字段(1: 最后操作时间 2: 资金账号)
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
  client.connect((err, client) => {
    if(!err) {
      const obj = {}
      const collection = client.db('test').collection('accountlist');
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
      collection.find(obj).skip((query.PageIndex - 1) * query.PageSize).limit(Number(query.PageSize)).sort({ [orderArr[query.OrderBy] - 1]: query.IsAsced == 3 ? -1 : 1 }).toArray((err, items) => {
        res.send(sendCorrect('', items))
      })
    }
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
 * @apiParam {String} CharacterType 商户类型(枚举)
 * @apiParam {String} CompanyCode 公司编码
 * @apiParam {String} CompanyName 公司名称
 * @apiParam {String} StoreCode 门店编码
 * @apiParam {String} StoreName 门店名称
 * @apiParam {String} State 账户状态
 * @apiParam {String} PageSize *分页条数
 * @apiParam {String} PageIndex *分页索引
 * @apiParam {String} OrderBy *排序字段(1: 最后操作时间 2: 资金账号)
 * @apiParam {String} IsAsced *是否升序(1: 正序 3: 倒序)
 * 
 * @apiSuccess {String} CapitalCode 资金账号
 * @apiSuccess {String} AccountName 户名
 * @apiSuccess {String} BankEcode 银行电子账号
 * @apiSuccess {String} LastOpenTime 开户时间
 * @apiSuccess {String} CharacterType 商户类型(枚举)
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
 * @apiSuccess {Number} State 账户状态(枚举)
 * 
 */
router.get('/getAccountAdmin', (req, res, next) => {

})

module.exports = router