<template>
  <div
    class="danmu-list"
    :style="{
      fontSize: fontSize + 'px',
      lineHeight: fontSize + 10 + 'px',
    }"
  >
    <template v-for="(item, key) in list">
      <div
        :key="key"
        class="danmu"
        :style="{ top: item.top }"
        v-show="item.show"
      >
        {{ item.text }}
      </div>
    </template>
  </div>
</template>

<script>
module.exports = {
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
}
</script>

<style lang="stylus" scoped>
.danmu-list
  position absolute
  top 0
  left 0
  height 100%
  width 100%

  .danmu
    display inline
    word-break keep-all
    white-space nowrap
    z-index 102
    position absolute
    left 100%
    animation danmu 5s linear
    color pink
    text-shadow 0 0 2px rgba(0, 0, 0, 0.9)
</style>
