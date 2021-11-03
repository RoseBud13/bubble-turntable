<template>
    <div class="card-container">
        <div 
            class="card-wrapper"
            @touchstart="playerTouchStart"
            @touchmove="playerTouchMove"
            @touchend="playerTouchEnd"
        >
            <div 
                class="card-item"
                v-for="(item, index) in cardArrs"
                :key="index"
                :style="[
                { zIndex: item.zIndex },
                { transform: `scale(${item.scale}) translate3d(0px, ${item.translateY}, 0px)` },
                { transition: `transform ${item.transitionTime}s ease 0s` }
                ]"
            >
                <div class="item-inner">
                    <img
                        class="bg-img"
                        :src="item.img"
                        alt=""
                    >
                    <div class="card-content">
                        <p>{{item.line1}}</p>
                        <p>{{item.line2}}</p>
                        <p>{{item.line3}}</p>
                        <p>{{item.line4}}</p>
                        <p>{{item.line5}}</p>
                        <p>{{item.line6}}</p>
                        <div class="puzzle-card" :style="[{display: item.puzzle}]">
                            <br>
                            <br>
                            <p><strong>”我做到了！“</strong></p>
                            <p><strong>”我不信“</strong></p>
                            <input type="text" @input="inputFun" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getCards } from '../api'

