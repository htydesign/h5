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
	'images/img-tctxt.png',
	'images/img-touch.png',
	'images/img-xiguan.png',
	'images/img-yaoyiyao.png',
	'images/lookmore.png',
	'images/userhint.png',
	'images/img-sdlr-loading.png',
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
	'images/smog/Smoke-CJ_00096.png',
	'images/shanzi/SZ_00000.png',
	'images/shanzi/SZ_00001.png',
	'images/shanzi/SZ_00002.png',
	'images/shanzi/SZ_00003.png',
	'images/shanzi/SZ_00004.png',
	'images/shanzi/SZ_00005.png',
	'images/shanzi/SZ_00006.png',
	'images/shanzi/SZ_00007.png',
	'images/shanzi/SZ_00008.png',
	'images/shanzi/SZ_00009.png',
	'images/shanzi/SZ_00010.png',
	'images/shanzi/SZ_00011.png',
	'images/shanzi/SZ_00012.png',
	'images/shanzi/SZ_00013.png',
	'images/shanzi/SZ_00014.png',
	'images/shanzi/SZ_00015.png',
	'images/shanzi/SZ_00016.png',
	'images/shanzi/SZ_00017.png',
	'images/shanzi/SZ_00018.png',
	'images/shanzi/SZ_00019.png',
	'images/shanzi/SZ_00020.png',
	'images/shanzi/SZ_00021.png',
	'images/shanzi/SZ_00022.png',
	'images/shanzi/SZ_00023.png',
	'images/shanzi/SZ_00024.png',
	'images/shanzi/SZ_00025.png',
	'images/shanzi/SZ_00026.png',
	'images/shanzi/SZ_00027.png',
	'images/shanzi/SZ_00028.png',
	'images/shanzi/SZ_00029.png',
	'images/shanzi/SZ_00030.png',
	'images/shanzi/SZ_00031.png',
	'images/shanzi/SZ_00032.png',
	'images/shanzi/SZ_00033.png',
	'images/shanzi/SZ_00034.png',
	'images/shanzi/SZ_00035.png',
	'images/shanzi/SZ_00036.png',
	'images/shanzi/SZ_00037.png',
	'images/shanzi/SZ_00038.png',
	'images/shanzi/SZ_00039.png',
	'images/shanzi/SZ_00040.png',
	'images/shanzi/SZ_00041.png',
	'images/shanzi/SZ_00042.png',
	'images/shanzi/SZ_00043.png',
	'images/shanzi/SZ_00044.png',
	'images/shanzi/SZ_00045.png',
	'images/shanzi/SZ_00046.png',
	'images/shanzi/SZ_00047.png',
	'images/shanzi/SZ_00048.png',
	'images/shanzi/SZ_00049.png',
	'images/shanzi/SZ_00040.png',
	'images/shanzi/SZ_00051.png',
	'images/shanzi/SZ_00052.png',
	'images/shanzi/SZ_00053.png',
	'images/shanzi/SZ_00054.png',
	'images/shanzi/SZ_00055.png',
	'images/shanzi/SZ_00056.png',
	'images/shanzi/SZ_00057.png',
	'images/shanzi/SZ_00058.png',
	'images/shanzi/SZ_00059.png',
	'images/shanzi/SZ_00060.png',
	'images/shanzi/SZ_00061.png',
	'images/shanzi/SZ_00062.png',
	'images/shanzi/SZ_00063.png',
	'images/shanzi/SZ_00064.png',
	'images/shanzi/SZ_00065.png',
	'images/shanzi/SZ_00066.png',
	'images/shanzi/SZ_00067.png',
	'images/shanzi/SZ_00068.png',
	'images/shanzi/SZ_00069.png',
	'images/shanzi/SZ_00070.png',
	'images/shanzi/SZ_00071.png',
	'images/shanzi/SZ_00072.png',
	'images/shanzi/SZ_00073.png',
	'images/text/img-tc-01.png',
	'images/text/img-tc-02.png',
	'images/text/img-txt-01.png',
	'images/text/img-txt-02.png',
	'images/text/img-txt-03.png',
	'images/text/img-txt-04.png',
	'images/text/img-txt-05.png',
	'images/text/img-txt-06.png',
	'images/text/img-txt-07.png',
	'images/text/img-txt-08.png',
	'images/text/img-txt-09.png',
	'images/text/img-txt-10.png'

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

	if(disTime < 3000) {
		nTime = 3000 - disTime;
		main(nTime);
		console.log(startLoadingTime);
		console.log(endLoadingTime);
		console.log(disTime);
		console.log(nTime);
	} else {
		main(nTime);
	}
	document.getElementById("scene").style.display = 'block';
	document.querySelector(".user-hint").style.display = 'block';
});

