<template>
  <div class="container mt-5">
    <div class="row">
      <h3 class="ml-5">评论</h3>
    </div>
    <div class="row">
      <form class="col-11">
        <input type="text " class="form-control" style="height:3rem" v-model="comments_content" />
      </form>
      <button class="btn btn-secondary col-1" @click.prevent="doComments()">提交</button>
    </div>
    <ul class="nav mt-5">
      <li
        class="nav-item col-12 mt-3"
        v-for="item in comments_list"
        :key="item.comment_id"
        style="border: 1px solid rgba(0,0,0,.1)"
      >
        <div>
          <div class="row">
            <div class="col-2 mr-auto" style="font-size:1.3rem">{{item.co_username}}</div>
            <div class="col-1 ml-auto" style="font-size:1rem">to=></div>
            <div class="col-2" style="font-size:1.3rem">{{item.to_username}}</div>
          </div>
          <div class="row mt-2">
            <div
              class="col-8 ml-5 text-left text-warp"
              style="font-size:1.8rem"
            >{{item.comment_content}}</div>
            <div class="col-3 ml-auto">评论时间：{{item.comment_time}}</div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "Comment",
  data() {
    return {
      comments_content: "",
      comments_list: ""
    };
  },
  props: {},
  computed: {
    logininfo() {
      return this.$store.state.logininfo;
    },
    bloginfo() {
      return this.$store.state.bloginfo;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$axios
        .post("/api/getcomments", {
          blog_id: this.bloginfo.blogid
        })
        .then(Response => {
          if (Response.data.length) {
            this.comments_list = Response.data;
          }
        });
    },
    doComments() {
      if (this.comments_content == "") {
        alert("内容不能为空");
      } else {
        const id = Date.now();
        this.$axios
          .post("/api/doComments", {
            co_username: this.logininfo.username,
            to_username: this.bloginfo.author,
            blog_id: this.bloginfo.blogid,
            content: this.comments_content,
            id: this.bloginfo.blogid + this.logininfo.username + id
          })
          .then(Response => {
            if (Response.data !== null) {
              this.initData();
            }
          });
        this.comments_content = "";
      }
    }
  }
};
</script>