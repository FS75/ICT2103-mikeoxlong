<template>
    <b-container class="bv-example-row">
        <b-row class="mt-5">
            <b-row></b-row>
            <b-row>
                <b-col></b-col>
                <b-col cols="4">
                    <Header text="Select Line:"></Header>
                    <b-form-select v-model="selectedLine" :options="store.mrtLines.data" text-field="MRTLine"></b-form-select>
                    <Header text="Select Station:"></Header>
                    <b-form-select v-model="selectedStation" :options="store.mrtStations.data" text-field="MRTStation"></b-form-select>
                </b-col>
                <b-col cols="4">
                    
                </b-col>
                <b-col></b-col>
            </b-row>
            <b-row></b-row>
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
            ]
        }
    },
    async mounted() {
        store.mrtLines = await axios.get(store.BACKEND_API_URL + "MRTLines")
        store.mrtStnCodes = await axios.get(store.BACKEND_API_URL + "MRTStnCodes")
    },
    watch: {
        async selectedLine() {
            store.mrtStations = await axios.get(store.BACKEND_API_URL + `MRTStation-Line?mrtLine=${this.selectedLine}`)
        },

        async selectedStation() {
            store.mrtLocation = await axios.get(store.BACKEND_API_URL + `Location-MRTStation?station=${this.selectedStation}`)

            this.center.lat = store.mrtLocation.data[0].Latitude
            this.center.lng = store.mrtLocation.data[0].Longitude
            this.markers[0].position.lat = store.mrtLocation.data[0].Latitude
            this.markers[0].position.lng = store.mrtLocation.data[0].Longitude
            this.mapZoom = 18
        }
    }
}
</script>