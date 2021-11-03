import {createStore} from 'vuex'

export default createStore({
    state: {
        isSidebarOpen: false,
        episode: 'episodeOne'
    },
    mutations: {
        toggleSidebar() {
            this.state.isSidebarOpen = !this.state.isSidebarOpen;
        },

        setEpisode(state, url) {
            state.episode = url;
        },
    },
    actions: {},
    modules: {}
})