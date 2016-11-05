<template>
<my-navbar></my-navbar>
<div class="fcontainer" style="background-color: #fff;">
	<div class="essayAdmin">文章管理</div>
	<div class="mtips" v-link="{name:'iedit',params:{'todo':'add','pid':'0'}}" @click="reflashEdit">
		添加
	</div>		
	<div class="mtips" @click="updessay" :style="{'backgroundColor':bgcolora,'color':tcolora}">
		更新
	</div>	
	<div class="mtips" @click="delessay" :style="{'backgroundColor':bgcolorb,'color':tcolorb}">
		删除
	</div>
	<div class="aecontain">
		<div class="aecon" v-for="ae in adessay" @click="todoitem($index,ae.id)" data-del='no'>
		<div class="aedeta">{{ae.pdate | shortDate}}</div>
		<div class="aetopic">{{ae.topic}}</div>
		<div class="aeclassify">分类/{{ae.classify}}-{{ae.lab}}</div>
			<div class="aeop" data-op='{{ae.id}}'></div>
		</div>		
	</div>
	<div class="messageTip">{{messtips}}</div>
	<div class="paging">分页</div>

</div>

</template>

<script>
import Vue from 'vue'
import myNavbar from '../components/myNavbar'
import vueResource from 'vue-resource'
Vue.use(vueResource);
Vue.http.options.emulateJSON = true;
Vue.filter('shortDate',function(value){
    return value.split(' ')[0].replace(/[-]/g,"/");
});
	export default({
		components:{myNavbar},
		ready(){
			var that = this;
            that.$http.get('./src/php/admin.php?getessay').then((response)=>{
            	console.log(response);
            	if(response.data == 0){
            		alert('非管理员不能登进！');
            	}else{
	                response.data = response.data.substring(0,response.data.length-1);

	                    var a = "["+response.data+"]";
	                    that.$set('adessay',JSON.parse(a));
	                    //console.log(that.homepassage);

	            }
            },(response)=>{
	            console.log(response);
	        })

		},
		data(){
			return{
				adessay:[],
				todel:[],
				isdel:false,
				isupd:false,
				messtips:'删除成功',
				bgcolora:'#fff',
				tcolora:'#06e',
				bgcolorb:'#fff',
				tcolorb:'red'
			}
		},
		methods:{
			updessay:function(){
				var that = this;
				if(!that.isupd){
					that.bgcolora = '#06e';
					that.tcolora = '#fff';
				}else{
					that.bgcolora = '#fff';
					that.tcolora = '#06e';
				}
				that.isupd = !that.isupd;
			},
			reflashEdit:function(){
				history.go(0);
				this.$router.go({
					'name':'iedit',
					'params':{
						'todo':'add'
					}
				})
			},
			todoitem:function(_index,aeid){
				var that = this;
					if(this.isdel){										
						var delq = document.querySelectorAll('.aeop'),
						aecon = document.querySelectorAll('.aecon');
						//console.log(_index);					
						if(aecon[_index].getAttribute('data-del') === "no"){
							aecon[_index].style.backgroundColor = "#ddd";
							delq[_index].style.backgroundColor = "#06e";		
							aecon[_index].setAttribute('data-del',"yes");
						}else if(aecon[_index].getAttribute('data-del') === "yes"){
							aecon[_index].style.backgroundColor = "#fff";
							delq[_index].style.backgroundColor = "transparent";
							aecon[_index].setAttribute('data-del',"no");
							//that.delArray[_index] = 0;		
						}
						//console.log(that.delArray+"delArray");
					}else if(this.isupd) {
						history.go(0);
						that.$router.go({
							name:'iedit',
							params:{
								'todo':'update',
								pid:aeid
							}
						})					
					}else{
						that.$router.go({
							name:'tpassage',
							params:{
								pid:aeid
							}
						})
					}					

			},
			delessay:function(){
				var delq = document.querySelectorAll('.aeop'),
				aecon = document.querySelectorAll('.aecon'),
				that = this,			
				len=delq.length;
				if(!that.isdel){
					that.bgcolorb = 'red';
					that.tcolorb = '#fff';
					for(var i=0;i<len;i++){
						delq[i].style.display = "block";
					}
				}else{	
					that.bgcolorb = '#fff';
					that.tcolorb = 'red';

						var todelLen,
						delitem = [];
					for(var k=0;k<len;k++){
						if(aecon[k].getAttribute('data-del') === 'yes'){
							that.todel.push(delq[k].getAttribute('data-op'));
							delitem.push(k);
						}
					}
					console.log(that.todel);
					todelLen = that.todel.length			

					if(todelLen>0){
						that.$http.get('./src/php/admin.php?del&delarray='+that.todel).then((response)=>{
							console.log(response);
							var messTip = document.querySelector('.messageTip');
							if(response.data == '1'){
								that.$set('messtips','删除成功');
										console.log(delitem+"item");
								for(var i=0;i<todelLen;i++){
										console.log(that.todel[i]+"I");
										aecon[delitem[i]].style.transform = "translateX(120%)";
										aecon[delitem[i]].style.marginTop = "0px";
										aecon[delitem[i]].cssText = 'transform:translateX(120%);marginTop:0px';
										//delitem.push(that.todel[i]);
										delq[i].style.display = "none";

								}
								that.todel.length = 0;				
								console.log(that.todel);

								setTimeout(function(){

									for(var j=0;j<todelLen;j++){
										aecon[delitem[j]].style.height = "0px";
										aecon[delitem[j]].style.padding = "0px";
									}
									messTip.style.opacity = "1";
										setTimeout(function(){
											messTip.style.opacity = "0";
										},2000);
								},100);

							}else{
								for(var i=0;i<len;i++){
									aecon[i].style.backgroundColor = "#fff";
									delq[i].style.backgroundColor = "transparent";
									aecon[i].setAttribute('data-del',"no");
									//that.delArray[i] = 0;	
									delq[i].style.display = "none";
								}
								that.$set('messtips','操作失败');
								messTip.style.opacity = "1";
								setTimeout(function(){
									messTip.style.opacity = "0";
								},2000);						
							}
						},(response)=>{
							console.log(response);
						})
					}//if for todel
					for(var i=0;i<len;i++){	
						delq[i].style.display = "none";
					}	
				}//else for isdel
				that.isdel = !that.isdel;

			}//delessay
		}
	})
</script>

<style type="text/css" media="screen" scoped>
@import url(../assets/public.css);
	
</style>