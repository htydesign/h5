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

/**
 * 判断是否是PC端
 */
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

/***
 * 淡入
 */
function fadeIn(obj) {

	obj.style.display = "block";

	obj.classList.remove("fadeOut", "fadeIn");

	setTimeout(function() {

		obj.classList.add("fadeIn");

	}, 100);

}

/***
 * 淡出
 */
function fadeOut(obj) {

	obj.classList.add("fadeOut");

	setTimeout(function() {

		obj.style.display = "none";

		obj.classList.remove("fadeOut", "fadeIn");

	}, 400);

}

/***
 * loading加载
 */

setLoading("images/big-images/", fileList, 1000, loadingFadeOut);

function loadingFadeOut() {

	var oLoading = document.querySelector('.loading');

	fadeOut(oLoading);

	var oBody = document.querySelector('body');

	oBody.style.overflow = "auto";

}

function setLoading(path, dataList, t, call, arr) { //路径,加载的图片数据，加载完成后等待隐藏的时间，回调函数,往指定数组添加图片资源

	if(arr) {
		arr.length = 0;
	}

	var startTime = new Date().getTime();
	var endTime = 0;
	var dis = 0;
	var time = 0;
	var nT = t;

	var loader = new PxLoader();

	for(var i = 0; i < dataList.length; i++) {

		if(arr) {

			arr.push(loader.addImage(path + dataList[i]));

		} else {

			loader.addImage(path + dataList[i]);

		}

	}

	loader.addProgressListener(function(e) {

		var percent = Math.round((e.completedCount / e.totalCount) * 100);

	});

	loader.addCompletionListener(function(e) {

		endTime = new Date().getTime();

		dis = endTime - startTime;

		startMain(nT);

	});

	if(dataList.length > 0) {

		loader.start();

	} else {

		startMain(nT);

	}

	function startMain(t) {

		setTimeout(function() {

			call();

		}, t);

		onClickClassify();

	}

}

/***
 * 更改浮动导航，出现滚动条
 */
$(window).scroll(function() {

	var original_left = $(".header").offset().left;

	var new_left = -$(window).scrollLeft() + "px";

	$(".fixedHeader").css({

		left: new_left

	});

});

/***
 * 鼠标移至微信图标显示微信二维码
 */
var timer_wx = null;

$('.share-wx').on('mousemove', function() {

	$('.wx-popup').fadeIn();

	clearInterval(timer_wx);

});

$('.share-wx').on('mouseleave', function() {

	timer_wx = setInterval(function() {

		$('.wx-popup').fadeOut();

		clearInterval(timer_wx);

	}, 500);

});

$('.wx-popup').on('mousemove', function() {

	clearInterval(timer_wx);

	$('.wx-popup').show();

});

$('.wx-popup').on('mouseleave', function() {

	timer_wx = setInterval(function() {

		$('.wx-popup').fadeOut();

		clearInterval(timer_wx);

	}, 500);

});

/***
 * 锚点跳转
 */
$(".nav-primary li a").click(function() {

	var href = $(this).attr("href");

	var pos = $(href).offset().top;

	$("html,body").animate({

		scrollTop: pos

	}, 1000);

	return false;

});

$(".nav-dot li a").click(function() {

	var href = $(this).attr("href");

	var pos = $(href).offset().top;

	$("html,body").animate({

		scrollTop: pos

	}, 1000);
	console.log(pos);
	return false;

});

$(".sidebar-nav li a").click(function() {

	var href = $(this).attr("href");

	var oHeaderHeight = $('.header').height();

	var pos = $(href).offset().top - oHeaderHeight;

	$("html,body").animate({

		scrollTop: pos

	}, 1000);

	$('.sidebar-nav').css('right', '-50%');

	return false;

});

/***
 * 手机端 点击菜单按钮，弹出侧边栏
 */

$('.open-sidebar-btn span').on('click', function() {

	if($('.sidebar-nav').css('right') === '0px') {

		$('.sidebar-nav').css('right', '-50%');

	} else {

		$('.sidebar-nav').css('right', '0px');

	}

});

/***
 * 监听页面滚动条对于顶部导航的点
 */
var nTop = 0;

nTop = document.documentElement.scrollTop || document.body.scrollTop;

var window_height = $(window).height();

var details_height = 0; //默认详情容器的高度0

