import Vue from 'vue'
import Router from 'vue-router'

// components...
import HomeVehicle from '@/views/HomeVehicle.vue';
import HomeTollgate from '@/views/HomeTollgate.vue';

Vue.use(Router)

export default new Router({
    routes: [
      { 
        path: `/Vehicles`,
        name: `Vehicles`,
        component: HomeVehicle 
      },
      {
        path: `/Tollgates`,
        name: `Tollgates`,
        component: HomeTollgate,
      },
    ]
});
