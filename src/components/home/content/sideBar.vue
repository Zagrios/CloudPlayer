<template>
  <div id="side-bar">
      <div id="bar" class="expanded" v-bind:class="{expand: expanded}">
          <div id="element-wrapper">
                <div class="element" v-bind:class="{expand: expanded}" @click="expanded = !expanded">
                    <BIconList class="icon"/>
                    <span>CloudPlayer</span>
                </div>

                <hr class="spacer">

                <div class="element" v-bind:class="{expand: expanded, highlight:checkPath('/home/profil')}" @click="changePath('/home/profil')">
                    <BIconPerson class="icon"/>
                    <span>Profil</span>
                </div>

                <hr class="spacer">

                <div class="element" :key="updateKey" v-bind:class="{expand: expanded, highlight:checkPath('/home/tracks')}" @click="changePath('/home/tracks')">
                    <BIconMusicNoteBeamed class="icon"/>
                    <span>Musiques</span>
                </div>

                <div class="element" v-bind:class="{expand: expanded, highlight:checkPath('/home/playlists')}" @click="changePath('/home/playlists')">
                    <BIconMusicNoteList class="icon"/>
                    <span>Playlists</span>
                </div>

                <div class="element" v-bind:class="{expand: expanded, highlight:checkPath('/home/favorites')}" @click="changePath('/home/favorites')">
                    <BIconHeart class="icon"/>
                    <span>Favoris</span>
                </div>
                
                <div class="element" v-bind:class="{expand: expanded, highlight:checkPath('/home/artists')}" @click="changePath('/home/artists')">
                    <BIconMusicNote class="icon"/>
                    <span>Artistes</span>
                </div>

                <div class="element" v-bind:class="{expand: expanded, highlight:checkPath('/home/albums')}" @click="changePath('/home/albums')">
                    <BIconDisc class="icon"/>
                    <span>Albums</span>
                </div>

                <hr class="spacer">

                <div class="element" v-bind:class="{expand: expanded, highlight:checkPath('/home/options')}" @click="changePath('/home/options')">
                    <BIconGear class="icon"/>
                    <span>Options</span>
                </div>

                <hr class="spacer">

                <div class="element" v-bind:class="{expand: expanded}" @click="logOut()">
                    <BIconBoxArrowLeft class="icon"/>
                    <span>Déconnexion</span>
                </div>
          </div>
      </div>
  </div>
</template>

<script>
import {BIconList, BIconPerson, BIconMusicNoteBeamed, BIconMusicNoteList, BIconHeart, BIconMusicNote, BIconDisc, BIconGear, BIconBoxArrowLeft} from 'bootstrap-icons-vue';
import axios from 'axios';
export default {
    data(){
        return{
            expanded: true,
            updateKey: 0,
        }
    },
    methods:{
        logOut: function(){
            this.$emit("logOut");
        },
        changePath:function(path) {
            if(path != this.$router.currentRoute.path){this.$router.push({path:path}); this.updateKey++;}
        },
        checkPath: function(path) {
            return this.$route.path.includes(path) ? true : false;
        },
		test:function(){
			axios({
				method: "POST",
				url: "http://localhost/cloudmusic_back/Objects/SpaceObject.php",
			}).then((response) => {
				console.log(response);
			});
		}
    },
    components:{BIconList, BIconPerson, BIconMusicNoteBeamed, BIconMusicNoteList, BIconHeart, BIconMusicNote, BIconDisc, BIconGear, BIconBoxArrowLeft},
}
</script>

<style lang="scss">
#side-bar{
    height: 100%;
    max-height: 100%;
    width: fit-content;
    display: flex;
    align-content: center;
    align-items: center;
    #bar{
        height: 85%;
        min-width: 60px;
        width: 60px;
        margin-right: 40px;
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
                cursor: pointer;
                position: relative;
                transition: width .3s;
                
                span{
                    margin-left: 15px;
                    left: 40px;
                    position: absolute;
                    width: 123px;
                }

                .icon{
                    fill: white;
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
            .highlight{
                background-color: #292929;
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