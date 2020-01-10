// 引入依赖
var express = require('express');
var superagent = require('superagent')
var cheerio = require('cheerio');
var eventproxy = require('eventproxy');
var url = require('url');
var cnodeUrl = 'https://bbs.hupu.com/bxj';
var session = require('express-session')

// 建立 express 实例
var app = express();
app.all('*', function(req,res,next) {
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","content-type");
  res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
  if (req.method.toLowerCase() == 'options') {
    res.send(200);  //让options尝试请求快速结束
  } else {
    next();
  }
})
app.get('/hupu', function (req, res, next) {
  // 用 superagent 去抓取 https://cnodejs.org/ 的内容
  superagent.get('https://bbs.hupu.com/bxj')
    .end(function (err, sres) {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      var $ = cheerio.load(sres.text);
      var items = [];
      $('.titlelink.box .truetit').each(function (idx, element) {
        var $element = $(element);
        items.push({
          title: $(this).text(),
          href: $element.attr('href')
        });
      });
      res.send(items);
    });
});
// superagent.get(cnodeUrl).end(function(err, res) {
//   if(err) {
//     return console.error(err);
//   }
//   var topicUrls = [];
//   var $ = cheerio.load(res.text);
//   $('.titlelink.box .truetit').each(function(idx, element) {
//     var $element = $(element);
//     topicUrls.push({
//       title: $(this).text(),
//       href: $element.attr('href')
//     });
//   });
//   var ep = new eventproxy();
//   ep.after('topic_html',topicUrls.length,function (topics) {
//     topics = topics.map(function(topicPair) {
//       var topicUrl = topicPair[0];
//       var topicHtml = topicPair[1];
//       var $ = cheerio.load(topicHtml);
//       return topicUrl
//     });
//     // console.log('final:')
//     console.log(topics)
//   });
//   topicUrls.forEach(function(topicUrl) {
//     superagent.get('https://bbs.hupu.com/' + topicUrl.href).end(function() {
//       // console.log('fetch' + topicUrl + ' successful');
//       ep.emit('topic_html', [topicUrl]);
//     });
//   });
//   // console.log(topicUrls);
// });
// var async = require('async');

// var concurrencyCount = 0;
// var fetchUrl = function (url, callback) {
//   var delay = parseInt((Math.random() * 10000000) % 2000, 10);
//   concurrencyCount++;
//   console.log('现在的并发数是', concurrencyCount, '，正在抓取的是', url, '，耗时' + delay + '毫秒');
//   setTimeout(function () {
//     concurrencyCount--;
//     callback(null, url + ' html content');
//   }, delay);
// };

// var urls = [];
// for(var i = 0; i < 30; i++) {
//   urls.push('http://datasource_' + i);
// }

// async.mapLimit(urls, 5, function (url, callback) {
//   console.log(callback)
//   fetchUrl(url, callback);
// }, function (err, result) {
//   console.log('final:');
//   console.log(result);
// });

app.listen(3000, function (req, res) {
  console.log('app is running at port 3000');
});
app.use(session({
  secret: 'recommand 128 bytes random string',
  cookie: {maxAge: 60 * 1000}
}));
app.get('/',function(req, res) {
  console.log(req.session)
  if(req.session.isVisit) {
    req.session.isVisit++;
    res.send('<p>第 ' + req.session.isVisit + '次来此页面</p>');
  } else {
    req.session.isVisit = 1;
    res.send("欢迎第一次来这里");
    console.log(req.session);
  }
})