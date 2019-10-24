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

var oDate = new Date();
var m = oDate.getMinutes();
s = (m < 10 ? "0" + m : m);
$('.cur-date').html((oDate.getMonth() + 1) + '月' + oDate.getDate() + '日');
$('.cur-time').html(oDate.getHours() + ':' + s);
$('.cur-time2').html(oDate.getHours() + ':' + s);
$('.nows_time').html(oDate.getHours() + ':' + s);

var loadingFinishMusic = document.getElementById("loading_finish_music");
var winMusic = document.getElementById("win_music");
var poisoningMusic = document.getElementById("poisoning_music");
var screamMusic = document.getElementById("scream_music");
var slideMusic = document.getElementById("slide_music");
var bgMusic_1 = document.getElementById("bg_music1");
var bgMusic_video = document.getElementById("video_music");

//loadingFinishMusic.pause();
winMusic.pause();
poisoningMusic.pause();
screamMusic.pause();
slideMusic.pause();
bgMusic_1.pause();
bgMusic_video.pause();

var startTime = new Date().getTime();
var loader = new window.PxLoader();
var fileList = [
	'images/img-0.png',
	'images/img-1.png',
	'images/img-2.png',
	'images/img-3.png',
	'images/img-4.png',
	'images/img-5.png',
	'images/img-6.png',
	'images/img-7.png',
	'images/img-8.png',
	'images/img-9.png',
	'images/img-10.png',
	'images/img-11.png',
	'images/img-12.png',
	'images/img-13.png',
	'images/img-14.png',
	'images/img-15.png',
	'images/img-16.gif',
	'images/img-17.png',
	'images/img-18.png',
	'images/img-19.png',
	'images/img-20.png',
	'images/img-21.png',
	'images/img-22.png',
	'images/img-23.png',
	'images/img-24.png',
	'images/img-25.png',
	'images/img-28.png',
	'images/img-29.png',
	'images/img-30.jpg',
	'images/img-31.jpg',
	'images/img-32.png',
	'images/img-33.jpg',
	'images/img-34.png',
	'images/img-35.png',
	'images/img-36.png',
	'images/img-37.png',
	'images/img-38.png',
	'images/img-39.png',
	'images/img-40.png',
	'images/img-41.png',
	'images/img-42.png',
	'images/1.jpg',
	'images/2.jpg',
	'images/3.jpg',
	'images/img-cockhorse.png',
	'images/img-mail.png',
	'images/sosbg.jpg',
	'images/videobg.jpg',
	'video/H5_14.mp4'
];

//把图片添加到数组中
for(var i = 0; i < fileList.length; i++) {
	loader.addImage(fileList[i]);
}

//加载的进度...
loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
});

var isStart = false;

//加载完成执行...
loader.addCompletionListener(function() {
	var endTime = new Date().getTime();
	var valueTime = endTime - startTime;
	var sTime = 0;
	if(valueTime < 4000) {
		sTime = 4000 - valueTime;
		setTimeout(function() {
			setTimeout(function() {
				var e = new Date().getTime();
				console.log('小于4秒' + (startTime - e));
				$('.loading-box').fadeOut(function() {
					$(this).remove();
				});
				$('.show-win').fadeIn();
				winMusic.play();
				winMusic.loop = false;
				clearInterval(loaderTime1);
				bgMusic_1.play();
				bgMusic_1.volume = 0.5;
			}, 0);
			return isStart = true;
		}, sTime);

	} else {
		setTimeout(function() {
			setTimeout(function() {
				var e = new Date().getTime();
				console.log('大于4秒' + (startTime - e));
				$('.loading-box').fadeOut(function() {
					$(this).remove();
				});
				$('.show-win').fadeIn();
				winMusic.play();
				clearInterval(loaderTime1);
				bgMusic_1.play();
				bgMusic_1.volume = 0.5;
			}, 0);
			return isStart = true;
		}, 1000);
	}
});

//loading老虎机
//setLoading();

