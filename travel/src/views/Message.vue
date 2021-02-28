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
          <ul class="nav" v-show="is_hasmessage==true">
            <li
              class="nav-item col-12 mb-3"
              v-for="item in message_list"
              :key="item.comment_id"
              style="border: 1px solid rgba(0,0,0,.1)"
            >
              <div>
                <div class="row mt-1">
                  <h3 class="col-11 text-truncate text-left mt-1">
                    <a
                      href="javascript:void(0)"
                      @click.prevent="toBlogArticle(item.blog_id,item.username)"
                    >{{item.blog_name}}</a>
                  </h3>
                  <button
                    class="btn btn-secondary col-1"
                    @click.prevent="deleteMessage(item.comment_id)"
                  >删除</button>
                </div>
                <div class="row mt-2">
                  <div class="col-2">
                    <a
                      href="javascript:void(0)"
                      @click.prevent="toUserHome(item.co_username)"
                    >{{item.co_username}}</a>
                  </div>
                  <div class="col-3 ml-auto">评论时间：{{item.comment_time}}</div>
                </div>
                <div class="row mt-3">
                  <div
                    class="col-10 text-left text-warp"
                    style="font-size:1.2rem"
                  >{{item.comment_content}}</div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="nav" v-show="is_hasmessage==false">
            <li class="nav-item col-12" style="border: 1px solid rgba(0,0,0,.1)">您还没有消息</li>
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
      is_hasmessage: "",
      message_list: ""
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
    this.getMessage();
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
    getMessage() {
      this.$axios
        .post("/api/getUsermessage", {
          username: this.logininfo.username
        })
        .then(Response => {
          if (Response.data.length) {
            this.message_list = Response.data;
            this.is_hasmessage = true;
          } else {
            this.message_list = null;
            this.is_hasmessage = false;
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
            var user = this.$store.state.userinfo;
            console.log(user);
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
    deleteMessage(comment_id) {
      this.$axios
        .post("/api/deleteMessage", {
          comment_id: comment_id
        })
        .then(response => {
          if (response.data !== null) {
            this.getMessage();
          }
        });
    }
  }
};
</script>
