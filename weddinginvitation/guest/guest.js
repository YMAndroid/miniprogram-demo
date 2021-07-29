// weddinginvitation/guest/guest.js

Page({

    /**
     * 页面的初始数据
     */
    data: {

    },
    width: 0,
    height: 0,
    onLoad: function () {
        wx.getSystemInfo({
            // 获取系统信息成功，保存获取到的系统窗口的宽高
            success: res => {
                this.width = res.windowWidth
                this.height = res.windowHeight
            }
        })
    },
    timer: null,

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        const ctx = wx.createCanvasContext('myCanvas')
        // // 设置线条颜色和线宽
        // ctx.setStrokeStyle('#ff0000');
        // ctx.setLineWidth(2);
        // // 移动画笔坐标位置，绘制外部大圆
        // ctx.moveTo(160,100);
        // ctx.arc(100, 100, 60, 0, 2 * Math.PI, true);
        //  // 移动画笔坐标位置，绘制嘴巴线条
        // ctx.moveTo(140, 100);
        // ctx.arc(100, 100, 40, 0, Math.PI, false);
        // // 移动画笔坐标位置，绘制左眼圆圈
        // ctx.moveTo(85, 80)
        // ctx.arc(80, 80, 5, 0, 2 * Math.PI, true)
        //  // 移动画笔坐标位置，绘制右眼圆圈
        //  ctx.moveTo(125, 80)
        //  ctx.arc(120, 80, 5, 0, 2 * Math.PI, true)

        //  // 把路径移动到画布中的坐标（10,10）点
        //  ctx.moveTo(10,10);
        // // 新增一个新点（100,10），创建一条从（10,10）到（100,10）的线条
        // ctx.lineTo(100,10)
        //  // 路径移动到画布中的坐标（10,5）点
        //  ctx.moveTo(10,50)
        //  // 新增一个新点（100,5），创建一条从（10,50）到（100,50）的线条
        //  ctx.lineTo(500,50)

        //  ctx.stroke()
        //  ctx.draw();

        // 将角度转换为弧度，方便在后面使用
        // 计算公式： 弧度 = 角度 * Math.PI / 180
        const D6 = 6 * Math.PI / 180
        const D30 = 30 * Math.PI / 180
        const D90 = 90 * Math.PI / 180
        // 获取宽和高值
        var width = this.width;
        var height = this.height;
        // // 计算表盘半径，留出 30px 外边距
        var radius = width / 2 - 30
        console.log("radius: ",radius);
        // 每秒绘制一次
        draw()
        this.timer = setInterval(draw, 1000);
        // 绘制函数
        function draw() {
            console.log("draw")
            // 设置坐标轴原点为窗口的中心点　
            ctx.translate(width / 2, height / 2)
            // 绘制表盘22　　
            drawClock(ctx, radius)
            // 绘制指针24　　
            drawHand(ctx, radius)
            // 执行绘制26　　
            ctx.draw()
        }
        // 绘制表盘部分　 
        function drawClock(ctx, radius) {
            // 绘制大圆3　　
            // 大圆的半径为radius，线条粗细为2px4　　
            ctx.setLineWidth(2)
            // 设置线条的粗细5　　
            ctx.beginPath()
            // 开始一个新路径6　　
            ctx.arc(0, 0, radius, 0, 2 * Math.PI, true)
            ctx.stroke()
            // 画线8　　
            // 绘制中心圆9　　
            // 中心圆的半径为8px，线条粗细为1px10　 
            ctx.setLineWidth(1)
            ctx.beginPath()
            ctx.arc(0, 0, 8, 0, 2 * Math.PI, true)
            ctx.stroke()
            // 绘制大刻度盘，线条粗细为5px
            ctx.setLineWidth(5)
            for (var i = 0; i < 12; ++i) {
                // 以原点为中心顺时针旋转（多次调用旋转的角度会叠加）　　
                // 大刻度盘需要绘制12个线条，表示12个小时，每次旋转30度　　
                ctx.rotate(D30)
                // 360 / 12 = 30　　
                ctx.beginPath()
                ctx.moveTo(radius, 0)
                ctx.lineTo(radius - 15, 0)
                // 大刻度长度15px　
                ctx.stroke()
            }
            // 绘制小刻度盘，线条粗细为1px26　 
            ctx.setLineWidth(1)
            for (var i = 0; i < 60; ++i) {
                // 小刻度盘需要绘制60个线条，表示60分钟或60秒，每次旋转6度29　　
                ctx.rotate(D6)
                // 360 / 60 = 60　　
                ctx.beginPath()
                ctx.moveTo(radius, 0)
                ctx.lineTo(radius - 10, 0)
                // 小刻度盘长度10px　　
                ctx.stroke()
            }
            // 绘制文本　 
            ctx.setFontSize(20)
            // 字号
            ctx.textBaseline = 'middle'
            // 文本垂直居中 
            // 计算文本距离表盘中心点的半径r　 
            var r = radius - 30
            for (var i = 1; i <= 12; ++i) {
                // 利用三角函数计算文本坐标　　
                var x = r * Math.cos(D30 * i - D90)
                var y = r * Math.sin(D30 * i - D90)
                if (i > 10) {
                    // 调整 11 和 12 的位置45　　　
                    // 在画布上绘制文本fillText(文本， 左上角x坐标， 左上角y坐标)46　　　
                    ctx.fillText(i, x - 12, y)
                } else {
                    ctx.fillText(i, x - 6, y)
                }
            }
        }

        // 绘制指针部分32　 
        function drawHand(ctx, radius) {
            var t = new Date()
            // 获取当前时间3　　
            var h = t.getHours()
            // 小时4　　
            var m = t.getMinutes()
            // 分5　　
            var s = t.getSeconds()
            // 秒6　　
            h = h > 12 ? h - 12 : h
            // 将24小时制转化为12小时制7　　
            // 时间从3点开始，逆时针旋转90度，指向12点8　　
            ctx.rotate(-D90)
            // 绘制时针10　 
            ctx.save()

            // 记录旋转状态11　 
            // 计算时针指向的刻度12　 
            // 通过 30度 * h 可以计算每个整点的旋转角度
            // 如果时间不是整点，需要使用h + m / 60 + s / 3600计算准确的偏移度14　 
            ctx.rotate(D30 * (h + m / 60 + s / 3600))
            ctx.setLineWidth(6)
            ctx.beginPath()
            ctx.moveTo(-20, 0)
            // 指针线条的起点（针尾留出20px）18　 
            ctx.lineTo(radius / 2.6, 0)
            // 根据表盘半径计算指针线条的长度19　 
            ctx.stroke()
            ctx.restore()
            // 恢复旋转状态，重新指向12点21　 
            // 绘制分针22　 
            ctx.save()
            ctx.rotate(D6 * (m + s / 60))
            ctx.setLineWidth(4)
            ctx.beginPath()
            ctx.moveTo(-20, 0)
            ctx.lineTo(radius / 1.8, 0)
            ctx.stroke()
            ctx.restore() // 绘制秒针31　 
            ctx.save()
            ctx.rotate(D6 * s)
            ctx.setLineWidth(2)

            ctx.beginPath()
            ctx.moveTo(-20, 0)
            ctx.lineTo(radius / 1.6, 0)
            ctx.stroke()
            ctx.restore()

        }
    },

})