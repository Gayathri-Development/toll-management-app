<template>
  <div class="container">
    <div class="flex-container">
      <div class="card">
          <!-- Vehicles log -->
          <TableComponent :rows="vehiclesFiltered" :columns="vehicleColumn" resourceType="Vehicles">
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
        </div>
     </div>
  </div>
</template>

<script>
import TableComponent from '@/components/Table/TableComponent.vue'
export default {
  name: 'HomePage',
  components: {
    TableComponent
  },
  computed: {
    vehiclesFiltered() {
      console.table(this.$store.state.vehiclesFiltered);
      return this.$store.state.vehiclesFiltered;
    },
  },
  data () {
    return {
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
