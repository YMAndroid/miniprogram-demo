Page({

    /**
     * 页面的初始数据
     */
    data: {
        // 最大字符数
        maxTextLen: 20,
        // 默认长度
        textLen: 0,
        inputValue:''

    },

    onLoad: function(){
        //var str = "测试是是是是是是是sssssssssssssss";
        //this.strlen(str);
    },

    getWords(e) {
        // if(this.strlen(e.detail.value) <= 16){
        //     let page = this;
        // // 设置最大字符串长度(为-1时,则不限制)
        // let maxTextLen = page.data.maxTextLen;
        // // 文本长度
        // let textLen = e.detail.value.length;

       
        // page.setData({
        //     maxTextLen: maxTextLen,
        //     textLen: textLen
        // });
        // }
        this.setData({
            inputValue: this.getStr(e.detail.value,16)
        })
    },

    // 
    
    getStr(str,num){
        let len = 0;
        const chinese = /[^\x00-\xff]/ig;
        for(let i=0;i<str.length;i++){
          if(str.charAt(i).match(chinese)){
            len +=2;
          }else{
            len +=1;
          }
          if(len > num){
            return str.slice(0,i)
          }
        }
        return str
      },
})