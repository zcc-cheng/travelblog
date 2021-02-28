<template>
  <div
    class="col-md-1 col-lg-1 col-xl-1 d-none d-md-block d-lg-block d-xl-block"
    style="border-right: 1px solid rgba(0,0,0,.1);position:fixed;left:0;top:5rem;bottom:0;background-color:rgba(0,0,0,0);"
  >
    <ul class="nav flex-column">
      <li class="nav-item">
        <router-link to="/admin/user" class="nav-link text-secondary" style="font-size:1.4rem">User</router-link>
      </li>
      <li class="nav-item">
        <a
          href="javascript:void(0)"
          class="nav-link text-secondary"
          style="font-size:1.4rem"
          @click.prevent="toBlog()"
        >Blog</a>
      </li>
      <li class="nav-item">
        <a
          href="javascript:void(0)"
          class="nav-link text-secondary"
          style="font-size:1.4rem"
          @click.prevent="toComments()"
        >Comments</a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "AdminNavbar",
  methods: {
    toBlog() {
      var user_id = "0000";
      this.$store.commit("SAVE_ADMIN_TYPE", user_id);
      this.$router.push({ name: "AdminBlog", params: { user_id: user_id } });
    },
    toComments() {
      var blog_id = "0000";
      this.$store.commit("SAVE_ADMIN_TYPE", blog_id);
      this.$router.push({
        name: "AdminComments",
        params: { blog_id: blog_id }
      });
    }
  }
};
</script>