<template>
  <div
    class="col-md-2 col-lg-2 col-xl-2 d-none d-md-block d-lg-block d-xl-block"
    style="border-right: 1px solid rgba(0,0,0,.1);position:fixed;left:0;top:5rem;bottom:0;background-color:rgba(0,0,0,0);"
  >
    <!-- class="mt-5" style="margin-top:5rem!important" -->
    <div
      class="col-xl-10 col-lg-10 col-md-12 offset-lg-2 offset-xl-2"
      style="background-color:rgba(255,250,240,0.6);height:80rem"
    >
      <div v-show="is_hasData==true">
        <ul class="nav flex-column">
          <div class="accordion pre-scrollable scrollstyle" id="accordionNav">
            <div id="headingOne">
              <li class="nav-item">
                <a
                  href="javascript:void(0)"
                  style="font-size:2rem;"
                  class="nav-link text-secondary m-auto"
                  data-toggle="collapse"
                  data-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >地址导航</a>
              </li>
            </div>
            <div
              id="collapseOne"
              class="collapse show"
              aria-labelledby="headingOne"
              data-parent="#accordionNav"
            >
              <ul class="nav flex-column" v-for="item in NavData" :key="item.address_province">
                <li class="nav-item">
                  <a
                    href="javascript:void(0)"
                    class="nav-item text-secondary"
                    style="font-size:1.6rem"
                    @click.prevent="toAddressBlog(item.address_province)"
                  >{{item.address_province}}</a>
                </li>
              </ul>
            </div>
          </div>
        </ul>
        <!--  -->
        <div class="mt-3" style="border-top:1px solid rgba(0,0,0,.1)">
          <div class="row mt-3">
            <h6 class="mx-auto" style="font-size:2rem">热门地点</h6>
          </div>
          <ul class="nav flex-column" v-for="item in popularProvince" :key="item.address_province">
            <li class="nav-item">
              <a
                href="javascript:void(0)"
                class="nav-link text-secondary"
                @click.prevent="toAddressBlog(item.address_province)"
              >{{item.address_province}}</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="is_hasData==false">
        <ul class="nav flex-column">
          <li class="nav-item">
            <p>导航数据错误</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  data() {
    return {
      is_hasData: true,
      NavData: "",
      popularProvince: ""
    };
  },
  created() {
    this.initNavData();
    this.initData();
  },
  methods: {
    initData() {
      this.$axios.post("/api/getPopularProvinces").then(response => {
        if (response.data.length) {
          this.popularProvince = response.data;
        }
      });
    },
    initNavData() {
      this.$axios.post("/api/addressNavProvince").then(Response => {
        if (Response.data.length) {
          this.NavData = Response.data;
          this.is_hasData = true;
        } else {
          this.is_hasData = false;
        }
      });
    },
    toAddressBlog(address) {
      var address_obj = new Object();
      address_obj.address_province = address;
      this.$store.commit("SAVE_ADDRESSINFO", address_obj);
      var address_id;
      this.$axios
        .post("/api/getaddressblog", {
          address_province: address
        })
        .then(response => {
          if (response.data.length) {
            address_id = response.data[0].address_id;
            this.$store.commit("SAVE_ADDRESS_BLOG_LIST", response.data);
            this.$router.push({
              name: "Address",
              params: { address_id: address_id }
            });
          } else {
            this.$store.commit("SAVE_ADDRESS_BLOG_LIST", response.data);
            address_id = "000000";
            this.$router.push({
              name: "Address",
              params: { address_id: address_id }
            });
          }
        });
    }
  }
};
</script>