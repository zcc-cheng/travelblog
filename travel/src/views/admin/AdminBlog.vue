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
        <ul class="nav flex-column mx-auto" v-show="this.is_show==true">
          <li
            class="nav-item mt-1"
            v-for="item in blog_list"
            :key="item.blog_name"
            style="border:1px solid rgba(0,0,0,255)"
          >
            <div class="row">
              <div class="col-7 mt-2">
                <h3 class="text-left text-truncate">
                  <a
                    href="javascript:void(0)"
                    @click.prevent="toComments(item.blog_id)"
                  >{{item.blog_name}}</a>
                </h3>
              </div>
              <div class="col-2 mt-2">发表时间：{{item.datetime}}</div>
              <div class="col-2 mt-2">博客作者：{{item.username}}</div>
              <div class="col-1 mt-2">
                <button class="btn btn-secondary" @click.prevent="DeleteBlog(item.blog_id)">删除</button>
              </div>
            </div>
          </li>
        </ul>
        <div class="row" v-show="this.is_show==false">该用户目前没有发表博客</div>
      </div>
    </div>
  </div>
</template>
<script>
import AdminHeader from "@/components/admin/AdminHeader.vue";
import AdminNavbar from "@/components/admin/AdminNavbar.vue";
export default {
  name: "AdminBlog",
  components: {
    AdminNavbar,
    AdminHeader
  },
  data() {
    return {
      blog_list: "",
      is_show: ""
    };
  },
  computed: {
    admin_type() {
      return this.$store.state.admin_type;
    }
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      this.$axios
        .post("/api/admin/getblog", {
          username: this.admin_type
        })
        .then(Response => {
          if (Response.data.length) {
            this.blog_list = Response.data;
            this.is_show = true;
          } else {
            this.blog_list = Response.data;
            this.is_show = false;
          }
        });
    },
    toComments(blog_id) {
      this.$store.commit("SAVE_ADMIN_TYPE", blog_id);
      this.$router.push({
        name: "AdminComments",
        params: { blog_id: blog_id }
      });
    },
    DeleteBlog(blog_id) {
      this.$axios
        .post("/api/admin/deleteblog", {
          blog_id: blog_id
        })
        .then(this.initData());
    }
  },
  watch: {
    admin_type() {
      this.initData();
    }
  }
};
</script>