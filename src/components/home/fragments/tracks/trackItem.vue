<template>
    <div class="track-wrapper" @mouseover="hoverAction" @mouseleave="slideTitle = false">
        <div class="track">
            <img :src="getImg()" :key="refreshToken" @click="play"/>
            <span class="info-btn" @click="switchInfoOpen">
                <BIconInfo/>
            </span>
            <div class="info-display" :class="{'open':info, 'closed':!info}"> 
                <div class="head">
                    <span class="title" ref="titleText"><span class="title-text" v-bind:class="{slide: slideTitle}">{{getTitle()}}</span></span>
                    <span class="fav-btn" v-if="!info && track.isFav == false" @click="setFav(true)"> <BIconHeart/> </span>
                    <span class="fav-btn" v-else-if="!info && track.isFav == true" @click="setFav(false)"> <BIconHeartFill/> </span>
                    <span class="fav-btn" v-else @click="switchInfoOpen"> <BIconXCircleFill/> </span>
                </div>
                <div class="info-wrapper">
                    <span>Artiste : {{getArtist()}}</span>
                    <span>Album : {{getAlbum()}}</span>
                    <span>Qualité : {{ track.type.toUpperCase()}}</span>
                    <span>Durée : {{track.duration}}</span>
                    <span>Taille : {{track.size}}Mo</span>
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
import axios from "axios";
import { BIconInfo, BIconHeart, BIconHeartFill, BIconXCircleFill, BIconDownload, BIconTrash } from 'bootstrap-icons-vue';

export default {
    name:'trackItem',
    data(){
        return{
            refreshToken:0,
            info:false,
            slideTitle:false,
            track: this.trackP,
        }
    },
    methods:{
		play:function(){
			this.$emit('play', this.index);
		},
        download: function(){
            this.switchInfoOpen();
            var token = this.$store.getters.getToken;
            var trackId = this.track.id;
            window.location.assign("http://localhost/cloudmusic_back/user/actions/downloadTrack.php?token="+token+"&trackId="+trackId);
        },
        openDeleteTrackModal:function(){
            if(!this.isPlaylistItem){this.EventBus.emit('openModal', {type:'deleteTrack', parms:{trackId:this.track.id, title:this.getTitle()}}); return;}
            else{ this.$emit('removeFromPlaylist', this.track); }
        },
        getImg: function(){
            if(this.track.img && this.track.img != ""){return this.track.img;}
            else{return require("@/assets/defaultTrack.webp")}
        },
        getArtist: function(){
            if(this.track.artist && this.track.artist != ""){return this.track.artist;}
            else{return "Inconnu";}
        },
        getAlbum: function(){
            if(this.track.album && this.track.album != ""){return this.track.album;}
            else{return "Inconnu";}
        },
        hoverAction:function()
        {
            if(this.isTitleOverflowing()){ this.slideTitle = true;}
        },
        isTitleOverflowing: function() {
            var element = this.$refs.titleText;
            return (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth)
        },
        setFav: function(fav){
            var token = this.$store.getters.getToken;
            var trackId = this.track.id;
            var data = new FormData();
            data.append("token", token);
            data.append("trackId", trackId);
            data.append("fav",fav);
            axios.post('http://localhost/cloudmusic_back/user/actions/setTrackFav.php', data).then((response) => {
                if(response.status == 200 && response.data == 0){ this.track.isFav = fav; }
            });
        },
        getTitle(){
            if(this.track.title && this.track.title != ""){return this.track.title;}
            else{return this.track.filename;}
        },
        switchInfoOpen:function(){ this.info = !this.info; },
    },
    props:{trackP: Object, isPlaylistItem:{type: Boolean, default:false}, index:Number,},
    mounted(){
        if(this.track.img != null){return}
        var token = this.$store.getters.getToken;
        var trackId = this.track.id;
        axios({
			method: "GET",
			url: "http://localhost/cloudmusic_back/user/actions/getTrackImg.php?token="+token+"&trackId="+trackId,
		}).then((response) => {
            var res = response.data;
			if (response.status == 200 && res.status == 0) 
			{
                this.track.img = res.img;
                this.refreshToken++;
			}
		});
    },
    components:{
        BIconInfo, BIconHeart, BIconHeartFill, BIconXCircleFill, BIconDownload, BIconTrash,
    }
}
</script>

<style lang='scss' scoped>

.track-wrapper{
    width: 220px;
    height: 220px;
    max-height: 220px;
    max-width: 220px;
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    .track{
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

.track{
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
        align-items: center;
        justify-content: center;
        color: white;
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
            height: 10%;
            width: 100%;
            display: flex;
            align-items: center;
            align-content: center;
            justify-content: space-between;
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
                    height: 100%;
                }
                .slide{
                    transform: translateX(calc(-100% + 187px));
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
    top: 90%;
    transition: all .2s ease;
}

</style>