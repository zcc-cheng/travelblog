<template>
  <div>
    <AdminHeader></AdminHeader>
    <div class="container-fluid">
      <AdminNavbar></AdminNavbar>
      <div
        class="col-xl-11 col-lg-11 col-md-11 offset-1"
        style="margin-top:5rem !important;background-color:rgba(0,0,0,0)"
      >
        <div class="row" style="height:1rem"></div>
        <ul class="nav flex-column mx-auto" v-show="is_show==true">
          <li
            class="nav-item mt-1"
            v-for="item in comments_list"
            :key="item.comment_id"
            style="border:1px solid rgba(0,0,0,255)"
          >
            <div class="col-12">
              <div class="row">
                <div class="col-2 mt-2 text-left" style="font-size:1.8rem">评论用户:{{item.to_username}}</div>
                <div class="col-4 mt-2" style="font-size:1.8rem">评论时间:{{item.comment_time}}</div>
                <div class="col-2 mt-2 ml-auto">
                  <button
                    class="btn btn-secondary"
                    @click.prevent="DeleteComment(item.comment_id)"
                  >删除</button>
                </div>
              </div>
              <div class="row">
                <div
                  class="col-10 text-left text-wrap"
                  style="font-size:1.5rem"
                >{{item.comment_content}}</div>
              </div>
            </div>
          </li>
        </ul>
        <div class="row" v-show="is_show==false">该博客目前没有评论</div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
export default {
  name: "AdminCommetns",
  components: {
    AdminNavbar,
    AdminHeader
  },
  data() {
    return {
      comments_list: "",
      is_show: ""
    };
  },
  computed: {
    admin_type() {
      return this.$store.state.admin_type;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$axios
        .post("/api/admin/getcomments", {
          blog_id: this.admin_type
        })
        .then(Response => {
          if (Response.data.length) {
            this.comments_list = Response.data;
            this.is_show = true;
          } else {
            this.comments_list = Response.data;
            this.is_show = false;
          }
        });
    },
    DeleteComment(comment_id) {
      this.$axios
        .post("/api/admin/deleteComment", {
          comment_id: comment_id
        })
        .then(this.initData());
    }
  }
};
</script>