<template>
    <div class="track-wrapper">
        <div class="track" v-bind:style="{ backgroundImage: 'url(' + getImg() + ')' }" :key="refreshToken">
            <span class="info-btn"><b-icon-info/></span>
            <div class="info-display" :class="{'open':info, 'closed':!info}"> 
                <div class="head">
                    <span class="title">{{this.track.name}}</span>
                    <span class="fav-btn"><b-icon-heart/></span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import {BIconInfo, BIconHeart} from 'bootstrap-vue';

export default {
    name:'trackItem',
    data(){
        return{
            refreshToken:0,
            info:false,
        }
    },
    methods:{
        getImg: function(){
            if(this.track.img && this.track.img != ""){return this.track.img}
            else{return require("@/assets/defaultTrack.png")}
        }
    },
    computed:{
        
    },
    props:{
		track:Object(),
	},
    created(){
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
        BIconInfo, BIconHeart
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
        background-size: cover;
        transition: all .1s ease; 
        position: relative;
        &:hover{
            width: 210px;
            height: 210px;
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
    }
    .info-display{
        position: absolute;
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
                height: 100%;
                letter-spacing: 1px;
                font-size: .9em;
                text-overflow: clip;
            }
            .fav-btn{
                height: 100%;
                display: flex;
                justify-content: center;
                align-content: center;
                align-items: center;
                margin-right: 3px;
                font-size: .9em;
            }
        }
    }
}

.open{
    top: 0;
}

.closed{
    top: 90%;
}

</style>