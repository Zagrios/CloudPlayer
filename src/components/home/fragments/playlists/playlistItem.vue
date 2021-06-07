<template>
	<div class="playlist-wrapper" @mouseover="hoverAction" @mouseleave="slideTitle = false">
        <div class="playlist">
            <img :src="getImg" @click="test"/>
            <span class="info-btn" @click="switchInfoOpen">
                <BIconInfo/>
            </span>
            <div class="info-display" :class="{'open':info, 'closed':!info}"> 
                <div class="head">
					<BIconPlayFill class="play-btn"/>
                    <span class="title" ref="titleText"><span class="title-text" v-bind:class="{slide: slideTitle}">{{playlist.name}}</span></span>
                </div>
                <div class="info-wrapper">
                    <span>Artiste : </span>
                    <span>Album : </span>
                    <span>Qualité : </span>
                    <span>Durée : </span>
                    <span>Taille : Mo</span>
                </div>
                <div class="actions">
                        <span class="download" title="Télécharger" @click="download"> <BIconDownload/> </span>
                        <span class="delete" title="Supprimer" @click="openDeleteTrackModal"> <BIconTrash/> </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BIconInfo, BIconDownload, BIconTrash, BIconPlayFill } from 'bootstrap-icons-vue';

export default {
	data(){
		return{
			slideTitle: false,
			info: false,
			playlist: this.playlistP,
		}
	},
	methods:{
		hoverAction:function(){
            if(this.isTitleOverflowing()){ this.slideTitle = true;}
        },
		isTitleOverflowing: function() {
            var element = this.$refs.titleText;
            return (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth)
        },
        test:function(){
            this.$emit('openFolder', this.playlist)
        }
	},
	computed:{
		getImg:function(){
			if(!this.playlist.tracks){return require("@/assets/defaultTrack.webp");}
			var l = this.playlist.tracks.length;
			for(var i = 0; i < l; i++){
				if(this.playlist.tracks[i].img && this.playlist.tracks[i].img != ""){ return this.playlist.tracks[i].img; } 
			}
			return require("@/assets/defaultTrack.webp");
		}
	},
	props:['playlistP'],
	beforeMount(){
		if(!this.playlist.tracks){return;}
        if(this.playlist.tracks[0].filename){return;}
		var len = this.playlist.tracks.length;
		var globalTracks = this.$store.getters.getTracks;
		var globalLen = globalTracks.length;
        var finalTracks = Array();
		for(var i = 0; i < len; i++){
			var trackId = this.playlist.tracks[i];
			for(var j = 0; j < globalLen; j++){
				if(trackId == globalTracks[j].id){finalTracks.push(globalTracks[j])}
			}
		}
        this.playlist.tracks = finalTracks;
	},
	components:{ BIconInfo, BIconDownload, BIconTrash, BIconPlayFill }
}
</script>

<style lang='scss' scoped>

.playlist-wrapper{
	width: 220px;
    height: 220px;
    max-height: 220px;
    max-width: 220px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    .playlist{
        overflow: hidden;
        width: 200px;
        height: 200px;
        transition: all .1s ease; 
        position: relative;
        &:hover{
            width: 210px;
            height: 210px;
        }
        img{
            position: absolute;
            max-height: 100%;
            max-width: 100%;
            min-height: 100%;
            min-width: 100%;
            object-fit:cover;
            border-style: none;
            top: 0;
            left: 0;
        }
    }
}

.playlist{
    .info-btn{
        width: 20px;
        height: 20px;
        backdrop-filter: blur(20px) brightness(70%);
        position: absolute;
        top: 3px;
        right: 3px;
        border: solid white 0px;
        border-radius: 100%;
        display: flex;
        align-content: center;
        justify-content: center;
        font-size: 1.1em;
        cursor: pointer;
        &:hover{
            backdrop-filter: blur(20px) brightness(30%);
        }
    }

	.info-display{
        position: absolute;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        width: 100%;
        height: 100%;
        backdrop-filter: blur(10px) brightness(75%);
        .head{
            position: relative;
            height: 20%;
            width: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: space-between;
			.play-btn{
				font-size: 2.5em;
				cursor: pointer;
			}
            .title{
                position: relative;
                overflow: hidden;
                height: 100%;
                width: 90%;
                max-width: 90%;
                letter-spacing: 1px;
                font-size: .9em;
                .title-text{
                    white-space: nowrap;
                    text-overflow: clip;
                    position: absolute;
					display: flex;
					align-content: center;
					align-items: center;
                    height: 100%;
                }
                .slide{
                    transform: translateX(calc(-100% + 168px));
                    transition: all 1s linear;
                }
            }
            .fav-btn{
                height: 100%;
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                padding-right: 3px;
                font-size: .9em;
                cursor: pointer;
                transition: all .1s ease;
                &:hover{
                    color: crimson;
                }
            }
        }
        .info-wrapper{
            margin-top: 10px;
            width: 100%;
            height: 125px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: .85em;
            span{
                max-width: 100%;
                margin-left: 5px;
                letter-spacing: 1px;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
            }
            
        }
        .actions{
                width: 100%;
                height: 25px;
                overflow: hidden;
                display: flex;
                align-items: center;
                align-content: center;
                justify-content: center;
                border-top: rgba(0, 0, 0, 0.329) solid 1px;
                span{
                    display: flex;
                    align-items: center;
                    align-content: center;
                    justify-content: center;
                    width: 50%;
                    height: 100%;
                    margin: 0;
                    padding: 0;
                    font-size: 1.3em;
                    transition: background-color .1s ease;
                    &:hover{background-color: rgba(0, 0, 0, 0.329);}
                }
        }
    }
}


.open{
    top: 0;
    transition: all .2s ease;
}

.closed{
    top: 80%;
    transition: all .2s ease;
}

</style>