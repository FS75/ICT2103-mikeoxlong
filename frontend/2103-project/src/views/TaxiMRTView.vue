<template>
    <b-container class="bv-example-row">
        <b-row class="mt-5">
            <b-col>
                <Header text="Select Line:"></Header>
                <b-form-select v-model="selectedLine" :options="store.mrtLines.data" text-field="MRTLine"></b-form-select>
                <Header text="Select Station:"></Header>
                <b-form-select v-model="selectedStation" :options="store.mrtStations.data" text-field="MRTStation"></b-form-select>
            </b-col>
            <b-col></b-col>
            <b-col></b-col>
        </b-row>

        <GMapMap
            :center="center"
            :zoom="15"
            map-type-id="terrain"
            style="width: 50vw; height: 500px"
        >
        </GMapMap>
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
            center: {lat: 1.3721, lng: 103.9474},
        }
    },
    async mounted() {
        store.mrtLines = await axios.get(store.BACKEND_API_URL + "MRTLines")
        store.mrtStnCodes = await axios.get(store.BACKEND_API_URL + "MRTStnCodes")
        // console.log(store.mrtLines)
    },
    watch: {
        async selectedLine() {
            store.mrtStations = await axios.get(store.BACKEND_API_URL + `MRTStation-Line?mrtLine=${this.selectedLine}`)

            // console.log(store.mrtStations.data)

            for (let i = 0; i < store.mrtStnCodes.data.length; i++) {
                console.log(`UPDATE MRT_Station SET Latitude = '' WHERE StnCode = '${store.mrtStnCodes.data[i].StnCode}';`)
                console.log(`UPDATE MRT_Station SET Longitude = '' WHERE StnCode = '${store.mrtStnCodes.data[i].StnCode}';`)
            }
        }
    }
}
</script>