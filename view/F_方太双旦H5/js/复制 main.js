var u = navigator.userAgent;
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

var startLoadingTime = new Date().getTime();
var endLoadingTime = 0;
var disTime = 0;
var nTime = 0;

var width = document.body.clientWidth;
var height = document.body.clientHeight;
if(width < height) {
	//document.title = width + " " + height;
	var $print = $('#scene');
	$print.width(height);
	$print.height(width);
	$print.css('top', (height - width) / 2);
	$print.css('left', 0 - (height - width) / 2);
	$print.css({
		'transform': 'rotate(90deg)',
		'-webkit-transform': 'rotate(90deg)'
	});
	$print.css({
		'transform-origin': '50% 50%',
		'-webkit-transform-origin': '50% 50%'
	});
}

var evt = "onorientationchange" in window ? "orientationchange" : "resize";

window.addEventListener(evt, function() {
	var width = document.body.clientWidth;
	var height = document.body.clientHeight;
	if(width < height) {
		//console.log(width + " " + height);
		var $print = $('#scene');
		$print.width(height);
		$print.height(width);
		$print.css('top', (height - width) / 2);
		$print.css('left', 0 - (height - width) / 2);
		$print.css({
			'transform': 'rotate(90deg)',
			'-webkit-transform': 'rotate(90deg)'
		});
		$print.css({
			'transform-origin': '50% 50%',
			'-webkit-transform-origin': '50% 50%'
		});
	}
}, false);

var oUserHint = document.querySelector('.user-hint');
//loading-----------------------------------------------
var loader = new window.PxLoader();

