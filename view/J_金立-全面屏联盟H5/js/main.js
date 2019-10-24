/**
 * 阻止浏览器默认事件
 */
window.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

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
	$('.video').attr("src", "video/iosVideo.mp4");
}

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

var images_frame = [];
var isTouch = true;
var isPlay = true;

var oc = document.getElementById("canvas");
oc.style.width = window.innerWidth + "px";
oc.style.height = 1280 + "px";

/**
 * loading加载
 */
(function() {
	var startTime = new Date().getTime();
	var endTime = 0;
	var dis = 0;
	var time = 0;
	var nT = 3000;

	var loader = new PxLoader();

	for(var i = 0; i < fileList.length; i++) {
		images_frame.push(loader.addImage(fileList[i]));
	}

	loader.addProgressListener(function(e) {
		var percent = Math.round((e.compvaredCount / e.totalCount) * 100);
	});

	loader.addCompletionListener(function(e) {
		endTime = new Date().getTime();
		dis = endTime - startTime;
		if(dis < nT) {
			time = nT - dis;
			startMain(time);
		} else {
			startMain(time);
		}
	});

	loader.start();

	function startMain(t) {

		setTimeout(function() {

			var oLoading = document.querySelector('.loading');

			fadeOut(oLoading);

			page_one();

		}, t);

	}
})();

/**
 * 总有一些约定俗称限定想象,在沉默中习惯接受忘记改变,就像16:9 就是唯一的可能
 */
