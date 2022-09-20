<template>
    <div>
        <div>
            <label class="required">Toll Name</label>
            <input v-model="model.tollName" class="textBox" type="text" name="tollName" placeholder="Enter toll name">
        </div>
        <!-- Vechicle fare details -->
        <div class="detailsPadding">
            <label class="required">Vechicle fare details</label>
            
            <!-- Vechicle entry - 1 -->
            <div class="flex-container">
                <div class="column">
                    <select disabled v-model="model.carJeepVan.vehicleType" class="textBox" id="vehicleType" name="vehicleType">
                        <option value="">Select vehicle type</option>
                        <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
                    </select>
                </div>
                <div class="textPadding column">
                    <input type="number" min="1" v-model="model.carJeepVan.singleJourney" class="textBox" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.carJeepVan.returnJourney" class="textBox" type="number" min="1" name="returnJourney" placeholder="Return Journey">
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
                    <input v-model="model.lcv.singleJourney" class="textBox" type="number" min="1" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.lcv.returnJourney" class="textBox" type="number" min="1" name="returnJourney" placeholder="Return Journey">
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
                    <input v-model="model.truckBus.singleJourney" class="textBox" type="number" min="1" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.truckBus.returnJourney" class="textBox" type="number" min="1" name="returnJourney" placeholder="Return Journey">
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
                    <input v-model="model.heavyVehicle.singleJourney" class="textBox" type="number" min="1" name="singleJourney" placeholder="Single Journey">
                </div>
                <div class="textPadding column">
                    <input v-model="model.heavyVehicle.returnJourney" class="textBox" type="number" min="1" name="returnJourney" placeholder="Return Journey">
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
        'model.tollName': function(val) {
            this.fieldValidate();
        },
        'model.carJeepVan.singleJourney': function(val) {
            this.fieldValidate();
        },
        'model.carJeepVan.returnJourney': function(val) {
            this.fieldValidate();
        },
        'model.lcv.singleJourney': function(val) {
            this.fieldValidate();
        },
        'model.lcv.returnJourney': function(val) {
            this.fieldValidate();
        },
        'model.truckBus.singleJourney': function(val) {
            this.fieldValidate();
        },
        'model.truckBus.returnJourney': function(val) {
            this.fieldValidate();
        },
        'model.heavyVehicle.singleJourney': function(val) {
            this.fieldValidate();
        },
        'model.heavyVehicle.returnJourney': function(val) {
            this.fieldValidate();
        }
    },
    methods: {
        fieldValidate() {
            if (this.model.tollName && this.model.tollName != '' && this.model.carJeepVan && this.model.carJeepVan.singleJourney && this.model.carJeepVan.singleJourney != '' && this.model.carJeepVan.returnJourney && this.model.carJeepVan.returnJourney != '' && this.model.lcv && this.model.lcv.singleJourney && this.model.lcv.singleJourney != '' && this.model.truckBus && this.model.truckBus.singleJourney && this.model.truckBus.singleJourney != '' && this.model.truckBus.returnJourney && this.model.truckBus.returnJourney != '' && this.model.heavyVehicle && this.model.heavyVehicle.singleJourney && this.model.heavyVehicle.singleJourney != '' && this.model.heavyVehicle.returnJourney && this.model.heavyVehicle.returnJourney != ''){
                this.flags.invalid = false;
            } else {
                this.flags.invalid = true;
            }
        }
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