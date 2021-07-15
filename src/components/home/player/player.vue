<template>
    <div id="player">
		<audio ref="audio" src="" @timeupdate="updateTime" @ended="musicEnded"></audio>
        <div id="range-wrapper">
			<span class="range-background"></span>
            <span class="range-fill" v-bind:style="{width:rangeValue/10+'%'}"></span>
            <input type="range" name="timeline" id="timeline" min="0" max="100" step="1" @change="changeTime">
        </div>
        <div id="elements">
            <div id="track">
                <img id="track-image" :src="getImgUrl">
                <div id="info-wrapper">
                    <span id="title">{{getTitle()}}</span>
                    <span id="artist">{{getArtist()}}</span>
                    <span id="album">{{getAlbum()}}</span>
                </div>
            </div>
            
            <div id="controls">
                <div id="controls-wrapper">
                    <BIconShuffle class="control font-fourth" @click="shuffle = !shuffle" :class="{active: shuffle}"/>
                    <BIconSkipStartFill class="control font-second" @click="previous"/>
                    <BIconPlayFill class="control font-main" v-if="!playing" @click="playing = !playing"/>
                    <BIconPauseFill class="control font-main" v-else @click="playing = !playing" />
                    <BIconSkipEndFill class="control font-second" @click="next"/>
                    <BIconArrowRepeat class="control font-third" @click="setLoop" :class="{active: loop}"/>
                </div>
                
            </div>
            <div id="volume">
                <div id="volume-wrapper">
                    <div class="duration">{{getCurrentTime()}} / {{getDuration()}}</div>
                    <BIconVolumeMuteFill class="control" v-if="volume == 0" @click="volume = tempVolume"/>
                    <BIconVolumeDownFill class="control" v-else-if="volume < 75" @click="tempVolume = volume ;volume = 0"/>
                    <BIconVolumeUpFill class="control" v-else @click="tempVolume = volume ;volume = 0"/>
                    <div id="range-volume-wrapper">
                        <span class="range-fill" v-bind:style="{width:volume+'%'}"></span>
                        <input type="range" name="volume" id="volume-range" min="0" max="100" step="1" v-model="volume" @change="setVolume">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { BIconShuffle, BIconSkipStartFill, BIconPlayFill, BIconPauseFill, BIconSkipEndFill, BIconArrowRepeat, BIconVolumeMuteFill, BIconVolumeDownFill, BIconVolumeUpFill } from 'bootstrap-icons-vue';
import { mapGetters } from "vuex";

