const express = require('express');
// const fs = require('fs');
// 建立 express 实例
const app = express();
// const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017/runoob';
// const client = new MongoClient(url, { useUnifiedTopology: true });
const bodyParser = require('body-parser');  // 解密
const JwtUtil = require('./jwt');
const cors = require("cors");
const { sendMessage } = require('./confings/utilities');
const db = require('./db/connect')
// const { goodsData, accountList, accountDeteil } = require('./datas/goods');
app.use(cors(), bodyParser());
app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  if(req.url.indexOf('/user') === -1) {
    if(req.headers['access-token'] == '' || req.headers['access-token'] == 'undefined') {
      res.send(sendMessage('用户未登录', 'SIGNATURE'))
      return
    }
    let jwt = new JwtUtil(req.headers['access-token']);
    let token = jwt.verifyToken();
    console.log(token)
    next();
    // if(token == 'err') {
    //   res.send(sendMessage('用户未登录', 'SIGNATURE'));
    //   return
    // } else {
    //   next();
    // }
  } else {
    next();
  }
});



// app.get('/hupu', function (req, res, next) {
//   console.log(req.query)
//   client.connect((err,client) => {
//     if(!err) {
//       const collection = client.db('test').collection('users');
//       collection.insertOne({
//         name: '德玛西亚',
//         age: 30,
//         sex: '男'
//       }, (err, result) => {
//         client.close()
//       })
//     } else {
//       res.send('items');
//     }
//   })
// });


// // 创建货品列表假数据
// app.get('/createFalseData', (req, res, next) => {
//   client.connect((err,client) => {
//     if(!err) {
//       const collection = client.db('test').collection('goods');
//       const data = { ...goodsData }
//       collection.insertOne(data, (err, result) => {
//         if(!err) {
//           res.send(sendCorrect('创建成功'));
//         } else {
//           res.send(sendError('创建失败', err));
//         }
//       })
//     } else {
//       res.send(sendError('创建失败'));
//     }
//   })
// })
// // 获取货品信息
// app.get('/getGoodsData', (req, res, next) => {
//   const query = req.query
//   if(!query.OrderBy) {
//     res.send(sendError('OrderBy必传'));
//     return
//   }
//   if(!query.IsAsced) {
//     res.send(sendError('IsAsced必传'));
//     return
//   }
//   if(!query.PageSize) {
//     res.send(sendError('PageSize必传'));
//     return
//   }
//   if(!query.PageIndex) {
//     res.send(sendError('PageIndex必传'));
//     return
//   }
//   client.connect((err, client) => {
//     if(!err) {
//       const obj = {}
//       const collection = client.db('test').collection('goods');
//       if(query.BillNumber && query.BillNumber != '') {
//         obj.BillNumber = query.BillNumber
//       }
//       if(query.Supplier && query.Supplier != '') {
//         obj.Supplier = query.Supplier
//       }
//       if(query.SourceType && query.SourceType != '') {
//         obj.SourceType = query.SourceType
//       }
//       if(query.CreateTime && query.CreateTime != '') {
//         obj.CreateTime = query.CreateTime
//       }
//       if(query.PurchaseCost && query.PurchaseCost != '') {
//         obj.PurchaseCost = query.PurchaseCost
//       }
//       if(query.PurchaseNumber && query.PurchaseNumber != '') {
//         obj.PurchaseNumber = query.PurchaseNumber
//       }
//       if(query.CheckTime && query.CheckTime != '') {
//         obj.CheckTime = query.CheckTime
//       }
//       if(query.State && (query.State != '' || query.State != 0)) {
//         obj.State = query.State
//       }
//       collection.find(obj).skip((query.PageIndex - 1) * query.PageSize).limit(Number(query.PageSize)).toArray((err, items) => {
//         res.send(sendCorrect('', items))
//       })
//     }
//   })
// })



// app.get('/getHupuData', (req, res, next) => {
//   if(req.headers['access-token'] == '') {
//     res.send(sendError('', '用户未登录'))
//   }
//   let jwt = new JwtUtil(req.headers['access-token']);
//   let token = jwt.verifyToken();
//   if(token == 'err') {
//     res.send(sendError('', '用户未登录'));
//   } else {
//     res.send(sendCorrect('获取成功'))
//   }
  
// })
let userRouter = require('./router/user')
let clearingRouter = require('./router/clearing')
app.use('/user', userRouter)
app.use('/clearing', clearingRouter)

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});