//开始加载loader...
loader.start();

var loaderTime1 = null,
	loaderTime2 = null,
	loaderTime3 = null;

var m1 = 0,
	m2 = 0,
	m3 = 0;
var l1 = 0,
	l2 = 0,
	l3 = 0;
var b1 = false,
	b2 = false,
	b3 = false;
var q = 0;
//老虎机
function setLoading() {
	var w = 10 * 105;
	loaderTime1 = setInterval(function() {
		setTimeout(function() {
			b1 = true;
		}, 1000);
		if(m1 >= w) {
			m1 = 0;
		} else {
			if(b1) {
				m1 = m1 * 0.95;
				l1 = w - m1;
				if(m1 < 1) {
					clearInterval(loaderTime1);
				}
			} else {
				m1 += 10;
				l1 = m1;
			}
		}
		$('.t1 ul').css({
			'transform': 'translate3d(0,' + -l1 + 'px,0)',
			'-webkit-transform': 'translate3d(0,' + -l1 + 'px,0)'
		});
	}, 10);

	loaderTime2 = setInterval(function() {
		setTimeout(function() {
			b2 = true;
		}, 2500);
		if(m2 >= w) {
			m2 = 0;
		} else {
			if(b2) {
				m2 = m2 * 0.95;
				l2 = w - m2;
				if(m2 < 1) {
					clearInterval(loaderTime2);
				}
			} else {
				m2 += 10;
				l2 = m2;
			}
		}
		$('.t2 ul').css({
			'transform': 'translate3d(0,' + -l2 + 'px,0)',
			'-webkit-transform': 'translate3d(0,' + -l2 + 'px,0)'
		});
	}, 10);

	loaderTime3 = setInterval(function() {
		if(m3 >= w) {
			m3 = 0;
		} else {
			if(isStart) {
				m3 = m3 * 0.95;
				l3 = w - m3;
				if(m3 < 1) {
					clearInterval(loaderTime3);
					//					loadingMusic.pause();
					//					if(q>1){
					//
					//					}else{
					//						loadingFinishMusic.play();
					//						loadingFinishMusic.loop=false;
					//						q++;
					//					}
				}
			} else {
				m3 += 10;
				l3 = m3;
			}
		}
		$('.t3 ul').css({
			'transform': 'translate3d(0,' + -l3 + 'px,0)',
			'-webkit-transform': 'translate3d(0,' + -l3 + 'px,0)'
		});
	}, 10);

}
//控制music
//var r = true;
//var oMusic = document.getElementById("music");
//$('.music-icon').on('touchstart', function() {
//	if(r) {
//		$('.music-icon').css({
//			'animation-play-state': 'paused',
//			'-webkit-animation-play-state': 'paused'
//		});
//		oMusic.pause();
//		r = !r;
//	} else {
//		$('.music-icon').css({
//			'animation-play-state': 'running',
//			'-webkit-animation-play-state': 'running'
//		});
//		oMusic.play();
//		r = !r;
//	}
//});
//点击领取按钮，进入手机中毒页面

$('.click-btn').on('touchstart', function() {
	winMusic.pause();
	poisoningMusic.play();
	poisoningMusic.loop = false;
	$('.show-info').fadeOut();
	$('.cockhorse').show().addClass('active');
	setInterval(function() {
		$('.phone-virus').show().addClass('active');
	}, 1350);
	$('.show-virus').show();
	setTimeout(function() {
		createVirus(50);
		$('.show-virus').addClass('on');
	}, 3000);
});

var oVideo = document.getElementById("video");
var oSource = document.createElement("source");
oSource.src = 'video/H5_14.mp4';
oSource.type = 'video/mp4';

