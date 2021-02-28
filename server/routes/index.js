var express = require('express');
var router = express.Router();


var connection = require('../db')
var multer = require('multer')
var fs = require('fs')
var path = require('path')

var storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/tinymce')
  },
  filename(req, file, cb) {
    cb(null, Date.now() + file.originalname)
  }
})

const upload = multer({
  storage: storage
})
//图片上传
router.post('/uploadImages', upload.single('file'), function (req, res, next) {
  let file = req.file
  console.log(file)
  let url1 = file.path
  let url2 = url1.slice(7)
  let url = "http://localhost:3000/static/" + url2
  url = url.replace("\\\\", "\/\/");
  url = url.replace("\\", "\/");
  url = url.replace("\\", "\/");
  file.path = url
  res.send(file)
})

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});
// POST //
//登录
router.post('/login', function (req, res, next) {
  var {
    username,
    password
  } = req.body;
  // console.log(username, password)
  let sql = 'select * from user where username= "' + username + '" and password="' + password + '"'
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//注册
router.post('/register', function (req, res, next) {
  var {
    username,
    password,
    email,
    sex
  } = req.body;
  var follow_count = 0,
    followed_count = 0
  let sql = 'select * from user where username= "' + username + '"'
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      if (data.length) {
        res.send(data)
      } else {
        let sql1 = "INSERT INTO user(username,password,user_email,user_sex,follow_count,followed_count,register_time) VALUES('" + username + "','" + password + "','" + email + "','" + sex + "','" + follow_count + "','" + followed_count + "',now())"
        let sqlparams = [username, password, email, sex]
        connection.query(sql1, (err, data) => {
          if (err) {
            throw err
          } else {
            console.log('添加成功')
          }
        })
        res.send(data)

      }
    }
  })
})
//获得省份名
router.post('/addressNavProvince', function (req, res, next) {
  let sql = 'select address_province from address where address_country= "中国" group by address_province order by address_province '
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//根据地址获得博客
router.post('/getaddressblog', function (req, res, next) {
  var {
    address_province
  } = req.body
  let sql1 = 'select m.* from address n,blog m  where m.address_id=n.address_id and n.address_province="' + address_province + '" order by n.address_id , m.datetime desc'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//获得城市名
router.post('/addressNavCity', function (req, res, next) {
  var {
    province
  } = req.body;
  console.log(province)
  let sql = 'select address_city from address where address_province= "' + province + '" group by address_city'
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//发表博客
router.post('/publish', function (req, res, next) {
  var count = 0,
    liked = 0,
    collected = 0
  var address_id
  var {
    blog_id,
    username,
    blog_title,
    choice_province,
    choice_city,
    address_specific,
    blogcontent
  } = req.body
  let sql1 = 'select address_id from address where  address_province="' + choice_province + '" and address_city="' + choice_city + '" '
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      results = JSON.stringify(data)
      results = JSON.parse(results)
      address_id = results[0].address_id

      let sql2 = "INSERT INTO blog(blog_id,blog_name,address_id,datetime,username,blog_content,count,liked,collected,address_specific,date) VALUES('" + blog_id + "','" + blog_title + "','" + address_id + "',now(),'" + username + "','" + blogcontent + "','" + count + " ','" + liked + "','" + collected + "','" + address_specific + "',curdate())"
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log('添加成功')

        }
      })
      res.send(data) //发送地址 address_id

    }
  })

})
//获得用户信息
router.post('/getuserinfo', function (req, res, next) {
  var {
    username
  } = req.body;
  console.log(username)
  let sql = 'select * from user where username= "' + username + '"'
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//用户修改信息   /doModifyinfo
router.post('/doModifyinfo', function (req, res, next) {
  var {
    username,
    email,
    sex
  } = req.body;
  let sql = 'UPDATE user SET user_email= "' + email + '" , user_sex= "' + sex + '" WHERE username= "' + username + '" '
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log('更新成功');
      let sql1 = 'select * from user where username= "' + username + '" '
      connection.query(sql1, (err, data) => {
        if (err) {
          throw err
        } else {
          res.send(data)
        }
      })


    }
  })
})
//用户修改密码   /doModifypass
router.post('/doModifypass', function (req, res, next) {
  var {
    username,
    password,
  } = req.body;
  let sql = 'UPDATE user SET password= "' + password + '"  WHERE username= "' + username + '" '
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log('更新成功');
      let sql1 = 'select * from user where password= "' + password + '" and username= "' + username + '"'
      connection.query(sql1, (err, data) => {
        if (err) {
          throw err
        } else {
          res.send(data)
        }
      })


    }
  })
})
//获得关注的用户发表的博客
router.post('/getFollowblog', function (req, res, next) {
  var {
    username
  } = req.body;
  let sql = 'select m.* from blog m,user_followed n where m.username=n.follow_username and n.username="' + username + '" order by m.datetime desc'
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//获得所有博客数据
router.post('/getblog', function (req, res, next) {

  let sql = 'select * from blog order by datetime desc'
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//获得浏览记录
router.post('/getRecord', function (req, res, next) {
  var {
    username
  } = req.body
  let sql = 'select m.*,n.browse_time from user_record n,blog m where m.blog_id=n.blog_id and n.username="' + username + '" order by n.browse_time desc'
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//根据 userinfo    获得用户收藏的博客
router.post('/getUsercollect', function (req, res, next) {
  var {
    username
  } = req.body;
  let sql = 'select m.* from blog m,user_collected n  where  n.username="' + username + '" and m.blog_id=n.blog_id '
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//根据 userinfo    获得用户关注的用户
router.post('/getUserfollow', function (req, res, next) {
  var {
    username
  } = req.body;
  let sql = 'select m.* from user m,user_followed n  where  n.username="' + username + '"and m.username=n.follow_username '
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//根据 userinfo    获得用户发表的博客
router.post('/getUserblog', function (req, res, next) {
  var {
    username
  } = req.body;
  let sql = "select * from blog  where  username='" + username + " ' "
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//点击增加浏览量
router.post('/addCount', function (req, res, next) {
  var count
  var {
    id
  } = req.body
  let sql1 = 'select count from blog where blog_id = "' + id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      count = data[0].count + 1
      let sql2 = 'UPDATE blog set count= "' + count + '" where blog_id = "' + id + '"'
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log('更新成功')
        }
      })
      res.send(data) //发送博客count字段值
    }
  })
})
//将浏览记录插入数据库
router.post('/insertRecord', function (req, res, next) {
  var {
    blog_id,
    username,
  } = req.body
  let sql1 = "INSERT INTO user_record(username,blog_id,browse_time) VALUES('" + username + "','" + blog_id + "',now())"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      let sql2 = 'select * from user_record where username="' + username + '"and blog_id="' + blog_id + '"'
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          res.send(data)
        }
      })
    }
  })
})
//删除博客
router.post('/deleteBlog', function (req, res, next) {
  var {
    blog_id,
  } = req.body
  let sql1 = 'delete from blog where  blog_id="' + blog_id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//取消关注用户
router.post("/CancelFollowuser", function (req, res, next) {
  var {
    username,
    follow_username
  } = req.body
  let sql1 = 'delete from user_followed where username = "' + username + '"and follow_username = "' + follow_username + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data) ///取消关注，发送null
      sql2 = 'select count(follow_username) from user_followed where username = "' + username + '"'
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          var count = JSON.stringify(data[0])
          count = JSON.parse(count)
          count = count['count(follow_username)']
          sql3 = 'UPDATE user set follow_count = "' + count + '" where username = "' + username + '"'
          connection.query(sql3, (err, data) => {
            if (err) {
              throw err
            } else {
              console.log("更新我关注的人数成功")
            }
          })
        }
      })
      sql4 = 'select count(username) from user_followed where follow_username = "' + username + '"'
      connection.query(sql4, (err, data) => {
        if (err) {
          throw err
        } else {
          var count = JSON.stringify(data[0])
          count = JSON.parse(count)
          count = count['count(username)']
          sql5 = 'UPDATE user set followed_count = "' + count + '" where username = "' + username + '"'
          connection.query(sql5, (err, data) => {
            if (err) {
              throw err
            } else {
              console.log("更新关注我的人数成功")
            }
          })
        }
      })

    }
  })
})
//取消收藏博客
router.post("/cancelCollect", function (req, res, next) {
  var {
    blog_id,
    username
  } = req.body
  let sql1 = 'delete from user_collected where username = "' + username + '"and blog_id = "' + blog_id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      sql2 = 'select count(blog_id) from user_collected where blog_id = "' + blog_id + '"'
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          var count = JSON.stringify(data[0])
          count = JSON.parse(count)
          count = count['count(blog_id)']
          console.log(count)
          sql3 = 'UPDATE blog set collected = "' + count + '" where blog_id = "' + blog_id + '"'
          connection.query(sql3, (err, data) => {
            if (err) {
              throw err
            } else {
              res.send(data) //不收藏发送null
            }
          })
        }
      })

    }
  })
})
//收藏此博客  /collectedblog
router.post('/collectedblog', function (req, res, next) {
  var {
    id,
    username
  } = req.body
  let sql1 = 'select blog_name from blog where blog_id= "' + id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var blog_title = JSON.stringify(data[0])
      blog_title = JSON.parse(blog_title)
      blog_title = blog_title.blog_name
      console.log(blog_title)
      let sql2 = 'INSERT INTO user_collected(username,blog_id,blog_name) VALUES(?,?,?)'
      let sqlparams = [username, id, blog_title]
      connection.query(sql2, sqlparams, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log('插入成功')
          sql3 = 'select count(blog_id) from user_collected where blog_id = "' + id + '"'
          connection.query(sql3, (err, data) => {
            if (err) {
              throw err
            } else {
              var count = JSON.stringify(data[0])
              count = JSON.parse(count)
              count = count['count(blog_id)']
              console.log(count)
              sql4 = 'UPDATE blog set collected = "' + count + '" where blog_id = "' + id + '"'
              connection.query(sql4, (err, data) => {
                if (err) {
                  throw err
                } else {
                  res.send(data) //收藏发送null
                }
              })
            }
          })

        }
      })

    }
  })

})
//关注博主   /followedauthor
router.post('/followedauthor', function (req, res, next) {
  var {
    username,
    author
  } = req.body
  let sql1 = 'INSERT INTO user_followed(username,follow_username) VALUES(?,?)'
  let sqlparams = [username, author]
  connection.query(sql1, sqlparams, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log("插入成功")
      res.send(data) ///关注，发送无数据
      let sql2 = 'select count(follow_username) from user_followed where username ="' + username + '"'
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          let count = JSON.stringify(data[0])
          count = JSON.parse(count)
          count = count['count(follow_username)']
          sql4 = 'UPDATE user set follow_count="' + count + '" where username = "' + username + '"'
          connection.query(sql4, (err, data) => {
            if (err) {
              throw err
            } else {
              console.log("更新我关注的人数成功")
            }
          })
        }
      })
      let sql3 = 'select count(username) from user_followed where follow_username ="' + username + '"'
      connection.query(sql3, (err, data) => {
        if (err) {
          throw err
        } else {
          let count = JSON.stringify(data[0])
          count = JSON.parse(count)
          count = count['count(username)']
          sql6 = 'UPDATE user set followed_count="' + count + '" where username = "' + username + '"'
          connection.query(sql6, (err, data) => {
            if (err) {
              throw err
            } else {
              console.log("更新关注我的人数成功")
            }
          })
        }
      })
    }
  })

})
///用户喜爱博客   /likedblog
router.post('/likedblog', function (req, res, next) {
  var {
    id,
    username
  } = req.body
  let sql1 = 'select blog_name from blog where blog_id= "' + id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var blog_title = JSON.stringify(data[0])
      blog_title = JSON.parse(blog_title)
      blog_title = blog_title.blog_name
      console.log(blog_title)
      let sql2 = 'INSERT INTO user_liked(username,blog_id,blog_name) VALUES(?,?,?)'
      let sqlparams = [username, id, blog_title]
      connection.query(sql2, sqlparams, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log('插入成功')
          sql3 = 'select count(blog_id) from user_liked where blog_id = "' + id + '"'
          connection.query(sql3, (err, data) => {
            if (err) {
              throw err
            } else {
              console.log(data)
              let count = JSON.stringify(data[0])
              count = JSON.parse(count)
              count = count['count(blog_id)']
              console.log(count)
              sql4 = 'UPDATE blog set liked = "' + count + '" where blog_id = "' + id + '"'
              connection.query(sql4, (err, data) => {
                if (err) {
                  throw err
                } else {
                  res.send(data) //null
                }
              })
            }
          })

        }
      })

    }
  })

})
//用户不喜爱博客  /unlikedblog
router.post("/unlikedblog", function (req, res, next) {
  var {
    id,
    username
  } = req.body
  let sql1 = 'delete from user_liked where username = "' + username + '"and blog_id = "' + id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      sql2 = 'select count(blog_id) from user_liked where blog_id = "' + id + '"'
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          var count = JSON.stringify(data[0])
          count = JSON.parse(count)
          count = count['count(blog_id)']
          console.log(count)
          sql3 = 'UPDATE blog set liked = "' + count + '" where blog_id = "' + id + '"'
          connection.query(sql3, (err, data) => {
            if (err) {
              throw err
            } else {
              res.send(data) //null
            }
          })
        }
      })

    }
  })
})
///获取博客内容
router.post('/getcontent', function (req, res, next) {
  var {
    id
  } = req.body
  let sql1 = 'select m.*,n.*  from blog m,address n  where blog_id="' + id + '" and m.address_id = n.address_id'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
//查找用户是否喜爱博客   /findliked
router.post('/findliked', function (req, res, next) {
  var {
    id,
    username
  } = req.body
  let sql1 = 'select * from user_liked where username = "' + username + '"and blog_id="' + id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data) //喜欢则非null 不喜欢则null
    }
  })
})
//查找用户是否收藏此博客  /findcollected
router.post('/findcollected', function (req, res, next) {
  var {
    id,
    username
  } = req.body
  let sql1 = 'select * from user_collected where username = "' + username + '"and blog_id="' + id + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data) //收藏则非null 不收藏则null
    }
  })
})
//查找用户是否关注此博主  /findfollowed
router.post('/findfollowed', function (req, res, next) {
  var {
    username,
    author
  } = req.body

  let sql1 = 'select * from user_followed where username = "' + username + '"and follow_username="' + author + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data) //关注则是非null 不关注则是null
    }
  })
})
router.post('/getPopularProvinces', function (req, res, next) {
  let sql = 'select  n.address_province, (count(m.blog_id)-o.blog_num),(sum(m.count)-l.count_num) from blog m,address n,address_rank_24 l,address_publish_month o where m.address_id=n.address_id AND n.address_province=l.province AND n.address_province=o.province_name group by n.address_province order by (sum(m.count)-l.count_num)  desc limit 0,5 '
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })

})
router.post('/getTodaylist', function (req, res, next) {
  var date = new Date()
  let sql1 = "select * , (UNIX_TIMESTAMP(NOW())-UNIX_TIMESTAMP(datetime)) AS antime from blog WHERE (UNIX_TIMESTAMP(NOW())-UNIX_TIMESTAMP(datetime))<86400 order by count desc limit 0,10"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/getinfo', function (req, res, next) {
  var info = {}
  var {
    username
  } = req.body
  let sql1 = 'select count(blog_id) from blog where username = "' + username + '"'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      info.count_blog = data[0]['count(blog_id)'] //他发博数量
      let sql2 = 'select count(username) from user_followed where follow_username="' + username + '"'
      connection.query(sql2, (err, data) => {
        if (err) {
          throw err
        } else {
          info.count_followed = data[0]['count(username)'] //关注他的数量
          let sql3 = 'select count(follow_username) from user_followed where username="' + username + '"'
          connection.query(sql3, (err, data) => {
            if (err) {
              throw err
            } else {
              info.count_follow = data[0]['count(follow_username)'] //他关注的数量

              let sql4 = 'select count(blog_id) from user_collected where username="' + username + '"'
              connection.query(sql4, (err, data) => {
                if (err) {
                  throw err
                } else {
                  info.count_collect = data[0]['count(blog_id)'] //他收藏的数量

                  let sql5 = 'select count(blog_id) from user_liked where username="' + username + '"'
                  connection.query(sql5, (err, data) => {
                    if (err) {
                      throw err
                    } else {
                      info.count_like = data[0]['count(blog_id)'] //他喜欢的数量

                      let sql6 = 'select count(m.username) from user_collected m,blog n where m.blog_id= n.blog_id and n.username = "' + username + '"'
                      connection.query(sql6, (err, data) => {
                        if (err) {
                          throw err
                        } else {
                          info.count_collected = data[0]['count(m.username)'] //他被收藏的数量

                          let sql7 = 'select count(m.username) from user_liked m ,blog n where m.blog_id= n.blog_id and n.username = "' + username + '"'
                          connection.query(sql7, (err, data) => {
                            if (err) {
                              throw err
                            } else {
                              info.count_liked = data[0]['count(m.username)'] //他被喜欢的数量
                              info.username = username
                              res.send(info)
                              // info = JSON.stringify(info)
                            }
                          })
                        }
                      })
                    }
                  })
                }
              })
            }
          })
        }
      })
    }
  })
})
router.post('/getSearch', function (req, res, next) {
  var {
    search_text
  } = req.body
  console.log(search_text)
  let sql = "select address_province from address where address_province = '" + search_text + "'"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log("1" + ":" + data)
      if (data.length) {
        let sql1 = "select m.* from blog m,address n where m.address_id = n.address_id and n.address_province = '" + search_text + "'"
        connection.query(sql1, (err, data) => {
          if (err) {
            throw err
          } else {
            res.send(data)
          }
        })
      } else {
        let sql2 = "select address_city from address where address_city = '" + search_text + "'"
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {
            console.log("2" + ":" + data)
            if (data.length) {
              let sql3 = "select m.* from blog m,address n where m.address_id=n.address_id and n.address_city = '" + search_text + "'"
              connection.query(sql3, (err, data) => {
                if (err) {
                  throw err
                } else {
                  res.send(data)
                }
              })
            } else {
              let sql4 = "SELECT * FROM blog WHERE blog_name LIKE '%" + search_text + "%'"
              connection.query(sql4, (err, data) => {
                if (err) {
                  throw err
                } else {
                  if (data.length) {
                    res.send(data)
                  } else {
                    let sql5 = "select m.* from blog m,user n where  n.username like '%" + search_text + "%' and  m.username=n.username"
                    connection.query(sql5, (err, data) => {
                      if (err) {
                        throw err
                      } else {
                        res.send(data)
                      }
                    })
                  }
                }
              })
            }
          }
        })
      }
    }
  })
})