function page_one() {

	var oMain = document.querySelector('.main');

	oMain.style.opacity = 1;

	setTimeout(function() {

		setDisplay('.u-text-1', '.u-text-1 i');

		setTimeout(function() {

			document.querySelector('.u-text-1').classList.add("fadeOut");

			setTimeout(function() {

				setDisplay('.u-text-2', '.u-text-2 i');

				setTimeout(function() {

					document.querySelector('.u-text-2').classList.add("fadeOut");

					setTimeout(function() {

						setDisplay('.u-text-3', '.u-text-3 i');

						setTimeout(function() {
							var u_circle_1 = document.querySelector('.u-circle');
							u_circle_1.classList.add("fadeOut");

							var u_circle_2 = document.querySelector('.u-circle-2');
							var u_circle_3 = document.querySelector('.u-circle-3');
							var u_circle_4 = document.querySelector('.u-circle-4');
							var u_circle_5 = document.querySelector('.u-circle-5');

							document.querySelector('.u-text-3').classList.add("fadeOut");

							var c_border_1 = document.querySelector('.c-border-1');
							c_border_1.style.opacity = 1;
							c_border_1.style.transform = "scale(1)";
							c_border_1.style.webkitTransform = "scale(1)";

							var c_border_2 = document.querySelector('.c-border-2');
							var c_border_3 = document.querySelector('.c-border-3');

							var oIronBox = document.querySelector('.iron-box');
							oIronBox.classList.add("ironboxframes");

							var u_border_1 = document.querySelector('.u-border-1');
							var u_border_2 = document.querySelector('.u-border-2');
							u_border_2.style.opacity = 1;

							var u_border_3 = document.querySelector('.u-border-3');

							document.querySelector('.u-border-bias').classList.add("fadeOut");

							setTimeout(function() {

								var m_text_1 = document.querySelector('.m-text-1');
								m_text_1.style.opacity = 1;
								m_text_1.style.transform = "translateX(0px)";
								m_text_1.style.webkitTransform = "translateX(0px)";

								var m_text_2 = document.querySelector('.m-text-2');

								setTimeout(function() {

									c_border_1.style.opacity = 0;

									c_border_2.style.opacity = 1;

									setTimeout(function() {

										m_text_1.style.opacity = 0;
										m_text_1.style.transform = "translateX(200px)";
										m_text_1.style.webkitTransform = "translateX(200px)";

										setTimeout(function() {
											m_text_2.style.opacity = 1;
											m_text_2.style.transform = "translateX(0px)";
											m_text_2.style.webkitTransform = "translateX(0px)";

											setTimeout(function() { //2s后下一个场景

												u_border_1.style.opacity = 0;
												u_border_2.style.opacity = 0;
												u_border_3.style.opacity = 1;

												m_text_2.style.opacity = 0;
												m_text_2.style.transform = "translateX(200px)";
												m_text_2.style.webkitTransform = "translateX(200px)";

												c_border_2.style.opacity = 0;
												c_border_3.style.opacity = 1;

												u_circle_2.style.opacity = 1;
												u_circle_3.style.opacity = 1;

												var data_map = document.querySelector('.data-map');
												var trend = document.querySelector('.trend');
												data_map.style.opacity = 1;
												trend.style.opacity = 1;

												var u_decorate = document.querySelector('.u-decorate');
												u_decorate.style.opacity = 0;

												var iron_box_i = document.querySelectorAll('.iron-box i');

												for(var i = 0; i < iron_box_i.length; i++) {
													iron_box_i[i].style.display = "none";
												}

												setTimeout(function() {

													var m_text_3 = document.querySelectorAll('.m-text-3 span');
													var m_text_4 = document.querySelectorAll('.m-text-4 span');
													var m_text_5 = document.querySelectorAll('.m-text-5 span');

													for(var m = 0; m < m_text_3.length; m++) {
														m_text_3[m].style.opacity = 1;
														m_text_3[m].style.transform = "translateX(0px)";
														m_text_3[m].style.webkitTransform = "translateX(0px)";
													}

													setTimeout(function() { //2s后下一个场景

														u_circle_4.style.opacity = 1;
														u_circle_5.style.opacity = 1;

														for(var m = 0; m < m_text_3.length; m++) {
															m_text_3[m].style.opacity = 0;
															m_text_3[m].style.transitionDelay = m * 0.1 + "s";
															if(m % 2 == 0) {
																m_text_3[m].style.transform = "translateX(300px)";
																m_text_3[m].style.webkitTransform = "translateX(300px)";
															} else {
																m_text_3[m].style.transform = "translateX(-300px)";
																m_text_3[m].style.webkitTransform = "translateX(-300px)";
															}

														}

														c_border_3.style.opacity = 0;

														for(var i = 0; i < iron_box_i.length; i++) {
															iron_box_i[i].style.display = "block";
															iron_box_i[i].style.transform = "scale(0.5)";
															iron_box_i[i].style.webkitTransform = "scale(0.5)";
														}

														var g_video = document.querySelector('.g-video');
														var g_earth = document.querySelector('.g-earth');
														var g_earth_2 = document.querySelector('.g-earth-2');

														g_video.style.opacity = 0;
														g_earth.style.opacity = 0;

														setTimeout(function() {

															for(var m = 0; m < m_text_4.length; m++) {
																m_text_4[m].style.opacity = 1;
																m_text_4[m].style.transform = "translateY(0px)";
																m_text_4[m].style.webkitTransform = "translateY(0px)";
															}

															var g_light_1 = document.querySelector('.g-light-1');

															g_light_1.style.opacity = 1;

															setTimeout(function() {

																for(var m = 0; m < m_text_4.length; m++) {
																	m_text_4[m].style.opacity = 0;
																	m_text_4[m].style.transform = "translateY(100px)";
																	m_text_4[m].style.transitionDelay = 0.5 - m * 0.1 + "s";
																	m_text_4[m].style.webkitTransform = "translateY(100px)";
																	m_text_4[m].style.webkitTransitionDelay = 0.5 - m * 0.1 + "s";
																}

																u_circle_2.style.opacity = 0;
																u_circle_3.style.opacity = 0;
																u_circle_4.style.opacity = 0;
																u_circle_5.style.opacity = 0;

																var g_fk_1 = document.querySelector('.g-fk-1');
																var g_fk_2 = document.querySelector('.g-fk-2');
																var g_fk_3 = document.querySelector('.g-fk-3');

																g_fk_1.style.opacity = 0;
																g_fk_2.style.opacity = 0;

																g_earth_2.style.opacity = 1;

																var g_line_1 = document.querySelector('.g-line-1');
																g_line_1.style.opacity = 1;

																data_map.style.opacity = 0;
																trend.style.opacity = 0;

																setTimeout(function() {
																	for(var m = 0; m < m_text_5.length; m++) {
																		m_text_5[m].style.opacity = 1;
																		m_text_5[m].style.transform = "translate(0px,0px)";
																		m_text_5[m].style.webkitTransform = "translate(0px,0px)";
																	}

																	g_fk_3.style.opacity = 1;

																	var oCanvasframe = document.getElementById("canvas");

																	oCanvasframe.style.opacity = 1;

																	playFrame();

																	setTimeout(function() {
																		var g_btn = document.querySelector('.g-btn');
																		g_btn.style.opacity = 1;
																		g_btn.style.transform = "translate(0px,0px)";
																		g_btn.style.webkitTransform = "translate(0px,0px)";
																	}, 2000);

																}, 1000);

															}, 3000);

														}, 1000);

													}, 3000);

												}, 1000);

											}, 3000);

										}, 1000);

									}, 1000);

								}, 2000);

							}, 1350);

						}, 3500);

					}, 500);

				}, 3000);

			}, 500);

		}, 3000);

	}, 500);

	//打字效果
	function setDisplay(obj1, obj2) {

		var oTextBox = document.querySelector(obj1);

		var aTextList = document.querySelectorAll(obj2);

		var i = 0;

		oTextBox.classList.add('active');

		setTimeout(function() {

			var timer = setInterval(function() {

				if(i >= aTextList.length) {
					clearInterval(timer);
				} else {
					aTextList[i].style.display = 'block';
					i++;
				}

			}, 150);

		}, 500);

	}

}
/**
 * 控制音乐
 */
