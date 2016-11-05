<template>
<my-navbar></my-navbar>
<h1>message</h1>
</template>

<script>
import myNavbar from '../components/myNavbar.vue'
export default {
		components:{myNavbar},
        route: {
            activate: function (transition) {
                console.log('进入home!')//这里在每次进入该组件会触发
                transition.next()
                //这里如果写abort就是说这个路由下的组件的大门被关闭了，不可切换进来
            },
            deactivate: function (transition) {
                console.log('离开home')//这里在每次离开改组件会触发
                transition.next()//同理这里abort就是说进来了不可离开
            }
        }
}
</script>

<style type="text/css" media="screen" scoped>
@import url(../assets/public.css);
	.container{
		background-color: #eeccff;
		width:100%;
		height:100%;
	}
</style>