loader.start();

function main(t) {
	setTimeout(function() {
		jQuery('.running-sdlr').fadeOut();
		setTimeout(function() {
			oUserHint.className = 'user-hint userHintOut';
			init();
		}, 3000);
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
    if(id == 4) {
        setTimeout(function(){
            createjs.Sound.stop();
        },5000)
    }
}

sendInit();

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
	n = 0,
	h = 0;
var nSucker = 10; //吸管点击一次
var nFan = 15; //扇子点击一次
var nElectricFan = 20; //电风扇滑一次
var curOpacity = 100; //当前的透明度
var oXiguanHint = document.querySelector('.u-hint-xiguan p');
var oShanziHint = document.querySelector('.u-hint-shanzi p');
var oFengshanHint = document.querySelector('.u-hint-fengshan p');
var isAdd = false;
var aHintStyle = document.querySelectorAll('.hintStyle');
var oSlideFan = document.querySelector('.u-prop-three');
var oFanAnimate = document.querySelector('.m-prop-box ul li.u-prop-three span:nth-of-type(2)');
var oAnimateFan = document.querySelector('.fs i img');
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
var oShanziAnimate = document.querySelector('.shanzi');
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
var oXiguanAnimate = document.querySelector('.u-prop-one span i');

var oSmog_Src = document.querySelector('.m-smog span img');
var stop = null,
	stop_1 = null,
	stop_2 = null,
	stop_3 = null,
	stop_4 = null,
	stop_hf1 = null,
	stop_hf2 = null,
	stop_hf3 = null;
var total = 96; //总数 img
var index = 0; //开始 index
var target_1 = 76; //点击吸管
var target_2 = 50; //摇动扇子
var target_3 = 26; //滑动风扇
var target_4 = 0; //点击油烟机
var isBtn_1 = false;
var isBtn_2 = false;
var isBtn_3 = false;

var oStore = document.querySelector('.m-store');
var o = 0;
var sdlrRun = document.querySelector('.finish-FatherChristmas span:nth-of-type(2)');

var sz = 0;
var oShanzi_Src = document.querySelector('.shanzi img');

var isTouch_shanzi = false;

//入场开始的烟雾
function setAnimation() {
	stop = setInterval(function() {
		if(index >= total) {
			clearInterval(stop);
			index = total;

			//点击吸管
			$('.u-prop-one span').on('touchstart', function(e) {
				e.preventDefault();
				if(a >= 1) {

				} else {
					a++;
					SmogAnimation_xiguan();

					playSound(1);

					oXiguanHint.style.opacity = 1;

					oXiguanAnimate.style.opacity = 1;
					oXiguanAnimate.style.animationPlayState = 'running';
					oXiguanAnimate.style.webkitAnimationPlayState = 'running';
					oHint_xg.style.opacity = 0;
				}

			});

		} else {
			index++;
		}
		if(index >= 10) {
			oSmog_Src.src = "images/smog/Smoke-CJ_000" + index + ".png";
		} else {
			oSmog_Src.src = "images/smog/Smoke-CJ_0000" + index + ".png";
		}
	}, 80);
}

//点击吸管的消失的烟雾
var n1 = 96;

function SmogAnimation_xiguan() {
	isBtn_1 = true;
	stop_1 = setInterval(function() {
		if(n1 <= target_1) {
			clearInterval(stop_1);
			n1 = target_1;
			jQuery('.m-prop a').fadeIn();

			for(var i = 0; i < aHintStyle.length; i++) {
				if(i == 0) {
					aHintStyle[0].style.display = 'block';
				} else {
					aHintStyle[i].style.display = 'none';
				}
			}

		} else {
			n1--;
		}
		oSmog_Src.src = "images/smog/Smoke-CJ_000" + n1 + ".png";
	}, 80);
}
//摇动扇子消失的烟雾
var n2 = 96;

function SmogAnimation_shanzi() {
	isBtn_2 = true;
	stop_2 = setInterval(function() {
		if(n2 <= target_2) {
			clearInterval(stop_2);
			n2 = target_2;
			jQuery('.m-prop a').fadeIn();

			for(var i = 0; i < aHintStyle.length; i++) {
				if(i == 1) {
					aHintStyle[1].style.display = 'block';
				} else {
					aHintStyle[i].style.display = 'none';
				}
			}

		} else {
			n2--;
		}
		oSmog_Src.src = "images/smog/Smoke-CJ_000" + n2 + ".png";
	}, 80);
}
//滑动风扇消失的烟雾
var n3 = 96;

function SmogAnimation_fengshan() {
	isBtn_3 = true;
	stop_3 = setInterval(function() {
		if(n3 <= target_3) {
			clearInterval(stop_3);
			n3 = target_3;
			oAnimateFan.style.animationPlayState = 'paused';
			oAnimateFan.style.webkitAnimationPlayState = 'paused';
			jQuery('.m-prop a').fadeIn();

			for(var i = 0; i < aHintStyle.length; i++) {
				if(i == 2) {
					aHintStyle[2].style.display = 'block';
				} else {
					aHintStyle[i].style.display = 'none';
				}
			}

		} else {
			n3--;
		}
		oSmog_Src.src = "images/smog/Smoke-CJ_000" + n3 + ".png";
	}, 80);
}
//点击油烟机消失的烟雾
var n4 = 96;

function SmogAnimation_youyanji() {
	stop_4 = setInterval(function() {
		if(n4 <= target_4) {
			clearInterval(stop_4);
			n4 = target_4;
			youjianji();
		} else {
			n4--;
		}
		if(n4 < 10) {
			oSmog_Src.src = "images/smog/Smoke-CJ_0000" + n4 + ".png";
		} else {
			oSmog_Src.src = "images/smog/Smoke-CJ_000" + n4 + ".png";
		}
	}, 30);
}
//切换道具1恢复 的烟雾
var m1 = 76;

function SmogAnimation_hf1() {
	stop_hf1 = setInterval(function() {
		if(m1 >= total) {
			clearInterval(stop_hf1);
			m1 = total;
			for(var i = 0; i < aHint_list.length; i++) {
				if(i == 1) {
					aHint_list[1].style.opacity = 1;
				} else {
					aHint_list[i].style.opacity = 0;
				}
			}
			console.log('第一次恢复');
			//用户点击扇子摇动扇子
			$('.u-prop-two').on('touchstart', function(e) {
				e.preventDefault();

				if(d >= 1) {} else {
					d++;
					SmogAnimation_sz();
					SmogAnimation_shanzi();
					playSound(2);

					oHint_sz.style.opacity = 0;

					oShanziAnimate.style.opacity = 1;
					oShanziAnimate.style.animationPlayState = 'running';
					oShanziAnimate.style.webkitAnimationPlayState = 'running';

					oShanziHint.style.opacity = 1;
					console.log(d);
				}

			});

		} else {
			m1++;
		}
		oSmog_Src.src = "images/smog/Smoke-CJ_000" + m1 + ".png";
	}, 80);
}
//切换道具2恢复 的烟雾
var m2 = 56;

function SmogAnimation_hf2() {
	stop_hf2 = setInterval(function() {
		if(m2 >= total) {
			clearInterval(stop_hf2);
			m2 = total;
			for(var i = 0; i < aHint_list.length; i++) {
				if(i == 2) {
					aHint_list[2].style.opacity = 1;
				} else {
					aHint_list[i].style.opacity = 0;
				}
			}
			//用户滑动风扇转动风扇
            $(".u-prop-three").swipeRight(function(e) {
                e.preventDefault();
                if(c >= 1) {
                    playSound(4);
                } else {
                    c++;
                    SmogAnimation_fengshan();
                    playSound(4);

                    oHint_fs.style.opacity = 0;

                    oAnimateFan.style.opacity = 1;
                    oAnimateFan.style.display = 'block';
                    oAnimateFan.style.animationPlayState = 'running';
                    oAnimateFan.style.webkitAnimationPlayState = 'running';
                    oFengshanHint.style.opacity = 1;

                }
            });
			$(".u-prop-three").swipeLeft(function(e) {
				e.preventDefault();
				if(c >= 1) {

				} else {
					c++;
					SmogAnimation_fengshan();
					playSound(4);

					oHint_fs.style.opacity = 0;

					oAnimateFan.style.opacity = 1;
					oAnimateFan.style.display = 'block';
					oAnimateFan.style.animationPlayState = 'running';
					oAnimateFan.style.webkitAnimationPlayState = 'running';

					oFengshanHint.style.opacity = 1;

				}
			});
		} else {
			m2++;
		}
		oSmog_Src.src = "images/smog/Smoke-CJ_000" + m2 + ".png";
	}, 80);
}
//切换道具3恢复 的烟雾
var m3 = 56;

function SmogAnimation_hf3() {
	stop_hf3 = setInterval(function() {
		if(m3 >= total) {
			clearInterval(stop_hf3);
			m3 = total;
			//jQuery('.m-prop a').fadeIn();
			$('.m-prop-box ul li').eq(4).addClass('active');

			oGift.addEventListener('touchstart', function() {
				
				if(h>=1){
					
				}else{
					h++;
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
								oRangeHood.style.transform = 'translate3d(0, 0,0) scale(1)';
								setTimeout(function() {
									jQuery('.u-prop-four span').fadeOut();
									jQuery('.m-ftyyj p').fadeIn();
									SmogAnimation_youyanji();
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
								oRangeHood.style.webkitTransform = 'translate3d(0, 0,0) scale(1)';
								setTimeout(function() {
									jQuery('.u-prop-four span').fadeOut();
									jQuery('.m-ftyyj p').fadeIn();
									SmogAnimation_youyanji();
								}, 1000);
							}, 200)
						}, 1000);
					}, false);
				}

			}, false);

		} else {
			m3++;
		}
		oSmog_Src.src = "images/smog/Smoke-CJ_000" + m3 + ".png";
	}, 80);
}

