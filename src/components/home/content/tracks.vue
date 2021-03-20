<template>
  <div id="tracks">
      <div id="nav-bar">
          <h1>Musiques</h1>
          <span id="search-bar">
              <input type="text" name="" id="" placeholder="Rechercher ...">
          </span>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
#tracks{
    #nav-bar{
        display: flex;
        align-content: center;
        align-items: center;
        height: 70px;
        padding-top: 6px;
        h1{
            float: left;
            letter-spacing: 1px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 5px;
            margin-right: 20px;
        }
        #search-bar{
            display: flex;
            align-items: center;
            align-content: center;
            background-color: #181818;
            height: 20px;
            width: 250px;
            border: 0 solid black;
            border-radius: 20px;
            padding-left: 7px;
            color: rgb(129, 129, 129);
            input[type=text]{
                width: 100%;
                background-color: rgba($color: #000000, $alpha: 0.0);
                border: 0;
                letter-spacing: 1px;
                outline: none;
                color:inherit
            }
        }
    }
}
</style>