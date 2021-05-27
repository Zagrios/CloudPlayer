<template>
  <div id="track-list">
      <trackItem v-for="(track,index) in this.$store.getters.getTracks" v-bind:key="index" :track="track"></trackItem>
  </div>
</template>

<script>
import trackItem from "./trackItem";

export default {
    name:'tracksList',
    props:{
        tracks:Array(),
    },
    components:{
        trackItem,
    }
}
</script>

<style lang='scss' scoped>

#track-list{
    width: 100%;
    max-height: calc(100% - 75px);
    display: flex;
    flex-direction: row;
    flex-flow: row wrap;
    overflow-x: hidden;
    overflow-y: scroll;
}

/* #region scrollbar*/

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #838383;
  border: solid black 0;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background: rgb(75, 75, 75);
  border: solid black 0;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* #endregion */

</style>