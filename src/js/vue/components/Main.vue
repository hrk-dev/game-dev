<template>
  <div id="main" :style="{width: width + 'px', height: height + 'px', margin: margin}">
    <slot></slot>
  </div>
</template>

<script>
module.exports = {
  props: {
    width: Number,
    height: Number,
    margin: String
  }
}
</script>

<style lang="stylus">
#main
  overflow hidden
  position absolute
  inset 0px
  z-index 101
  font-size 30px
  line-height 30px

.fade-enter, .fade-leave-to
  opacity 0 !important

.fade-enter-to, .fade-leave
  opacity 1 !important

.fade-enter-active, .fade-leave-active
  transition opacity 0.5s

@keyframes danmu
  from
    left 100%

  to
    left -100%

@keyframes title-show
  from
    opacity 0

  to
    opacity 1

@keyframes glitch
  0%
    -webkit-clip-path inset(48% 0 16% 0)
    clip-path inset(48% 0 16% 0)
    -webkit-transform translate(-9px, -6px)
    transform translate(-9px, -6px)

  10%
    -webkit-clip-path inset(75% 0 75% 0)
    clip-path inset(75% 0 75% 0)
    -webkit-transform translate(-9px, 7px)
    transform translate(-9px, 7px)

  20%
    -webkit-clip-path inset(44% 0 57% 0)
    clip-path inset(44% 0 57% 0)
    -webkit-transform translate(2px, 7px)
    transform translate(2px, 7px)

  30%
    -webkit-clip-path inset(39% 0 54% 0)
    clip-path inset(39% 0 54% 0)
    -webkit-transform translate(-1px, 8px)
    transform translate(-1px, 8px)

  40%
    -webkit-clip-path inset(31% 0 39% 0)
    clip-path inset(31% 0 39% 0)
    -webkit-transform translate(-5px, -3px)
    transform translate(-5px, -3px)

  50%
    -webkit-clip-path inset(65% 0 22% 0)
    clip-path inset(65% 0 22% 0)
    -webkit-transform translate(8px, 1px)
    transform translate(8px, 1px)

  60%
    -webkit-clip-path inset(2% 0 19% 0)
    clip-path inset(2% 0 19% 0)
    -webkit-transform translate(9px)
    transform translate(9px)

  70%
    -webkit-clip-path inset(59% 0 22% 0)
    clip-path inset(59% 0 22% 0)
    -webkit-transform translate(6px, -5px)
    transform translate(6px, -5px)

  80%
    -webkit-clip-path inset(65% 0 13% 0)
    clip-path inset(65% 0 13% 0)
    -webkit-transform translate(-2px, -5px)
    transform translate(-2px, -5px)

  10%
    -webkit-clip-path inset(81% 0 67% 0)
    clip-path inset(81% 0 67% 0)
    -webkit-transform translate(-6px, 10px)
    transform translate(-6px, 10px)

  90%
    -webkit-clip-path inset(40% 0 51% 0)
    clip-path inset(40% 0 51% 0)
    -webkit-transform translate(-4px, -8px)
    transform translate(-4px, -8px)

  100%
    -webkit-clip-path inset(61% 0 75% 0)
    clip-path inset(61% 0 75% 0)
    -webkit-transform translate(-9px, 3px)
    transform translate(-9px, 3px)
</style>