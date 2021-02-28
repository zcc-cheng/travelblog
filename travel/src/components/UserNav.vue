<template>
  <div
    class="col-lg-2 col-xl-2 d-none d-lg-block d-xl-block"
    style="border-left: 1px solid rgba(0,0,0,.1);position:fixed;top:5rem;bottom:0;right:0;background-color:rgba(0,0,0,0);"
  >
    <!-- class="mt-5" style="margin-top:6rem!important;height:200px" -->
    <div class="col-xl-10 col-lg-10" style="background-color:rgba(255,250,240,0.6);height:80rem">
      <div class="card">
        <div class="card-body text-left">
          <h5 class="card-title">{{this.bloginfo.blogauthor}}</h5>
          <p>发博数量:{{info.count_blog}}</p>
          <div class="row">
            <p class="ml-2">他关注的:{{info.count_follow}}</p>
            <p class="col-7">关注他的:{{info.count_followed}}</p>
          </div>
          <div class="row">
            <p class="ml-2">他收藏的:{{info.count_collect}}</p>
            <p class="col-7">收藏他的:{{info.count_collected}}</p>
          </div>
          <div class="row">
            <p class="ml-2">他喜欢的:{{info.count_like}}</p>
            <p class="col-7">喜欢他的:{{info.count_liked}}</p>
          </div>
          <div class="row">
            <button
              class="btn btn-secondary mr-1 ml-1"
              @click.prevent="toMyblog(info.username)"
            >他的博客</button>
            <!-- <button class="btn btn-secondary" @click.prevent="toUser(info.username)">他的信息</button> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "UserNav"
};
</script>