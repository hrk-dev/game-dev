<template>
  <div class="video-wrapper">
    <transition name="fade">
      <div class="video" v-if="show">
        <div
          class="video-time"
          :style="{
            'font-size': 16 * scale + 'px',
            'line-height': 30 * scale + 'px',
          }"
        >
          {{ _currentTime }}/{{ _durationTime }}
        </div>
        <div
          class="video-btn"
          :style="{
            'font-size': 22 * scale + 'px',
            'line-height': 25 * scale + 'px',
            width: 30 * scale + 'px',
            height: 30 * scale + 'px',
          }"
          @click="hideVideoWindow"
        >
          ■
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
module.exports = {
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
  }
}
</script>

<style lang="stylus" scoped>
.video-wrapper
  height 100%
  width 100%
.video
  z-index 1
  position absolute
  bottom 0
  left 0
  width 100%

  .video-time
    position absolute
    bottom 5px
    left 5px
    color #fff

  .video-btn
    display block
    background pink
    border-radius 30%
    position relative
    text-align center
    bottom 5px
    left 50%
    transform translateX(-50%)
    cursor pointer

    &:hover
      background #fadbd8

    &:actice
      background #f5b7bb
</style>
