<template>
  <div class="left-bottom">
    <div class="title">系统访问量</div>
    <chart style="width: 100%;height: 13rem;" :options="line"></chart>
    <chart style="width: 47%;height: 13rem;display: inline-block" :options="circle"></chart>
    <chart
      style="width: 47%;height: 13rem;display: inline-block"
      :options="orgOptions"
      :auto-resize="true"
    ></chart>
    <chart
      style="width: 100%;height: 20rem;display: inline-block"
      :options="province"
      :auto-resize="true"
    ></chart>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
export default {
  data() {
    return {
      line: {
        legend: {
          // 图例组件颜色配置
          data: [
            {
              name: "学生",
              icon: "circle",
              textStyle: { color: "#fff" }
            },
            {
              name: "班主任",
              icon: "circle",
              textStyle: { color: "#fff" }
            },
            {
              name: "系管理员",
              icon: "circle",
              textStyle: { color: "#fff" }
            },
            {
              name: "校管理员",
              icon: "circle",
              textStyle: { color: "#fff" }
            }
          ]
        },
        grid: {
          // 网格
          left: "-2.3%",
          right: "1.6%",
          bottom: "10%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          splitLine: {
            // 保留网格线
            show: true,
            lineStyle: {
              color: "#666"
            }
          },
          splitArea: {
            // 去除网格区域
            show: false,
            lineStyle: {
              color: "#666"
            }
          },
          type: "category",
          boundaryGap: false,
          axisLine: {
            // 坐标轴
            lineStyle: {
              color: "#ccc"
            }
          },
          axisTick: {
            // 坐标轴刻度设置
            inside: true,
            interval: 0
          },
          axisLabel: {
            interval: 0,
            fontSize: 8
          },
          data: [
            "12:00",
            "13:00",
            "14:00",
            "15:00",
            "16:00",
            "17:00",
            "18:00",
            "19:00",
            "20:00",
            "21:00",
            "22:00",
            "23:00",
            "24:00",
            "01:00",
            "02:00",
            "03:00",
            "04:00",
            "05:00",
            ""
          ]
        },
        yAxis: {
          min: 1000,
          splitLine: {
            // 保留网格线
            show: true,
            lineStyle: {
              color: "#666"
            }
          },
          splitArea: {
            // 去除网格区域
            show: false,
            lineStyle: {
              color: "#666"
            }
          },
          type: "value",
          axisLabel: {
            interval: "0",
            fontSize: 8.5
          },
          axisLine: {
            lineStyle: {
              color: "#ccc"
            }
          },
          axisTick: {
            inside: true
          },
          data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000]
        },
        series: [
          {
            name: "学生",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              normal: {
                color: "#00ff7e",
                lineStyle: {
                  color: "#00ff7e"
                }
              }
            },
            data: [1700, 1720, 1010, 1340, 900, 2300, 2100, 1500]
          },
          {
            name: "班主任",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              normal: {
                color: "#0060ff",
                lineStyle: {
                  color: "#0060ff"
                }
              }
            },
            data: [1200, 1820, 1910, 2304, 2090, 3040, 3010, 3000]
          },
          {
            name: "系管理员",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              normal: {
                color: "#00ccff",
                lineStyle: {
                  color: "#00ccff"
                }
              }
            },
            data: [1500, 2320, 2010, 1054, 1900, 3300, 3100, 3500]
          },
          {
            name: "校管理员",
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 7,
            itemStyle: {
              normal: {
                color: "#ffae00",
                lineStyle: {
                  color: "#ffae00"
                }
              }
            },
            data: [1200, 3320, 301, 3304, 3900, 330, 3200, 3050]
          }
        ]
      },
      circle: {},
      orgOptions: {},
      province: {},
      data: [
        [
          [28604, 77, 17096869, "上海", 2018],
          [31163, 77.4, 27662440, "广州", 2018],
          [1516, 68, 1154605773, "北京", 2018],
          [13670, 74.7, 10582082, "山东", 2018],
          [28599, 75, 4986705, "成都", 2018],
          [29476, 77.1, 56943299, "西安", 2018],
          [31476, 75.4, 78958237, "太原", 2018],
          [28666, 78.1, 254830, "杭州", 2018],
          [1777, 57.7, 870601776, "深圳", 2018],
          [29550, 79.1, 122249285, "昆明", 2018],
        ],
        [
          [44056, 81.8, 23968973, "上海", 2019],
          [43294, 81.7, 35939927, "广州", 2019],
          [13334, 76.9, 1376048943, "北京", 2019],
          [21291, 78.5, 11389562, "山东", 2019],
          [38923, 80.8, 5503457, "成都", 2019],
          [37599, 81.9, 64395345, "西安", 2019],
          [44053, 81.1, 80688545, "太原", 2019],
          [42182, 82.8, 329425, "杭州", 2019],
          [5903, 66.8, 1311050527, "深圳", 2019],
          [36162, 83.5, 126573481, "昆明", 2019],
        
        ]
      ]
    };
  },
  mounted() {
    var _this = this;
    this.province = {
      backgroundColor: new echarts.graphic.RadialGradient(0.3, 0.3, 0.8, [
        {
          offset: 0,
          color: "#f7f8fa"
        },
        {
          offset: 1,
          color: "#cdd0d5"
        }
      ]),
      title: {
        text: "就业地区分布图"
      },
      legend: {
        right: 10,
        data: ["2018", "2019"]
      },
      xAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        }
      },
      yAxis: {
        splitLine: {
          lineStyle: {
            type: "dashed"
          }
        },
        scale: true
      },
      series: [
        {
          name: "2018",
          data: this.data[0],
          type: "scatter",
          symbolSize: function(data) {
            return Math.sqrt(data[2]) / 5e2;
          },
          label: {
            emphasis: {
              show: true,
              formatter: function(param) {
                return param.data[3];
              },
              position: "top"
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: "rgba(120, 36, 50, 0.5)",
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: "rgb(251, 118, 123)"
                },
                {
                  offset: 1,
                  color: "rgb(204, 46, 72)"
                }
              ])
            }
          }
        },
        {
          name: "2019",
          data: this.data[1],
          type: "scatter",
          symbolSize: function(data) {
            return Math.sqrt(data[2]) / 5e2;
          },
          label: {
            emphasis: {
              show: true,
              formatter: function(param) {
                return param.data[3];
              },
              position: "top"
            }
          },
          itemStyle: {
            normal: {
              shadowBlur: 10,
              shadowColor: "rgba(25, 100, 150, 0.5)",
              shadowOffsetY: 5,
              color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [
                {
                  offset: 0,
                  color: "rgb(129, 227, 238)"
                },
                {
                  offset: 1,
                  color: "rgb(25, 183, 207)"
                }
              ])
            }
          }
        }
      ]
    };
    this.circle = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        orient: "vertical",
        x: "left",
        data: ["web前端", "java开发", "安卓开发", "nodeJs开发", "UI"]
      },
      series: [
        {
          name: "访问来源",
          type: "pie",
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: "center"
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: "30",
                fontWeight: "bold"
              }
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: [
            { value: 335, name: "web前端" },
            { value: 310, name: "java开发" },
            { value: 234, name: "安卓开发" },
            { value: 135, name: "nodeJs开发" },
            { value: 1548, name: "UI" }
          ]
        }
      ]
    };
    this.$nextTick(() => {
      _this.orgOptions = {
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            smooth: true
          }
        ]
      };
    });
  }
};
</script>
<style>
.left-bottom {
  width: 100%;
  height: 100%;
  position: relative;
}
.echarts {
  width: 100%;
  height: 100%;
}
</style>