var oMusic = document.getElementById("musicAudio");
var musicSpan = document.querySelectorAll('.music1 span');
var isControlMusic = true;
var oMusicVideo = document.querySelector(".video");
var musicVideoSpan = document.querySelectorAll('.music2 span');
var musicVideoIcon = document.querySelector('.music2');

var musicIcon = document.querySelector('.music1');

var isVolume=false;

setTimeout(function() {
	oMusic.src = 'music/H5BGM.mp3';
	oMusic.play();
}, 300);

musicIcon.addEventListener('click', function() {

	if(oMusic.paused) {
		oMusic.play();
		isControlMusic = true;
		for(var i = 0; i < musicSpan.length; i++) {
			musicSpan[i].style.animationPlayState = "running";
		}

	} else {
		oMusic.pause();
		isControlMusic = false;
		for(var i = 0; i < musicSpan.length; i++) {
			musicSpan[i].style.animationPlayState = "paused";
		}
	}

}, false);



/**
 * 序列帧
 */

function playFrame() {

	var videoBox = document.querySelector('.video-box');
	var oVideo = document.querySelector('.video');
	var playBtn = document.querySelector('.g-btn');
	var oMain = document.querySelector('.main');
	var oMobleBox = document.querySelector('.mobile-box');

	var oCanvas = document.getElementById("canvas");
	var ctx = oCanvas.getContext('2d');

	var w_wdith = window.innerWidth;
	var w_height = 1280;

	oCanvas.style.width = w_wdith + "px";
	oCanvas.style.height = w_height + "px";

	oCanvas.width = w_wdith;
	oCanvas.height = w_height;

	var k = 0;
	var LastTime = 0;
	var setFTP = 66;
	var isCirculation = true;
	var isClockwise = true; //顺时针

	animate();

	function animate() {

		var dtNow = Date.now();

		if(dtNow - LastTime >= setFTP) {

			ctx.clearRect(0, 0, w_wdith, w_height);

			ctx.drawImage(images_frame[k], 0, 0, w_wdith, w_height);

			if(isCirculation) {

				if(isClockwise) {
					if(k >= 14) {
						isClockwise = false;
					} else {
						k++;
					}
				} else {
					if(k <= 0) {
						isClockwise = true;
					} else {
						k--;
					}
				}
			} else {
				if(k <= 37) {
					k++;
				}
			}

			LastTime = dtNow;
		}
		if(k >= 37) {

			window.cancelAnimationFrame(animate);

			fadeOut(oMain);

		} else {
			window.requestAnimationFrame(animate);
		}
	}

	playBtn.addEventListener('click', function() {

		MtaH5.clickStat("gionee_user_click_video");

		$('.canvas').css("z-index", 9999);
		$('.video-box').css({
			"display": "block"
		});
		isCirculation = false;

		fadeOut(playBtn);

		videoBox.style.display = "block";

		oMusic.pause();
		$('.music1').hide();
		$('.music2').show();
		var oBaozhaMusic = document.getElementById("baozha");
		oBaozhaMusic.play();

		for(var i = 0; i < musicSpan.length; i++) {
			musicSpan[i].style.animationPlayState = "paused";
		}

		oVideo.play();

		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

//			oVideo.style.display = "none";
//
//			var iosCanvas = document.getElementById("IOSCanvas");
//			iosCanvas.style.display = "block";
//			iosCanvas.width = 640;
//			iosCanvas.height = 1030;
//
//			var ctx = iosCanvas.getContext('2d');
//
//			playDrawImage();
//
//			function playDrawImage() {
//				requestAnimationFrame(playDrawImage);
//				ctx.clearRect(0, 0, 640, 1030);
//				ctx.drawImage(oVideo, 0, 0, 640, 1030);
//			}

		}

	}, false);

	oVideo.addEventListener('ended', function() {

		isPlay = false;

		fadeIn(oMobleBox);
		if(isControlMusic) {
			oMusic.play();
			for(var i = 0; i < musicSpan.length; i++) {
				musicSpan[i].style.animationPlayState = "running";
			}

		}

		$('.music1').show();
		$('.music2').hide();

		oVideo.style.display = "none";

		$('.u-hint').fadeIn();

	}, false);

	oVideo.addEventListener("x5videoexitfullscreen", function() {
		window.addEventListener('click', function() {
			if(isPlay) {
				oVideo.play();
			}

		}, false);
	}, false);

	oVideo.addEventListener("x5videoenterfullscreen", function() {

	}, false);
	
	musicVideoIcon.addEventListener('click', function() {

		if(isVolume) {
			oVideo.muted=false;
			for(var i = 0; i < musicVideoSpan.length; i++) {
				musicVideoSpan[i].style.animationPlayState = "running";
			}
	
		} else {
			oVideo.muted=true;
			for(var i = 0; i < musicVideoSpan.length; i++) {
				musicVideoSpan[i].style.animationPlayState = "paused";
			}
		}
		isVolume=!isVolume;
	
	}, false);

}

