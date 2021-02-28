<template>
  <div>
    <Header></Header>
    <div class="container-fluid">
      <Navbar></Navbar>
      <div class="row">
        <div
          class="col-xl-8 mx-xl-auto col-lg-8 mx-lg-auto col-md-10 offset-md-2"
          style="margin-top:5rem !important;background-color:rgba(0,0,0,0)"
        >
          <div class="row">
            <h2 class="mx-auto">账号：{{this.userinfo.username}}</h2>
          </div>
          <div class="row" style="border-bottom: 1px solid rgba(0,0,0,.1)">
            <table class="table">
              <tbody>
                <tr>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toHome(userinfo.username)"
                    >个人信息</button>
                  </td>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toBlog(userinfo.username)"
                    >博客</button>
                  </td>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toFollow(userinfo.username)"
                    >关注</button>
                  </td>
                  <td class="p-0 m-0">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toCollect(userinfo.username)"
                    >收藏</button>
                  </td>
                  <td class="p-0 m-0" v-show="isOwn==true">
                    <button
                      class="btn btn-outline-secondary"
                      style="width:100%"
                      @click.prevent="toMessage(userinfo.username)"
                    >消息</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="row" style="border-top border-bottom: 1px solid rgba(0,0,0,.1)">
            <table class="table">
              <tbody>
                <tr>
                  <td>账号：</td>
                  <td>{{this.userinfo.username}}</td>
                </tr>
                <tr>
                  <td>邮箱：</td>
                  <td>{{this.userinfo.user_email}}</td>
                </tr>
                <tr>
                  <td>性别：</td>
                  <td>{{this.userinfo.user_sex}}</td>
                </tr>
                <!-- <tr>
                  <td>注册时间：</td>
                  <td>{{this.userinfo.register_time}}</td>
                </tr>-->
              </tbody>
            </table>
          </div>
          <!-- <ul class="list-group offset-3 user-info-list">
            <li class="list-group-item">
              <label style="float:left">账号：</label>
              <div>{{this.userinfo.username}}</div>
            </li>
            <li class="list-group-item">
              <label style="float:left">邮箱：</label>
              <div>{{this.userinfo.user_email}}</div>
            </li>
            <li class="list-group-item">
              <label style="float:left">性别：</label>
              <div>{{this.userinfo.user_sex}}</div>
            </li>
          </ul>-->
        </div>
      </div>
      <Beside></Beside>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import Header from "@/components/Header.vue";
import Navbar from "@/components/Navbar.vue";
import Beside from "@/components/Beside.vue";
export default {
  name: "Home",
  data() {
    return {
      isOwn: ""
    };
  },
  components: {
    Navbar,
    Header,
    Beside
  },
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    },
    logininfo() {
      return this.$store.state.logininfo;
    }
  },
  created() {
    this.isOwnuser();
  },
  methods: {
    isOwnuser() {
      var login = this.logininfo;
      if (login == null) {
        this.isOwn = false;
      } else {
        var user1 = this.logininfo.username;
        var user2 = this.userinfo.username;
        if (user1 == user2) {
          this.isOwn = true;
        } else {
          this.isOwn = false;
        }
      }
    },
    toHome(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({ name: "Home", params: { user_id: user_id } });
            var user = this.$store.state.userinfo;
            console.log(user);
          }
        });
    },
    toBlog(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Blog",
              params: { user_id: user_id }
            });
          }
        });
    },
    toCollect(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Collect",
              params: { user_id: user_id }
            });
          }
        });
    },
    toFollow(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Followuser",
              params: { user_id: user_id }
            });
          }
        });
    },
    toMessage(username) {
      var user_id = username;
      this.$axios
        .post("/api/getuserinfo", {
          username: user_id
        })
        .then(response => {
          if (response.data.length) {
            this.$store.commit("SAVE_USERINFO", response.data[0]);
            this.$router.push({
              name: "Message",
              params: { user_id: user_id }
            });
          }
        });
    }
  }
};
// var user = this.$store.state.userinfo;
// this.$axios
//   .post("/api/getuserblog", {
//     username: user.username
//   })
//   .then(response => {
//     if (response.data.length) {
//       console.log(response.data);
//       this.$store.commit("SAVE_USERBLOG_LIST", Response.data);
//       this.$router.push({
//         name: "Blog",
//         params: { user_id: user_id }
//       });
//     } else {
//       this.$store.commit("SAVE_USERBLOG_LIST", response.data);
//       this.$router.push({
//         name: "Blog",
//         params: { user_id: user_id }
//       });
//     }
//   });
</script>