function SmogAnimation_sz() {
	stop_sz = setInterval(function() {
		if(sz >= 73) {
			clearInterval(stop_sz);
			sz = 73;
		} else {
			sz++;
		}
		if(sz >= 10) {
			oShanzi_Src.src = "images/shanzi/SZ_000" + sz + ".png";
		} else {
			oShanzi_Src.src = "images/shanzi/SZ_0000" + sz + ".png";
		}
	}, 40);
}
//开始执行。。。。。。。。。。。。。。。。
function init() {

	//开始
	setTimeout(function() {
		oUserHint.style.display = 'none';

		jQuery('.m-user-openMusic').fadeIn();

	}, 2000);

	//点击开启music
	jQuery('.m-user-openMusic span').on('touchstart', function() {
		if(isAndroid) {
			document.getElementById("bgMusci").play();
		} else {
			playSound(5);
		}
		jQuery('.m-user-openMusic').fadeOut();
		setTimeout(function() {
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
				aTxt[2].style.animation = 'asideTxt1 4s 1s linear forwards';
				aTxt[2].style.webkitAnimation = 'asideTxt1 4s 1s linear forwards';
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
							'transform': 'translate3d(0,0px,0) scale(1.3)',
							'-webkit-transform': 'translate3d(0,0px,0) scale(1.3)',
							'opacity': '1'
						});
					});
				}, false);

			}, 13000);
		}, 2000);
	});

	//点击切换道具
	$('.m-prop a').on('touchstart', function(e) {
		e.preventDefault();
		jQuery('.m-prop a').fadeOut();
		oChange_A.className = '';

		if(n >= 3) {
			n = 3;
		} else {
			n++;
		}
		if(n == 1) {
			if(isBtn_1) {
				SmogAnimation_hf1();
			}
		} else if(n == 2) {
			if(isBtn_2) {
				SmogAnimation_hf2();
			}
		} else if(n == 3) {
			if(isBtn_3) {
				SmogAnimation_hf3();
			}
			$(this).css({
				'transform': 'translate3d(0,150px,0)  scale(1.3)',
				'-webkit-transform': 'translate3d(0,150px,0)  scale(1.3)',
				'transition-delay': '0s',
				'-webkit-transition-delay': '0s',
				'opacity': '0'
			});
			setTimeout(function() {
				jQuery('.u-prop-four i').fadeIn();
			}, 1000);
		}
		console.log(n);
		if(n == 4) {

		} else {
			$('.m-prop-box ul li').eq(n).addClass('active').siblings().removeClass('active');
		}

		for(var i = 0; i < aHintStyle.length; i++) {
			aHintStyle[i].style.display = 'none';
		}

	});

	oScene.addEventListener('touchstart', onTouchStart, false);

	function onTouchStart(e) {
		e.preventDefault();
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

function youjianji() {
	jQuery('.m-ftyyj p').fadeOut();
	oRangeHood.style.transform = 'scale(0.3) translate3d(-690px, -510px, 0px)';
	oRangeHood.style.webkitTransform = 'scale(0.3) translate3d(-690px, -510px, 0px)';
	oRangeHood.style.opacity = 0;
	oRangeHood.style.transitionDuration = '1.5s';
	oRangeHood.style.webkitTransitionDuration = '1.5s';

	oRangeHoodImg.style.opacity = 1;

	setTimeout(function() {


			oContainer.style.transform = 'scale(1.8) translate3d(0px, -10px, 0px)';
			oContainer.style.webkitTransform = 'scale(1.8) translate3d(0px, -10px, 0px)';
			oFatherChristmas_one.style.display = 'none';
			oFatherChristmas_two.style.display = 'block';
			oCate.style.display = 'block';
			oStart.style.display = 'block';
			oStore.style.display = 'block';
			setTimeout(function() {
				oContainer.style.transitionDuration = '1s';
				oContainer.style.webkitTransitionDuration = '1s';
				oContainer.style.transform = 'scale(0.9) translate3d(-500px,-50px, 0px)';
				oContainer.style.webkitTransform = 'scale(0.9) translate3d(-500px,-50px, 0px)';
				oScene.style.background = '#fdf4ef';
				oFatherChristmas_two.style.display = 'none';
				setTimeout(function() {
					jQuery('.finish').show();
					oFinish_h1Txt.style.opacity = 1;
					oFinish_h1Txt.style.transform = 'translate3d(0,0,0)';
					oFinish_h1Txt.style.webkitTransform = 'translate3d(0,0,0)';
					oFinish_Btn.style.opacity = 1;
					oFinish_Btn.style.transform = 'translate3d(0,0,0)';
					oFinish_Btn.style.webkitTransform = 'translate3d(0,0,0)';
					oStore.className = 'm-store storeAtive';
					setTimeout(function(){
						
						jQuery('.finish-btn span').hide();
					},3500)
				}, 1000);
			}, 5000);

	}, 4000);
}