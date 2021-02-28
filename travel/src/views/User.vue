<template>
  <div>
    <Header></Header>
    <div class="container-fluid">
      <div class="row">
        <div id="User" class="col-md-8 col-sm-12 col-lg-8 col-xl-8 box-screen m-auto">
          <div class="list-title">
            <h4 class="user-h4-1">基本资料</h4>
          </div>
          <ul class="list-group offset-3 user-info-list">
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
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "@/components/Header.vue";
export default {
  name: "User",
  compontents: {
    Header
  },
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
      }
    };
  },
  created() {},
  methods: {},
  computed: {
    userinfo() {
      return this.$store.state.userinfo;
    }
  }
};
</script>
<style >
</style>