/**
 * 用户左右滑动图片轮播
 */
(function() {

	var aClassName = ["one", "two", "three", "four"];
	var aClassName2 = ["one", "two", "three2", "four"];

	var num = [0, 1, 2, 3];

	var aMobileClass = document.querySelectorAll('.mobile');

	var oMobileContainer = document.querySelector('.mobile-container');

	var aTitle = document.querySelectorAll('.t-title li');

	aTitle[0].style.opacity = 1;

	var startX = 0,
		moveX = 0,
		endX = 0,
		isSlide = true,
		direction = true; //trur-->右；false-->左

	var a = 0;

	oMobileContainer.addEventListener('touchstart', onTouchStart, false);

	function onTouchStart(e) {

		startX = e.touches[0].clientX;

		oMobileContainer.addEventListener('touchmove', onTouchMove, false);

		oMobileContainer.addEventListener('touchend', onTouchEnd, false);

		$('.u-hint').fadeOut();

	}

	function onTouchMove(e) {

		moveX = e.touches[0].clientX - startX;

	}

	function onTouchEnd() {

		if(isTouch & isSlide && moveX > 150) { //右滑

			direction = true;
			changeClassName2();

		} else if(isTouch & isSlide && moveX < -150) { //左滑

			direction = false;
			changeClassName();

		}

		isSlide = false;

		setTimeout(function() {
			isSlide = true;
			moveX = 0;
		}, 1000);
	}

	function changeClassName() {

		countNum(0);
		countNum(1);
		countNum(2);
		countNum(3);

		for(var i = 0; i < aMobileClass.length; i++) {
			aMobileClass[i].classList.remove(aClassName[0]);
			aMobileClass[i].classList.remove(aClassName[1]);
			aMobileClass[i].classList.remove(aClassName[2]);
			aMobileClass[i].classList.remove(aClassName[3]);
			aMobileClass[i].classList.remove(aClassName2[0]);
			aMobileClass[i].classList.remove(aClassName2[1]);
			aMobileClass[i].classList.remove(aClassName2[2]);
			aMobileClass[i].classList.remove(aClassName2[3]);
		}

		aMobileClass[0].classList.add(aClassName[num[0]]);
		aMobileClass[1].classList.add(aClassName[num[1]]);
		aMobileClass[2].classList.add(aClassName[num[2]]);
		aMobileClass[3].classList.add(aClassName[num[3]]);
	}

	function changeClassName2() {

		countNum(0);
		countNum(1);
		countNum(2);
		countNum(3);

		for(var i = 0; i < aMobileClass.length; i++) {
			aMobileClass[i].classList.remove(aClassName[0]);
			aMobileClass[i].classList.remove(aClassName[1]);
			aMobileClass[i].classList.remove(aClassName[2]);
			aMobileClass[i].classList.remove(aClassName[3]);
			aMobileClass[i].classList.remove(aClassName2[0]);
			aMobileClass[i].classList.remove(aClassName2[1]);
			aMobileClass[i].classList.remove(aClassName2[2]);
			aMobileClass[i].classList.remove(aClassName2[3]);
		}

		aMobileClass[0].classList.add(aClassName2[num[0]]);
		aMobileClass[1].classList.add(aClassName2[num[1]]);
		aMobileClass[2].classList.add(aClassName2[num[2]]);
		aMobileClass[3].classList.add(aClassName2[num[3]]);
	}

	function countNum(i) {
		if(direction) {
			if(num[i] < 3) {
				num[i]++;
			} else {
				num[i] = 0;
			}
		} else {
			if(num[i] > 0) {
				num[i]--;
			} else {
				num[i] = 3;
			}
		}
		for(var j = 0; j < aTitle.length; j++) {
			if(j == num[0]) {
				aTitle[j].style.opacity = 1;
				a = j;
			} else {
				aTitle[j].style.opacity = 0;
			}

		}
	}

	var oBtn = document.querySelector('.createBtn');
	var oPoster = document.querySelector('.poster');
	oBtn.addEventListener('click', function() {

		MtaH5.clickStat("gionee_user_click_createposter");

		isTouch = false;
		fadeIn(oPoster);
		oBtn.style.display = 'none';
		createPoster(a);
	}, false);

})();

