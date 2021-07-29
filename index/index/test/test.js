
var left;
var time;
var d; //一秒的长度
var scroll_left = ''; //滚动距离
Page({
  /**
   * 页面的初始数据
   */
  data: {
    lst: [
      { 'tim': 0 }, { 'tim': 1 }, { 'tim': 2 }, { 'tim': 3 }, { 'tim': 4 }, { 'tim': 5 }, { 'tim': 6 }, { 'tim': 7 }, { 'tim': 8 }, { 'tim': 9 }, { 'tim': 10 }, { 'tim': 11 }, { 'tim': 12 }, { 'tim': 13 }, { 'tim': 14 }, { 'tim': 15 }, { 'tim': 16 }, { 'tim': 17 }, { 'tim': 18 }, { 'tim': 19 }, { 'tim': 20 }, { 'tim': 21 }, { 'tim': 22 }, { 'tim': 23 }, { 'tim': 24 }
    ],
    time: '00:00:00', //时间轴显示时间
    leftX: '', // 时间轴时间的位置
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.timerShaft()
  },

  //-----时间长度计算----------
  timerShaft() {
    //创建节点选择器
    var query = wx.createSelectorQuery();
    query.select('.tim_shaft_box').boundingClientRect(function (rect) {
      console.log(rect.width, rect)
      var the_big = rect.width / 29;
      var sub_box = the_big / 6;
      var s = sub_box /600 ;
      d = s;
      console.log("一秒的长度:",d);
    }).exec();
  },
//------滚动触发----------
  getleft(e) {
    var that = this;
    console.log("scrool: ",e)
    scroll_left = e.detail.scrollLeft
    wx.getSystemInfo({
      success: function(res) {
        console.log("窗体的宽度:",res.windowWidth);
        var windowWidth = res.windowWidth;
        left = windowWidth / 2 + scroll_left;
        // ----(如果时间轴的样式 宽加大 306就要跟着变)----
        var i = (left - 306) / d;
        console.log("i = ",i + " ;left = "+ left);
        console.log(e, that, left, i)
        var hour = "";
        var minute = "";
        var sec = "";
        if (i >= 0 & i <= 86400) {
          var f = Math.floor(i / 60);
          // ----时------
          hour = Math.floor(f / 60);
          if (10 > hour) {
            hour = "0" + hour;
          }
          console.log("时：" + hour)

          // ----分----
          minute = Math.floor(f % 60);
          if (10 > minute) {
            minute = "0" + minute;
          }
          console.log("分：" + minute)

          // -----秒-------
          sec = Math.floor(i % 60);
          console.log("i = ",i);
          if (10 > sec) {
            sec = "0" + sec;
          }
          console.log("秒：" + sec)
          time = " " + hour + ':' + minute + ':' + sec;
          console.log(time)
          that.setData({
            time: time,
            leftX: left - 20,
          })
        }
      },
    })
  },
  //------触摸结束触发----------
  bindtouchend(e) {
  }, 
})
