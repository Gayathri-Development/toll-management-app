<template>
    <div>
        <div>
            <label class="required">Select Toll Name</label>
            <select v-model="model.tollName" class="textBox">
                <option :value='null'>Select Toll Name</option>
                <option v-for="(toll, index) in tolls" :value="toll.tollName">{{toll.tollName}}</option>
            </select>
        </div>

        <div class="paddingTop">
            <label class="required">Select Vechicle Type</label>
            <select v-on:focus="tariffCalculation(); fieldValidate()" @change="tariffCalculation()" v-on:click="tariffCalculation(); fieldValidate()" v-model="model.vehicleType" class="textBox">
                <option :value='null'>Select vehicle type</option>
                <option v-for="(vehicle, index) in vehicleTypes" :value="vehicle.value">{{vehicle.text}}</option>
            </select>
        </div>

        <div class="paddingTop">
            <label class="required">Vechicle Number</label>
            <!-- v-on:change='setVechicleNum(model.vechicleNumber); fieldValidate(); tariffCalculation()' -->
            <input @change="fieldValidate()" v-on:click="fieldValidate()" v-on:focus="tariffCalculation(); fieldValidate()" @focusout="fieldValidate(); tariffCalculation()" v-model="model.vechicleNumber" class="textBox" type="text" name="vechicleNumber" placeholder="Enter Vechicle Number">
        </div>

        <div class="paddingTop">
            <label class="required">Tariff</label>
            <input v-on:change="fieldValidate()" v-model="model.tariffAmount" disabled class="textBox disabledAccess" type="text" name="tariffAmount" placeholder="Tariff Amount">
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
        'model.tollName': function(val) {
            this.fieldValidate();
        },
        'model.vehicleType': function(val) {
            this.tariffCalculation();
            this.fieldValidate();
        },
        'model.vechicleNumber': function(val) {
            this.tariffCalculation();
            this.fieldValidate();
        }
    },
    methods: {
        fieldValidate() {
            if (this.model.tollName && this.model.tollName != '' && this.model.vehicleType && this.model.vehicleType != '' && this.model.vechicleNumber && this.model.vechicleNumber != ''){
                this.flags.invalid = false;
            }else {
                this.flags.invalid = true;
            }
        },
        tariffCalculation() {
            console.log("Tariff Calculation");
            console.log(this.model.tollName);
            console.log(this.model.vechicleNumber);
            // Discounted Toll Rate...
            let singleJourneyRate = '';
            let returnJourneyRate = '';
            //  Get singleJourney & returnJourney rate...
            if (this.tolls && this.tolls.length != 0 && this.model && this.model.tollName && this.model.tollName != '') {
                this.tolls.forEach((toll) => {
                    if (toll.tollName.toLowerCase() === this.model.tollName.toLowerCase()){
                        if (this.model.vehicleType === 'carJeepVan'){
                            singleJourneyRate = toll.carJeepVan.singleJourney;
                            returnJourneyRate = toll.carJeepVan.returnJourney;
                        }else if (this.model.vehicleType === 'lcv') {
                            singleJourneyRate = toll.lcv.singleJourney;
                            returnJourneyRate = toll.lcv.returnJourney;
                        }else if (this.model.vehicleType === 'truckBus') {
                            singleJourneyRate = toll.truckBus.singleJourney;
                            returnJourneyRate = toll.truckBus.returnJourney;
                        }else if (this.model.vehicleType === 'heavyVehicle') {
                            singleJourneyRate = toll.heavyVehicle.singleJourney;
                            returnJourneyRate = toll.heavyVehicle.returnJourney;
                        }
                    }
                });
            }
            if (this.vehicles && this.vehicles.length != 0 && this.model && this.model.vechicleNumber && this.model.vechicleNumber != '' && this.model.tollName && this.model.tollName != '') {
                
                const currentdate = new Date(); 
                const recentDate = currentdate.getDate() + "/" + (currentdate.getMonth()+1)  + "/" + currentdate.getFullYear();
                console.log(recentDate);
                const recentTime = currentdate.getHours() + ":"  + currentdate.getMinutes() + ":" + currentdate.getSeconds();
                console.log(recentTime.trim());
                const recentDateTime = recentDate.split("/").reverse().join("/") + ', ' + recentTime;
                console.log("recentDateTime => " + recentDateTime);

                // vehicle history...
                let vehicleHistory = [];
                this.vehicles.forEach((vehicle) => {
                    const existingDate = vehicle.date.split(",")[0];
                    const existingTime = vehicle.date.split(",")[1].trim();
                    const existingDateTime = existingDate.split("/").reverse().join("/") + ', ' + existingTime;
                    if (vehicle.vehicleNumber.toLowerCase() === this.model.vechicleNumber.toLowerCase() && vehicle.tollName.toLowerCase() === this.model.tollName.toLowerCase() && existingDate === recentDate){
                        vehicleHistory.push({dateTime: existingDateTime, vehicleNumber: vehicle.vehicleNumber, tollgateName: vehicle.tollName});
                    }   
                });
                console.table(vehicleHistory);
                /* 
                    1 round trip = single(starting) journey + return journey
                    Ex. 4 trips is equvalent to 2 round trip.
                */
                const totalTrips = vehicleHistory.length;
                if (totalTrips == 0){
                    console.log("Vehicle not exist in today's date -> " + singleJourneyRate);
                    this.model.tariffAmount = singleJourneyRate;
                    this.$forceUpdate();
                    this.fieldValidate();
                }else if (totalTrips % 2 == 0) {
                    console.log("Round tripe completed - Reset tripe -> " + singleJourneyRate);
                    this.model.tariffAmount = singleJourneyRate;
                    this.$forceUpdate();
                    this.fieldValidate();
                } else {
                    // Calculate Time difference...
                    const diffInMilliseconds = Math.abs(new Date(recentDateTime) - new Date(vehicleHistory[totalTrips - 1].dateTime));

                    // Date/Time Difference...
                    const diffInMinutes = Math.floor((diffInMilliseconds / (1000 * 60)) % 60);
                    console.log("Time Difference in Minutes => " + diffInMinutes);

                    if (diffInMinutes < 60) {
                        console.log("Within 1 hrs -> " + returnJourneyRate);
                        this.model.tariffAmount = returnJourneyRate;
                        this.$forceUpdate();
                        this.fieldValidate();
                    } else {
                        console.log("Within 1 hrs else -> " + singleJourneyRate);
                        this.model.tariffAmount = singleJourneyRate;
                        this.$forceUpdate();
                        this.fieldValidate();
                    }
                }
            } else {
                console.log("No vehicle ele -> " + singleJourneyRate);
                this.model.tariffAmount = singleJourneyRate;
                this.$forceUpdate();
                this.fieldValidate();
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
.paddingDiv {
    padding-right: 25px;
    padding-left: 25px;
}
.paddingTop {
    padding-top: 18px;
}

</style>