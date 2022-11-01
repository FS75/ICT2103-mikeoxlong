<template>
  <div class="columnContainer overviewContainer"> 
    <div class="rowContainer">
      <div class="columnContainer">
        
      </div>

      <div class="columnContainer">
        <h2>sm2</h2>
        <button>
          Update
        </button>
      </div>  
    </div>
    
  </div>    
</template>

<script>
export default {
  name: "AdminView",
  props: {
    text: String,
    givenId: String,
    busServices: Object,
  }
}
</script>

<style scoped>
.rowContainer {
  gap: 100px;
}
</style>
