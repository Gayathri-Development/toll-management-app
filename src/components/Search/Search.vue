<template>
  <div class="container">
    <div class="flex-container">
        <div class="toll-title-header">
          <label class="title-label" v-if="isVehicleLogs"><b>Vehicles Entry</b></label>
          <label class="title-label" v-else-if="!isVehicleLogs"><b>Tollgate List</b></label>
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
          <Modal id="add-vehicle" modelTitle="Add New Vehicle" modelSize="small" btnTitle="Add Vehicle Entry" :btnActionInValid="flags.invalid" @btnAction="createVehicle" @close="vehicleModalStatus($event)" :modalActive="vehicleModalActive">
            <div class="modal-content">
              <AddVehicleForm :tolls="tolls" :model="modelVehicle" :flags="flags" :vehicles="vehiclesFiltered"></AddVehicleForm>
            </div>
          </Modal>
          <button id="add-vehicle" @click="vehicleModel" type="button">Add Vehicle Entry</button>        
        </div>
        <!-- Add new toll entry -->
        <div class="toll-btn-toll-header">
          <Modal modelTitle="Add New Toll" btnTitle="Add Toll Details" @btnAction="createToll" @close="tollModalStatus($event)" :modalActive="tollModalActive" :btnActionInValid="flags.invalid">
            <div class="modal-content">
              <AddTollForm :model="entry" :flags="flags" :tolls="tolls"></AddTollForm>
            </div>
          </Modal>
          <button @click="tollModal" type="button">Add New Toll</button>
        </div> 
        <!-- View all tolls -->
        <div class="toll-btn-toll-header">
          <button v-if="isVehicleLogs" @click="viewVehicles()" type="button">View All Tolls</button>
          <button v-else-if="!isVehicleLogs" @click="viewTolls()" type="button">Back to Vehicle Logs</button>
        </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Model/Modal.vue";
import AddVehicleForm from "@/components/Forms/AddNewVehicle.vue";
import AddTollForm from "@/components/Forms/AddNewToll.vue";
export default {
  name: 'HomePage',
  components: {
    Modal,
    AddVehicleForm,
    AddTollForm
  },
  computed: {
    tolls() {
      console.table(this.$store.state.tolls);
      return this.$store.state.tolls;
    },
    vehicles() {
      console.table(this.$store.state.vehicles);
      return this.$store.state.vehicles;
    },
    vehiclesFiltered() {
      console.table(this.$store.state.vehiclesFiltered);
      return this.$store.state.vehiclesFiltered;
    },
  },
  data () {
    return {
      vehicleModalActive: false,
      tollModalActive: false,
      tollName: "",
      vehicleNumberSearch: "",
      tollNameSearch: "",
      isFilterEnabled: false,
      model: {},
      modelVehicle: {
        tollName: null,
        vehicleType: null
      },
      entry: {
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
    }
  },
  props: ['isVehicleLogs'],
  watch: {
  tollNameSearch: function(val) {
    console.log(val);
    // const tolls = JSON.parse(localStorage.getItem('tolls'));
    if (val != null && val != "") {
      this.$store.state.tollsFiltered = this.tolls.filter(toll => (toll.tollName.toLowerCase().includes(val.toLowerCase())));
    } else this.$store.state.tollsFiltered = this.tolls;
  },
  vehicleNumberSearch: function(val) {
    // const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (val != null && val != "") {
      this.$store.state.vehiclesFiltered = this.vehicles.filter(vehicle => (vehicle.vehicleNumber.toLowerCase().includes(val.toLowerCase())));
    } else this.$store.state.vehiclesFiltered = this.vehicles;
  }
},
created() {
  // const tolls = JSON.parse(localStorage.getItem('tolls'));
  this.$store.state.tollsFiltered = this.tolls;
  // const vehicles = JSON.parse(localStorage.getItem('vehicles'));
  this.$store.state.vehiclesFiltered = this.vehicles;
},
methods: {
  viewTolls() {
    this.$router.push({ path: '/' });
  },
  viewVehicles() {
    this.$router.push({ path: 'Tollgates' });
  },
  vehicleModalStatus(status) {
    console.log(status);
    this.vehicleModalActive = status;
  },
  vehicleModel() {
    this.vehicleModalActive = true;
  },
  tollModalStatus(status) {
    console.log(status);
    this.tollModalActive = status;
  },
  tollModal() {
    this.tollModalActive = true;
  },
  createToll(){
    console.log("createToll fn");

    let model = {}
    Object.assign(model, this.entry);
    
    console.log(model);
    console.log("createToll fn ends");
    
    // Add new Toll...
    // Capitalize the Toll Name first letter
    const tollName = model.tollName.toLowerCase();
    model.tollName = tollName[0].toUpperCase() + tollName.slice(1, tollName.length);

    this.tolls.push(model);
    const tolls = JSON.stringify(this.tolls);
    localStorage.setItem('tolls', tolls);
    this.$store.state.tollsFiltered = JSON.parse(localStorage.getItem('tolls'));
    // Add new Toll ends...

    console.table(this.$store.state.tollsFiltered);

    if (this.isVehicleLogs) {
      this.$router.push({ path: 'Tollgates' });
    }
    this.entry = {}
    this.modalTollCleanUp();
  },
  modalTollCleanUp() {
    this.entry = {};
    let modalToll = {};
    modalToll.tollName = "";
    modalToll.carJeepVan = {};
    modalToll.carJeepVan.vehicleType = 'carJeepVan';
    modalToll.lcv = {
      vehicleType: 'lcv'
    };
    modalToll.truckBus = {
      vehicleType: 'truckBus'
    };
    modalToll.heavyVehicle = {
      vehicleType: 'heavyVehicle'
    };
    this.entry = modalToll;
    this.$forceUpdate();
  },
  createVehicle(){
    console.log("createVehicle fn");

    let model = {}
    Object.assign(model, this.modelVehicle);

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
    this.$store.state.vehiclesFiltered = JSON.parse(localStorage.getItem('vehicles'));
    // Add new vehicle ends...

    if (!this.isVehicleLogs) {
      this.$router.push({ path: '/' });
    }

    this.modelVehicle = {};
    this.modelVehicleCleanUp();
  },
  modelVehicleCleanUp() {
    this.modelVehicle = {};
    let vehicle = {};
    vehicle.tollName = null;
    vehicle.vehicleType = null;
    this.modelVehicle = vehicle;
    this.$forceUpdate();
  },
  tollNameFilter(tollName) {
    // console.log(tollName);
    // const vehicles = JSON.parse(localStorage.getItem('vehicles'));
    if (tollName != null && tollName != "" && tollName != undefined) {
      this.$store.state.vehiclesFiltered = this.vehicles.filter(vehicle => (vehicle.tollName.toLowerCase().includes(tollName.toLowerCase())));
      this.isFilterEnabled = true;
      this.$forceUpdate();
    } else {
      this.$store.state.vehiclesFiltered = this.vehicles;
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

.title-label:after {
  content: "|";
  padding-left: 20px;
  padding-right: 0px;
  color: gray;
  font-size: 20px;
}
</style>
