const express = require('express');
const router = express.Router();
const { sendError, sendCorrect } = require('../confings/utilities');
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

// 获取电子钱包账户列表数据
router.get('/getAccountList', (req, res, next) => {
  const query = req.query
  if(!query.OrderBy) {
    res.send(sendError('OrderBy必传'));
    return
  }
  if(!query.IsAsced) {
    res.send(sendError('IsAsced必传'));
    return
  }
  if(!query.PageSize) {
    res.send(sendError('PageSize必传'));
    return
  }
  if(!query.PageIndex) {
    res.send(sendError('PageIndex必传'));
    return
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

module.exports = router