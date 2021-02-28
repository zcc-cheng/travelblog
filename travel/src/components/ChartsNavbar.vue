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
      <ul class="nav flex-column">
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toCharts(charts1)"
          >点击量最多的地区-饼图</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toCharts(charts2)"
          >博客数量最多的地区-柱状图</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toCharts(charts3)"
          >最受欢迎的博主-柱状图</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toCharts(charts4)"
          >最受欢迎的文章-柱状图</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toCharts(charts5)"
          >博客24小时点击量-柱状图</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toCharts(charts6)"
          >地区24小时点击量-柱状图</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toCharts(charts7)"
          >地区30天发博数量-柱状图</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "ChartsNavbar",
  data() {
    return {
      charts1: "pie1", //饼图，点击量最多的地区
      charts2: "bar1", //柱状图，博客数量最多的地区
      charts3: "bar2", //柱状图，最受欢迎的博主
      charts4: "bar3", //柱状图，最受欢迎的文章
      charts5: "bar4", //柱状图，博客24小时点击量
      charts6: "bar5", //柱状图，地区24小时点击量
      charts7: "bar6" //柱状图，地区30天发博数量
    };
  },
  methods: {
    toCharts(charts_type) {
      this.$store.commit("SAVE_CHARTS_TYPE", charts_type);
      this.$router.push({ name: "Charts", params: { charts_id: charts_type } });
    }
  }
};
</script>