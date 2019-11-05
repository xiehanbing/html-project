(function($) {
  //屏幕截屏并下载
  $.fn.createScreenDownLoad = function() {
    html2canvas(this, {
      allowTaint: true,
      taintTest: false,
      onrendered: function(canvas) {
        canvas.id = "mycanvas";
        //document.body.appendChild(canvas);
        //生成base64图片数据
        var dataUrl = canvas.toDataURL("image/png");
        // var newImg = document.createElement("img");
        // newImg.src = dataUrl;
        // document.body.appendChild(newImg);
        // _createFrame(dataUrl);
        random = Math.floor(Math.random() * 100 + 1);
        var timestamp = new Date().valueOf();
        download(timestamp, dataUrl);
      }
    });
  };
  //屏幕截屏  回调函数
  $.fn.createScreen = function(callback) {
    html2canvas(this, {
      allowTaint: true,
      taintTest: false,
      onrendered: function(canvas) {
        canvas.id = "mycanvas";
        //document.body.appendChild(canvas);
        //生成base64图片数据
        var dataUrl = canvas.toDataURL("image/png");
        callback(dataUrl);
        // var timestamp = new Date().valueOf();
        // download(timestamp, dataUrl);
      }
    });
  };
  //全局下载本地图片方法
  $.downloadLocalImage = download;
  //全局下载本地图片方法
  $.downloadNetImage = downloadNetImage;

  $.downloadLocalBlobImage = downloadLocalBlobImage;
  /**
   * 下载生成的图片
   * @param {string} name 图片名称
   * @param {string} url 图片地址
   */
  function download(name, url) {
    var a = document.createElement("a");
    var event = new MouseEvent("click");
    a.download = name;
    a.href = url;
    a.dispatchEvent(event);
  }
  /**
   * downloadBlob 下载 blob 数据
   * @param {string} name 名称
   * @param {Blob} blob 数据
   */
  function downloadBlob(name, blob) {
    var a = document.createElement("a");
    // var event = new MouseEvent("click");
    // a.download = name;
    a.download = name + ".png";
    a.innerHTML = "download";
    a.href = URL.createObjectURL(blob);
    a.click();
    //a.dispatchEvent(event);
    a.onclick = function() {
      requestAnimationFrame(function() {
        URL.revokeObjectURL(a.href);
      });
      a.removeAttribute("href");
    };
  }
  /**
   * 根据 在线url 下载图片
   * @param {string} url 图片网络地址
   * @param {number} triggerDelay triggerDelay 点击事件延迟
   * @param {number} removeDelay removeDelay 移除事件延迟
   */
  function downloadNetImage(url, triggerDelay, removeDelay) {
    if (triggerDelay == null || typeof triggerDelay != "number") {
      triggerDelay = 1000;
    }
    if (removeDelay == null || typeof removeDelay != "number") {
      removeDelay = 1000;
    }
    setTimeout(function() {
      var frame = $(
        "<iframe style='display:none' class='multi-download'></iframe>"
      );
      frame.attr("src", url);
      $(document.body).after(frame);
      setTimeout(function() {
        frame.remove();
      }, removeDelay);
    }, triggerDelay);
  }
  function downloadLocalBlobImage(name, url) {
    dataURIToBlob(name, url, downloadBlob);
  }
  function dataURIToBlob(name, dataUrl, callback) {
    var binStr = atob(dataUrl.split(",")[1]),
      len = binStr.length,
      arr = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
      arr[i] = binStr.charCodeAt(i);
    }
    callback(name, new Blob([arr]));
  }
})(jQuery);
