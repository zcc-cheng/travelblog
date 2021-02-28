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
          <div class="row" style="height:2rem"></div>

          <!-- padding-left:17rem !important; -->
          <!-- header -->
          <div class="container">
            <div class="row" style="border-bottom: 2px solid rgba(0,0,0,.1)">
              <h2 class="col-12 text-left text-wrap">{{blogtitle}}</h2>
            </div>
            <div class="row mb-3">
              <div class="col-2">
                <p>作者：{{blogauthor}}</p>
              </div>
              <div class="col-3">
                <p>发博时间：{{blogtime}}</p>
              </div>
              <div class="col-6">
                <p>发博地址：{{blogaddress}}</p>
              </div>
            </div>
            <div class="row" style="border-bottom: 2px solid rgba(0,0,0,.1)">
              <div class="col-2 pt-2">
                <p>喜欢： {{blogliked}}</p>
              </div>
              <div class="col-2 pt-2">
                <p>浏览：{{blogcount}}</p>
              </div>
              <div class="col-2 pt-2">
                <p>收藏：{{blogcollected}}</p>
              </div>
              <div class="col-2 ml-auto">
                <button
                  class="btn btn-outline-secondary"
                  @click.prevent="toFollow()"
                  v-show="this.is_followed!==true"
                >关注</button>
                <button
                  class="btn btn-outline-secondary"
                  @click.prevent="toFollow()"
                  v-show="this.is_followed==true"
                >已关注</button>
              </div>
            </div>
            <div class="row"></div>
          </div>
          <!-- 主要内容 -->
          <div v-html="bloghtml" class="m-5" style="font-size:1.8rem"></div>
          <!-- footer -->
          <div
            class="container mt-5 mb-5"
            style="border-top: 2px solid rgba(0,0,0,.1);border-bottom: 2px solid rgba(0,0,0,.1)"
          >
            <div class="row">
              <div class="col-2" v-show="this.is_liked!==true">
                <button class="btn btn-light" @click.prevent="likedblog()">
                  <svg
                    class="bi bi-heart"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  喜欢
                </button>
              </div>
              <div class="col-2" v-show="this.is_liked==true">
                <button class="btn btn-light" @click.prevent="likedblog()">
                  <svg
                    class="bi bi-heart"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  已喜欢
                </button>
              </div>
              <div class="col-2" v-show="this.is_collected!==true">
                <button class="btn btn-light" @click.prevent="collectedblog()">
                  <svg
                    class="bi bi-star"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  收藏
                </button>
              </div>
              <div class="col-2" v-show="this.is_collected==true">
                <button class="btn btn-light" @click.prevent="collectedblog()">
                  <svg
                    class="bi bi-star"
                    width="1em"
                    height="1em"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.523-3.356c.329-.314.158-.888-.283-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767l-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288l1.847-3.658 1.846 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.564.564 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  已收藏
                </button>
              </div>
            </div>
          </div>
          <AMap :blog_id="this.bloginfo.blogid"></AMap>
          <!-- 评论 -->
          <Comment></Comment>
          <!--  -->
        </div>
      </div>
      <Userinfo></Userinfo>
      <Footer></Footer>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
// import AMap from "AMap";

import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Userinfo from "@/components/Userinfo.vue";
import Comment from "@/components/Comment.vue";
import AMap from "@/components/map.vue";

