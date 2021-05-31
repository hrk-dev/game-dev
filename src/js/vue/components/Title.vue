<template>
  <div class="title" :style="{ background: color }">
    <div class="title-icon-text">
      <div class="title-icon">
        <img style="height: 60%" src="./icon/icon.ico" />
      </div>
      <div class="title-text">{{ title }}</div>
    </div>
    <div class="title-btn-list">
      <div class="title-btn" @click="ipc('app:reload')">Re</div>
      <div class="title-btn" style="width: 50px" @click="ipc('app:dev')">
        Dev
      </div>
      <div class="title-btn" style="line-height: 20px" @click="ipc('app:min')">
        _
      </div>
      <div class="title-btn" @click="ipc('app:max')">□</div>
      <div class="title-btn" @click="ipc('app:quit')">×</div>
    </div>
  </div>
</template>

<script>
module.exports = {
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
}
</script>

<style lang="stylus" scoped>
.title
  display flex
  justify-content space-between
  align-items flex-start
  position fixed
  left 0
  top 0
  width 100%
  height 30px
  background-color #f5c1bb
  -webkit-app-region drag
  z-index 100
  color white
  line-height 30px
  transition background-color 0.2s
  font-family auto

.title-icon-text
  display flex
  justify-content center
  align-items center
  opacity 0
  animation-delay 1s
  animation title-show 1s
  animation-fill-mode forwards

.title-icon
  display flex
  justify-content center
  align-items center
  height 30px
  width 30px

.title-text
  margin-left 5px

.title-btn-list
  display flex

.title-btn
  line-height 27px
  height 27px
  width 45px
  text-align center
  -webkit-app-region no-drag

  &:hover
    background #fadbd8

  &:active
    background #f5b7bb
</style>
