<template>
  <b-container class="bv-example-row">
    <b-row class="mt-5">
      <b-col cols="4">
        <div class="mb-3"><u>Add Bus Service</u></div>

        <b-form-input v-model="inputtedServiceNo" placeholder="Enter bus service no" type="text" 
          v-b-tooltip.hover="'Eg. 999 or 999A'"></b-form-input>
        <Header text="Select Desired Operator:"></Header>
        <b-form-select class="mb-2" v-model="inputtedOperator" :options="store.operators" text-field="name"></b-form-select>
        <Header text="Select Desired Category:"></Header>
        <b-form-select class="mb-2" v-model="inputtedCategory" :options="store.category" text-field="name"></b-form-select>

        <b-button class="w-50" @click="addBusService(inputtedServiceNo, inputtedOperator, inputtedCategory)">
          Add Bus Service
        </b-button>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Add Bus Stop</u></div>

        <b-form-input v-b-tooltip.hover="'Eg. 99999'" v-model="inputtedBusStopCode" placeholder="Enter bus stop code" type="number"></b-form-input>
        <b-form-input v-b-tooltip.hover="'Eg. SIT Rd'" v-model="inputtedRoadName" placeholder="Enter road name of bus stop" type="text"></b-form-input>
        <b-form-input v-b-tooltip.hover="'Eg. SIT @ NYP'" v-model="inputtedDescription" placeholder="Enter location description of bus stop" type="text"></b-form-input>
        <b-form-input v-b-tooltip.hover="'Eg. 1.3774'" v-model="inputtedLatitude" placeholder="Enter latitude of bus stop" type="text"></b-form-input>
        <b-form-input v-b-tooltip.hover="'Eg. 103.8488'" v-model="inputtedLongitude" placeholder="Enter longitude of bus stop" type="text"></b-form-input>

        <b-button class="w-50" @click="addBusStop(inputtedBusStopCode, inputtedRoadName, inputtedDescription, 
          inputtedLatitude, inputtedLongitude)">
          Add Bus Stop
        </b-button>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Add MRT Station</u></div>

        <b-form-input v-b-tooltip.hover="'Eg. SIT1 or SIT9'" v-model="inputtedStnCode" placeholder="Enter station code" type="text"></b-form-input>
        <b-form-input v-b-tooltip.hover="'Eg. SIT Station'" v-model="inputtedMRTStation" placeholder="Enter name of MRT station" type="text"></b-form-input>
        <b-form-input v-b-tooltip.hover="'Eg. 1.3774'" v-model="inputtedLatitude2" placeholder="Enter latitude of MRT Station" type="text"></b-form-input>
        <b-form-input v-b-tooltip.hover="'Eg. 103.8488'" v-model="inputtedLongitude2" placeholder="Enter longitude of MRT Station" type="text"></b-form-input>
        <Header text="Select MRT Line:"></Header>
        <b-form-select v-model="inputtedMRTLine" :options="store.mrtLines.data" text-field="MRTLine"></b-form-select>

        <b-button class="w-50" @click="addMRTStation(inputtedStnCode, inputtedMRTStation, inputtedMRTLine, 
          inputtedLatitude2, inputtedLongitude2)">
          Add MRT Station
        </b-button>
      </b-col>
    </b-row>


    <b-row class="mt-5">
      <b-col cols="4">
        <div class="mb-3"><u>Update Bus Service Operator</u></div>

        <Header text="Select Service No:"></Header>
        <b-form-select v-model="selectedServiceNo" :options="store.busServices.data" text-field="ServiceNo"></b-form-select>
        
        <Header text="Select Desired Operator:"></Header>
        <b-form-select class="mb-2" v-model="desiredOperator" :options="store.operators" text-field="name"></b-form-select>

        <b-button class="w-50" @click="updateOperator(selectedServiceNo, desiredOperator)">
          Update Operator
        </b-button>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Update Bus Service Category</u></div>

        <Header text="Select Service No:"></Header>
        <b-form-select v-model="selectedServiceNo2" :options="store.busServices.data" text-field="ServiceNo"></b-form-select>
        
        <Header text="Select Desired Operator:"></Header>
        <b-form-select class="mb-2" v-model="desiredCategory" :options="store.category" text-field="name"></b-form-select>

        <b-button class="w-50" @click="updateCategory(selectedServiceNo2, desiredCategory)">
          Update Category
        </b-button>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Update First Bus Timing</u></div>

        <Header text="Select Service No:"></Header>
        <b-form-select v-model="selectedServiceNo4" :options="store.busServices.data" text-field="ServiceNo"></b-form-select>
        
        <Header text="Select Day:"></Header>
        <b-form-select class="mb-2" v-model="selectedDay1" :options="store.day" text-field="name"></b-form-select>

        <b-button class="w-50">
          Update First Bus Timing
        </b-button>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Update Last Bus Timing</u></div>

        <Header text="Select Service No:"></Header>
        <b-form-select v-model="selectedServiceNo5" :options="store.busServices.data" text-field="ServiceNo"></b-form-select>

        <Header text="Select Day:"></Header>
        <b-form-select class="mb-2" v-model="selectedDay2" :options="store.day" text-field="name"></b-form-select>

        <b-button class="w-50">
          Update Last Bus Timing
        </b-button>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Update</u></div>
      
        <b-form-select class="mt-2"></b-form-select>
        <b-form-select class="mb-2 mt-2"></b-form-select>

        <b-button class="w-50">
          
        </b-button>
      </b-col>
    </b-row>


    <b-row class="mt-5">
      <b-col cols="4">
        <div class="mb-3"><u>Delete Bus Service Route</u></div>
      
        <Header text="Select Service No:"></Header>
        <b-form-select v-model="selectedServiceNo3" :options="store.busServices.data" 
          text-field="ServiceNo"></b-form-select>
          
        <Header text="Select Bus Route:"></Header>
        <b-form-select class="mb-2" v-model="busRoute">
          <option v-for="busRoute in store.busRoutes.data" :key="busRoute.id" :value="busRoute">
            {{ busRoute.Description }} - {{busRoute.RoadName}} ({{ busRoute.BusStopCode }})
          </option>
        </b-form-select>

        <b-button class="w-50" @click="deleteBusRoute(selectedServiceNo3, busRoute)">
          Delete Bus Route
        </b-button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import axios from "axios"
