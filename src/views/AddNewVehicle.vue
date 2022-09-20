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
            <select @change="tariffCalculation()" v-model="model.vehicleType" class="textBox">
                <option :value='null'>Select vehicle type</option>
                <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
            </select>
        </div>

        <div class="paddingTop">
            <label>Vechicle Number</label>
            <input v-on:change='tariffCalculation()' v-model="model.vechicleNumber" class="textBox" type="text" name="vechicleNumber" placeholder="Enter Vechicle Number">
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
    props: ['model', 'flags', 'tolls', 'vehicles'],
    created() {
        this.model.tollName = null;
        this.model.vehicleType = null;
    },
    watch: {

    },
    methods: {
        tariffCalculation() {
            console.log("Tariff Calculation")
            // Discounted Toll Rate...
            if (this.vehicles && this.vehicles.length != 0) this.vehicles.forEach((vehicle) => {
                if (vehicle.artifactType.vehicleNumber.toLowerCase() === this.model.vechicleNumber.toLowerCase() && vehicle.artifactType.tollName.toLowerCase() === model.tollName.toLowerCase()){
                    
                    // New Date Time...
                    const currentdate = new Date(); 
                    const newDateTime = currentdate.getFullYear() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getDate() + ", "  + currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                    
                    // Previous Date Time...
                    const prevDateTime = vehicle.date.split(",")[0].split("/").reverse().join("/") + ',' + vehicle.date.split(",")[1].split("/").reverse().join("/");
                    console.log(prevDateTime);
                    const diffInMilliseconds = Math.abs(new Date(prevDateTime) - new Date(newDateTime));

                    // Date/Time Difference...
                    const diffInMinutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60);
                    console.log(diffInMinutes);

                    if (diffInMinutes < 60){
                        model.tariffAmount = '';
                    }
                   

                }
                    
            });

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