var fileList = [
	'images/img-01.png',
	'images/img-02-1.png',
	'images/img-02-2.png',
	'images/img-02-3.png',
	'images/img-04.png',
	'images/img-05.png',
	'images/img-06-1.png',
	'images/img-06-2.png',
	'images/img-06-3.png',
	'images/img-07.png',
	'images/img-08.png',
	'images/img-10.png',
	'images/img-11.jpg',
	'images/img-12.jpg',
	'images/img-13.png',
	'images/img-14.png',
	'images/img-15.png',
	'images/img-16.png',
	'images/img-18.png',
	'images/img-19.png',
	'images/img-20.png',
	'images/img-share.png',
	'images/img-slide.png',
	'images/img-smlw.png',
	'images/img-start.png',
	'images/img-sz-01.png',
	'images/img-sz-02.png',
	'images/img-sz-03.png',
	'images/img-tctxt.png',
	'images/img-touch.png',
	'images/img-xiguan.png',
	'images/img-yaoyiyao.png',
	'images/lookmore.png',
	'images/userhint.png',
	'images/smog/Smoke-CJ_00000.png',
	'images/smog/Smoke-CJ_00001.png',
	'images/smog/Smoke-CJ_00002.png',
	'images/smog/Smoke-CJ_00003.png',
	'images/smog/Smoke-CJ_00004.png',
	'images/smog/Smoke-CJ_00005.png',
	'images/smog/Smoke-CJ_00006.png',
	'images/smog/Smoke-CJ_00007.png',
	'images/smog/Smoke-CJ_00008.png',
	'images/smog/Smoke-CJ_00009.png',
	'images/smog/Smoke-CJ_00010.png',
	'images/smog/Smoke-CJ_00011.png',
	'images/smog/Smoke-CJ_00012.png',
	'images/smog/Smoke-CJ_00013.png',
	'images/smog/Smoke-CJ_00014.png',
	'images/smog/Smoke-CJ_00015.png',
	'images/smog/Smoke-CJ_00016.png',
	'images/smog/Smoke-CJ_00017.png',
	'images/smog/Smoke-CJ_00018.png',
	'images/smog/Smoke-CJ_00019.png',
	'images/smog/Smoke-CJ_00020.png',
	'images/smog/Smoke-CJ_00021.png',
	'images/smog/Smoke-CJ_00022.png',
	'images/smog/Smoke-CJ_00023.png',
	'images/smog/Smoke-CJ_00024.png',
	'images/smog/Smoke-CJ_00025.png',
	'images/smog/Smoke-CJ_00026.png',
	'images/smog/Smoke-CJ_00027.png',
	'images/smog/Smoke-CJ_00028.png',
	'images/smog/Smoke-CJ_00029.png',
	'images/smog/Smoke-CJ_00030.png',
	'images/smog/Smoke-CJ_00031.png',
	'images/smog/Smoke-CJ_00032.png',
	'images/smog/Smoke-CJ_00033.png',
	'images/smog/Smoke-CJ_00034.png',
	'images/smog/Smoke-CJ_00035.png',
	'images/smog/Smoke-CJ_00036.png',
	'images/smog/Smoke-CJ_00037.png',
	'images/smog/Smoke-CJ_00038.png',
	'images/smog/Smoke-CJ_00039.png',
	'images/smog/Smoke-CJ_00040.png',
	'images/smog/Smoke-CJ_00041.png',
	'images/smog/Smoke-CJ_00042.png',
	'images/smog/Smoke-CJ_00043.png',
	'images/smog/Smoke-CJ_00044.png',
	'images/smog/Smoke-CJ_00045.png',
	'images/smog/Smoke-CJ_00046.png',
	'images/smog/Smoke-CJ_00047.png',
	'images/smog/Smoke-CJ_00048.png',
	'images/smog/Smoke-CJ_00049.png',
	'images/smog/Smoke-CJ_00050.png',
	'images/smog/Smoke-CJ_00051.png',
	'images/smog/Smoke-CJ_00052.png',
	'images/smog/Smoke-CJ_00053.png',
	'images/smog/Smoke-CJ_00054.png',
	'images/smog/Smoke-CJ_00055.png',
	'images/smog/Smoke-CJ_00056.png',
	'images/smog/Smoke-CJ_00057.png',
	'images/smog/Smoke-CJ_00058.png',
	'images/smog/Smoke-CJ_00059.png',
	'images/smog/Smoke-CJ_00060.png',
	'images/smog/Smoke-CJ_00061.png',
	'images/smog/Smoke-CJ_00062.png',
	'images/smog/Smoke-CJ_00063.png',
	'images/smog/Smoke-CJ_00064.png',
	'images/smog/Smoke-CJ_00065.png',
	'images/smog/Smoke-CJ_00066.png',
	'images/smog/Smoke-CJ_00067.png',
	'images/smog/Smoke-CJ_00068.png',
	'images/smog/Smoke-CJ_00069.png',
	'images/smog/Smoke-CJ_00070.png',
	'images/smog/Smoke-CJ_00071.png',
	'images/smog/Smoke-CJ_00072.png',
	'images/smog/Smoke-CJ_00073.png',
	'images/smog/Smoke-CJ_00074.png',
	'images/smog/Smoke-CJ_00075.png',
	'images/smog/Smoke-CJ_00076.png',
	'images/smog/Smoke-CJ_00077.png',
	'images/smog/Smoke-CJ_00078.png',
	'images/smog/Smoke-CJ_00079.png',
	'images/smog/Smoke-CJ_00080.png',
	'images/smog/Smoke-CJ_00081.png',
	'images/smog/Smoke-CJ_00082.png',
	'images/smog/Smoke-CJ_00083.png',
	'images/smog/Smoke-CJ_00084.png',
	'images/smog/Smoke-CJ_00085.png',
	'images/smog/Smoke-CJ_00086.png',
	'images/smog/Smoke-CJ_00087.png',
	'images/smog/Smoke-CJ_00088.png',
	'images/smog/Smoke-CJ_00089.png',
	'images/smog/Smoke-CJ_00090.png',
	'images/smog/Smoke-CJ_00091.png',
	'images/smog/Smoke-CJ_00092.png',
	'images/smog/Smoke-CJ_00093.png',
	'images/smog/Smoke-CJ_00094.png',
	'images/smog/Smoke-CJ_00095.png',
	'images/smog/Smoke-CJ_00096.png'
	
];

for(var i = 0; i < fileList.length; i++) {
	loader.addImage(fileList[i]);
}
loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
	//$('.loading p').innerHTML = percent + '%';
});
loader.addCompletionListener(function() {
	endLoadingTime = new Date().getTime();
	disTime = endLoadingTime - startLoadingTime;
	
	main(1000);
	
//	if(disTime < 3000) {
//		nTime = 3000 - disTime;
//		main(nTime);
//		console.log(startLoadingTime);
//		console.log(endLoadingTime);
//		console.log(disTime);
//		console.log(nTime);
//	} else {
//		main(nTime);
//	}
});

