<template>
  <div>
    <Header></Header>
    <div class="container-fluid">
      <ChartsNavbar></ChartsNavbar>
      <div class="row">
        <div
          class="col-xl-8 mx-xl-auto col-lg-8 mx-lg-auto col-md-10 offset-md-2"
          style="margin-top:5rem !important;background-color:rgba(0,0,0,0)"
        >
          <div class="mx-auto">
            <div class="mx-auto" v-show="show_tip==true" style="font-size:3rem">点击左侧导航查看图表</div>
            <Echarts
              v-if="is_show"
              :type="type"
              :chart_data="chart_data"
              :province_list="province_list"
            ></Echarts>
          </div>
        </div>
      </div>
      <Beside></Beside>
    </div>
  </div>
</template>
<script>
import Echarts from "@/components/Echarts.vue";
import Header from "@/components/Header.vue";
import ChartsNavbar from "@/components/ChartsNavbar.vue";
import Beside from "@/components/Beside.vue";
export default {
  name: "Charts",
  components: {
    ChartsNavbar,
    Header,
    Beside,
    Echarts
  },
  data() {
    return {
      type: "",
      is_show: "",
      show_tip: false,
      province_list: [],
      chart_data: []
    };
  },
  computed: {
    charts_type() {
      return this.$store.state.charts_type;
    }
  },
  watch: {
    charts_type() {
      this.is_show = false;
      this.initType();
      this.initData(this.type);
    }
  },
  created() {
    this.initType();
    this.initData(this.type);
  },
  methods: {
    initData(type) {
      if (type == "bar1") {
        this.$axios.post("/api/echarts/bar1").then(Response => {
          if (Response.data.length) {
            this.province_list = [];
            this.chart_data = [];

            this.$nextTick(() => {
              this.is_show = true;
            });

            for (var i = 0; i <= Response.data.length; i++) {
              this.province_list.push(Response.data[i].address_province);
              this.chart_data.push(Response.data[i].blog_count);
            }
          }
        });
      } else if (type == "pie1") {
        this.$axios.post("/api/echarts/pie1").then(Response => {
          if (Response.data.length) {
            this.province_list = [];
            this.chart_data = [];

            this.$nextTick(() => {
              this.is_show = true;
            });
            for (var i = 0; i <= Response.data.length; i++) {
              this.province_list.push(Response.data[i].address_province);
              this.chart_data.push(Response.data[i].blog_sum);
            }
          }
        });
      } else if (type == "bar2") {
        this.$axios.post("/api/echarts/bar2").then(Response => {
          if (Response.data.length) {
            this.province_list = [];
            this.chart_data = [];

            this.$nextTick(() => {
              this.is_show = true;
            });

            for (var i = 0; i <= Response.data.length; i++) {
              this.province_list.push(Response.data[i].follow_username);
              this.chart_data.push(Response.data[i].follow_count);
            }
          }
        });
      } else if (type == "bar3") {
        this.$axios.post("/api/echarts/bar3").then(Response => {
          if (Response.data.length) {
            this.province_list = [];
            this.chart_data = [];

            this.$nextTick(() => {
              this.is_show = true;
            });

            for (var i = 0; i <= Response.data.length; i++) {
              this.province_list.push(Response.data[i].blog_name);
              this.chart_data.push(Response.data[i].liked);
            }
          }
        });
      } else if (type == "bar4") {
        this.$axios.post("/api/echarts/bar4").then(Response => {
          if (Response.data.length) {
            this.province_list = [];
            this.chart_data = [];

            this.$nextTick(() => {
              this.is_show = true;
            });

            for (var i = 0; i <= Response.data.length; i++) {
              this.province_list.push(Response.data[i].blog_title);
              this.chart_data.push(Response.data[i].rank_24);
            }
          }
        });
      } else if (type == "bar5") {
        this.$axios.post("/api/echarts/bar5").then(Response => {
          if (Response.data.length) {
            this.province_list = [];
            this.chart_data = [];

            this.$nextTick(() => {
              this.is_show = true;
            });

            for (var i = 0; i <= Response.data.length; i++) {
              this.province_list.push(Response.data[i].province);
              this.chart_data.push(Response.data[i].address_count);
            }
          }
        });
      } else if (type == "bar6") {
        this.$axios.post("/api/echarts/bar6").then(Response => {
          if (Response.data.length) {
            this.province_list = [];
            this.chart_data = [];

            this.$nextTick(() => {
              this.is_show = true;
            });

            for (var i = 0; i <= Response.data.length; i++) {
              this.province_list.push(Response.data[i].province);
              this.chart_data.push(Response.data[i].address_num);
            }
          }
        });
      } else if (type == "charts") {
        (this.province_list = []),
          (this.chart_data = []),
          (this.type = ""),
          (this.is_show = "");
      }
    },
    initType() {
      this.type = this.charts_type;
      if (this.type == "charts") {
        this.show_tip = true;
      } else {
        this.show_tip = false;
      }
    }
  }
};
</script>