//创建病毒
var createVirus = function(num) {
		var oBoxVirus = document.getElementById("box_virus");
		var n = 0;
		var timer = null;
		var windowHeight = $(window).height();
		timer = setInterval(function() {
			if(n >= num) {
				$('.black-bg').css({
					'width': windowHeight + 'px',
					'height': windowHeight + 'px'
				});

				clearInterval(timer);
				setTimeout(function() {
					$('.show-win').remove();
					$('.show-virus').remove();
					$('.user-help').show();
					showSOS();
					poisoningMusic.pause();
					screamMusic.play();
					screamMusic.loop = false;
				}, 100);
			} else {
				var oSpan = document.createElement("span");
				var oImg = document.createElement("img");
				var oWidth = getRandom(50, 280);
				var oTop = getRandom(-100, 1000);
				var oLeft = getRandom(-100, 600);
				oImg.src = 'images/img-3.png';
				oSpan.style.width = parseInt(oWidth) + 'px';
				oSpan.style.top = parseInt(oTop) + 'px';
				oSpan.style.left = parseInt(oLeft) + 'px';
				oSpan.appendChild(oImg);
				oBoxVirus.appendChild(oSpan);
				n++;
			}
		}, 60);
	}
	//产生随机数
var getRandom = function(min, max) {
		return min + Math.floor(Math.random() * (max - min) * 100) / 100
	}
	//进入用户手机中毒页面，并求救
var showSOS = function() {
		$('.section1').addClass('active');
		setTimeout(function() {
			$('.section1').hide();
			$('.section2').addClass('active').show();
			setTimeout(function() {
				$('.section2').addClass('after');
			}, 1600);
		}, 4000);
	}
	//点击求救按钮，进入九宫格拼图
$('.section2 span').on('touchstart', function() {
	oVideo.appendChild(oSource);
	showSudoku();
	$(this).fadeOut();
});

//end
var endVideo = document.getElementById("endvideo");
var endSource = document.createElement("source");
endSource.src = 'video/M6_Plus.mp4';
endSource.type = 'video/mp4';

var eS = document.getElementById("endSource");

//显示九宫格
var showSudoku = function() {
	$('.sudoku').fadeIn();

	//bgMusic_1.volume=0.5;
	$('.user-help').fadeOut(function() {
		$(this).remove();
	});
	setTimeout(function() {
		document.getElementById("d9").className = 'target';
		$('.frame').show();
		setTimeout(function() {
			$('.sudoku-info p').html('点击拼图模块拼完有奇迹发生');
			$('.g-btn').fadeIn();
			
			reset();
		}, 1000)
	}, 5000);

	var aDiv = document.getElementById("game").getElementsByTagName('div');
	for(var i = 0; i < aDiv.length; i++) {
		aDiv[i].index = i;
		$(aDiv[i]).on('touchstart', function() {
			slideMusic.pause();
			var index = this.index + 1;
			move(index);
		});
	}
}

var oShowChip = document.getElementById("show_chip");
var startY, moveY, distance, endY, targetY;

$('.user-hint').on('touchstart', function(e)  {
	e.preventDefault();
	var _touch = e.originalEvent.targetTouches[0]; 
	startY = _touch.pageY;;
})

$('.user-hint').on('touchmove', function(e)  {
	e.preventDefault();
	var _touch = e.originalEvent.targetTouches[0]; 
	moveY = _touch.pageY;;
	distance = moveY - startY;
	if(distance > 20) {
		$('.show-chip').hide().remove();
		$('.video-box').show();
		bgMusic_1.pause();
		bgMusic_video.play();
		bgMusic_video.volume = 1;
		
		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			oVideo.play();
			$('.mycanvas').show();
			$('.myvideo').hide();
			drawCanvas();
		} else if(browser.versions.android) {
			oVideo.play();
			$('.user-interaction').css({
				'backgroundColor': '#f8f1df'
			});
			$('.user-box').css({
				'backgroundImage': 'url(images/img-33.jpg)'
			});
			$('.myvideo').css({
				'width': 640 + 'px',
				'height': 1138 + 'px'
			});
			$('.myvideo').addClass('eVideo');
		}
	}
})

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

