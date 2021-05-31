Vue.component('Video', {
  template: VueMain.getComponentsTemplate('video'),
  props: {
    scale: Number
  },
  data: () => ({
    show: false,
    current: 0,
    duration: 0
  }),
  computed: {
    _currentTime() {
      return this.secondToTime(this.current);
    },
    _durationTime() {
      return this.secondToTime(this.duration);
    },
  },
  methods: {
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
    hideVideoWindow() {
      if (Graphics.isVideoPlaying()) {
        Graphics._video.pause();
        Graphics._updateVisibility(false);
        this.show = false;
      }
    }
  },
  mounted() {
  }
})