//生成图片
function createPoster(m) {
	console.log(m)
	var er_width = 120;
	var er_height = 120;

	var _url = window.location.href;
	var p_text = document.querySelector('.p-text');

	$('#qrcodeCanvas').qrcode({
		render: "canvas",
		text: _url,
		width: er_width,
		height: er_height,
		background: "#ffffff",
		foreground: "#000000",
		src: ''
	});

	var qrcodeCanvas = document.querySelector("#qrcodeCanvas canvas");

	var userpoter = document.getElementById("userpoter");

	var oCanvas = document.createElement("canvas");
	var ctx = oCanvas.getContext('2d');

	var w = 396;
	var h = 794;

	oCanvas.width = w;
	oCanvas.height = h;

	var imgArr = ["images/img-57.jpg", "images/img-58.jpg", "images/img-55.jpg", "images/img-56.jpg"];

	var oImg = new Image();
	oImg.src = imgArr[m];

	oImg.onload = function() {

		ctx.drawImage(oImg, 0, 0, w, h);

		ctx.drawImage(qrcodeCanvas, 248, 645);

		userpoter.src = oCanvas.toDataURL();

		p_text.style.display = 'block';
	}

	var oClose = document.querySelector('.p-close');
	var oPoster = document.querySelector('.poster');
	var oTwoBtn = document.querySelector('.twoBtn');

	oClose.addEventListener('click', function() {

		MtaH5.clickStat("gionee_user_click_closeposter");

		fadeOut(oPoster);
		fadeIn(oTwoBtn);
		p_text.style.display = 'none';
	}, false);

}

