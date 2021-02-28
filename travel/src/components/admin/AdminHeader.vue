<template>
  <div>
    <header
      class="navbar navbar-expand navbar-light flex-column flex-md-row bd-navbar fixed-top"
      style="border: 1px solid rgba(0,0,0,.1);background-color:rgba(255,250,240,0.8)"
    >
      <div class="navbar-brand mr-0 mr-md-2 ml-xl-5">
        <img src="@/assets/logo1.png" alt="logo" />
      </div>
      <div class="navbar-brand mr-0 mr-md-2 ml-xl-5">
        <h3>旅游博客网站管理系统</h3>
      </div>
      <div class="ml-auto">
        <button class="btn btn-secondary mr-5" @click.prevent="doExit()">退出</button>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  name: "AdminHeader",
  methods: {
    doExit() {
      this.$router.push({ path: "/admin" });
    }
  }
};
</script>