export default {
    data() {
        return {
            cardArrs: [],
            currentEpisode: this.$store.state.episode,
            isClick: true,
            startY: 0, // 触摸位置
            endY: 0, // 结束位置
            moveY: 0, // 滑动时的位置
            disY: 0, // 移动距离
            slideDistance: 40, // 滑动触发切换还是回位的阀值
            currentIndex: 0, // 当前第一个的 index
            slideDirection: 0, // 滑动方向：0 向下，1 向上
            slideFilishDistance: 300,  // 滑动切换动画完成的距离
            inputValue: '',
            childmsg: 'show stars'
        }
    },
    mounted() {
        this.fetchCards(this.currentEpisode);
    },
    watch: {
        '$store.state.episode'(newVal, oldVal) {
            this.fetchCards(newVal);
        }
    },
    methods: {
        fetchCards(currentEpsd) {
            getCards(currentEpsd).then(response => {
                this.cardArrs = response.data;
            }).catch(e => {
                console.log(e)
            });
        },

        inputFun(e){
            //e.target 指向了dom元素
            this.inputValue = e.target.value;
            if ((this.inputValue === '除非给我看看') || (this.inputValue === '除非给你看看') || (this.inputValue === '除非让你看看') || (this.inputValue === '除非让我看看')) {
                this.$emit('triggerStars', this.childmsg);
                console.log(this.inputValue);
            }
        },

        // 滑动开始
        playerTouchStart (ev) {
            ev = ev || event
            this.isClick = true
            // tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
            if (ev.touches.length === 1) {
                // 记录开始位置
                this.startY = ev.touches[0].clientY
                // console.log('开始触摸-startY', this.startY)
            }
        },

        // 滑动中
        playerTouchMove (ev) {
            ev = ev || event
            this.isClick = false
            if (ev.touches.length === 1) {
                // 滑动时距离浏览器左侧实时距离
                this.moveY = ev.touches[0].clientY
                // 起始位置减去实时的滑动的距离,得到手指实时偏移距离
                this.disY = this.startY - this.moveY
                // console.log('滑动-disY', this.disY)
                // 判断滑动方向
                if (this.disY < 0) {
                    // 向下滑
                    this.slideDirection = 0
                    // 当前上一个变化
                    if (this.cardArrs[this.currentIndex - 1]) {
                        let item_0 = this.cardArrs[this.currentIndex - 1]
                        item_0.translateY = -window.innerHeight - this.disY + 'px'
                        item_0.transitionTime = 0
                        if (-this.disY <= this.slideFilishDistance) {
                        item_0.scale = -(0.2 / this.slideFilishDistance) * this.disY + 0.8
                        }
                    }
                    // 当前第一个变化
                    let item_1 = this.cardArrs[this.currentIndex]
                    if (-this.disY <= this.slideFilishDistance) {
                        item_1.translateY = -(9 / this.slideFilishDistance) * this.disY + 'vh'
                        item_1.transitionTime = 0
                        item_1.scale = (0.1 / this.slideFilishDistance) * this.disY + 1
                    }
                    // 当前第二个变化
                    if (this.cardArrs[this.currentIndex + 1]) {
                        let item_2 = this.cardArrs[this.currentIndex + 1]
                        if (-this.disY <= this.slideFilishDistance) {
                        item_2.translateY = -(5 / this.slideFilishDistance) * this.disY + 9 + 'vh'
                        item_2.transitionTime = 0
                        item_2.scale = (0.05 / this.slideFilishDistance) * this.disY + 0.9
                        }
                    }
                    // 当前第三个变化
                    if (this.cardArrs[this.currentIndex + 2]) {
                        let item_3 = this.cardArrs[this.currentIndex + 2]
                        if (-this.disY <= this.slideFilishDistance) {
                        item_3.translateY = -(26 / this.slideFilishDistance) * this.disY + 14 + 'vh'
                        item_3.transitionTime = 0
                        item_3.scale = (0.35 / this.slideFilishDistance) * this.disY + 0.85
                        }
                    }
                } else if (this.disY > 0) {
                    // 向上滑
                    this.slideDirection = 1
                    // 当前第一个变化
                    let item_1 = this.cardArrs[this.currentIndex]
                    item_1.translateY = -this.disY + 'px'
                    item_1.transitionTime = 0
                    item_1.scale = 1
                    // 当前第二个变化
                    if (this.cardArrs[this.currentIndex + 1]) {
                        let item_2 = this.cardArrs[this.currentIndex + 1]
                        if (this.disY <= this.slideFilishDistance) {
                        item_2.translateY = -(9 / this.slideFilishDistance) * this.disY + 9 + 'vh'
                        item_2.transitionTime = 0
                        item_2.scale = (0.1 / this.slideFilishDistance) * this.disY + 0.9
                        }
                        }
                    // 当前第三个变化
                    if (this.cardArrs[this.currentIndex + 2]) {
                        let item_3 = this.cardArrs[this.currentIndex + 2]
                        if (this.disY <= this.slideFilishDistance) {
                        item_3.translateY = -(5 / this.slideFilishDistance) * this.disY + 14 + 'vh'
                        item_3.transitionTime = 0
                        item_3.scale = (0.05 / this.slideFilishDistance) * this.disY + 0.85
                        }
                    }
                    // 当前第四个变化
                    if (this.cardArrs[this.currentIndex + 3]) {
                        let item_4 = this.cardArrs[this.currentIndex + 3]
                        if (this.disY <= this.slideFilishDistance) {
                        item_4.translateY = -(26 / this.slideFilishDistance) * this.disY + 40 + 'vh'
                        item_4.transitionTime = 0
                        item_4.scale = (0.35 / this.slideFilishDistance) * this.disY + 0.5
                        }
                    }
                }
            }
        },

        // 滑动结束
        playerTouchEnd (ev) {
            ev = ev || event
            if (ev.changedTouches.length === 1) {
                this.endY = ev.changedTouches[0].clientY
                // console.log('滑动结束-endY', this.endY)
                this.disY = this.startY - this.endY
                if (Math.abs(this.disY) < this.slideDistance) {
                    // 滑动距离小于滑动限制的距离,强行回到起点
                    this.returnBack()
                } else {
                    // 滑动距离大于滑动限制的距离,滑动到最大值
                    if (this.slideDirection === 1) {
                        this.slideUp()
                    } else {
                        this.slideDown()
                    }
                }
            }
        },

        // 回到起点
        returnBack () {
            // 当前第一个变化
            let item_1 = this.cardArrs[this.currentIndex]
            item_1.translateY = 0
            item_1.transitionTime = 1
            item_1.scale = 1
            // 当前第二个变化
            if (this.cardArrs[this.currentIndex + 1]) {
                let item_2 = this.cardArrs[this.currentIndex + 1]
                item_2.translateY = '4vh'
                item_2.transitionTime = 1
                item_2.scale = 0.9
            }
            // 当前第三个变化
            if (this.cardArrs[this.currentIndex + 2]) {
                let item_3 = this.cardArrs[this.currentIndex + 2]
                item_3.translateY = '7vh'
                item_3.transitionTime = 1
                item_3.scale = 0.85
            }
            // 当前第四个变化
            if (this.cardArrs[this.currentIndex + 3]) {
                let item_4 = this.cardArrs[this.currentIndex + 3]
                item_4.translateY = '29vh'
                item_4.transitionTime = 1
                item_4.scale = 0.5
            }
        },

        // 向上滑动切换
        slideUp () {
            if (this.currentIndex === this.cardArrs.length - 1) {
                return this.returnBack()
            }
            // 当前第一个变化
            let item_1 = this.cardArrs[this.currentIndex]
            item_1.translateY = '-200vh'
            item_1.transitionTime = 1
            item_1.scale = 0.5
            // 当前第二个变化
            if (this.cardArrs[this.currentIndex + 1]) {
                let item_2 = this.cardArrs[this.currentIndex + 1]
                item_2.translateY = 0
                item_2.transitionTime = 1
                item_2.scale = 1
            }
            // 当前第三个变化
            if (this.cardArrs[this.currentIndex + 2]) {
                let item_3 = this.cardArrs[this.currentIndex + 2]
                item_3.translateY = '4vh'
                item_3.transitionTime = 1
                item_3.scale = 0.9
            }
            // 当前第四个变化
            if (this.cardArrs[this.currentIndex + 3]) {
                let item_4 = this.cardArrs[this.currentIndex + 3]
                item_4.translateY = '7vh'
                item_4.transitionTime = 1
                item_4.scale = 0.85
            }
            this.currentIndex++
            if (this.currentIndex > this.cardArrs.length - 1) {
                this.currentIndex = this.cardArrs.length - 1
            }
            // console.log('currentIndex---', this.currentIndex)
        },

        // 向下滑动切换
        slideDown () {
            if (this.currentIndex === 0) {
                return this.returnBack()
            }
            // 当前上一个变化
            if (this.cardArrs[this.currentIndex - 1]) {
                let item_0 = this.cardArrs[this.currentIndex - 1]
                item_0.translateY = 0
                item_0.transitionTime = 0.6
                item_0.scale = 1
            }
            // 当前第一个变化
            let item_1 = this.cardArrs[this.currentIndex]
            item_1.translateY = '4vh'
            item_1.transitionTime = 0.6
            item_1.scale = 0.9
            // 当前第二个变化
            if (this.cardArrs[this.currentIndex + 1]) {
                let item_2 = this.cardArrs[this.currentIndex + 1]
                item_2.translateY = '7vh'
                item_2.transitionTime = 0.6
                item_2.scale = 0.85
            }
            // 当前第三个变化
            if (this.cardArrs[this.currentIndex + 2]) {
                let item_3 = this.cardArrs[this.currentIndex + 2]
                item_3.translateY = '29vh'
                item_3.transitionTime = 0.6
                item_3.scale = 0.5
            }
            this.currentIndex--
            if (this.currentIndex < 0) {
                this.currentIndex = 0
            }
            // console.log('currentIndex---', this.currentIndex)
        }
    }
}
</script>

<style lang="scss">
.card-container {
    width: 100%;
    height: 100vh;
    position: relative;
    overflow: hidden;
    padding-top: 300px;
}
.card-wrapper {
    position: relative;
    height: calc(65vh + 11px);
}
.card-item {
    position: absolute;
    width: 100%;
    height: 400px;
    text-align: center;
    font-size: 18px;
    border-radius: 8px;
    will-change: transform;
    .item-inner {
        width: 300px;
        height: 100%;
        margin: 0 auto;
        box-shadow: 0 30px 60px rgba(0, 0, 0, 0.12),
            0 20px 20px rgba(95, 23, 101, 0.2);
        position: relative;
        border-radius: 8px;
        background-color: rgb(255, 255, 255);
        display: flex;
        align-items: center;
        background-size: cover;
        background-position: center;
    }
    .bg-img {
        opacity: 0.3;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: auto;
        border-radius: 8px;
    }
}
.card-content {
    margin: auto;
    position: relative;
}
.puzzle-card {
    height: 400px;
}
</style>
