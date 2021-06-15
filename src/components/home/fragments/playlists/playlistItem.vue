<template>
	<div class="playlist-wrapper" @mouseover="hoverAction" @mouseleave="slideTitle = false">
        <div class="playlist">
            <img :src="getImg" @click="openFolder"/>
            <span class="info-btn" @click="switchInfoOpen">
                <BIconInfo/>
            </span>
            <div class="info-display" :class="{'open':info, 'closed':!info}"> 
                <div class="head">
					<BIconPlayFill class="play-btn"/>
                    <span class="title" ref="titleText"><span class="title-text" v-bind:class="{slide: slideTitle}">{{playlist.name}}</span></span>
                    <span class="close-btn" v-if="info" @click="switchInfoOpen"><BIconXCircleFill/></span>
                </div>
                <div class="info-wrapper">
                    <span>Musiques : {{nbTracks}}</span>
                    <span>Durée : {{totalLength}}</span>
                    <span>Taille : {{totalSize}}</span>
                </div>
                <div class="actions">
                        <span class="download" title="Télécharger" @click="download"> <BIconDownload/> </span>
                        <span class="delete" title="Supprimer" @click="clickDeleteButton"> <BIconTrash/> </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BIconInfo, BIconDownload, BIconTrash, BIconPlayFill, BIconXCircleFill } from 'bootstrap-icons-vue';

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
        openFolder:function(){
            this.$emit('openFolder', this.playlist);
        },
        clickDeleteButton:function(){
            this.$emit('clickDeleteButton', this.playlist);
        },
        download:function(){
            this.$emit('download', this.playlist);
        },
        switchInfoOpen:function(){ this.info = !this.info; },
	},
	computed:{
		getImg:function(){
			if(!this.playlist.tracks || this.playlist.tracks.length <= 0){return require("@/assets/defaultTrack.webp");}
			var l = this.playlist.tracks.length;
			for(var i = 0; i < l; i++){
				if(this.playlist.tracks[i].img && this.playlist.tracks[i].img != ""){ return this.playlist.tracks[i].img; } 
			}
			return require("@/assets/defaultTrack.webp");
		},
        nbTracks:function(){
            return this.playlist.tracks ? this.playlist.tracks.length : 0;
        },
        totalLength:function(){
            if(this.nbTracks <= 0){ return '00:00'; }
            function pad(n, z) { z = z || 2; return ('00' + n).slice(-z); }
            const conversionTable = {seconds: 1000,minutes: 60*1000,hours: 60*60*1000,days: 24*60*60*1000,};
            const convertTime = (opts) => Object.keys(opts).reduce((fin, timeKey) => (fin + opts[timeKey] * conversionTable[timeKey]), 0);
            var totalMs = 0;
            this.playlist.tracks.forEach(track => {
                if(track.duration){
                    var arr = [0, 0, 0];
                    var times = track.duration.split(':').reverse();
                    for(var i = 0; i < times.length; i++){ arr[i] = Number(times[i]);}
                    arr.reverse();
                    totalMs += convertTime({hours : arr[0], minutes: arr[1], seconds: arr[2]});
                }
                
            });
            const seconds = Math.floor((totalMs / 1000) % 60);
            const minutes = Math.floor((totalMs / 1000 / 60) % 60);
            const hours = Math.floor((totalMs  / 1000 / 3600 ) % 24)
            var humanized = [pad(hours.toString(), 2), pad(minutes.toString(), 2), pad(seconds.toString(), 2),];
            humanized = humanized[0] == '00' ? humanized.splice(1, 2).join(':') : humanized.join(':');
            return humanized;
        },
        totalSize:function(){
            if(this.nbTracks <= 0){ return "Vide"; }
            var totalMo = 0
            this.playlist.tracks.forEach(track => {
                totalMo += parseFloat(track.size);
            })
            if(totalMo >= 1000){ return Math.round((totalMo / 1000) * 100)/100+"Go"; }
            return Math.round(totalMo*100)/100+"Mo";
        }
	},
	props:['playlistP'],
	beforeMount(){
        this.$func.asignTrackToPlaylist(this.$store.getters.getTracks, this.playlist);
	},
	components:{ BIconInfo, BIconDownload, BIconTrash, BIconPlayFill, BIconXCircleFill }
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
            .close-btn{
                position: absolute;
                right: 5px;
                top: 5px;
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                font-size: .9em;
                cursor: pointer;
                transition: all .1s ease;
                &:hover{
                    color: crimson;
                }
            }
        }
        .info-wrapper{
            width: 100%;
            height: 80px;
            margin-bottom: 15px;
            display: flex;
            flex-direction: column;
            font-size: .85em;
            span{
                max-width: 100%;
                margin-bottom: 10px;
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