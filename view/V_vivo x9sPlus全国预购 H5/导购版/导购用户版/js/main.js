//用户是否第一次进入---》导购用户版版
function UrlSearch() {  
	var name, value;  
	var str = location.href; //取得整个地址栏
	  
	var num = str.indexOf("?"),
		str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
	  
	var arr = str.split("&"); //各个参数放到数组里
	  
	for(var i = 0; i < arr.length; i++) {   
		num = arr[i].indexOf("=");   
		if(num > 0) {    
			name = arr[i].substring(0, num);    
			value = arr[i].substr(num + 1);    
			this[name] = value;    
		}   
	}
}
var Request = new UrlSearch(); //实例化

var shop_name = decodeURI(decodeURI(Request.name)); //门店名字
var shop_addr = decodeURI(decodeURI(Request.addr)); //门店地址
var shop_gift = decodeURI(decodeURI(Request.sale)); //门店礼物
var shop_phone = decodeURI(decodeURI(Request.mobile)); //门店电话

var isJoin_user = true;

if(Request.num == 1) {
	isJoin_user = false;
} else if(Request.num == 2) {
	isJoin_user = true;
} else {
	isJoin_user = false;
}

if(isJoin_user) {
	$('.btn_2').show();
	$('.btn_1').hide();
} else {
	$('.btn_1').show();
	$('.btn_2').hide();
}

$('.shop-name').html(shop_name);
$('.shop-addr').html(shop_addr);
$('.shop-gift p').html(shop_gift);

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
console.log(images_arr)    
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


//------------------------------------------填写您的预购信息--------------------------------------------------
examineInfo();

function examineInfo() {

	var oAffirm = document.querySelector('.affirm');
	var userName = document.querySelector('.user-name');
	var userPhone = document.querySelector('.user-phone');
	setReset();
	$('.btn_1').on(touchEvents.touchstart, function() {
		$('.write-info').fadeIn();

		setReset();
	});

	function setReset() {
		userName.value = '';
		userPhone.value = '';
		userName.style.border = '2px solid #108fda';
		userPhone.style.border = '2px solid #108fda';
		$('.t1').hide();
		$('.t2').hide();
		$('.t3').hide();
	}

	oAffirm.addEventListener(touchEvents.touchstart, function() {

		if(userName.value == '') {
			userName.style.border = '2px solid red';
			$('.t1').fadeIn();
		} else if(userPhone.value == '') {
			userPhone.style.border = '2px solid red';
			$('.t2').fadeIn();
		} else if(!(/^1[34578]\d{9}$/.test(userPhone.value))) {
			userPhone.style.border = '2px solid red';
			$('.t3').fadeIn();
		} else {
			var name = userName.value;
			var mobile = userPhone.value;
			saveImage(name, mobile);
		}

	}, false);

	userName.addEventListener('focus', function() {
		userName.style.border = '2px solid #108fda';
		$('.t1').fadeOut();
	}, false);
	userPhone.addEventListener('focus', function() {
		userPhone.style.border = '2px solid #108fda';
		$('.t2').fadeOut();
		$('.t3').fadeOut();
	}, false);

	userName.addEventListener(touchEvents.touchstart, function(e) {
		e.stopPropagation();
	}, false);
	userPhone.addEventListener(touchEvents.touchstart, function(e) {
		e.stopPropagation();
	}, false);
}

//------------------------------------------保存二维码--------------------------------------------------

