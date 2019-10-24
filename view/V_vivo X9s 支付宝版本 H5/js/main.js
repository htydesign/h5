//-------------------------------------------------------------------------------------------------------------

function $A(obj) {
	return document.querySelector(obj);
}

function $All(obj) {
	return document.querySelectorAll(obj);
}

function IsPC() {   
	var userAgentInfo = navigator.userAgent;   
	var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];   
	var flag = true;   
	for(var i = 0; i < Agents.length; i++) {
		if(userAgentInfo.indexOf(Agents[i]) > 0) {
			flag = false;
			break;
		} 
	}   
	return flag;
}

var touchEvents = {
	touchstart: "touchstart",
	touchmove: "touchmove",
	touchend: "touchend",
	initTouchEvents: function() {
		if(IsPC()) {
			this.touchstart = "mousedown";
			this.touchmove = "mousemove";
			this.touchend = "mouseup";
		}
	}
}

touchEvents.initTouchEvents();

var window_width = 640;
var window_height = 1138;

if(!IsPC()) {
	$('body,html').css('background-color', '#000000');
}
$('.container').css({
	"width": window_width + "px",
	"height": window_height + "px"
});



//------------------------------------------加载--------------------------------------------------
var oContainer = document.querySelector('.container');
var loading_container = $A('.loading-container');
var oImg = $A('.loading span:nth-child(1) img');
var loading_progress = $A('.loading-progress i');

var images_arr = [];
var frame_arr = [];

var loader = new PxLoader();
var loader2 = new PxLoader();

var nFile = imagesFile.concat(frame_file_1);
var base="https://files.vivo.com.cn/static/x9s/alipay/";
for(var i = 0; i < nFile.length; i++) {
	if(i < imagesFile.length) {
		images_arr.push(loader.addImage(base+nFile[i]));
	} else {
		frame_arr.push(loader.addImage(base+nFile[i]));
	}
}
for(var i = 0; i < frame_file_2.length; i++) {
	frame_arr.push(loader2.addImage(base+frame_file_2[i]));
}

//加载进度
loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
	setLoading(percent);
});

//加载完成
loader.addCompletionListener(function(e)  { 
	setTimeout(function() {
		loading_container.className = 'loading-container fadeOut';
		appendImages_1();
		loader2.start();
		setTimeout(function() {
			loading_container.style.display = 'none';
			setIndex();
		}, 500);
	}, 500);
}); 

//加载开始
loader.start();

function setLoading(progress) {
	oImg.style.filter = 'grayscale(' + (100 - progress) / 100 + ')';
	oImg.style.webkitFilter = 'grayscale(' + (100 - progress) / 100 + ')';
	oImg.style.opacity = progress / 100;
	loading_progress.style.width = progress + '%';
}

//------------------------------------------插入图片--------------------------------------------------
function appendImages_1() {
	$('.slogan-img img').attr('src', images_arr[14].src);
	$('#img_1').attr('src', images_arr[0].src);
	$('#img_2').attr('src', images_arr[1].src);
	$('.photo-phone').css({
		'background': 'url(' + images_arr[2].src + ') no-repeat',
		'background-size': '100% auto'
	});
	$('#img_4').attr('src', images_arr[3].src);
	$('#img_5').attr('src', images_arr[4].src);
	$('.pink-phone img').attr('src', images_arr[5].src);
	$('.rigth-phone img').attr('src', images_arr[7].src);
	$('.left-phone img').attr('src', images_arr[6].src);
	$('.txt_1').css({
		'background': 'url(' + images_arr[9].src + ') no-repeat'
	});
	$('.txt_2').css({
		'background': 'url(' + images_arr[10].src + ') no-repeat'
	});
	$('.txt_3').css({
		'background': 'url(' + images_arr[11].src + ') no-repeat'
	});
	$('.txt_4').css({
		'background': 'url(' + images_arr[12].src + ') no-repeat'
	});
	$('.txt_5').css({
		'background': 'url(' + images_arr[13].src + ') no-repeat'
	});

//	$('.poster').css({
//		'background': '#ffffff url(' + images_arr[15].src + ') no-repeat',
//		'background-position': '0px ' + 0 + 'px'
//	});
	$('#img_6').attr('src', images_arr[16].src);
	$('#img_7').attr('src', images_arr[17].src);
}

