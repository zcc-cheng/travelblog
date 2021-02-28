<template>
  <div>
    <header
      class="navbar navbar-expand navbar-light flex-column flex-md-row bd-navbar fixed-top"
      style="background-color:rgba(255,250,240,0.8);"
    >
      <div class="navbar-brand mr-0 mr-md-2 ml-xl-5">
        <img src="../assets/logo1.png" alt="logo" />
      </div>

      <div class="navbar-nav-scroll">
        <ul class="navbar-nav bd-navbar-nav flex-row" style="font-size:1.5rem">
          <li class="nav-item">
            <router-link to="/" class="nav-link">首页</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="javascript:void(0)" @click.prevent="toMyFollowBlog()">关注</a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click.prevent="toPublish()">发布</a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click.prevent="toMyblog()">我的博客</a>
          </li>
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click.prevent="toCharts()">统计图表</a>
          </li>
          <!-- <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click.prevent="toRecommend()">推荐</a>
          </li>-->
          <li class="nav-item">
            <a href="javascript:void(0)" class="nav-link" @click.prevent="toRank()">排行</a>
          </li>
        </ul>
      </div>

      <ul class="navbar-nav ml-md-auto">
        <li class="nav-item dropdown">
          <form class="form-inline ml-auto mr-md-2">
            <div class="input-group">
              <input
                class="form-control search-style"
                type="search"
                placeholder="Search"
                aria-label="Search"
                v-model="search_text"
              />
              <button
                class="btn btn-secondary"
                type="submit"
                style="font-weight:600"
                @click.prevent="toSearch()"
              >Search</button>
            </div>
          </form>
        </li>

        <li
          class="nav-item dropdown mr-xl-5"
          style="font-weight:600;font-size:1.3rem"
          v-if="logininfo!=null"
        >
          <a
            href="#"
            class="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >{{logininfo.username}}</a>
          <div
            class="dropdown-menu dropdown-menu-right bg-white"
            aria-labelledby="navbarDropdownLink"
          >
            <li class="dropdown-item" style="font-weight:600">
              <a
                href="javascript:()"
                class="nav-link text-primary"
                @click.prevent="toUserHome()"
              >个人主页</a>
            </li>
            <li class="dropdown-item" style="font-weight:600">
              <a href="javascript:()" class="nav-link text-primary" @click.prevent="toRecord()">最近浏览</a>
            </li>
            <li class="dropdown-item" style="font-weight:600">
              <a
                href="javascript:()"
                class="nav-link text-primary"
                data-toggle="modal"
                data-target="#modifyinfoModal"
              >修改信息</a>
            </li>
            <li class="dropdown-item" style="font-weight:600">
              <a
                href="javascript:()"
                class="nav-link text-primary"
                data-toggle="modal"
                data-target="#modifypassModal"
              >修改密码</a>
            </li>
            <li class="dropdown-item" style="font-weight:600">
              <a href="javascript:()" class="nav-link text-primary" @click.prevent="doCanael()">注销</a>
            </li>
            <li class="dropdown-item" style="font-weight:600">
              <a href="javascript:()" class="nav-link text-primary" @click.prevent="doExit()">退出</a>
            </li>
          </div>
        </li>
        <li
          class="nav-item dropdown mr-xl-5"
          style="font-weight:600; font-size:1.3rem"
          v-if="logininfo===null"
        >
          <a
            href="#"
            class="nav-link dropdown-toggle"
            id="navbarDropdownMenuLink"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >未登录</a>
          <div
            class="dropdown-menu dropdown-menu-right bg-white"
            aria-labelledby="navbarDropdownLink"
          >
            <li class="dropdown-item" style="font-weight:600">
              <router-link to="/login" class="nav-link text-primary">登录</router-link>
            </li>
            <li class="dropdown-item" style="font-weight:600">
              <a href="javascript:()" class="nav-link text-primary" @click="doExit()">退出</a>
            </li>
          </div>
        </li>
      </ul>
    </header>

    <!-- Modal modify user info -->
    <div
      class="modal fade"
      id="modifyinfoModal"
      tabindex="-1"
      z-index="1050"
      role="dialog"
      aria-labelledby="modifyinfoModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyinfoModalLabel">修改信息</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
                <!-- 循环 -->
                <tr>
                  <td>邮箱：</td>
                  <td>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      autocomplete="off"
                      v-validate="'required|email'"
                      data-vv-delay="2000"
                      data-vv-scope="custom1"
                      v-model="user_info.email"
                    />
                  </td>
                </tr>
                <tr>
                  <td>性别：</td>
                  <td>
                    <select
                      name="sex"
                      class="form-control"
                      data-vv-delay="2000"
                      autocomplete="off"
                      v-model="user_info.sex"
                    >
                      <option
                        v-for="(item,index) in user_info.sexlist"
                        :key="index"
                        :value="item.id"
                      >{{item.title}}</option>
                    </select>
                  </td>
                </tr>
                <tr>{{errors.first('custom1.email')}}</tr>

                <!--  -->
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="doModifyinfo"
              data-dismiss="modal"
            >保存</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->

    <!-- model modify password -->
    <div
      class="modal fade"
      id="modifypassModal"
      tabindex="-1"
      z-index="1050"
      role="dialog"
      aria-labelledby="modifypassModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifypassModalLabel">修改密码</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <table class="table">
              <tbody>
                <tr>
                  <td>输入密码：</td>
                  <td>
                    <input
                      type="text"
                      data-vv-scope="custom2"
                      class="form-control"
                      name="new_password"
                      autocomplete="off"
                      v-validate="'required|min:5|max:20'"
                      data-vv-delay="2000"
                      v-model="user_info.new_password"
                      ref="new_password"
                    />
                  </td>
                </tr>
                <tr>
                  <td>确认密码：</td>
                  <td>
                    <input
                      type="text"
                      data-vv-scope="custom2"
                      class="form-control"
                      name="new_repassword"
                      autocomplete="off"
                      v-validate="'required|min:5|max:20|confirmed:new_password'"
                      data-vv-delay="2000"
                    />
                  </td>
                </tr>
                <tr>{{errors.first('custom2.new_password')}}</tr>
                <tr>{{errors.first('custom2.new_repassword')}}</tr>
              </tbody>
            </table>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">关闭</button>
            <button
              type="button"
              class="btn btn-primary"
              @click.prevent="doModifypass"
              data-dismiss="modal"
            >保存</button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal -->
  </div>
