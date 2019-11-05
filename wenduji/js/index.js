// 基于准备好的dom，初始化echarts实例
var myChart = echarts.init(document.getElementById("main"));

var TP_value = 7500;
var kd = [];
var Gradient = [];
var leftColor = "";
var showValue = "";
// var boxPosition = [65, 0];
var boxPosition = [20, -10];
var TP_txt = "";
for (var i = 0, len = 10000; i <= len; i++) {
  if (i < 2500 || i > 7500) {
    kd.push("");
  } else {
    if ((i - 2500) % 2500 === 0) {
      console.log(i);
      kd.push("-3");
    } else if ((i - 10) % 4 === 0) {
      // kd.push('-1');
      kd.push("");
    } else {
      kd.push("");
    }
  }
}

Gradient.push(
  {
    offset: 0,
    color: "#00fff0"
  },
  {
    offset: 0.5,
    color: "#ff9600"
  },
  {
    offset: 1,
    color: "#ff0f01"
  }
);

if (TP_value > 10000) {
  showValue = 10000;
} else {
  showValue = TP_value;
}
if (TP_value < -10) {
  boxPosition = [65, -120];
}
var ratio = 1;
leftColor = Gradient[Gradient.length - 1].color;
// 因为柱状初始化为0，温度存在负值，所以加上负值60和空出距离10
var option = {
  // backgroundColor: '#0C2F6F',
  title: {
    text: "温度计",
    show: false,
    left: "top",
    color: "white"
  },
  yAxis: [
    {
      show: false,
      data: [],
      min: 0,
      max: 10000,
      axisLine: {
        show: false
      }
    },
    {
      show: false,
      min: 0,
      max: 10000
    },
    {
      type: "category",
      data: ["", "", "", "", "", "", "", "", "", "", ""],
      position: "left",
      offset: -80,
      axisLabel: {
        fontSize: 10,
        color: "white"
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }
  ],
  xAxis: [
    {
      show: false,
      min: -10,
      max: 80,
      data: []
    },
    {
      show: false,
      min: -10,
      max: 80,
      data: []
    },
    {
      show: false,
      min: -10,
      max: 80,
      data: []
    },
    {
      show: false,
      min: -5,
      max: 80
    }
  ],
  series: [
    {
      name: "条",
      type: "bar",
      // 对应上面XAxis的第一个对)象配置
      xAxisIndex: 0,
      data: [
        {
          value: showValue,
          label: {
            normal: {
              show: true,
              position: boxPosition,
              // backgroundColor: {
              //     image: 'plugin/subway_beijing/images/power/bg5Valuebg.png', //文字框背景图
              // },
              width: 200,
              height: 100,
              // formatter: '{back| ' + TP_value + ' }{unit|°C}\n{downTxt|' + TP_txt +
              //     '}',
              formatter: "{leftTip|◀ } {back|" + TP_value + "}",
              rich: {
                leftTip: {
                  align: "left",
                  lineHeight: 20,
                  fontSize: 20,
                  fontFamily: "微软雅黑",
                  color: "#fff"
                },
                back: {
                  align: "left",
                  lineHeight: 20,
                  fontSize: 20,
                  fontFamily: "微软雅黑",
                  // color: leftColor,
                  color: "#fff"
                },
                unit: {
                  fontFamily: "微软雅黑",
                  fontSize: 15,
                  lineHeight: 50,
                  color: leftColor,
                  align: "left"
                },
                downTxt: {
                  lineHeight: 50,
                  fontSize: 25,
                  align: "left",
                  color: "#fff"
                }
              }
            }
          }
        }
      ],

      barWidth: 10 * ratio,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient),
          barBorderRadius: 10
        }
      },
      z: 2
    },
    {
      name: "白框",
      type: "bar",
      xAxisIndex: 1,
      barGap: "-100%",
      data: [9900],
      barWidth: 20 * ratio,
      itemStyle: {
        normal: {
          color: "#0C2E6D",
          barBorderRadius: 50
        }
      },
      z: 1
    },
    {
      name: "外框",
      type: "bar",
      xAxisIndex: 2,
      barGap: "-100%",
      data: [10000],
      barWidth: 25 * ratio,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 1, 0, 0, Gradient),
          barBorderRadius: 20
        }
      },
      z: 0
    },

    {
      name: "刻度",
      type: "bar",
      yAxisIndex: 0,
      xAxisIndex: 3,
      label: {
        normal: {
          show: true,
          position: "left",
          distance: 10,
          color: "white",
          fontSize: 12,

          formatter: function(params) {
            if (params.dataIndex > 10000 || params.dataIndex < 10) {
              return "";
            } else {
              if ((params.dataIndex - 2500) % 2500 === 0) {
                console.log(params.dataIndex);
                return params.dataIndex;
              } else return "";
            }
          }
        }
      },
      barGap: "-100%",

      data: kd,
      barWidth: 1,
      itemStyle: {
        normal: {
          color: "white",
          barBorderRadius: 120
        }
      },
      z: 0
    }
  ]
};
// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
