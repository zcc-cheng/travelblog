<template>
  <div class="mx-auto mt-5">
    <div class="mx-auto" style="height:4rem"></div>
    <p class="h1 mx-auto mb-5 mt-5" style="font-size:4rem">Travel博客网站欢迎您</p>
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
            v-validate="'required'"
          />
        </div>
      </div>
      <div class="row">
        <div class="mx-auto" style="font-size:1.2rem">{{errors.first('username')}}</div>
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
            v-validate="'required'"
          />
        </div>
      </div>
      <div class="row">
        <div class="mx-auto" style="font-size:1.2rem">{{errors.first('password')}}</div>
      </div>
      <div class="row mt-5 mx-auto">
        <button type="submit" class="btn btn-primary col-2 mr-5 ml-5" @click.prevent="doLogin()">登录</button>
        <button
          type="submit"
          class="btn btn-primary col-2 mr-5 ml-5"
          @click.prevent="toRegister()"
        >注册</button>
        <button type="submit" class="btn btn-primary col-2 ml-5" @click="doExit">退出</button>
      </div>
    </form>
  </div>
</template>
<style scoped>
</style>
<script>
import { Validator } from "vee-validate";
Validator.localize("zh_CN");
const validate_dict = {
  custom: {
    username: {
      required: "账号不能为空"
    },
    password: {
      required: "密码不能为空"
    }
  }
};
Validator.localize("zh_CN", validate_dict);
export default {
  name: "Login",
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
      this.$validator.validate().then(valid => {
        if (true === valid) {
          let _this = this;

          this.$axios
            .post("/api/login", {
              username: _this.loginform.username,
              password: _this.loginform.password
            })
            .then(response => {
              if (response.data.length) {
                // eslint-disable-next-line no-console
                // console.log(response.data);
                //存入本地存储
                _this.$store.commit("SAVE_LOGININFO", response.data[0]);
                alert("登录成功");
                this.$router.push({ path: "/" });
              } else {
                alert("登录失败");
              }
            });
        } else {
          // eslint-disable-next-line no-console
          console.log(this.$validator.errors.all());
        }
      });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
    },

    doExit: function() {
      this.$router.push({ path: "/" });
      this.$store.commit("CLEAR_LOGININFO");
    }
  }
};
</script>