</template>
<script>
import { Validator } from "vee-validate";
Validator.localize("zh_CN");
const validate_dict = {
  custom1: {
    email: {
      required: "邮箱不能为空",
      email: "邮箱格式不正确"
    }
  },
  custom2: {
    new_password: {
      required: "密码不能为空",
      min: "密码不能少于5字符",
      max: "密码不能多于20字符"
    },
    new_repassword: {
      required: "确认密码不能为空",
      min: "确认密码不能少于5字符",
      max: "确认密码不能多于20字符",
      confirmed: "两次密码不一致"
    }
  }
};
Validator.localize("zh_CN", validate_dict);
export default {
  name: "Header",
  inject: ["reload"],
  data() {
    return {
      user_info: {
        email: "",
        sexlist: [
          { id: "男", title: "男" },
          { id: "女", title: "女" }
        ],
        sex: "",
        new_password: ""
      },
      search_text: ""
    };
  },
  computed: {
    logininfo() {
      return this.$store.state.logininfo;
    }
  },
  methods: {
    toRecommend() {
      // var login = this.logininfo;
      // if (login == null) {
      // }
    },
    toRank() {
      this.$store.commit("SAVE_RANK_TYPE", "blog_24h");
      this.$router.push({ name: "Rank", params: { rank_id: "blog_24h" } });
    },
    doCanael() {
      this.$store.commit("CLEAR_LOGININFO");
      window.localStorage.clear();
      this.reload();
      this.$router.push({ path: "/login" }).catch(err => {
        err;
      });
    },
    doExit() {
      this.$store.commit("CLEAR_LOGININFO");
      window.localStorage.clear();
      this.reload();
      this.$router.push({ path: "/" }).catch(err => {
        err;
      });
    },
    toPublish() {
      var login = this.logininfo;
      if (login == null) {
        alert("请登录");
        this.$router.push({ path: "/login" });
      } else {
        this.$router.push({
          path: "/publish"
        });
      }
    },
    toMyblog() {
      var login = this.logininfo;
      if (login == null) {
        alert("请登录");
        this.$router.push({ path: "/login" });
      } else {
        var user_id = this.logininfo.username;
        this.$store.commit("SAVE_USERINFO", this.logininfo);
        this.$router
          .push({ name: "Blog", params: { user_id: user_id } })
          .catch(err => {
            err;
          });
      }
    },
    toUserHome() {
      var user_id = this.logininfo.username;
      this.$axios
        .post("/api/getuserinfo", {
          username: this.logininfo.username
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({ name: "Home", params: { user_id: user_id } });
          }
        });
    },
    toMyFollowBlog() {
      var login = this.logininfo;
      if (login == null) {
        alert("请登录");
        this.$router.push({ path: "/login" });
      } else {
        this.$router.push({
          path: "/followblog"
        });
      }
    },
    doModifyinfo: function() {
      this.$validator.validateAll("custom1").then(valid => {
        if (true === valid) {
          let _this = this;

          this.$axios
            .post("/api/doModifyinfo", {
              username: _this.logininfo.username,
              email: _this.user_info.email,
              sex: _this.user_info.sex
            })
            .then(response => {
              ///////
              if (response.data.length) {
                console.log(response.data);
                _this.$store.commit("SAVE_LOGININFO", response.data[0]);
              }
            });
        } else {
          // eslint-disable-next-line no-console
          console.log(this.$validator.errors.all());
        }
      });
    },
    doModifypass: function() {
      this.$validator.validateAll("custom2").then(valid => {
        if (true === valid) {
          let _this = this;

          this.$axios
            .post("/api/doModifypass", {
              username: _this.logininfo.username,
              password: _this.user_info.new_password
            })
            .then(response => {
              if (response.data.length) {
                console.log(response.data);
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
    toRecord() {
      this.$router.push({ path: "/record" });
    },
    toSearch() {
      var search_text = this.search_text;
      console.log(search_text);
      this.$store.commit("SAVE_SEARCH_LIST", search_text);
      this.$router.push({
        name: "Search",
        params: { search_content: search_text }
      });
      this.search_text = "";
    },
    toCharts() {
      this.$store.commit("SAVE_CHARTS_TYPE", "charts");
      this.$router.push({ name: "Charts", params: { charts_id: "charts" } });
    }
  }
};
</script>
<style>
</style>
