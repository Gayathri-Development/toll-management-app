<template>
  <div class="container">
    <div class="flex-container">
        <div class="toll-title-header">
          <label v-if="isVehicleLogs"><b>Toll entries/Vehicle entries</b></label>
          <label v-else-if="!isVehicleLogs"><b>Tollgate List</b></label>
        </div>

        <div v-if="isVehicleLogs" class="toll-filter-header">
          <div class="dropdown">
            <i :class="isFilterEnabled ? 'fa fa-filter filtered' : 'fa fa-filter'" aria-hidden="true"></i>
            <div class="dropdown-content">
              <a @click="tollNameFilter()" v-model="tollName" value="">{{"All"}}</a>
              <span v-for="(toll, index) in tolls">
                <a @click="tollNameFilter(toll.tollName)" v-model="tollName" :value="toll.tollName">{{toll.tollName}}</a>
              </span>
            </div>
          </div>
        </div>

        <div class="search-header column">
          <div class="search-input">
              <input v-if="isVehicleLogs" class="search" v-model="vehicleNumberSearch" type="text" placeholder="Search vehicle by Vehicle Number">

                <input v-else-if="!isVehicleLogs" class="search" v-model="tollNameSearch" type="text" 
                placeholder="Search tollgate by Tollgate Name"> 

              <i class="fa fa-search"></i>
          </div>
        </div>
        <!-- Add new vehicle entry -->
        <div class="toll-btn-vechicle-header">
          <Modal id="add-vehicle" modelTitle="Add New Vehicle" modelSize="small" btnTitle="Save" :btnActionInValid="flags.invalid" @btnAction="createVehicle($event)" @close="vehicleModalStatus($event)" :modalActive="vehicleModalActive">
            <div class="modal-content">
              <AddVehicleForm :tolls="tolls" :model="model" :flags="flags" :vehicles="vehiclesFiltered"></AddVehicleForm>
            </div>
          </Modal>
          <button id="add-vehicle" @click="vehicleModel" type="button">Add Vehicle Entry</button>        
        </div>
        <!-- Add new toll entry -->
        <div class="toll-btn-toll-header">
          <Modal modelTitle="Add New Toll" btnTitle="Save" @btnAction="createToll($event)" @close="tollModalStatus($event)" :modalActive="tollModalActive" :btnActionInValid="flags.invalid">
            <div class="modal-content">
              <AddTollForm :model="model" :flags="flags"></AddTollForm>
            </div>
          </Modal>
          <button @click="tollModal" type="button">Add New Toll</button>
        </div> 
        <!-- View all tolls -->
        <div class="toll-btn-toll-header">
          <button v-if="isVehicleLogs" @click="logsToggle" type="button">View All Tolls</button>
          <button v-else-if="!isVehicleLogs" @click="logsToggle" type="button">Back to Vehicle Logs</button>
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

    <div class="card">
      <!-- Vehicles log -->
      <TableComponent v-if="isVehicleLogs" :rows="vehiclesFiltered" :columns="vehicleColumn">
        <template slot="tb-row" slot-scope="props">
          <span v-if="props.column.key == 'vehicleType'">
            {{props.row.vehicleType}}
          </span>
          <span v-if="props.column.key == 'vehicleNumber'">
            {{props.row.vehicleNumber}}
          </span>
          <span v-if="props.column.key == 'date'">
            {{props.row.date}}
          </span>
          <span v-if="props.column.key == 'tollName'">
            {{props.row.tollName}}
          </span>
          <span v-if="props.column.key == 'tariff'">
            {{props.row.tariff}}
          </span>
        </template>
      </TableComponent>

      <!-- Tolls log -->
      <TableComponent v-else-if="!isVehicleLogs" :rows="tollsFiltered" :columns="tollsColumn">
        <template slot="tb-row" slot-scope="props">
          <span v-if="props.column.key == 'tollName'">
            {{props.row.tollName}}
          </span>
          <span v-if="props.column.key == 'carJeepVan'">
            {{props.row.carJeepVan.singleJourney}}/{{props.row.carJeepVan.returnJourney}}
          </span>
          <span v-if="props.column.key == 'lcv'">
            {{props.row.lcv.singleJourney}}/{{props.row.lcv.returnJourney}}
          </span>
          <span v-if="props.column.key == 'truckBus'">
            {{props.row.truckBus.singleJourney}}/{{props.row.truckBus.returnJourney}}
          </span>
          <span v-if="props.column.key == 'heavyVehicle'">
            {{props.row.heavyVehicle.singleJourney}}/{{props.row.heavyVehicle.returnJourney}}
          </span>
          <span v-if="props.column.key == 'actions'">
            <i @click="deleteTollModel(props.row.tollName, props.rowIndex)" class="fa fa-trash fa-lg danger" aria-hidden="true" title="Remove"></i>
            <!-- @click="deleteToll(props.rowIndex)" -->
          </span>
        </template>
      </TableComponent>
    </div>

    <!-- Toll delete model -->
    <Modal id="add-vehicle" modelTitle="Delete Toll" modelSize="small" btnTitle="Delete" @btnAction="deleteToll($event)" :btnActionInValid="flags.invalid" @close="deleteTollModalStatus($event)" :modalActive="deleteTollModalActive">
      <div class="modal-content">
        <DeleteTollForm :model="model" :tollName="deleteTollName" :flags="flags"></DeleteTollForm>
      </div>
    </Modal>

  </div>
