<template>
    <div class="player">
        <div class="disk-wrapper" @click="showDisks">
            <div class="disk" :class="{ disk__playing: $store.state.isPlaying }">
                <label 
                    class="disk-cover" 
                    ref="cover"
                    :style="{
                        backgroundImage: `url('${current.cover}')`
                    }"
                ></label>
            </div>
        </div>
        <div class="control-buttons-wrapper">
            <div class="control" :class="{ control__playing: $store.state.isPlaying }">
                <div class="button button-side" @click="prev">
                    <i class="fas fa-backward"></i>
                </div>
                <div class="button" v-if="!$store.state.isPlaying" @click="play">
                    <i class="fas fa-play"></i>
                </div>
                <div class="button" v-else @click="pause">
                    <i class="fas fa-pause"></i>
                </div>
                <div class="button button-side" @click="next">
                    <i class="fas fa-forward"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="progress-bar-wrapper">
        <div class="progress" :class="{ progress__playing: $store.state.isPlaying }">
            <h2 class="progress-title">{{ current.title }}</h2>
            <p class="progress-text">
                {{ currentTimer }} / {{ current.totalTimer }}
            </p>
            <div class="bar">
                <span :style="{ width: progress }"></span>
            </div>
        </div>
    </div>
    <div class="disk-list" v-show="showDiskList">
        <ul>
            <li v-for="song in songList" :key="song.src" class="song">
                <div class="disk-wrapper-in-list" @click="playSelected(song)">
                    <div class="disk-in-list">
                        <label class="disk-cover-in-list" ref="cover" :style="[{backgroundImage: `url('${song.cover}')`}]"/>
                    </div>
                </div>
            </li>
            <li class="song">
                <div class="disk-wrapper-in-list" @click.prevent="toggleEpisodes">
                    <div class="disk-in-list">
                        <label class="disk-cover-in-list"></label>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import { timeFormater } from "../utils/timer"
import { threatSongs, shuffleArray } from "../utils/tools"
import { mapMutations } from 'vuex';
import { getSongs } from '../api'

export default {
    data() {
        return {
            player: new Audio(),
            songList: [],
            songs: [],
            currentEpisode: this.$store.state.episode,
            current: {},
            currentTimer: "00:00",
            songIndex: 0,
            progress: "",
            showDiskList: false,
            isPaused: false
        }
    },
    mounted() {
        this.initSongs(this.currentEpisode);
    },
    methods: {
        ...mapMutations(['toggleSidebar', 'beginPlayerState', 'endPlayerState']),

        toggleEpisodes() {
            this.toggleSidebar();
        },

        initSongs(currentEpsd) {
            console.log('init songs ======');
            this.songIndex = 0;
            getSongs(currentEpsd).then(response => {
                this.songList = shuffleArray(response.data);
                this.songs = threatSongs(this.songList);
                this.current = this.songs[this.songIndex];
                // this.player.src = this.current.src;
                console.log('init: ', this.songIndex, this.current.title);
            }).catch(e => {
                console.log(e);
            });

            this.player.addEventListener("timeupdate", () => {
                let end = this.player.duration;
                let now = this.player.currentTime;
                this.currentTimer = timeFormater(now);
                this.progress = `${(now / this.current.seconds * 100).toFixed(2)}%`;

                if (now === end) {
                    console.log('song ended, play next >>>>>');
                    this.next();
                }
            });

            // this.player.addEventListener("ended", () => {
            //     console.log('song ended, play next >>>>>');
            //     this.next();
            // });
        },

        setCurrent() {
            this.endPlayerState();
            this.current = this.songs[this.songIndex];
            console.log('set current: ', this.songIndex, this.current.title);
            this.isPaused = false;
            this.play();
        },

        readyPlay() {
            this.player.load();
            this.player.src = this.current.src;
            console.log('src: ', this.current.src);

            let checkIsPlaying = this.current.isPlaying && this.player.currentTime > 0 && !this.player.paused && !this.player.ended && this.player.readyState > this.player.HAVE_CURRENT_DATA;
            if (!checkIsPlaying) {
                const playPromise = this.player.play();
                if (playPromise) {
                    this.current.isPlaying = true;
                    console.log('playing');
                    playPromise.catch((e) => {
                        console.warn(e);
                        this.pause();
                    });
                }
            } else {
                console.warn('media cannot start');
            }
        },

        play() {
            this.beginPlayerState();
            if (!this.isPaused) {
                console.log('start playing: ', this.songIndex, this.current.title);
                this.readyPlay();
            } else {
                console.log('resume playing: ', this.songIndex, this.current.title);
                this.current.isPlaying = true;
                this.isPaused = false;
                this.player.play();
            }
        },

        readyPause() {
            if (!this.player.paused && this.current.isPlaying) {
                this.current.isPlaying = false;
                this.isPaused = true;
                console.log('paused: ', this.songIndex, this.current.title)
                return this.player.pause();
            }
        },

        pause() {
            this.readyPause();
            this.endPlayerState();
        },

        next() {
            console.log('next >>>');
            this.current.isPlaying = false;
            this.songIndex++;
            if (this.songIndex > this.songs.length - 1) {
                this.songIndex = 0;
            }
            this.setCurrent();
        },

        prev() {
            console.log('<<< prev');
            this.current.isPlaying = false;
            this.songIndex--;
            if (this.songIndex < 0) {
                this.songIndex = this.songs.length - 1;
            }
            this.setCurrent();
        },

        showDisks() {
            this.showDiskList = !this.showDiskList;
        },

        playSelected(selectedAudio) {
            this.endPlayerState();
            this.current.isPlaying = false;
            this.songIndex = this.songs.findIndex(obj => {
                return obj.src === selectedAudio.src;
            });
            console.log('new song selected: ', this.songIndex);
            this.setCurrent();
        },
    },

    watch: {
        '$store.state.episode'(newVal, oldVal) {
            this.player.load()
            this.initSongs(newVal);
            this.endPlayerState();
        },
      
        $route(to, from){
            this.endPlayerState();
            this.player.pause();
        }
    },
}
</script>

