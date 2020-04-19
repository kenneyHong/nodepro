const express = require('express');
const fs = require('fs');
const router = express.Router();
const JSEncrypt = require('node-jsencrypt');
const { sendError, sendCorrect } = require('../confings/utilities');
const JwtUtil = require('../jwt');
const User = require('../db/model/userModel')

// 查找用户表
const findUser = (data) => {
  return new Promise((resolve, reject) => {
    User.find(data).then((items) => {
      resolve(items)
    }).catch(err => {
      reject(err)
    })
    // client.connect((err,client) => {
    //   const collection = client.db('test').collection('users');
    //   collection.find(data).toArray(function(err, items) {
    //     if(err) {
    //       reject(err)
    //     } else {
    //       resolve(items)
    //     }
        // if(items.length == 0) {
        //   res.send(sendError('账号或者密码错误'));
        // } else {
        //   const prvKey = fs.readFileSync('./rsa_private_key.pem').toString()
        //   const jsencrypt = new JSEncrypt()
        //   jsencrypt.setPrivateKey(prvKey)
        //   const password = jsencrypt.decrypt(req.body.password);
        //   if(items[0].password == password) {
        //     let jwt = new JwtUtil(req.body.name);
        //     let token = jwt.generateToken();
        //     res.send(sendCorrect('登陆成功', { token }));
        //   } else {
        //     res.send(sendError('账号或者密码错误'));
        //   }
        // }
  //     })
  //   });
  })
}
/**
 * @api {post} /user/registered 用户注册
 * @apiName /user/registered/
 * @apiGroup User
 *
 * @apiParam {String} name 用户名
 * @apiParam {String} password 密码
 * 
 */
router.post('/registered', function(req, res, next) {
  if(req.body.name == '' || req.body.password == '') {
    res.send(sendError('账号或者密码错误'))
    return
  }
  const prvKey = fs.readFileSync('./rsa_private_key.pem').toString()
  let jsencrypt = new JSEncrypt()
  jsencrypt.setPrivateKey(prvKey)
  let password = jsencrypt.decrypt(req.body.password);
  if(password.length < 6 || password.length > 12){
    res.send(sendError('密码长度必须在6~12位'));
    return
  }
  findUser({'name': req.body.name}).then(items => {
    if(items.length == 0) {
      const prvKey = fs.readFileSync('./rsa_private_key.pem').toString()
      const jsencrypt = new JSEncrypt()
      jsencrypt.setPrivateKey(prvKey)
      const password = jsencrypt.decrypt(req.body.password);
      User.insertMany({name: req.body.name, password}).then(() => {
        const jwt = new JwtUtil(req.body.name);
        const token = jwt.generateToken();
        res.send(sendCorrect('注册成功', { token, name: req.body.name }))
      }).catch(() => {
        res.send(sendError('注册失败'))
      })
    } else {
      res.send(sendError('注册失败,改用户已存在'));
    }
  }).catch(err => {
    res.send(sendError(err.toString()));
  })
  // client.connect((err,client) => {
  //   if(!err) {
  //     const collection = client.db('test').collection('users');
  //     collection.find({'name': req.body.name}).toArray(function(err, items) {
  //       if(items.length == 0) {
  //         const prvKey = fs.readFileSync('./rsa_private_key.pem').toString()
  //         const jsencrypt = new JSEncrypt()
  //         jsencrypt.setPrivateKey(prvKey)
  //         const password = jsencrypt.decrypt(req.body.password);
  //         collection.insertOne({name: req.body.name, password}, (err, result) => {
  //           const jwt = new JwtUtil(req.body.name);
  //           const token = jwt.generateToken();
  //           res.send(sendCorrect('注册成功', { token }))
  //           client.close()
  //         });
  //       } else {
  //         res.send(sendError('注册失败'));
  //       }
  //     });
  //   }
  // })
})

/**
 * @api {post} /user/login 用户登录
 * @apiName /user/login/
 * @apiGroup User
 *
 * @apiParam {String} name  用户名
 * @apiParam {String} password  密码
 * 
 */
router.post('/login', (req, res, next) => {
  if(req.body.name == '' || req.body.password == '') {
    res.send(sendError('登录失败'));
    return
  }
  findUser({'name': req.body.name}).then(items => {
    if(items.length == 0) {
      res.send(sendError('账号或者密码错误'));
    } else {
      const prvKey = fs.readFileSync('./rsa_private_key.pem').toString()
      const jsencrypt = new JSEncrypt()
      jsencrypt.setPrivateKey(prvKey)
      const password = jsencrypt.decrypt(req.body.password);
      if(items[0].password == password) {
        let jwt = new JwtUtil(req.body.name);
        let token = jwt.generateToken();
        res.send(sendCorrect('登陆成功', { token, name: req.body.name }));
      } else {
        res.send(sendError('账号或者密码错误'));
      }
    }
  }).catch(err => {
    res.send(sendError(err.toString()));
  })
  // const prvKey = fs.readFileSync('./rsa_private_key.pem').toString()
  // let jsencrypt = new JSEncrypt()
  // jsencrypt.setPrivateKey(prvKey)
  // let password = jsencrypt.decrypt(req.body.password);
})
/**
 * @api {get} /user/getState  获取用户状态
 * @apiName /user/getState/
 * @apiGroup User
 *
 * @apiSuccess {String} name  用户名
 * @apiSuccess {String} WalletState  电子钱包开通状态 枚举(EwalletMasterState)
 * @apiSuccess {String} CharacterType  商户类型
 * @apiSuccess {String} EwalletCashbindState  电子钱包的提现绑卡的状态 枚举(EwalletCashbindState)

 * 
 */
router.get('/getState', (req, res, next) => {
  findUser({name: '555'}).then(items => {
    if(items.length) {
      const obj = {
        name: items[0].name,
        WalletState: items[0].WalletState,
        CharacterType: items[0].CharacterType,
        EwalletCashbindState: items[0].EwalletCashbindState,
      }
      res.send(sendCorrect('', obj))
    }
  })
})
module.exports = router