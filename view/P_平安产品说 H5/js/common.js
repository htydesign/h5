
//设定用户只有6次点击机会
var num=6;

var aLike=$('.u-like h1');
var aU_Like=$('.u-like');
var timer=null;
for(var i=0;i<aLike.length;i++){
	aLike[i].index=i;
	$(aLike[i]).on('touchstart', function() {		
		if(num>0){
			var index = this.index;		
			var oI = document.createElement('i');
			oI.className='up';
			if($(aLike[index]).is('.onlike')){			
				oI.innerHTML = '您已经点过赞了！';	
			}else{
				$(aLike[index]).addClass('onlike');			
				oI.innerHTML = '+1';	
				num--;				
			}
			$(aU_Like[index]).append(oI);	
			clearTimeout(timer);
			timer=setTimeout(function() {
				$(aU_Like[index]).children('i').remove();
			}, 2000);
			
		}else{
			alert('您的点击次数用完了!');
		}
		console.log(num);
	});
}
