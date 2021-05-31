/**
 * 测试功能
 */
Vue.component('Danmu', {
  template: VueMain.getComponentsTemplate('danmu'),
  props: {
    height: Number,
    fontSize: Number
  },
  data: () => ({
    list: [],
    timer: []
  }),
  methods: {
    random() {
      const line = this.height / this.fontSize;
      const curr_line = (Math.random() * line) | 0;
      const top = curr_line * this.fontSize + 5;
      const temp = top / this.height;
      return temp * 100 + "%";
    },
    setDanmu(i) {
      this.list[i].show = true;
      this.timer[i] = setTimeout(() => {
        this.list[i].show = false;
        this.list[i].top = this.random();
        this.timer[i] = setTimeout(() => {
          this.setDanmu(i);
        }, Math.random() * 1000);
      }, 5 * 1000);
    },
    showDanmu() {
      for (let i = 0; i < 30; i++) {
        this.timer[i] = setTimeout(() => {
          this.setDanmu(i);
        }, Math.random() * Math.random() * 10000);
      }
    },
    stopDanmu() {
      for (let i = 0; i < 30; i++) {
        clearTimeout(this.timer[i]);
        this.list[i].show = false;
      }
    }
  },
  mounted() {
    for (let i = 0; i < 30; i++) {
      this.list.push({
        text: "Hiiro...Hiiro...寂しい",
        top: this.random(),
        show: false,
      });
    }
  }
})
