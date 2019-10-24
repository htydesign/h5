loader.addCompletionListener(function() {
	setTimeout(function() {
		oTxt.style.display = 'none';
		if(isPlay) {
			init();
			playSound(1);
			isPlay = false;
		}
	}, 500);
});

loader.start();


function init() {
	
	var isTouch = false;
	var imageWidth = 640,
		imageHeight = 1120;
	var winW = window.innerWidth,
		winH = window.innerHeight;
		
	if(winH<1120){
		winH=1120;
	}
	
	var ratio=winH / imageHeight;			//比例
	var imgOffsetWidth=1575;				//图片本身宽度
	var imgOffsetHeight=1120;					//图片本身高度
	
	var index = 1;
	var stop = null;
	
	var isMagnify=false;
	var is_touchDouble=false;
	var isPlay=false;
	var touch_num=0;
	
	var oHint=document.querySelector('.hint-box');
	var oHint_Img=document.querySelector('.hint-box span:nth-child(2) img');
	
	var canvas = document.getElementById("canvas");
	canvas.width = winW;
	canvas.height = winH;

	//桌面
	var scene = new createjs.Stage("canvas");
	createjs.Touch.enable(scene);

	//组
	var group = new createjs.Container();
	group.x = 0;
	group.y = 0;
	scene.addChild(group);
	
	//播放序列帧
	function playFrame(i){
		var bitmap = new createjs.Bitmap(Imgs[i].src);
		bitmap.x = bitmap.y = 0;
		bitmap.scaleX = winW / imageWidth;
		bitmap.scaleY = winH / imageHeight;
		group.addChild(bitmap);
	}

	
	//定帧大图
	var drawRect = new createjs.Bitmap(Imgs[1138].src);
	drawRect.x = -(imgOffsetWidth * ratio / 2 - winW / 2);
	drawRect.y = 0;
	drawRect.scaleX = ratio;
	drawRect.scaleY = ratio;

	createjs.Ticker.on("tick", function() {
		scene.update();
	});
	
	var first=null;
	var first_index=86;
	//第一段
	function first_playAnimate(){
		isPlay=false;
		first=setInterval(function(){
			group.removeAllChildren();
			if(index >= first_index) {
				index = first_index;
			} else {
				index++;
				playFrame(index);
				console.log(index);
			}

			if(index >= first_index) {
				clearInterval(first);
				playFrame(index);
				isPlay=true;
				oHint.style.display='block';
			}
			
		},40);
	}
	var second=null;
	var second_index=147;
	//第二段
	function second_playAnimate(){
		isPlay=false;
		second=setInterval(function(){
			group.removeAllChildren();
			if(index >= second_index) {
				index = second_index;
			} else {
				index++;
				playFrame(index);
				console.log(index);
			}
			if(index >= second_index) {
				clearInterval(second);
				playFrame(index);
				isPlay=true;
				oHint.style.display='block';
			}
			
		},40);
	}
	var third=null;
	var third_index=258;
	//第三段
	function third_playAnimate(){
		isPlay=false;
		third=setInterval(function(){
			group.removeAllChildren();
			if(index >= third_index) {
				index = third_index;
			} else {
				index++;
				playFrame(index);
				
			}

			if(index >= third_index) {
				playFrame(index);
				clearInterval(third);
				isPlay=true;
				oHint.style.display='block';
			}
			console.log(index);
		},40);
	}
	var fourth=null;
	var fourth_index=345;
	//第四段
	function fourth_playAnimate(){
		isPlay=false;
		fourth=setInterval(function(){
			group.removeAllChildren();
			if(index >= fourth_index) {
				index = fourth_index;
			} else {
				index++;
				playFrame(index);
				
			}

			if(index >= fourth_index) {
				playFrame(index);
				clearInterval(fourth);
				isPlay=true;
				oHint.style.display='block';
			}
			console.log(index);
		},40);
	}
	var fifth=null;
	var fifth_index=416;
	//第五段
	function fifth_playAnimate(){
		isPlay=false;
		fifth=setInterval(function(){
			group.removeAllChildren();
			if(index >= fifth_index) {
				index = fifth_index;
			} else {
				index++;
				playFrame(index);
				
			}

			if(index >= fifth_index) {
				playFrame(index);
				clearInterval(fifth);
				isPlay=true;
				oHint.style.display='block';
				oHint_Img.src=Imgs[Imgs.length-3].src;
			}
			console.log(index);
		},40);
	}
	var sixth=null;
	var sixth_index=568;
	//第六段
	function sixth_playAnimate(){
		isPlay=false;
		sixth=setInterval(function(){
			group.removeAllChildren();
			if(index >= sixth_index) {
				index = sixth_index;
			} else {
				index++;
				playFrame(index);
				
			}

			if(index >= sixth_index) {
				playFrame(index);
				clearInterval(sixth);
				isPlay=true;
				oHint.style.display='block';
				oHint_Img.src=Imgs[Imgs.length-2].src;
			}
			console.log(index);
		},40);
	}
	var seventh=null;
	var seventh_index=1138;
	//第七段
	function seventh_playAnimate(){
		isPlay=false;
		seventh=setInterval(function(){
			group.removeAllChildren();
			if(index >= seventh_index) {
				index = seventh_index;
			} else {
				index++;
				playFrame(index);
				
			}

			if(index >= seventh_index) {
				clearInterval(seventh);
				group.addChild(drawRect);
				onPressMove(drawRect);
				is_touchDouble=true;
			}
			console.log(index);
		},40);
	}
	first_playAnimate();
	
	
	document.addEventListener('touchstart',function(){
		if(isPlay){
			oHint.style.display='none';
			touch_num++;
			switch(touch_num){
				case 1:
					second_playAnimate();
					break;
				case 2:
					third_playAnimate();
					break;
				case 3:
					fourth_playAnimate();
					break;
				case 4:
					fifth_playAnimate();
					break;
				case 5:
					sixth_playAnimate();
					break;
				case 6:
					seventh_playAnimate();
					break;
			}
		}

	},false);
	
	
	function onPressMove(obj) {

		var touch_startX = 0,
			touch_moveX = 0,
			touch_endX = 0,
			positionX = 0;
		
		var px=0,py=0;
		
		obj.on('mousedown', function(event) {
			touch_startX = event.stageX;
			positionX = obj.x;
			
			return px=event.stageX,py=event.stageY;
			
		});
		obj.on('pressmove', function(event) {
			touch_moveX = event.stageX - touch_startX + positionX;
			if(isMagnify){
				if(touch_moveX > 0 || touch_moveX < (-imgOffsetWidth * ratio)*2 + winW) {} else {
					drawRect.x = touch_moveX;
				}
			}else{
				if(touch_moveX > 0 || touch_moveX < -imgOffsetWidth * ratio + winW) {} else {
					drawRect.x = touch_moveX;
				}
			}
		});
		obj.on("pressup", function() {
			touch_endX = touch_moveX - touch_startX;
		});
		
		var touch_startTime=0;
		var touch_downTime=0;
		
		document.addEventListener('touchstart',function(){
			if(is_touchDouble){
				if(0==touch_startTime){
					touch_startTime=Date.now();
				}else{
					touch_downTime=Date.now();
					if(touch_downTime-touch_startTime<500){
						isMagnify=true;
						drawRect.scaleX = ratio*2;
						drawRect.scaleY = ratio*2;
						
						drawRect.x = -(imgOffsetWidth * ratio / 2 - winW / 2+px-winW / 2)*2;
						drawRect.y = -imgOffsetHeight * ratio/2;
						
					}else{
						touch_startTime=Date.now();
					}
				}
			}

		},false);
	}
}