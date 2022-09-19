<template>
    <div>
        <div>
            <label>Toll Name</label>
            <input v-model="model.tollName" class="textBox" type="text" name="tollName" placeholder="Enter toll name">
        </div>
        <!-- Vechicle fare details -->
        <div class="detailsPadding">
            <label>Vechicle fare details</label>
            
            <!-- Vechicle entry - 1 -->
            <div class="flex-container">
                <div class="column">
                    <select disabled v-model="model.carJeepVan.vehicleType" class="textBox" id="vehicleType" name="vehicleType">
                        <option value="">Select vehicle type</option>
                        <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
                    </select>
                </div>
                <div class="textPadding column">
                    <input v-model="model.carJeepVan.singleJourney" class="textBox" type="text" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.carJeepVan.returnJourney" class="textBox" type="text" name="returnJourney" placeholder="Return Journey">
                </div>
            </div>

            <!-- Vechicle entry - 2 -->
            <div class="flex-container">
                <div class="column">
                    <select disabled v-model="model.lcv.vehicleType" class="textBox" id="vehicleType" name="vehicleType">
                        <option value="">Select vehicle type</option>
                        <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
                    </select>
                </div>
                <div class="textPadding column">
                    <input v-model="model.lcv.singleJourney" class="textBox" type="text" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.lcv.returnJourney" class="textBox" type="text" name="returnJourney" placeholder="Return Journey">
                </div>
            </div>

            <!-- Vechicle entry - 3 -->
            <div class="flex-container">
                <div class="column">
                    <select disabled v-model="model.truckBus.vehicleType" class="textBox" id="vehicleType" name="vehicleType">
                        <option value="">Select vehicle type</option>
                        <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
                    </select>
                </div>
                <div class="textPadding column">
                    <input v-model="model.truckBus.singleJourney" class="textBox" type="text" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.truckBus.returnJourney" class="textBox" type="text" name="returnJourney" placeholder="Return Journey">
                </div>
            </div>

            <!-- Vechicle entry - 4 -->
            <div class="flex-container">
                <div class="column">
                    <select disabled v-model="model.heavyVehicle.vehicleType" class="textBox" id="vehicleType" name="vehicleType">
                        <option value="">Select vehicle type</option>
                        <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
                    </select>
                </div>
                <div class="textPadding column">
                    <input v-model="model.heavyVehicle.singleJourney" class="textBox" type="text" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.heavyVehicle.returnJourney" class="textBox" type="text" name="returnJourney" placeholder="Return Journey">
                </div>
            </div>
            
        </div>
    </div>
</template>
<script>
export default {
    name: 'AddToll',
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
        this.model.carJeepVan = {
            vehicleType: 'carJeepVan'
        };
        this.model.lcv = {
            vehicleType: 'lcv'
        };
        this.model.truckBus = {
            vehicleType: 'truckBus'
        };
        this.model.heavyVehicle = {
            vehicleType: 'heavyVehicle'
        };
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
.detailsPadding {
    padding-top: 20px;
}
</style>