<template>
  <div id="trackItemModal" :class="{'unselected': !selected, 'selected':selected}" @click="setSelected()">
      <img v-lazy="{src:getImgUrl(), loading:require('@/assets/defaultTrack.webp'), error:require('@/assets/defaultTrack.webp')}">
      <div class="info">
          <span class="title">{{getTitle()}}</span>
          <span class="artist">{{getArtist()}}</span>
          <span class="album">{{getAlbum()}}</span>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            track: this.trackP,
            selected: false,
        }
    },
    props:['trackP', 'selectedP'],
    methods:{
        getImgUrl:function(){
			var quality = localStorage.getItem("thumbnails_quality") ? localStorage.getItem("thumbnails_quality") : 50;
			return "http://localhost/cloudmusic_back/user/actions/getTrackImg.php?token="+this.$store.getters.getToken+"&trackId="+this.track.id+"&quality="+quality;
		},
        setSelected: function(){
            this.selected = !this.selected;
            this.$emit('clickTrack', this.track.id, this.selected);
        },
        getTitle(){
            if(this.track.title && this.track.title != ""){return this.track.title;}
            return this.track.filename;
        },
        getArtist: function(){
            if(this.track.artist && this.track.artist != ""){return this.track.artist;}
            return "";
        },
        getAlbum: function(){
            if(this.track.album && this.track.album != ""){return this.track.album;}
            return "";
        },
    },
    created(){
        if(this.selectedP){this.setSelected();}
    },
}
</script>

<style lang='scss' scoped>

#trackItemModal{
    cursor: pointer;
    display: flex;
    width: calc(100% - 20px);
    height: 50px;
    margin-top: 5px;
    margin-left: 10px;
    background-color: #212121;
    overflow: hidden;
    border-radius: 10px;
    transition: border .1s ease;
    img{
        width: 50px;
        height: 50px;
        object-fit:cover;
        border-style: none;
    }
    .info{
        height: 100%;
        width: 100%;
        padding-left: 7px ;
        overflow: hidden;
        span{display: block; letter-spacing: 1px;}
        .title{font-size: .9em; margin-bottom: 2px;}
        .artist{font-size: .7em;}
        .album{font-size: .7em;}
    }
}

.selected{
    border: rgb(0, 254, 255) solid 1px;
}

.unselected{
    border: black solid 1px;
}

</style>