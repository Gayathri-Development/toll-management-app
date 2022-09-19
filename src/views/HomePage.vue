<template>
  <div>
    <h1>Toll Management Application</h1>

    <div class="flex-container">
        <div class="toll-title-header">
          <b>Toll entries/Vehicle entries</b>
        </div>

        <div class="toll-filter-header">
          <div class="dropdown">
            <i class="fa fa-filter" aria-hidden="true"></i>
            <div class="dropdown-content">
              <a @click="tollNameSearch()" v-model="tollName" value="">{{"All"}}</a>
              <span v-for="(toll, index) in tolls">
                <a @click="tollNameSearch(toll.tollName)" v-model="tollName" :value="toll.tollName">{{toll.tollName}}</a>
              </span>
            </div>
          </div>
        </div>

        <div class="search-header">
          <div class="search-input">
              <input class="search" v-model="vehicleNumberSearch" type="text" 
                placeholder="Search vehicle"> 
              <i class="fa fa-search"></i>
          </div>
        </div>
        <!-- Add new vehicle entry -->
        <div class="toll-btn-vechicle-header">
          <!-- <Modal id="add-vehicle" modelTitle="Add New Vehicle" modelSize="small" btnTitle="Save" @btnAction="createVehicle($event)" @close="addVehicleModel" :modalActive="modalActive">
            <div class="modal-content">
              <AddVehicleForm :tolls="tolls" :model="model" :flags="flags"></AddVehicleForm>
            </div>
          </Modal> -->
          <Modal id="add-vehicle" modelTitle="Add New Vehicle" modelSize="small" btnTitle="Save" @btnAction="createVehicle($event)" @close="vehicleModalStatus($event)" :modalActive="vehicleModalActive">
            <div class="modal-content">
              <AddVehicleForm :tolls="tolls" :model="model" :flags="flags"></AddVehicleForm>
            </div>
          </Modal>
          <button id="add-vehicle" @click="vehicleModel" type="button">Add Vehicle Entry</button>        
        </div>
        <!-- Add new toll entry -->
        <div class="toll-btn-toll-header">
          <Modal modelTitle="Add New Toll" btnTitle="Save" @btnAction="createToll($event)" @close="tollModalStatus($event)" :modalActive="tollModalActive">
            <div class="modal-content">
              <AddTollForm :model="model" :flags="flags"></AddTollForm>
            </div>
          </Modal>
          <button @click="tollModal" type="button">Add New Toll</button>
        </div> 
        <!-- View all tolls -->
        <div class="toll-btn-toll-header">
          <button type="button">View All Tolls</button>
        </div>
    </div>

    <!-- <div class="search-header">
        <span>Toll entries/Vehicle entries</span>
        <div class="search-input">
            <input class="search" type="text" 
              placeholder="Search vehicle"> 
            <i class="fa fa-search"></i>
            <button type="submit">Login</button> 
        </div>
    </div> -->

    <Table :rows="records" :columns="fields"></Table>

    <!-- <Table :rows="tolls" :columns="fields"></Table> -->

  </div>
</template>

