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
var is_click=false;
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
	var imgOffsetWidth = 1575; //图片本身宽度
	var imgOffsetHeight = 1120; //图片本身高度

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
	var hint_hand = new createjs.Bitmap(Imgs[Imgs.length - 1].src);
	hint_hand.alpha = 0;

	function hintHand(x, y, t, tx, ty, color) {
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

	//提示图片
	var hint_img_1 = new createjs.Bitmap(Imgs[Imgs.length - 3].src);
	hint_img_1.x = 0;
	hint_img_1.y = 0;
	hint_img_1.scaleX = winW / imageWidth;
	hint_img_1.scaleY = winH / imageHeight;
	hint_img_1.alpha = 0;

	var hint_img_2 = new createjs.Bitmap(Imgs[Imgs.length - 2].src);
	hint_img_2.x = 0;
	hint_img_2.y = 0;
	hint_img_2.scaleX = winW / imageWidth;
	hint_img_2.scaleY = winH / imageHeight;
	hint_img_2.alpha = 0;

	function hint_img(obj) {
		hintGroup.addChild(obj);
		var tween = createjs.Tween.get(obj, {
			loop: 0
		}).to({
			alpha: 1
		}, 500, createjs.Ease.liner);
	}

	//定帧大图
	var drawRect = new createjs.Bitmap(Imgs[Imgs.length - 6].src);
	drawRect.x = -(imgOffsetWidth * ratio / 2 - winW / 2);
	drawRect.y = 0;
	drawRect.scaleX = ratio;
	drawRect.scaleY = ratio;

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
				hintHand(winW / 2 + 50, winH / 2 - 50, "请点击屏幕", winW / 2 + 100, winH / 2 + 50, "#fff");
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
				hintHand(winW / 2 + 100, winH / 2 + 10, "请点击屏幕", winW / 2 + 100, winH / 2 + 100, "#fff");
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
				hintHand(winW / 2, winH / 2, "请点击屏幕", winW / 2 + 50, winH / 2 + 100, "#fff");
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
				hintHand(winW / 2 - 160, winH / 2 + 130, "请点击屏幕", winW / 2 - 100, winH / 2 + 230, "#fff");
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
				hint_img(hint_img_1);
			}

		}, 66);
	}
	var sixth = null;
	var sixth_index = 320;
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
				hint_img(hint_img_2);
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
				//group.addChild(drawRect);
				//onPressMove(drawRect);
				setTimeout(function() {
					is_touchDouble = true;
					is_click=true;
					document.querySelector('.controls').style.display = 'block';
					//hintHand(winW / 2 + 50, 500, "请左右屏幕", winW / 2 + 100, 600, "#333");
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

			return px = event.stageX, py = event.stageY;

		});
		obj.on('pressmove', function(event) {
			touch_moveX = event.stageX - touch_startX + positionX;
			touch_moveY = event.stageY - touch_startY + positionY;
			if(isMagnify) {
				if(touch_moveX > 0 || touch_moveX < (-imgOffsetWidth * ratio) * 2 + winW) {} else {
					drawRect.x = touch_moveX;
				}
				if(touch_moveY > 0 || touch_moveY < (-imgOffsetHeight * ratio) * 2 + winH) {} else {
					drawRect.y = touch_moveY;
				}
			} else {
				if(touch_moveX > 0 || touch_moveX < -imgOffsetWidth * ratio + winW) {} else {
					drawRect.x = touch_moveX;
				}
			}
		});
		obj.on("pressup", function() {
			touch_endX = touch_moveX - touch_startX;
		});

	}
}

//滑动图片

var img_StartX = 0;
var img_StartY = 0;
var img_MoveX = 0;
var img_MoveY = 0;
var img_StartX_1 = 0;
var img_StartY_1 = 0;
var img_MoveX_1 = 0;
var img_MoveY_1 = 0;
var img_StartX_2 = 0;
var img_StartY_2 = 0;
var img_MoveX_2 = 0;
var img_MoveY_2 = 0;

var windowH = window.innerHeight;
var windowW = window.innerWidth;
var is_Scale = false;
var touch_startTime = 0;
var touch_downTime = 0;
var sc = 0,
	sc_2 = 0;

var n = 0; //水平
var m = 0; //垂直
var sn = 0; //水平
var sm = 0; //垂直
var left_margin = -img_Width / 2;
var right_margin = img_Width / 2;
var top_margin = 0;
var bottom_margin = 0;

var left_margin_scale = 0;
var right_margin_scale = 0;
var top_margin_scale = 0;
var bottom_margin_scale = 0;

var translate_x = 0;
var translate_y = 0;
var is_left = true;
var is_right = true;
var is_up = true;
var is_down = true;
var translate_x_s = 0;
var translate_y_s = 0;
var is_left_s = true;
var is_right_s = true;
var is_up_s = true;
var is_down_s = true;

