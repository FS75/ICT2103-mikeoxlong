<template>
  <b-container class="bv-example-row">
    <b-row>
      <b-col cols="4">
        <div>Update Bus Service Operator</div>

        <b-form-select class="mt-2" v-model="selectedServiceNo" :options="store.busServices.data" text-field="ServiceNo"></b-form-select>
        <b-form-select class="mb-2 mt-2" v-model="desiredOperator" :options="store.operators" text-field="name"></b-form-select>

        <b-button class="w-50" @click="updateOperator(selectedServiceNo, desiredOperator)">
          Update Operator
        </b-button>
      </b-col>

      <b-col cols="4">
        <div>Update Bus Service Category</div>

        <b-form-select class="mt-2" v-model="selectedServiceNo2" :options="store.busServices.data" text-field="ServiceNo"></b-form-select>
        <b-form-select class="mb-2 mt-2" v-model="desiredCategory" :options="store.category" text-field="name"></b-form-select>

        <b-button class="w-50" @click="updateCategory(selectedServiceNo2, desiredCategory)">
          Update Category
        </b-button>
      </b-col>

      <b-col cols="4">
        <div>Delete Bus Service Route</div>
        

        <b-form-select class="mt-2" v-model="selectedServiceNo3" :options="store.busServices.data" 
          text-field="ServiceNo"></b-form-select>
        <b-form-select class="mb-2 mt-2" v-model="busRoute">
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

export default {
  name: "AdminView",
  props: {

  },
  components: {
  },
  data() {
    return {
      store,
      forceKey: 0,
      selectedServiceNo: "",
      selectedServiceNo2: "",
      selectedServiceNo3: "",
      desiredOperator: "",
      desiredCategory: "",
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
        const req = await axios.delete(store.BACKEND_API_URL + "bus-routes", 
        {
          data: {
            "selectedServiceNo": selectedServiceNo3,
            "stopSequence": busRoute.StopSequence,
            "direction": busRoute.Direction
          }
        })
      }
    },
  }
}
</script>

<style scoped>
</style>