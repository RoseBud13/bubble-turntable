<template>
  <div class="bg-bubbles">
    <ul class="bubbles">
      <li v-for="i in 10" :key="i"></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'bubbles'
}
</script>

<style lang="less">
.bubbles {
  width: 100%;
  height: 100%;
  overflow: hidden;
  li {
    position: absolute;
    z-index:-100;
    // set bottom to make bubbles come from the dwon side of screen
    bottom: -160px;
    // default bubble size
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgba(255, 93, 143, 0.2);
    list-style: none;
    // use customized animation to make bubble fade-in & fade-out, arise and rotate
    animation: square 15s infinite;
    transition-timing-function: linear;
    // set each bubble with different position, size, opacity and speed
    &:nth-child(1) {
      left: 10%;
    }
    &:nth-child(2) {
      left: 20%;
      width: 60px;
      height: 60px;
      animation-delay: 2s;
      animation-duration: 7s;
    }
    &:nth-child(3) {
      left: 25%;
      animation-delay: 4s;
    }
    &:nth-child(4) {
      left: 40%;
      width: 30px;
      height: 30px;
      animation-duration: 8s;
      background-color: rgba(255, 166, 193, 0.8);
    }
    &:nth-child(5) {
      left: 70%;
    }
    &:nth-child(6) {
      left: 80%;
      width: 80px;
      height: 80px;
      animation-delay: 3s;
      background-color: rgba(244, 172, 183, 0.5);
    }
    &:nth-child(7) {
      left: 32%;
      width: 110px;
      height: 110px;
      animation-delay: 2s;
    }
    &:nth-child(8) {
      left: 55%;
      width: 20px;
      height: 20px;
      animation-delay: 4s;
      animation-duration: 15s;
    }
    &:nth-child(9) {
      left: 25%;
      width: 40px;
      height: 40px;
      animation-delay: 2s;
      animation-duration: 12s;
      background-color: rgba(255, 196, 214, 0.8);
    }
    &:nth-child(10) {
      left: 85%;
      width: 90px;
      height: 90px;
      animation-delay: 5s;
    }
  }
  // customize square animation
  @keyframes square {
    0% {
      opacity: 0.5;
      transform: translateY(0px) rotate(45deg);
    }
    25% {
      opacity: 0.75;
      transform: translateY(-400px) rotate(90deg)
    }
    50% {
      opacity: 1;
      transform: translateY(-600px) rotate(135deg);
    }
    100% {
      opacity: 0;
      transform: translateY(-1000px) rotate(180deg);
    }
  }
}
/* Bubble animation inspired by github.com/Darcy-Yang */
</style>
