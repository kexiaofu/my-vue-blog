<template>
<my-navbar></my-navbar>
<div class="fcontainer">
    <div class="mclassify" >
        <div class="mcon" v-for="tp in techspassage" v-link="{name:'tpassage',params:{'pid':tp.id}}">
            <div class="mhead" >
                <div class="mhtopic" >{{tp.topic}}</div>
            	<div class="mprecon">{{tp.precon}}</div>
                <div class="mhother">
                    <div class="mhclassify">
                        {{tp.classify}}-{{tp.lab}}
                    </div>
                    <div class="mhdate">
                        {{tp.pdate | shortDate}}
                    </div>
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
            //console.log(this);
            var that = this,
                currentpage = parseInt(that.$route.params.paging),
            	maxpage = 5;

            console.log(currentpage);
            that.$http.post('./src/php/initData.php',{'iclassify':'tech','paging':currentpage}).then((response)=>{
                    console.log(response.data);
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
                    that.$set('techspassage',JSON.parse(a));
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
                techs:[],
                techspassage:[],
                pagenum:[]
            }
        },
        methods:{
        	pagingGo:function(_index){
        		var that = this;
        		if(_index == that.$route.params.paging) return;
        		that.$router.go({
        			name:'tech',
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