var st=0;
var sl=0;
var stx=0;
var sty=0;
var db=true;
var is_shrink=false;

var ss = 1120 / img_Height;

slideImg.style.width = ss * img_Width + 'px';

slideImg.style.top = -(img_Height * ss - windowH) / 2 + 'px';
slideImg.style.left = -(img_Width * ss - windowW) / 2 + 'px';
var o=0;
document.addEventListener('touchstart', function(e) {	
	
	if(is_click){
		if(o<1){
			o++
			document.querySelector('.controls span:nth-child(2)').style.display='none';
		}
	}
	if(is_touchDouble) {
		
		if(0 == touch_startTime) {
			touch_startTime = Date.now();
		} else {
			stx = e.touches[0].pageX;
			sty = e.touches[0].pageY;

			touch_downTime = Date.now();
			if(touch_downTime - touch_startTime < 500) {
				setIsBtn();
				is_Scale = !is_Scale;
				if(!db){
					is_shrink=false;
					slideImg.style.width = img_Width + 'px';
					st = -(img_Height - windowH) / 2 - (sty - windowH / 2);
					sl = -(img_Width - windowW) / 2 - (stx - windowW / 2)
					if(st >= 0) {
						st = 0;
					} else if(st <= -img_Height + windowH) {
						st = -img_Height + windowH;
					}
					if(sl >= 0) {
						sl = 0;
					} else if(sl <= -img_Width + windowW) {
						sl = -img_Width + windowW;
					}
					slideImg.style.top = st + 'px';
					slideImg.style.left = sl + 'px';
					return st,sl;
				}else{
					is_shrink=true;
					slideImg.style.width = ss * img_Width + 'px';
					st = -(ss * img_Height - windowH) / 2 - (sty - windowH / 2);
					sl = -(ss * img_Width - windowW) / 2 - (stx - windowW / 2)
					if(st >= 0) {
						st = 0;
					} else if(st <= -ss * img_Height + windowH) {
						st = -ss * img_Height + windowH;
					}
					if(sl >= 0) {
						sl = 0;
					} else if(sl <= -ss * img_Width + windowW) {
						sl = -ss * img_Width + windowW;
					}
					slideImg.style.top = st + 'px';
					slideImg.style.left = sl + 'px';
					$(".controls span:first-child img").css({
						'-webkit-transform': "translate(" + 0 + "px," + 0 + "px)",
						'transform': "translate(" + 0 + "px," + 0 + "px)"
					});
					return st,sl;
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

$(".controls span:first-child img").swipeLeft(function(e) {
	e.preventDefault();
	if(is_Scale) {
		is_right_s = true;
		if(is_left_s) {
			sn--;
		}
		translate_x_s = sn * 300;

		if(translate_x_s <= -(img_Width  - windowW+sl)) {
			translate_x_s = -(img_Width - windowW+sl);
			is_left_s = false;
		}
		console.log('放大后--left'+sn+'+'+sm);
		$(".controls span:first-child img").css({
			'-webkit-transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)",
			'transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)"
		});
	} else {
		if(is_shrink){
			is_right = true;
			if(is_left) {
				n--;
			}
			translate_x = n * 300;
	
			if(translate_x <= -(img_Width * ss - windowW) / 2) {
				translate_x = -(img_Width * ss - windowW) / 2;
				is_left = false;
			}
		}else{
			is_right = true;
			if(is_left) {
				n--;
			}
			translate_x = n * 300;
	
			if(translate_x <= -(img_Width * ss - windowW+sl) / 2) {
				translate_x = -(img_Width * ss - windowW+sl) / 2;
				is_left = false;
			}
		}
		

		$(".controls span:first-child img").css({
			'-webkit-transform': "translate(" + translate_x + "px," + translate_y + "px)",
			'transform': "translate(" + translate_x + "px," + translate_y + "px)"
		});

	}
});
$(".controls span:first-child img").swipeRight(function(e) {
	e.preventDefault();
	if(is_Scale) {
		is_left_s = true;
		if(is_right_s) {
			sn++;
		}
		translate_x_s = sn * 300;

		if(translate_x_s >= -sl) {
			translate_x_s = -sl;
			is_right_s = false;
		}
		console.log('放大后--right'+sn+'+'+sm);
		$(".controls span:first-child img").css({
			'-webkit-transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)",
			'transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)"
		});
	} else {
		if(is_shrink){
			is_left = true;
			if(is_right) {
				n++;
			}
			translate_x = n * 300;
	
			if(translate_x >= -sl) {
				translate_x = -sl;
				is_right = false;
			}
		}else{
			is_left = true;
			if(is_right) {
				n++;
			}
			translate_x = n * 300;
	
			if(translate_x >= (img_Width * ss - windowW-sl) / 2) {
				translate_x = (img_Width * ss - windowW-sl) / 2;
				is_right = false;
			}
		}
		$(".controls span:first-child img").css({
			'-webkit-transform': "translate(" + translate_x + "px," + translate_y + "px)",
			'transform': "translate(" + translate_x + "px," + translate_y + "px)"
		});

	}

});
$(".controls span:first-child img").swipeUp(function(e) {
	e.preventDefault();
	if(is_Scale) {
		is_down_s = true;
		if(is_up_s) {
			sm--;
		}
		translate_y_s = sm * 300;

		if(translate_y_s <= -(img_Height  - windowH+st)) {
			translate_y_s = -(img_Height - windowH+st);
			is_up_s = false;
		}
		console.log('放大后--UP'+sn+'+'+sm);
		$(".controls span:first-child img").css({
			'-webkit-transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)",
			'transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)"
		});
	} else {
		is_dowm = true;

	}

});
$(".controls span:first-child img").swipeDown(function(e) {
	e.preventDefault();
	if(is_Scale) {
		is_up_s = true;
		if(is_down_s) {
			sm++;
		}
		translate_y_s = sm * 300;

		if(translate_y_s >= -st) {
			translate_y_s = -st;
			is_down_s = false;
		}
		console.log('放大后--Down'+sn+'+'+sm);
		$(".controls span:first-child img").css({
			'-webkit-transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)",
			'transform': "translate(" + translate_x_s + "px," + translate_y_s + "px)"
		});
	} else {
		is_up = true;

	}

});

//document.addEventListener('touchstart', onTouchStart, false);
//
//function onTouchStart(e) {
//	
//	if( e.touches.length==2){
//		for(var i=0;i<2;i++){
//			img_StartX_1 = e.touches[0].pageX;
//			img_StartY_1 = e.touches[0].pageY;
//			img_StartX_2 = e.touches[1].pageX;
//			img_StartY_2 = e.touches[1].pageY;
//		}
//	}else{
//		var _touch = e.touches[0];
//
//		img_StartX = _touch.pageX - slideImg.offsetLeft;
//		img_StartY = _touch.pageY - slideImg.offsetTop;
//	}
//	
//	
//
//	slideImg.addEventListener('touchmove', onTouchMove, false);
//	slideImg.addEventListener('touchend', onTouchEnd, false);
//
//}
//
//function onTouchMove(e) {
//
//	if( e.touches.length==2){
//		for(var i=0;i<e.touches.length;i++){
//			img_MoveX_1 = e.touches[0].pageX;
//			img_MoveY_1 = e.touches[0].pageY;
//			img_MoveX_2 = e.touches[1].pageX;
//			img_MoveY_2 = e.touches[1].pageY;
//		}
//		sc_2 = Math.abs(img_MoveX_1 - img_MoveX_2) / (img_StartX_1 - img_StartX_2);
//		
//		document.title=sc_2;
//		
//		slideImg.style.transform = 'scale('+sc_2+')';
//		slideImg.style.webkitTransform = 'scale('+sc_2+')';
//		slideImg.style.top=-parseInt(img_StartX)*sc_2+'px';
//		slideImg.style.left=-parseInt(img_StartY)*sc_2+'px';
//		
//	}else{
//		var _touch = e.touches[0];
//
//		img_MoveX = _touch.pageX - parseInt(img_StartX);
//		img_MoveY = _touch.pageY - parseInt(img_StartY);
//	
//		if(is_Scale) {
//			if(parseInt(img_MoveX) < 0 && parseInt(img_MoveX) > -img_Width * sc + windowW) {
//				slideImg.style.left = parseInt(img_MoveX) + 'px';
//			}
//			if(parseInt(img_MoveY) < 0 && parseInt(img_MoveY) > -img_Height * sc + windowH) {
//				slideImg.style.top = parseInt(img_MoveY) + 'px';
//			}
//		} else {
//			if(parseInt(img_MoveX) < 0 && parseInt(img_MoveX) > -img_Width + windowW) {
//				slideImg.style.left = parseInt(img_MoveX) + 'px';
//			}
//		}
//	}
//
//	
//}
//
//function onTouchEnd() {
//
//}
//
//document.addEventListener('touchstart', function() {
//	if(is_touchDouble) {
//		if(0 == touch_startTime) {
//			touch_startTime = Date.now();
//		} else {
//
//			touch_downTime = Date.now();
//			if(touch_downTime - touch_startTime < 500) {
//				is_touchDouble = false;
//				is_Scale = true;
//				sc=2;
//				slideImg.style.transform = 'scale('+sc+')';
//				slideImg.style.webkitTransform = 'scale('+sc+')';
//				slideImg.style.top=-(img_Height * sc-windowH)/2+'px';
//				slideImg.style.left=-(img_Width * sc-windowW)/2+'px';
//
//			} else {
//				touch_startTime = Date.now();
//			}
//		}
//	}
//
//}, false);