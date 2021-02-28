<template>
  <div>
    <Header></Header>
    <div class="container-fluid">
      <Navbar></Navbar>
      <div class="row">
        <div
          class="col-xl-8 mx-xl-auto col-lg-8 mx-lg-auto col-md-10 offset-md-2"
          style="margin-top:5rem !important;background-color:rgba(0,0,0,0)"
        >
          <div class="row">
            <h2 class="mx-auto">账号：{{this.userinfo.username}}</h2>
          </div>
          <div class="row" style="border-bottom: 1px solid rgba(0,0,0,.1)">
            <table class="table">
              <tbody>
                <tr>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toHome(userinfo.username)"
                    >个人信息</button>
                  </td>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toBlog(userinfo.username)"
                    >博客</button>
                  </td>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toFollow(userinfo.username)"
                    >关注</button>
                  </td>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toCollect(userinfo.username)"
                    >收藏</button>
                  </td>
                  <td class="p-0 m-0" v-show="isOwn==true">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toMessage(userinfo.username)"
                    >消息</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ul class="nav" v-show="is_hascollect==true">
            <li
              class="nav-item col-12 mb-3"
              v-for="item in collect_list"
              :key="item.blog_id"
              style="border: 1px solid rgba(0,0,0,.1)"
            >
              <div>
                <div class="row mt-1">
                  <h3 class="col-10 text-truncate text-left mt-1">
                    <a
                      href="javascript:void(0)"
                      @click.prevent="toBlogArticle(item.blog_id,item.username)"
                    >{{item.blog_name}}</a>
                  </h3>
                  <div class="col-2" v-show="isOwn==true">
                    <button
                      class="col-8 btn btn-outline-secondary"
                      @click.prevent="CancelCollect(item.blog_id)"
                    >取消收藏</button>
                  </div>
                </div>
                <div class="row"></div>
                <div class="row">
                  <div class="col-2">
                    <a
                      href="javascript:void(0)"
                      @click.prevent="toUserHome(item.username)"
                    >博主：{{item.username}}</a>
                  </div>
                  <div class="col-3">发表时间：{{item.datetime}}</div>
                  <div class="col-1 ml-auto mr-0 p-0">喜欢：{{item.liked}}</div>
                  <div class="col-1 mr-0 p-0">浏览：{{item.count}}</div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="nav" v-show="is_hascollect==false">
            <li class="nav-item col-12" style="border: 1px solid rgba(0,0,0,.1)">还未收藏其他博客</li>
          </ul>
        </div>
      </div>
      <Beside></Beside>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Beside from "@/components/Beside.vue";
export default {
  name: "Collect",
  data() {
    return {
      isOwn: "",
      is_hascollect: "",
      collect_list: ""
    };
  },
  components: {
    Navbar,
    Header,
    Beside
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    logininfo() {
      return this.$store.state.logininfo;
    }
  },
  created() {
    this.isOwnuser();
    this.getCollect();
  },
  methods: {
    isOwnuser() {
      var login = this.logininfo;
      if (login == null) {
        this.isOwn = false;
      } else {
        var user1 = this.logininfo.username;
        var user2 = this.userinfo.username;
        if (user1 == user2) {
          this.isOwn = true;
        } else {
          this.isOwn = false;
        }
      }
    },
    getCollect() {
      this.$axios
        .post("/api/getUsercollect", {
          username: this.userinfo.username
        })
        .then(Response => {
          if (Response.data.length) {
            this.collect_list = Response.data;
            this.is_hascollect = true;
          } else {
            this.collect_list = null;
            this.is_hascollect = false;
          }
        });
    },
    toHome(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({ name: "Home", params: { user_id: user_id } });
          }
        });
    },
    toBlog(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Blog",
              params: { user_id: user_id }
            });
          }
        });
    },
    toCollect(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Collect",
              params: { user_id: user_id }
            });
          }
        });
    },
    toFollow(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Followuser",
              params: { user_id: user_id }
            });
          }
        });
    },
    toMessage(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Message",
              params: { user_id: user_id }
            });
          }
        });
    },
    toUserHome(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({ name: "Home", params: { user_id: user_id } });
            var user = this.$store.state.userinfo;
            console.log(user);
          }
        });
    },
    toBlogArticle(blogid, author) {
      var blog_id = blogid;
      var login = this.logininfo;
      if (login == null) {
        this.$axios
          .post("/api/addCount", {
            id: blog_id
          })
          .then(response => {
            if (response.data.length) {
              var obj = new Object();
              obj.blogid = blog_id;
              obj.author = author;
              this.$store.commit("SAVE_BLOGINFO", obj);
              this.$router.push({
                name: "Article",
                params: { blog_id: blog_id }
              });
            } else {
              console.log("err");
            }
          });
      } else {
        this.$axios
          .post("/api/addCount", {
            id: blog_id
          })
          .then(response => {
            if (response.data.length) {
              var obj = new Object();
              obj.blogid = blog_id;
              obj.author = author;
              this.$store.commit("SAVE_BLOGINFO", obj);
              this.$router.push({
                name: "Article",
                params: { blog_id: blog_id }
              });

              this.$axios
                .post("/api/insertRecord", {
                  blog_id: blog_id,
                  username: this.$store.state.logininfo.username
                })
                .then(Response => {
                  if (Response.data.length) {
                    // eslint-disable-next-line no-console
                    console.log("ok");
                  } else {
                    // eslint-disable-next-line no-console
                    console.log("err");
                  }
                });
            } else {
              console.log("err,无法查看");
            }
          });
      }
    },
    CancelCollect(blogid) {
      this.$axios
        .post("/api/cancelCollect", {
          blog_id: blogid,
          username: this.logininfo.username
        })
        .then(this.getCollect());
    }
  }
};
</script>