export default {
    data(){
        return{
			audio: null,
            playing:false,
            loop:false,
            shuffle:false,
            rangeValue:0,
            volume:0,
            tempVolume: 0,
			currentTrackIndex : -1,
			playlist: Array(),
			originalPlaylist: Array(),
			updateKey:0,
			deleting:false,
        }
    },
	methods:{
		play: function(track){
			this.updateKey++;
			this.audio.pause();
			var token = this.$store.getters.getToken;
			var url = "http://localhost/cloudmusic_back/user/actions/playSong.php?token="+token+"&trackId="+track.id;
			this.audio.src = url;
			this.audio.volume = this.volume / 100;
			this.audio.play();
			this.playing = true;
		},
		
		getTitle:function(){
			if(!this.playlist || this.playlist.length == 0 || this.currentTrackIndex == -1){ return "Titre"; }
			if(this.currentTrackIndex != -1 && this.playlist[this.currentTrackIndex] && this.playlist[this.currentTrackIndex].title && this.playlist[this.currentTrackIndex].title != ""){ return this.playlist[this.currentTrackIndex].title}
			return this.playlist[this.currentTrackIndex].filename;
		},
		getArtist:function(){
			if(!this.playlist || this.playlist.length == 0 || this.currentTrackIndex == -1){return "Artiste";}
			return this.playlist[this.currentTrackIndex].artist ? this.playlist[this.currentTrackIndex].artist : "Artiste";
		},
		getAlbum:function(){
			if(!this.playlist || this.playlist.length == 0 || this.currentTrackIndex == -1){return "Album";}
			return this.playlist[this.currentTrackIndex].album ? this.playlist[this.currentTrackIndex].album : "Album";
		},
		getDuration:function(){
			if(!this.playlist || this.playlist.length == 0 || this.currentTrackIndex == -1){return "00:00";}
			function pad(n, z) { z = z || 2; return ('00' + n).slice(-z); }
			var times = this.playlist[this.currentTrackIndex].duration.split(':');
			if(times.length <= 2){times.unshift('00')}
			var humanized = [pad(times[0], 2), pad(times[1], 2), pad(times[2], 2),];
			humanized = humanized[0] == '00' ? humanized.splice(1, 2).join(':') : humanized.join(':');
			return humanized;

		},
		getCurrentTime:function(){
			if(!this.playlist || this.playlist.length == 0 || this.currentTrackIndex == -1){return "00:00";}
			var track = this.playlist[this.currentTrackIndex];
			var ms = this.stringTimeToMs(track.duration) * (this.rangeValue / 1000);
			if(isNaN(ms) ||ms <= 1000){return "00:00"}
			function pad(n, z) { z = z || 2; return ('00' + n).slice(-z); }
			const seconds = Math.floor((ms / 1000) % 60);
            const minutes = Math.floor((ms / 1000 / 60) % 60);
            const hours = Math.floor((ms  / 1000 / 3600 ) % 24);
            var humanized = [pad(hours.toString(), 2), pad(minutes.toString(), 2), pad(seconds.toString(), 2),];
            humanized = humanized[0] == '00' ? humanized.splice(1, 2).join(':') : humanized.join(':');
            return humanized;
		},
		updateTime:function(){
			var ratio = this.audio.duration / this.audio.currentTime;
			var percent = 100 / ratio;
			this.rangeValue = percent * 10;
			this.getCurrentTime();
		},
		changeTime:function(target){
			console.log(this.audio.duration);
			console.log(Math.round(this.audio.duration * target.target.value/100))
			this.audio.currentTime = String(Math.round(this.audio.duration * target.target.value/100));
			console.log(this.audio.currentTime);
		},
		musicEnded:function(){
			if(!this.loop){return;}
			var index = this.currentTrackIndex + 1;
			console.log(this.currentTrackIndex+" "+index);
			if(index >= this.playlist.length){ this.currentTrackIndex = 0; }
			else{ this.currentTrackIndex = index; }
		},
		stringTimeToMs(time){
			const conversionTable = {seconds: 1000,minutes: 60*1000,hours: 60*60*1000,days: 24*60*60*1000,};
            const convertTime = (opts) => Object.keys(opts).reduce((fin, timeKey) => (fin + opts[timeKey] * conversionTable[timeKey]), 0);
            var times = time.split(':');
			times = times.map(t => Number(t));
            return times.length <= 2 ? convertTime({hours : 0, minutes: times[0], seconds: times[1]}) : convertTime({hours : times[0], minutes: times[1], seconds: times[2]});
		},
		next:function(){
			if(this.currentTrackIndex + 1 >= this.playlist.length){this.currentTrackIndex = 0;}
			else {this.currentTrackIndex++}
		},
		previous:function(){
			if(this.currentTrackIndex - 1 < 0){this.currentTrackIndex = this.playlist.length-1;}
			else {this.currentTrackIndex--}
		},
		shufflePlaylist:function(){
			if(!this.playlist || this.playlist.length <= 0){return;}
			var currentTrack = this.playlist[this.currentTrackIndex];
			this.$func.shuffle(this.playlist);
			var newIndex = this.playlist.map(e => e.id).indexOf(currentTrack.id);
			if(this.currentTrackIndex != newIndex){
				var tempTrack = this.playlist[this.currentTrackIndex];
				this.playlist[this.currentTrackIndex] = currentTrack;
				this.playlist[newIndex] = tempTrack;
			}
		},
		unshufflePlaylist:function(){
			if(!this.playlist || this.playlist.length <= 0){return;}
			var currentTrack = this.playlist[this.currentTrackIndex];
			this.playlist = [...this.originalPlaylist];
			console.log(this.currentTrackIndex);
			console.log(this.originalPlaylist);
			console.log(this.playlist);
			this.currentTrackIndex = this.playlist.map(e => e.id).indexOf(currentTrack.id);
		},
		setLoop:function(){
			this.loop = !this.loop;
			localStorage.setItem("loop", this.loop);
		},
		trackStillExist:function(index){
			return this.$store.getters.getTracks.map(e => e.filename).indexOf(this.playlist[index].filename) == -1 ? false : true;
		},
		removeTrack:function(index){
			this.deleting = true;
			var filename = this.playlist[index].filename;
			this.playlist.splice(index, 1);
			this.originalPlaylist.splice(this.originalPlaylist.map(e => e.filename).indexOf(filename), 1);
			this.deleting = false;
		}
	},
	computed:{ 
		...mapGetters(["getCurrentPlaylist"]), 
		getImgUrl:function(){
			if(!this.playlist[this.currentTrackIndex]){return require("@/assets/defaultTrack.webp")}
			var quality = localStorage.getItem("thumbnails_quality") ? localStorage.getItem("thumbnails_quality") : 50;
			console.log("AHH");
			return "http://localhost/cloudmusic_back/user/actions/getTrackImg.php?token="+this.$store.getters.getToken+"&trackId="+this.playlist[this.currentTrackIndex].id+"&quality="+quality;
		},
	},
	watch:{
        getCurrentPlaylist:{
            handler(){
				if(this.deleting){ return; }
				this.playing = false;
				if(!this.$store.getters.getCurrentPlaylist || this.$store.getters.getCurrentPlaylist.length <= 0 || !this.$store.getters.getCurrentPlaylist[0].id){return;}
				this.playlist = this.$store.getters.getCurrentPlaylist;
				this.originalPlaylist = [...this.playlist];
				this.currentTrackIndex = -1;
				this.currentTrackIndex = this.$store.getters.getIndexStartToPlay;
				if(this.shuffle){this.shufflePlaylist();}
            }
        },
		currentTrackIndex:{
			deep:true,
			handler(){
				if(this.currentTrackIndex == -1 || this.currentTrackIndex >= this.playlist.length){return;}
				if(!this.trackStillExist(this.currentTrackIndex)){ this.removeTrack(this.currentTrackIndex); }
				var token = this.$store.getters.getToken;
				var url = "http://localhost/cloudmusic_back/user/actions/playSong.php?token="+token+"&trackId="+this.playlist[this.currentTrackIndex].id;
				if(this.audio.src == url){return;}
				this.play(this.playlist[this.currentTrackIndex]);
			}
		},
		playing:{
			deep: true,
			handler(){
				if(this.playing == false){ this.$refs.audio.pause(); }
				else { this.$refs.audio.play(); }
			}
		},
		volume:{
			deep: true,
			handler(){
				if(!this.audio){return;}
				this.audio.volume = this.volume / 100;
				localStorage.setItem("playerVolume", this.volume);
			}
		},
		shuffle:{
			deep:true,
			handler(){
				if(this.shuffle){this.shufflePlaylist();}
				else{this.unshufflePlaylist();}
				localStorage.setItem("shuffle", this.shuffle);
			}
		}
    },
	mounted(){
		this.audio = this.$refs.audio;
	},
	created(){
		this.volume = localStorage.getItem("playerVolume") ? localStorage.getItem("playerVolume") : 50;
		this.shuffle = localStorage.getItem("shuffle") ? localStorage.getItem("shuffle") : false;
		this.loop = localStorage.getItem("loop") ? localStorage.getItem("loop") : false;
	},
    components:{BIconShuffle, BIconSkipStartFill, BIconPlayFill, BIconPauseFill, BIconSkipEndFill, BIconArrowRepeat, BIconVolumeMuteFill, BIconVolumeDownFill, BIconVolumeUpFill},
}
</script>

