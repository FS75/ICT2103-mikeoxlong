<template>
  <div class="columnContainer overviewContainer">
    <div class="rowContainer">
      <button @click="sendData">
        send data
      </button>
      <button v-if="buttonWasClicked">
        {{ store.query }}
      </button>
    </div>

    <div class="rowContainer">
      <ItemContainerWithDropdown givenId="busServiceContainer" 
        text="Bus Service"></ItemContainerWithDropdown>
      <ItemContainerWithDropdown givenId="busDirectionContainer" 
        text="Direction"></ItemContainerWithDropdown>
    </div>

    <div class="rowContainer">
      <ItemContainerWithDropdown givenId="busStartingContainer" 
        text="Starting Bus Stop"></ItemContainerWithDropdown>
      <ItemContainerWithDropdown givenId="busDestinationContainer" 
        text="Destination Bus Stop"></ItemContainerWithDropdown>
    </div>
    
    <hr>

    <div class="columnContainer resultContainer">
      <div class="rowContainer importantInfoContainer">
        <ResultContainer headerText="Distance from Start to Destination" value="0 km"></ResultContainer>
      </div>

      <div class="rowContainer importantInfoContainer">
        <ResultContainer headerText="AM Peak Frequency" value="1 - 3 min"></ResultContainer>
        <ResultContainer headerText="AM Offpeak Frequency" value="1 - 5 min"></ResultContainer>
      </div>

      <div class="rowContainer importantInfoContainer">
        <ResultContainer headerText="PM Peak Frequency" value="1 - 3 min"></ResultContainer>
        <ResultContainer headerText="PM Offpeak Frequency" value="1 - 5 min"></ResultContainer>
      </div>

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
          data: {},
          store,
          buttonWasClicked: false,
        }
    },
    methods: {
      // method to get data from backend
      getData() {
        // this.data = await axios.get("http://localhost:3000/");
        // store.query = this.data.data.message;
      },
      // method to send data to backend
      sendData() {
        this.buttonWasClicked = true;

        axios.post("http://localhost:3000/", { 
          query: "SELECT BusStopCode,RoadName,Description FROM bus_stop WHERE RoadName LIKE '%%' OR Description LIKE '%%'"
        }).then(response => {
          console.log(response);
        })
      },
    }
  }
</script>

<style scoped>
  .overviewContainer {
    margin: auto;
    max-width: 1000px;
    min-height: 1000px;
    background-color: white;
    border-radius: 2%;
  }

  .busTimingContainer{
    flex-wrap: wrap;
  }

  hr{
    width: 800px;
    margin: 20px;
  }
</style>

