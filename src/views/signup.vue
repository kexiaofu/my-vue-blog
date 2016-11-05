<template>
<my-navbar></my-navbar>
<div class="fcontainer" style="border-color:#06e;">
	<div class="signpage">
				<div class="signText">登陆福小柯管理后台</div>
				<div id="userTips" @click="inputing(1)">请输入账号</div>
				<input style="display:none">
				<input type="text" id="user" name="user" autocomplete="off">
				<div id="passwordTips" @click="inputing(2)">请输入密码</div>
				<input style="display:none">
				<input type="password" id="password" name="password" autocomplete="off">
				<div id="ssign" @click="sumbitSign">{{ssign}}</div>			
	</div>
</div>
</template>

<script>
import Vue from 'vue'
import myNavbar from '../components/myNavbar'
import vueResource from 'vue-resource'
Vue.use(vueResource);
	export default({
		components:{myNavbar},
		ready(){
			var that = this,

			auser = document.querySelector('#user'),
			apassword = document.querySelector('#password');
			auser.value = '';
			apassword.value = '';
			that.$http.get('./src/php/sign.php?issign').then((response)=>{
				console.log(response.data);
				if(response.data == 1){
						that.$router.go({
							name:'home'
						})
					
				}else{
					var signpage = document.querySelector('.signpage');
					signpage.style.display = "block";
				}
			},(response)=>{
				console.log(response);
			})		
		},
		data(){
			return {
				ssign:'登录'
			}
		},
		methods:{
			inputing:function(_index){
				if(_index === 1){
					var auserTip = document.querySelector('#userTips'),
					user = document.querySelector('#user');
					auserTip.style.transform = "translateY(-30px)";
					auserTip.style.fontSize = "0.9em";
					user.focus();
					user.onblur = function(){
						if(user.value == '' || user.value == null){
							auserTip.style.transform = "translateY(0px)";
							auserTip.style.fontSize = "1.0em";
						}
					}
				}else if(_index === 2){
					var passwordTips = document.querySelector('#passwordTips'),
					apassword = document.querySelector('#password');
					passwordTips.style.transform = "translateY(-30px)";
					passwordTips.style.fontSize = "0.9em";
					apassword.focus();
					apassword.onblur = function(){
						if(apassword.value == '' || apassword.value == null){
							passwordTips.style.transform = "translateY(0px)";
							passwordTips.style.fontSize = "1.0em";
						}
					}
				}
			},
			sumbitSign:function(){
				var auser = document.querySelector('#user').value,
					apassword = document.querySelector('#password').value,
					that = this;
					if(auser && apassword){
						that.$http.post('./src/php/sign.php',{'signup':true,'user':auser,'password':apassword}).then((response)=>{
							auser = '';
							apassword = '';
							if(response.data == 1){
								that.$set('ssign',"成功登录"); 

								setTimeout(function(){
									that.$router.go({
										name:'admin'
									})
								},1000);
							}else{
								alert("不能登录！")
							}
						},(response)=>{
							console.log(response);
						})
					}else{
						alert('登录失败');
					}			
			}
		}
	})
</script>

<style scoped>
	@import url(../assets/public.css);


</style>