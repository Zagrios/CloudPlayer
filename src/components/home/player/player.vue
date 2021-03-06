<template>
    <div id="player">
        <div id="range-wrapper">
            <span class="range-fill" v-bind:style="{width:rangeValue/10+'%'}"></span>
            <input v-model="rangeValue" type="range" name="timeline" id="timeline" min="0" max="1000" step="1" value="500">
        </div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            rangeValue:0,
        }
    }
}
</script>

<style lang="scss">
    #player{
        width: 100%;
        height: 75px;
        position: absolute;
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
            max-height: 5px;
            margin: 0;
            padding: 0;
            top: 0;
            .range-fill{
                position: absolute;
                top: 0;
                left: 0;
                width: 50%;
                height: .05em;
                display: block;
                background-color: rgb(0, 255, 255);
                z-index: 1;
            }
            #timeline{
                margin: 0;
                position: absolute;
                top: 0;
                display: block;
                
            }
        }
    }



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
        height: .15em;
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

    input[type=range]::-ms-track {
        width: 100%;
        height: 4px;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
    }
    input[type=range]::-ms-fill-lower {
        background: #2a6495;
        border-radius: 2.6px;
    }
    input[type=range]::-ms-fill-upper {
        background: #3071a9;
    }
</style>