var aHomeTop = 0;
var aAboutTop = 1333;
var aCaseTop = 2500;
var aClientTop = 3852 + details_height;
var aJobsTop = 5252 + details_height;
var aContactTop = 5765 + details_height;

var header_height = $(".header").height();
var home_height = $("#home").height();
var about_height = $(".m-about").height();
var bg_height_1 = $(".bgImg").height();
var case_height = $("#case").height();
var client_height = $("#client").height();
var bg_height_2 = $(".bgImg").height();
var jobs_height = $("#jobs").height();
var bg_height_3 = $(".bgImg").height();
var contact_height = $("#contact").height();
var footer_height = $(".m-footer").height();
var window_height = $("body").height();

window.addEventListener("resize", function() {

}, false);

window.addEventListener('scroll', function() {

	if(IsPC()) {

		header_height = $(".header").height();
		home_height = $("#home").height();
		about_height = $(".m-about").height();
		bg_height_1 = $(".bgImg").height();
		case_height = $("#case").height();
		client_height = $("#client").height();
		bg_height_2 = $(".bgImg").height();
		jobs_height = $("#jobs").height();
		bg_height_3 = $(".bgImg").height();
		contact_height = $("#contact").height();
		footer_height = $(".m-footer").height();
		window_height = $("body").height();

		aAboutTop = home_height;
		aCaseTop = aAboutTop + about_height + bg_height_1;
		aClientTop = aCaseTop + case_height + details_height;
		aJobsTop = aClientTop + client_height + bg_height_2 + details_height;
		aContactTop = window_height - $(window).height() + details_height;

		nTop = document.documentElement.scrollTop || document.body.scrollTop;

		if(nTop > 0) {

			$('.nav-primary').hide();

			$('.nav-dot').show();

		} else {

			$('.nav-primary').show();

			$('.nav-dot').hide();

		}

		if(0 <= nTop && nTop < aAboutTop) {

			$('.nav-dot li').eq(0).addClass('active').siblings().removeClass('active');

		} else if(aAboutTop <= nTop && nTop < aCaseTop) {

			$('.nav-dot li').eq(1).addClass('active').siblings().removeClass('active');

		} else if(aCaseTop <= nTop && nTop < aClientTop) {

			$('.nav-dot li').eq(2).addClass('active').siblings().removeClass('active');

		} else if(aClientTop <= nTop && nTop < aJobsTop) {

			$('.nav-dot li').eq(3).addClass('active').siblings().removeClass('active');

		} else if(aJobsTop <= nTop && nTop < aContactTop) {

			$('.nav-dot li').eq(4).addClass('active').siblings().removeClass('active');

		} else if(aContactTop <= nTop) {

			$('.nav-dot li').eq(5).addClass('active').siblings().removeClass('active');

		}

	}

}, false);

/***
 * 重置部分锚点对应的滚动距离 and 显示对应的详情内容 and close 
 */

