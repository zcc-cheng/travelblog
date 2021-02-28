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
          <ul class="nav" v-show="is_hasfollow==true">
            <li
              class="nav-item col-12 mb-3"
              v-for="item in follow_list"
              :key="item.username"
              style="border: 1px solid rgba(0,0,0,.1)"
            >
              <div class="row">
                <div class="col-6 mt-1">
                  <h4 class="mt-1 text-left ml-4">
                    用户：
                    <a
                      href="javascript:void(0)"
                      @click.prevent="toUserHome(item.username)"
                    >{{item.username}}</a>
                  </h4>
                </div>
                <div class="col-3"></div>
                <div class="col-3" v-show="isOwn==true">
                  <button
                    class="col-6 btn btn-outline-secondary ml-auto"
                    @click.prevent="CancelFollow(item.username)"
                  >取消关注</button>
                </div>
              </div>
            </li>
          </ul>
          <ul class="nav" v-show="is_hasfollow==false">
            <li class="nav-item col-12" style="border: 1px solid rgba(0,0,0,.1)">还未关注其他用户</li>
          </ul>
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
  name: "Followuser",
  data() {
    return {
      isOwn: "",
      is_hasfollow: "",
      follow_list: ""
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
    this.getFollowuser();
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
    getFollowuser() {
      this.$axios
        .post("/api/getUserfollow", {
          username: this.userinfo.username
        })
        .then(response => {
          if (response.data.length) {
            this.follow_list = response.data;
            this.is_hasfollow = true;
          } else {
            this.follow_list = response.data;
            this.is_hasfollow = false;
          }
        });
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
    },
    toUserHome(username) {
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
    CancelFollow(follow_username) {
      this.$axios
        .post("/api/CancelFollowuser", {
          username: this.logininfo.username,
          follow_username: follow_username
        })
        .then(this.getFollowuser());
    }
  }
};
</script>
