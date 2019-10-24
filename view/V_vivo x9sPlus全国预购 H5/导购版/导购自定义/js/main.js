var shop_name; //门店名字
var shop_addr; //门店地址

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

if(IsPC()){
	$('body,html').css('background-color','#FFFFFF');
	$('.scene').css({"position":"absolute","top":"50%","left":"50%","transform":"translate(-50%,-50%)"});
}

$('.scene').css({"width":window_width+"px","height":window_height+"px"});

window.addEventListener(touchEvents.touchstart, function(e) {
	e.preventDefault();
}, false);
//------------------------------------------loading--------------------------------------------------
setLoading();
function setLoading() {
	var canvas = document.getElementById("loadingCanvas");
	var ctx = canvas.getContext('2d');

	var w = 200;
	var h = 200;
	var n = 0;
	var LastTime = 0;
	var setFTP = 40;
	var direct = true;
	canvas.width = w;
	canvas.height = h;

	var img = document.getElementById("loading_image")

	dramImage();

	function dramImage() {
		var dtNow = Date.now();
		requestAnimationFrame(dramImage);
		if(dtNow - LastTime >= setFTP) {
			if(direct) {
				n++
				if(n >= 96) {
					direct = false;
				}
			} else {
				n--;
				if(n <= 0) {
					direct = true;
				}
			}
			ctx.clearRect(0, 0, w, h);
			ctx.drawImage(img, n * w, 0, w, h, 0, 0, w, h);
			LastTime = dtNow;
		}
	}
}
//------------------------------------------加载--------------------------------------------------
var isLoaderFinish = true;
var images_arr = [];
var other_arr = [];
var percent = 0;
var nP = 0;
var loader = new PxLoader();
var loader2 = new PxLoader();

for(var i = 0; i < imagesFile.length; i++) {
	images_arr.push(loader.addImage(imagesFile[i]));
}
for(var i = 0; i < after_images.length; i++) {
	images_arr.push(loader2.addImage(after_images[i]));
}

//加载进度
loader.addProgressListener(function(e) {
	percent = Math.round((e.completedCount / e.totalCount) * 100); 
	if(percent <= 5) {
		percent = 5;
	}
	$('.loading p').html("Loading..." + percent + "%"); 

});

//加载完成
loader.addCompletionListener(function(e)  {     
	$('.loading').delay(500).fadeOut(function() {
		playFrame();
		setTimeout(function() {
			loader2.start();
		}, 1000);
		$('.poster').css('background','url(images/frame/vivo_311.jpg) no-repeat');
		$('.write-info').css('background','#c9e4ff url(images/img-09.jpg) no-repeat');
	});
}); 

//加载开始
loader.start();

//------------------------------------------插入图片--------------------------------------------------

function appendChildImages() {
	$('.write-info').css('background', 'url(' + other_arr[0].src + ') no-repeat top center');
}

//------------------------------------------main--------------------------------------------------

var winW = window_width,
	winH = 1138;

var canvas = document.getElementById("canvas");
canvas.width = winW;
canvas.height = winH;

//play序列帧
function playFrame() {
	//桌面
	var scene = new createjs.Stage("canvas");
	createjs.Touch.enable(scene);

	var setFTP = 83; //设置帧频数 每秒 15张
	//createjs.Ticker.framerate=15;
	createjs.Ticker.interval = setFTP + 1;
	createjs.Ticker.addEventListener("tick", function() {
		scene.update();
	});

	var index = 0;
	var n1 = 17;
	var n2 = 47;
	var n3 = 70;
	var n4 = 88;
	var n8 = 108;
	var n5 = 139;
	var n6 = 196;
	var n7 = 310;
	

	var LastTime = 0;
	var isTouch = false;
	var imageWidth = 640,
		imageHeight = 1138;

	var isPlayFrame = false;
	var canvas = document.getElementById("canvas");
	canvas.width = winW;
	canvas.height = winH;

	//组
	var group = new createjs.Container();
	group.x = 0;
	group.y = 0;
	scene.addChild(group);

	//播放序列帧
	function playFrame(i) {
		var bitmap = new createjs.Bitmap(images_arr[i]);
		if(images_arr[i].width=='0'){
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
			}, 1000);
		} else {
			window.requestAnimationFrame(first_playAnimate);
		}
	}

	function second_playAnimate() {

		isPlayFrame = false;

		var dtNow = Date.now();

		if(index >= n2) {
			index = n2;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= n2) {
			window.cancelAnimationFrame(second_playAnimate);
			setTimeout(function() {
				third_playAnimate();
			}, 1000);
		} else {
			window.requestAnimationFrame(second_playAnimate);
		}
	}

	function third_playAnimate() {

		var dtNow = Date.now();

		if(index >= n3) {
			index = n3;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= n3) {
			window.cancelAnimationFrame(third_playAnimate);
			setTimeout(function() {
				fourth_playAnimate();
			}, 1000);
		} else {
			window.requestAnimationFrame(third_playAnimate);
		}
	}

	function fourth_playAnimate() {

		var dtNow = Date.now();
		if(index >= n4) {
			index = n4;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= n4) {
			window.cancelAnimationFrame(fourth_playAnimate);
			setTimeout(function() {
				eighth_playAnimate();
			}, 1000);
		} else {
			window.requestAnimationFrame(fourth_playAnimate);
		}

	}
	
	function eighth_playAnimate() {

		var dtNow = Date.now();
		if(index >= n8) {
			index = n8;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= n8) {
			window.cancelAnimationFrame(eighth_playAnimate);
			setTimeout(function() {
				fifth_playAnimate();
			}, 1000);
		} else {
			window.requestAnimationFrame(eighth_playAnimate);
		}

	}

	function fifth_playAnimate() {
		if(isLoaderFinish) {
			var dtNow = Date.now();

			if(index >= n5) {
				index = n5;
			} else if(dtNow - LastTime >= setFTP) {
				group.removeAllChildren();
				LastTime = dtNow;
				index++;
				playFrame(index);
			}
			if(index >= n5) {
				window.cancelAnimationFrame(fifth_playAnimate);
				sixth_playAnimate();
			} else {
				window.requestAnimationFrame(fifth_playAnimate);
			}
		}
	}

	function sixth_playAnimate() {

		var dtNow = Date.now();

		if(index >= n6) {
			index = n6;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= n6) {
			window.cancelAnimationFrame(sixth_playAnimate);
			setTimeout(function() {
				seven_playAnimate();
			}, 1000);
		} else {
			window.requestAnimationFrame(sixth_playAnimate);
		}
	}
	function seven_playAnimate() {

		var dtNow = Date.now();

		if(index >= n7) {
			index = n7;
		} else if(dtNow - LastTime >= setFTP) {
			group.removeAllChildren();
			LastTime = dtNow;
			index++;
			playFrame(index);
		}
		if(index >= n7) {
			window.cancelAnimationFrame(seven_playAnimate);
			$('.poster').fadeIn();
		} else {
			window.requestAnimationFrame(seven_playAnimate);
		}
	}

}


