<template>
  <div class="ending-wrapper">
    <transition name="fade">
      <div class="ending" v-if="show">
        <div
          class="ending-text"
          :style="{
            fontSize: fontSize + 'px',
            lineHeight: fontSize + 4 + 'px',
            top: 160 * scale + 'px',
          }"
        >
          <div
            class="ending-title"
            :style="{
              'font-size': 36 * scale + 'px',
            }"
          >
            特别鸣谢
          </div>
          <div
            :style="{
              'font-size': 24 * scale + 'px',
            }"
          >
            Special Thanks
          </div>
          <div
            class="ending-title"
            :style="{
              'font-size': 36 * scale + 'px',
            }"
          >
            Debug
          </div>
          <div
            :style="{
              'font-size': 24 * scale + 'px',
            }"
          >
            You
          </div>
          <div
            class="ending-title"
            :style="{
              'font-size': 36 * scale + 'px',
            }"
          >
            Bug
          </div>
          <div
            class="ending-text-bug"
            :style="{
              filter: blur,
              color: color,
              'font-size': 24 * scale + 'px',
            }"
          >
            {{ text }}
          </div>
          <div class="ending-text-animation" v-show="animation">
            <div
              class="ending-title"
              :style="{
                'font-size': 36 * scale + 'px',
              }"
            >
              特别鸣谢
            </div>
            <div
              :style="{
                'font-size': 24 * scale + 'px',
              }"
            >
              Special Thanks
            </div>
            <div
              class="ending-title"
              :style="{
                'font-size': 36 * scale + 'px',
              }"
            >
              Debug
            </div>
            <div
              :style="{
                'font-size': 24 * scale + 'px',
              }"
            >
              You
            </div>
            <div
              class="ending-title"
              :style="{
                'font-size': 36 * scale + 'px',
              }"
            >
              Bug
            </div>
            <div
              class="ending-text-bug"
              :style="{
                filter: blur,
                'font-size': 24 * scale + 'px',
              }"
            >
              {{ text }}
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
module.exports = {
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
  }
}
</script>

<style lang="stylus" scoped>
.ending-wrapper
  height 100%
  width 100%

.ending
  position absolute
  top 0
  left 0
  height 100%
  width 100%
  background #000

.ending-text
  position relative
  color #fff
  text-align center
  width 100%

.ending-text-bug
  transition all 0.6s ease-in-out

.ending-text-animation
  content ''
  width 99%
  position absolute
  top 0
  right 0
  bottom 0
  left 0
  background transparent
  color rgba(255, 255, 255, 0.5)
  text-shadow -3px -3px 0px rgba(248, 240, 5, 0.5), 3px 3px 0px rgba(0, 230, 246, 0.5)
  clip-path inset(50% 50% 50% 50%)
  animation glitch 3s infinite
  animation-timing-function steps(2, end)

.ending-title
  margin-top 2%
</style>
