<template>
  <div class="container">
    <div class="flex-container">
      
      <div class="card">  
        <!-- Tolls log -->
        <TableComponent :rows="tollsFiltered" :columns="tollsColumn" resourceType="Tolls">
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
            </span>
          </template>
        </TableComponent>
      </div>

        <!-- Toll delete model -->
        <Modal id="add-vehicle" modelTitle="Delete Toll" modelSize="small" btnTitle="Delete" @btnAction="deleteToll($event)" :btnActionInValid="flags.invalid" @close="deleteTollModalStatus($event)" :modalActive="deleteTollModalActive">
          <div class="modal-content">
            <DeleteTollForm :model="entry" :tollIndex="deleteTollIndex" :tollName="deleteTollName" :flags="flags"></DeleteTollForm>
          </div>
        </Modal>

  </div>
</div>
</template>

<script>
import Modal from "@/components/Model/Modal.vue";
import TableComponent from '@/components/Table/TableComponent.vue'
import DeleteTollForm from "@/components/Forms/DeleteToll.vue";
export default {
  name: 'HomePage',
  components: {
    TableComponent,
    Modal,
    DeleteTollForm
  },
  computed: {
    tollsFiltered() {
      console.table(this.$store.state.tollsFiltered);
      return this.$store.state.tollsFiltered;
    },
    tolls() {
      console.table(this.$store.state.tolls);
      return this.$store.state.tolls;
    },
  },
  data () {
    return {
      flags: {
        invalid: true
      },
      entry: {
        tollName: ''
      },
      deleteTollName: '',
      deleteTollIndex: '',
      deleteTollModalActive: false,
      isVehicleLogs: true,
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
    }
  },
  created() {},
  methods: {
    deleteTollModel(tollName, tIndex) {
      // console.log(tIndex);
      this.deleteTollName = tollName;
      this.deleteTollIndex = tIndex;
      console.log('this.tIndex ==> ' + this.deleteTollIndex);
      this.deleteTollModalActive = true;
    },
    deleteTollModalStatus(status) {
      console.log(status);
      this.deleteTollModalActive = status;
    },
    deleteToll() {
      let entry = {};
      Object.assign(entry, this.entry);
      
      this.tolls.splice(entry.tollIndex, 1);
      // Update tolls on localstorage
      const tolls = JSON.stringify(this.tolls);
      localStorage.setItem('tolls', tolls);
      this.$store.state.tollsFiltered = JSON.parse(localStorage.getItem('tolls'));

      let deleteToll = {
        tollName: ''
      };
      this.entry = deleteToll;
      this.$forceUpdate();

    },
  }
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