loader.start();

function main(t) {
	setTimeout(function() {
		oUserHint.className = 'user-hint userHintOut';
		init();
	}, t);
}

//musuic
function sendInit() {
	var assetsPath = "music/";
	var sounds = [{
		src: "unlock.mp3",
		id: 1
	}, {
		src: "message.mp3",
		id: 2
	}, {
		src: "click.mp3",
		id: 3
	}, {
		src: "send.mp3",
		id: 4
	}, {
		src: "music1.mp3",
		id: 5
	}];
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this));
	createjs.Sound.registerSounds(sounds, assetsPath);
}

function soundLoaded(event) {
	console.log(event.src);
}

function playSound(id) {
	var instance = createjs.Sound.play(id);
	instance.addEventListener("complete", function(instance) {
		console.log('complete');
	});
	if(id == 5) {
		instance.loop = -1;
	}
}

sendInit();


(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
			window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if(!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());


var oSmog_Src=document.querySelector('.m-smog span img'); 
var stop = null,stop_1 = null,stop_2 = null,stop_3 = null,stop_4 = null,stop_hf1=null,stop_hf2=null,stop_hf3=null;
var total=96; 		//总数 img
var index = 0;		//开始 index
var target_1=76;	//点击吸管
var target_2=50;	//摇动扇子
var target_3=36;	//滑动风扇
var target_4=0;		//点击油烟机
//入场开始的烟雾
function setAnimation() {	
	stop = requestAnimFrame(setAnimation);
	if(index >= total) {
		window.cancelAnimationFrame(stop);
		index = total;
	} else {
		index++;
	}
	if(index>=10){
		oSmog_Src.src="images/smog/Smoke-CJ_000"+index+".png";
	}else{
		oSmog_Src.src="images/smog/Smoke-CJ_0000"+index+".png";
	}
	
}

//点击吸管的消失的烟雾
var n1=96;
function SmogAnimation_xiguan() {	
	stop_1 = requestAnimationFrame(SmogAnimation_xiguan);
	if(n1 <= target_1) {
		window.cancelAnimationFrame(stop_1);
		n1 = target_1;
	} else {
		n1--;
	}
	oSmog_Src.src="images/smog/Smoke-CJ_000"+n1+".png";
}
//摇动扇子消失的烟雾
var n2=96;
function SmogAnimation_shanzi() {	
	stop_2 = requestAnimationFrame(SmogAnimation_shanzi);
	if(n2 <= target_2) {
		window.cancelAnimationFrame(stop_2);
		n2 = target_2;
	} else {
		n2--;
	}
	oSmog_Src.src="images/smog/Smoke-CJ_000"+n2+".png";
}
//滑动风扇消失的烟雾
var n3=96;
function SmogAnimation_fengshan() {	
	stop_3 = requestAnimationFrame(SmogAnimation_fengshan);
	if(n3 <= target_3) {
		window.cancelAnimationFrame(stop_3);
		n3 = target_3;
	} else {
		n3--;
	}	
	oSmog_Src.src="images/smog/Smoke-CJ_000"+n3+".png";
}
//点击油烟机消失的烟雾
var n4=96;
function SmogAnimation_youyanji() {	
	stop_4 = requestAnimationFrame(SmogAnimation_youyanji);
	if(n4 <= target_4) {
		window.cancelAnimationFrame(stop_4);
		n4 = target_4;
	} else {
		n4--;
	}
	if(n4<10){
		oSmog_Src.src="images/smog/Smoke-CJ_0000"+n4+".png";
	}else{
		oSmog_Src.src="images/smog/Smoke-CJ_000"+n4+".png";
	}
	console.log(n4);
}
//切换道具1恢复 的烟雾
var m1=76;
function SmogAnimation_hf1() {	
	stop_hf1 = requestAnimationFrame(SmogAnimation_hf1);
	if(m1 >= total) {
		window.cancelAnimationFrame(stop_hf1);
		m1 = total;
	} else {
		m1++;
	}
	oSmog_Src.src="images/smog/Smoke-CJ_000"+m1+".png";
}
//切换道具2恢复 的烟雾
var m2=56;
function SmogAnimation_hf2() {	
	stop_hf2 = requestAnimationFrame(SmogAnimation_hf2);
	if(m2 >= total) {
		window.cancelAnimationFrame(stop_hf2);
		m2 = total;
	} else {
		m2++;
	}
	oSmog_Src.src="images/smog/Smoke-CJ_000"+m2+".png";
}
//切换道具3恢复 的烟雾
var m3=56;
function SmogAnimation_hf3() {	
	stop_hf3 = requestAnimationFrame(SmogAnimation_hf3);
	if(m3 >= total) {
		window.cancelAnimationFrame(stop_hf3);
		m3 = total;
	} else {
		m3++;
	}
	oSmog_Src.src="images/smog/Smoke-CJ_000"+m3+".png";
}
//开始执行。。。。。。。。。。。。。。。。
function init() {

	var oScene = document.getElementById("scene");
	var oLoading = document.querySelector('.loading');
	var oContainer = document.querySelector('.container')
	var oFatherChristmas_one = document.querySelector('.u-FatherChristmas-one');
	var oFatherChristmas_two = document.querySelector('.u-FatherChristmas-two');
	var oCate = document.querySelector('.u-cate');
	var oStart = document.querySelector('.u-start');
	var oFinishBox = document.querySelector('.finish');
	var aTxt = document.querySelectorAll('.m-aside-txt p');
	var oHintUser_xiaoyan = document.querySelector('.u-hint-EliminateSmoke');
	var oXiguan = document.querySelector('.u-hint-xiguan');
	var oSmog = document.querySelector('.m-smog-box'); //烟雾
	var a = 0,
		b = 0,
		c = 0,
		d = 0,
		n = 0;
	var nSucker = 10; //吸管点击一次
	var nFan = 15; //扇子点击一次
	var nElectricFan = 20; //电风扇滑一次
	var curOpacity = 100; //当前的透明度
	var aXiguanHint = document.querySelectorAll('.u-hint-xiguan p');
	var aShanziHint = document.querySelectorAll('.u-hint-shanzi p');
	var aFengshanHint = document.querySelectorAll('.u-hint-fengshan p');
	var isAdd = false;
	var aHintStyle = document.querySelectorAll('.hintStyle');
	var oSlideFan = document.querySelector('.u-prop-three');
	var oFanAnimate = document.querySelector('.m-prop-box ul li.u-prop-three span:nth-of-type(2)');
	var aAnimateFan = document.querySelectorAll('.fs i');
	var startX = 0;
	var moveX = 0;
	var endX = 0;
	var k = 0;
	var isSlide = true;

	var oRangeHoodImg = document.querySelector('.m-kitchen span');
	var isBtn = false;
	var start_x, start_y, start_z, last_x, last_y, last_z;
	var speed = 0,
		diff_Time = 0,
		target = 1500,
		last_update = 0;
	var aShanziAnimate = document.querySelectorAll('.shanzi i');
	var oFinish_h1Txt = document.querySelector('.finish h1');
	var oFinish_Btn = document.querySelector('.finish-btn');
	var oProp_Hint = document.querySelector('.m-prop-hint');
	var oHint_xg = document.querySelector('.hint-xg');
	var oHint_sz = document.querySelector('.hint-sz');
	var oHint_fs = document.querySelector('.hint-fs');
	var aHint_list = document.querySelectorAll('.m-prop-hint ul li');
	var oChange_A = document.querySelector('.m-prop a');
	var oGift = document.querySelector('.u-prop-four span');
	var oRangeHood = document.querySelector('.m-ftyyj');
	var aXiguanAnimate = document.querySelectorAll('.u-prop-one span i');

	//开始
	setTimeout(function() {
		oUserHint.style.display = 'none';

		if(isAndroid) {
			document.getElementById("bgMusci").play();
		} else {
			playSound(5);
		}

		oLoading.className = 'loading fadeOut';
		setTimeout(function() {
			oContainer.className = 'container';
			for(var i = 0; i < aTxt.length - 1; i++) {
				aTxt[i].style.animation = 'asideTxt 3s ' + (i * 3 + 1) + 's linear forwards';
				aTxt[i].style.webkitAnimation = 'asideTxt 3s ' + (i * 3 + 1) + 's linear forwards';
			}
		}, 500);

		setTimeout(function() {
			setAnimation();
			aTxt[2].style.animation = 'asideTxt 3s 2s linear forwards';
			aTxt[2].style.webkitAnimation = 'asideTxt 3s 2s linear forwards';
			//$('.m-smog').addClass('active');
			oScene.removeChild(oLoading);
			oHintUser_xiaoyan.style.display = 'block';
		}, 7000);

		setTimeout(function() {
			oHintUser_xiaoyan.style.opacity = 1;
			oHintUser_xiaoyan.addEventListener('touchstart', function() {

				oHintUser_xiaoyan.style.opacity = 0;

				jQuery('.m-aside-txt').fadeOut().delay(500, function() {
					oHintUser_xiaoyan.style.display = 'none';
					oXiguan.style.display = 'block';
					oProp_Hint.style.display = 'block';
					setTimeout(function() {
						oHint_xg.style.opacity = 1;
					}, 1500);
					jQuery('.m-prop').fadeIn();
					$('.u-prop-one').addClass('active');
					$('.m-prop a').css({
						'transform': 'translate3d(0,0px,0)',
						'-webkit-transform': 'translate3d(0,0px,0)',
						'opacity': '1'
					});
				});
			}, false);

		}, 12500);

	}, 5000);

	//点击吸管
	$('.u-prop-one span').on('touchstart', function() {
		SmogAnimation_xiguan();
		if(a >= 3) {

		} else {
			a++;
			
			playSound(1);
			if(a == 3) {

			}
			for(var i = 0; i < aXiguanHint.length; i++) {
				if(i == (a - 1)) {
					aXiguanHint[a - 1].style.opacity = 1;;
				} else {
					aXiguanHint[i].style.opacity = 0;
				}
			}
			for(var i = 0; i < aXiguanAnimate.length; i++) {
				if(i == (a - 1)) {
					aXiguanAnimate[a - 1].style.opacity = 1;
					aXiguanAnimate[a - 1].style.animationPlayState = 'running';
					aXiguanAnimate[a - 1].style.webkitAnimationPlayState = 'running';
				} else {
					aXiguanAnimate[i].style.opacity = 0;
					aXiguanAnimate[i].style.animationPlayState = 'paused';
					aXiguanAnimate[i].style.webkitAnimationPlayState = 'paused';
				}
			}
//			curOpacity = curOpacity - nSucker;
//			oSmog.style.opacity = curOpacity / 100;
		}
		oHint_xg.style.opacity = 0;
	});

	//点击切换道具
	$('.m-prop a').on('touchstart', function(e) {
		e.preventDefault();

		
		oChange_A.className = '';
		curOpacity = 100;
		oSmog.style.opacity = curOpacity / 100;
		if(n >= 3) {
			n=3;
		} else {
			n++;
		}
		if(n==1){
			SmogAnimation_hf1();
			isBtn = true;
			isAdd = true;
		}else if(n==2){
			SmogAnimation_hf2();
			isAdd = false;
			isBtn = false;
		}else if(n==3){
			SmogAnimation_hf3();
			isAdd = false;
			isBtn = false;
			$(this).css({
				'transform': 'translate3d(0,100px,0)',
				'-webkit-transform': 'translate3d(0,100px,0)',
				'transition-delay': '0s',
				'-webkit-transition-delay': '0s',
				'opacity': '0'
			});
			setTimeout(function() {
				jQuery('.u-prop-four i').fadeIn();
			}, 1000);
		}
		$('.m-prop-box ul li').eq(n).addClass('active').siblings().removeClass('active');

		for(var i = 0; i < aHintStyle.length; i++) {
			if(i == n) {
				aHintStyle[n].style.display = 'block';
			} else {
				aHintStyle[i].style.display = 'none';
			}
		}
		for(var i = 0; i < aHint_list.length; i++) {
			if(i == n) {
				setTimeout(function() {
					aHint_list[n].style.opacity = 1;
				}, 1000)
			} else {
				aHint_list[i].style.opacity = 0;
			}
		}
	});

	//用户滑动风扇转动风扇
	oScene.addEventListener('touchstart', onTouchStart, false);

	function onTouchStart(e) {
		e.preventDefault();
	}

	$(".u-prop-three").swipeLeft(function(e) {
		// e.preventDefault();
		SmogAnimation_fengshan();
		if(c >= 3) {

		} else {
			c++;
			playSound(4);
			if(c == 3) {

			}
			oHint_fs.style.opacity = 0;
//			curOpacity = curOpacity - nElectricFan;
//			oSmog.style.opacity = curOpacity / 100;
			for(var i = 0; i < aAnimateFan.length; i++) {
				if(i == (c - 1)) {
					aAnimateFan[c - 1].style.opacity = 1;
					aAnimateFan[c - 1].style.display = 'block';
					aAnimateFan[c - 1].style.animationPlayState = 'running';
					aAnimateFan[c - 1].style.webkitAnimationPlayState = 'running';
				} else {
					aAnimateFan[i].style.opacity = 0;
					aAnimateFan[i].style.display = 'none';
					aAnimateFan[i].style.animationPlayState = 'paused';
					aAnimateFan[i].style.webkitAnimationPlayState = 'paused';
				}
			}
			for(var i = 0; i < aFengshanHint.length; i++) {
				if(i == (c - 1)) {
					aFengshanHint[c - 1].style.opacity = 1;;
				} else {
					aFengshanHint[i].style.opacity = 0;
				}
			}
		}

	});

	
	function onTouchEnd() {
		endX = moveX;
		moveX = 0;
		k = 0;
	}

	//点击礼物
	oGift.addEventListener('touchstart', function() {
		oGift.style.animationPlayState = 'running';
		oGift.style.webkitAnimationPlayState = 'running';
		jQuery('.u-prop-four i').fadeOut();

		oGift.addEventListener('animationend', function() {
			oRangeHood.style.display = 'block';
			oGift.style.transform = 'translate(0,100px) scale(0.5)';
			setTimeout(function() {
				oGift.style.opacity = 0;
				oGift.style.transitionDelay = 0;
				oGift.style.transform = 'translate(0,300px) scale(0.5)';
				setTimeout(function() {
					oRangeHood.style.opacity = 1;
					oRangeHood.style.transform = 'translate(0, 0) scale(1)';
					setTimeout(function() {
						jQuery('.u-prop-four span').fadeOut();
						jQuery('.m-ftyyj p').fadeIn();
					}, 1000);
				}, 500)
			}, 1000);
		}, false);

		oGift.addEventListener('webkitAnimationEnd', function() {
			oRangeHood.style.display = 'block';
			oGift.style.webkitTransform = 'translate(0,100px) scale(0.5)';
			setTimeout(function() {
				oGift.style.opacity = 0;
				oGift.style.webkitTransitionDelay = 0;
				oGift.style.webkitTransform = 'translate(0,300px) scale(0.5)';
				setTimeout(function() {
					oRangeHood.style.opacity = 1;
					oRangeHood.style.webkitTransform = 'translate(0, 0) scale(1)';
					setTimeout(function() {
						jQuery('.u-prop-four span').fadeOut();
						jQuery('.m-ftyyj p').fadeIn();
					}, 1000);
				}, 200)
			}, 1000);
		}, false);

	}, false);

	//点击油烟机
	var oStore = document.querySelector('.m-store');
	var o = 0;
	var sdlrRun = document.querySelector('.finish-FatherChristmas span:nth-of-type(2)');
	oRangeHood.addEventListener('touchstart', function() {
		if(o > 0) {

		} else {
			o++;
			playSound(3);
			jQuery('.m-ftyyj p').fadeOut();
			oRangeHood.style.transform = 'translate3d(0, -400px, 0px)';
			oRangeHood.style.webkitTransform = 'translate3d(0, -400px, 0px)';
			oRangeHood.style.opacity = 0;
			oRangeHood.style.transitionDuration = '1.5s';
			oRangeHood.style.webkitTransitionDuration = '1.5s';

			oRangeHoodImg.style.opacity = 1;

			setTimeout(function() {
				SmogAnimation_youyanji();
				
//				setTimeout(function() {
//					oContainer.style.transform = 'scale(2) translate3d(10px, 20px, 0px)';
//					oContainer.style.webkitTransform = 'scale(2) translate3d(10px, 20px, 0px)';
//					oFatherChristmas_one.style.display = 'none';
//					oFatherChristmas_two.style.display = 'block';
//					oCate.style.display = 'block';
//					oStart.style.display = 'block';
//					oStore.style.display = 'block';
//					setTimeout(function() {
//						oContainer.style.transitionDuration = '1s';
//						oContainer.style.webkitTransitionDuration = '1s';
//						oContainer.style.transform = 'scale(0.9) translate3d(-500px,-50px, 0px)';
//						oContainer.style.webkitTransform = 'scale(0.9) translate3d(-500px,-50px, 0px)';
//						oScene.style.background = '#fdf4ef';
//						oFatherChristmas_two.style.display = 'none';
//						setTimeout(function() {
//							$('.finish').show();
//							oFinish_h1Txt.style.opacity = 1;
//							oFinish_h1Txt.style.transform = 'translate3d(0,0,0)';
//							oFinish_h1Txt.style.webkitTransform = 'translate3d(0,0,0)';
//							oFinish_Btn.style.opacity = 1;
//							oFinish_Btn.style.transform = 'translate3d(0,0,0)';
//							oFinish_Btn.style.webkitTransform = 'translate3d(0,0,0)';
//							sdlrRun.addEventListener('animationend', function() {
//								oStore.className = 'm-store storeAtive';
//							}, false);
//							sdlrRun.addEventListener('webkitAnimationEnd', function() {
//								oStore.className = 'm-store storeAtive';
//							}, false);
//						}, 1000);
//					}, 5000);
//				}, 3000);
			}, 1000);
		}

	}, false);

	//摇一摇 扇子
	if(window.DeviceMotionEvent) {
		window.addEventListener('devicemotion', onDeviceMotion, false);
	} else {
		alert('亲，你的浏览器不支持DeviceMotionEvent哦~');
	}

	function onDeviceMotion(event) {
		if(isBtn) {
			var a = event.acceleration;
			var b = event.accelerationIncludingGravity;
			var r = event.rotationRate;

			var cur_Time = new Date().getTime();
			if((cur_Time - last_update) > 100) {
				diff_Time = cur_Time - last_update;
				last_update = cur_Time;

				start_x = b.x;
				start_y = b.y;
				start_z = b.z;

				speed = Math.abs(start_x + start_y + start_z - last_x - last_y - last_z) / diff_Time * 10000;

				if(speed > target) {
					if(isAdd) {
						if(d >= 3) {

						} else {
							d++;
							SmogAnimation_shanzi();
							playSound(2);
							setTimeout(function() {
								oHint_sz.style.opacity = 0;
//								curOpacity = curOpacity - nFan;
//								oSmog.style.opacity = curOpacity / 100;
								for(var i = 0; i < aShanziAnimate.length; i++) {
									if(i == (d - 1)) {
										aShanziAnimate[d - 1].style.opacity = 1;
										aShanziAnimate[d - 1].style.animationPlayState = 'running';
										aShanziAnimate[d - 1].style.webkitAnimationPlayState = 'running';
									} else {
										aShanziAnimate[i].style.opacity = 0;
										aShanziAnimate[i].style.animationPlayState = 'paused';
										aShanziAnimate[i].style.webkitAnimationPlayState = 'paused';
									}
								}
								for(var i = 0; i < aShanziHint.length; i++) {
									if(i == (d - 1)) {
										aShanziHint[d - 1].style.opacity = 1;;
									} else {
										aShanziHint[i].style.opacity = 0;
									}
								}

							}, 1000);
							isBtn = !isBtn;
							setTime();
						}
					}
				}

				last_x = start_x;
				last_y = start_y;
				last_z = start_z;
			}
		}
	}

	function setTime() {
		setTimeout(function() {
			isBtn = !isBtn;
		}, 4000);
	}

	var oShare = jQuery('.m-share');
	var oShare_btn = jQuery('.btn-box a:nth-child(1)');

	oShare_btn.on('touchstart', function(e) {
		e.preventDefault();
		oShare.fadeIn();
	});

	oShare.on('touchstart', function() {
		oShare.fadeOut();
	});

	var oStorec = jQuery('.m-store');
	var oStoreContainer = jQuery('.m-store-container');
	var oStore_close = jQuery('.m-store-container span');
	var oStore_btn = jQuery('.btn-box a:nth-child(2)');

	oStore_btn.on('touchstart', function(e) {
		e.preventDefault();
		document.querySelector('.m-store').style.opacity = 1;
		oStorec.fadeIn();
		oStorec.removeClass('storeAtive');

	});

	oStorec.on('touchstart', function() {
		oStorec.fadeOut();
	});

}