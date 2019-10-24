loader.addCompletionListener(function() {
	setTimeout(function() {
		document.querySelector('.loading').className = 'loading active';
		oTxt.style.display = 'none';
		if(isPlay) {
			init();
			playSound(1);
			isPlay = false;
			document.querySelector('.loading').style.display = 'none';
		}
	}, 750);
});

loader.start();
var slideImg = document.querySelector('.controls span:first-child img');
var img_Width = 2700;
var img_Height = 1920;
var is_touchDouble = false;
var is_click = false;

function init() {

	var isTouch = false;
	var imageWidth = 640,
		imageHeight = 1120;
	var winW = window.innerWidth,
		winH = window.innerHeight;

	if(winH < 1080) {
		winH = 1080;
	}

	var ratio = winH / imageHeight; //比例
	var imgOffsetWidth = 2700; //图片本身宽度
	var imgOffsetHeight = 1920; //图片本身高度

	var index = 1;
	var stop = null;

	var isMagnify = false;

	var isPlay = false;
	var touch_num = 0;

	var oHint = document.querySelector('.hint-box');
	var oHint_Img = document.querySelector('.hint-box span:nth-child(2) img');

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

	var hintGroup = new createjs.Container();
	hintGroup.x = 0;
	hintGroup.y = 0;
	scene.addChild(hintGroup);

	//播放序列帧
	function playFrame(i) {
		var bitmap = new createjs.Bitmap(Imgs[i].src);
		bitmap.x = bitmap.y = 0;
		bitmap.scaleX = winW / imageWidth;
		bitmap.scaleY = winH / imageHeight;
		group.addChild(bitmap);
	}
	//提示的小手
	function hintHand(imgSrc,x, y, t, tx, ty, color) {
		var hint_hand = new createjs.Bitmap(imgSrc);
		hint_hand.alpha = 0;
		hint_hand.x = x;
		hint_hand.y = y;
		hint_hand.rotation = -20;
		hintGroup.addChild(hint_hand);
		var tween = createjs.Tween.get(hint_hand, {
			loop: true
		}).to({
			alpha: 1
		}, 1000, createjs.Ease.liner).to({
			alpha: 0
		}, 1000, createjs.Ease.liner);

		var txt = new createjs.Text(t, "28px 微软雅黑", color);
		txt.lineWidth = 550;
		txt.lineHeight = 22;
		txt.textBaseline = "top";
		txt.textAlign = "left";
		txt.x = tx;
		txt.y = ty;
		txt.alpha = 0;
		var tweenTxt = createjs.Tween.get(txt, {
			loop: true
		}).to({
			alpha: 1
		}, 1000, createjs.Ease.liner).to({
			alpha: 0
		}, 1000, createjs.Ease.liner);
		hintGroup.addChild(txt);

	}
	//左右滑动提示
	function hintSlideHand(imgSrc,x, y, t, tx, ty, color) {
		var hint_hand = new createjs.Bitmap(imgSrc);
		hint_hand.alpha = 0;
		hint_hand.x = x;
		hint_hand.y = y;
		hint_hand.rotation = -20;
		hintGroup.addChild(hint_hand);
		var tween = createjs.Tween.get(hint_hand, {
			loop: true
		}).to({
			x:hint_hand.x+20,
			alpha: 1
		}, 500, createjs.Ease.liner).to({
			x:hint_hand.x+20,
			alpha: 0
		}, 500, createjs.Ease.liner);

		var txt = new createjs.Text(t, "28px 微软雅黑", color);
		txt.lineWidth = 550;
		txt.lineHeight = 22;
		txt.textBaseline = "top";
		txt.textAlign = "left";
		txt.x = tx;
		txt.y = ty;
		txt.alpha = 0;
		var tweenTxt = createjs.Tween.get(txt, {
			loop: true
		}).to({
			alpha: 1
		}, 1000, createjs.Ease.liner).to({
			alpha: 0
		}, 1000, createjs.Ease.liner);
		hintGroup.addChild(txt);

	}
	//提示图片
	
	var aHint_txt_1=["看板娘呢？","狐妖小红娘呢？","韩信呢？","李白呢？","初音未来呢？"];
	var aHint_txt_2=["111？","222？","333？","444？","555？"];
	
	function hint_img(arr) {
		var hint_img_1 = new createjs.Bitmap(Imgs[Imgs.length - 3].src);
		hint_img_1.x = 0;
		hint_img_1.y = 0;
		hint_img_1.scaleX = winW / imageWidth;
		hint_img_1.scaleY = winH / imageHeight;
		hint_img_1.alpha = 0;
		hintGroup.addChild(hint_img_1);
		var tween = createjs.Tween.get(hint_img_1, {
			loop: 0
		}).to({
			alpha: 1
		}, 500, createjs.Ease.liner);
		for(var i=0;i<15;i++){
			var rand = Math.floor(Math.random( ) * 0xFFFFFF).toString(16);  
			var c="#"+rand;
			var t=arr[parseInt(Math.random() * arr.length)];
			console.log(t);
			var txt = new createjs.Text(t, "40px 微软雅黑", c);
			txt.lineWidth = 550;
			txt.lineHeight = 40;
			txt.textBaseline = "top";
			txt.textAlign = "left";
			txt.x = rx();
			txt.y = ry();
			var hint_imgtweenTxt = createjs.Tween.get(txt, {
				loop: true
			}).to({
				x: txt.x-2200
			}, rt(), createjs.Ease.liner);
			hintGroup.addChild(txt);
			
			console.log('x:'+rx()+'   y:'+ry()+'   t:'+rt());
		}
	}
	function rt() {
		return Math.random() * 8000+4000;
	}
	function rx() {
		return Math.random() * 1200+600;
	}
	function ry() {
		return Math.random() * 960;
	}
	
	//定帧大图
	var drawRect = new createjs.Bitmap(Imgs[Imgs.length - 5].src);
	var sc = 1120 / img_Height;
	drawRect.x = -(imgOffsetWidth * sc / 2 - winW / 2);
	drawRect.y = 0;
	drawRect.scaleX = sc;
	drawRect.scaleY = sc;

	var os = 1 / sc;

	createjs.Ticker.on("tick", function() {
		scene.update();
	});

	var first = null;
	var first_index = 52;
	//第一段
	function first_playAnimate() {
		isPlay = false;
		first = setInterval(function() {
			group.removeAllChildren();
			if(index >= first_index) {
				index = first_index;
			} else {
				index++;
				playFrame(index);
			}

			if(index >= first_index) {
				clearInterval(first);
				playFrame(index);
				isPlay = true;
				hintHand(Imgs[Imgs.length - 1].src,winW / 2 + 50, winH / 2 - 50, "请点击屏幕", winW / 2 + 100, winH / 2 + 50, "#fff");
			}

		}, 66);
	}
	var second = null;
	var second_index = 89;
	//第二段
	function second_playAnimate() {
		isPlay = false;
		second = setInterval(function() {
			group.removeAllChildren();
			if(index >= second_index) {
				index = second_index;
			} else {
				index++;
				playFrame(index);
			}
			if(index >= second_index) {
				clearInterval(second);
				playFrame(index);
				isPlay = true;
				hintHand(Imgs[Imgs.length - 1].src,winW / 2 + 100, winH / 2 + 10, "请点击屏幕", winW / 2 + 100, winH / 2 + 100, "#fff");
			}

		}, 66);
	}
	var third = null;
	var third_index = 156;
	//第三段
	function third_playAnimate() {
		isPlay = false;
		third = setInterval(function() {
			group.removeAllChildren();
			if(index >= third_index) {
				index = third_index;
			} else {
				index++;
				playFrame(index);
			}

			if(index >= third_index) {
				clearInterval(third);
				playFrame(index);
				isPlay = true;
				hintHand(Imgs[Imgs.length - 1].src,winW / 2, winH / 2, "请点击屏幕", winW / 2 + 50, winH / 2 + 100, "#fff");
			}

		}, 66);
	}
	var fourth = null;
	var fourth_index = 208;
	//第四段
	function fourth_playAnimate() {
		isPlay = false;
		fourth = setInterval(function() {
			group.removeAllChildren();
			if(index >= fourth_index) {
				index = fourth_index;
			} else {
				index++;
				playFrame(index);
			}
			if(index >= fourth_index) {
				clearInterval(fourth);
				playFrame(index);
				isPlay = true;
				hintHand(Imgs[Imgs.length - 1].src,winW / 2 - 160, winH / 2 + 130, "请点击屏幕", winW / 2 - 100, winH / 2 + 230, "#fff");
			}

		}, 66);
	}
	var fifth = null;
	var fifth_index = 254;
	//第五段
	function fifth_playAnimate() {
		isPlay = false;
		fifth = setInterval(function() {
			group.removeAllChildren();
			if(index >= fifth_index) {
				index = fifth_index;
			} else {
				index++;
				playFrame(index);
			}
			if(index >= fifth_index) {
				clearInterval(fifth);
				playFrame(index);
				isPlay = true;
				hint_img(aHint_txt_2);
				
			}

		}, 66);
	}
	var sixth = null;
	var sixth_index = 344;
	//第六段
	function sixth_playAnimate() {
		isPlay = false;
		sixth = setInterval(function() {
			group.removeAllChildren();
			if(index >= sixth_index) {
				index = sixth_index;
			} else {
				index++;
				playFrame(index);
			}
			if(index >= sixth_index) {
				clearInterval(sixth);
				playFrame(index);
				isPlay = true;
				hint_img(aHint_txt_1);
			}

		}, 66);
	}
	var seventh = null;
	var seventh_index = 589;
	//第七段
	function seventh_playAnimate() {
		isPlay = false;
		seventh = setInterval(function() {
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
				setTimeout(function() {
					is_touchDouble = true;
					is_click = true;
					hintHand(Imgs[Imgs.length - 1].src,winW / 2 + 50, 500, "请左右滑动和双击屏幕看看", winW / 2 - 100, 600, "#333");
				}, 1000);
			}

		}, 66);
	}
	first_playAnimate();

	document.addEventListener('touchstart', function() {
		if(isPlay) {
			hintGroup.removeAllChildren();
			touch_num++;
			switch(touch_num) {
				case 1:
					second_playAnimate();
					playSound(2);
					break;
				case 2:
					third_playAnimate();
					playSound(2);
					break;
				case 3:
					fourth_playAnimate();
					playSound(2);
					break;
				case 4:
					fifth_playAnimate();
					playSound(2);
					break;
				case 5:
					sixth_playAnimate();
					playSound(3);
					break;
				case 6:
					seventh_playAnimate();
					playSound(4);
					break;
			}
		}

	}, false);

	function onPressMove(obj) {

		var touch_startX = 0,
			touch_moveX = 0,
			touch_endX = 0,
			positionX = 0,
			touch_startY = 0,
			touch_moveY = 0,
			touch_endY = 0,
			positionY = 0;

		var px = 0,
			py = 0;

		obj.on('mousedown', function(event) {
			hintGroup.removeAllChildren();
			touch_startX = event.stageX;
			touch_startY = event.stageY;
			positionX = obj.x;
			positionY = obj.y;
			console.log('drawRect.x:'+drawRect.x+"    "+"drawRect.y:"+drawRect.y);
			return px = event.stageX, py = event.stageY, positionX, positionY;

		});
		obj.on('pressmove', function(event) {
			touch_moveX = event.stageX - touch_startX + positionX;
			touch_moveY = event.stageY - touch_startY + positionY;
			if(isMagnify) {
				if(touch_moveX > 0 || touch_moveX < -imgOffsetWidth * os + winW) {} else {
					drawRect.x = touch_moveX;
				}
				console.log(touch_moveX + '     ' + touch_moveY);
				if(touch_moveY > 0 || touch_moveY < -imgOffsetHeight * os + winH) {} else {
					drawRect.y = touch_moveY;
				}
			} else {
				if(touch_moveX > 0 || touch_moveX < -imgOffsetWidth * sc + winW) {} else {
					drawRect.x = touch_moveX;
				}
			}
		});
		obj.on("pressup", function() {
			touch_endX = touch_moveX - touch_startX;
		});
		var touch_startTime = 0;
		var touch_downTime = 0;
		var new_x = 0,
			new_y = 0;
		var db=true;
		document.addEventListener('touchstart', function() {
			if(is_touchDouble) {
				if(0 == touch_startTime) {
					touch_startTime = Date.now();
				} else {
					touch_downTime = Date.now();
					if(touch_downTime - touch_startTime < 500) {
						setIsBtn();
						isMagnify = !isMagnify;
						//is_touchDouble = false;
						hintSlideHand(Imgs[Imgs.length - 4].src,winW / 2 , winH / 2 - 50, "请左右滑动和双击屏幕看看", winW / 2-100 , winH / 2 + 50, "#333");
						if(db){
							drawRect.scaleX = os;
							drawRect.scaleY = os;

							new_x = (drawRect.x-px)*os-320*os;
							new_y = (drawRect.y-py)*os;
							
							console.log('new_x:'+new_x+'   new_y:'+new_y);
							
							drawRect.x = new_x;
							drawRect.y = new_y;
						}else{
							
							var nx=drawRect.x*sc+winW;
							
							if(nx>=0){
								nx=0;
							}else if(nx<-(imgOffsetWidth * sc  - winW)){
								nx=-(imgOffsetWidth * sc  - winW);
							}
							console.log('nx:'+nx);
							drawRect.x = nx;
							drawRect.y = 0;
							drawRect.scaleX = sc;
							drawRect.scaleY = sc;

						}
						

					} else {
						touch_startTime = Date.now();
					}
				}
			}

		}, false);
		function setIsBtn(){
			setTimeout(function(){
				db=!db;
			},1000);
		}
	}
}
