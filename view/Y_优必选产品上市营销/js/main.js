/**
 * 阻止浏览器默认事件
 */
window.addEventListener('touchmove', function(e) {
	//e.preventDefault();
}, false);

/**
 * 淡入
 */
function fadeIn(obj) {
	obj.style.display = "block";
	obj.classList.remove("fadeOut", "fadeIn");
	setTimeout(function() {
		obj.classList.add("fadeIn");
	}, 100);
}

/**
 * 淡出
 */
function fadeOut(obj) {
	obj.classList.add("fadeOut");
	setTimeout(function() {
		obj.style.display = "none";
		obj.classList.remove("fadeOut", "fadeIn");
	}, 400);
}

/**
 * loading加载
 */
(function() {
	var startTime = new Date().getTime();
	var endTime = 0;
	var dis = 0;
	var time = 0;
	var nT = 3000;
	var oTxt = document.querySelector('.loading h1');

	var loader = new PxLoader();

	for(var i = 0; i < fileList.length; i++) {
		loader.addImage(fileList[i]);
	}

	loader.addProgressListener(function(e) {
		var percent = Math.round((e.completedCount / e.totalCount) * 100);

		oTxt.innerHTML = percent + "%";

	});

	loader.addCompletionListener(function(e) {
		endTime = new Date().getTime();
		dis = endTime - startTime;
		//		if(dis < nT) {
		//			time = nT - dis;
		//			startMain(time);
		//		} else {
		//			startMain(time);
		//		}
		startMain(500);
	});

	loader.start();

	function startMain(t) {

		setTimeout(function() {

			var oLoading = document.querySelector('.loading');

			fadeOut(oLoading);

			$('.title').addClass('active');

			onTouchSlide();

		}, t);

	}
})();

/**
 * 设置京东1212灯光
 */

(function() {
	var aLight_2 = document.querySelectorAll('.scene_6 .light-2 i');

	for(var i = 0; i < aLight_2.length; i++) {

		if(i < aLight_2.length / 2) {
			aLight_2[i].style.animationDelay = i * 0.1 + "s";
			aLight_2[i].style.webkitAnimationDelay = i * 0.1 + "s";
		} else {
			aLight_2[i].style.animationDelay = (aLight_2.length - i) * 0.1 + "s";
			aLight_2[i].style.webkitAnimationDelay = (aLight_2.length - i) * 0.1 + "s";
		}

	}
})();
/**
 * 监听页面高度大小
 */
window.addEventListener('resize', function() {
	var wHeight = window.innerHeight;
	var oBtn = document.querySelector('.popup .box');
	if(wHeight < 1000) {
		oBtn.style.width = 400 + "px";
	} else {
		oBtn.style.width = 508 + "px";
	}
}, false);

/**
 * 设置点击机器人显示弹出
 */
(function() {
	var aTouch = document.querySelectorAll('.touch');
	var aBoxSpan = document.querySelectorAll('.popup .box span');
	var oPopup = document.querySelector('.popup');
	var oClose = document.querySelector('.popup .close');
	var m = 0;

	for(var i = 0; i < aTouch.length; i++) {
		aTouch[i].index = i;
		aTouch[i].addEventListener('touchstart', function() {
			var n = this.index;
			console.log(n);
			if(m == 0) {
				MtaH5.clickStat("youbixuan_tanchuan");
				m = 1;
			}

			for(var j = 0; j < aBoxSpan.length; j++) {
				if(j == n) {
					aBoxSpan[n].style.display = "block";
				} else {
					aBoxSpan[j].style.display = "none";
				}
			}

			fadeIn(oPopup);

			window.addEventListener('touchmove', fn);

		}, false);
	}
	oClose.addEventListener('touchstart', function() {

		fadeOut(oPopup);

		window.removeEventListener('touchmove', fn);

	}, false);

	function fn(ev) {
		ev.preventDefault();
	}

})();

/**
 * 控制音乐播放暂停
 */
(function() {
	var bgMusic = document.querySelector('.music');

	setTimeout(function() {
		bgMusic.src = 'music/music.mp3';
		bgMusic.play();
		oMusicPlay.style.animationPlayState = "running";
		oMusicPlay.style.webkitAnimationPlayState = "running";
	}, 300);

	var oMusicIcon = document.querySelector('.musicIcon');
	var oMusicPlay = document.querySelector('.musicIcon span');
	var oMusicPause = document.querySelector('.musicIcon i');
	var isUserPauseMusic = false;

	oMusicIcon.addEventListener('click', function() {
		if(bgMusic.paused) {
			bgMusic.play();
			oMusicPlay.style.animationPlayState = "running";
			oMusicPlay.style.webkitAnimationPlayState = "running";
			oMusicPause.style.display = "none";
			isUserPauseMusic = false;
		} else {
			bgMusic.pause();
			oMusicPlay.style.animationPlayState = "paused";
			oMusicPlay.style.webkitAnimationPlayState = "paused";
			oMusicPause.style.display = "block";
			isUserPauseMusic = true;
		}
	}, false);

})();

