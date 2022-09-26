<template>
  <div class="container">
    <table>
      <thead>
        <tr>
          <th v-for="(column, labelIndex) in columns" :key="labelIndex">
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, itemIndex) in rows" :key="itemIndex">
            <td v-for="(column, labelIndex) in columns" :key="labelIndex">
                <!-- {{ item[column.key] }} -->
                <slot name="tb-row" :row="item" :rowIndex="itemIndex" :column="column"></slot> 
            </td>
        </tr>
      </tbody>
    </table>
    <span class="alert" v-if="!rows || (rows && rows.length == 0)">
      <Alert alertType="info" :isDismissable='false' :message="'No ' + resourceType + ' Found!'"></Alert>
    </span>
  </div>
</template>

<script>
import Alert from "@/components/Alerts/Alert.vue";
export default {
  name: 'TableComponent',
  components: {
    Alert
  },
  props: ['rows', 'columns', 'resourceType'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

table {
  border-collapse: collapse;
  width: 100%;
}

tr:hover {
    background-color: ghostwhite;
    cursor: pointer;
}

table tr {
    border-bottom: 1px solid #f2f2f2;
}​

tr:first-child {
  border-top: none;
}
tr:last-child {
  border-bottom: none;
}

th, td {
  text-align: left;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
  color: black;
  text-transform: uppercase;
  /* font-weight: normal; */
  font-family: Arial, Helvetica, sans-serif;
  font-size: 80%;
}
.alert {
  padding: 2px 2px 2px 2px;
  width: 97%;
}
</style>
