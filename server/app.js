var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//
var bodyParser = require('body-parser')
//db
var connection = require('./db')
//cors
var cors = require('cors');
//
var multer = require("multer");
//
var cron = require("node-cron")
var fs = require("fs")

var app = express();


app.use(bodyParser.json({
  limit: "500mb"
}))
app.use(bodyParser.urlencoded({
  limit: '500mb',
  extended: true
}))
//cors
// app.use(cors({
//   origin: ['http://localhost:5000'],
//   methods: ['GET', 'POST'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }))
//定时任务
// blog  24小时 点击量排行
cron.schedule("59 59 23 * * *", function () {
  let sql1 = "select blog_id ,count from blog "
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var data = JSON.stringify(data)
      data = JSON.parse(data)
      for (var i = 0; i < data.length; i++) {
        let sql2 = 'replace into blog_rank_24(blog_id,count) values("' + data[i].blog_id + '","' + data[i].count + '") '
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {
            console.log("更新成功")
          }
        })

      }
    }
  })
})
//地区 24小时 点击量排行
cron.schedule("59 59 23 * * *", function () {
  let sql1 = "select n.address_province as province ,sum(m.count) as count_sum from blog m,address n where m.address_id=n.address_id group by n.address_province"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var data = JSON.stringify(data)
      data = JSON.parse(data)
      for (var i = 0; i < data.length; i++) {
        let sql2 = 'replace into address_rank_24(province,count_num) values("' + data[i].province + '","' + data[i].count_sum + '") '
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {
            console.log("更新成功")
          }
        })

      }
    }
  })
})
//地区 30天 发博数量排行
cron.schedule("59 59 23 * * *", function () {
  let sql1 = "select n.address_province as province ,count(m.blog_id) as blog_num from blog m,address n where m.address_id=n.address_id group by n.address_province "
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var data = JSON.stringify(data)
      data = JSON.parse(data)
      for (var i = 0; i < data.length; i++) {
        let sql2 = 'replace into address_publish_month(province_name,blog_num) values("' + data[i].province + '","' + data[i].blog_num + '") '
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {
            console.log("更新成功")
          }
        })

      }
    }
  })
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

////设置静态文件目录
// app.use(express.static('public'));
app.use('/static', express.static('public'));

// //监听
app.listen(2000, () => {
  console.log('success listen at port:2000......');

});


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;