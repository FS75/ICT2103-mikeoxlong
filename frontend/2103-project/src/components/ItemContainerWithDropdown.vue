<template>
    <div  class="itemContainerWithDropdown" :style=" { width: givenWidth }">
        <header>{{ text }}</header>
        <select :id=givenId @change="onChange($event)">
            <option selected disabled>Choose a {{ text }}</option>

            <!-- bus services -->
            <option v-if="text == 'Bus Service'" 
                    v-for="bus in busServices">
                {{ bus.ServiceNo + " [address] "}}
            </option>

            <!-- starting / destination bus stops -->
            <!-- direction is either 1 or 2 -->
            <!-- first we must determine if the bus service's routes have 1 direction or 2 direction -->
            <!-- if 1 direction, just show all the routes on destination bus stop -->
            <!-- if 2 direction, show all routes with the direction of the inputted route from starting bus stop -->
            <option v-if="text == 'Starting Bus Stop'"
                    v-for="route in busRoutes"
>
                    <h3>{{ route.StopSequence + " - " + route.Description + " - " + route.RoadName + " (" + route.BusStopCode + ")"}}</h3>
                
            </option>

            <!-- destination bus stops -->
            <!-- if only 1 direction, show all -->
            <option v-if="text == 'Destination Bus Stop'"
                    v-for="route in busRoutes2">
                    
                    <h3>{{ route.StopSequence + " - " + route.Description + " - " + route.RoadName + " (" + route.BusStopCode + ")"}}</h3>
                <!-- <h3 v-if="this.startingDirection == 1 && route.Direction == 1">
                    {{ route.Description + " - " + route.RoadName + " (" + route.BusStopCode + ")" }}
                </h3>

                <h3 v-else-if="this.startingDirection == 2 && route.Direction == 2">
                    {{ route.Description + " - " + route.RoadName + " (" + route.BusStopCode + ")" }}
                </h3> -->
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
            busRoutes2: Object,
            startingBusStop: String,
            DestinationBusStop: String,
        },
        data() {
            return {
                startingDistance: 0,
                destinationDistance: 0,
                startingDirection: 0,
                startingSequence: 0,
                destinationDirection: 0,
                forceKey: 0,
            }
        },
        methods: {
            async onChange(event) {
                if (this.text == "Bus Service") {
                    var busServiceIndex = event.target.value.indexOf("[");

                    var busService = "";

                    for (let i = 0; i < busServiceIndex; i++)
                        busService = busService.concat(event.target.value[i]);
                    
                    //console.log(busService)

                    // console.log("User selected bus service: " + event.target.value);

                    this.$parent.data.busRoutes = await axios.get(store.BACKEND_API_URL + 
                        "bus-stops?busService="+busService+"");

                    // this.$parent.data.busRoutes2 = this.$parent.data.busRoutes;

                    //  console.log("Parent1:"+JSON.stringify(this.$parent.data.busRoutes))
                    // console.log("Parent2:"+JSON.stringify(this.$parent.data.busRoutes2))
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

                    //console.log(busStopCode);
                    // console.log("hello " + this.$parent.data.busRoutes)

                    for (let i = 0; i < this.busRoutes.length; i++) {
                        if (this.busRoutes[i].BusStopCode == startingBusStopCode) {
                            this.startingDistance = parseFloat(this.busRoutes[i].Distance);
                            this.startingDirection = parseFloat(this.busRoutes[i].Direction);
                            this.startingSequence = parseFloat(this.busRoutes[i].StopSequence);
                            break;
                        }
                    }

                    console.log("Start dist: " + this.startingDistance);
                    console.log("Start dir: " + this.startingDirection);
                    console.log("Start seq: " + this.startingSequence);

                    var testCount = 0;
                    let test = {}
                    for (let i = 0; i < this.busRoutes.length; i++){
                        if(this.busRoutes[i].Direction == this.startingDirection && this.busRoutes[i].StopSequence > this.startingSequence){
                            //console.log(this.busRoutes[i]);
                            //busRoutes2.push(this.busRoutes[i]);
                            test[testCount] = this.busRoutes[i];
                            testCount++;
                            //console.log(this.busRoutes[i].StopSequence + " - " + this.busRoutes[i].Description + " - " + this.busRoutes[i].RoadName + " ("+this.busRoutes[i].BusStopCode+")");
                        }
                    }
                    // for (let i = 0; i < testCount; i++){
                    //     console.log(test[i].StopSequence + " - " + test[i].Description + " - " + test[i].RoadName + " ("+test[i].BusStopCode+")");
                    // }
                    
                    this.$parent.data.busRoutes2 = test;
                    this.busRoutes2 = test;
                    //console.log("Parent2:"+JSON.stringify(this.$parent.data.busRoutes2))
                    console.log("Parent1:"+JSON.stringify(this.busRoutes))
                    console.log("Parent2:"+JSON.stringify(this.busRoutes2))

                    this.forceRender();
                }

                if (this.text == "Destination Bus Stop") {
                    // pull distance from destination bus stop
                    var destinationBusStopCode = ""

                    // because JS dosent have negative indexing lol
                    for (let i = -6; i < -1; i++)
                        destinationBusStopCode = destinationBusStopCode.concat(event.target.value[event.target.value.length + i]);

                    for (let i = 0; i < this.busRoutes.length; i++) {
                        if (this.busRoutes[i].BusStopCode == destinationBusStopCode) {
                            this.destinationDistance = parseFloat(this.busRoutes[i].Distance);
                            this.destinationDirection = parseFloat(this.busRoutes[i].Direction);
                            break;
                        }
                    }

                    console.log("Dest dist: " + this.destinationDistance);
                    console.log("Dest dir: " + this.destinationDirection);
                }
            },
            forceRender() {
                this.forceKey += 1;
                this.$forceUpdate();
                console.log("Force rendered");
            }
        },
        // computed: {
        // // a computed getter
        //     getStartingDirection() {
        //     // `this` points to the component instance
        //         return this.startingDirection;
        //     }
        // },
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