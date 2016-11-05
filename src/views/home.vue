<template>
<my-navbar></my-navbar>
<div class="fcontainer">
	<div class="mcon" v-for="hpassage in homepassage" v-link="{name:'tpassage',params:{'pid':hpassage.id}}">
		<div class="mhead">
			<div class="mhtopic">{{hpassage.topic}}</div>
            <div class="mprecon">{{hpassage.precon}}</div>
			<div class="mhother">
				<div class="mhclassify">
					分类/{{hpassage.classify}}-{{hpassage.lab}}
				</div>
				<div class="mhdate">
					{{hpassage.pdate | shortDate}}
				</div>
			</div>
		</div>
	</div>
	<div id="pagination" >
		<span v-for="icount in pagenum" @click="pagingGo(icount)">{{icount}}</span>
	</div>
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
export default {
		components:{myNavbar},
        ready(){
            //console.log(this);.
            var that = this,
            currentpage = parseInt(that.$route.params.paging),
            maxpage = 5;

            console.log(currentpage);

            that.$http.post('./src/php/initData.php?firstPage',{'paging':currentpage}).then((response)=>{
            		var resdata = response.data.split("#!"),
            		pcount = parseInt(resdata[0]),
            		nowpage = 0;

            		console.log((currentpage + maxpage/2|0) <= pcount);
            		//that.pagenum = parseInt(resdata[0]);
            		if(pcount < maxpage){
            			for(var i=0;i<pcount;i++){
	            			that.pagenum.$set(i,i+1);
            			}    
            			nowpage = currentpage-1;		
            		}else if(currentpage <= Math.ceil(maxpage/2)){
            			for(var i=0;i<maxpage;i++){
	            			that.pagenum.$set(i,i+1);
            			}
            			nowpage = currentpage-1;		
            		}else {
            			if((currentpage + maxpage/2|0) <= pcount){
	            			for(var i=0;i<maxpage;i++){
		            			that.pagenum.$set(i,currentpage - (maxpage/2|0)+i);
	            			} 
	            			 nowpage = (maxpage/2|0);          			
            			}else{
	            			for(var i=0;i<maxpage;i++){
		            			that.pagenum.$set(i,pcount-maxpage+i+1);
	            			}   
	            			if(currentpage == pcount){
	            				nowpage = maxpage-1;
	            			}else{
	            				nowpage = pcount - currentpage+(maxpage/2|0);          
	            			} 
	            		}
          		
            		}
                    response.data = resdata[1].substring(0,resdata[1].length-1);
                    console.log(that.pagenum);console.log(response);
                    var a = "["+response.data+"]";
                    that.$set('homepassage',JSON.parse(a));
                    console.log(nowpage);
                    setTimeout(function(){
			            document.querySelectorAll("#pagination span")[nowpage].style.cssText = "background-color:#07e;color:#fff";

            },50);

                },(response)=>{
                    console.log(response);
                })
        },
        data(){
            return {
                homepassage:[],
                pagenum:[]
            }
        },		
        methods:{
        	pagingGo:function(_index){
        		var that = this;
        		if(_index == that.$route.params.paging) return;
        		that.$router.go({
        			name:'home',
        			params:{
        				paging:_index
        			}
        		})
        		history.go(0);

        	}
        }

}

</script>

<style type="text/css" media="screen" scoped>
@import url(../assets/public.css);
	
</style>