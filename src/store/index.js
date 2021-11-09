import {createStore} from 'vuex'

export default createStore({
    state: {
        isSidebarOpen: false,
        episode: 'sorrow',
        beSorrow: 'show',
        isPlaying: false
    },
    mutations: {
        toggleSidebar() {
            this.state.isSidebarOpen = !this.state.isSidebarOpen;
        },

        isSorrow() {
            this.state.beSorrow = 'show';
        },

        isNotSorrow() {
            this.state.beSorrow = 'not';
        },

        setEpisode(state, url) {
            state.episode = url;
        },

        beginPlayerState() {
            this.state.isPlaying = true;
        },

        endPlayerState() {
            this.state.isPlaying = false;
        },
    },
    actions: {},
    modules: {}
})