router.post('/getMaddress', function (req, res, next) {
  var {
    id
  } = req.body
  let sql = "select n.address_province,n.address_city, m.address_specific from blog m,address n where m.address_id=n.address_id and m.blog_id='" + id + "'"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/echarts/pie1', function (req, res, next) {
  let sql = "select sum(m.count) as blog_sum,n.address_province from blog m,address n where m.address_id=n.address_id group by n.address_province order by sum(m.count) desc "
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/echarts/bar1', function (req, res, next) {
  let sql = "select  count(m.blog_id) as blog_count,n.address_province from blog m,address n where m.address_id = n.address_id group by n.address_province order by count(m.blog_id) desc limit 0,10"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/echarts/bar2', function (req, res, next) {
  let sql = "select follow_username,count(follow_username) as follow_count from user_followed group by follow_username order by count(follow_username) desc limit 0,10"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/echarts/bar3', function (req, res, next) {
  let sql = "select liked ,blog_name from blog order by liked desc limit 0,10"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/echarts/bar4', function (req, res, next) {
  let sql = "select m.blog_name as blog_title,(m.count-n.count) as rank_24 from blog m,blog_rank_24 n where m.blog_id=n.blog_id order by (m.count-n.count) desc limit 0,10"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log(data)
      res.send(data)
    }
  })
})
router.post('/echarts/bar5', function (req, res, next) {
  let sql1 = "select n.address_province as province ,sum(m.count) as count_sum from blog m,address n where m.address_id=n.address_id group by n.address_province"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var data = JSON.stringify(data)
      data = JSON.parse(data)
      for (var i = 0; i < data.length; i++) {
        let sql2 = 'replace into address_rank_24_new(province,count_num) values("' + data[i].province + '","' + data[i].count_sum + '") '
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {}
        })
      }
      let sql3 = "select m.province as province ,(m.count_num-n.count_num) as address_count from address_rank_24_new m,address_rank_24 n where m.province=n.province order by (m.count_num-n.count_num) desc limit 0,10"
      connection.query(sql3, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log(data)
          res.send(data)
        }
      })
    }
  })
})
router.post('/echarts/bar6', function (req, res, next) {
  let sql1 = "select n.address_province as province ,count(m.blog_id) as blog_num from blog m,address n where m.address_id=n.address_id group by n.address_province "
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var data = JSON.stringify(data)
      data = JSON.parse(data)
      for (var i = 0; i < data.length; i++) {
        let sql2 = 'replace into address_publish_month_new(province_name,blog_num) values("' + data[i].province + '","' + data[i].blog_num + '") '
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {}
        })

      }
      let sql3 = "select m.province_name as province,(m.blog_num-n.blog_num) as address_num from address_publish_month_new m,address_publish_month n where m.province_name=n.province_name order by (m.blog_num-n.blog_num) desc limit 0,10"
      connection.query(sql3, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log(data)
          res.send(data)
        }
      })
    }
  })
})
router.post('/get_blog_24Rank', function (req, res, next) {
  let sql1 = 'select m.*,(m.count-n.count) from blog m left outer join blog_rank_24 n on m.blog_id=n.blog_id order by (m.count-n.count) desc limit 0,10'
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/get_address_24Rank', function (req, res, next) {
  let sql1 = "select n.address_province as province ,sum(m.count) as count_sum from blog m, address n where m.address_id=n.address_id group by n.address_province"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var data = JSON.stringify(data)
      data = JSON.parse(data)
      for (var i = 0; i < data.length; i++) {
        let sql2 = 'replace into address_rank_24_new(province,count_num) values("' + data[i].province + '","' + data[i].count_sum + '") '
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {}
        })
      }
      let sql3 = "select m.province as province ,(m.count_num-n.count_num) as address_count from address_rank_24_new m left outer join  address_rank_24 n on m.province=n.province order by (m.count_num-n.count_num) desc limit 0,10"
      connection.query(sql3, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log(data)
          res.send(data)
        }
      })
    }
  })
})
router.post('/get_address_30Rank', function (req, res, next) {
  let sql1 = "select n.address_province as province ,count(m.blog_id) as blog_num from blog m,address n where m.address_id=n.address_id group by n.address_province "
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      var data = JSON.stringify(data)
      data = JSON.parse(data)
      for (var i = 0; i < data.length; i++) {
        let sql2 = 'replace into address_publish_month_new(province_name,blog_num) values("' + data[i].province + '","' + data[i].blog_num + '") '
        connection.query(sql2, (err, data) => {
          if (err) {
            throw err
          } else {}
        })

      }
      let sql3 = "select m.province_name as province,(m.blog_num-n.blog_num) as address_num from address_publish_month_new m left outer join  address_publish_month n on m.province_name=n.province_name order by (m.blog_num-n.blog_num) desc limit 0,10"
      connection.query(sql3, (err, data) => {
        if (err) {
          throw err
        } else {
          console.log(data)
          res.send(data)
        }
      })
    }
  })
})
router.post('/doComments', function (req, res, next) {
  var {
    co_username,
    to_username,
    blog_id,
    content,
    id
  } = req.body
  let sql1 = "INSERT INTO comments(blog_id,co_username,comment_time,comment_content,to_username,comment_id) VALUES('" + blog_id + "','" + co_username + "',now(),'" + content + "','" + to_username + "','" + id + "')"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log(data)
      res.send(data)
    }
  })
})
router.post('/getcomments', function (req, res, next) {
  var {
    blog_id
  } = req.body
  let sql1 = " select * from comments where blog_id = '" + blog_id + "' order by comment_time desc"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/getUsermessage', function (req, res, next) {
  var {
    username
  } = req.body
  let sql1 = "select m.*,n.* from comments m,blog n where m.blog_id=n.blog_id and m.to_username='" + username + "' order by m.comment_time desc"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/deleteMessage', function (req, res, next) {
  var {
    comment_id
  } = req.body
  let sql1 = "delete from comments where comment_id='" + comment_id + "'"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
////admin
router.post('/admin/login', function (req, res, next) {
  var {
    username,
    password
  } = req.body
  let sql = "select * from admin where admin_username = '" + username + "' and admin_password='" + password + "'"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send(data)
    }
  })
})
router.post('/admin/getuser', function (req, res, next) {
  let sql = "select n.*,count(m.blog_id) as blog_num from blog m right outer join user n ON m.username =n.username group by n.username order by n.username"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      console.log(data)
      res.send(data)
    }
  })
})
router.post('/admin/getblog', function (req, res, next) {
  var {
    username
  } = req.body
  if (username == '0000') {
    let sql1 = "select * from blog"
    connection.query(sql1, (err, data) => {
      if (err) {
        throw err
      } else {
        res.send(data)
      }
    })
  } else {
    let sql2 = "select * from blog where username='" + username + "'"
    connection.query(sql2, (err, data) => {
      if (err) {
        throw err
      } else {
        res.send(data)
      }
    })
  }
})
router.post('/admin/deleteuser', function (req, res, next) {
  var {
    username
  } = req.body
  let sql1 = "delete from user where username ='" + username + "'"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql2 = "delete from user_collected where username ='" + username + "'"
  connection.query(sql2, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql3 = "delete from user_liked where username ='" + username + "'"
  connection.query(sql3, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql4 = "delete from user_followed where username ='" + username + "'||follow_username='" + username + "'"
  connection.query(sql4, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql5 = "delete from user_record where username ='" + username + "'"
  connection.query(sql5, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql6 = "delete from blog where username ='" + username + "'"
  connection.query(sql6, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  // let sql7 = "delete from comments where username ='" + username + "'"
  // connection.query(sql7, (err, data) => {
  //   if (err) {
  //     throw err
  //   } else {
  //     {}
  //   }
  // })
})
router.post('/admin/deleteblog', function (req, res, next) {
  var {
    blog_id
  } = req.body
  let sql1 = "delete from blog where blog_id='" + blog_id + "'"
  connection.query(sql1, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql2 = "delete from user_collected where blog_id='" + blog_id + "'"
  connection.query(sql2, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql3 = "delete from user_liked where blog_id='" + blog_id + "'"
  connection.query(sql3, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  let sql4 = "delete from user_record where blog_id='" + blog_id + "'"
  connection.query(sql4, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
  // let sql5 = "delete from comments where blog_id='" + blog_id + "'"
  // connection.query(sql5, (err, data) => {
  //   if (err) {
  //     throw err
  //   } else {
  //     {}
  //   }
  // })
})
router.post('/admin/getcomments', function (req, res, next) {
  var {
    blog_id
  } = req.body
  if (blog_id == '0000') {
    let sql1 = "select * from comments"
    connection.query(sql1, (err, data) => {
      if (err) {
        throw err
      } else {
        res.send(data)
      }
    })
  } else {
    let sql2 = "select * from comments where blog_id='" + blog_id + "'"
    connection.query(sql2, (err, data) => {
      if (err) {
        throw err
      } else {
        res.send(data)
      }
    })
  }
})
router.post('/admin/deletecomment', function (req, res, next) {
  var {
    comment_id
  } = req.body
  let sql = "delete from comments where comment_id ='" + comment_id + "'"
  connection.query(sql, (err, data) => {
    if (err) {
      throw err
    } else {
      {}
    }
  })
})
module.exports = router;