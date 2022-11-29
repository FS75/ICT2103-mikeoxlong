<template>
  <b-container class="bv-example-row">
    <b-row class="mt-5">
      <b-col cols="4">
        <div class="mb-3"><u>Add Bus Service</u></div>
        <b-form @submit="onSubmit1">
          <b-form-input v-model="inputtedServiceNo" placeholder="Enter bus service no" type="text" 
            v-b-tooltip.hover="'Eg. 999 or 999A'" required></b-form-input>
          <Header text="Select Desired Operator:"></Header>
          <b-form-select class="mb-2" v-model="inputtedOperator" :options="store.operators" text-field="name" required></b-form-select>
          <Header text="Select Desired Category:"></Header>
          <b-form-select class="mb-3" v-model="inputtedCategory" :options="store.category" text-field="name" required></b-form-select>
          
          <b-button type="submit" variant="primary" class="w-50">
            Add Bus Service
          </b-button>
        </b-form>  
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Add Bus Stop</u></div>
        <b-form @submit="onSubmit2">
          <b-form-input v-b-tooltip.hover="'Eg. 99999'" v-model="inputtedBusStopCode" placeholder="Enter bus stop code" 
            type="number" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. SIT Rd'" v-model="inputtedRoadName" 
            placeholder="Enter road name of bus stop" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. SIT @ NYP'" v-model="inputtedDescription" 
            placeholder="Enter location description of bus stop" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. 1.3774'" v-model="inputtedLatitude" 
            placeholder="Enter latitude of bus stop" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. 103.8488'" v-model="inputtedLongitude" 
            placeholder="Enter longitude of bus stop" type="text" class="mb-3" required></b-form-input>
          
            <b-button type="submit" variant="primary" class="w-50">
            Add Bus Stop
          </b-button>
        </b-form>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Add MRT Station</u></div>
        <b-form @submit="onSubmit3">
          <b-form-input v-b-tooltip.hover="'Eg. SIT1 or SIT9'" v-model="inputtedStnCode" 
            placeholder="Enter station code" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. SIT Station'" v-model="inputtedMRTStation" 
            placeholder="Enter name of MRT station" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. 1.3774'" v-model="inputtedLatitude2" 
            placeholder="Enter latitude of MRT Station" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. 103.8488'" v-model="inputtedLongitude2" 
            placeholder="Enter longitude of MRT Station" type="text" required></b-form-input>
          <Header text="Select MRT Line:"></Header>
          <b-form-select v-model="inputtedMRTLine" :options="store.mrtLines.data" 
            text-field="MRTLine" class="mb-3" required></b-form-select>

          <b-button type="submit" variant="primary" class="w-50">
            Add MRT Station
          </b-button>
        </b-form>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Add Taxi Stand</u></div>
        <b-form @submit="onSubmit4">
          <b-form-input v-b-tooltip.hover="'Eg. A99 or Z01'" v-model="inputtedTaxiCode" 
            placeholder="Enter taxi code" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. SIT @ NYP'" v-model="inputtedDescription2" 
            placeholder="Enter location description of taxi stand" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. 1.3774'" v-model="inputtedLatitude3" 
            placeholder="Enter latitude of Taxi Stand" type="text" required></b-form-input>
          <b-form-input v-b-tooltip.hover="'Eg. 103.8488'" v-model="inputtedLongitude3" 
            placeholder="Enter longitude of Taxi Stand" type="text" required></b-form-input>

          <Header text="Include Barrier Free Accessibility:"></Header>
          <b-form-select v-model="selectedTaxiBFA" class="mb-3" required>
            <option>Yes</option>
            <option>No</option>
          </b-form-select>
          <Header text="Select Taxi Ownership:"></Header>
          <b-form-select v-model="selectedTaxiOwnership" :options="store.taxiOwnership" text-field="name"
            class="mb-3" required></b-form-select>
          <Header text="Select Taxi Type:"></Header>
          <b-form-select v-model="selectedTaxiType" class="mb-3" required>
            <option>Stand</option>
            <option>Stop</option>
          </b-form-select>

          <b-button type="submit" variant="primary" class="w-50">
            Add Taxi Stand
          </b-button>
        </b-form>
      </b-col>
    </b-row>


    <b-row class="mt-5">
      <b-col cols="4">
        <div class="mb-3"><u>Update Bus Service Operator</u></div>
        <b-form @submit="onSubmit5">
          <Header text="Select Service No:"></Header>
          <b-form-select v-model="selectedServiceNo" :options="store.busServices.data" text-field="ServiceNo" required></b-form-select>
          <Header text="Select Desired Operator:"></Header>
          <b-form-select class="mb-2" v-model="desiredOperator" :options="store.operators" text-field="name" required></b-form-select>

          <b-button type="submit" variant="primary" class="w-50">
            Update Operator
          </b-button>
        </b-form>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Update Bus Service Category</u></div>
        <b-form @submit="onSubmit6">
          <Header text="Select Service No:"></Header>
          <b-form-select v-model="selectedServiceNo2" :options="store.busServices.data" text-field="ServiceNo" required></b-form-select>
          <Header text="Select Desired Operator:"></Header>
          <b-form-select class="mb-2" v-model="desiredCategory" :options="store.category" text-field="name" required></b-form-select>
          
          <b-button type="submit" variant="primary" class="w-50">
            Update Category
          </b-button>
        </b-form>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Update Taxi BFA Status</u></div>
        <b-form @submit="onSubmit7">
          <Header text="Select Taxi Stand"></Header>
          <b-form-select class="mb-2" v-model="selectedTaxiStand">
            <option v-for="stand in store.taxiStands.data" :key="stand.id" :value="stand.TaxiCode">
              {{stand.Name}} ({{stand.TaxiCode}})
            </option>
          </b-form-select>
          <Header text="Select BFA (wheelchair friendly) Status:"></Header>
          <b-form-select class="mb-2" v-model="selectedBFA" required>
            <option>Yes</option>
            <option>No</option>
          </b-form-select>
          
          <b-button type="submit" variant="primary" class="w-50">
            Update Taxi BFA Status
          </b-button>
        </b-form>
      </b-col>
    </b-row>


    <b-row class="mt-5">
      <b-col cols="4">
        <div class="mb-3"><u>Delete Bus Service Route</u></div>
        <b-form @submit="onSubmit8">
          <Header text="Select Service No:"></Header>
          <b-form-select v-model="selectedServiceNo3" :options="store.busServices.data" 
            text-field="ServiceNo"></b-form-select>
            
          <Header text="Select Bus Route:"></Header>
          <b-form-select class="mb-2" v-model="busRoute">
            <option v-for="busRoute in store.busRoutes.data" :key="busRoute.id" :value="busRoute">
              {{ busRoute.Description }} - {{busRoute.RoadName}} ({{ busRoute.BusStopCode }})
            </option>
          </b-form-select>

          <b-button type="submit" variant="primary" class="w-50">
            Delete Bus Route
          </b-button>
        </b-form>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Delete Taxi Stand</u></div>
        <b-form @submit="onSubmit9">
          <Header text="Select Taxi Stand"></Header>
          <b-form-select class="mb-2" v-model="selectedTaxiStand2">
            <option v-for="stand in store.taxiStands.data" :key="stand.id" :value="stand.TaxiCode">
              {{stand.Name}} ({{stand.TaxiCode}})
            </option>
          </b-form-select>
          <b-button type="submit" variant="primary" class="w-50">
            Delete Taxi Stand
          </b-button>
        </b-form>
      </b-col>

      <b-col cols="4">
        <div class="mb-3"><u>Delete MRT Station</u></div>
        <b-form @submit="onSubmit10">
          <Header text="Select MRT Station"></Header>
          <b-form-select class="mb-2" v-model="selectedMRTStation">
            <option v-for="stn in store.mrtStations.data" :key="stn.id" :value="stn.MRTStation">
              {{stn.MRTStation}} ({{stn.StnCode}})
            </option>
          </b-form-select>

          <b-button type="submit" variant="primary" class="w-50">
            Delete MRT Station
          </b-button>
        </b-form>
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
      selectedServiceNo6: "",
      selectedServiceNo7: "",
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
      inputtedTaxiCode: "",
      inputtedDescription2: "",
      inputtedLatitude3: "",
      inputtedLongitude3: "",
      selectedTaxiBFA: "",
      selectedTaxiOwnership: "",
      selectedTaxiType: "",
      inputtedTiming1: "",
      inputtedTiming2: "",
      selectedTaxiStand: "",
      selectedTaxiStand2: "",
      selectedBFA: "",
      selectedMRTStation: "",
      busRoute: {},
    }
  },
  watch: {
    async selectedServiceNo3() {
      store.busRoutes = await axios.get(store.BACKEND_API_URL + "bus-stops?busService="+ this.selectedServiceNo3)
    }
  },
  async mounted() {
      store.busServices = await axios.get(store.BACKEND_API_URL + "bus-services")
      store.taxiStands = await axios.get(store.BACKEND_API_URL + "taxi-stand")
      store.mrtStations = await axios.get(store.BACKEND_API_URL + "MRTStation")
      store.mrtLines = await axios.get(store.BACKEND_API_URL + "MRTLines")
  },
  // created() {
  //   console.log(this.store)
  // },
  methods: {
    onSubmit1(event) {
      event.preventDefault()
      this.addBusService(this.inputtedServiceNo, this.inputtedOperator, this.inputtedCategory)
    },

    onSubmit2(event) {
      event.preventDefault()
      this.addBusStop(this.inputtedBusStopCode, this.inputtedRoadName, 
        this.inputtedDescription, this.inputtedLatitude, this.inputtedLongitude)
    },

    onSubmit3(event) {
      event.preventDefault()
      this.addMRTStation(this.inputtedStnCode, this.inputtedMRTStation, this.inputtedMRTLine, 
        this.inputtedLatitude2, this.inputtedLongitude2)
    },

    onSubmit4(event) {
      event.preventDefault()
      this.addTaxiStand(this.inputtedTaxiCode, this.inputtedDescription2, this.inputtedLatitude3, this.inputtedLongitude3, 
        this.selectedTaxiBFA, this.selectedTaxiOwnership, this.selectedTaxiType)
    },

    onSubmit5(event) {
      event.preventDefault()
      this.updateOperator(this.selectedServiceNo, this.desiredOperator)
    },

    onSubmit6(event) {
      event.preventDefault()
      this.updateCategory(this.selectedServiceNo2, this.desiredCategory)
    },

    onSubmit7(event) {
      event.preventDefault()
      this.updateTaxiBFA(this.selectedTaxiStand, this.selectedBFA)
    },

    onSubmit8(event) {
      event.preventDefault()
      this.deleteBusRoute(this.busRoute)
    },

    onSubmit9(event) {
      event.preventDefault()
      this.deleteTaxiStand(this.selectedTaxiStand2)
    },

    onSubmit10(event) {
      event.preventDefault()
      this.deleteMRTStation(this.selectedMRTStation)
    },

    // topics are ServiceNo, Operator, Category
    updateOperator: async (selectedServiceNo, desiredOperator) => {
      // console.log("selected service no: " + selectedServiceNo)
      // console.log("selected operator: " + desiredOperator)
      const req = await axios.put(store.BACKEND_API_URL + "bus-services", 
      { 
        "topic": "Operator",
        "selectedServiceNo": selectedServiceNo,
        "desiredOperator": desiredOperator 
      }).then(
        req => {
          alert(req.data)
        }
      )
    },

    updateCategory: async (selectedServiceNo2, desiredCategory) => {
      // console.log("selected service no: " + selectedServiceNo2)
      // console.log("selected operator: " + desiredCategory)
      const req = await axios.put(store.BACKEND_API_URL + "bus-services", 
      { 
        "topic": "Category",
        "selectedServiceNo": selectedServiceNo2,
        "desiredOperator": desiredCategory 
      }).then(
        req => {
          alert(req.data)
      })
    },

    deleteBusRoute: async (busRoute) => {
      if (busRoute.StopSequence === Object.keys(store.busRoutes.data).length || busRoute.StopSequence === 1)
        alert("Cannot delete start or end points of bus routes")

      else {
        // need a request that sends back serviceno, direction and stop sequence
        // given bus stop code

        const res = await axios.get(store.BACKEND_API_URL + "bus-routes?busStopCode=" + busRoute.BusStopCode).then(
          async res => {
            const req = await axios.delete(store.BACKEND_API_URL + "bus-routes", 
            {
              data: {
                "routes": res.data,
                "busStopCode": busRoute.BusStopCode
              }
            })
            .then(
              req => {
                alert(req.data)
            }) 
          }
        )
      }
    },

    addBusService: async (inputtedServiceNo, inputtedOperator, inputtedCategory) => {
      const res = await axios.get(store.BACKEND_API_URL + `check-bus-service?busService=${inputtedServiceNo}`).then(
        res => {
          if (res.data.length != 0) {
            alert("Bus Service already exists!")
          }
          else {
            const res2 = axios.post(store.BACKEND_API_URL + `bus-service?busService=${inputtedServiceNo}
              &operator=${inputtedOperator}&category=${inputtedCategory}`).then(
                res2 => {
                  alert(res2.data)
                }
              )
          }
        }
      )
    },

    addBusStop: async (inputtedBusStopCode, inputtedRoadName, inputtedDescription, inputtedLatitude, inputtedLongitude) => {
      const res = await axios.get(store.BACKEND_API_URL + `check-bus-stop-code?busStopCode=${inputtedBusStopCode}`).then(
        async res => {
          if (res.data.length != 0) {
            alert("Bus Stop Code already exists!")
          }
          else {
            const res2 = axios.post(store.BACKEND_API_URL + `bus-stop?busStopCode=${inputtedBusStopCode}` + 
            `&roadName=${inputtedRoadName}&description=${inputtedDescription}&latitude=${inputtedLatitude}` + 
            `&longitude=${inputtedLongitude}`).then(
              res2 => {
                alert(res2.data)
              }
            )
          }
        }
      )
    },

    addMRTStation: async (inputtedStnCode, inputtedMRTStation, inputtedMRTLine, inputtedLatitude2, inputtedLongitude2) => {
      const res = await axios.get(store.BACKEND_API_URL + `check-station-code?stnCode=${inputtedStnCode}`).then( 
        async res => {
          if (res.data.length != 0) {
            alert("MRT Station Code already exists!")
          }
          else {
            const res2 = await axios.post(store.BACKEND_API_URL + `mrt-station?stnCode=${inputtedStnCode}` + 
            `&mrtStation=${inputtedMRTStation}&mrtLine=${inputtedMRTLine}` + 
            `&latitude=${inputtedLatitude2}&longitude=${inputtedLongitude2}`).then(
              res2 => {
                alert(res2.data)
              }
            )
          }
        }
      )
    },

    addTaxiStand: async(inputtedTaxiCode, inputtedDescription2, inputtedLatitude3, inputtedLongitude3, 
        selectedTaxiBFA, selectedTaxiOwnership, selectedTaxiType) => {
          const res = await axios.get(store.BACKEND_API_URL + `check-taxi-stand?taxiStandCode=${inputtedTaxiCode}` ).then(
            async res => {
              if (res.data.length != 0) {
                alert("Taxi Code already exists!")
              }
              else {
                let bfa = "TRUE"
                if (selectedTaxiBFA == "No")
                  bfa = "FALSE"
                const res2 = await axios.post(store.BACKEND_API_URL + `taxi-stand?taxiCode=${inputtedTaxiCode}` + 
                `&description=${inputtedDescription2}&latitude=${inputtedLatitude3}&longitude=${inputtedLongitude3}` + 
                `&bfa=${bfa}&taxiOwnership=${selectedTaxiOwnership}&taxiType=${selectedTaxiType}` ).then(
                  res2 => {
                    alert(res2.data)
                  }
                )
              }
            }
          )
        },

    updateTaxiBFA: async (taxiCode, bfa) => {
      let convertedBfa = "FALSE"
      if (bfa == "Yes")
        convertedBfa = "TRUE"
      const res = await axios.put(store.BACKEND_API_URL + `taxi-stand-bfa?code=${taxiCode}&bfa=${convertedBfa}`).then(
        res => {
          alert(res.data)
        }
      )
    },

    deleteTaxiStand: async (taxiStandCode) => {
      // console.log(taxiStandCode)
      const req = await axios.delete(store.BACKEND_API_URL + "taxi-stand", 
        {
          data: {
            "code": taxiStandCode
          }
        }).then(
          req => {
            alert(req.data)
          }   
        )
    },

    deleteMRTStation: async (mrtStation) => {
      const req = await axios.delete(store.BACKEND_API_URL + "mrt-station", 
        {
          data: {
            "name": mrtStation
          }
        }).then(
          req => {
            alert(req.data)
          }   
        )
    }
  }
}
</script>

<style scoped>
</style>