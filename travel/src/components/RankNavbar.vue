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
            @click.prevent="toRank(rank1)"
          >博客热度排行-24小时</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toRank(rank2)"
          >地区点击量排行-24小时</a>
        </li>
        <li class="nav-item m-1">
          <a
            href="javascript:void(0)"
            class="nav-link text-secondary"
            style="font-size:1.4rem"
            @click.prevent="toRank(rank3)"
          >地区发博数量排行-30天</a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "RankNavbar",
  data() {
    return {
      rank1: "blog_24h",
      rank2: "address_24h",
      rank3: "address_30d"
    };
  },
  methods: {
    toRank(type) {
      this.$store.commit("SAVE_RANK_TYPE", type);
      this.$router.push({ name: "Rank", params: { rank_id: type } });
    }
  }
};
</script>