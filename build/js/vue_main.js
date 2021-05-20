var electron = require("electron");

var vueApp = new Vue({
  el: "#app",
  data: () => ({
    title: "Hiiro",
    index: 0,
    color: "",
    list: [],
    timer: [],
    main: {
      scale: 1,
      width: 1024,
      height: 726,
      margin: 'auto'
    },
    video: {
      show:false,
      current: 0,
      duration: 0,
    },
    bug: {
      show: false,
      text: "Hiiro",
      animation: false,
      blur: 'blur(0)',
      color: '#fff'
    },
  }),
  computed: {
    _fontSize() {
      return (this.main.scale * 30) | 0;
    },
    _currentTime() {
      return this.secondToTime(this.video.current);
    },
    _durationTime() {
      return this.secondToTime(this.video.duration);
    },
  },
  methods: {
    ipc(type) {
      electron.ipcRenderer.send(type);
    },
    secondToTime(result) {
      const h =
        Math.floor(result / 3600) < 10
          ? "0" + Math.floor(result / 3600)
          : Math.floor(result / 3600);
      const m =
        Math.floor((result / 60) % 60) < 10
          ? "0" + Math.floor((result / 60) % 60)
          : Math.floor((result / 60) % 60);
      const s =
        Math.floor(result % 60) < 10
          ? "0" + Math.floor(result % 60)
          : Math.floor(result % 60);
      return `${h}:${m}:${s}`;
    },
    setTitle() {
      if (this.index > this.titleList.length - 1) {
        this.index = 0;
      }
      if (this.index === 8) {
        this.title = this.titleList[this.index] + "irro";
      } else {
        this.title = this.titleList[this.index] + "iiro";
      }
      ++this.index;
    },
    random() {
      const line = this.main.height / this._fontSize;
      const curr_line = (Math.random() * line) | 0;
      const top = curr_line * this._fontSize;
      const temp = top / this.main.height;
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
    },
    stopVideo() {
      if (Graphics.isVideoPlaying()) {
        Graphics._video.pause();
        Graphics._updateVisibility(false);
        this.video.show = false;
      }
    },
    startEnding() {
      // this.bug.show = !this.bug.show
      this.bug.text = "Hiiro"
      this.bug.color = "#fff"
      this.bug.show = true
      setTimeout(() => {
        this.bug.animation = true;
        setTimeout(() => {
          this.bug.blur = `blur(${this._fontSize}px)`;
          setTimeout(() => {
            this.bug.animation = false;
            this.bug.text = "Hirro";
            this.bug.color = "pink"
            this.bug.blur = 'blur(0)';
            setTimeout(() => {
              this.bug.show = false
            },5000)
          }, 600);
        }, 2000);
      }, 2000);
    }
  },
  mounted() {
    this.titleList = [
      "H",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
    ];
    this.setTitle();

    for (let i = 0; i < 30; i++) {
      this.list.push({
        text: "Hiiro...Hiiro...寂しい",
        top: this.random(),
        show: false,
      });
    }

    this.ipc("vue:ready");
  },
});
