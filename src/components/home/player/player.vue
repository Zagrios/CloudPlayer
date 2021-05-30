<template>
    <div id="player">
        <div id="range-wrapper">
            <span class="range-fill" v-bind:style="{width:rangeValue/10+'%'}"></span>
            <input v-model="rangeValue" type="range" name="timeline" id="timeline" min="0" max="1000" step="1" value="500">
        </div>
        <div id="elements">
            <div id="track">
                <img id="track-image" src="@/assets/defaultTrack.png" alt="" srcset="">
                <div id="info-wrapper">
                    <span id="title">Titre</span>
                    <span id="artist">Artist</span>
                    <span id="album">Album</span>
                </div>
            </div>
            
            <div id="controls">
                <div id="controls-wrapper">
                    <b-icon-shuffle class="control font-fourth" @click="shuffle = !shuffle" :class="{active: shuffle}"/>
                    <b-icon-skip-start-fill class="control font-second"/>
                    <b-icon-play-fill class="control font-main" v-if="playing" @click="playing = !playing"/>
                    <b-icon-pause-fill class="control font-main" v-else @click="playing = !playing" />
                    <b-icon-skip-end-fill class="control font-second"/>
                    <b-icon-arrow-repeat class="control font-third" @click="loop = !loop" :class="{active: loop}"/>
                </div>
                
            </div>
            <div id="volume">
                <div id="volume-wrapper">
                    <div class="duration">00:00 / 00:00</div>
                    <b-icon-volume-mute-fill class="control" v-if="volume == 0" @click="volume = tempVolume"/>
                    <b-icon-volume-down-fill class="control" v-else-if="volume < 75" @click="tempVolume = volume ;volume = 0"/>
                    <b-icon-volume-up-fill class="control" v-else @click="tempVolume = volume ;volume = 0"/>
                    <div id="range-volume-wrapper">
                        <span class="range-fill" v-bind:style="{width:volume+'%'}"></span>
                        <input v-model="volume" type="range" name="volume" id="volume-range" min="0" max="100" step="1" value="50">
                    </div>
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
import {BIconPlayFill, BIconPauseFill, BIconSkipEndFill, BIconSkipStartFill, BIconShuffle, BIconArrowRepeat, BIconVolumeDownFill, BIconVolumeMuteFill, BIconVolumeUpFill} from 'bootstrap-vue';

export default {
    data(){
        return{
            playing:false,
            loop:false,
            shuffle:false,
            rangeValue:0,
            volume:50,
            tempVolume: 0,
        }
    },
    methods:{
    },
    components:{
        BIconPlayFill,
        BIconPauseFill,
        BIconSkipEndFill,
        BIconSkipStartFill,
        BIconShuffle,
        BIconArrowRepeat,
        BIconVolumeMuteFill,
        BIconVolumeDownFill,
        BIconVolumeUpFill,
    },
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
            .range-fill{
                position: absolute;
                top: 0;
                left: 0;
                height: .05em;
                display: block;
                background-color: rgb(0, 254, 255);
                z-index: 1;
            }
            #timeline{
                margin: 0;
                position: absolute;
                top: 0;
                display: block;
                height: .05em;
                
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
                        font-size: .7em;
                        letter-spacing: 1px;
                        margin-right: 5px;
                    }
                }
            }
        }
        .active{
            color: rgb(0, 254, 255);
        }
        .control{
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
</style>