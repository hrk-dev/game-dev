Vue.component('Ending', {
  template: VueMain.getComponentsTemplate('ending'),
  props: {
    fontSize: Number,
    scale: Number
  },
  data: () => ({
    show: false,
    text: 'Hiiro',
    animation: false,
    blur: 'blur(0)',
    color: '#fff'
  }),
  methods: {
    startEnding() {
      this.text = 'Hiiro'
      this.color = '#fff'
      this.show = true
      setTimeout(() => {
        this.animation = true
        setTimeout(() => {
          this.blur = `blur(${this._fontSize}px)`
          setTimeout(() => {
            this.animation = false
            this.text = 'Hirro'
            this.color = 'pink'
            this.blur = 'blur(0)'
            setTimeout(() => {
              this.show = false
            }, 5000)
          }, 600)
        }, 2000)
      }, 2000)
    }
  },
  mounted() {
  }
})