//-------------------------------------------主页---------------------------------------------------
function setIndex() {
	var oIndex = $A('.index');
	oIndex.className = 'index active';
	setTimeout(function() {
		oIndex.className = 'index active fadeOut';
		setTimeout(function() {
			oContainer.removeChild(oIndex);
			setPhoto();
		}, 500);
	}, 2500);
}

//-------------------------------------------拍照---------------------------------------------------
function setPhoto() {
	var oPhoto_container = $A('.photo');
	var oAppearance = $A('.appearance');
	var oPhoto_phone = $A('.photo-phone');
	var oColors_circle = $A('.colors_circle');
	var circle_container = $A('.circle_group');
	var circle_group = $All('.circle_group span');
	var photo_copy_1 = $A('.photo-copy-1');
	var photo_copy_2 = $A('.photo-copy-2');
	var photo_copy_3 = $A('.photo-copy-3');
	var photo_copy_4 = $A('.photo-copy-4');
	var photo_copy_5 = $A('.photo-copy-5');
	var txt_1 = $A('.txt_1');
	var txt_2 = $A('.txt_2');
	var txt_3 = $A('.txt_3');
	var txt_4 = $A('.txt_4');
	var txt_5 = $A('.txt_5');
	var pink_phone = $A('.pink-phone');
	var left_phone = $A('.left-phone');
	var right_phone = $A('.rigth-phone');
	var blue_point = $A('.blue_point');
	var circle_four = $A('.colors_bottom');
	var oPhoto_frame = $A('.photo-frame');
	var oSplash_screen = $A('.splash-screen');
	var oPhoto_fun = $A('.img-box span:nth-of-type(1)');
	var oBlur = $A('.img-box span:nth-of-type(2)');
	var img1 = document.getElementById("img_1");
	var img2 = document.getElementById("img_2");
	var img3 = document.getElementById("img_3");
	var canvas = document.getElementById("canvas");
	var w_width = 640;
	var h_height = 640;
	var angle = 0;
	var animationFrame = null;
	var w = 526;
	var h = 526;
	var x1 = -w_width / 2;
	var x2 = -w_width / 2;
	var a = 0;
	var b = 0;
	var speed = 15;

	setRotate();

	function setRotate() {

		var ctx = canvas.getContext('2d');

		canvas.width = w_width;
		canvas.height = h_height;
		canvas.style.paddingTop = 110 + 'px';

		draw();

		function draw() {

			ctx.clearRect(0, 0, w_width, h_height);

			animationFrame = window.requestAnimationFrame(draw);

			speed = speed * 0.98;

			if(x1 >= w_width / 2) {
				x1 = w_width / 2;
				window.cancelAnimationFrame(animationFrame);
			} else {
				x1 += speed;
			}
			if(x2 >= w_width / 2) {
				x2 = w_width / 2;
			} else {
				x2 += speed;
			}
			if(angle >= 360) {
				angle = 0;
			} else {
				angle += 1.5;
			}
			if(x1>0 && b==0){
				$('.skip').css('transform','translateX(0)');
				$('.skip').css('-webkit-transform','translateX(0)');
				b=1;
			}

			if(x1 > 200 && a == 0) {
				a = 1;
				oPhoto_frame.style.opacity = "1";
				setTimeout(function() {
					oSplash_screen.className = "splash-screen active";
					oPhoto_fun.style.display = "none";
					oBlur.style.filter = "blur(0px)";
					oBlur.style.webkitFilter = "blur(0px)";
					oPhoto_frame.style.transitionDuration = '0s';
					oPhoto_frame.style.webkitTransitionDuration = '0s';
					oPhoto_frame.style.opacity = "0";
					setTimeout(function() {
						translatePhoto();						
					}, 1000);					
				}, 1000);				
			}

			ctx.save();
			ctx.beginPath();
			ctx.translate(x1, w / 2);
			ctx.rotate(angle * Math.PI / 180);
			ctx.drawImage(img1, -w / 2, -w / 2, w, h);
			ctx.fill();
			ctx.closePath();
			ctx.restore();

			ctx.save();
			ctx.beginPath();
			ctx.translate(w_width - x2, w / 2);
			ctx.rotate(-angle * Math.PI / 180);
			ctx.drawImage(img2, -w / 2, -w / 2, w, h);
			ctx.fill();
			ctx.closePath();
			ctx.restore();

			ctx.save();
			ctx.beginPath();
			ctx.arc(w_width - x2, w / 2, w / 2, 0, Math.PI * 2);
			ctx.clip();
			ctx.closePath();

			ctx.beginPath();
			var grd = ctx.createLinearGradient(w_width / 2 - w / 2, 0, w_width / 2 + w / 2, 0);
			grd.addColorStop(0, "#ffe16a");
			grd.addColorStop(1, "#f6a82c");
			ctx.fillStyle = grd;
			ctx.arc(w_width / 2, w / 2, w / 2, Math.PI / 2, -Math.PI / 2);
			ctx.fill();
			ctx.closePath();
			ctx.restore();

			ctx.save();
			ctx.beginPath();
			ctx.arc(x1, w / 2, w / 2, 0, Math.PI * 2);
			ctx.clip();
			ctx.closePath();

			ctx.beginPath();
			var grd2 = ctx.createLinearGradient(w_width / 2 - w / 2, 0, w_width / 2 + w / 2, 0);
			grd2.addColorStop(0, "#ffe16a");
			grd2.addColorStop(1, "#f6a82c");
			ctx.fillStyle = grd2;
			ctx.arc(w_width / 2, w / 2, w / 2, -Math.PI / 2, Math.PI / 2);
			ctx.fill();
			ctx.closePath();
			ctx.restore();
		}
	}

	//拍照--》圆球移动放大、手机移动放大
	function translatePhoto() {
		canvas.style.display = 'none';
		oColors_circle.style.display = 'block';		
		setTimeout(function() {
			oColors_circle.style.transform = "translate(" + 200 + "px," + -400 + "px) scale(3) rotate(90deg)";
			oColors_circle.style.webkitTransform = "translate(" + 200 + "px," + -400 + "px) scale(3) rotate(90deg)";
			oPhoto_phone.style.transform = "translate(" + 180 + "px," + 380 + "px) scale(1.5)";
			oPhoto_phone.style.webkitTransform = "translate(" + 180 + "px," + 380 + "px) scale(1.5)";
			setTimeout(function() {
				photo_copy_1.style.opacity = 1;
				txt_1.style.animationPlayState = 'running';
				txt_1.style.webkitAnimationPlayState = 'running';
				$A('.txt_1_line_1').className = 'txt_1_line_1 toLeft';
				$A('.txt_1_line_2').className = 'txt_1_line_2 toUp';
				circle_four.style.opacity = 1;
				for(var i = 0; i < circle_group.length; i++) {
					circle_group[i].style.opacity = '1';
				}
				setTimeout(function() {
					oPhoto_phone.style.transform = "translate(" + 550 + "px," + 380 + "px) scale(1.5)";
					oPhoto_phone.style.webkitTransform = "translate(" + 550 + "px," + 380 + "px) scale(1.5)";
					setTimeout(function() {
						photo_copy_1.style.opacity = 0;
						photo_copy_2.style.opacity = 1;
						$A('.txt_2_line_1').className = 'txt_2_line_1 toLeft';
						$A('.txt_2_line_2').className = 'txt_2_line_2 toUp';
						txt_2.style.animationPlayState = 'running';
						txt_2.style.webkitAnimationPlayState = 'running';
						pink_phone.style.transform = "translate(0px,0px)";
						pink_phone.style.webkitTransform = "translate(0px,0px)";
						circle_four.style.borderColor = '#fde9c4';
						oPhoto_container.className = "photo active";
						oColors_circle.style.transform = "translate(" + 200 + "px," + -400 + "px) scale(3) rotate(215deg)";
						oColors_circle.style.webkitTransform = "translate(" + 200 + "px," + -400 + "px) scale(3) rotate(215deg)";
						setTimeout(function() {
							changeSceneToAppearance();
						}, 3000);
					}, 500);
				}, 3000);
			}, 100);
		}, 500);
	}

	//主页--》转场-->拍照
	function changeSceneToAppearance() {
		circle_four.className = 'colors_bottom';
		circle_four.style.transform = 'scale(0.1)';
		circle_four.style.webkitTransform = 'scale(0.1)';
		circle_four.style.opacity = 0;
		circle_container.style.transform = "translate(" + 500 + "px," + (30 - window_height) + "px)";
		circle_container.style.webkitTransform = "translate(" + 500 + "px," + (30 - window_height) + "px)";
		pink_phone.style.transform = "translate(580px,30px)";
		pink_phone.style.webkitTransform = "translate(580px,30px)";
		setTimeout(function() {
			left_phone.style.transform = "translate(" + -40 + "px," + -120 + "px) scale(0.38) rotate(5deg)";
			left_phone.style.webkitTransform = "translate(" + -40 + "px," + -120 + "px) scale(0.38) rotate(5deg)";
			right_phone.style.transform = "translate(" + -200 + "px," + -50 + "px) scale(0.38) rotate(-10deg)";
			right_phone.style.webkitTransform = "translate(" + -200 + "px," + -50 + "px) scale(0.38) rotate(-10deg)";
			setTimeout(function() {
				photo_copy_3.style.opacity = 1;
				$A('.txt_3_line_1').className = 'txt_3_line_1 toRight';
				$A('.txt_3_line_2').className = 'txt_3_line_2 toUp';
				txt_3.style.animationPlayState = 'running';
				txt_3.style.webkitAnimationPlayState = 'running';
				setTimeout(function() {
					photo_copy_3.style.opacity = 0;
					changeSceneToPerformance();
//					photo_copy_4.style.opacity = 1;
//					$A('.txt_4_line_1').className = 'txt_4_line_1 toRight';
//					$A('.txt_4_line_2').className = 'txt_4_line_2 toUp';
//					txt_4.style.animationPlayState = 'running';
//					txt_4.style.webkitAnimationPlayState = 'running';
//					left_phone.style.transform = "translate(" + -615 + "px," + 300 + "px) scale(1) rotate(0deg)";
//					left_phone.style.webkitTransform = "translate(" + -615 + "px," + 300 + "px) scale(1) rotate(0deg)";
//					right_phone.style.transform = "translate(" + 350 + "px," + 350 + "px) scale(1) rotate(0deg)";
//					right_phone.style.webkitTransform = "translate(" + 350 + "px," + 350 + "px) scale(1) rotate(0deg)";
//					setTimeout(function() {
//						changeSceneToPerformance();
//					}, 3000);
				}, 3000);
			}, 200);
		}, 100);
	}
	var blueArc = $A('.three_0');
	//拍照-->转场-->性能
	function changeSceneToPerformance() {
		left_phone.style.transitionDuration = '0.75s';
		left_phone.style.webkitTransitionDuration = '0.75s';
		left_phone.style.transform = "translate(" + -900 + "px," + 1100 + "px) scale(1) rotate(0deg)";
		left_phone.style.webkitTransform = "translate(" + -900 + "px," + 1100 + "px) scale(1) rotate(0deg)";
		right_phone.style.transitionDuration = '0.75s';
		right_phone.style.webkitTransitionDuration = '0.75s';
		right_phone.style.transform = "translate(" + 650 + "px," + 900 + "px) scale(1) rotate(0deg)";
		right_phone.style.webkitTransform = "translate(" + 650 + "px," + 900 + "px) scale(1) rotate(0deg)";
		photo_copy_4.style.opacity = 0;
		setTimeout(function() {
			oContainer.removeChild(oPhoto_container);
			oContainer.removeChild(oAppearance);
			blueArc.style.transform = 'translate(-470px, -480px) scale(1) rotate(45deg)';
			blueArc.style.webkitTransform = 'translate(-470px, -480px) scale(1) rotate(45deg)';
			photo_copy_5.style.opacity = 1;
			setTimeout(function() {
				txt_5.style.animationPlayState = 'running';
				txt_5.style.webkitAnimationPlayState = 'running';
				$A('.txt_5_line_1').className = 'txt_5_line_1 toRight';
				$A('.txt_5_line_2').className = 'txt_5_line_2 toDown';
				$A('.three_5').className = 'three_5 fadeIn';
				setPlayFrame();
			}, 350);			
		}, 550);
	}
}
//------------------------------------------填写您的预购信息--------------------------------------------------
var oCanvas = document.getElementById("playFrame");
oCanvas.width = 640;
oCanvas.height = 1138;

