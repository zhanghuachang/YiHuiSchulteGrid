function timeRecord(that){
    var m = that.data.m;
    var s = that.data.s;
    var time = setTimeout(function () {
        s++;
        s < 10 ? s = "0" + s : s;
        if (s > 59) {
            s = 0;
            m++;
            m < 10 ? m = "0" + m : m;
        };
        var r = m + ':' + s;
        that.setData({ time: r , m: m, s: s});
        timeRecord(that);
    }, 1000)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    checkPointStart:null,
    checkPointEnd:null,
    checkPoint: null,//当前关卡
    len: 16,//每一关的字数
    previousNum:null,//前一个姓对应的数字
    backgroundColor: 'orange',//初始颜色
    checkId:null,//当前点击的值的id
    arr : [],//乱序过后的姓
    time: "00:00",//时间
    h:0,//时
    m:0,//分
    s:0,//秒
    // index:1000//计时器间隔
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options.checkPoint = 1;
    this.setData({
        checkPoint: options.checkPoint,
        checkPointStart: (options.checkPoint - 1) * 16,
        checkPointEnd:options.checkPoint * 16,
        previousNum: (options.checkPoint - 1) * 16
    })

    //数据加载
    //当前关卡第一个姓id
    var firstId = this.data.checkPointStart;
    //当前关卡最后一个姓id
    var lastId = this.data.checkPointEnd;
    // console.log(firstId);
    // console.log(lastId);
    var arrTmp = [];
    var res = [];
    var resTmp = [];

    //加载外部数据
    var temp = require('name.js')
    var name = temp.data.name;

    for(var i = firstId; i < lastId; i++){
        arrTmp.push(name[i]);
    }
    for (var i = 0, len = arrTmp.length; i < len; i++) {
        var j = Math.floor(Math.random() * arrTmp.length);
        res[i] = arrTmp[j];
        resTmp.push(arrTmp.splice(j, 1));
    }
    // console.log(resTmp[0])
    this.setData({arr:resTmp});  
    
    //计时
    var m = this.data.m;
    m < 10 ? m = "0" + m : m;
    this.setData({m:m});
    timeRecord(this);
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  getValue:function(e){
    var checkId = e.currentTarget.dataset.id;
    var checkPointStart = this.data.checkPointStart;
    var checkPointEnd = this.data.checkPointEnd;
    var previousNum = this.data.previousNum;
    
    console.log(checkId)
    console.log(checkPointStart);
    console.log(checkPointEnd);
    console.log(previousNum)

    if (checkId == checkPointStart + 1 || checkId == (previousNum + 1)){
        this.setData({ checkId: checkId , previousNum: previousNum + 1})
    }
    if(checkId == checkPointEnd){
        var m = this.data.m;
        var s = this.data.s;
        var checkPoint = this.data.checkPoint;
        wx.reLaunch({
            url: '../end/end?m='+ m +'&s='+ s +'&checkPoint='+ checkPoint +''
        })
    }
  }
})