<script>
import Table from '@/components/Table/Table.vue'
import Modal from "@/components/Model/Modal.vue";
import AddVehicleForm from "@/views/AddNewVehicle.vue";
import AddTollForm from "@/views/AddNewToll.vue";
import { ref } from "vue";
export default {
  name: 'HomePage',
  components: {
    Table,
    Modal,
    AddVehicleForm,
    AddTollForm
  },
  // setup() {
  //   // addVehicleModel
  //   const modalActive = ref(false);
  //   const addVehicleModel = () => {
  //     modalActive.value = !modalActive.value;
  //   };
  //   return { modalActive, addVehicleModel };
  // },
watch: {
  vehicles: function(val) {
    console.log(val);
  },
  vehicleNumberSearch: function(val) {
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (val != null && val != "") {
      this.records = vehicles.filter(vehicle => (vehicle.vehicleNumber.toLowerCase().includes(val.toLowerCase())))
    } else this.records = vehicles;
  }
},
created() {
  // this.records = this.vehicles;
  const vehicles = JSON.stringify(this.vehicles);
  localStorage.setItem('vehicles', vehicles);
  this.records = JSON.parse(localStorage.getItem('vehicles'));
},
  data () {
    return {
      vehicleModalActive: false,
      tollModalActive: false,
      tollName: "",
      vehicleNumberSearch: "",
      model: {},
      modelVehicle: {
        tollName: null,
        vehicleType: null
      },
      modalToll: {
        carJeepVan: {
          vehicleType: 'carJeepVan'
        },
        lcv: {
          vehicleType: 'lcv'
        },
        truckBus: {
          vehicleType: 'truckBus'
        },
        heavyVehicle: {
          vehicleType: 'heavyVehicle'
        }
      },
      flags: {
        invalid: false
      },
      tolls: [
        {
          "tollName": "Kappalur",
          "carJeepVan": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "lcv": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "truckBus": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "heavyVehicle": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
        },
        {
          "tollName": "Chengalpattu",
          "carJeepVan": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "lcv": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "truckBus": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "heavyVehicle": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
        },
        {
          "tollName": "Krishnagri",
          "carJeepVan": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "lcv": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "truckBus": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
          "heavyVehicle": {
            "singleJourney": "50",
            "returnJourney": "60"
          },
        },
      ],
      vehicles: [
        {
            "vehicleType": "Car/Jeep/Van",
            "vehicleNumber": "TN24Q6844",
            "date": "09/09/2022, 16:48:43",
            "tollName": "Chengalpattu",
            "tariff": "60"
        },
        {
            "vehicleType": "LCV",
            "vehicleNumber": "TN78Q6844",
            "date": "09/09/2022, 16:48:43",
            "tollName": "Kappalur",
            "tariff": "60"
        },
        {
            "vehicleType": "Truck/Bus",
            "vehicleNumber": "TN24Q6844",
            "date": "09/09/2022, 16:48:43",
            "tollName": "Kappalur",
            "tariff": "60"
        },
        {
            "vehicleType": "Heavy vehicle",
            "vehicleNumber": "TN24Q6844",
            "date": "09/09/2022, 16:48:43",
            "tollName": "Kappalur",
            "tariff": "60"
        },
      ],
      fields: [
            {
                key: 'vehicleType',
                label: 'Vehicle Type'
            },
            {
                key: 'vehicleNumber',
                label: 'Vehicle Number'
            },
            {
                key: 'date',
                label: 'Date/Time'
            },
            {
                key: 'tollName',
                label: 'Toll Name'
            },
            {
                key: 'tariff',
                label: 'Tariff'
            }
      ],
    }
  },
methods: {
  vehicleModalStatus(status) {
    console.log(status);
    this.vehicleModalActive = status;
  },
  vehicleModel() {
    this.model = this.modelVehicle;
    this.vehicleModalActive = true;
  },
  tollModalStatus(status) {
    console.log(status);
    this.tollModalActive = status;
  },
  tollModal() {
    this.model = this.modalToll;
    this.tollModalActive = true;
  },
  createToll(model){
    console.log("createToll fn");
    console.log(model);
    this.modalToll = {}
    this.modalTollCleanUp();
  },
  modalTollCleanUp() {
    console.log("Inside cleanup");
    console.log(this.modalToll);
    this.modalToll.carJeepVan = {
      vehicleType: 'carJeepVan'
    };
    this.modalToll.lcv = {
      vehicleType: 'lcv'
    };
    this.modalToll.truckBus = {
      vehicleType: 'truckBus'
    };
    this.modalToll.heavyVehicle = {
      vehicleType: 'heavyVehicle'
    };
    this.model = this.modalToll;
  },
  createVehicle(model){
    console.log("createVehicle fn");
    console.log(model);
    
    // Add new Vehicle...
    // Get the created date & time
    const currentdate = new Date(); 
    const dateTime = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear() + ", "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
    console.log(dateTime);

    const vehicleModel = {vehicleType: model.vehicleType, vehicleNumber: model.vechicleNumber, date: dateTime, tollName: model.tollName, tariff: model.tariff};
    console.log(vehicleModel);

    this.vehicles.push(vehicleModel);
    let vehicles = JSON.stringify(this.vehicles);
    localStorage.setItem('vehicles', vehicles);
    this.records = JSON.parse(localStorage.getItem('vehicles'));
    // Add new vehicle ends...

    this.modelVehicle = {};
    this.modelVehicleCleanUp();
  },
  modelVehicleCleanUp() {
    this.modelVehicle.tollName = null;
    this.modelVehicle.vehicleType = null;
    this.model = this.modelVehicle;
    this.$forceUpdate();
  },
  tollNameSearch(tollName) {
    // console.log(tollName);
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (tollName != null && tollName != "" && tollName != undefined) {
      this.records = vehicles.filter(vehicle => (vehicle.tollName.toLowerCase().includes(tollName.toLowerCase())));
      this.$forceUpdate();
    } else {
      this.records = vehicles;
      this.$forceUpdate();
    }
  },
},
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-header {
  padding-bottom: 25px;
}

/* Add Flexbox css */ 
.flex-container {
  display: flex;
  flex-direction: row;
}

.flex-container > div {
  padding-right: 0px;
}

/* Add search inputbox css */ 
.search { 
  width: 100%; 
  padding: 10px 40px; 
  margin: 8px 0; 
  display: inline-block; 
  border: 1px solid #ccc; 
  box-sizing: border-box;
  border-radius: 25px;
  font-size: 15px;
} 

.toll-filter-header {
    padding-left: 0px;
    cursor: pointer;
    padding: 32px;
    color: gray;
    text-shadow: 1px 1px 1px #ccc;
    font-size: 1.5em;
}

.toll-title-header {
  padding-right: 0px;
  padding: 32px;
  font-size: 18px;
}

.search-header { 
  padding: 16px; 
} 

.toll-btn-vechicle-header{
  padding: 16px 200px; 
}

.toll-btn-toll-header {
  padding: 16px;
}

.search-input {
  position: relative;
}
          
.search-input i{
  position: absolute;
  left: 15px;
  top: 19px;
  color: gray;
}

/* Add Drop-down css */ 
.dropbtn {
  background-color: #4CAF50;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
  cursor: pointer;
}

.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  right: 0;
  background-color: #f9f9f9;
  min-width: 120px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  font-size: 14px;
  text-align: center;
}

.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

.dropdown-content a:hover {background-color: #f1f1f1;}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}


</style>
