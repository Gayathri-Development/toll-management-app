<template>
    <div>
        <div>
            <label>Select Toll Name</label>
            <select v-model="model.tollName" class="textBox">
                <option :value='null'>Select Toll Name</option>
                <option v-for="(toll, index) in tolls" :value="toll.tollName">{{toll.tollName}}</option>
            </select>
        </div>

        <div class="paddingTop">
            <label>Select Vechicle Type</label>
            <select v-model="model.vehicleType" class="textBox">
                <option :value='null'>Select vehicle type</option>
                <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
            </select>
        </div>

        <div class="paddingTop">
            <label>Vechicle Number</label>
            <input v-model="model.vechicleNumber" class="textBox" type="text" name="vechicleNumber" placeholder="Enter Vechicle Number">
        </div>

        <div class="paddingTop">
            <label>Tariff</label>
            <input v-model="model.tariffAmount" disabled class="textBox disabledAccess" type="text" name="tariffAmount" placeholder="Tariff Amount">
        </div>

    </div>
</template>
<script>
export default {
    name: 'AddVehicle',
    data() {
        return {
            vehicleTypes: [
                {
                    value: "carJeepVan",
                    text: "Car/Jeep/Van"
                },
                {
                    value: "lcv",
                    text: "LCV"
                },
                {
                    value: "truckBus",
                    text: "Truck/Bus"
                },
                {
                    value: "heavyVehicle",
                    text: "Heavy Vehicle"
                }
            ]
        }
    },
    props: ['model', 'flags', 'tolls'],
    created() {
        this.model.tollName = null;
        this.model.vehicleType = null;
    },
    watch: {

    },
    methods: {

    }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.textPadding {
    padding-left: 20px;
}
.column {
  flex: 20%;
}
.paddingDiv {
    padding-right: 25px;
    padding-left: 25px;
}
.paddingTop {
    padding-top: 18px;
}
.disabledAccess {
    cursor: not-allowed;
}
</style>