<template>
  <div>
    <Header></Header>
    <div class="container-fluid">
      <RankNavbar></RankNavbar>
      <div class="row">
        <div
          class="col-xl-8 mx-xl-auto col-lg-8 mx-lg-auto col-md-10 offset-md-2"
          style="margin-top:5rem !important;background-color:rgba(0,0,0,0)"
        >
          <div class="row" style="height:2rem"></div>
          <ul class="nav" v-show="this.rank_type=='blog_24h'">
            <li
              class="nav-item col-12 mb-3"
              v-for="(item,index) in rank_list"
              :key="item.blog_id"
              style="border: 1px solid rgba(0,0,0,.1)"
            >
              <div class="row">
                <div class="col-1 text-primary mt-2" style="font-size:2rem">{{index+1}}</div>
                <div class="col-11">
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
                      <div class="col-6">发表时间：{{item.datetime}}</div>
                      <div class="col-1 ml-auto mr-0 p-0">喜欢：{{item.liked}}</div>
                      <div class="col-1 mr-0 p-0">浏览：{{item.count}}</div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="nav" v-show="this.rank_type=='address_24h'">
            <li
              class="nav-item col-12 mb-3"
              v-for="(item,index) in rank_list"
              :key="item.blog_id"
              style="border: 1px solid rgba(0,0,0,.1)"
            >
              <div class="row">
                <div class="col-1 text-primary mt-2" style="font-size:2rem">{{index+1}}</div>
                <div class="col-11">
                  <div class="row mt-1">
                    <h3 class="col-6 text-truncate text-left mt-1">
                      <a
                        href="javascript:void(0)"
                        @click.prevent="toAddressBlog(item.province)"
                      >{{item.province}}</a>
                    </h3>
                    <p class="col-6 mt-2" style="font-size:1.2rem">24小时点击量：{{item.address_count}}</p>
                  </div>
                  <div class="row">{{ }}</div>
                </div>
              </div>
            </li>
          </ul>
          <ul class="nav" v-show="this.rank_type=='address_30d'">
            <li
              class="nav-item col-12 mb-3"
              v-for="(item,index) in rank_list"
              :key="item.blog_id"
              style="border: 1px solid rgba(0,0,0,.1)"
            >
              <div class="row">
                <div class="col-1 text-primary mt-2" style="font-size:2rem">{{index+1}}</div>
                <div class="col-11">
                  <div class="row mt-1">
                    <h3 class="col-6 text-truncate text-left mt-1">
                      <a
                        href="javascript:void(0)"
                        @click.prevent="toAddressBlog(item.province)"
                      >{{item.province}}</a>
                    </h3>
                    <p class="col-6 mt-2" style="font-size:1.2rem">每月发博数量：{{item.address_num}}</p>
                  </div>
                  <div class="row">{{ }}</div>
                </div>
              </div>
            </li>
          </ul>
          <div class="row" style="height:2rem"></div>
        </div>
      </div>
      <Beside></Beside>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
import RankNavbar from "@/components/RankNavbar.vue";
import Beside from "@/components/Beside.vue";
export default {
  name: "Rank",
  data() {
    return {
      rank_list: "",
      show_blog: "",
      show_address_24: "",
      show_address_30: ""
    };
  },
  components: {
    RankNavbar,
    Header,
    Beside
  },
  created() {
    this.getRank();
  },
  methods: {
    getRank() {
      if (this.rank_type == "blog_24h") {
        console.log("blog_24h");
        this.$axios.post("/api/get_blog_24Rank").then(Response => {
          if (Response.data.length) {
            this.rank_list = Response.data;
          }
        });
      } else if (this.rank_type == "address_24h") {
        console.log("address_24h");
        this.$axios.post("/api/get_address_24Rank").then(Response => {
          if (Response.data.length) {
            this.rank_list = Response.data;
          }
        });
      } else if (this.rank_type == "address_30d") {
        console.log("address_30d");
        this.$axios.post("/api/get_address_30Rank").then(Response => {
          if (Response.data.length) {
            this.rank_list = Response.data;
          }
        });
      }
    },
    toAddressBlog(address) {
      var address_obj = new Object();
      address_obj.address_province = address;
      this.$store.commit("SAVE_ADDRESSINFO", address_obj);
      var address_id;
      this.$axios
        .post("/api/getaddressblog", {
          address_province: address
        })
        .then(response => {
          if (response.data.length) {
            address_id = response.data[0].address_id;
            this.$store.commit("SAVE_ADDRESS_BLOG_LIST", response.data);
            this.$router.push({
              name: "Address",
              params: { address_id: address_id }
            });
          } else {
            this.$store.commit("SAVE_ADDRESS_BLOG_LIST", response.data);
            address_id = "000000";
            this.$router.push({
              name: "Address",
              params: { address_id: address_id }
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
    }
  },
  computed: {
    logininfo() {
      return this.$store.state.logininfo;
    },
    rank_type() {
      return this.$store.state.rank_type;
    }
  },
  watch: {
    rank_type() {
      this.getRank();
    }
  }
};
</script>