<template>
  <div>
    <Header/>
    <Search></Search>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from '@/components/Header/HeaderTollgate.vue';
import Search from '@/components/Search/Search.vue';
export default {
  name: 'App',
  components: {
    Header,
    Search
  }
}
</script>
<style lang="scss">

* {
  margin: 0;
  padding: 0;
}

/* Add Flexbox css */ 
.flex-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.flex-container > div {
  padding-right: 0px;
}
/* Flexbox css ends */ 

/* Text box css */
.textBox {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
/* Text box css ends */

button:hover,
button:focus {
  background-color: teal;
}

button {
  background-color: #0096FF;
  border: none;
  color: white;
  padding: 12px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

.disabledAccess {
    cursor: not-allowed;
}

.required:after {
    content:" *";
    color: red;
}

/* .card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
} */

</style>