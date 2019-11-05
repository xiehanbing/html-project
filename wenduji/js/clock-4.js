let monthText = [
  "一 月",
  "二 月",
  "三 月",
  "四 月",
  "五 月",
  "六 月",
  "七 月",
  "八 月",
  "九 月",
  "十 月",
  "十一月",
  "十二月"
];
let dayText = [
  "一    号",
  "二    号",
  "三    号",
  "四    号",
  "五    号",
  "六    号",
  "七    号",
  "八    号",
  "九    号",
  "十    号",
  "十一  号",
  "十二  号",
  "十三  号",
  "十四  号",
  "十五  号",
  "十六  号",
  "十七  号",
  "十八  号",
  "十九  号",
  "二十  号",
  "二十一号",
  "二十二号",
  "二十三号",
  "二十四号",
  "二十五号",
  "二十六号",
  "二十七号",
  "二十八号",
  "二十九号",
  "三十号",
  "三十一号"
];
let weekText = [
  "星期日",
  "星期一",
  "星期二",
  "星期三",
  "星期四",
  "星期五",
  "星期六"
];
let hourText = [
  "零  点",
  "一  点",
  "两  点",
  "三  点",
  "四  点",
  "五  点",
  "六  点",
  "七  点",
  "八  点",
  "九  点",
  "十  点",
  "十一点",
  "十二点",
  "十三点",
  "十四点",
  "十五点",
  "十六点",
  "十七点",
  "十八点",
  "十九点",
  "二十点",
  "二十一点",
  "二十二点",
  "二十三点"
];
let minuteText = [
  "一    分",
  "二    分",
  "三    分",
  "四    分",
  "五    分",
  "六    分",
  "七    分",
  "八    分",
  "九    分",
  "十    分",
  "十一  分",
  "十二  分",
  "十三  分",
  "十四  分",
  "十五  分",
  "十六  分",
  "十七  分",
  "十八  分",
  "十九  分",
  "二十  分",
  "二十一分",
  "二十二分",
  "二十三分",
  "二十四分",
  "二十五分",
  "二十六分",
  "二十七分",
  "二十八分",
  "二十九分",
  "三十  分",
  "三十一分",
  "三十二分",
  "三十三分",
  "三十四分",
  "三十五分",
  "三十六分",
  "三十七分",
  "三十八分",
  "三十九分",
  "四十  分",
  "四十一分",
  "四十二分",
  "四十三分",
  "四十四分",
  "四十五分",
  "四十六分",
  "四十七分",
  "四十八分",
  "四十九分",
  "五十  分",
  "五十一分",
  "五十二分",
  "五十三分",
  "五十四分",
  "五十五分",
  "五十六分",
  "五十七分",
  "五十八分",
  "五十九分",
  "六十  分"
];
let secondText = [
  "一    秒",
  "二    秒",
  "三    秒",
  "四    秒",
  "五    秒",
  "六    秒",
  "七    秒",
  "八    秒",
  "九    秒",
  "十    秒",
  "十一  秒",
  "十二  秒",
  "十三  秒",
  "十四  秒",
  "十五  秒",
  "十六  秒",
  "十七  秒",
  "十八  秒",
  "十九  秒",
  "二十  秒",
  "二十一秒",
  "二十二秒",
  "二十三秒",
  "二十四秒",
  "二十五秒",
  "二十六秒",
  "二十七秒",
  "二十八秒",
  "二十九秒",
  "三十  秒",
  "三十一秒",
  "三十二秒",
  "三十三秒",
  "三十四秒",
  "三十五秒",
  "三十六秒",
  "三十七秒",
  "三十八秒",
  "三十九秒",
  "四十  秒",
  "四十一秒",
  "四十二秒",
  "四十三秒",
  "四十四秒",
  "四十五秒",
  "四十六秒",
  "四十七秒",
  "四十八秒",
  "四十九秒",
  "五十  秒",
  "五十一秒",
  "五十二秒",
  "五十三秒",
  "五十四秒",
  "五十五秒",
  "五十六秒",
  "五十七秒",
  "五十八秒",
  "五十九秒",
  "六十  秒"
];

