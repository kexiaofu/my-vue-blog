<template>
<my-navbar></my-navbar>
<div class="fcontainer" >
    <div class="apassage" v-for="ipass in ipassage">
        <div class="aphead">
            <div class="aptopic">{{ipass.topic}}</div>
            <div class="apclassify">{{ipass.classify}}-{{ipass.lab}}</div>
            <div class="apdate">{{ipass.pdate | shortDate}}</div>
        </div>
        <div class="apcon">{{{ipass.con}}}</div>
    </div>    
</div>   
</template>

<script>
import Vue from 'vue'
import myNavbar from '../components/myNavbar.vue'
Vue.http.options.emulateJSON = true;
Vue.filter('shortDate',function(value){
    return value.split(' ')[0];
});
export default {
		components:{myNavbar},
        ready(){
            var that = this;
           that.$http.post('./src/php/odata.php?getpage&pitem='+that.pid).then((response)=>{
            console.log(response);
            response.data = response.data.substring(0,response.data.length-1);
            var a = "["+response.data+"]";
            console.log( typeof response.data);
            console.log( JSON.parse(a));
            that.$set('ipassage',JSON.parse(a));
            console.log(that.ipassage);
           }).then((response)=>{
            //console.log(response);
           })
        },
        data(){
            return {
                'ipassage':[],
                'pid':this.$route.params.pid
            }
        },
        methods:{
            getCurrentStyle:function(obj,prop){
                if(obj.currentStyle){
                    return obj.currentStyle[prop];
                }else if(window.getComputedStyle){
                    prop = prop.replace(/[A-Z]/g,'-$1');
                    prop = prop.toLowerCase();
                    return window.getComputedStyle(obj,null).getPropertyValue(prop);
                }
                return null;
            }
        }
}
</script>

<style type="text/css" media="screen" scoped>
@import url(../assets/public.css);


</style>