(function() {

	var s_top = 0;

	var oD_container = document.querySelector('.d-container');
	var m_work_details_container = document.querySelector('.m-work-details-container');
	var oD_loading = document.querySelector('.d-loading');
	var oTitle = document.querySelector('.d-title h2');
	var oPrev = document.querySelector('.d-title .prev');
	var oNext = document.querySelector('.d-title .next');
	var oWorkDetailsBox = document.querySelector('.m-work-details-box');
	var aCase = document.querySelectorAll('.m-work-container ul li');
	var n = 0;
	var nHeight = 50;
	var g = 0; //加载哪个列表

	for(var t = 0; t < aCase.length; t++) {

		aCase[t].index = t;

		aCase[t].addEventListener('click', function() {

			n = this.index;

			g = n;

			oD_container.innerHTML = "";

			oWorkDetailsBox.style.height = details_height + "px";

			showContainer(n);

			s_top = $('#case').offset().top;

			if(IsPC()) {

				aClientTop = 4940 + details_height;
				aJobsTop = 6420 + details_height;
				aContactTop = 13300 + details_height;

			} else {
				s_top = s_top - $('.header').height();
			}

			$("html,body").animate({

				scrollTop: s_top

			}, 500);

		}, false);

	}

	function showContainer(n) {

		oPrev.classList.remove("active");
		oNext.classList.remove("active");

		$(".d-title").css("height", "auto");
		$(".d-close").css("height", "30px");

		if(IsPC()) {

			$(".d-container").css("padding", "50px 0");

		} else {

			$(".d-container").css("padding", "1.5rem 0");

		}

		m_work_details_container.style.display = "none";

		oD_loading.style.height = "50px";
		oD_loading.style.opacity = 1;

		var oPath = dataHtmlData[n]._path + "images/";

		setLoading(oPath, dataHtmlData[n]._imgs, 1000, setDetaileCall, dataHtmlData[n]._image); //加载的图片数据，加载完成后等待隐藏的时间，回调函数

		function setDetaileCall() {

			m_work_details_container.style.display = "block";

			$(".m-work-details-box").css("height", "auto");

			createHtml();

			oD_loading.style.height = "0px";
			oD_loading.style.opacity = 0;

			setTimeout(function() {

				details_height = m_work_details_container.offsetHeight;

				if(IsPC()) {
					nHeight = details_height + 50;
				} else {
					nHeight = details_height + 10;
				}

				m_work_details_container.classList.add("active");

				setTimeout(function() {

					oPrev.classList.add("active");
					oNext.classList.add("active");

					if(n == 0) {
						oPrev.classList.remove("active");
					} else if(n == aCase.length - 1) {
						oNext.classList.remove("active");
					}

				}, 300);

			}, 750);

		}

		function createHtml() {

			oD_container.innerHTML = "";

			oTitle.innerHTML = dataHtmlData[n]._title;

			var title_width = oTitle.offsetWidth;

			var box_width = document.querySelector('.d-title').offsetWidth;
			
			if(IsPC()){
				oPrev.style.left = box_width / 2 - title_width / 2 - 50 + 'px';
				oNext.style.right = box_width / 2 - title_width / 2 - 50 + 'px';
			}else{
				oPrev.style.left = box_width / 2 - title_width / 2 - 40 + 'px';
				oNext.style.right = box_width / 2 - title_width / 2 - 40 + 'px';
			}
			

			//添加视频
			if(dataHtmlData[n]._video.length > 0) {

				for(var i = 0; i < dataHtmlData[n]._video.length; i++) {

					var oSpan = document.createElement("span");

					var oVideo = document.createElement("video");

					var oI = document.createElement("i");
					oI.innerHTML = "返回";
					oI.classList.add("close");

					var oB = document.createElement("b");

					oVideo.src = dataHtmlData[n]._path + "video/" + dataHtmlData[n]._video[i];

					if(IsPC()) {
						oVideo.controls = "controls";

						if(!dataHtmlData[n]._isLandscape) {
							oVideo.style.width = "auto";
							oVideo.style.height = "720px";
							oVideo.style.margin = "auto";
							oSpan.style.background = "#000000";
							oSpan.style.padding = "0px";
						}
					}

					oVideo.preload = "auto";
					oVideo.setAttribute("webkit-playsinline", "true");
					oVideo.setAttribute("x-webkit-airplay", "true");
					oVideo.setAttribute("playsinline", "true");
					oVideo.setAttribute("x5-video-player-type", "h5");
					oVideo.setAttribute("x5-video-player-fullscreen", "true");

					oSpan.appendChild(oI);
					oSpan.appendChild(oB);
					oSpan.appendChild(oVideo);

					oD_container.appendChild(oSpan);
				}

			}

			//添加文案
			if(dataHtmlData[n]._text !== "") {

				var oSpan = document.createElement("span");
				var oP = document.createElement("p");

				oP.innerHTML = dataHtmlData[n]._text;

				oSpan.appendChild(oP);

				oD_container.appendChild(oSpan);

			}

			//添加图片
			if(dataHtmlData[n]._image.length > 0) {

				for(var i = 0; i < dataHtmlData[n]._image.length; i++) {

					var oSpan = document.createElement("span");

					var oImg = document.createElement("img");

					oImg.src = dataHtmlData[n]._image[i].src;

					if(dataHtmlData[n]._image[i].naturalWidth <= 640) {

						if(IsPC()) {
							oSpan.style.width = $('.d-container').width() / 3 + "px";
							oSpan.style.display = "inline-block";
						}

					}

					oSpan.appendChild(oImg);

					oD_container.appendChild(oSpan);

				}

			}

			clickPlayVideo();
		}

	}

	//点击关闭详情内容
	$('.d-close a').on('click', function() {

		details_height = 0;
		nHeight = 50;

		m_work_details_container.classList.remove("active");

		$("html,body").animate({

			scrollTop: s_top

		}, 500, function() {

			oD_container.innerHTML = "";

		});

		$(".d-title").css("height", "0px");

		if(IsPC()) {

			aClientTop = 4940 + details_height;
			aJobsTop = 6420 + details_height;
			aContactTop = 13300 + details_height;

			$(".d-container").css("padding", "0px");
			$(".d-close").css("height", "0px");

		} else {

			$(".d-container").css("padding", "0px");
			$(".d-close").css("height", "0px");

		}

	});

	//点击视频播放

	function clickPlayVideo() {

		var a_Video = document.querySelectorAll('.d-container video');
		var a_close = document.querySelectorAll('.d-container .close');
		var a_VideoIcon = document.querySelectorAll('.d-container b');
		var a_VideoBottom = document.querySelectorAll('.d-container h6');

		var nm = 0;
		var v_w = 0;
		var v_h = 0;

		if(a_Video.length > 0) {

			for(var i = 0; i < a_VideoIcon.length; i++) {

				a_VideoIcon[i].index = i;

				a_VideoIcon[i].addEventListener('click', function() {

					nm = this.index;

					v_w = a_Video[nm].offsetWidth;
					v_h = a_Video[nm].offsetHeight;

					for(var j = 0; j < a_Video.length; j++) {

						if(j === nm) {

							a_Video[nm].play();

							a_VideoIcon[nm].style.display = "none";

							if(!IsPC()) {

								if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

									a_close[nm].style.display = 'block';

								}

							}

						} else {

							a_Video[j].pause();

							a_VideoIcon[j].style.display = "block";

						}
					}

					setPlay(nm);

				}, false);

			}

			for(var i = 0; i < a_Video.length; i++) {

				a_Video[i].index = i;

				a_Video[i].addEventListener('click', function() {

					nm = this.index;

					v_w = a_Video[nm].offsetWidth;
					v_h = a_Video[nm].offsetHeight;

					for(var j = 0; j < a_Video.length; j++) {

						if(j === nm) {

							a_VideoIcon[nm].style.display = "none";

							if(IsPC()) {

								if(a_Video[nm].paused) {

									a_Video[nm].play();

								} else {

									a_Video[nm].pause();

									a_VideoIcon[nm].style.display = "block";

								}

							} else {

								a_Video[nm].play();

								if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

									a_close[nm].style.display = 'block';

								}

							}

						} else {

							a_Video[j].pause();

							a_VideoIcon[j].style.display = "block";

						}

					}

					setPlay(nm);

				}, false);

			}

			function setPlay(nm) {

				if(IsPC()) {

					a_Video[nm].addEventListener("ended", function() {

						a_VideoIcon[nm].style.display = "block";

					}, false);

				} else {

					a_Video[nm].style.position = "fixed";

					a_Video[nm].style.zIndex = 4000;

					a_Video[nm].style.transition = "all 0.35s";
					a_Video[nm].style.webkitTransition = "all 0.35s";

					if(!dataHtmlData[g]._isLandscape) {

						a_Video[nm].style.width = window.innerWidth + "px";
						a_Video[nm].style.top = "0%";
						a_Video[nm].style.left = "0%";

					} else {

						a_Video[nm].style.width = window.innerHeight + "px";
						a_Video[nm].style.height = window.innerWidth + "px";
						a_Video[nm].style.top = "50%";
						a_Video[nm].style.left = "50%";
						a_Video[nm].style.transform = "translate3d(-50%,-50%,0px) rotate(90deg)";
						a_Video[nm].style.webkitTransform = "translate3d(-50%,-50%,0px) rotate(90deg)";

					}

					a_Video[nm].addEventListener("x5videoexitfullscreen", function() {

						a_Video[nm].pause();

						res();

					}, false);

					function res() {

						a_Video[nm].style.position = "static";

						if(!dataHtmlData[g]._isLandscape) {

							a_Video[nm].style.width = "100%";

						} else {

							a_Video[nm].style.width = v_w + "px";
							a_Video[nm].style.height = v_h + "px";

						}

						a_Video[nm].style.transform = "translate3d(0%,0%,0px) rotate(0deg)";
						a_Video[nm].style.webkitTransform = "translate3d(0%,0%,0px) rotate(0deg)";

						a_VideoIcon[nm].style.display = "block";

					}

					a_Video[nm].addEventListener("ended", function() {

						res();

					}, false);

					a_close[nm].addEventListener("click", function() {

						res();

						a_Video[nm].pause();

						a_close[nm].style.display = 'none';

						a_VideoIcon[nm].style.display = "block";

					}, false);

				}

			}

		}

	}

	oPrev.addEventListener('click', function() {

		if(n <= 0) {

			n = 0;

		} else {

			n--;

			showContainer(n);

		}

		g = n;

		$(".m-work-details-box").css("height", details_height + "px");

	}, false);

	oNext.addEventListener('click', function() {

		if(n >= aCase.length) {

			n = aCase.length;

		} else {

			n++;

			showContainer(n);

		}

		g = n;

		$(".m-work-details-box").css("height", details_height + "px");

	}, false);

})();

