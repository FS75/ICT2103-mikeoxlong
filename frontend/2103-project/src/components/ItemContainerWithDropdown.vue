<template>
    <div class="itemContainerWithDropdown" :style="{ width: givenWidth }">
        <header>{{ text }}</header>
        <select :id=givenId @change="onChange($event)">
            <option selected disabled>Choose a {{ this.text }}</option>
            <option v-for="bus in this.buses">
                {{ bus[property] }}
            </option>
        </select>
    </div>
</template>

<script>
    export default {
        name: "ItemContainerWithDropdown",
        components: {

        },
        props: {
            text: String,
            givenId: String,
            givenWidth: String,
            buses: Object,
            busStartingStops: Object,
            property: String,
        },
        methods: {
            async onChange(event) {
                if (this.property == "ServiceNo")
                    console.log("User selected bus service: " + event.target.value);

                // for later use - starting bus stops
                //this.$parent.data.busStartingStops = await axios.get("http://localhost:3000/api/bus-starting-stops");

                // for later use - destination bus stops
                //this.$parent.data.busStartingStops = await axios.get("http://localhost:3000/api/bus-destination-stops");
            }
        }
    }
</script>

<style scoped>
    .itemContainerWithDropdown {
        margin: 10px;
        margin-top: 30px;
        width: 300px;
        height: 300px;
        background-color: lightgrey;
        border: 2px solid grey;
        border-radius: 10%;
    }
</style>