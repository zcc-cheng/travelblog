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
          <ul class="nav" v-show="is_hasrecord==true">
            <div class="row mx-auto">{{this.logininfo.username}}的浏览记录</div>
            <li
              class="nav-item col-12 mb-3"
              v-for="item in record_list"
              :key="item.blog_id"
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
                </div>
                <div class="row">{{ }}</div>
                <div class="row">
                  <div class="col-2">
                    <a
                      href="javascript:void(0)"
                      @click.prevent="toUserHome(item.username)"
                    >博主：{{item.username}}</a>
                  </div>
                  <div class="col-3">浏览时间：{{item.browse_time}}</div>
                  <div class="col-1 ml-auto mr-0 p-0">喜欢：{{item.liked}}</div>
                  <div class="col-1 mr-0 p-0">浏览：{{item.count}}</div>
                </div>
              </div>
            </li>
          </ul>
          <div v-show="is_hasrecord==false">
            <div class="card" style="width:100%">
              <div class="card-body">
                <h3>您未浏览过相关博客</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Beside></Beside>
    </div>
  </div>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Header from "@/components/Header.vue";
import Beside from "@/components/Beside.vue";

export default {
  name: "Record",
  components: {
    Header,
    Navbar,
    Beside
  },
  data() {
    return {
      record_list: "",
      is_hasrecord: ""
    };
  },
  created() {
    this.getRecord();
  },
  methods: {
    getRecord() {
      this.$axios
        .post("/api/getRecord", {
          username: this.logininfo.username
        })
        .then(Response => {
          if (Response.data.length) {
            this.record_list = Response.data;
            this.is_hasrecord = true;
          } else {
            this.record_list = Response.data;
            this.is_hasrecord = false;
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
    deleteRecord(blogid, time) {
      this.axios
        .post("/api/deleteRecord", {
          id: blogid,
          username: this.userinfo.username,
          time: time
        })
        .then(Response => {
          if (Response.data.length) {
            // eslint-disable-next-line no-console
            console.log("err");
          } else {
            this.getRecord();
          }
        });
    }
  },
  computed: {
    logininfo() {
      return this.$store.state.logininfo;
    }
  }
};
</script>

