<template>
  <div class="mx-auto mt-5">
    <div class="mx-auto" style="height:4rem"></div>
    <p class="h1 mx-auto mb-5 mt-5" style="font-size:3rem">Travel博客网站管理系统欢迎您</p>
    <form :model="loginform" style="width:500px;height:500px;" class="mx-auto mt-lg-5">
      <div class="form-group row mt-5">
        <label for="username" class="col-3 col-form-label" style="font-size:2rem;height:3rem">账号：</label>
        <div class="col-9">
          <input
            type="text"
            class="form-control"
            style="height:3rem;font-size:2rem"
            id="username"
            name="username"
            v-model="loginform.username"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="form-group row">
        <label for="password" class="col-3 col-form-label" style="font-size:2rem;height:3rem">密码：</label>
        <div class="col-9">
          <input
            v-model="loginform.password"
            type="password"
            class="form-control"
            style="height:3rem;font-size:2rem"
            id="password"
            name="password"
            autocomplete="off"
          />
        </div>
      </div>
      <div class="row mt-5 mx-auto">
        <button type="submit" class="btn btn-primary col-3 offset-1" @click.prevent="doLogin()">登录</button>
        <div class="col-4"></div>
        <button type="submit" class="btn btn-primary col-3" @click="doExit">退出</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  name: "AdminLogin",
  data() {
    return {
      loginform: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    doLogin() {
      this.$axios
        .post("/api/admin/login", {
          username: this.loginform.username,
          password: this.loginform.password
        })
        .then(response => {
          if (response.data.length) {
            // eslint-disable-next-line no-console
            // console.log(response.data);
            //存入本地存储
            alert("登录成功");
            this.$router.push({ path: "/admin/user" });
          } else {
            alert("登录失败");
          }
        });
    },
    doExit: function() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>