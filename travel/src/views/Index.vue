<template>
  <div>
    <Header></Header>
    <div class="container-fluid">
      <Navbar></Navbar>
      <div class="row">
        <div
          class="col-xl-8 mx-xl-auto col-lg-8 mx-lg-auto col-md-10 offset-md-2 col-sm-12"
          style="margin-top:5rem !important;background-color:rgba(0,0,0,0)"
        >
          <div class="row" style="height:2rem"></div>
          <div v-show="blog==null">
            <div class="row">
              <h4 class="mx-auto">目前没有人发表博客</h4>
            </div>
          </div>
          <ul class="nav" v-show="blog!==null">
            <li
              class="nav-item col-12 mb-3"
              v-for="item in blog"
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
                  <div class="col-3">发表时间：{{item.datetime}}</div>
                  <div class="col-1 ml-auto mr-0 p-0">喜欢：{{item.liked}}</div>
                  <div class="col-1 mr-0 p-0">浏览：{{item.count}}</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Footer></Footer>
      <Beside></Beside>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Beside from "@/components/Beside.vue";
import Footer from "@/components/Footer.vue";
export default {
  name: "Index",
  data() {
    return {
      blog: ""
    };
  },
  components: {
    Navbar,
    Header,
    Beside,
    Footer
  },
  computed: {
    logininfo() {
      return this.$store.state.logininfo;
    }
  },
  created() {
    this.initBlogdata();
  },
  methods: {
    initBlogdata() {
      this.$axios.post("/api/getblog").then(Response => {
        if (Response.data.length) {
          this.blog = Response.data;
        } else {
          this.blog = null;
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
    }
  }
};
</script>
<style>
.clearfix {
  clear: both;
}
a:link,
a:focus,
a:hover,
a:visited {
  text-decoration: none !important;
}
a:link {
  color: black;
}
a:focus {
  color: darkcyan;
}
a:hover {
  color: aquamarine;
}
a:visited {
  color: black;
}
/* .col-sm-12 {
  margin-top: 10rem !important;
  background-color: rgba(0, 0, 0, 0);
} */
</style>
