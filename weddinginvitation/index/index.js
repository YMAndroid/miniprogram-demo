// weddinginvitation/index/index.js

Page({

    /**
     * 页面的初始数据
     */
    data: {
        isPlayingMusic: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    bgm:null,
    music_url:"http://music.163.com/song/media/outer/url?id=346089.mp3",
    music_coverImgUrl:"/image/guidepage1.png",
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.bgm = wx.getBackgroundAudioManager();
        this.bgm.title = "marry me";
        this.bgm.epname = 'wedding';
        this.bgm.singer = 'singer';
        this.bgm.coverImgUrl = this.music_coverImgUrl;
        this.bgm.onCanplay(()=>{
            this.bgm.pause();
        })
        this.bgm.src = this.music_url;
    },

    play: function(e){
        if(this.data.isPlayingMusic){
            this.bgm.pause();
        }else{
            this.bgm.play();
        }
        this.setData({
            isPlayingMusic: !this.data.isPlayingMusic
        })
    }
})