/***
 * 点击列表分类
 */

function onClickClassify() {

	var aWorkClass = document.querySelectorAll('.m-work-class ul li');

	var aWorkContainerList = document.querySelectorAll('.m-work-container ul li');
	var oWorkContainer = document.querySelector('.m-work-container ul');

	for(var i = 0; i < aWorkClass.length; i++) {

		aWorkClass[i].index = i;

		aWorkClass[i].addEventListener('click', function() {

			var m = this.index;

			for(var j = 0; j < aWorkClass.length; j++) {

				if(j === m) {
					aWorkClass[j].classList.add('active');
				} else {
					aWorkClass[j].classList.remove('active');
				}

			}

			switch(m) {
				case 0:
					for(var k = 0; k < aWorkContainerList.length; k++) {

						if(IsPC()) {
							aWorkContainerList[k].style.width = "33.3333%";
						} else {
							aWorkContainerList[k].style.width = "100%";
						}

						aWorkContainerList[k].style.transform = "scale(1)";
						aWorkContainerList[k].style.opacity = 1;
					}
					break;
				case 1:
					classShowAndHade("social-marketing");
					break;
				case 2:
					classShowAndHade("motion-graphics");
					break;
				case 3:
					classShowAndHade("tvc");
					break;
				case 4:
					classShowAndHade("digital-display");
					break;
				case 5:
					classShowAndHade("h5");
					break;
			}

		}, false);

	}

	function classShowAndHade(aClass) {

		for(var k = 0; k < aWorkContainerList.length; k++) {

			if(aWorkContainerList[k].classList.contains(aClass)) {

				if(IsPC()) {
					aWorkContainerList[k].style.width = "33.3333%";
				} else {
					aWorkContainerList[k].style.width = "100%";
				}

				aWorkContainerList[k].style.transform = "scale(1)";
				aWorkContainerList[k].style.opacity = 1;

			} else {

				aWorkContainerList[k].style.transform = "scale(0)";
				aWorkContainerList[k].style.width = 0 + "px";
				aWorkContainerList[k].style.opacity = 0;

			}

		}

	}

}