// 存放dom元素的数组
let monthList = [];
let dayList = [];
let weekList = [];
let hourList = [];
let minuteList = [];
let secondList = [];

//二维数组 存放文字内容及页面显示标签
let timeTextSet = [
  [monthText, monthList],
  [dayText, dayList],
  [weekText, weekList],
  [hourText, hourList],
  [minuteText, minuteList],
  [secondText, secondList]
];

// 判断是否为旋转页面
let isRotating = false;

//时钟页面
let clock;

window.onload = function() {
  init();
  // 每隔100ms获得 当前时间
  setInterval(function() {
    runTime();
  }, 100);

  // 旋转之前定位到当前时间
  locateCurrent();
  // 3秒后变成旋转样式
  setTimeout(function() {
    toRotate();
  }, 3000);
};
// 初始化函数
function init() {
  clock = document.getElementById("clock");
  // 生成标签 存放文字展示
  for (let i = 0; i < timeTextSet.length; i++) {
    for (let j = 0; j < timeTextSet[i][0].length; j++) {
      let temp = createLabel(timeTextSet[i][0][j]);
      clock.appendChild(temp);
      // 将生成的标签存放在数组list中
      timeTextSet[i][1].push(temp);
    }
  }
}

// 创建标签并将文字填充标签内 接收参数为文字内容
function createLabel(text) {
  let div = document.createElement("div");
  div.classList.add("label");
  div.innerText = text;
  return div;
}

function runTime() {
  //当前时间获取
  let now = new Date();
  let month = now.getMonth();
  let day = now.getDate();
  let week = now.getDay();
  let hour = now.getHours();
  let minute = now.getMinutes();
  let seconds = now.getSeconds();

  // 初始化时间颜色 并将走过的时间设置为黑色
  initStyle();

  // 当前时间设为与背景色对比度高一点的颜色
  // 将当前时间月份存放在数组中
  let nowValue = [month, day - 1, week, hour, minute, seconds];
  for (let i = 0; i < nowValue.length; i++) {
    let num = nowValue[i];
    timeTextSet[i][1][num].style.color = "blue";
  }

  // 变成旋转时钟
  if (isRotating) {
    // 圆心位置确定
    let widthMid = document.body.clientWidth / 2;
    let heightMid = document.body.clientHeight / 2;
    // 将每一个dom元素确定到圆的位置
    for (let i = 0; i < timeTextSet.length; i++) {
      for (let j = 0; j < timeTextSet[i][0].length; j++) {
        // 计算出每一个元素的位置  x y 坐标，圆的半径与时分秒的位置有关
        let r = (i + 1) * 35 + 50 * i;
        // 计算每一个平均的角度  将每一个单位对齐,再转化成弧度
        let deg = (360 / timeTextSet[i][1].length) * (j - nowValue[i]);
        // 计算dom元素的坐标
        let x = r * Math.sin((deg * Math.PI) / 180) + widthMid;
        let y = heightMid - r * Math.cos((deg * Math.PI) / 180);
        // 样式
        let temp = timeTextSet[i][1][j];
        temp.style.transform = "rotate(" + (-90 + deg) + "deg)";
        temp.style.left = x + "px";
        temp.style.top = y + "px";
      }
    }
  }
}

function initStyle() {
  // 将所有标签置为灰色
  let label = document.getElementsByClassName("label");
  for (let i = 0; i < label.length; i++) {
    label[i].style.color = "lightgray";
  }
}

function locateCurrent() {
  for (let i = 0; i < timeTextSet.length; i++) {
    for (let j = 0; j < timeTextSet[i][1].length; j++) {
      // 获取原来的位置  再修改position 设置left top
      let tempX = timeTextSet[i][1][j].offsetLeft + "px";
      let tempY = timeTextSet[i][1][j].offsetTop + "px";
      // console.log(timeTextSet[i][1][j]);
      // 利用let 防止闭包
      setTimeout(function() {
        timeTextSet[i][1][j].style.position = "absolute";
        timeTextSet[i][1][j].style.left = tempX;
        timeTextSet[i][1][j].style.top = tempY;
      }, 50);
    }
  }
}

function toRotate() {
  isRotating = true;
  clock.style.transform = "rotate(90deg)";
}
