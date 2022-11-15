<template>
  <div class="columnContainer overviewContainer">
    <div class="rowContainer">
      <ItemContainerWithDropdown givenId="busServiceContainer"
        text="Bus Service" :busServices=this.busServices.data></ItemContainerWithDropdown>
      <!-- <ItemContainerWithDropdown givenId="busDirectionContainer" 
        text="Direction"></ItemContainerWithDropdown> -->
    </div>

    <div class="rowContainer">
      <ItemContainerWithDropdown givenId="busStartingContainer" givenWidth="400px"
        text="Starting Bus Stop" :busRoutes=this.busRoutes.data></ItemContainerWithDropdown>
      <ItemContainerWithDropdown givenId="busDestinationContainer" givenWidth="400px"
        text="Destination Bus Stop" :busRoutes=this.busDest></ItemContainerWithDropdown>
    </div>
    
    <hr>

    <div class="columnContainer resultContainer">
      <div class="rowContainer importantInfoContainer">
        <ResultContainer headerText="Distance from Start to Destination" :value=this.distanceDiff></ResultContainer>
      </div>
<!-- 
      <div class="rowContainer importantInfoContainer">
        <ResultContainer headerText="AM Peak Frequency" value="1 - 3 min"></ResultContainer>
        <ResultContainer headerText="AM Offpeak Frequency" value="1 - 5 min"></ResultContainer>
      </div>

      <div class="rowContainer importantInfoContainer">
        <ResultContainer headerText="PM Peak Frequency" value="1 - 3 min"></ResultContainer>
        <ResultContainer headerText="PM Offpeak Frequency" value="1 - 5 min"></ResultContainer>
      </div> -->

      <hr>
      
      <div class="columnContainer busTimingContainer">
        <div class="rowContainer">
          <ResultContainer headerText="Weekday First Bus Timing" value="05:00"></ResultContainer>
          <ResultContainer headerText="Weekday Last Bus Timing" value="23:00"></ResultContainer>
        </div>

        <div class="rowContainer">
          <ResultContainer headerText="Saturday First Bus Timing" value="05:00"></ResultContainer>
          <ResultContainer headerText="Saturday Last Bus Timing" value="23:00"></ResultContainer>
        </div>

        <div class="rowContainer">
          <ResultContainer headerText="Sunday First Bus Timing" value="05:00"></ResultContainer>
          <ResultContainer headerText="Sunday Last Bus Timing" value="23:00"></ResultContainer>
        </div>
      </div>

      <hr>

    </div>
  </div>

  <br>
</template>

<script>
  import axios from "axios"
  import { store } from "../main.js"
  import ItemContainerWithDropdown from "../components/ItemContainerWithDropdown.vue"
  import ResultContainer from "../components/ResultContainer.vue"

  export default {
    name: "HomeView",
    props: {

    },
    components: {
      ItemContainerWithDropdown,
      ResultContainer,
    },
    data() {
        return {
          width: "250px",
          busServices: {},
          busRoutes: {},
          busDest: {},
          distanceDiff: "",
          startingDistance: 0,
          destinationDistance: 0,
          store,
          buttonWasClicked: false,
        }
    },
    async mounted() {
      this.busServices = await axios.get(store.BACKEND_API_URL + "bus-services");
    },
    methods: {
      resetStartDestBusStop() {
        var StartdropDown = document.getElementById("busStartingContainer");
        StartdropDown.selectedIndex = 0;
        var DestdropDown = document.getElementById("busDestinationContainer");
        DestdropDown.selectedIndex = 0;
        this.busDest = {};
        },
        getDistanceDiff() {
            var Difference = this.destinationDistance - this.startingDistance;
            let Difference2DP = Difference.toFixed(2);
            this.distanceDiff = this.distanceDiff.concat(Difference2DP + " km");
            console.log("Concat Diff: " + this.distanceDiff);
      }
    },
    watch: {
      busRoutes() {

      }
    }
  }
</script>

<style scoped>
  .busTimingContainer{
    flex-wrap: wrap;
  }

  hr{
    width: 800px;
    margin: 20px;
  }
</style>

