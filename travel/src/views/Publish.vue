<template>
  <div>
    <Header></Header>
    <div class="container-fluid">
      <!-- <Navbar></Navbar> -->
      <div
        class="col-xl-8 mx-xl-auto col-lg-8 mx-lg-auto col-md-10 offset-md-2"
        style="margin-top:5rem !important;background-color:rgba(0,0,0,0)"
      >
        <div class="row">
          <div class="col">
            <h3>发表博客</h3>
          </div>
          <div class="mr-3">
            <a href="javascript:void(0)" @click="quit()">
              <svg
                class="bi bi-x svg1"
                width="2em"
                height="2em"
                viewBox="0 0 16 16"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.854 4.146a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708-.708l7-7a.5.5 0 0 1 .708 0z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.146 4.146a.5.5 0 0 0 0 .708l7 7a.5.5 0 0 0 .708-.708l-7-7a.5.5 0 0 0-.708 0z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>

        <div class="row">
          <table class="table table-light">
            <tbody>
              <tr scope="row" class="px-0" style="font-size:1.3rem">
                <td class="pt-3">标题:</td>
                <td>
                  <input
                    type="text"
                    class="form-control align-baseline"
                    name="blogname"
                    id="blogname"
                    autocomplete="off"
                    placeholder="请输入标题"
                    v-model="blog_title"
                  />
                </td>
                <td class="pt-3">景区地址:</td>
                <td>
                  <select
                    id="province"
                    name="province"
                    class="custom-select align-baseline"
                    autocomplete="off"
                    aria-placeholder="请选择省份"
                    v-model="choice_province"
                  >
                    <option
                      v-for="item in province_list"
                      :key="item.address_province"
                    >{{item.address_province}}</option>
                  </select>
                </td>
                <td>
                  <select
                    id="city"
                    name="city"
                    class="custom-select align-baseline"
                    autocomplete="off"
                    aria-placeholder="请选择城市"
                    v-model="choice_city"
                  >
                    <option v-for="item in city_list" :key="item.address_city">{{item.address_city}}</option>
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="请输入具体地址"
                    v-model="address_specific"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- content -->
        <div class="row">
          <keep-alive>
            <tinymce
              :blog_title="blog_title"
              :choice_province="choice_province"
              :choice_city="choice_city"
              :address_specific="address_specific"
            ></tinymce>
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
// import Navbar from "@/components/Navbar.vue";
// import Beside from "@/components/Beside.vue";
import tinymce from "@/components/tinymce.vue";

export default {
  name: "Publish",
  data() {
    return {
      blog_title: "", //博客标题
      ///
      choice_province: "", //选择省份
      choice_city: "", //选择城市
      address_specific: "", //输入具体地址
      ///
      //   is_foreign: "", //是否是外国
      //   foreign_country: "" //外国
      //
      province_list: "",
      city_list: ""
    };
  },
  components: {
    Header,
    tinymce
  },
  watch: {
    choice_province: function() {
      this.getCity();
    }
  },
  created() {
    this.getProvince();
  },
  methods: {
    getProvince() {
      this.$axios.post("/api/addressNavProvince").then(Response => {
        if (Response.data.length) {
          this.province_list = Response.data;
        }
      });
    },
    getCity() {
      this.$axios
        .post("/api/addressNavCity", {
          province: this.choice_province
        })
        .then(Response => {
          this.city_list = Response.data;
        });
    },
    quit() {
      this.$router.push({ path: "/" });
    }
  }
};
</script>

<style>
</style>