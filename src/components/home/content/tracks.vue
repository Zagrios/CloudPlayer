<template>
    <div id="tracks-page">
        <div id="nav-bar">
            <h1>Musiques</h1>
            <span id="search-bar">
                <input v-model="searchString" @keyup="search" type="text" placeholder="Rechercher ...">
            </span>
            <span id="upload-btn" @click="openModal">
                <BIconCloudArrowUp/>
                <span>Ajouter</span>
            </span>
        </div>
        <track-list v-bind:tracks="this.$store.getters.getTracks" :i="updateKey"></track-list>
    </div>
</template>

<script>

import tracksList from '../fragments/tracks/tracksList.vue';
import {BIconCloudArrowUp} from 'bootstrap-icons-vue';

export default {
    data(){
        return{
            updateKey:0,
            searchString: "",
        }
    },
    components:{
        'track-list':tracksList,
        BIconCloudArrowUp,
    },
    methods:{
        openModal : function(){
            this.EventBus.emit('openModal', {type:'upload'});
        },
        search:function(){
            if(!this.searchString){ this.$store.state.tracks = this.$store.state.tracks.sort(this.$func.compareName); }
            else{ this.$store.commit('setTracks', this.$func.sortArrayBySearch(this.$store.state.tracks, this.searchString));}
        }
    },
    
}
</script>

<style lang="scss">
#tracks-page{
    width: 100%;
    height: 100%;
    #nav-bar{
        display: flex;
        align-content: center;
        align-items: center;
        height: 70px;
        width: 100%;
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
        #upload-btn{
            height: 20px;
            margin-left: 15px;
            display: flex;
            align-items: center;
            align-content: center;
            background-color: #181818;
            border: solid black 0;
            border-radius: 20px;
            padding: 0 10px 0 10px;
            letter-spacing: 1px;
            cursor: pointer;
            span{
                font-size: 0.83em;
            }
            svg{
                margin-right: 7px;
                font-size: 1.15em;
            }
            &:hover{
                background-color: #202020;
            }
        }
    }
}
</style>