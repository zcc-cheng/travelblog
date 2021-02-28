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
        <ul class="nav flex-column mx-auto mt-3">
          <li
            class="nav-item mt-1 mb-1"
            v-for="item in user_list"
            :key="item.username"
            style="border:1px solid rgba(0,0,0,255)"
          >
            <div class="row">
              <div class="col-2 mt-1">
                <h3>
                  <a
                    href="javascript:void(0)"
                    @click.prevent="toUserBlog(item.username)"
                  >{{item.username}}</a>
                </h3>
              </div>
              <div class="col-4 mt-2">注册时间：{{item.register_time}}</div>
              <div class="col-4 mt-2">发博数量：{{item.blog_num}}</div>
              <div class="col-2 mt-1">
                <button class="btn btn-secondary" @click.prevent="DeleteUser(item.username)">删除</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
export default {
  name: "AdminUser",
  data() {
    return {
      user_list: ""
    };
  },
  components: {
    AdminNavbar,
    AdminHeader
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$axios.post("/api/admin/getuser").then(Response => {
        if (Response.data.length) {
          this.user_list = Response.data;
        }
      });
    },
    toUserBlog(username) {
      this.$store.commit("SAVE_ADMIN_TYPE", username);
      this.$router.push({ name: "AdminBlog", params: { user_id: username } });
    },
    DeleteUser(username) {
      this.$axios
        .post("/api/admin/deleteuser", {
          username: username
        })
        .then(this.initData());
    }
  }
};
</script>