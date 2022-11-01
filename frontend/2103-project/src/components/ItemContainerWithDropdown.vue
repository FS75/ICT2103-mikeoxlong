<template>
    <div  class="itemContainerWithDropdown" :style=" { width: givenWidth }">
        <header>{{ text }}</header>
        <select :id=givenId @change="onChange($event)">
            <option selected disabled>Choose a {{ text }}</option>

            <!-- bus services -->
            <option v-if="text == 'Bus Service'" 
                    v-for="bus in busServices">
                {{ bus.ServiceNo }}
            </option>

            <!-- starting / destination bus stops -->
            <!-- direction is either 1 or 2 -->
            <!-- first we must determine if the bus service's routes have 1 direction or 2 direction -->
            <!-- if 1 direction, just show all the routes on destination bus stop -->
            <!-- if 2 direction, show all routes with the direction of the inputted route from starting bus stop -->
            <option v-if="text == 'Starting Bus Stop'"
                    v-for="route in busRoutes">
                    <h3>{{ route.Description + " - " + route.RoadName + " (" + route.BusStopCode + ")"}}</h3>
            </option>

            <!-- destination bus stops -->
            <!-- if only 1 direction, show all -->
            <option v-if="text == 'Destination Bus Stop'"
                    v-for="route in busRoutes">
                {{ route.Description + " - " + route.RoadName + " (" + route.BusStopCode + ")" }}
            </option> 
        </select>
    </div>
    
</template>

<script>
    import axios from "axios"
    import { store } from "../main.js"
    export default {
        name: "ItemContainerTable",
        components: {

        },
        props: {
            text: String,
            givenId: String,
            givenWidth: String,
            busServices: Object,
            busRoutes: Object,
            startingBusStop: String,
            DestinationBusStop: String,
        },
        data() {
            return {
                selection: 0,
                startingDistance: 0,
                destinationDistance: 0,
                startingDirection: 0,
                destinationDirection: 0,
                length: 0,
                distanceDiff: 0
            }
        },
        methods: {
            async onChange(event) {
                if (this.text == "Bus Service") {

                    var busService = event.target.value;
                    
                    //console.log(busService)

                    console.log("User selected bus service: " + event.target.value);

                    this.$parent.busRoutes = await axios.get(store.BACKEND_API_URL + 
                        "bus-stops?busService="+busService+"");

                    this.$parent.resetStartDestBusStop();

                    console.log(this.$parent.busRoutes);
                }

                if (this.text == "Starting Bus Stop") {
                    // pull distance from starting bus stop
                    // i have the route bus stop code (get from event)
                    // now i need to iterate busRoutes and find the distance
                    // repeat this for destination side
                    // get difference for distance between stops

                    var startingBusStopCode = ""
                    

                    // because JS dosent have negative indexing lol
                    for (let i = -6; i < -1; i++)
                        startingBusStopCode = startingBusStopCode.concat(event.target.value[event.target.value.length + i]);

                    if (startingBusStopCode[0] == "(") {
                        startingBusStopCode = startingBusStopCode.slice(1)
                    }
                    // find starting bus stop direction
                    for (let i = 0; i < this.busRoutes.length; i++) {
                        if (this.busRoutes[i].BusStopCode == startingBusStopCode) {
                            this.selection = i + 1;
                            this.startingDistance = parseFloat(this.busRoutes[i].Distance);
                            this.startingDirection = parseFloat(this.busRoutes[i].Direction);
                            break;
                        }
                    }
                    // to get length/amount of bus stops for the direction selected
                    for (let i = 0; i < this.busRoutes.length; i++) {
                        if (this.busRoutes[i].Direction == 2) {
                            this.length = i
                            break;
                        }
                        else {
                            this.length = this.busRoutes.length
                        }
                    }
                    // console.log(this.busRoutes)
                    // console.log(this.selection)
                    // console.log(startingBusStopCode[0])

                    //slice array in accordance to only direction 1 or 2, pass to parent to update v-for looping array
                    if (this.startingDirection == 1)
                        this.$parent.busDest = this.busRoutes.slice(this.selection, this.length);
                    else if (this.startingDirection == 2)
                        this.$parent.busDest = this.busRoutes.slice(this.selection, this.busRoutes.length);
                        
                    this.$parent.startingDistance = this.startingDistance;
                    // console.log(this.$parent.busDest);
                    // console.log("Start dist: " + this.startingDistance);

                    console.log("starting bus stop code: " + startingBusStopCode);

                }
                // i think here is put after user selected their dest, display appropiate info or call relevant stuff
                if (this.text == "Destination Bus Stop") {
                    // reset concat string
                    this.$parent.distanceDiff = ""

                    // pull distance from destination bus stop
                    var destinationBusStopCode = ""

                    // because JS dosent have negative indexing lol
                    for (let i = -6; i < -1; i++)
                        destinationBusStopCode = destinationBusStopCode.concat(event.target.value[event.target.value.length + i]);

                    if (destinationBusStopCode[0] == "(") 
                        destinationBusStopCode = destinationBusStopCode.slice(1);

                    console.log("destination bus stop code: " + destinationBusStopCode);
                    for (let i = 0; i < this.busRoutes.length; i++) {
                        if (this.busRoutes[i].BusStopCode == destinationBusStopCode) {
                            this.destinationDistance = parseFloat(this.busRoutes[i].Distance);
                            this.destinationDirection = parseFloat(this.busRoutes[i].Direction);
                            break;
                        }
                    }
                    // have to pass to parent cause startingDistance in child gets reset to 0 when Destination dropdown value get change(/get selected value)
                    this.$parent.destinationDistance = this.destinationDistance;
                    this.$parent.getDistanceDiff();
                    
                    // console.log("Dest dist: " + this.destinationDistance);
                    // console.log("Dest diff: " + this.distanceDiff);
                    // console.log("Start dist: " + this.startingDistance);
                }
            },
        },
    }
</script>

<style scoped>
    .itemContainerWithDropdown {
        margin: 10px;
        margin-top: 30px;
        width: 300px;
        height: 300px;
        background-color: lightgrey;
        border: 2px solid grey;
        border-radius: 10%;
    }
</style>