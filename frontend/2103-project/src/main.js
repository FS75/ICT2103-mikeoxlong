import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import  { reactive } from 'vue'

import vSelect from "vue-select"
import "vue-select/dist/vue-select.css";

import { BootstrapVue3 } from 'bootstrap-vue-3'
import VueGoogleMaps from '@fawmi/vue-google-maps'

// // Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

export const store = reactive({

    query: String,
    busServices: [],
    taxiStandNearby: [],
    taxiStandNearby2: [],
    busRoutes: [],
    destinationBusRoutes: [],
    mrtLines: [],
    mrtStations: [],
    mrtStnCodes: [],
    mrtLocation: [],
    taxiStands: [],
    operators: [
        {
            name: "SBST"
        },
        {
            name: "TTS"
        },
        {
            name: "SMRT"
        },
        {
            name: "GAS"
        }
    ],
    category: [
        {
            name: "TRUNK"
        },
        {
            name: "EXPRESS"
        },
        {
            name: "FEEDER"
        },
        {
            name: "INDUSTRIAL"
        },
        {
            name: "CITY_LINK"
        }
    ],
    day: [
        {
            name: "Weekday"
        },
        {
            name: "Saturday"
        },
        {
            name: "Sunday"
        },
    ],
    taxiOwnership: [
        {
            name: "LTA"
        },
        {
            name: "Private"
        },
        {
            name: "CCS"
        },
        {
            name: "SMRT"
        }
    ],
    BACKEND_API_URL: "http://localhost:3000/api/",
})



const app = createApp(App)
app.use(router)
app.use(BootstrapVue3)
app.use(VueGoogleMaps, {
    load: {
        key: process.env.VUE_APP_MAPS_API_KEY,
        // language: 'de',
    },
})
app.component("v-select", vSelect);



app.mount('#app')