//------------------------------------------填写您的门店信息--------------------------------------------------
examineInfo();
var isWrite=false;
function examineInfo() {

	var oAffirm = document.querySelector('.affirm');
	var userName = document.querySelector('.user-name');
	var userAddr = document.querySelector('.user-addr');
	var userPhone = document.querySelector('.user-phone');
	var userGift = document.querySelector('.user-gift');

	setReset();

	$('.btn_1').on(touchEvents.touchstart, function() {
		if(!isWrite){
			$('.write-info').fadeIn();
			setReset();
		}		
	});

	function setReset() {
		userName.value = '';
		userAddr.value = '';
		userPhone.value = '';
		userGift.value = '';

		userName.style.border = '2px solid #108fda';
		userAddr.style.border = '2px solid #108fda';
		userPhone.style.border = '2px solid #108fda';
		userGift.style.border = '2px solid #108fda';
	}

	oAffirm.addEventListener(touchEvents.touchstart, function() {

		function  checkTel(tel) {   
			var  mobile  =  /^1[34578]\d{9}$/ ,
				 phone  =  /^0\d{2,3}-?\d{7,8}$/;   
			return  mobile.test(tel)  ||  phone.test(tel);
		}

		if(userName.value == '') {
			userName.style.border = '2px solid red';
		} else if(userAddr.value == '') {
			userAddr.style.border = '2px solid red';
		} else if(userPhone.value == '') {
			userPhone.style.border = '2px solid red';
		} else if(!checkTel(userPhone.value)) {
			userPhone.style.border = '2px solid red';
		} else if(userGift.value == '') {
			userGift.style.border = '2px solid red';
		} else {
			$('.write-info').fadeOut();
			$('.poster').fadeIn();
			$('.poster p').fadeIn();
			//$('.gift-btn').fadeIn();
			isWrite=true;
			$('.btn_1').css({'top':'360px','background':'none','color':'#008cd6','font-size':'26px'});
			$('.btn_1').html('邀请用户预约');
			//$('.btn_1').css({'top':'360px','background':'url(../images/img-21.png) no-repeat'});
			$('.shop-name').html(userName.value);
			$('.shop-addr').html(userAddr.value);
			$('.shop-gift p').html(userGift.value);
			shop_name = userName.value;
			shop_addr = userAddr.value;
		}

	}, false);

	userName.addEventListener('focus', function() {
		userName.style.border = '2px solid #108fda';
	}, false);
	userAddr.addEventListener('focus', function() {
		userAddr.style.border = '2px solid #108fda';
	}, false);
	userPhone.addEventListener('focus', function() {
		userPhone.style.border = '2px solid #108fda';
	}, false);
	userGift.addEventListener('focus', function() {
		userGift.style.border = '2px solid #108fda';
	}, false);

	userName.addEventListener(touchEvents.touchstart, function(e) {
		e.stopPropagation();
	}, false);
	userAddr.addEventListener(touchEvents.touchstart, function(e) {
		e.stopPropagation();
	}, false);
	userPhone.addEventListener(touchEvents.touchstart, function(e) {
		e.stopPropagation();
	}, false);
	userGift.addEventListener(touchEvents.touchstart, function(e) {
		e.stopPropagation();
	}, false);
}

//------------------------------------------点击显示礼品--------------------------------------------------
showGift();

function showGift() {
	$('.gift-btn').on(touchEvents.touchstart, function() {
		$('.gift').fadeIn();
	});
	$('.gift-close').on(touchEvents.touchstart, function() {
		$('.gift').fadeOut();
	});
}

//------------------------------------------返回定帧海报页面--------------------------------------------------

goBack();

function goBack() {
	$('.go-black1').on(touchEvents.touchstart, function() {
		$('.write-info').fadeOut();
		$('.save').hide();
	});
}

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
	$('.rotation-hint span img').attr("src", "images/ios.png");
} else {
	$('.rotation-hint span img').attr("src", "images/android.png");
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