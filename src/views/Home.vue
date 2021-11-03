<template>
    <div class="home">
        <gift v-show="giftDisplay === 'show gift'" :blink="true" :displaySeconds="false" :twelveHour="true"></gift>
        <bubbles></bubbles>
        <stars v-show="starsDisplay === 'show stars'"></stars>
        <player></player>
        <card v-on:triggerStars = "showStars"></card>
        <episodes v-on:triggerGift = "showGift"></episodes>
    </div>
</template>

<script>
import Bubbles from '../components/Bubbles.vue'
import Player from '../components/Player.vue'
import Card from '../components/Card.vue'
import Stars from '../components/Stars.vue'
import Episodes from '../components/Episodes.vue'
import Gift from '../components/Gift.vue'

export default {
    components: {
        Bubbles,
        Player,
        Card,
        Stars,
        Episodes,
        Gift
    },
    data() {
        return {
            starsDisplay: '',
            giftDisplay: ''
        }
    },
    methods: {
        showStars(msg) {
            this.starsDisplay = msg;
            // console.log('received');
        },
        showGift(msg) {
            this.giftDisplay = msg;
        }
    }
}
</script>

<style lang="scss">
.home {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: #FADDE1;
}
</style>