/***
 * 设置banner高度 ,顶部的大图
 */
function resizeBanner() {

	var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

	if(IsPC()) {
		$('#wrapper').css("height", windowHeight - 82 + 'px');
	} else {
		$('#wrapper img').show();
	}

	$('.banner-box').css("height", '100%');

}
resizeBanner();

window.onresize = function() {

	resizeBanner();

	if(IsPC()) {

		setBackgroundPositionY('.bg1');
		//setBackgroundPositionY('.bg2');
		//setBackgroundPositionY('.bg3');

	}

}

/***
 * 设置PC端滚动背景
 */
function setBackgroundPositionY(obj) {

	var scroll_Top = document.documentElement.scrollTop || document.body.scrollTop;
	var windowHeight = $(window).height();
	var divHeight = $('.bgImg').height();
	var minTop = $(obj).offset().top - windowHeight;
	var maxTop = $(obj).offset().top + divHeight;
	var num = 0;
	var positionTop = 0;

	num = scroll_Top - minTop;

	positionTop = divHeight - num * divHeight / windowHeight;

	if(scroll_Top < maxTop && scroll_Top > minTop) {

		$(obj).css('background-position-y', positionTop + 'px');

	}

}

if(IsPC()) {

	setBackgroundPositionY('.bg1');
	//setBackgroundPositionY('.bg2');
	//setBackgroundPositionY('.bg3');

}
window.onscroll = function() {

	if(IsPC()) {

		setBackgroundPositionY('.bg1');
		//setBackgroundPositionY('.bg2');
		//setBackgroundPositionY('.bg3');

	}

} 