var drawCanvas = function() {
	if(oVideo.paused || oVideo.ended) {
		return;
	}
	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
	context.drawImage(oVideo, 0, 0, 640, 1138);
	requestAnimFrame(drawCanvas);
}

var curTime = 0;
var vTimer = null;
var k = 0,
	p = 0,
	q = 0;

var playTime = 0;

oVideo.addEventListener('play', function() {
	oVideo.ontimeupdate = function() {
		curTime = oVideo.currentTime.toFixed(2);
		console.log(curTime);
		if(curTime > 6.3 && curTime < 7) {
			if(k > 1) {
				return false;
			} else {
				if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
					oVideo.pause();
					$('.user-interaction').show();

				} else if(browser.versions.android) {
					oVideo.removeChild(oSource);
					oVideo.style.display = 'none';
					setTimeout(function() {
						oVideo.pause();
					}, 1000);
				}

				k = 2;
				endVideo.appendChild(endSource);
				return playTime = curTime;
			}
		}
		if(curTime > 4 && curTime < 5) {
			if(p > 1) {
				return false;
			} else {
				if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

				} else if(browser.versions.android) {
					$('.user-interaction').show();
					$('.user-txt').show();
				}
				p = 2;
			}
		}

		if(curTime > 35.5) {
			if(q > 1) {
				return false;
			} else {
				$('.end-page').show();
				$('.eVideo').css({
					'animation-play-state': 'running',
					'-webkit-animation-play-state': 'running'
				});
				if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
					$('.end-txt').show();
				} else if(browser.versions.android) {

				}
				q = 2;
			}

		}
	}
}, false);

var isPlay = false;

oVideo.addEventListener('ended', function() {
	bgMusic_video.pause();
	isPlay = true;
	$('.video-box').hide();
	endTxt();
}, false);

var endDrawCanvas = function() {
	if(endVideo.paused || endVideo.ended) {
		return;
	}
	var canvas = document.getElementById("endcanvas");
	var context = canvas.getContext("2d");
	context.drawImage(endVideo, 0, 0, 360, 204);
	requestAnimFrame(endDrawCanvas);
}
endVideo.addEventListener('ended', function() {
	$('.endVideo-box').hide();
	$('.end-txt').show();
	endVideo.pause();
}, false);

function endTxt() {
	$('.end-txt').addClass('active').show();
	$('.endVideo-txt').show().addClass('active');
	setTimeout(function() {
		//版本1
		$('.page1').show().addClass('active');
		//版本2
		//$('.page2').show().addClass('active');
		setTimeout(function() {
			$('.endVideo-bg').show();
			$('.end-txt').hide();
		}, 3000);
	}, 1000);
}

if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	$('.one').on('touchstart', function() {
		$('.user-interaction').remove();
		oVideo.play();
		oVideo.currentTime = playTime;
		drawCanvas();
	});
} else if(browser.versions.android) {
	$('.one').on('touchstart', function() {
		$('.user-interaction').remove();
		oVideo.style.display = 'block';
		oVideo.appendChild(oSource);
		oVideo.play();
		oVideo.currentTime = playTime;
		var oT = oVideo.duration;
	});
}

$(".share-btn").on("touchstart", function() {
	$('.share-container').show();
});
$(".share-container").on("touchstart", function() {
	$(this).hide();
});

$('.endVideo-btn').on('touchstart', function() {
		$(this).hide();
		$('.endVideo-box').show();
		endVideo.play();
		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			$('.endcanvas').show();
			endDrawCanvas();
			endVideo.style.display = 'none';
			$('.end-page').show();
			$('.eVideo').css({
				'animation-play-state': 'running',
				'-webkit-animation-play-state': 'running'
			});
		} else if(browser.versions.android) {}
	})
	//bgMusic_video.addEventListener('play', function() {
	//	bgMusic_video.ontimeupdate = function() {
	//		var n=bgMusic_video.currentTime.toFixed(2);
	//		document.title=n;
	//	}
	//},false);