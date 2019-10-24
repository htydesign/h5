window.addEventListener('touchstart', function(e) {
	e.preventDefault();
}, false);

var startTime = new Date().getTime();
var endTime = 0;
var dis = 0;

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

var oVideoBox = document.querySelector('.video-box');
var oBtn = document.querySelector(".user-click");
var oFilteBlur = document.querySelector(".filter-blur");
var video = document.getElementById("video");
var isPlay = true;
var nWidth = 640;
var nHeight = 1138;
var time = 0;
var nT = 3000;
var oLoading = document.querySelector(".loading");
video.width = nWidth;

var loader = new PxLoader();

var fileList = [
	"images/img-01.jpg",
	"images/img-02.jpg",
	"images/img-loading.png",
	"images/img-03.png"
];
for(var i = 0; i < fileList.length; i++) {
	loader.addData(fileList[i]);
}
var oLoadingTxt = document.querySelector(".loading span:nth-child(2)");

loader.addProgressListener(function(e) {
	var percent = Math.round((e.compvaredCount / e.totalCount) * 100); 
});

loader.addCompletionListener(function(e) {     
	endTime = new Date().getTime();
	dis = endTime - startTime;
	if(dis < nT) {
		time = nT - dis;
		start(time);
	} else {
		start(time);
	}
}); 

loader.start();
var canvas = document.createElement("canvas");

function start(t) {
	
	setTimeout(function() {
		document.querySelector(".s10-end span:nth-child(1) img").src = fileList[1];
		document.querySelector(".s10-end span:nth-child(2) img").src = fileList[3];
		oLoading.className = 'loading fadeOut';
		setTimeout(function() {
			oLoading.style.display = 'none';
		}, 600)

		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

			function audioAutoPlay() {
				$("#video")[0].play();
				document.addEventListener("WeixinJSBridgeReady", function() {
					$("#video")[0].play();
				}, false);
			}
			audioAutoPlay();

			oBtn.style.display = 'none';
			oFilteBlur.style.display = 'none';

			video.style.visibility = 'hidden';
			video.width = nWidth;
			video.height = nHeight;

			var ctx = canvas.getContext('2d');

			canvas.style.position = 'absolute';
			canvas.style.top = '-80px';
			canvas.style.left = '0px';

			canvas.width = nWidth;
			canvas.height = nHeight;

			oVideoBox.appendChild(canvas);

			playDrawImage();

			video.style.display = 'none';

			function playDrawImage() {
				requestAnimationFrame(playDrawImage);
				ctx.clearRect(0, 0, nWidth, nHeight);
				ctx.drawImage(video, 0, 0, nWidth, nHeight);
			}

		} else {
			$('.video-box span').css('top', '75px');
			video.style["object-position"] = "0px 0px";
		}
	},t);
}

oBtn.addEventListener('touchstart', function(e) {
	if(isPlay) {
		video.play();
		oBtn.style.display = 'none';
		oFilteBlur.style.display = 'none';
	} else {
		video.pause();
	}
	isPlay = !isPlay;
}, false);

var curTime = 0;
var k = 0,
	j = 0,
	l = 0;
video.addEventListener('play', function() {
	video.ontimeupdate = function() {
		curTime = video.currentTime.toFixed(2);
		console.log(curTime);
		if(curTime >= 13.60) {
			if(l < 1) {
				l++;
				$(".video-box span").fadeOut();
			}
		}
		if(curTime >= 14.00) {
			if(k < 1) {
				k++;
				canvas.style.top = '-40px';
			}
		}
		if(curTime >= 15.00) {
			oBtn.style.display = 'none';
			if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {

			} else {
				document.querySelector(".s10-end").style.display = 'block';
				oVideoBox.style.display = 'none';
				//oVideoBox.removeChild(video);
				$('.s10-end').show();
			}
		}
	}
}, false);
var isEnterFullScreen=false;
video.addEventListener("x5videoenterfullscreen", function() {
	//alert('进入全屏');
	isPlay = false;
	oBtn.style.display = 'none';
	
	isEnterFullScreen=true;
	if(window.innerHeight<1130){
		video.style["object-position"] = "0px -60px";
	}else{
		video.style["object-position"] = "0px 0px";
	}
}, false);
window.onresize = function() {
	if(isEnterFullScreen){		
		video.style.width = window.innerWidth + "px";
		video.style.height = 'auto';
	}else{
		video.style.width = '100%';
		video.style.height = 'auto';	
	}
}
video.addEventListener("x5videoexitfullscreen", function() {
	//alert('退出全屏');
	isPlay = true;
	oBtn.style.display = 'block';
	isEnterFullScreen=false;
}, false);

video.addEventListener('ended', function() {
	video.pause();
	isPlay = false;
	oBtn.style.display = 'none';

	if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
		//oVideoBox.className = 'video-box fadeOut';
	} else {
		oVideoBox.style.display = 'none';
		oVideoBox.removeChild(video);
	}
}, false);

