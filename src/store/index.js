import {createStore} from 'vuex'

export default createStore({
    state: {
        isSidebarOpen: false,
        songSource: '',
        cardSource: ''
    },
    mutations: {
        toggleSidebar() {
            this.state.isSidebarOpen = !this.state.isSidebarOpen;
        },

        setSongSource(state, data) {
            state.songSource = data;
        },

        setCardSource(state, data) {
            state.cardSource = data;
        },
    },
    actions: {},
    modules: {}
})