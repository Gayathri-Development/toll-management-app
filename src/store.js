import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        tollsFiltered: [],
        tolls: [
            {
              "tollName": "Kappalur",
              "carJeepVan": {
                "singleJourney": "150",
                "returnJourney": "100"
              },
              "lcv": {
                "singleJourney": "50",
                "returnJourney": "30"
              },
              "truckBus": {
                "singleJourney": "60",
                "returnJourney": "40"
              },
              "heavyVehicle": {
                "singleJourney": "350",
                "returnJourney": "260"
              },
            },
            {
              "tollName": "Chengalpattu",
              "carJeepVan": {
                "singleJourney": "150",
                "returnJourney": "60"
              },
              "lcv": {
                "singleJourney": "70",
                "returnJourney": "45"
              },
              "truckBus": {
                "singleJourney": "150",
                "returnJourney": "60"
              },
              "heavyVehicle": {
                "singleJourney": "150",
                "returnJourney": "90"
              },
            },
            {
              "tollName": "Krishnagri",
              "carJeepVan": {
                "singleJourney": "90",
                "returnJourney": "75"
              },
              "lcv": {
                "singleJourney": "200",
                "returnJourney": "120"
              },
              "truckBus": {
                "singleJourney": "330",
                "returnJourney": "200"
              },
              "heavyVehicle": {
                "singleJourney": "70",
                "returnJourney": "50"
              },
            },
        ],
        vehiclesFiltered: [],
        vehicles: [
            {
                "vehicleType": "Truck/Bus",
                "vehicleNumber": "TN24Q6844",
                "date": "20/9/2022, 10:28:13",
                "tollName": "Kappalur",
                "tariff": "60"
            },
            {
                "vehicleType": "LCV",
                "vehicleNumber": "TN78Q6844",
                "date": "9/9/2022, 16:48:43",
                "tollName": "Krishnagri",
                "tariff": "200"
            },
            {
                "vehicleType": "Truck/Bus",
                "vehicleNumber": "TN24Q6844",
                "date": "20/9/2022, 11:20:43",
                "tollName": "Kappalur",
                "tariff": "40"
            }
          ],
    }
});