<style lang="scss">
    #player{
        width: 100%;
        height: 75px;
        min-height: 75px;
        position: fixed;
        bottom: 0;
        background-color: #181818;
        display: flex;
        align-items: center;
        align-content: center;
        flex-direction: column;
        overflow: hidden;
        margin: 0;
        padding: 0;
        #range-wrapper{
            position: relative;
            width: 100%;
            height: .05em;
            margin: 0;
            padding: 0;
            top: 0;
			.range-background{
                position: absolute;
				width: 100%;
                top: 0;
                left: 0;
                height: .05em;
                display: block;
                background-color: rgba(90, 90, 90, 0.459);
                z-index: -1;
				transition: all .1s ease;
            }
            .range-fill{
                position: absolute;
                top: 0;
                left: 0;
                height: .05em;
                display: block;
                background-color: rgb(0, 254, 255);
				transition: all .1s ease;
            }
            #timeline{
                margin: 0;
                position: absolute;
                top: 0;
                display: block;
                height: .05em;
				z-index: 1;
				opacity: 0;
                
            }
        }
        #elements{
            height: 100%;
            width: 100%;
            display: flex;
            align-content: center;
            align-items: center;
            justify-content: space-between;
            #track, #controls,  #volume{
                height: 100%;
                width: 280px;
                color: white;
            }
            #track{
                #track-image{
                    height: 100%;
					max-width: 75px;
					object-fit:cover;
					border-style: none;
                    float: left;
                }
                #info-wrapper{
                    height: 100%;
                    display: flex;
                    justify-content: space-evenly;
                    flex-direction: column;
                    padding-left: 10px;
                    span{
                        width: 600px;
                        letter-spacing: 1px;
                        overflow-wrap: normal;
                        
                    }
                    #artist, #album{
                        color: rgb(126, 126, 126);
                        font-size: .8em;
                    }
                }
                
            }
            #controls{
                #controls-wrapper{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    align-content: center;
                    justify-content: center;
                }
            }
            #volume{
                #volume-wrapper{
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    align-content: center;
                    justify-content: center;
                    .control{
                        font-size: 1.6em;
                    }
                    #range-volume-wrapper{
                        position: relative;
                        height: 4px;
                        width: 40%;
                        .range-fill{
                            position: absolute;
                            top: 0;
                            left: 0;
                            height: 4px;
                            display: block;
                            background-color: white;
                            z-index: 1;
                            border: solid 0 black;
                            border-radius: 100px;
                        }
                        #volume-range{
                            margin: 0;
                            position: absolute;
                            top: 0;
                            display: block;
                            height: 4px;
                        }
                    }
                    .duration{
						font-family: monospace;
						width: 100px;
                        font-size: 1em;
                        margin-right: 5px;
						text-align: right;
                    }
                }
            }
        }
        .active{
            color: rgb(0, 254, 255);
        }
        .control{
			cursor: pointer;
            margin-left: 8px;
            margin-right: 8px;
            &:hover{
                color: rgb(0, 254, 255);
            }
        }
        .font-main{
            font-size: 2.7em;
        }
        .font-second{
            font-size: 1.6em;
        }
        .font-third{
            font-size: 1.4em;
        }
        .font-fourth{
            font-size: 1.2em;
        }
        
    }