/**
 * 监听页面滚动高度
 */
function onTouchSlide() {

	var n1 = 0;
	var n2 = 0;
	var n3 = 0;
	var n4 = 0;
	var n5 = 0;
	var n6 = 0;
	var n7 = 0;
	var n8 = 0;

	var oScene_7 = document.querySelector('.scene_7');

	var aBoxSpan = document.querySelectorAll('.scene_7 .box span');
	var aPointLight = document.querySelectorAll('.scene_7 .point-light i');
	var aPointLight2 = document.querySelectorAll('.scene_7 .point-light2 i');

	var oDialog_1 = document.querySelector('.dialog-1');
	var oDialog_2 = document.querySelector('.dialog-2');
	var oDialog_3 = document.querySelector('.dialog-3');
	var oDialog_4 = document.querySelector('.dialog-4');
	var oDialog_5 = document.querySelector('.dialog-5');
	var oDialog_6 = document.querySelector('.dialog-6');
	var oDialog_7 = document.querySelector('.dialog-7');
	var oDialog_8 = document.querySelector('.dialog-8');
	var oDialog_9 = document.querySelector('.dialog-9');
	var oDialog_10 = document.querySelector('.dialog-10');
	var oDialog_11 = document.querySelector('.dialog-11');
	var oDialog_12 = document.querySelector('.dialog-12');
	var oDialog_13 = document.querySelector('.dialog-13');

	var aTouch = document.querySelectorAll('.touch');
	var nTop=0;
	nTop = document.documentElement.scrollTop || document.body.scrollTop;
	
	window.addEventListener('scroll', function(e) {
		nTop = document.documentElement.scrollTop || document.body.scrollTop;
		
		addScrollTop(nTop);

	}, false);
	
	addScrollTop(nTop);
	
	function addScrollTop(t){
		
		if(t >= 1000 && t < 1500 && n1 == 0) {
			n1 = 1;
			oDialog_1.classList.add('active');
			$('.point_1').addClass('active');
			setTimeout(function() {
				oDialog_2.classList.add('active');
				setTimeout(function() {
					aTouch[0].style.opacity = 1;
				}, 100);

			}, 1500);

		} else if(t < 225 && n1 == 1) {
			n1 = 0;
			oDialog_1.classList.remove('active');
			oDialog_2.classList.remove('active');
			$('.point_1').removeClass('active');
			aTouch[0].style.opacity = 0;
		} else if(t >= 1900 && n1 == 1) {
			n1 = 0;
			oDialog_1.classList.remove('active');
			oDialog_2.classList.remove('active');
			$('.point_1').removeClass('active');
			aTouch[0].style.opacity = 0;
		}

		if(t >= 2000 && t < 2500 && n2 == 0) {
			n2 = 1;
			oDialog_3.classList.add('active');
			$('.point_2').addClass('active');
			setTimeout(function() {
				oDialog_4.classList.add('active');

				setTimeout(function() {
					$('.scene_3 .dialog-3 span:nth-of-type(1) h1').fadeOut();
					$('.scene_3 .dialog-3 span:nth-of-type(1) h2').fadeIn();
					setTimeout(function() {
						$('.scene_3 .dialog-4 span:nth-of-type(1) h1').fadeOut();
						$('.scene_3 .dialog-4 span:nth-of-type(1) h2').fadeIn();

						setTimeout(function() {
							aTouch[1].style.opacity = 1;
						}, 100);

					}, 1200);
				}, 1200);
			}, 1500);

		} else if(t < 1300 && n2 == 1) {
			n2 = 0;
			oDialog_3.classList.remove('active');
			oDialog_4.classList.remove('active');
			$('.point_2').removeClass('active');
			aTouch[1].style.opacity = 0;

			$('.scene_3 .dialog-3 span:nth-of-type(1) h1').fadeIn();
			$('.scene_3 .dialog-3 span:nth-of-type(1) h2').fadeOut();

			$('.scene_3 .dialog-4 span:nth-of-type(1) h1').fadeIn();
			$('.scene_3 .dialog-4 span:nth-of-type(1) h2').fadeOut();

		} else if(t > 3000 && n2 == 1) {
			n2 = 0;
			oDialog_3.classList.remove('active');
			oDialog_4.classList.remove('active');
			$('.point_2').removeClass('active');
			aTouch[1].style.opacity = 0;
			$('.scene_3 .dialog-3 span:nth-of-type(1) h1').fadeIn();
			$('.scene_3 .dialog-3 span:nth-of-type(1) h2').fadeOut();

			$('.scene_3 .dialog-4 span:nth-of-type(1) h1').fadeIn();
			$('.scene_3 .dialog-4 span:nth-of-type(1) h2').fadeOut();

		}

		if(t >= 3400 && t < 3890 && n3 == 0) {
			n3 = 1;
			oDialog_5.classList.add('active');
			$('.point_3').addClass('active');
			setTimeout(function() {
				oDialog_6.classList.add('active');

				setTimeout(function() {
					aTouch[2].style.opacity = 1;
					setTimeout(function(){
						$('.temperature').addClass('active');
					},500);
				}, 100);
			}, 1000);

		} else if(t < 2600 && n3 == 1) {
			n3 = 0;
			oDialog_5.classList.remove('active');
			oDialog_6.classList.remove('active');
			$('.point_3').removeClass('active');
			$('.temperature').removeClass('active');
			aTouch[2].style.opacity = 0;
		} else if(t > 4300 && n3 == 1) {
			n3 = 0;
			oDialog_5.classList.remove('active');
			oDialog_6.classList.remove('active');
			$('.point_3').removeClass('active');
			$('.temperature').removeClass('active');
			aTouch[2].style.opacity = 0;
		}

		if(t >= 4000 && t<4600&& n4 == 0) {
			n4 = 1;
			oDialog_7.classList.add('active');
			$('.point_4').addClass('active');
			setTimeout(function() {
				oDialog_8.classList.add('active');
				
				setTimeout(function(){
					oDialog_9.classList.add('active');
					$('.point_5').addClass('active');
					setTimeout(function() {
						oDialog_10.classList.add('active');
						aTouch[3].style.opacity = 1;
						setTimeout(function() {
							$('.scene_5 .note').fadeIn();
							
						}, 500);
					}, 750);
				},1000);
				
			}, 750);
		} else if(t < 3300 && n4 == 1) {
			n4 = 0;
			oDialog_7.classList.remove('active');
			oDialog_8.classList.remove('active');
			$('.point_4').removeClass('active');
			
			oDialog_9.classList.remove('active');
			oDialog_10.classList.remove('active');
			$('.point_4').removeClass('active');
			$('.scene_5 .note').fadeOut();
			aTouch[2].style.opacity = 0;
		}else if(t > 5700 && n4 == 1) {
			n4 = 0;
			oDialog_7.classList.remove('active');
			oDialog_8.classList.remove('active');
			$('.point_4').removeClass('active');
			
			oDialog_9.classList.remove('active');
			oDialog_10.classList.remove('active');
			$('.point_4').removeClass('active');
			$('.scene_5 .note').fadeOut();
			aTouch[2].style.opacity = 0;
		}

		if(t >= 4400 && t < 4600 && n5 == 0) {
			n5 = 1;
			

		} else if(t < 3700 && n5 == 1) {
			n5 = 0;
			
		} else if(t > 5700 && n5 == 1) {
			n5 = 0;
			
		}

		if(t >= 4800 && t < 5050 && n6 == 0) {
			n6 = 1;
			oDialog_11.classList.add('active');
			setTimeout(function() {
				oDialog_12.classList.add('active');
			}, 1000);
		} else if(t < 3900 && n6 == 1) {
			n6 = 0;
			oDialog_11.classList.remove('active');
			oDialog_12.classList.remove('active');
		} else if(t > 5700 && n6 == 1) {
			n6 = 0;
			oDialog_11.classList.remove('active');
			oDialog_12.classList.remove('active');
		}

		if(t >= 5600 && t < 6100 && n7 == 0) {
			n7 = 1;
			oDialog_13.classList.add('active');
		} else if(t < 4800 && n7 == 1) {
			n7 = 0;
			oDialog_13.classList.remove('active');
		} else if(t > 6400 && n7 == 1) {
			n7 = 0;
			oDialog_13.classList.remove('active');
		}

		if(t >= 6550 && n8 == 0) {

			n8 = 1;

			oScene_7.classList.add('active');

			for(var i = 0; i < aBoxSpan.length; i++) {
				if(i!==2 && i!==3){
					aBoxSpan[i].style.animationDelay = i * 0.2 + "s";
					aBoxSpan[i].style.webkitAnimationDelay = i * 0.2 + "s";
				}				
			}
			for(var i = 0; i < aPointLight.length; i++) {
				
				aPointLight[i].style.animationDelay = i * 0.1 + "s";
				aPointLight[i].style.webkitAnimationDelay = i * 0.1 + "s";
								
			}
			for(var i = 0; i < aPointLight2.length; i++) {
				
				aPointLight2[i].style.animationDelay = i * 0.1+0.1 + "s";
				aPointLight2[i].style.webkitAnimationDelay = i * 0.1+ 0.1 + "s";
								
			}

		} else if(t <= 5800 && n8 == 1) {
			n8 = 0;

			oScene_7.classList.remove('active');
		}
	}
	
};

$('.scene_7 .alink').on('click', function() {
	MtaH5.clickStat("youbixuan_jingdong");
	window.location.href="https://item.m.jd.com/product/5835503.html";
});