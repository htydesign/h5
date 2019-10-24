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

	var isPlayFrame = false;
	var touch_num = 0;

	var oHint = document.querySelector('.hint-box');
	var oHint_Img = document.querySelector('.hint-box span:nth-child(2) img');

	var canvas = document.getElementById("canvas");
	canvas.width = winW;
	canvas.height = winH;

	//桌面
	var scene = new createjs.Stage("canvas");
	createjs.Touch.enable(scene);
	
	var setFTP=65; //设置帧频数 每秒 15张
	//createjs.Ticker.framerate=15;
	createjs.Ticker.interval = setFTP+1;
	createjs.Ticker.addEventListener("tick", function() {
		scene.update();
		console.log(createjs.Ticker.getFPS());
	});

	//组
	var group = new createjs.Container();
	group.x = 0;
	group.y = 0;
	scene.addChild(group);

	var hintGroup = new createjs.Container();
	hintGroup.x = 0;
	hintGroup.y = 0;
	scene.addChild(hintGroup);

	var hintBtn = new createjs.Container();
	hintBtn.x = 0;
	hintBtn.y = 0;

	//播放序列帧
	function playFrame(i) {
		var bitmap = new createjs.Bitmap(Imgs[i].src);
		bitmap.x = bitmap.y = 0;
		bitmap.scaleX = winW / imageWidth;
		bitmap.scaleY = winH / imageHeight;
		group.addChild(bitmap);
	}
	//提示的小手
	function hintHand(imgSrc, x, y) {
		var hint_hand = new createjs.Bitmap(imgSrc);
		hint_hand.alpha = 0;
		hint_hand.x = x;
		hint_hand.y = y;
		hintGroup.addChild(hint_hand);
		var tween = createjs.Tween.get(hint_hand, {
			loop: true
		}).to({
			alpha: 1
		}, 1000, createjs.Ease.liner).to({
			alpha: 0
		}, 1000, createjs.Ease.liner);

	}
	//左右滑动提示
	function hintSlideHand(imgSrc, x, y, t, tx, ty, color) {
		var hint_hand = new createjs.Bitmap(imgSrc);
		hint_hand.alpha = 0;
		hint_hand.x = x;
		hint_hand.y = y;
		hint_hand.rotation = -20;
		hintGroup.addChild(hint_hand);
		var tween = createjs.Tween.get(hint_hand, {
			loop: true
		}).to({
			x: hint_hand.x + 20,
			alpha: 1
		}, 500, createjs.Ease.liner).to({
			x: hint_hand.x + 20,
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
		}, 1000, createjs.Ease.cubicInOut).to({
			alpha: 0
		}, 1000, createjs.Ease.cubicInOut);
		hintGroup.addChild(txt);

	}
	//提示图片

	var aHint_txt_2 = ["看板娘呢？", "狐妖小红娘呢？", "韩信呢？", "李白呢？", "初音未来呢？", "什么鬼？"];
	var aHint_txt_1 = ["他们去哪了？", "去哪了？", "哪？", "？？？？", "？？？？？？？？"];

	function hint_img(arr) {
		var hint_img_1 = new createjs.Bitmap(Imgs[Imgs.length - 8].src);
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
		for(var i = 0; i < 15; i++) {
			var rand = Math.floor(Math.random() * 0xFFFFFF).toString(16);
			var c = "#" + rand;
			var t = arr[parseInt(Math.random() * arr.length)];
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
				x: txt.x - 2200
			}, rt(), createjs.Ease.liner);
			hintGroup.addChild(txt);

		}
		var hint_img_btn_1 = new createjs.Bitmap(Imgs[Imgs.length - 2].src);
		hint_img_btn_1.regX = 376 / 2;
		hint_img_btn_1.regY = 313 / 2;
		hint_img_btn_1.x = winW / 2;
		hint_img_btn_1.y = winH / 2;
		hint_img_btn_1.scaleX = hint_img_btn_1.scaleY = 0.8;
		hintBtn.alpha = 0;
		hintBtn.addChild(hint_img_btn_1);

		var tween1 = createjs.Tween.get(hint_img_btn_1, {
			loop: true
		}).to({
			scaleX: 1.2,
			scaleY: 1.2,
		}, 700, createjs.Ease.liner).to({
			scaleX: 0.8,
			scaleY: 0.8,
		}, 700, createjs.Ease.liner);

		var hint_img_btn_2 = new createjs.Bitmap(Imgs[Imgs.length - 1].src);
		hint_img_btn_2.x = winW / 2 - 50;
		hint_img_btn_2.y = winH / 2 + 50;
		hintBtn.addChild(hint_img_btn_2);

		scene.addChild(hintBtn);
		var tweenGroup = createjs.Tween.get(hintBtn, {
			loop: 0
		}).to({
			alpha: 1
		}, 2000, createjs.Ease.quintInOut);
	}

	function rt() {
		return Math.random() * 8000 + 4000;
	}

	function rx() {
		return Math.random() * 1200 + 600;
	}

	function ry() {
		return Math.random() * 960;
	}

	//定帧大图
	var drawRect = new createjs.Bitmap(Imgs[Imgs.length - 9].src);
	var sc = 1120 / img_Height;
	drawRect.x = -(imgOffsetWidth * sc / 2 - winW / 2);
	drawRect.y = 0;
	drawRect.scaleX = sc;
	drawRect.scaleY = sc;

	var os = 1 / sc;

	var LastTime = 0;
	var first_index = 52;
	//第一段
	function first_playAnimate() {
		isPlayFrame = false;
		var dtNow = Date.now();

		if(index >= first_index) {
			index = first_index;

		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= first_index) {
			isPlayFrame = true;
			hintHand(Imgs[Imgs.length - 6].src, winW / 2 - 137, winH / 2 - 172);
			window.cancelAnimationFrame(first_playAnimate);
		} else {
			window.requestAnimationFrame(first_playAnimate);
		}

	}
	var second_index = 89;
	//第二段
	function second_playAnimate() {
		isPlayFrame = false;
		var dtNow = Date.now();
		if(index >= second_index) {
			index = second_index;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= second_index) {
			isPlayFrame = true;
			hintHand(Imgs[Imgs.length - 5].src, 0, winH / 2 - 295);
			window.cancelAnimationFrame(second_playAnimate);
		} else {
			window.requestAnimationFrame(second_playAnimate);
		}
	}
	var third_index = 156;
	//第三段
	function third_playAnimate() {
		isPlayFrame = false;
		var dtNow = Date.now();
		if(index >= third_index) {
			index = third_index;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}

		if(index >= third_index) {
			isPlayFrame = true;
			hintHand(Imgs[Imgs.length - 4].src, winW / 2 - 54, winH / 2 - 105);
			window.cancelAnimationFrame(third_playAnimate);
		} else {
			window.requestAnimationFrame(third_playAnimate);
		}

	}
	var fourth_index = 208;
	//第四段
	function fourth_playAnimate() {
		isPlayFrame = false;
		var dtNow = Date.now();
		if(index >= fourth_index) {
			index = fourth_index;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= fourth_index) {
			isPlayFrame = true;
			hintHand(Imgs[Imgs.length - 3].src, 1, winH / 2 - 6);

			window.cancelAnimationFrame(fourth_playAnimate);
		} else {
			window.requestAnimationFrame(fourth_playAnimate);
		}
	}
	var fifth_index = 254;
	//第五段
	function fifth_playAnimate() {
		isPlayFrame = false;
		var dtNow = Date.now();
		group.removeAllChildren();
		if(index >= fifth_index) {
			index = fifth_index;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= fifth_index) {
			isPlayFrame = true;
			hint_img(aHint_txt_2);

			window.cancelAnimationFrame(fifth_playAnimate);
		} else {
			window.requestAnimationFrame(fifth_playAnimate);
		}
	}
	var sixth_index = 344;
	//第六段
	function sixth_playAnimate() {
		isPlayFrame = false;
		var dtNow = Date.now();
		if(index >= sixth_index) {
			index = sixth_index;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= sixth_index) {
			isPlayFrame = true;
			hint_img(aHint_txt_1);
			window.cancelAnimationFrame(sixth_playAnimate);
		} else {
			window.requestAnimationFrame(sixth_playAnimate);
		}
	}
	var seventh_index = 589;
	//第七段
	function seventh_playAnimate() {
		isPlayFrame = false;
		var dtNow = Date.now();
		if(index >= seventh_index) {
			index = seventh_index;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}

		if(index >= seventh_index) {
			group.addChild(drawRect);
			onPressMove(drawRect);
			setTimeout(function() {
				//is_touchDouble = true;
				hintSlideHand(Imgs[Imgs.length - 7].src, winW / 2, winH / 2 - 50, "请左右滑动屏幕看看", winW / 2 - 100, winH / 2 + 50, "#333");
			}, 1000);

			window.cancelAnimationFrame(seventh_playAnimate);
		} else {
			window.requestAnimationFrame(seventh_playAnimate);
		}
	}
	first_playAnimate();

	document.addEventListener('touchstart', function() {
		if(isPlayFrame) {
			hintBtn.removeAllChildren();
			hintGroup.removeAllChildren();
			touch_num++;
			switch(touch_num) {
				case 1:
					second_playAnimate();
					console.log('second_playAnimate');
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
			console.log('drawRect.x:' + drawRect.x + "    " + "drawRect.y:" + drawRect.y);
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
		var db = true;
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
						hintSlideHand(Imgs[Imgs.length - 7].src, winW / 2, winH / 2 - 50, "请左右滑动和双击屏幕看看", winW / 2 - 100, winH / 2 + 50, "#333");
						if(db) {
							drawRect.scaleX = os;
							drawRect.scaleY = os;

							new_x = (drawRect.x - px) * os - 320 * os;
							new_y = (drawRect.y - py) * os;

							console.log('new_x:' + new_x + '   new_y:' + new_y);

							drawRect.x = new_x;
							drawRect.y = new_y;
						} else {

							var nx = drawRect.x * sc + winW;

							if(nx >= 0) {
								nx = 0;
							} else if(nx < -(imgOffsetWidth * sc - winW)) {
								nx = -(imgOffsetWidth * sc - winW);
							}
							console.log('nx:' + nx);
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

		function setIsBtn() {
			setTimeout(function() {
				db = !db;
			}, 1000);
		}
	}
}