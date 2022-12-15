<template>
    <div class="episodes-sidebar">
        <div class="sidebar-backdrop" @click="toggleSidebar()" v-if="this.$store.state.isSidebarOpen"></div>
        <div class="sidebar-panel" :class="{ sidebarpanel__hidden: !this.$store.state.isSidebarOpen }">
            <div class="sidebar-card">
                <ul>
                    <li v-for="episode in episodes" :key="episode.name" class="episodes">
                        <div 
                        :class="{'details': !isCurrent(episode.url), 'details-current': isCurrent(episode.url)}"
                        @click="setEpi(episode.url)">
                            <h2 class="episode-title" v-show="episode.nameRegular">
                            {{ episode.name }}
                            </h2>
                            <h2 class="episode-title-indent" v-show="episode.nameIndent">
                            {{ episode.name }}
                            </h2>
                            <h2 class="episode-title-mini" v-show="episode.nameMini">
                            {{ episode.name }}
                            </h2>
                            <p class="episode-date">{{ episode.releaseDate }}</p>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="sidebar-gift-sorrow" v-show="showSorrow === 'show'">
                <p>落叶就落叶</p>
                <input style="width: 83px" type="text" @input="inputListenerSorrow" />
                <div class="gift-box" v-show="showGiftBoxSorrow">
                    <router-link to="/bubble-turntable/sorrow/" style="text-decoration: none; color: inherit;">void</router-link>
                </div>
            </div>
            <div class="sidebar-gift" v-show="showSorrow !== 'show'">
                <!-- <p>你选了decaf的美式</p>
                <p style="display: inline">我买了</p><input style="width: 41px" type="text" @input="inputListener" /><p style="display: inline">的薄荷</p>
                <div class="gift-box" v-show="showGiftBox">
                    <button @click="displayGift">🎁</button>
                </div> -->
                <p>Disney Gangsters ❌</p>
                <input style="width: 150px" type="text" @input="inputListener" />
                <div class="gift-box" v-show="showGiftBox">
                    <button @click="displayGift">🦄</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapMutations } from 'vuex';
import { getEpisodes } from '../api'

export default {
    data() {
        return {
            episodes: [],
            showGiftBox: false,
            showGiftBoxSorrow: false,
            openGiftBox: 'show gift',
            showSorrow: 'show'
        }
    },
    watch: {
        '$store.state.beSorrow'(newVal, oldVal) {
            this.showSorrow = newVal;
        }
    },
    mounted() {
        this.fetchEpisodes();
    },
    methods: {
        ...mapMutations(['toggleSidebar', 'setEpisode', 'isSorrow', 'isNotSorrow']),

        isCurrent(ep) {
            return ep === this.$store.state.episode;
        },

        fetchEpisodes() {
            getEpisodes().then(response => {
                this.episodes = response.data;
            }).catch(e => {
                console.log(e)
            });
        },

        setEpi(url) {
            if (url === 'sorrow') {
                this.setEpisode(url);
                this.isSorrow();
                this.toggleSidebar();
            } else {
                this.setEpisode(url);
                this.isNotSorrow();
                this.toggleSidebar();
            }
        },

        // inputListener(e) {
        //     this.inputV = e.target.value;
        //     if ((this.inputV === 'extra') || (this.inputV === 'Extra')) {
        //         this.showGiftBox = true;
        //     }
        // },

        inputListener(e) {
            this.inputV = e.target.value;
            if ((this.inputV === 'Disney Gangsisters') || (this.inputV === 'Gangsisters') || (this.inputV === 'gangsisters') || (this.inputV === 'disney gangsisters')) {
                this.showGiftBox = true;
            }
        },

        inputListenerSorrow(e) {
            this.inputV = e.target.value;
            if (this.inputV === '结冰就结冰') {
                this.showGiftBoxSorrow = true;
            }
        },

        displayGift() {
            this.$emit('triggerGift', this.openGiftBox);
            this.toggleSidebar();
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
.sidebar-backdrop {
    background-color: rgba(19, 15, 64, .4);
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    cursor: pointer;
    z-index: 999;
    transition: all 0.4s ease;
}

.sidebar-panel {
    position: fixed;
    right: 0;
    top: 0;
    height: 100vh;
    width: 155px;
    z-index: 999;
    transition: all 0.4s ease;
}

.sidebarpanel__hidden {
  transform: translateX(100%);
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

.sidebar-gift-sorrow {
    position: fixed;
    top: 555px;
    background-color: rgba(255, 255, 255, 1);
    height: 70px;
    width: 100%;
    padding: 13px;
    border-radius: 0 0 0 30px;
    color: #9b7782;
}

.sidebar-gift-sorrow input {
    border: none;
    outline: none;
    border-radius: 0px;
    border-bottom: 1px solid #9b7782;
}

.sidebar-gift-sorrow textarea:focus, input:focus {
    outline: none;
}

.sidebar-gift-sorrow .gift-box {
    margin-left: 0;
    font-size: 10px;
    padding: 6px;
    border: none;
    background: none;
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

.details > .episode-title-mini {
    color: #585858;
    font-size: 13px;
    text-align: left;
}

.details > .episode-date {
    color: #5d5555;
    font-size: 9px;
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

.details-current > .episode-title-mini {
    color: #de6f90;
    font-size: 13px;
    text-align: left;
}

.details-current > .episode-date {
    color: #de6f90;
    font-size: 9px;
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
