$(function() {
  var clock = document.getElementById("clock");

  function initNumXY() {
    var radius = 160; //大圆半径
    var dot_num = 360 / $(".dot").length; //每个div 对应的 弧度数
    //每一个dot 对应的 弧度
    var ahd = (dot_num * Math.PI) / 180;
    $(".dot").each(function(index, el) {
      $(this).css({
        left: 180 + Math.sin(ahd * index) * radius,
        top: 180 + Math.cos(ahd * index) * radius
      });
    });
    //刻钟设置
    for (let index = 0; index < 60; index++) {
      clock.innerHTML +=
        "<div class='clock-scale'>" +
        "<div class='scale-hidden'></div>" +
        "<div class='scale-show'></div>" +
        "</div>";
    }
    var scale = document.getElementsByClassName("clock-scale");
    for (let index = 0; index < scale.length; index++) {
      scale[index].style.transform = "rotate(" + (index * 6 - 90) + "deg)";
    }
  }
  initNumXY(); //调用函数
  var hour_line = document.getElementById("hour_line"),
    minute_line = document.getElementById("minute_line"),
    second_line = document.getElementById("second_line"),
    date_info = document.getElementById("date_info"),
    hour_time = document.getElementById("hour_time"),
    minute_time = document.getElementById("minute_time"),
    second_time = document.getElementById("second_time");
  //设置动态时间
  function setTime() {
    var nowDate = new Date();
    console.log(nowDate.getDay());
    var year = nowDate.getFullYear(),
      month = nowDate.getMonth() + 1,
      day = nowDate.getDay(),
      hours = nowDate.getHours(),
      minutes = nowDate.getMinutes(),
      seconds = nowDate.getSeconds(),
      date = nowDate.getDate();
    if (date < 10) {
      date = "0" + date;
    }
    var weekDay = [
      "星期日",
      "星期一",
      "星期二",
      "星期三",
      "星期四",
      "星期五",
      "星期六"
    ];
    //获取日期id
    date_info.innerHTML =
      year + "年" + month + "月" + date + "日   " + weekDay[day];
    hour_time.innerHTML = hours >= 10 ? hours : "0" + hours;
    minute_time.innerHTML = minutes >= 10 ? minutes : "0" + minutes;
    second_time.innerHTML = seconds >= 10 ? seconds : "0" + seconds;
    // console.log(year + "年" + month + "月" + day + "日   " + weekDay[day]);
    //时分秒针设置
    var hour_rotate = hours * 30 - 90 + Math.floor(minutes / 12) * 6;
    hour_line.style.transform = "rotate(" + hour_rotate + "deg)";
    minute_line.style.transform = "rotate(" + (minutes * 6 - 90) + "deg)";
    second_line.style.transform = "rotate(" + (seconds * 6 - 90) + "deg)";
  }
  setInterval(setTime, 1000);
});
