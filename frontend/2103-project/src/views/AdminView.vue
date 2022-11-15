<template>
  <b-container class="bv-example-row">
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
  }
}
</script>

<style scoped>
</style>