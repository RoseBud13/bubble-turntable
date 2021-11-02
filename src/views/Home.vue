<template>
    <div class="home">
        <bubbles></bubbles>
        <stars v-show="starsDisplay === 'show stars'"></stars>
        <player></player>
        <card v-on:child-func = "parentfunc"></card>
        <episodes></episodes>
    </div>
</template>

<script>
import Bubbles from '../components/Bubbles.vue'
import Player from '../components/Player.vue'
import Card from '../components/Card.vue'
import Stars from '../components/Stars.vue'
import Episodes from '../components/Episodes.vue'

export default {
    components: {
        Bubbles,
        Player,
        Card,
        Stars,
        Episodes
    },
    data() {
        return {
            starsDisplay: ''
        }
    },
    methods: {
        parentfunc(msg){
            this.starsDisplay = msg;
            // console.log('received');
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
