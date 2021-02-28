<template>
  <div>
    <div class="mx-auto row">
      <div id="map" class="col-8" style="height:40rem"></div>
      <div id="panel1" class="col-4" style="height:40rem"></div>
    </div>
    <!-- <div class="mx-auto row">
      <div id="panel2"></div>
    </div>-->
  </div>
</template>
<script>
import AMap from "AMap";
export default {
  name: "Map",
  data() {
    return {
      Maddress: "",
      map: ""
      // begin_city: "",
      // end_addressname: "",
      // end_addresscity: ""
    };
  },
  mounted() {
    this.initMap();
  },
  props: {
    blog_id: {
      type: String,
      default: ""
    }
  },

  methods: {
    initMap() {
      this.$axios
        .post("/api/getMaddress", {
          id: this.blog_id
        })
        .then(Response => {
          if (Response.data.length) {
            this.Maddress =
              Response.data[0].address_province +
              Response.data[0].address_city +
              Response.data[0].address_specific;
          } else {
            // eslint-disable-next-line no-console
            console.log("err");
          }
        })
        .then(() => {
          var address = this.Maddress;
          var map = new AMap.Map("map", {
            resizeEnable: true,
            zoom: 11
          });
          var roadNet = new AMap.TileLayer.RoadNet();
          var traffic = new AMap.TileLayer.Traffic({
            autoRefresh: true, //是否自动刷新，默认为false
            interval: 180 //刷新间隔，默认180s
          });
          map.add(roadNet);
          map.add(traffic);
          AMap.plugin("AMap.ToolBar", function() {
            //异步加载插件
            var toolbar = new AMap.ToolBar();
            map.addControl(toolbar);
          });
          AMap.service(["AMap.PlaceSearch"], function() {
            //构造地点查询类
            var placeSearch = new AMap.PlaceSearch({
              pageSize: 5, // 单页显示结果条数
              pageIndex: 1, // 页码
              map: map, // 展现结果的地图实例
              panel: "panel1", // 结果列表将在此容器中进行展示。
              autoFitView: true // 是否自动调整地图视野使绘制的 Marker点都处于视口的可见范围
            });
            //关键字查询
            placeSearch.search(address, function(status, result) {
              console.log(
                result.poiList.pois[0].name,
                result.poiList.pois[0].cityname
              );
            });
          });
        });
    }
  }
};
</script>

