<template>
  <div class="m-auto mt-5">
    <div class="mx-auto mt-5" style="height:4rem"></div>
    <p class="h1 mb-5 mt-5 mx-auto">欢迎您注册Travel博客网站</p>
    <form class="mt-lg-5 mx-auto mb-5" style="width:600px;height:500px" novalidate :model="registerform">
      <div class="form-group row mt-5">
        <label
          for="username"
          class="col-3 col-form-label text-left"
          style="font-size:2rem;height:3rem"
        >账户：</label>
        <div class="col-9">
          <input
            type="text"
            class="form-control"
            style="height:3rem;font-size:2rem"
            name="username"
            id="username"
            autocomplete="off"
            v-validate="'required|min:3|max:12'"
            data-vv-delay="2000"
            v-model="registerform.username"
          />
        </div>
      </div>
      <div class="row">
        <div class="mx-auto" style="font-size:1.2rem">{{errors.first('username')}}</div>
      </div>
      <div class="form-group row">
        <label
          for="password"
          class="col-3 col-form-label text-left"
          style="font-size:2rem;height:3rem"
          minlength="6"
        >密码：</label>
        <div class="col-9">
          <input
            type="password"
            class="form-control"
            name="password"
            id="password"
            autocomplete="off"
            v-validate="'required|min:5|max:20'"
            style="height:3rem;font-size:2rem"
            ref="password"
            data-vv-delay="2000"
            v-model="registerform.password"
          />
        </div>
      </div>
      <div class="row">
        <div class="mx-auto" style="font-size:1.2rem">{{errors.first('password')}}</div>
      </div>
      <div class="form-group row">
        <label
          for="re_password"
          class="col-3 col-form-label text-left"
          style="font-size:2rem;height:3rem"
        >确认密码：</label>
        <div class="col-9">
          <input
            type="password"
            class="form-control"
            name="re_password"
            id="re_password"
            autocomplete="off"
            v-validate="'required|min:5|max:20|confirmed:password'"
            style="height:3rem;font-size:2rem"
            data-vv-delay="2000"
            v-model="registerform.re_password"
          />
        </div>
      </div>
      <div class="row">
        <div class="mx-auto" style="font-size:1.2rem">{{errors.first('re-password')}}</div>
      </div>
      <div class="form-group row">
        <label
          for="email"
          class="col-3 col-form-label text-left"
          style="font-size:2rem;height:3rem"
        >邮箱：</label>
        <div class="col-9">
          <input
            type="email"
            class="form-control"
            id="email"
            name="email"
            style="height:3rem;font-size:2rem"
            autocomplete="off"
            v-validate="'required|email'"
            data-vv-delay="2000"
            v-model="registerform.email"
          />
        </div>
      </div>
      <div class="row">
        <div class="mx-auto" style="font-size:1.2rem">{{errors.first('email')}}</div>
      </div>
      <div class="form-group row">
        <label
          for="sex"
          class="col-3 col-form-label text-left"
          style="font-size:2rem;height:3rem"
        >性别：</label>
        <div class="col-9">
          <select
            id="sex"
            name="sex"
            class="form-control"
            style="height:3rem;font-size:2rem"
            data-vv-delay="2000"
            autocomplete="off"
            v-model="registerform.sex"
          >
            <option
              v-for="(item,index) in registerform.sexlist"
              :key="index"
              :value="item.id"
            >{{item.title}}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="mx-auto" style="font-size:1.2rem">{{errors.first('sex')}}</div>
      </div>
      <div class="row mt-5 mx-auto">
        <button
          type="submit"
          class="btn btn-primary mr-5 mt-lg-5 ml-auto mr-5"
          @click.prevent="doRegister"
        >注册</button>
        <button
          type="submit"
          class="btn btn-primary mr-5 mt-lg-5 mr-auto mr-2"
          @click.prevent="doLogin"
        >返回</button>
      </div>
    </form>
  </div>
</template>
<script>
import { Validator } from "vee-validate";
Validator.localize("zh_CN");
const validate_dict = {
  custom: {
    username: {
      required: "账号不能为空",
      min: "账号不能少于3字符",
      max: "账号不能多于12字符"
    },
    password: {
      required: "密码不能为空",
      min: "密码不能少于5字符",
      max: "密码不能多于20字符"
    },
    re_password: {
      required: "确认密码不能为空",
      min: "确认密码不能少于5字符",
      max: "确认密码不能多于20字符",
      confirmed: "两次密码不一致"
    },
    email: {
      required: "邮箱不能为空",
      email: "邮箱格式不正确"
    }
  }
};
Validator.localize("zh_CN", validate_dict);
export default {
  name: "register",
  data() {
    return {
      registerform: {
        username: "",
        password: "",
        re_password: "",
        email: "",
        sexlist: [
          { id: "男", title: "男" },
          { id: "女", title: "女" }
        ],
        sex: ""
      }
    };
  },
  methods: {
    doRegister: function() {
      this.$validator.validate().then(valid => {
        if (true === valid) {
          let _this = this;

          this.$axios
            .post("/api/register", {
              username: _this.registerform.username,
              password: _this.registerform.password,
              // re_password: _this.registerform.re_password,
              email: _this.registerform.email,
              sex: _this.registerform.sex
              // eslint-disable-next-line no-console
            })
            .then(response => {
              ///////
              if (response.data.length) {
                // eslint-disable-next-line no-console
                console.log(response.data);
                alert("账号已经存在");
                // this.$router.push({ path: "/home" });
              } else {
                // eslint-disable-next-line no-console
                console.log(response.data);
                alert("注册成功");
                this.$store.commit("CLEAR_LOGININFO");
                this.$router.push({ path: "/login" });
              }
            });
          ///////
          // this.$router.push({ path: "/" });
        } else {
          // eslint-disable-next-line no-console
          console.log(this.$validator.errors.all());
        }
      });
    },
    doLogin: function() {
      this.$router.push({ path: "/login" });
    },
    mounted() {}
  }
};
</script>
