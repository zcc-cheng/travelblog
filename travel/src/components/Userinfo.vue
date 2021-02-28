<template>
  <div
    class="col-lg-2 col-xl-2 d-none d-lg-block d-xl-block"
    style="border-left: 1px solid rgba(0,0,0,.1);position:fixed;top:5rem;bottom:0;right:0;background-color:rgba(0,0,0,0);"
  >
    <!-- class="mt-5" style="margin-top:6rem!important;height:200px" -->
    <div class="col-xl-10 col-lg-10" style="background-color:rgba(255,250,240,0.6);height:80rem">
      <div style="height:2rem"></div>
      <div class="row">
        <h4 class="text-left ml-2">
          <a
            href="javascript:void(0)"
            @click.prevent="toUserHome(info.username)"
          >作者：{{this.bloginfo.author}}</a>
        </h4>
      </div>
      <div class="row mt-2">
        <p class="ml-2">发博数量:{{info.count_blog}}</p>
        <p class="col-7">
          <a href="javascript:void(0)" @click="toBlog(info.username)">他的博客</a>
        </p>
      </div>
      <div class="row">
        <p class="ml-2">他关注的:{{info.count_follow}}</p>
        <p class="col-7">关注他的:{{info.count_followed}}</p>
      </div>
      <div class="row">
        <p class="ml-2">他收藏的:{{info.count_collect}}</p>
        <p class="col-7">收藏他的:{{info.count_collected}}</p>
      </div>
      <div class="row">
        <p class="ml-2">他喜欢的:{{info.count_like}}</p>
        <p class="col-7">喜欢他的:{{info.count_liked}}</p>
      </div>
      <!-- <div class="card">
        <div class="card-body text-left">
          <h5 class="card-title">{{this.bloginfo.author}}</h5>
          <div class="row">
            <p class="ml-2">他关注的:{{info.count_follow}}</p>
            <p class="col-7">关注他的:{{info.count_followed}}</p>
          </div>
          <div class="row">
            <p class="ml-2">他收藏的:{{info.count_collect}}</p>
            <p class="col-7">收藏他的:{{info.count_collected}}</p>
          </div>
          <div class="row">
            <p class="ml-2">他喜欢的:{{info.count_like}}</p>
            <p class="col-7">喜欢他的:{{info.count_liked}}</p>
          </div>
          <div class="row">
            <button
              class="btn btn-secondary mr-1 ml-1"
              @click.prevent="toMyblog(info.username)"
            >他的博客</button>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>
<script>
export default {
  name: "Userinfo",
  data() {
    return {
      info: {}
    };
  },
  computed: {
    bloginfo() {
      return this.$store.state.bloginfo;
    }
  },
  created() {
    this.getUserinfo();
  },
  methods: {
    getUserinfo() {
      var username = this.bloginfo.author;
      this.$axios
        .post("/api/getinfo", {
          username: username
        })
        .then(Response => {
          if (Response.data !== null) {
            this.info = Response.data;
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
    }
  }
};
</script>