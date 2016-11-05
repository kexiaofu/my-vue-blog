<template>
<my-navbar></my-navbar>
<div class="fcontainer" style="background-color: #fff;">
	<div class="editTips" style="margin-top:0px">文章分类</div>
	<div class="labelB">
		<input type="radio" name="classify" value="技术" id="edittech"><label for="edittech"></label>技术			
	</div>
	<div class="labelB">
		<input type="radio" name="classify" value="生活" id="editlife"><label for="editlife"></label>生活	
	</div>

	<div class="editTips">文章标签</div>
	<input type="text" name="lab" value="" placeholder="输入文章标签" id="editlab">
	<div class="editTips">文章标题</div>
	<input type="text" name="topic" value="" placeholder="输入文章标题" id="edittopic">

	<div class="editTips">文章预览</div>
	<textarea name="ppreview" id="ppreview"></textarea>

	<div class="editTips">文章内容</div>
	<div id="myeditorcon">
		<script id="myEditor" type="text/plain"></script>		
	</div>
	<input type="password" id="sumpassword" placeholder="输入操作密码">
	<div id="sumbitEssay" @click="sumessay">提交</div>
	<div class="messageTip">{{messtips}}</div>
</div>
</template>

<script>
import Vue from 'vue'
import myNavbar from '../components/myNavbar'
import vueResource from 'vue-resource'
Vue.use(vueResource);
Vue.http.options.emulateJSON = true;
	import ueditConfig from '../../mueditor/ueditor.config.js' 
	import uedit from '../../mueditor/ueditor.all.js'
				var w = document.body.clientWidth * 0.9,
			    pctoolbars = [["bold","italic","underline","justifyleft","justifycenter","justifyright","justifyjustify","indent","simpleupload","insertimage","emotion","undo","redo","insertunorderedlist","insertorderedlist","unlink","link","selectall","autotypeset"]];
			if(w > 1000){
				var myue = UE.getEditor('myEditor',{
						initialContent:'欢迎',
			            autoClearinitialContent:false,
			            wordCount:false,
			            elementPathEnabled:false,
			            initialFrameHeight:200,
			            initialFrameWidth:w,
			            toolbars:pctoolbars,

				});		
			}else{
				var myue = UE.getEditor('myEditor',{
						initialContent:'欢迎',
			            autoClearinitialContent:false,
			            wordCount:false,
			            elementPathEnabled:false,
			            initialFrameHeight:200,
			            initialFrameWidth:w,


				});		
			};	
	export default({
		ready(){
			if(this.$route.params.todo == 'update'){
				var that = this;
				that.isupdate = true;
				console.log(that.isupdate+"that.isupdate");
				that.$http.post('./src/php/admin.php',{'iupdatebefore':true,'id':that.$route.params.pid}).then((response)=>{
					console.log(response);
					//if(response.data == 0)
					response.data = response.data.substring(0,response.data.length-1);
	                    var a = "["+response.data+"]",
	                    iclassify = document.getElementsByName('classify'),
						itopic = document.querySelector('#edittopic'),
						ppreview = document.querySelector('#ppreview'),
						ilab = document.querySelector('#editlab');
	                    that.$set('datap',JSON.parse(a));
	                    for(var i=0;i<iclassify.length;i++){
	                    	console.log(iclassify[i].value);
							if(iclassify[i].value == that.datap[0].classify){
								iclassify[i].checked = true;
								
							}
						}
						itopic.value = that.datap[0].topic;
						ilab.value = that.datap[0].lab;	 
						ppreview.value =  that.datap[0].precon;                  
						console.log(myue);

	                    myue.ready(function(){
	                    	myue.setContent(that.datap[0].con);
	                    })
				},(response)=>{
					console.log(response);
				})

			};
		},
		components:{myNavbar},
		data(){
			return {
				datap:[],
				messtips:'添加成功',
				isupdate:false
			}
		},
		methods:{
			sumessay:function(){
				//var editcon = myue.getPlainTxt();
				var editcon = myue.getContent(),
				that = this,
				iclassify = document.getElementsByName('classify'),
				itopic = document.querySelector('#edittopic').value,
				ilab = document.querySelector('#editlab').value,
				sumpsw = document.querySelector('#sumpassword').value,
				okclassify,
				isclassifyok = false;
				console.log(iclassify);
				for(var i=0;i<iclassify.length;i++){
					if(iclassify[i].checked == true){
						okclassify = iclassify[i].value;
						isclassifyok = true;
					}
				}
				if(isclassifyok){
					if(itopic && ilab ){
						if(myue.hasContents() && sumpsw){
							var messTip = document.querySelector('.messageTip'),ppreview = document.querySelector('#ppreview');
							if(ppreview.value == ''){
								alert('预览内容为空');
								return;
							}
							//alert(ppreview.value);return;
							if(that.isupdate){
								var pid = that.$route.params.pid;
								that.$http.post('./src/php/admin.php',{'iupdate':true,'id':pid,'ieclassify':okclassify,'ielab':ilab,'ietopic':itopic,'precon':ppreview.value,'iecon':editcon,'sumpsw':sumpsw}).then((response)=>{
									console.log(response);
									if(response.data == 1){
										that.$set('messtips','更新成功');
										setTimeout(function(){
											console.log('update');
											that.$router.go({
												name:'tpassage',
												pid:pid
											})
										},2500);										
									}else if(response.data == 2){
										that.$set('messtips','操作密码错误！');
									}else if(response.data == 0){
										that.$set('messtips','更新文章失败！');
									}


								},(response)=>{
									console.log(response);
								})
							}else{
								that.$http.post('./src/php/admin.php',{'iadd':true,'ieclassify':okclassify,'ielab':ilab,'ietopic':itopic,'precon':ppreview.value,'iecon':editcon,'sumpsw':sumpsw}).then((response)=>{
									var messTip = document.querySelector('.messageTip');
									if(response.data == 1){
										that.$set('messtips','添加成功');
										setTimeout(function(){
											console.log('admin');
											that.$router.go({
												name:'admin'
											})
										},2500);							
									}else if(response.data == 2){
										that.$set('messtips','操作密码错误！');
									}else if(response.data == 0){
										that.$set('messtips','添加文章失败！');
									}
									console.log(response);
									/*this.$set('datap',JSON.parse("["+response.data+"]"));*/

								},(response)=>{
									console.log(response);
								})								
							}
							messTip.style.opacity = "1";
							setTimeout(function(){
								messTip.style.opacity = "0";
							},2000);
						}else{
							alert('还未输入内容或未输入操作密码');
						}
					}else{//itopic.value && ilab.value
						alert('请完成后再提交');
					}
				}else{//isclassifyok
					alert('请输入标签');
				}
			}//sumessay
		}
	})
</script>
