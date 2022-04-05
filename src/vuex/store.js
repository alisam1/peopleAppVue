import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)


let store = new Vuex.Store({
    state:{
        items: []
    },
    mutations: {
        SET_ITEMS: (state, items) => {
            state.items = items.data;
        },
        ADD_PEOPLE_ARRAY: (state, item) => {
            state.items.push(item);
        },
        DELETE_PEOPLE_ARRAY: (state, index) => {
            state.items.splice(index, 1)
        },
    },
    actions: {
        GET_ITEMS_FROM_API({commit}) {
            return axios('https://reqres.in/api/users', {
                method: "GET"
            })
            .then ((items) => {
                commit('SET_ITEMS', items.data);
                 return items;
            })
            .catch((error) => {
                console.log(error)
            })
        },
        ADD_PEOPLE({commit}, item) {
            commit('ADD_PEOPLE_ARRAY', item)
        },
        DELETE_PEOPLE({commit}, index) {
            commit('DELETE_PEOPLE_ARRAY', index)
        }
    },
    getters: {
        ITEMS(state) {
            return state.items;
        }
    }

})

export default store;