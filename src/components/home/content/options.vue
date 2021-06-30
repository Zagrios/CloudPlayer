<template>
	<div id="options-page">
		<div id="nav-bar">
            <h1>Options</h1>
        </div>
		<div id="options">
			<div class="options-section">
				<span class="section-title"> Apparance </span>
				<div class="option">
					<span>Qualité des miniatures</span>
					<select name="quality" v-model="thumbnails_quality">
						<option value="100">Élevée</option>
						<option value="50">Moyenne</option>
						<option value="0">Basse</option>
					</select>

				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name:"options",
	data(){
		return{
			thumbnails_quality: null,
			values_loaded: false,
		}
	},
	methods:{
		initOptionsValues:function(){
			this.thumbnails_quality = localStorage.getItem("thumbnails_quality") ? localStorage.getItem("thumbnails_quality") : 50;
			this.values_loaded = true;
		},
	},
	watch:{
		thumbnails_quality:{
			handler(){
				if(!this.values_loaded){return;}
				localStorage.setItem("thumbnails_quality", this.thumbnails_quality);
			}
		}
	},
	created(){
		this.initOptionsValues();
	}
}
</script>

<style lang="scss">

#options-page{
    #nav-bar{
        display: flex;
        align-content: center;
        align-items: center;
        height: 70px;
        width: 100%;
        padding-top: 6px;
        h1{
            float: left;
            letter-spacing: 1px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 5px;
            margin-right: 20px;
        }
    }
}

#options{
	*, *::before, *::after { box-sizing: border-box; }
	margin-top: 20px;
	margin-left: 10px;
	.options-section{
		margin-bottom: 20px;
		.section-title{ font-size: 1.3em; font-weight: bold; margin-bottom: 20px; display: inline-block; letter-spacing: 1px; }
		.option{
			span{letter-spacing: 1px;}
			margin-left: 10px;
			margin-bottom: 10px;
		}
	}
	select{
		color: white;
		background-color: #242424;
		border: solid black 0;
		border-radius: 50px;
		margin-left: 10px;
		height: 20px;
		width: 110px;
		text-align-last: center;
		font-family: Montserrat, sans-serif;
		letter-spacing: 1px;
	}
}

</style>