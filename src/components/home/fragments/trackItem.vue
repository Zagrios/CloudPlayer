<template>
    <div class="track-wrapper" @mouseover="hoverAction" @mouseleave="slideTitle = false">
        <div class="track" v-bind:style="{ backgroundImage: 'url(' + getImg() + ')' }" :key="refreshToken">
            <span class="info-btn" @click="switchInfoOpen"><b-icon-info/></span>
            <div class="info-display" :class="{'open':info, 'closed':!info}"> 
                <div class="head">
                    <span class="title" ref="titleText"><span class="title-text" v-bind:class="{slide: slideTitle}">{{getTitle}}</span></span>
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
            slideTitle:false,
        }
    },
    methods:{
        getImg: function(){
            if(this.track.img && this.track.img != ""){return this.track.img}
            else{return require("@/assets/defaultTrack.png")}
        },
        hoverAction:function()
        {
            if(this.isTitleOverflowing()){ this.slideTitle = true;}
        },
        isTitleOverflowing: function() {
            var element = this.$refs.titleText;
            return (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth)
        },
        switchInfoOpen:function(){ this.info = !this.info; console.log(this.info) }
    },
    computed:{
        getTitle(){
            if(this.track.title && this.track.title != ""){return this.track.title;}
            else{return this.track.filename;}
        },
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
        cursor: pointer;
        &:hover{
            backdrop-filter: blur(20px) brightness(30%);
        }
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
                margin-right: 3px;
                font-size: .9em;
                cursor: pointer;
                transition: all .1s ease;
                &:hover{
                    color: crimson;
                }
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

/* #region marquee */

.example1 {
 height: 50px;	
 overflow: hidden;
 position: relative;
}
.example1 h3 {
 font-size: 3em;
 color: limegreen;
 position: absolute;
 width: 100%;
 height: 100%;
 margin: 0;
 line-height: 50px;
 text-align: center;
 /* Starting position */
 -moz-transform:translateX(100%);
 -webkit-transform:translateX(100%);	
 transform:translateX(100%);
 /* Apply animation to this element */	
 -moz-animation: example1 15s linear infinite;
 -webkit-animation: example1 15s linear infinite;
 animation: example1 15s linear infinite;
}
/* Move it (define the animation) */
@-moz-keyframes example1 {
 0%   { -moz-transform: translateX(100%); }
 100% { -moz-transform: translateX(-100%); }
}
@-webkit-keyframes example1 {
 0%   { -webkit-transform: translateX(100%); }
 100% { -webkit-transform: translateX(-100%); }
}
@keyframes example1 {
 0%   { 
 -moz-transform: translateX(100%); /* Firefox bug fix */
 -webkit-transform: translateX(100%); /* Firefox bug fix */
 transform: translateX(100%); 		
 }
 100% { 
 -moz-transform: translateX(-100%); /* Firefox bug fix */
 -webkit-transform: translateX(-100%); /* Firefox bug fix */
 transform: translateX(-100%); 
 }
}

/* #endregion */

</style>