import { store } from "../main.js"
import Header from "../components/Header.vue"

export default {
  name: "AdminView",
  props: {

  },
  components: {
    Header,
  },
  data() {
    return {
      store,
      forceKey: 0,
      selectedServiceNo: "",
      selectedServiceNo2: "",
      selectedServiceNo3: "",
      selectedServiceNo4: "",
      selectedServiceNo5: "",
      desiredOperator: "",
      desiredCategory: "",
      selectedDay1: "",
      selectedDay2: "",
      inputtedServiceNo: "",
      inputtedOperator: "",
      inputtedCategory: "",
      inputtedBusStopCode: "",
      inputtedRoadName: "",
      inputtedDescription: "",
      inputtedLatitude: "",
      inputtedLongitude: "",
      inputtedStnCode: "",
      inputtedMRTStation: "",
      inputtedMRTLine: "",
      inputtedLatitude2: "",
      inputtedLongitude2: "",
      busRoute: {},
    }
  },
  watch: {
    async selectedServiceNo3() {
      // console.log("I am called")
      store.busRoutes = await axios.get(store.BACKEND_API_URL + "bus-stops?busService="+ this.selectedServiceNo3)
      console.log(store.busRoutes)
    }
  },
  async mounted() {
      store.busServices = await axios.get(store.BACKEND_API_URL + "bus-services")
      store.mrtLines = await axios.get(store.BACKEND_API_URL + `MRTLines`)
  },
  methods: {
    // topics are ServiceNo, Operator, Category
    updateOperator: async (selectedServiceNo, desiredOperator) => {
      console.log("selected service no: " + selectedServiceNo)
      console.log("selected operator: " + desiredOperator)
      const req = await axios.put(store.BACKEND_API_URL + "bus-services", 
      { 
        "topic": "Operator",
        "selectedServiceNo": selectedServiceNo,
        "desiredOperator": desiredOperator 
      })
    },

    updateCategory: async (selectedServiceNo2, desiredCategory) => {
      console.log("selected service no: " + selectedServiceNo2)
      console.log("selected operator: " + desiredCategory)
      const req = await axios.put(store.BACKEND_API_URL + "bus-services", 
      { 
        "topic": "Category",
        "selectedServiceNo": selectedServiceNo2,
        "desiredOperator": desiredCategory 
      }).then(req => {
        console.log(req)
      })
    },

    deleteBusRoute: async (selectedServiceNo3, busRoute) => {
      console.log("selected service no: " + selectedServiceNo3)
      // console.log("selected bus route's direction: " + busRoute.Direction)
      console.log("selected bus route's stop sequence: " + busRoute.StopSequence)

      if (busRoute.StopSequence === Object.keys(store.busRoutes.data).length || busRoute.StopSequence === 1) {
        alert("Cannot delete start or end points of bus routes")
      }

      else {
        // need a request that sends back serviceno, direction and stop sequence
        // given bus stop code

        const req = await axios.get(store.BACKEND_API_URL + "bus-routes?busStopCode=" + busRoute.BusStopCode)
          // .then(req => {
          //   console.log(req)
          // })

        const req2 = await axios.delete(store.BACKEND_API_URL + "bus-routes", 
        {
          data: {
            "routes": req,
            "busStopCode": busRoute.BusStopCode
          }
        })
      }
    },

    addBusService: async (inputtedServiceNo, inputtedOperator, inputtedCategory) => {
      const res = await axios.get(store.BACKEND_API_URL + `check-bus-service?busService=${inputtedServiceNo}`).then(
        res => {
          if (res.data.length != 0) {
            alert("Bus service already exists!")
          }
          else {
            const res2 = axios.post(store.BACKEND_API_URL + `bus-service?busService=${inputtedServiceNo}&operator=${inputtedOperator}&category=${inputtedCategory}`)
          }
        }
      )
    },

    addBusStop: async (inputtedBusStopCode, inputtedRoadName, inputtedDescription, inputtedLatitude, inputtedLongitude) => {
      const res = await axios.get(store.BACKEND_API_URL + `check-bus-stop-code?busStopCode=${inputtedBusStopCode}`).then(
        async res => {
          if (res.data.length != 0) {
            alert("Bus stop already exists!")
          }
          else {
            const res2 = axios.post(store.BACKEND_API_URL + `bus-stop?busStopCode=${inputtedBusStopCode}` + 
            `&roadName=${inputtedRoadName}&description=${inputtedDescription}&latitude=${inputtedLatitude}` + 
            `&longitude=${inputtedLongitude}`)
          }
        }
      )
    },

    addMRTStation: async (inputtedStnCode, inputtedMRTStation, inputtedMRTLine, inputtedLatitude2, inputtedLongitude2) => {
      const res = await axios.get(store.BACKEND_API_URL + `check-station-code?stnCode=${inputtedStnCode}`).then( 
        async res => {
          if (res.data.length != 0) {
            alert("MRT Station already exists!")
          }
          else {
            const res2 = await axios.post(store.BACKEND_API_URL + `mrt-station?stnCode=${inputtedStnCode}` + 
            `&mrtStation=${inputtedMRTStation}&mrtLine=${inputtedMRTLine}` + 
            `&latitude=${inputtedLatitude2}&longitude=${inputtedLongitude2}`).then(
              res2 => {
                console.log(res2)
              }
            )
          }
        }
      )
    }
  }
}
</script>

<style scoped>
</style>