export default {
  name: "Article",
  data() {
    return {
      bloghtml: "",
      blogtitle: "",
      blogauthor: "",
      blogtime: "",
      blogcount: "",
      blogliked: "",
      blogcollected: "",
      blogaddress: "",
      is_liked: "", //是否喜欢
      is_followed: "", //是否关注作者
      is_collected: "", //是否收藏博客
      is_show: "",
      blogprovince: "",
      blogcity: "",
      address: ""
      // map: ""
    };
  },
  computed: {
    logininfo() {
      return this.$store.state.logininfo;
    },
    bloginfo() {
      return this.$store.state.bloginfo;
    }
  },
  components: {
    Navbar,
    Header,
    Userinfo,
    Footer,
    Comment,
    AMap
  },

  created() {
    this.getBlogcontent();
    this.findFollowed();
    this.findLiked();
    this.findCollected();
  },
  methods: {
    getBlogcontent() {
      this.$axios
        .post("/api/getcontent", {
          id: this.bloginfo.blogid
        })
        .then(Response => {
          if (Response.data.length) {
            this.bloghtml = Response.data[0].blog_content;
            this.blogtitle = Response.data[0].blog_name;
            this.blogtime = Response.data[0].datetime;
            this.blogauthor = Response.data[0].username;
            this.blogcount = Response.data[0].count;
            this.blogliked = Response.data[0].liked;
            this.blogcollected = Response.data[0].collected;
            this.blogaddress =
              Response.data[0].address_country +
              " " +
              Response.data[0].address_province +
              " " +
              Response.data[0].address_city +
              " " +
              Response.data[0].address_specific;
            this.blogprovince = Response.data[0].address_province;
            this.blogcity = Response.data[0].address_city;
            this.address =
              Response.data[0].address_province +
              Response.data[0].address_city +
              Response.data[0].address_specific;
          } else {
            // eslint-disable-next-line no-console
            console.log("err");
          }
        });
    },
    findFollowed() {
      var login = this.logininfo;
      if (login == null) {
        this.is_liked = false;
        this.is_followed = false;
        this.is_collected = false;
      } else {
        this.$axios
          .post("/api/findfollowed", {
            username: this.logininfo.username,
            author: this.bloginfo.author
          })
          .then(Response => {
            if (Response.data.length) {
              this.is_followed = true;
            } else {
              this.is_followed = false;
            }
          });
      }
    },
    findCollected() {
      var login = this.logininfo;
      if (login == null) {
        this.is_liked = false;
        this.is_followed = false;
        this.is_collected = false;
      } else {
        this.$axios
          .post("/api/findcollected", {
            id: this.bloginfo.blogid,
            username: this.logininfo.username
          })
          .then(Response => {
            if (Response.data.length) {
              this.is_collected = true;
            } else {
              this.is_collected = false;
            }
          });
      }
    },
    findLiked() {
      var login = this.logininfo;
      if (login == null) {
        this.is_liked = false;
        this.is_followed = false;
        this.is_collected = false;
      } else {
        this.$axios
          .post("/api/findliked", {
            id: this.bloginfo.blogid,
            username: this.logininfo.username
          })
          .then(Response => {
            if (Response.data.length) {
              this.is_liked = true;
            } else {
              this.is_liked = false;
            }
          });
      }
    },
    collectedblog() {
      var login = this.logininfo;
      if (login == null) {
        alert("请登录");
        this.$router.push({ path: "/login" });
      } else {
        if (this.is_collected == false) {
          this.$axios
            .post("/api/collectedblog", {
              id: this.bloginfo.blogid,
              username: this.logininfo.username
            })
            .then(Response => {
              if (Response.data.length) {
                // eslint-disable-next-line no-console
                console.log("err");
              } else {
                // eslint-disable-next-line no-console
                this.getBlogcontent();
              }
            });
          this.is_collected = true;
          alert("你收藏它了");
        } else if (this.is_collected == true) {
          this.$axios
            .post("/api/cancelCollect", {
              blog_id: this.bloginfo.blogid,
              username: this.logininfo.username
            })
            .then(Response => {
              if (Response.data.length) {
                // eslint-disable-next-line no-console
                console.log("err");
              } else {
                // eslint-disable-next-line no-console
                this.getBlogcontent();
              }
            });
          this.is_collected = false;
          alert("你不收藏它了");
        }
      }
    },
    likedblog() {
      var login = this.logininfo;
      if (login == null) {
        alert("请登录");
        this.$router.push({ path: "/login" });
      } else {
        if (this.is_liked == false) {
          this.$axios
            .post("/api/likedblog", {
              id: this.bloginfo.blogid,
              username: this.logininfo.username
            })
            .then(Response => {
              if (Response.data.length) {
                // eslint-disable-next-line no-console
                console.log("err");
              } else {
                // eslint-disable-next-line no-console
                this.getBlogcontent();
              }
            });
          this.is_liked = true;
          alert("你喜欢它了");
        } else if (this.is_liked == true) {
          this.$axios
            .post("/api/unlikedblog", {
              id: this.bloginfo.blogid,
              username: this.logininfo.username
            })
            .then(Response => {
              if (Response.data.length) {
                // eslint-disable-next-line no-console
                console.log("err");
              } else {
                // eslint-disable-next-line no-console
                this.getBlogcontent();
              }
            });
          this.is_liked = false;
          alert("你不喜欢它了");
        }
      }
    },
    toFollow() {
      var login = this.logininfo;
      if (login == null) {
        alert("请登录");
        this.$router.push({ path: "/login" });
      } else {
        if (this.is_followed == false) {
          this.$axios
            .post("/api/followedauthor", {
              username: this.logininfo.username,
              author: this.blogauthor
            })
            .then(Response => {
              if (Response.data.length) {
                // eslint-disable-next-line no-console
                console.log("err");
              } else {
                // eslint-disable-next-line no-console
                this.getBlogcontent();
              }
            });
          this.is_followed = true;
          alert("你关注它了");
        } else if (this.is_followed == true) {
          this.$axios
            .post("/api/CancelFollowuser", {
              username: this.logininfo.username,
              follow_username: this.blogauthor
            })
            .then(Response => {
              if (Response.data.length) {
                // eslint-disable-next-line no-console
                console.log("err");
              } else {
                // eslint-disable-next-line no-console
                this.getBlogcontent();
              }
            });
          this.is_followed = false;
          alert("你不想关注它了");
        }
      }
    }
  }
};
</script>
<style>
</style>
