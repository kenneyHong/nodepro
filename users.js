const express = require('express');
const fs = require('fs');
// 建立 express 实例
const app = express();
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/runoob';
const client = new MongoClient(url, { useUnifiedTopology: true });
const bodyParser = require('body-parser');
const JwtUtil = require('./jwt');
const JSEncrypt = require('node-jsencrypt');
var cors = require("cors");
const { sendError, sendCorrect } = require('./confings/utilities');
app.use(cors(), bodyParser());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  next();
});

// 查找用户表
const findUser = (data) => {
  return new Promise((resolve, reject) => {
    client.connect((err,client) => {
      const collection = client.db('test').collection('users');
      collection.find(data).toArray(function(err, items) {
        if(err) {
          console.log('123123', err)
          reject(err)
        } else {
          resolve(items)
        }
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
      })
    });
  })
}

app.get('/hupu', function (req, res, next) {
  console.log(req.query)
  client.connect((err,client) => {
    if(!err) {
      const collection = client.db('test').collection('users');
      collection.insertOne({
        name: '德玛西亚',
        age: 30,
        sex: '男'
      }, (err, result) => {
        client.close()
      })
    } else {
      res.send('items');
    }
  })
});
app.post('/registered', function(req, res, next) {
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
      collection.insertOne({name: req.body.name, password}, (err, result) => {
        const jwt = new JwtUtil(req.body.name);
        const token = jwt.generateToken();
        res.send(sendCorrect('注册成功', { token }))
        client.close()
      });
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
app.post('/login', (req, res, next) => {
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
        res.send(sendCorrect('登陆成功', { token }));
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

app.get('/getHupuData', (req, res, next) => {
  if(req.headers['access-token'] == '') {
    res.send(sendError('', '用户未登录'))
  }
  let jwt = new JwtUtil(req.headers['access-token']);
  let token = jwt.verifyToken();
  if(token == 'err') {
    res.send(sendError('', '用户未登录'));
  } else {
    res.send(sendCorrect('获取成功'))
  }
  
})

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});