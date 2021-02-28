<template>
  <div>
    <div :id="type" style="height:600px;width:600px" class="mx-auto"></div>
  </div>
</template>
<script>
export default {
  name: "Echarts",
  data() {
    return {
      myChart: ""
    };
  },
  props: {
    type: {
      default: ""
    },
    chart_data: {
      default: ""
    },
    province_list: {
      default: ""
    }
  },
  mounted() {
    this.initChart(this.type);
  },
  methods: {
    initChart(type) {
      if (type == "bar1") {
        this.myChart = this.$echarts.init(
          document.getElementById("" + this.type + "")
        );
        this.myChart.setOption({
          title: {
            text: "发博数量最多的地区"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.province_list,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "博客数量",
              type: "bar",
              barWidth: "60%",
              data: this.chart_data
            }
          ]
        });
      } else if (type == "pie1") {
        var pie_data = [];
        var pie_obj = {};
        for (var j = 0; j <= this.province_list.length - 1; j++) {
          console.log(this.province_list[j], this.chart_data[j]);
          pie_obj.value = this.chart_data[j];
          pie_obj.name = this.province_list[j];
          pie_data.push(pie_obj);
          console.log(pie_data);
          pie_obj = {};
        }
        this.myChart = this.$echarts.init(
          document.getElementById("" + this.type + "")
        );
        this.myChart.setOption({
          title: {
            text: "点击量最多的地区",
            left: "center"
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: "vertical",
            left: "left",
            data: this.province_list
          },
          series: [
            {
              name: "点击量",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: pie_data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)"
                }
              }
            }
          ]
        });
      } else if (type == "bar2") {
        this.myChart = this.$echarts.init(
          document.getElementById("" + this.type + "")
        );
        this.myChart.setOption({
          title: {
            text: "最受欢迎的博主"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.province_list,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0, //横轴信息全部显示
                rotate: -30 //-30度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "关注量",
              type: "bar",
              barWidth: "60%",
              data: this.chart_data
            }
          ]
        });
      } else if (type == "bar3") {
        this.myChart = this.$echarts.init(
          document.getElementById("" + this.type + "")
        );
        this.myChart.setOption({
          title: {
            text: "最受欢迎的文章"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.province_list,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0, //横轴信息全部显示
                rotate: -30 //-30度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "喜欢量",
              type: "bar",
              barWidth: "60%",
              data: this.chart_data
            }
          ]
        });
      } else if (type == "bar4") {
        this.myChart = this.$echarts.init(
          document.getElementById("" + this.type + "")
        );
        this.myChart.setOption({
          title: {
            text: "文章24小时点击量"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.province_list,
              axisTick: {
                alignWithLabel: true
              },
              axisLabel: {
                interval: 0, //横轴信息全部显示
                rotate: -30 //-30度角倾斜显示
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "24小时点击量",
              type: "bar",
              barWidth: "60%",
              data: this.chart_data
            }
          ]
        });
      } else if (type == "bar5") {
        this.myChart = this.$echarts.init(
          document.getElementById("" + this.type + "")
        );
        this.myChart.setOption({
          title: {
            text: "地区24小时点击量"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.province_list,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "点击量",
              type: "bar",
              barWidth: "60%",
              data: this.chart_data
            }
          ]
        });
      } else if (type == "bar6") {
        this.myChart = this.$echarts.init(
          document.getElementById("" + this.type + "")
        );
        this.myChart.setOption({
          title: {
            text: "地图30天发博数量"
          },
          color: ["#3398DB"],
          tooltip: {
            trigger: "axis",
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: "3%",
            right: "4%",
            bottom: "3%",
            containLabel: true
          },
          xAxis: [
            {
              type: "category",
              data: this.province_list,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis: [
            {
              type: "value"
            }
          ],
          series: [
            {
              name: "发博数量",
              type: "bar",
              barWidth: "60%",
              data: this.chart_data
            }
          ]
        });
      }
    }
  }
};
</script>