function setPlayFrame() {
	var scene = new createjs.Stage("playFrame");
	createjs.Touch.enable(scene);

	var setFTP = 66; //设置帧频数 每秒 15张
	createjs.Ticker.interval = setFTP + 1;
	createjs.Ticker.addEventListener("tick", function() {
		scene.update();
	});

	var index = -1;
	var n1 = 24;
	var n2 = 81;

	var LastTime = 0;
	var isTouch = false;
	var imageWidth = 640,
		imageHeight = 1138;
	var winW = window_width,
		winH = 1138;

	var group = new createjs.Container();
	group.x = 0;
	group.y = 0;
	scene.addChild(group);

	function playFrame(i) {
		var bitmap = new createjs.Bitmap(frame_arr[i]);
		if(frame_arr[i].width == '0') {
			$('.poster').fadeIn();
		}
		bitmap.x = 0;
		bitmap.y = 0;
		bitmap.scaleX = winW / imageWidth;
		bitmap.scaleY = winH / imageHeight;
		group.addChild(bitmap);
	}
	first_playAnimate();

	function first_playAnimate() {

		var dtNow = Date.now();

		if(index >= n1) {
			index = n1;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= n1) {
			window.cancelAnimationFrame(first_playAnimate);
			setTimeout(function() {
				second_playAnimate();
			}, 2000);
		} else {
			window.requestAnimationFrame(first_playAnimate);
		}
	}

	var b = 0;

	function second_playAnimate() {

		isPlayFrame = false;

		var dtNow = Date.now();

		if(index >= n2) {
			index = n2;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			if(index >= 37 && b == 0) {
				b = 1;
				oCanvas.style.background = '#ffffff';
			}

			playFrame(index);

		}
		if(index >= n2) {
			window.cancelAnimationFrame(second_playAnimate);
			//setTimeout(function() {
				$('.skip').css('transform','translateX(150px)');
				$('.skip').css('-webkit-transform','translateX(150px)');
				$('.poster').fadeIn();
				$('.slide-container').css('display', 'block');
				setTimeout(function() {
					$('.performance').remove();
					slidePage();
				}, 100);
			//}, 100);
		} else {
			window.requestAnimationFrame(second_playAnimate);
		}
	}
}

