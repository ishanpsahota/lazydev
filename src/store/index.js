import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    theme: document.body.getAttribute('data-theme')

  },
  mutations: {

    changeTheme(state, new_theme) {
      state.theme = new_theme
    }

  },
  actions: {

    changeTheme({commit}, theme) {

      // console.log(theme)

      if(theme == 'dark') {
        commit('changeTheme', 'light')
        localStorage.setItem('theme', 'light')
        document.body.setAttribute('data-theme', 'light')
      }

      if(theme == 'light') {
        commit('changeTheme', 'dark')
        localStorage.setItem('theme', 'dark')
        document.body.setAttribute('data-theme', 'dark')
      }
    }

  },
  
  getters : {
    getTheme: state => state.theme
  }
})
