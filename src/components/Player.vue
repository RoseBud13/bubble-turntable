<template>
    <div class="player">
        <div class="disk-wrapper">
            <div class="disk" :class="{ disk__playing: isPlaying }">
                <label class="disk-cover" />
            </div>
        </div>
        <div class="control-buttons-wrapper">
            <div class="control" :class="{ control__playing: isPlaying }">
                <div class="button button-side" @click="prev">
                    <i class="fa fa-backward" />
                </div>
                <div class="button" v-if="!isPlaying" @click="play">
                    <i class="fa fa-play"></i>
                </div>
                <div class="button" v-else @click="pause">
                    <i class="fa fa-pause"></i>
                </div>
                <div class="button button-side" @click="next">
                    <i class="fa fa-forward" />
                </div>
            </div>
        </div>
    </div>
    <div class="progress-bar-wrapper">
            <div class="progress" :class="{ progress__playing: isPlaying }">
                <h2 class="progress-title">{{ current.title }}</h2>
                <p class="progress-text">
                    {{ currentTimer }} / {{ current.totalTimer }}
                </p>
                <div class="bar">
                    <span :style="{ width: progress }" />
                </div>
            </div>
        </div>
</template>

<script>
import songs from "../mocks/songs"
import { timeFormater } from "../utils/timer"
import { threatSongs } from "../utils/tools"

export default {
    data() {
        return {
            player: new Audio(),
            current: {},
            songs: songs,
            currentTimer: "00:00",
            index: 0,
            isPlaying: false,
            progress: "",
        }
    },
    methods: {
        playListener() {
            this.player.addEventListener("timeupdate", () => {
                var playerTimer = this.player.currentTime;

                this.currentTimer = timeFormater(playerTimer);
                this.current.isPlaying = true;
            });
            this.player.addEventListener(
                "ended",
                function() {
                this.next();
                }.bind(this)
            );
        },
        setCurrent() {
            this.current = this.songs[this.index];
            this.play(this.current);
        },
        play(song) {
            if (typeof song.src !== "undefined") {
                this.current.isPlaying = false;
                this.index = this.songs.indexOf(this.current);
                this.current = song;
                this.player.src = this.current.src;
            }
            this.player.play();
            this.isPlaying = true;

            this.playListener();
        },
        pause() {
            this.player.pause();
            this.isPlaying = false;
        },
        next() {
            this.current.isPlaying = false;
            this.index = this.songs.indexOf(this.current);
            this.index++;
            if (this.index > this.songs.length - 1) {
                this.index = 0;
            }
            this.setCurrent();
        },
        prev() {
            this.current.isPlaying = false;
            this.index = this.songs.indexOf(this.current);
            this.index--;
            if (this.index < 0) {
                this.index = this.songs.length - 1;
            }
            this.setCurrent();
        }
    },
    mounted() {
        this.songs = threatSongs(this.songs);
        this.current = this.songs[this.index];
        this.player.src = this.current.src;

        const draw = () => {
            requestAnimationFrame(draw);
            const progress = this.player.currentTime / this.current.seconds;
            this.progress = `${(progress * 100).toFixed(2)}%`;
        };

        draw();
    }
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
    z-index: 12;
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
    z-index: 11;
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
.disk__playing .disk_cover {
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
</style>
