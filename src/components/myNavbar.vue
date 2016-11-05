<template>
<div id="navbar">
	<div class="menu">
		<svg width="25px" height="25px" id="svga" @click="svga">
	      <line x1="0" y1="0" x2="20" y2="0" style="stroke:#fff;"/>
	      <line x1="0" y1="10" x2="20" y2="10" style="stroke:#fff;"/>
	      <line x1="0" y1="20" x2="20" y2="20" style="stroke:#fff;"/>
	  	</svg>
	</div>
	<div id="mtitle">{{mtitle}}</div>
</div>

<div id="slidenav">
		<div class="navitem" >
			<img src="../assets/1.jpg" alt="" v-link="{name:'home'}">
			福小柯
		</div>
	<div id="menulist">
		<ul>
			<li v-link="{name:'home',params:{'paging':1}}" :style="{'background-color':ishome}">首页</li>
			<li v-link="{name:'tech',params:{'paging':1}}" :style="{'background-color':istech}">技术</li>
			<li v-link="{name:'life',params:{'paging':1}}" :style="{'background-color':islife}">杂文</li>
		</ul>
	</div>

	<div class="signup">
		<div v-link="{'name':'signup'}" id="issign" :style="{'background-color':signing}">{{issignup}}</div>
	</div>
	<div id="footer">
		福小柯博客
	</div>
</div>

<!-- <div id="banner">
	<div class="mybanner">{{bannerText}}</div>
	<img src="../assets/1.jpg" alt="">
</div> -->

</template>

<script>
import Vue from 'vue'
import vueResource from 'vue-resource'
Vue.use(vueResource);
	export default({
		ready(){
			var that = this,
			container = document.querySelector('#container'),
			slidenav = document.querySelector('#slidenav'),
			pageName = that.$route.name;
			container.style.transform = 'translateX(0%)';
			console.log(pageName);
			switch(pageName){
				case 'home':that.ishome='#04e';break;
				case 'tech':that.$set('bannerText','技术');that.istech='#04e';
				that.mtitle = '技术';
				break;
				case 'life':that.$set('bannerText','生活杂文');that.islife='#04e';
				that.mtitle = '生活杂文';

				break;
				case 'signup':that.$set('bannerText','登录');that.signing='#03e';
				that.mtitle = '登录';

				break;
				case 'admin':that.$set('bannerText','管理');that.signing='#03e';
				that.mtitle = '管理';
				break;
				case 'iedit':that.$set('bannerText','添加/更新文章');that.signing='#03e';
				that.mtitle = '添加/更新';
				var svgtar = document.querySelector("#svga"),
				lines=svgtar.children;
				lines[0].y1.baseVal.value=10;
				lines[1].x2.baseVal.value=0;
				lines[2].y1.baseVal.value=10;				
						
				this.isback = true;
				break;
				case 'tpassage':
				that.mtitle = '文章';
				var svgtar = document.querySelector("#svga"),
				lines=svgtar.children;
				var pback = setInterval(function(){
						if(lines[0].y1.baseVal.value == 10){
							clearInterval(stop);
						}else{
							lines[0].y1.baseVal.value+=5;
							lines[1].x2.baseVal.value-=8;
							lines[2].y1.baseVal.value-=5;				
						}
					},50);
				this.isback = true;
				break;
			}
			that.$http.post('./src/php/sign.php?issign').then((response)=>{
				if(response.data == 1){
					var issign = document.querySelector('#issign');
					if(pageName == 'admin'){
						that.$set('issignup','退出');
						issign.onclick = function(){
							that.$http.post('./src/php/sign.php?gun=true').then((response)=>{
								console.log(response.data);
								that.$router.go({
									name:'home'
								})						
								},(response)=>{})
						}
					}else{
						that.$set('issignup','管理');
						issign.onclick = function(){
							that.$router.go({
								name:'admin'
							})
						}
					}

				}
			},(response)=>{});
		},
		data:function(){
			return {
				ist:false,
				issignup:'登录',
				bannerText:'福小柯博客',
				ishome:'#06e',
				istech:'#06e',
				islife:'#06e',
				signing:'#06e',
				mtitle:'福小柯',
				isback:false				
			}
							
		},
		methods:{
			svga:function(){
				var svgtar = document.querySelector("#svga"),
				container = document.querySelector('#container'),
				lines=svgtar.children,
				that = this,
				stop,
				svglineW = this.ist?0:100;
				//console.log(signup);
				if(!that.isback){
					if(!that.ist){
						stop = setInterval(function(){
							if(lines[0].y2.baseVal.value == 20){
								clearInterval(stop);
							}else{
								lines[0].y2.baseVal.value+=5;
								lines[1].x2.baseVal.value-=5;
								lines[2].y2.baseVal.value-=5;				
							}
						},30)
						container.style.transform = "translateX(50%)";
					}else{
						stop = setInterval(function(){
							if(lines[0].y2.baseVal.value == 0){
								clearInterval(stop);
							}else{
								lines[0].y2.baseVal.value-=5;
								lines[1].x2.baseVal.value+=5;
								lines[2].y2.baseVal.value+=5;				
							}
						},30)
						container.style.transform = "translateX(0%)";
					}
					this.ist = !this.ist;					
				}else{
					window.history.go(-1);
				}

			}
		}
	})
</script>

<style scoped>
@import url(../assets/public.css);
</style>