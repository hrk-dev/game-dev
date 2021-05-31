VueMain.app = new Vue({
  el: "#app",
  template: VueMain.getViewTemplate('app'),
  data: () => ({
    ready: false,
    main: {
      scale: 1,
      width: 1024,
      height: 726,
      margin: "auto",
    }
  }),
  computed: {
    _fontSize() {
      return (this.main.scale * 30) | 0;
    }
  },
  methods: {
    ipc(type) {
      electron.ipcRenderer.send(type);
    }
  },
  mounted() {
    setTimeout(() => {
      this.ipc("vue:ready");
      this.ready = true;
    }, 50);
  },
});