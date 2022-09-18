<template>
    <div class="itemContainerWithDropdown" :style="{width: givenWidth}" :busServicesArray="busServicesToBeReceived">
        <header>{{text}}</header>
        <select :id=givenId>
            <option selected disabled>Choose a {{this.text}}</option>
            <option v-if="this.givenId == 'busServiceContainer'" 
                    v-for="bus in this.busServicesArray.data">
                    {{ bus.ServiceNo }}
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
            busServicesToBeReceived: Object,
        },
        data() {
            return {
                busServicesArray: {
                    data: [],
                },
            }
        },
        watch: {
            busServicesToBeReceived() {
                console.log("bus services received in child");
                this.busServicesArray = this.busServicesToBeReceived;
                console.log(this.busServicesArray);
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