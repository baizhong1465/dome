
  var obj = {
    data() {
      return {
        isShow: false,
        times: "",
        inputCustom1: 1,
        mytext: localStorage.getItem("username"),
        isDisable: 0,
        isDisable2: 0,
        changelist:axios.get("../json/index.json").then(res => {
          // console.log(res.data.datalist)
          this.changelist = res.data.changelist
        }),
        datalist: axios.get("../json/index.json").then(res => {
          // console.log(res.data.datalist)
          this.datalist = res.data.datalist
        }),
        imageList: axios.get("../json/index.json").then(res => {
          // console.log(res.data.datalist)
          this.imageList = res.data.imageList
        })

      }
    },
    created() {
      this.getTimes()
    },
    // 在Vue实例销毁前，清除的定时器
    beforeUnmount() {
      if (this.times) {
        clearInterval(this.getTimesInterval);
      }
    },
    methods: {
      getTimes() {
        setInterval(this.getTimesInterval, 1000);
      },
      getTimesInterval: function () {
        let _this = this;
        let year = new Date().getFullYear(); //获取当前时间的年份
        let month = new Date().getMonth() + 1; //获取当前时间的月份
        let day = new Date().getDate(); //获取当前时间的天数
        let hours = new Date().getHours(); //获取当前时间的小时
        let minutes = new Date().getMinutes(); //获取当前时间的分数
        let seconds = new Date().getSeconds(); //获取当前时间的秒数
        //当小于 10 的是时候，在前面加 0
        if (hours < 10) {
          hours = "0" + hours;
        }
        if (minutes < 10) {
          minutes = "0" + minutes;
        }
        if (seconds < 10) {
          seconds = "0" + seconds;
        }
        //拼接格式化当前时间
        _this.times = hours + ":" + minutes + ":" + seconds;

        if (hours >= 5 && hours < 8) {
          this.$refs.TheStyle2.style.background = 'url(' + this.imageList[0].src + ')';
          this.$refs.TheStyle2.style.backgroundSize = '100% 100%';
          this.$refs.TheStyle2.style.transition = 'all 2s';
          console.log("早晨")
        }else if(hours >=8 && hours < 16){
          this.$refs.TheStyle2.style.background = 'url(' + this.imageList[1].src + ')';
          this.$refs.TheStyle2.style.backgroundSize = '100% 100%';
          this.$refs.TheStyle2.style.transition = 'all 2s';
          console.log("白天")
        }else if(hours >= 16 && hours < 19){
          this.$refs.TheStyle2.style.background = 'url(' + this.imageList[2].src + ')';
          this.$refs.TheStyle2.style.backgroundSize = '100% 100%';
          this.$refs.TheStyle2.style.transition = 'all 2s';
          console.log("傍晚")
        }else if(hours >= 19 && hours <= 23 || hours >= 0 && hours < 5){
          this.$refs.TheStyle2.style.background = 'url(' + this.imageList[3].src + ')';
          this.$refs.TheStyle2.style.backgroundSize = '100% 100%';
          this.$refs.TheStyle2.style.transition = 'all 2s';
          console.log("晚上")
        }
      },
      //输入框状态
      searchTermsClick() {
        this.inputCustom1 = 0
        wh100active1 = 0
      },
      searchTermsClickOut() {
        this.inputCustom1 = 1
        this.mytext = ''
      },

      //上传到localStorage
      searchTermsUp() {
        localStorage.setItem("username", this.mytext)
      },


      //添加功能模块
      topButtonAdd(num) {
        let length = this.changelist.length
        let length2 = this.datalist.length
        this.changelist.push(this.datalist[length])


        // this.isDisable2++;
        // if(this.isDisable2 === 29 )

      },
      FunctionModuleShow(evt) {
        if (evt.button === 2) {
          this.isShow = true
        }

      }

    }
  }

  var vm = Vue.createApp(obj).mount("#box")
