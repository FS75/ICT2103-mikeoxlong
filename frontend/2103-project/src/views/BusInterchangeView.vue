<template>
    <b-container class="bv-example-row">
        <b-row class="mt-5">
            <b-col></b-col>
            <b-col cols="10">
                <div class="mb-3"><u>Bus Interchange Details</u></div>
                <div class="table">
                    <b-table 
                    striped
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc" 
                    responsive :items="store.busInterchanges" :fields="fields"></b-table>
                </div>
                
            </b-col>
            <b-col></b-col>
        </b-row>
        <b-row class="mt-5">
            <b-col></b-col>
            <b-col cols="4">
                <div class="mb-3"><u>Choose Bus Interchange</u></div>
                <Header text="Select Bus Interchange:"></Header>
                <b-form-select v-model="selectedInterchange">
                    <option v-for="inter in store.busInterchanges" :key="inter.id" :value="inter">
                        {{ inter.Description }}
                    </option>
                </b-form-select>
            </b-col>
            <b-col></b-col>
        </b-row>
        <b-row class="mt-5" v-if="showServices">
            <b-col></b-col>
            <b-col cols="4">
                <div class="mb-3">Bus Services ran by <b>{{selectedInterchange.Description}}</b></div>
                <div class="table">
                    <b-table 
                    striped
                    responsive :items="store.busInterchangeServices"></b-table>
                </div>
            </b-col>
            <b-col></b-col>
        </b-row>

        <b-row class="mt-5" v-if="showFunFacts">
            <b-col></b-col>
            <b-col cols="6">
                <div class="mb-3"><u>Fun Facts</u></div>
                <div>Bus Service <b>{{ store.busServiceMostStops[0].serviceno }}</b> has the highest 
                    number of bus stops at <b>{{ store.busServiceMostStops[0].stopsequence }}</b> with a total route distance of 
                    <b>{{ store.busServiceMostStops[0].distance }} KM</b> in a single direction!</div>
                <div>Bus Service <b>{{ store.busServiceHighestDistance[0].serviceno }}</b> has the highest route distance of
                <b>{{ store.busServiceHighestDistance[0].distance }} KM</b> with a total of 
                <b>{{ store.busServiceHighestDistance[0].stopsequence }} bus stops</b> in a single direction!</div>
            </b-col>
            <b-col></b-col>
        </b-row>
    </b-container>
</template>

<script>
import axios from 'axios';
import { store } from "../main.js"
import Header from "../components/Header.vue"

export default {
    name: "BusInterchangeView",
    components: {
        Header,
    },

    data() {
        return {
            sortBy: 'Description',
            sortDesc: false,
            store,
            showFunFacts: false,
            showServices: false,
            selectedInterchange: "",
            fields: [
                { key: "Description", sortable: false }, 
                { key: "RoadName", sortable: false }, 
                { key: "BusStopCode", sortable: false }, 
                { key: "BusServicesAvailable", sortable: true }, 
            ],
            servicesFields: [ "serviceno" ]
        }
    },

    async mounted() {
        const res = await axios.get(store.BACKEND_API_URL + `bus-interchange`).then(
            res => {
                store.busInterchanges = res.data
                // console.log(store.busInterchanges)
            }
        ) 

        const res2 = await axios.get(store.BACKEND_API_URL + `bus-service-most-stops`).then(
            res2 => {
                store.busServiceMostStops = res2.data
            }
        )

        const res3 = await axios.get(store.BACKEND_API_URL + `bus-service-highest-distance`).then(
            res3 => {
                store.busServiceHighestDistance = res3.data
                this.showFunFacts = true
            }
        )

        // console.log(store.busServiceMostStops)
        // console.log(store.busServiceHighestDistance)
    },

    watch: {
        async selectedInterchange() {
            const res = await axios.get(store.BACKEND_API_URL + `bus-interchange-services?interchange=${this.selectedInterchange.Description}`)
                .then(
                res => {
                    store.busInterchangeServices = res.data
                    // console.log(store.busInterchangeServices)
                    this.showServices = true
                }
            )
        }
    }
}
</script>

<style scoped>
.table{
  height: 40vh;
  overflow-y:scroll;
}
</style>