</template>

<script>
import TableComponent from '@/components/Table/TableComponent.vue'
import Modal from "@/components/Model/Modal.vue";
import AddVehicleForm from "@/views/AddNewVehicle.vue";
import AddTollForm from "@/views/AddNewToll.vue";
import DeleteTollForm from "@/views/DeleteToll.vue";
import { ref } from "vue";
export default {
  name: 'HomePage',
  components: {
    TableComponent,
    Modal,
    AddVehicleForm,
    AddTollForm,
    DeleteTollForm
  },
  data () {
    return {
      isVehicleLogs: true,
      vehicleModalActive: false,
      tollModalActive: false,
      deleteTollModalActive: false,
      deleteTollName: "",
      tollName: "",
      vehicleNumberSearch: "",
      tollNameSearch: "",
      isFilterEnabled: false,
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
        invalid: true
      },
      tolls: [
        {
          "tollName": "Kappalur",
          "carJeepVan": {
            "singleJourney": "150",
            "returnJourney": "120"
          },
          "lcv": {
            "singleJourney": "50",
            "returnJourney": "40"
          },
          "truckBus": {
            "singleJourney": "30",
            "returnJourney": "40"
          },
          "heavyVehicle": {
            "singleJourney": "150",
            "returnJourney": "260"
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
      tollsColumn: [
        {
          key: 'tollName',
          label: 'Toll Name'
        },
        {
          key: 'carJeepVan',
          label: 'Car/Jeep/Van'
        },
        {
          key: 'lcv',
          label: 'LCV'
        },
        {
          key: 'truckBus',
          label: 'Truck Bus'
        },
        {
          key: 'heavyVehicle',
          label: 'Heavy Vehicle'
        },
        {
          key: 'actions',
          label: 'Actions'
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
      vehicleColumn: [
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
  watch: {
  tollNameSearch: function(val) {
    // console.log(val);
    const tolls = JSON.parse(localStorage.getItem('tolls'));
    if (val != null && val != "") {
      this.tollsFiltered = tolls.filter(toll => (toll.tollName.toLowerCase().includes(val.toLowerCase())))
    } else this.tollsFiltered = tolls;
  },
  vehicleNumberSearch: function(val) {
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (val != null && val != "") {
      this.vehiclesFiltered = vehicles.filter(vehicle => (vehicle.vehicleNumber.toLowerCase().includes(val.toLowerCase())))
    } else this.vehiclesFiltered = vehicles;
  }
},
created() {
  // this.vehiclesFiltered = this.vehicles;
  const vehicles = JSON.stringify(this.vehicles);
  localStorage.setItem('vehicles', vehicles);
  this.vehiclesFiltered = JSON.parse(localStorage.getItem('vehicles'));

  // Toll Local Storage...
  const tolls = JSON.stringify(this.tolls);
  localStorage.setItem('tolls', tolls);
  this.tollsFiltered = JSON.parse(localStorage.getItem('tolls'));
},
methods: {
  logsToggle() {
    this.isVehicleLogs = !this.isVehicleLogs;
  },
  deleteToll(tIndex) {
    console.log(tIndex);
    this.tolls.splice(tIndex, 1);
    // Update tolls on localstorage
    const tolls = JSON.stringify(this.tolls);
    localStorage.setItem('tolls', tolls);
    this.tollsFiltered = JSON.parse(localStorage.getItem('tolls'));
  },
  vehicleModalStatus(status) {
    console.log(status);
    this.vehicleModalActive = status;
  },
  vehicleModel() {
    this.model = this.modelVehicle;
    this.vehicleModalActive = true;
  },
  deleteTollModel(tollName, tollIndex) {
    console.log(tollIndex);
    this.deleteTollName = tollName;
    this.model = tollIndex;
    this.deleteTollModalActive = true;
  },
  deleteTollModalStatus(status) {
    console.log(status);
    this.deleteTollModalActive = status;
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
    // Add new Toll...
    this.tolls.push(model);
    const tolls = JSON.stringify(this.tolls);
    localStorage.setItem('tolls', tolls);
    this.tollsFiltered = JSON.parse(localStorage.getItem('tolls'));
    // Add new Toll ends...
    this.isVehicleLogs = false;
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

    let vehicleType;
    if (model.vehicleType === 'carJeepVan') vehicleType = "Car/Jeep/Van";
    else if (model.vehicleType === 'lcv') vehicleType = "LCV";
    else if (model.vehicleType === 'truckBus') vehicleType = "Truck/Bus";
    else vehicleType = "Heavy Vehicle";

    const vehicleModel = {vehicleType: vehicleType, vehicleNumber: model.vechicleNumber.toUpperCase(), date: dateTime, tollName: model.tollName, tariff: model.tariffAmount};
    console.log(vehicleModel);

    this.vehicles.push(vehicleModel);
    const vehicles = JSON.stringify(this.vehicles);
    localStorage.setItem('vehicles', vehicles);
    this.vehiclesFiltered = JSON.parse(localStorage.getItem('vehicles'));
    // Add new vehicle ends...

    this.isVehicleLogs = true;
    this.modelVehicle = {};
    this.modelVehicleCleanUp();
  },
  modelVehicleCleanUp() {
    this.modelVehicle.tollName = null;
    this.modelVehicle.vehicleType = null;
    this.model = this.modelVehicle;
    this.$forceUpdate();
  },
  tollNameFilter(tollName) {
    // console.log(tollName);
    const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (tollName != null && tollName != "" && tollName != undefined) {
      this.vehiclesFiltered = vehicles.filter(vehicle => (vehicle.tollName.toLowerCase().includes(tollName.toLowerCase())));
      this.isFilterEnabled = true;
      this.$forceUpdate();
    } else {
      this.vehiclesFiltered = vehicles;
      this.isFilterEnabled = false;
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
  flex-wrap: wrap;
  width: 100%;
}

.flex-container > div {
  padding-right: 0px;
}

.column {
  flex: 15%;
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

.dropdown-content a:active {
  background-color: yellow;
}

.dropdown-content a::selection {
  color: red;
  background: yellow;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown:hover .dropbtn {
  background-color: #3e8e41;
}

.danger {
  color: red;
  cursor: pointer;
  padding-left: 28px;
}

.filtered {
  color: red;
}

.container {
  padding: 20px 16px;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  width: 100%;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

</style>