$('.skip').on(touchEvents.touchstart,function(){
	$('.index').hide();
	$('.photo').hide();
	$('.appearance').hide();
	$('.performance').hide();
	
	$('.skip').css('transform','translateX(150px)');
	$('.skip').css('-webkit-transform','translateX(150px)');
	$('.poster').fadeIn();
	$('.poster').css({
		'background': '#ffffff'
	});
	$('.slide-container').css('display', 'block');
	setTimeout(function() {
		slidePage();
	},100);
});

//------------------------------------------设置结尾滑动页面--------------------------------------------------
function slidePage() {
	$('.slide-container').addClass('fadeIn');
	var oli = $('.zfb-gift ul li');
	for(var i = 0; i < oli.length; i++) {
		if(i < oli.length / 2) {
			oli.eq(i).css('display', 'block');
		}
	}
	var n = 0;
	var bx = 0;
	var tx = 0;
	var isSlide = true;
	$('.bigimages-box ul').css('width', 2 * 640 + 'px');

	var ws = 0;
	var wy = 0;
	var isClick = false;
	var timer = null;
	$('.bclick i').on('click', function(e) {
		n = $(this).index() - 1;
		$('.show-bigimages').fadeIn();
		$('.bigimages-box ul').css('transform', 'translateX(' + -n * 640 + 'px)');
		$('.bigimages-box ul').css('-webkit-transform', 'translateX(' + -n * 640 + 'px)');
	});

	$('.bigimages-box i').on(touchEvents.touchstart, function() {
		isClick = false;
		$('.show-bigimages').fadeOut();
	});

	var isOpen = false;
	$('.zfb-gift h1:nth-of-type(2)').on('click', function() {
		if(isOpen) {
			for(var i = 0; i < oli.length; i++) {
				if(i >= oli.length / 2) {
					oli.eq(i).css('display', 'none');
				}
			}
			$('.zfb-gift h1:nth-of-type(2) i:nth-of-type(1)').show();
			$('.zfb-gift h1:nth-of-type(2) i:nth-of-type(2)').hide();
		} else {
			for(var i = 0; i < oli.length; i++) {
				if(i >= oli.length / 2) {
					oli.eq(i).css('display', 'block');
				}
			}
			$('.zfb-gift h1:nth-of-type(2) i:nth-of-type(1)').hide();
			$('.zfb-gift h1:nth-of-type(2) i:nth-of-type(2)').show();
		}
		isOpen = !isOpen;
	});
}

