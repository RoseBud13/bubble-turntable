<template>
    <div class="sorrow">
        <gift v-show="giftDisplay === 'show gift'" :blink="true" :displaySeconds="false" :twelveHour="true"></gift>
        <player></player>
        <episodes v-on:triggerGift = "showGift"></episodes>
        <rose></rose>
        <div class="fearless">
            <p>But with you I'd dance in a storm</p>
            <p>In my best dress</p>
            <router-link to="/bubble-turntable/" style="text-decoration: none; color: #E8C547;">Fearless</router-link>
        </div>
    </div>
</template>

<script>
import Player from '../components/Player.vue'
import Episodes from '../components/Episodes.vue'
import Rose from '../components/Rose.vue'
import Gift from '../components/Gift.vue'

export default {
    components: {
        Player,
        Episodes,
        Rose,
        Gift
    },
    data() {
        return {
            giftDisplay: ''
        }
    },
    methods: {
        showGift(msg) {
            this.giftDisplay = msg;
        }
    }
}
</script>

<style>
html, body {
  height: 100%;
  width: 100%;
  background: #3d5a80;
  overflow: hidden;
}

.sorrow {
  position: relative;
  z-index: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
.fearless {
    position: fixed;
    bottom: 50px;
    text-align: center;
}
.fearless p {
    color: #CDD1C4;
    margin: 6px;
}
</style>
