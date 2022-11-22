<template>
  <b-container class="bv-example-row">
    <b-row class="mt-5">
      <b-col></b-col>
      <b-col cols="4">
        <div class="mb-3"><u>Choose Bus Service</u></div>
        <Header text="Select Service No:"></Header>
        <b-form-select v-model="selectedServiceNo" :options="store.busServices.data" text-field="ServiceNo"></b-form-select>
      </b-col>
      <b-col>
        <Header v-if="checkTaxiStandNearby()" text="Taxis Available Near Interchange!" :style="{ 'justify-content': 'center' }"></Header>
        <GMapMap
          v-if="checkTaxiStandNearby()"
          :center="center"
          :zoom="mapZoom" 
          map-type-id="terrain"
          style="width: 30vw; height: 200px"
          >
          <GMapMarker v-for="(m, index) in markers" 
              :key="index"
              :position="m.position" 
              :visible="m.visibility"
              :icon='
              {
                url: "https://cdn-icons-png.flaticon.com/512/67/67907.png",
                scaledSize: {width: 30, height: 30},
                labelOrigin: {x: 16, y: -10}
              }' />
        </GMapMap>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col v-if="!checkBus"></b-col>
      <b-col cols="4">
        <div class="mb-3"><u>Select Starting Route</u></div>
        <Header text="Select Starting Route:"></Header>
        <b-form-select :disabled="startingRouteDisabled" v-model="selectedStartingRoute">
          <option v-for="busRoute in store.busRoutes.data" :key="busRoute.id" :value="busRoute">
            {{ busRoute.Description }} - {{busRoute.RoadName}} ({{ busRoute.BusStopCode }})
          </option>
        </b-form-select>
      </b-col>
      <b-col cols="4">
        <div class="mb-3"><u>Select Destination Route</u></div>
        <Header text="Select Destination Route:"></Header>
        <b-form-select :disabled="destinationRouteDisabled" v-model="selectedDestinationRoute">
          <option v-for="busRoute in store.destinationBusRoutes" :key="busRoute.id" :value="busRoute">
            {{ busRoute.Description }} - {{busRoute.RoadName}} ({{ busRoute.BusStopCode }})
          </option>
        </b-form-select>
      </b-col>
      <b-col v-if="!checkBus"></b-col>

      <b-col v-if="checkBus" cols="4">
        <GMapMap
          :center="center2"
          :zoom="mapZoom2" 
          map-type-id="terrain"
          style="width: 30vw; height: 200px"
          >
          <GMapMarker v-for="(m, index) in busMarkers1" 
              :key="index"
              :position="m.position" 
              :visible="m.visibility"
              :icon='{
                url: require("../../images/start-bus.svg"),
                scaledSize: {width: 40, height: 40},
                labelOrigin: {x: 16, y: -10}
              }'
               />

          <GMapMarker v-for="(m, index) in busMarkers2" 
            :key="index"
            :position="m.position" 
            :visible="m.visibility"
            :icon='{
                url: require("../../images/end-bus.svg"),
                scaledSize: {width: 40, height: 40},
                labelOrigin: {x: 16, y: -10}
              }'
              />
        </GMapMap>

        <div class="mt-2">Green Bus: Starting Route</div>
        <div>Red Bus: Destination Route</div>
      </b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col></b-col>
      <b-col cols="4">
        Distance between routes: {{distance}} KM
      </b-col>
      <b-col></b-col>
    </b-row>

    <b-row class="mt-5">
      <b-col>
        <div class="mb-3"><u>Weekday</u></div>
        <b-row>
          <b-col>First Bus: {{this.selectedStartingRoute.WDFirstBus}}</b-col>
          <b-col>Last Bus: {{this.selectedStartingRoute.WDLastBus}}</b-col>
        </b-row> 
      </b-col>
      <b-col>
        <div class="mb-3"><u>Saturday</u></div>
        <b-row>
          <b-col>First Bus: {{this.selectedStartingRoute.SATFirstBus}}</b-col>
          <b-col>Last Bus: {{this.selectedStartingRoute.SATLastBus}}</b-col>
        </b-row> 
      </b-col>
      <b-col>
        <div class="mb-3"><u>Sunday</u></div>
        <b-row>
          <b-col>First Bus: {{this.selectedStartingRoute.SUNFirstBus}}</b-col>
          <b-col>Last Bus: {{this.selectedStartingRoute.SUNLastBus}}</b-col>
        </b-row> 
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
  import axios from "axios"
  import { store } from "../main.js"
  import Header from "../components/Header.vue"

  export default {
    name: "HomeView",
    props: {

    },
    components: {
      Header
    },
    data() {
        return {
          store,
          selectedServiceNo: "",
          selectedStartingRoute: "",
          selectedDestinationRoute: "",
          checkBus: false,
          distance: 0,
          startingRouteDisabled: true,
          destinationRouteDisabled: true,
          mapZoom: 11.3,
          mapZoom2: 11.3,
          center: 
          {
              lat: 1.3521, 
              lng: 103.8198
          },
          markers: [
              {
                  position: 
                  {
                      lat: 0,
                      lng: 0
                  },
              },
          ],
          center2: 
          {
              lat: 1.3521, 
              lng: 103.8198
          },
          busMarkers1: [
              {
                  position: 
                  {
                      lat: 0,
                      lng: 0
                  },
              },
          ],

          busMarkers2: [
              {
                  position: 
                  {
                      lat: 0,
                      lng: 0
                  },
              },
          ]
        }
    },
    async mounted() {
      store.taxiStandNearby = []
      this.selectedServiceNo = ""
      this.selectedStartingRoute = ""
      this.selectedDestinationRoute = ""
      store.busServices = await axios.get(store.BACKEND_API_URL + "bus-services")
    },
    methods: {
      parseTimes() {
        // hardcoded this bit because i cant use computed method to time then return to data

        if (this.selectedStartingRoute.WDFirstBus != null) {
          this.selectedStartingRoute.WDFirstBus = this.selectedStartingRoute.WDFirstBus.toString()
          this.selectedStartingRoute.WDLastBus = this.selectedStartingRoute.WDLastBus.toString()
          
          if (this.selectedStartingRoute.WDFirstBus.length == 3)
            this.selectedStartingRoute.WDFirstBus = "0" + this.selectedStartingRoute.WDFirstBus
          else if (this.selectedStartingRoute.WDFirstBus.length == 2)
            this.selectedStartingRoute.WDFirstBus = "00" + this.selectedStartingRoute.WDFirstBus
          else if (this.selectedStartingRoute.WDFirstBus.length == 1)
            this.selectedStartingRoute.WDFirstBus = "000" + this.selectedStartingRoute.WDFirstBus

          if (this.selectedStartingRoute.WDLastBus.length == 3)
            this.selectedStartingRoute.WDLastBus = "0" + this.selectedStartingRoute.WDLastBus
          else if (this.selectedStartingRoute.WDLastBus.length == 2)
            this.selectedStartingRoute.WDLastBus = "00" + this.selectedStartingRoute.WDLastBus
          else if (this.selectedStartingRoute.WDLastBus.length == 1)
            this.selectedStartingRoute.WDLastBus = "000" + this.selectedStartingRoute.WDLastBus
        }

        else {
          this.selectedStartingRoute.WDFirstBus = "Not in Operation"
          this.selectedStartingRoute.WDLastBus = "Not in Operation"
        }

        if (this.selectedStartingRoute.SATFirstBus != null) {
          this.selectedStartingRoute.SATFirstBus = this.selectedStartingRoute.SATFirstBus.toString()
          this.selectedStartingRoute.SATLastBus = this.selectedStartingRoute.SATLastBus.toString()

          if (this.selectedStartingRoute.SATFirstBus.length == 3)
            this.selectedStartingRoute.SATFirstBus = "0" + this.selectedStartingRoute.SATFirstBus
          else if (this.selectedStartingRoute.SATFirstBus.length == 2)
            this.selectedStartingRoute.SATFirstBus = "00" + this.selectedStartingRoute.SATFirstBus
          else if (this.selectedStartingRoute.SATFirstBus.length == 1)
            this.selectedStartingRoute.SATFirstBus = "000" + this.selectedStartingRoute.SATFirstBus

          if (this.selectedStartingRoute.SATLastBus.length == 3)
            this.selectedStartingRoute.SATLastBus = "0" + this.selectedStartingRoute.SATLastBus
          else if (this.selectedStartingRoute.SATLastBus.length == 2)
            this.selectedStartingRoute.SATLastBus = "00" + this.selectedStartingRoute.SATLastBus
          else if (this.selectedStartingRoute.SATLastBus.length == 1)
            this.selectedStartingRoute.SATLastBus = "000" + this.selectedStartingRoute.SATLastBus
        }

        else {
          this.selectedStartingRoute.SATFirstBus = "Not in Operation"
          this.selectedStartingRoute.SATLastBus = "Not in Operation"
        }

        if (this.selectedStartingRoute.SUNFirstBus != null) {
          this.selectedStartingRoute.SUNFirstBus = this.selectedStartingRoute.SUNFirstBus.toString()
          this.selectedStartingRoute.SUNLastBus = this.selectedStartingRoute.SUNLastBus.toString()

          if (this.selectedStartingRoute.SUNFirstBus.length == 3)
            this.selectedStartingRoute.SUNFirstBus = "0" + this.selectedStartingRoute.SUNFirstBus
          else if (this.selectedStartingRoute.SUNFirstBus.length == 2)
            this.selectedStartingRoute.SUNFirstBus = "00" + this.selectedStartingRoute.SUNFirstBus
          else if (this.selectedStartingRoute.SUNFirstBus.length == 1)
            this.selectedStartingRoute.SUNFirstBus = "000" + this.selectedStartingRoute.SUNFirstBus

          if (this.selectedStartingRoute.SUNLastBus.length == 3)
            this.selectedStartingRoute.SUNLastBus = "0" + this.selectedStartingRoute.SUNLastBus
          else if (this.selectedStartingRoute.SUNLastBus.length == 2)
            this.selectedStartingRoute.SUNLastBus = "00" + this.selectedStartingRoute.SUNLastBus
          else if (this.selectedStartingRoute.SUNLastBus.length == 1)
            this.selectedStartingRoute.SUNLastBus = "000" + this.selectedStartingRoute.SUNLastBus
        }

        else {
          this.selectedStartingRoute.SUNFirstBus = "Not in Operation"
          this.selectedStartingRoute.SUNLastBus = "Not in Operation"
        }
      },

      checkTaxiStandNearby() {
        if (store.taxiStandNearby.length != 0) {
          // populate markers
          for (let i = 0; i < store.taxiStandNearby.length; i++) {
            this.markers.push(
              {
                position: 
                {
                  lat: store.taxiStandNearby[i].Latitude,
                  lng: store.taxiStandNearby[i].Longitude,
                }
              }
            )
            this.center.lat = store.taxiStandNearby[0].Latitude
            this.center.lng = store.taxiStandNearby[0].Longitude
            this.mapZoom = 16
          }
          return true
        }
        return false
      }
    },
    watch: {
      async selectedServiceNo() {
        this.startingRouteDisabled = false
        this.destinationRouteDisabled = true
        store.taxiStandNearby = []
        store.busRoutes = []
        store.destinationBusRoutes = []
        // this.selectedStartingRoute.WDFirstBus = ""
        // this.selectedStartingRoute.WDLastBus = ""
        // this.selectedStartingRoute.SATFirstBus = ""
        // this.selectedStartingRoute.SATLastBus = ""
        // this.selectedStartingRoute.SUNFirstBus = ""
        // this.selectedStartingRoute.SUNLastBus = ""
        store.busRoutes = await axios.get(store.BACKEND_API_URL + "bus-stops?busService="+ this.selectedServiceNo)
        const res = await axios.get(store.BACKEND_API_URL + "TaxiStand-ServiceNo?busService="+ this.selectedServiceNo).then(
          res => {
            if (res.data.length != 0) {
              // console.log(res.data)
              store.taxiStandNearby = res.data
            }
            else
              store.taxiStandNearby = []
          }
        )
      },
      selectedStartingRoute() {
        this.destinationRouteDisabled = false
        for (let i = 0; i < store.busRoutes.data.length; i++) {
          if ((store.busRoutes.data[i]).Direction == this.selectedStartingRoute.Direction
            && (store.busRoutes.data[i]).StopSequence > this.selectedStartingRoute.StopSequence) {
            store.destinationBusRoutes.push(store.busRoutes.data[i])
          }
        }
        this.parseTimes()
      },
      selectedDestinationRoute() {
        this.checkBus = true
        this.busMarkers = []
        this.distance = (Math.round((this.selectedDestinationRoute.Distance - this.selectedStartingRoute.Distance) * 100) / 100).toFixed(2);
        this.busMarkers1[0] = 
        {
            position: 
            {
                lat: this.selectedStartingRoute.Latitude,
                lng: this.selectedStartingRoute.Longitude,
            },
        }

        this.busMarkers2[0] = 
        {
            position: 
            {
                lat: this.selectedDestinationRoute.Latitude,
                lng: this.selectedDestinationRoute.Longitude,
            }
        }
        this.center2.lat = this.selectedStartingRoute.Latitude
        this.center2.lng = this.selectedStartingRoute.Longitude
        this.mapZoom2 = 13
      }
    }
  }
</script>

<style scoped>
</style>

