<template>
    <div class="episodes-sidebar">
        <div class="sidebar-backdrop" @click="closeSidebarPanel" v-if="isPanelOpen"></div>
        <transition name="slide">
            <div v-if="isPanelOpen" class="sidebar-panel">
                <div class="sidebar-card">
                    <ul>
                        <li v-for="episode in episodes" :key="episode.name" class="episodes">
                            <div 
                            :class="{'details': !isCurrent(episode.url), 'details-current': isCurrent(episode.url)}"
                            @click="setEpi(episode.url)">
                                <h2 class="episode-title" v-show="!episode.nameIndent">
                                {{ episode.name }}
                                </h2>
                                <h2 class="episode-title-indent" v-show="episode.nameIndent">
                                {{ episode.name }}
                                </h2>
                                <p class="episode-date">{{ episode.releaseDate }}</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="sidebar-gift">
                    <p>你选了decaf的美式</p>
                    <p style="display: inline">我买了</p><input style="width: 41px" type="text" @input="inputListener" /><p style="display: inline">的薄荷</p>
                    <div class="gift-box" v-show="showGiftBox">
                        <button @click="displayGift">🎁</button>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>
<script>
import episodes from '../mocks/episodes'
import { mapMutations } from 'vuex';

export default {
    data() {
        return {
            episodes: episodes,
            showGiftBox: false,
            openGiftBox: 'show gift'
        }
    },
    methods: {
        ...mapMutations(['toggleSidebar', 'setEpisode']),

        isCurrent(ep) {
            return ep === this.$store.state.episode;
        },

        closeSidebarPanel() {
            this.toggleSidebar()
        },

        setEpi(url) {
            this.setEpisode(url);
            this.closeSidebarPanel();
            // console.log(this.$store.state.episode);
        },

        inputListener(e) {
            this.inputV = e.target.value;
            if ((this.inputV === 'extra') || (this.inputV === 'Extra')) {
                this.showGiftBox = true;
            }
        },

        displayGift() {
            this.$emit('triggerGift', this.openGiftBox);
            this.closeSidebarPanel();
        }
    },
    computed: {
        isPanelOpen() {
            return this.$store.state.isSidebarOpen;
        }
    }
}
</script>
<style>
.slide-enter-active,
.slide-leave-active{
    transition: all .5s;
}

.slide-enter {
    transform: translate(-100%, 0);
    /* transition: all 150ms ease-in 0s; */
}

.slide-leave-to {
    transform: translate(100%, 0);
}

.sidebar-backdrop {
    background-color: rgba(19, 15, 64, .4);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 999;
}
.sidebar-panel {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 155px;
    z-index: 999;
}
.sidebar-card {
    overflow-y: auto;
    background-color: rgba(255, 255, 255, 1);
    height: 430px;
    width: 100%;
    padding: 16px 7px;
    position: fixed;
    top: 110px;
    /* transform: translateY(-50%); */
    border-radius: 30px 0 0 0;
}
.sidebar-gift {
    position: fixed;
    top: 555px;
    background-color: rgba(255, 255, 255, 1);
    height: 70px;
    width: 100%;
    padding: 13px;
    border-radius: 0 0 0 30px;
    color: #de6f90;
}
.sidebar-gift input {
    border: none;
    outline: none;
    border-radius: 0px;
    border-bottom: 1px solid #de6f90;
}
.sidebar-gift textarea:focus, input:focus {
    outline: none;
}
.gift-box {
    margin-top: 5px;
}
.gift-box button {
    margin-left: 60px;
    font-size: 20px;
    padding: 0;
    border: none;
    background: none;
}

.episodes {
    display: flex;
    padding: 12px 3px;
}
.details {
    margin-left: 3px;
    width: 100%;
}
.details > .episode-title {
    color: #585858;
    font-size: 16px;
    text-align: left;
}
.details > .episode-title-indent {
    color: #585858;
    font-size: 16px;
    text-align: left;
    text-indent: -0.5em;
}
.details > .episode-date {
    color: #5d5555;
    font-size: 7px;
    text-align: left;
}
.details-current > .episode-title {
    color: #de6f90;
    font-size: 16px;
    text-align: left;
}
.details-current > .episode-title-indent {
    color: #de6f90;
    font-size: 16px;
    text-align: left;
    text-indent: -0.5em;
}
.details-current > .episode-date {
    color: #de6f90;
    font-size: 7px;
    text-align: left;
}

.episode-title{
    width: 100%;
    color: #53565a;
    /* font-size: 1.13em;
    text-align: center; */
    margin-bottom: 5px;
}
.episode-date {
    font-family: Muli;
    width: 100%;
    /* font-weight: 400;
    text-align: center; */
}
</style>