$('.again').on('click', function() {

	MtaH5.clickStat("gionee_user_click_again");

	$('.main').css({
		"opacity": 1,
		"display": "block"
	});
	$('.main').removeClass("fadeOut");
	$('.u-border-1').css("opacity", 1);
	$('.u-border-3').css("opacity", 0);
	$('.g-fk-1').css("opacity", 1);
	$('.g-fk-2').css("opacity", 1);
	$('.g-video').css("opacity", 1);
	$('.g-earth').css("opacity", 1);
	$('.g-earth-2').css("opacity", 0);
	$('.g-fk-3').css("opacity", 0);
	$('.g-line-1').css("opacity", 0);
	$('.u-border-bias').removeClass("fadeOut");
	$('.u-circle').removeClass("fadeOut");
	$('.u-decorate').css("opacity", 1);
	$('.u-text-1').removeClass("fadeOut active");
	$('.u-text-2').removeClass("fadeOut active");
	$('.u-text-3').removeClass("fadeOut active");

	$('.u-text-1 span i').css("display", "none");
	$('.u-text-2 span i').css("display", "none");
	$('.u-text-3 span i').css("display", "none");

	$('.m-text-3 span:nth-of-type(1)').css({
		"transform": "translateX(-300px)"
	});
	$('.m-text-3 span:nth-of-type(2)').css({
		"transform": "translateX(300px)",
		"transition-delay": "0.5s",
		"-webkit-transform": "translateX(300px)",
		"-webkit-transition-delay": "0.5s"
	});

	$('.m-text-4 span:nth-of-type(1)').css({
		"transform": "translateY(-100px)",
		"transition-delay": "0s",
		"-webkit-transform": "translateY(-100px)",
		"-webkit-transition-delay": "0s"
	});
	$('.m-text-4 span:nth-of-type(2)').css({
		"transform": "translateY(100px)",
		"transition-delay": "0.3s",
		"-webkit-transform": "translateY(100px)",
		"-webkit-transition-delay": "0.3s"
	});
	$('.m-text-4 span:nth-of-type(3)').css({
		"transform": "translateY(100px)",
		"transition-delay": "0.5s",
		"-webkit-transform": "translateY(100px)",
		"-webkit-transition-delay": "0.5s"
	});

	$('.m-text-5 span:nth-of-type(1)').css({
		"transform": "translateY(100px)",
		"transition-delay": "0s",
		"-webkit-transform": "translateY(100px)",
		"-webkit-transition-delay": "0s",
		"opacity": "0"
	});
	$('.m-text-5 span:nth-of-type(2)').css({
		"transform": "translateY(-100px)",
		"transition-delay": "0.3s",
		"-webkit-transform": "translateY(-100px)",
		"-webkit-transition-delay": "0.3s",
		"opacity": "0"
	});
	$('.m-text-5 span:nth-of-type(3)').css({
		"transform": "translateY(-100px)",
		"transition-delay": "0.5s",
		"-webkit-transform": "translateY(-100px)",
		"-webkit-transition-delay": "0.5s",
		"opacity": "0"
	});

	$('.iron-box').removeClass("ironboxframes");
	$('.iron-box i').css({
		"transform": "scale(1)",
		"transform": "scale(1)"
	});
	$('.c-border-1').css({
		"transform": "scale(0.5)",
		"transform": "scale(0.5)"
	});
	$('.g-btn').css({
		"transform": "translateY(100px)",
		"-webkit-transform": "translateY(100px)",
		"opacity": "0",
		"display": "block"
	});
	$('.video-box').css({
		"display": "none"
	});
	$('.video-box .video').css({
		"display": "block"
	});
	$('.mobile-box').removeClass("fadeOut fadeIn");
	$('.mobile-box').css({
		"display": "none"
	});
	$('.createBtn').css({
		"display": "block"
	});
	$('.twoBtn').css({
		"display": "none"
	});
	$('.poster').removeClass("fadeOut fadeIn");
	$('.twoBtn').removeClass("fadeOut fadeIn");
	$('.g-btn').removeClass("fadeOut fadeIn");

	$('#canvas').css({
		"opacity": 0,
		"z-index": 1
	});
	$('.hezi').css("opacity", 1);

	$('.hezi').removeClass('shake');

	isTouch = true;

	document.querySelector('.video').currentTime  =  0;

	page_one();
});

var oShareBtn = document.querySelector('.share-btn');
var oShareContainer = document.querySelector('.share');

oShareBtn.addEventListener('click', function() {

	MtaH5.clickStat("gionee_user_click_share");

	fadeIn(oShareContainer);
}, false);

oShareContainer.addEventListener('click', function() {
	fadeOut(oShareContainer);
}, false);