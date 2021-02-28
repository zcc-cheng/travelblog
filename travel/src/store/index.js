import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logininfo: JSON.parse(localStorage.getItem("logininfo")), //存储登录用户信息，判断是否登录
    address_blog_list: JSON.parse(localStorage.getItem("address_blog_list")), //存储相关地址的博客列表
    userinfo: JSON.parse(localStorage.getItem("userinfo")), //存储用户信息
    addressinfo: JSON.parse(localStorage.getItem("addressinfo")), //存储地址信息主要是省份
    // followblog_list: JSON.parse(localStorage.getItem("followblog_list")), //存储关注的用户的博客列表
    blog_list: JSON.parse(localStorage.getItem("blog_list")), //存储博客列表
    myblog_list: JSON.parse(localStorage.getItem("myblog_list")), //存储我发布的博客列表
    userblog_list: JSON.parse(localStorage.getItem("userblog_list")), //存储用户的博客列表
    followuser_list: JSON.parse(localStorage.getItem("followuser_list")), //存储用户关注的用户列表
    // record_list: JSON.parse(localStorage.getItem("record_list")), //存储浏览记录列表
    bloginfo: JSON.parse(localStorage.getItem("bloginfo")), //存储博客信息
    search_list: JSON.parse(localStorage.getItem("search_list")),
    charts_type: JSON.parse(localStorage.getItem("charts_type")), //存储图标类型
    charts_data: JSON.parse(localStorage.getItem("charts_data")), //存储图标y数据
    charts_address: JSON.parse(localStorage.getItem("charts_address")), //存储图标x数据
    rank_type: JSON.parse(localStorage.getItem("rank_type")), //存储rank 类型
    admin_type: JSON.parse(localStorage.getItem("admin_type"))

  },
  mutations: {
    SAVE_ADMIN_TYPE(state, admin_type) {
      state.admin_type = admin_type
      localStorage.setItem("admin_type", JSON.stringify(admin_type))
    },
    SAVE_RANK_TYPE(state, rank_type) {
      state.rank_type = rank_type
      localStorage.setItem("rank_type", JSON.stringify(rank_type))
    },
    SAVE_CHARTS_ADDRESS(state, charts_address) {
      state.charts_address = charts_address
      localStorage.setItem("charts_address", JSON.stringify(charts_address))
    },
    SAVE_CHARTS_DATA(state, charts_data) {
      state.charts_data = charts_data
      localStorage.setItem("charts_data", JSON.stringify(charts_data))
    },
    SAVE_CHARTS_TYPE(state, charts_type) {
      state.charts_type = charts_type
      localStorage.setItem("charts_type", JSON.stringify(charts_type))
    },
    SAVE_SEARCH_LIST(state, search_list) {
      state.search_list = search_list
      localStorage.setItem("search_list", JSON.stringify(search_list))
    },
    SAVE_BLOGINFO(state, bloginfo) {
      state.bloginfo = bloginfo
      localStorage.setItem("bloginfo", JSON.stringify(bloginfo))
    },
    // SAVE_RECORD_LIST(state, record_list) {
    //   state.record_list = record_list
    //   localStorage.setItem("record_list", JSON.stringify(record_list))
    // },
    SAVE_FOLLOWUSER_LIST(state, followuser_list) {
      state.followuser_list = followuser_list
      localStorage.setItem("followuser_list", JSON.stringify(followuser_list))
    },
    SAVE_USERBLOG_LIST(state, userblog_list) {
      state.userblog_list = userblog_list
      localStorage.setItem("userblog_list", JSON.stringify(userblog_list))
    },
    SAVE_MYBLOG_LIST(state, myblog_list) {
      state.myblog_list = myblog_list
      localStorage.setItem("myblog_list", JSON.stringify(myblog_list))
    },
    SAVE_BLOG_LIST(state, blog_list) {
      state.blog_list = blog_list
      localStorage.setItem("blog_list", JSON.stringify(blog_list))
    },
    // SAVE_FOLLOWBLOG_LIST(state, followblog_list) {
    //   state.followblog_list = followblog_list
    //   localStorage.setItem("followblog_list", JSON.stringify(followblog_list))
    // },
    SAVE_USERINFO(state, userinfo) {
      state.userinfo = userinfo
      localStorage.setItem("userinfo", JSON.stringify(userinfo))
    },
    SAVE_ADDRESS_BLOG_LIST(state, address_blog_list) {
      state.address_blog_list = address_blog_list
      localStorage.setItem("address_blog_list", JSON.stringify(address_blog_list))
    },
    SAVE_LOGININFO(state, logininfo) {
      state.logininfo = logininfo
      localStorage.setItem("logininfo", JSON.stringify(logininfo))
    },
    CLEAR_LOGININFO(state) {
      state.logininfo = null
    },
    SAVE_ADDRESSINFO(state, addressinfo) {
      state.addressinfo = addressinfo
      localStorage.setItem("addressinfo", JSON.stringify(addressinfo))
    },
  },
  actions: {},
  modules: {}
})