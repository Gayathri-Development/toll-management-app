import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        tolls: localStorage.getItem('tolls') != null ? JSON.parse(localStorage.getItem('tolls')) : [], // mutate tolls
        tollsFiltered: [],
        vehicles: localStorage.getItem('vehicles') != null ? JSON.parse(localStorage.getItem('vehicles')) : [], // mutate vehicles
        vehiclesFiltered: []
    },
    mutations: {
        setTolls (tolls) {
            state.tolls = tolls;
        },
        setVehicles (vehicles) {
            state.tolls = vehicles;
        },
    },
});