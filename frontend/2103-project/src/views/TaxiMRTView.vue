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
        }
    },
    async mounted() {
        store.mrtLines = await axios.get(store.BACKEND_API_URL + "MRTLines")
        // console.log(store.mrtLines)
    },
    watch: {
        async selectedLine() {
            store.mrtStations = await axios.get(store.BACKEND_API_URL + `MRTStation-Line?mrtLine=${this.selectedLine}`)
        }
    }
}
</script>