<template>
  <div id="clock">
    <!-- Inspired by https://github.com/eddyerburgh/vue-digital-clock -->
    <!-- Modified by Rosebud on Nov 7 2019 -->
    <div class="greetings">
      <p>{{ year }}-{{ month }}-{{ today }} {{ weekDay }}</p>
      <p v-show="timeCheck === 'morning'"><a href="http://49.235.109.138/wannings-turntable/">🌇</a> 婉宁早上好，今天也要开心呀!</p>
      <p v-show="timeCheck === 'daytime'"><a href="http://49.235.109.138/wannings-turntable/">🌈</a> 记得喝水嗷</p>
      <p v-show="timeCheck === 'nightfall'"><a href="http://49.235.109.138/wannings-turntable/">🌆</a> 忍不住感叹婉宁的可爱</p>
      <p v-show="timeCheck === 'night'"><a href="http://49.235.109.138/wannings-turntable/">🌃</a> 婉宁晚上好，早点休息噢</p>
    </div>
    <time class="time">
      <span class="clock__hour">{{ hours }}</span>
      <span
        class="clock__colon"
        :style="{
          visibility: !blink || seconds % 2 === 0 ? 'visible' : 'hidden'
        }"
        >:</span>
      <span class="clock__minutes">{{ minutes }}</span>
      <span
        class="clock__colon"
        v-if="displaySeconds"
        :style="{
          visibility: !blink || seconds % 2 === 0 ? 'visible' : 'hidden'
        }"
        >:</span>
      <span v-if="displaySeconds" class="clock__seconds">{{ seconds }}</span>
      <span v-if="twelveHour" class="clock__ampm">{{ amPm }}</span>
    </time>
  </div>
</template>

<script>
function padZero(number) {
    if (number < 10) {
        return '0' + number
    }
    return number
}

const getDate = () => new Date()

const getSeconds = () => padZero(getDate().getSeconds())

const getMinutes = () => padZero(getDate().getMinutes())

const getHour = twelveHour => {
    let hours = getDate().getHours()
    if (twelveHour && hours > 12) {
        hours = hours - 12
    }
    return padZero(hours)
}

const getAmPm = () => (getDate().getHours() > 12 ? 'PM' : 'AM')

var week = ['星期天', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']

const getYear = () => padZero(getDate().getFullYear())

const getMonth = () => padZero(getDate().getMonth() + 1)

const getDay = () => padZero(getDate().getDate())

const getWeek = () => week[getDate().getDay()]

const getTimeInADay = () => {
  let hours = getDate().getHours();
  let timeSlot = '';
  if (hours >= 4 && hours < 9) {
    timeSlot = 'morning';
    return timeSlot;
  } else if (hours >= 9 && hours < 16) {
    timeSlot = 'daytime';
    return timeSlot;
  } else if (hours >= 16 && hours < 19) {
    timeSlot = 'nightfall';
    return timeSlot;
  } else {
    timeSlot = 'night';
    return timeSlot;
  }
}

// const t1 = "2021/10/13 20:12:13"; //数据
// const dateBegin = new Date(t1); // 转化为Date对象的形式
// var dateEnd = new Date(); // 当前时间数据

export default {
  name: 'Clock',
  props: ['blink', 'displaySeconds', 'twelveHour'],
  data() {
    return {
      ticker: null,
      minutes: getMinutes(),
      hours: getHour(this.twelveHour),
      seconds: getSeconds(),
      amPm: getAmPm(),
      year: getYear(),
      month: getMonth(),
      today: getDay(),
      weekDay: getWeek(),
      timeCheck: getTimeInADay()
    }
  },
  created() {
    this.ticker = setInterval(() => {
      this.minutes = getMinutes()
      this.hours = getHour(this.twelveHour)
      this.seconds = getSeconds()
      this.today = getDay()
      this.weekDay = getWeek()
      this.timeCheck = getTimeInADay()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.ticker)
  }
}
</script>

<style lang="scss">
#clock{
    position: fixed;
    top: 0;
    text-align: center;
    z-index: 12;
}
.time {
  color: #ffffff;
  -webkit-transform: translate(-50%, -50%);
          transform: translate(-50%, -50%);
  color: #de6f90;
  text-shadow: 0 0 10px #cdc1c7, 0 0 10px rgba(211, 163, 225, 0.1);
  font-size: 17px;
  letter-spacing: 0.1em;
}
.greetings {
  margin-top: 5px;
  font-size: 12px;
}
.greetings p {
  margin: 2px;
}
</style>