$('.toTop').on('click', function() {
	var speed = 200;
	$('.slide-container').animate({
		scrollTop: 0
	}, speed);
	return false;
});
$('.slide-container').bind('scroll', function() {
	if($('.slide-container').scrollTop() > 200) {
		$('.toTop').fadeIn();
	} else {
		$('.toTop').fadeOut();
	}
});
$(window).resize(function() {
	setHeight();
});
setHeight();

function setHeight() {
	var w_h = document.documentElement.clientHeight;
	if(w_h < 1020) {
		$('.bottom_span').css('height', 850 + 'px');
	} else {
		$('.bottom_span').css('height', 800 + 'px');
	}
}

//------------------------------------------判断手机横竖屏状态--------------------------------------------------
var browser = {
	versions: function() {
		var u = navigator.userAgent,
			app = navigator.appVersion;
		return { //移动终端浏览器版本信息
			trident: u.indexOf('Trident') > -1, //IE内核
			presto: u.indexOf('Presto') > -1, //opera内核
			webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
			gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
			mobile: !!u.match(/AppleWebKit.*Mobile/i) || !!u.match(/MIDP|SymbianOS|NOKIA|SAMSUNG|LG|NEC|TCL|Alcatel|BIRD|DBTEL|Dopod|PHILIPS|HAIER|LENOVO|MOT-|Nokia|SonyEricsson|SIE-|Amoi|ZTE/), //是否为移动终端
			ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
			android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器
			iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器
			iPad: u.indexOf('iPad') > -1, //是否iPad
			webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
		};
	}(),
	language: (navigator.browserLanguage || navigator.language).toLowerCase()
}
if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	$('.rotation-hint span img').attr("src", "https://files.vivo.com.cn/static/x9s/alipay/images/ios.png");
} else {
	$('.rotation-hint span img').attr("src", "https://files.vivo.com.cn/static/x9s/alipay/images/android.png");
}

//判断手机横竖屏状态：
function hengshuping() {
	if(window.orientation == 180 || window.orientation == 0) {
		//document.title = `竖屏状态!`;
		$('.rotation-hint').hide();

	}
	if(window.orientation == 90 || window.orientation == -90) {
		//document.title = `横屏状态!`;				
		$('.rotation-hint').show();
	}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

if(browser.versions.mobile) { //判断是否是移动设备打开。browser代码在下面
	var ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
	if(ua.match(/MicroMessenger/i) == "micromessenger") {
		//在微信中打开
	}
	if(ua.match(/WeiBo/i) == "weibo") {
		//在新浪微博客户端打开
	}
	if(ua.match(/QQ/i) == "qq") {
		//在QQ空间打开
	}
	if(browser.versions.ios) {
		//是否在IOS浏览器打开
	}
	if(browser.versions.android) {
		//是否在安卓浏览器打开
	}
} else {
	//否则就是PC浏览器打开
	$('.save h1').html('请截屏保存此页面');
}