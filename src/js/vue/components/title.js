Vue.component('Title', {
  template: VueMain.getComponentsTemplate('title'),
  data: () => ({
    title: "Hiiro",
    color: "",
    titleTestIndex: 0
  }),
  methods: {
    ipc(type) {
      this.$emit('ipc', type)
    },
    titleTest() {
      if (this.titleTestIndex > this.titleList.length - 1) {
        this.titleTestIndex = 0;
      }
      if (this.titleTestIndex === 8) {
        this.title = this.titleList[this.titleTestIndex] + "irro";
      } else {
        this.title = this.titleList[this.titleTestIndex] + "iiro";
      }
      ++this.titleTestIndex;
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
    ]
    this.titleTest()
  }
})