function saveImage(name, mobile) {

	$('.save').fadeIn();

	var shopLocation = '线下门店';
	var gift = '礼品';

	var t1 = '预约成功';
	var t2 = '恭喜你获得专属预约码';
	var t3 = '凭此门店预约可获得超值礼品';

	var img_1 = "";
	var img_2 = "";
	var img_3 = "";

	var logo_img = document.querySelector(".vivo_logo img");
	var logo_imgWidth = 60;

	var succeed_x9 = document.querySelector(".succeed_x9 img");
	var succeed_img = document.querySelector(".succeed_img img");

	var canvas = document.createElement("canvas");
	var ctx = canvas.getContext('2d');

	var w_height = window.innerHeight;

	var y1 = 200;
	var y2 = 450;
	var y3 = 485;
	var y4 = 530;
	var y5 = 530;
	var y6 = 100;
	var y7 = 266;

	if(w_height <= 960) {
		w_height = 900;
		y1 = 150;
		y2 = 350;
		y3 = 385;
		y4 = 420;
		y5 = 420;
		y6 = 70;
		y7 = 180;
		$('.save h1').css({"font-size":"36px","bottom":"25px"});
	}

	canvas.width = window_width;
	canvas.height = w_height;

	ctx.clearRect(0, 0, window_width, window_height);

	ctx.beginPath();
	ctx.fillStyle = '#FFFFFF';
	ctx.rect(0, 0, window_width, window_height);
	ctx.fill();
	ctx.closePath();

	ctx.beginPath();
	ctx.fillStyle = '#555555';
	ctx.font = "40px 苹方,Arial,microsoft yahei,微软雅黑";
	ctx.textAlign = "center";
	ctx.fillText(t1, window_width / 2, y1);
	ctx.fillStyle = '#727272';
	ctx.font = "22px 苹方,Arial,microsoft yahei,微软雅黑";
	ctx.fillText(t2, window_width / 2, y2);
	ctx.fillText(t3, window_width / 2, y3);
	ctx.closePath();

	var oImg = document.querySelector('.save span img');

	//http://presell.vivo.cn:8888/Presell/Home?name=用户姓名&phone=手机号码&total=1&color=02835
	var shop_url = "http://presell.vivo.cn:8888/Presell/Home?name=" + name + "&phone=" + mobile + "&total=1&color=02835";
	var er_width = 300;
	var er_height = 300;

	$('#qrcodeCanvas').qrcode({
		render: "canvas",
		text: shop_url,
		width: er_width,
		height: er_height,
		background: "#ffffff",
		foreground: "#000000",
		src: ''
	});
	var qrcodeCanvas = document.querySelector("#qrcodeCanvas canvas");

	ctx.drawImage(qrcodeCanvas, (window_width - er_width) / 2, y4, er_width, er_height);
	ctx.drawImage(logo_img, (window_width - logo_imgWidth) / 2, y5 + (er_height - logo_imgWidth) / 2, logo_imgWidth, logo_imgWidth);
	ctx.drawImage(succeed_x9, (window_width - 368) / 2, y6, 368, 33);
	ctx.drawImage(succeed_img, (window_width - 139) / 2, y7, 139, 131);

	oImg.src = canvas.toDataURL();

	oImg.addEventListener(touchEvents.touchstart, function(e) {
		e.stopPropagation();
	}, false);

}
//------------------------------------------查看预约--------------------------------------------------

lookInfo();

function lookInfo() {
	$('.look_yy').on(touchEvents.touchstart, function() {
		$('.save').fadeIn();
		var name = "";
		var mobile = "";
		saveImage(name, mobile);
	});
}

//------------------------------------------修改预约--------------------------------------------------

changeInfo();

function changeInfo() {
	$('.change_yy').on(touchEvents.touchstart, function() {
		$('.write-info').fadeIn();
		examineInfo();
	});
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

//------------------------------------------点击点击电话咨询--------------------------------------------------

clickPlayPhone();

function clickPlayPhone() {

	$('.click-phone').on(touchEvents.touchstart, function(e) {
		e.stopPropagation();
		$('.click-phone').attr('href', 'tel:' + shop_phone);
	});
}

//------------------------------------------返回定帧海报页面--------------------------------------------------

goBack();

function goBack() {
	$('.go-black1').on(touchEvents.touchstart, function() {
		$('.write-info').fadeOut();
		$('.save').hide();
	});
	$('.go-black2').on(touchEvents.touchstart, function() {
		$('.save').fadeOut();
		$('.write-info').hide();
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