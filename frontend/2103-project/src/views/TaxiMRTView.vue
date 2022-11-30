<template>
    <b-container class="bv-example-row">
        <b-row class="mt-5">
            <b-col></b-col>
            <b-col cols="4">
                <div class="mb-3"><u>Find MRT Station</u></div>
                <Header text="Select Line:"></Header>
                <b-form-select v-model="selectedLine" :options="store.mrtLines.data" text-field="MRTLine"></b-form-select>
                <Header text="Select Station:"></Header>
                <b-form-select class="mb-2" v-model="selectedStation">
                    <option v-for="stn in store.cutMrtStations.data" :key="stn.id" :value="stn.MRTStation">
                    {{stn.MRTStation}} ({{stn.StnCode}})
                    </option>
                </b-form-select>
            
            </b-col>
            <b-col cols="4">
                <div class="mb-3"><u>Find Taxi Stand</u></div>
                <Header text="Select Taxi Stand:"></Header>
                <b-form-select class="mb-2" v-model="selectedTaxiStandName">
                    <option v-for="stand in store.taxiStands.data" :key="stand.id" :value="stand.Name">
                    {{stand.Name}} ({{stand.TaxiCode}})
                    </option>
                </b-form-select>
                <div class="mt-3">Wheelchair Friendly: {{bfa}}</div>
                <!-- <b-form-select v-model="selectedTaxiStandName" :options="store.taxiStandNames.data" text-field="Name"></b-form-select> -->
            </b-col>
            <b-col></b-col>
        </b-row>

        <b-row class="mt-5">
            <b-col></b-col>
            <b-col>
                <GMapMap
                :center="center"
                :zoom="mapZoom" 
                map-type-id="terrain"
                style="width: 40vw; height: 400px"
                >
                <GMapMarker v-for="(m, index) in markers" 
                    :key="index"
                    :position="m.position" 
                    :visible="m.visibility" />
                <GMapMarker v-for="(m, index) in taxiMarkers" 
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
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from "axios"
import { store } from "../main.js"
import Header from "../components/Header.vue"

export default {
    name: "TaxiMRTView",
    components: {
        Header,
    },
    data() {
        return {
            store,
            selectedLine: "",
            selectedStation: "",
            selectedTaxiStandName: "",
            bfa: "",
            mapZoom: 11.3,
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
                }
            ],
            taxiMarkers: [
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
    methods: {
        setCharAt(str, index, chr) {
            if(index > str.length-1) return str
            return str.substring(0,index) + chr + str.substring(index+1);
        }
    },
    async mounted() {
        store.mrtStations = await axios.get(store.BACKEND_API_URL + "MRTStation")
        store.mrtLines = await axios.get(store.BACKEND_API_URL + "MRTLines")
        store.mrtStnCodes = await axios.get(store.BACKEND_API_URL + "MRTStnCodes")
        store.taxiStands = await axios.get(store.BACKEND_API_URL + "taxi-stand")
        // console.log(store.taxiStands.data)
    },
    watch: {
        async selectedLine() {
            store.cutMrtStations = await axios.get(store.BACKEND_API_URL + `MRTStation-Line?mrtLine=${this.selectedLine}`)
        },

        async selectedStation() {
            this.taxiMarkers = []
            store.mrtLocation = await axios.get(store.BACKEND_API_URL + `Location-MRTStation?station=${this.selectedStation}`)
            const res = await axios.get(store.BACKEND_API_URL + `TaxiStand-MRTStation?station=${this.selectedStation}`).then(
                res => {
                    store.taxiStandNearby2 = res.data
                    if (store.taxiStandNearby2.length != 0) {
                        // populate markers
                        for (let i = 0; i < store.taxiStandNearby2.length; i++) {
                            this.taxiMarkers.push(
                                {
                                    position: 
                                    {
                                        lat: store.taxiStandNearby2[i].latitude,
                                        lng: store.taxiStandNearby2[i].longitude,
                                    }
                                }
                            )
                        }
                    }
                    else
                        store.taxiStandNearby2 = []
                }   
            )

            this.center.lat = store.mrtLocation.data[0].Latitude
            this.center.lng = store.mrtLocation.data[0].Longitude
            this.markers[0].position.lat = store.mrtLocation.data[0].Latitude
            this.markers[0].position.lng = store.mrtLocation.data[0].Longitude
            this.mapZoom = 18
        },

        async selectedTaxiStandName() {
            var replacedName = this.selectedTaxiStandName
            let ampersandIndex = replacedName.indexOf("&")
            if (ampersandIndex != -1) {
                replacedName = this.setCharAt(replacedName, ampersandIndex, "%26")
            }
            // console.log(replacedName)

            this.taxiMarkers = []
            // query for taxi stand location based on name
            const res = await axios.get(store.BACKEND_API_URL + `taxi-location-from-name?name=${replacedName}`).then(
                res => {
                    this.taxiMarkers.push(
                        {
                            position: {
                                lat: res.data[0].Latitude,
                                lng: res.data[0].Longitude
                            }
                        }
                    )

                    // console.log(this.taxiMarkers[this.taxiMarkers.length - 1].position.lat)
                    this.center.lat = this.taxiMarkers[this.taxiMarkers.length - 1].position.lat
                    this.center.lng = this.taxiMarkers[this.taxiMarkers.length - 1].position.lng
                    this.mapZoom = 20
                }
            )

            // query for bfa based on name
            const res2 = await axios.get(store.BACKEND_API_URL + `taxi-bfa-from-name?name=${replacedName}`).then(
                res2 => {
                    if ((Object.values(res2.data[0])[0].data[0]) == 1)
                        this.bfa = "Yes"
                    else
                        this.bfa = "No"
                }
            )
        }
    },
}
</script>