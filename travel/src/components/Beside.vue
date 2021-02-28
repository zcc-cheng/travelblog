<template>
  <div
    class="col-lg-2 col-xl-2 d-none d-lg-block d-xl-block"
    style="border-left: 1px solid rgba(0,0,0,.1);position:fixed;top:5rem;bottom:0;right:0;background-color:rgba(0,0,0,0);"
  >
    <!-- class="mt-5" style="margin-top:6rem!important;height:200px" -->
    <div class="col-xl-10 col-lg-10" style="background-color:rgba(255,250,240,0.6);height:80rem">
      <div style="height:2rem"></div>
      <p style="font-size:2rem">今日推荐</p>
      <ul class="nav">
        <li
          class="nav-item text-truncate col-12 text-left"
          style="border:2px solid rgba(0,0,0,.1)"
          v-for="item in todaylist"
          :key="item.blog_id"
        >
          <a
            class="nav-link"
            href="javascript:void(0)"
            @click="toBlogArticle(item.blog_id,item.username)"
          >{{item.blog_name}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Beside",
  data() {
    return {
      todaylist: ""
    };
  },
  created() {
    this.getTodaylist();
  },
  methods: {
    getTodaylist() {
      this.$axios.post("/api/getTodaylist").then(Response => {
        if (Response.data.length) {
          this.todaylist = Response.data;
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
              var mydate = new Date();
              var browse_time =
                mydate.toLocaleDateString() +
                " " +
                mydate.getHours() +
                ":" +
                mydate.getMinutes() +
                ":" +
                mydate.getSeconds();
              this.$axios
                .post("/api/insertRecord", {
                  blog_id: blog_id,
                  username: this.$store.state.logininfo.username,
                  time: browse_time
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