<style lang="scss">
.player {
    position: fixed;
    top: 0;
    display: flex;
    margin-top: 120px;
    max-width: 300px;
    max-height: 75px;
    width: 300px;
    height: 75px;
    border-radius: 8px;
    background-color: white;
    box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
        0 20px 20px rgba(95, 23, 101, 0.2);
    z-index: 99;
}
.disk-wrapper {
    flex: 1.2;
    padding: 12px;
}
.control-buttons-wrapper {
    flex: 2;
    padding: 12px 0;
    padding-right: 12px;
}
.progress-bar-wrapper {
    position: absolute;
    top: 0;
    margin-top: 120px;
    width: 282px;
    height: 50px;
    z-index: 98;
}

.disk {
    position: relative;
    padding-top: 100%;
    border-radius: 100%;
    overflow: hidden;
    transform: translateY(-50%) scale(0.88);
    transform-origin: center bottom;
    transition: all 0.6s ease;
}
.disk-cover {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    background-image: radial-gradient(circle, #444 0%, #333 100%);
    background-size: cover;
    background-position: center;
    background-image: url("https://photo-arch-1306125602.cos.ap-shanghai.myqcloud.com/bgpic1.JPG");
}
.disk-cover::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -8px;
    margin-top: -8px;
    width: 16px;
    height: 16px;
    border-radius: 100%;
    background-image: linear-gradient(45deg, white, #dabad1);
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
}
.disk__playing {
    transform: translateY(-50%);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
        0 20px 20px -10px rgba(108, 29, 171, 0.3);
}
.disk__playing .disk-cover {
  animation: rotate infinite 6s linear;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}

.control {
    display: flex;
    height: 100%;
}
.button {
    display: flex;
    margin: 2px;
    align-items: center;
    justify-content: center;
    flex: 1;
    border-radius: 4px;
    color: #ccc;
    font-size: 16px;
    transition: background-color 0.6s ease;
}
@media (hover: hover) {
  .button:hover {
    background-color: #ddd;
    color: white;
  }
}
.button-side {
    font-size: 14px;
}

.progress {
    padding-left: 123px;
    padding-right: 12px;
    height: 100%;
    border-radius: 6px 6px 0 0;
    background-color: rgba(255, 255, 255, 0.55);
    transition: all 0.6s ease;
}
.progress__playing {
    transform: translateY(-100%);
}
.progress-title {
    padding-top: 6px;
    font-size: 12px;
    font-weight: bold;
    overflow: hidden;
    text-overflow: ellipsis;
}
.progress-text {
    padding-top: 2px;
    padding-left: 2px;
    font-size: 12px;
    font-weight: bold;
    color: #ccc;
    transform: scale(0.6);
    transform-origin: left top;
}
.bar {
    height: 3px;
    border-radius: 3px;
    overflow: hidden;
    background-color: #ddd;
}
.bar span {
    display: block;
    height: 100%;
    background-color: #ec51a5;
}

.disk-list {
    background-color: rgba(255, 255, 255, 0.3);
    overflow-y: auto;
    height: 70px;
    width: 340px;
    border-radius: 33px;
    z-index: 99;
    position: fixed;
    top: 220px;
}
.disk-list ul {
    display: flex;
    overflow-x: auto;
}
.disk-list .song {
    height: 70px;
    width: 70px;
    flex: 0 0 auto;
    margin-right: 20px;
}
// .disk-wrapper-in-list {
    
// }
.disk-list .disk-in-list {
    position: relative;
    padding-top: 100%;
    border-radius: 100%;
    overflow: hidden;
}
.disk-list .disk-cover-in-list {
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background-image: radial-gradient(circle, #444 0%, #333 100%);
    background-size: cover;
    background-position: center;
}
.disk-list .disk-cover-in-list::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -6px;
    margin-top: -6px;
    width: 12px;
    height: 12px;
    border-radius: 100%;
    background-image: linear-gradient(45deg, white, #dabad1);
    box-shadow: 0 1px 1px 1px rgba(0, 0, 0, 0.2);
}
</style>
