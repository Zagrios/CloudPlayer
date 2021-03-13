<template>
  <div id="nav-bar">
      <div id="bar" class="expanded" v-bind:class="{expand: expanded}">
          <div id="element-wrapper">
                <div class="element" v-bind:class="{expand: expanded}" @click="expanded = !expanded">
                    <b-icon-list class="icon"></b-icon-list>
                    <span>CloudPlayer</span>
                </div>

                <hr class="spacer">

                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-person class="icon"></b-icon-person>
                    <span>Profil</span>
                </div>

                <hr class="spacer">

                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-music-note-beamed class="icon"></b-icon-music-note-beamed>
                    <span>Musiques</span>
                </div>

                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-music-note-list class="icon"></b-icon-music-note-list>
                    <span>Playlistes</span>
                </div>

                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-heart class="icon"></b-icon-heart>
                    <span>Favorits</span>
                </div>
                
                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-music-note class="icon"></b-icon-music-note>
                    <span>Artistes</span>
                </div>

                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-disc class="icon"></b-icon-disc>
                    <span>Albums</span>
                </div>

                <hr class="spacer">

                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-gear class="icon"></b-icon-gear>
                    <span>Options</span>
                </div>

                <hr class="spacer">

                <div class="element" v-bind:class="{expand: expanded}">
                    <b-icon-box-arrow-left class="icon"></b-icon-box-arrow-left>
                    <span>Déconnexion</span>
                </div>
          </div>
      </div>
  </div>
</template>

<script>

import {BIconList, BIconPerson, BIconMusicNote, BIconHeart, BIconMusicNoteList, BIconDisc, BIconMusicNoteBeamed, BIconGear, BIconBoxArrowLeft} from 'bootstrap-vue';

export default {
    data(){
        return{
            expanded: true,
        }
    },
    methods:{

    },
    components:{
        BIconList,
        BIconPerson,
        BIconMusicNote,
        BIconHeart,
        BIconMusicNoteList,
        BIconDisc,
        BIconMusicNoteBeamed,
        BIconGear,
        BIconBoxArrowLeft,
    }
}
</script>

<style lang="scss">
#nav-bar{
    height: 100%;
    width: fit-content;
    display: flex;
    align-content: center;
    align-items: center;
    #bar{
        height: 80%;
        min-width: 60px;
        width: 60px;
        background-color: #181818;
        border-right: 1px solid #363636;
        border-top: 1px solid #363636;
        border-bottom: 1px solid #363636;
        border-top-right-radius: 7px;
        border-bottom-right-radius: 7px;
        overflow: hidden;
        transition: all .3s;
        #element-wrapper{
            display: flex;
            flex-direction: column;
            align-items: center;
            align-content: center;
            padding-top: 5px;

            .element{
                margin-top: 6px;
                margin-bottom: 6px;
                height: 45px;
                min-width: 45px;
                width: 45px;
                border: 0 solid black;
                border-radius: 7px;
                //background-color: #292929;
                display: flex;
                align-content: center;
                align-items: center;
                flex-direction: row;
                overflow: hidden;
                letter-spacing: 1px;
                position: relative;
                transition: width .3s;
                
                span{
                    margin-left: 15px;
                    left: 40px;
                    position: absolute;
                    width: 123px;
                }

                .icon{
                    height: 25px;
                    width: 25px;
                    margin-left: 10px;
                    
                }
                
                &:hover{
                    background-color: #292929;
                }
                
            }
            .expand{
                width: 185px;
            }
            .spacer{
                margin-top: 5px;
                margin-bottom: 5px;
            }
        }
    }
    #bar.expand{
        width: 200px;
    }
}
</style>