// music/music.js
audioCtx:null
Page({

    /**
     * 页面的初始数据
     */
    data: {
        item:0,
        tab:0,
        playList:[{
            id:1,
            title:'钢琴协奏曲',
            singer:'肖邦',
            src:'',
            coverImgUrl:'/image/guidepage1.png'
        },
        {
            id:2,
            title:'稳稳的幸福',
            singer:'程奕迅',
            src:'',
            coverImgUrl:'/image/guidepage1.png'
        },
        {
            id:3,
            title:'该死的温柔',
            singer:'马天宇',
            src:'',
            coverImgUrl:'/image/guidepage1.png'
        },
        {
            id:4,
            title:'死了都要爱',
            singer:'某某某',
            src:'',
            coverImgUrl:'/image/guidepage1.png'
        }],
        state:'paused',
        playIndex:0,
        play:{
            currentTime:'00:00',
            duration:'00:00',
            percent:0,
            title:'',
            signer:'',
            coverImgUrl:'/image/guidepage1.png',
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    changeItem: function(e){
        this.setData({
            item:e.target.dataset.item
        })
    },

    changeTab: function(e){
        this.setData({
            tab:e.detail.current
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.audioCtx = wx.createInnerAudioContext();
        var that = this;
        this.audioCtx.onError(function(){
            console.log('播放失败: '+that.audioCtx.src);
        })
        //播放完自动切换下一首
        this.audioCtx.onEnded(function(){
            that.next();
        })
        //自动更新播放进度
        this.audioCtx.onPlay(function(){

        })
        this.audioCtx.onTimeUpdate(function(){
            that.setData({
                'play.duration':formatTime(that.audioCtx.duration),
                'play.currentTime':formatTime(that.audioCtx.currentTime),
                'play.percent': that.audioCtx.currentTime /  that.audioCtx.duration * 100,
            })
        })
        //默认选择第一曲
        this.setMusic(0);
        function formatTime(time){
            var minute = Math.floor(time/60)%60;
            var second = Math.floor(time)%60;
            return (minute < 10 ? '0' + minute:minute)+':'+(second < 10 ? '0' + second: second);
        }
    },


    setMusic: function(index){
        var music = this.data.playList[index];
        this.audioCtx.src = music.src;
        this.setData({
            playIndex: index,
            'play.title':music.title,
            'play.singer':music.singer,
            'play.coverImgUrl':music.coverImgUrl,
            'play.currentTime':'00:00',
            'play.duration':'00:00',
            'play.percent':0
        })
    },

    play: function(){
        this.audioCtx.play();
        this.setData({
            state:'running'
        })
    },

    pause:function(){
        this.audioCtx.pause();
        this.setData({
            state:'paused'
        })
    },

    next: function(){
        var index = this.data.playIndex >= this.data.playList.length - 1 ? 0 : this.data.playIndex + 1;
        this.setMusic(index);
        if(this.data.state === 'running'){
            this.play();
        }
    },

    sliderChange: function(e){
        var second = e.detail.value *this.audioCtx.duration / 100;
        this.audioCtx.seek(second);
    },

    change: function(e){
        this.setMusic(e.currentTarget.dataset.index);
        this.play();
    }
})