//Range style :

#range-wrapper{


    input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
        border-radius: 100%;
        margin-bottom: 7px;
    }
    input[type=range]::before{
        height: .2em;
        background-color: chartreuse;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent; 
        border-color: transparent;
        color: transparent;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 7px;
        width: 7px;
        border-radius: 100%;
        background: none;
        cursor: pointer;
    }
    input[type=range]::-moz-range-thumb {
        border: 1px solid #000000;
        height: 10px;
        width: 10px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
    }
    input[type=range]::-ms-thumb {
        border: 1px solid #000000;
        height: 10px;
        width: 10px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
    }


    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: .06em;
        cursor: pointer;
        background: rgba(90, 90, 90, 0.459);
        border : solid black 0;
        border-radius: 100px;
    }

    input[type=range]::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: #3071a9;
    }
}

#range-volume-wrapper{
    input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
        border-radius: 100%;
        margin-bottom: 7px;
    }
    input[type=range]::before{
        height: .2em;
        background-color: chartreuse;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
    }
    input[type=range]:focus {
        outline: none;
    }
    input[type=range]::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent; 
        border-color: transparent;
        color: transparent;
    }

    input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: inherit;
        height: 8px;
        width: 8px;
        border-radius: 100%;
        background: #ffffff;
        margin-top: -2px;
        cursor: pointer;
    }
    input[type=range]::-moz-range-thumb {
        border: 1px solid #000000;
        height: 10px;
        width: 10px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
    }
    input[type=range]::-ms-thumb {
        border: 1px solid #000000;
        height: 10px;
        width: 10px;
        border-radius: 100%;
        background: #ffffff;
        cursor: pointer;
    }


    input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: rgba(90, 90, 90, 0.438);
        border : solid black 0;
        border-radius: 100px;
    }

    input[type=range]::-moz-range-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: #3071a9;
    }
}
</style>