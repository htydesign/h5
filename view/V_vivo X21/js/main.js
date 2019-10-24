/***
 * 阻止浏览器默认事件
 */
window.addEventListener('touchmove', function(e) {

	e.preventDefault();

}, false);


/***
 * 判断浏览器
 */
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

(function() {

	var fileList = [
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-01.jpg",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-02.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-03-1.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-03-2.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-03-3.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-04.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-06.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-07.jpg",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-08.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-09-1.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-09-2.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-09-3.png",
		"https://static.vivo.com.cn/hd/vivox21lh/images/img-09-4.png"
	];

	var timer_wifi = null;
	var timer_text = null;
	var n = 0,
		m = 0;
	var loading_wifi_img = document.querySelector(".loading-wifi img");
	var loading_text_img = document.querySelector(".loading-text i img");
	
	var loading_wifi = document.querySelector(".loading-wifi");
	var loading_text = document.querySelector(".loading-text");
	
	var loading_container = document.querySelector(".loading-container");
	var loading_header = document.querySelector(".loading-head");
	var loading_click = document.querySelector(".loading-click");
	var loading_hint = document.querySelector(".loading-hint");
	
	var oVideo = document.querySelector(".video");
	var oVideoBottom = document.querySelector(".video-btn");
	var oVideoBottomImg = document.querySelector(".video-btn i");
	var oVideoContainer = document.querySelector(".video-container");
	var oBtn = document.querySelector(".end-container .btn");
	
	var light_1=document.querySelector(".loading-light img:nth-of-type(1)");
	var light_2=document.querySelector(".loading-light img:nth-of-type(2)");
	
	var startTime = new Date().getTime();
	var endTime = 0;
	var dis = 0;
	var time = 0;
	var nT = 3000;
	
	
	var oHref=window.location.href;
	var reg = RegExp(/tx.gd|tx.ppyw/);

	
	if(reg.test(oHref)){
		oBtn.classList.add("on");
	}
	
	var loader = new PxLoader();

	for(var i = 0; i < fileList.length; i++) {

		loader.addImage(fileList[i]);

	}

	loader.addProgressListener(function(e) {

		var percent = Math.round((e.completedCount / e.totalCount) * 100);

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
		//startMain(500);

	});

	loader.start();

	function startMain(t) {

		setTimeout(function() {
			
			var isPlayEnd=false;
			
			loading_header.classList.add("active");
			loading_hint.classList.add("active");

			oVideoBottom.style.display = "block";
			
			fadeIn(loading_click);
			
			clearInterval(timer_text);
			//clearInterval(timer_wifi);
			
			//fadeOut(loading_wifi);
			fadeOut(loading_text);

			oVideoBottom.addEventListener("click", function() {
				
				MtaH5.clickStat("vivox21_alink");
		
				oVideo.play();
								
				clearInterval(timer_wifi);
				
				oVideoBottom.style.display = "none";
				
				fadeOut(loading_container);
				
					
			}, false);
		
			
		
			oVideo.addEventListener("ended", function() {
				
				isPlayEnd=true;
				
				fadeOut(oVideoContainer);
				
				oVideoBottom.style.display = "none";
				oVideoBottomImg.style.display = "none";
		
				oBtn.style.opacity = "1";
				oBtn.style.transform = "translateY(0px)";
				oBtn.style.webkitTransform = "translateY(0px)";
				
				setTimeout(function(){
					oVideoContainer.removeChild(oVideo);
				},500);
		
			}, false);

		}, t);
	}
	
	
	var hiddenProperty = 'hidden' in document ? 'hidden' : 'webkitHidden' in document ? 'webkitHidden' : 'mozHidden' in document ? 'mozHidden' : null;
	var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
	var onVisibilityChange = function() {
		if(!document[hiddenProperty]) {
			//console.log('页面非激活');
			oVideo.play();
		} else {
			//console.log('页面激活')
			oVideo.pause();
		}
	}
	document.addEventListener(visibilityChangeEvent, onVisibilityChange);
	
	timer_wifi = setInterval(function() {

		if(n >= 4) {

			n = 1;

		} else {

			n++;

		}

		loading_wifi_img.src = "https://static.vivo.com.cn/hd/vivox21lh/images/img-09-" + n + ".png";

	}, 400);

	timer_text = setInterval(function() {

		if(m >= 3) {

			m = 1;

		} else {

			m++;

		}

		loading_text_img.src = "https://static.vivo.com.cn/hd/vivox21lh/images/img-03-" + m + ".png";

	}, 500);

})();




var oAgain=document.querySelector(".again");
var oLiaojie=document.querySelector(".liaojie");

oAgain.href=window.location.href;



oAgain.addEventListener("click",function(){
	MtaH5.clickStat("vivox21_again");
},false);


oLiaojie.addEventListener("click",function(){
	MtaH5.clickStat("vivox21_play");
},false);



















