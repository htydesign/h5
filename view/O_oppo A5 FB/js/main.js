//是否是官方链接打开
var isOfficial = true;

//是否第二次打开
var isOpenAgain = true;

//用户的分数
var userScore = 0;

//朋友查看的分数
var friendScore = 10;

//当前用户的名字
var userName = 'daiv';

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

var isStart = false; //默认暂停运动
var isPause = false; //默认不暂停
var isPhotograph = false; //默认不可以拍照
var isSingle = true; //默认是单个动物
var isContDown = false; //默认倒计时没有结束

var num = 0; //分数
var storageAninmal = []; //存储在一群动物下，拍照的时候拍到的动物
var runOver = false; //动物是否跑完一圈
var isOpenWideAngle = false; //是否打开广角
var isGuidanceCourse = true; //默认进入引导教程页
var isTry = true; //默认是试玩
var isTryGame = true; //默认是试玩教程
var next = 0;
var random = parseInt(Math.random() * 1000);
random = 100;
var k = 0;

var isShowAll = false;
var isClickNext = false; //是否可以点击下一次
var istryOpenWideAngle = false; //是否打开广角
var startTime = new Date().getTime();
var endTime = 0;
var dis = 0;
var tryM = 0;
var paizhao_music = document.getElementById("music_photo");
var bg_music = document.getElementById("music_background");



function $A(obj) {
	return document.querySelector(obj);
}
function $All(obj) {
	return document.querySelectorAll(obj);
}

var oStorage = window.sessionStorage;

if(oStorage.getItem('A1') == 1) {      
	isOfficial = true;
} else 
	if(oStorage.getItem('A1') == 2) {     
		isOfficial = false;
	}

if(oStorage.getItem('A2') == 1) {      
	isOpenAgain = true;
} else if(oStorage.getItem('A2') == 2) {     
	isOpenAgain = false;
}

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
var isOnffo = false;
$A('#music_icon').addEventListener(touchEvents.touchstart, function(e) {
	e.preventDefault();
	if(isOnffo) {
		bg_music.play();
		$A('#music_icon').style.backgroundImage = 'url(images/music-on.png)';
	} else {
		bg_music.pause();
		$A('#music_icon').style.backgroundImage = 'url(images/music-off.png)';
	}
	isOnffo = !isOnffo;
}, false);

var oContainer = $A('.container');

if(IsPC()) {
	oContainer.className = 'container pc';
} else {
	oContainer.className = 'container rotate';
}

//判断手机横竖屏状态：
function hengshuping() {
	if(window.orientation == 180 || window.orientation == 0) {
		//document.title = `竖屏状态!`;		
		$A('.hsp').style.display = 'none';
	}
	if(window.orientation == 90 || window.orientation == -90) {
		//document.title = `横屏状态!`;				
		$A('.hsp').style.display = 'block';
	}
}
window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", hengshuping, false);

var loader = new PxLoader();

var FileList;

if(isOfficial) {
	if(isOpenAgain) {
		FileList = [
			"music/bg.mp3",
			"images/loading.jpg",
			"images/img-01.jpg",
			"images/img-02.png",
			"images/img-18.jpg",
			"images/img-19.png",
			"images/img-21.png",
			"images/img-23.png",
			"images/img-26.png",
			"images/img-28.png",
			"images/img-29.png",
			"images/img-31.png",
			"images/img-32.png",
			"images/img-34.png",
			"images/img-35.png",
			"images/img-36.png",
			"images/img-42.png",
			"images/img-43.png"
		]
	} else {
		FileList = [
			"music/bg.mp3",
			"images/loading.jpg",
			"images/animate/banma.png",
			"images/animate/changjinglu.png",
			"images/animate/daishu.png",
			"images/animate/hema.png",
			"images/animate/laohu.png",
			"images/animate/liebao.png",
			"images/animate/shizi.png",
			"images/animate/wugui.png",
			"images/img-01.jpg",
			"images/img-02.png",
			"images/img-03.jpg",
			"images/img-04.png",
			"images/img-05.png",
			"images/img-06.png",
			"images/img-07.png",
			"images/img-08.png",
			"images/img-09.png",
			"images/img-10.png",
			"images/img-11.png",
			"images/img-12.png",
			"images/img-13.png",
			"images/img-14.png",
			"images/img-15.png",
			"images/img-16.png",
			"images/img-17.jpg",
			"images/img-18.jpg",
			"images/img-19.png",
			"images/img-20.png",
			"images/img-21.png",
			"images/img-22.png",
			"images/img-23.png",
			"images/img-24.png",
			"images/img-25.png",
			"images/img-26.png",
			"images/img-27.png",
			"images/img-28.png",
			"images/img-29.png",
			"images/img-31.png",
			"images/img-32.png",
			"images/img-33.png",
			"images/img-34.png",
			"images/img-35.png",
			"images/img-36.png",
			"images/img-37.png",
			"images/img-38.png",
			"images/img-39.png",
			"images/img-40.png",
			"images/img-41.png",
			"images/img-42.png",
			"images/img-43.png",
			"images/img-45.png",
			"images/img-46.png",
			"images/img-47.png",
			"images/img-48.png",
			"images/img-49.png",
			"images/img-50.png",
			"images/img-51.png",
			"images/img-52.png",
			"images/img-53.png",
			"images/img-54.png",
			"images/img-55.png",
			"images/img-56.png",
			"images/img-57.png",
			"images/img-58.png",
			"images/img-59.png",
			"images/img-60.png",
			"images/img-61.png",
			"images/img-62.png",
			"images/img-63.png",
			"images/img-64.png",
			"images/img-65.png",
			"images/img-66.png",
			"images/img-67.png",
			"images/img-68.png",
			"images/img-69.png",
			"images/img-70.png",
			"images/img-71.png",
			"images/img-72.png",
			"images/img-73.png",
			"images/3-3.png",
			"images/1-1.png",
			"images/2-2.png",
			"images/2.png",
			"images/3.png",
			"images/4.png",
			"images/5.png",
			"images/6.png",
			"images/50.png"
		];
	}
} else {
	if(isOpenAgain) {
		FileList = [
			"music/bg.mp3",
			"images/loading.jpg",
			"images/img-01.jpg",
			"images/img-02.png",
			"images/img-18.jpg",
			"images/img-19.png",
			"images/img-21.png",
			"images/img-23.png",
			"images/img-26.png",
			"images/img-28.png",
			"images/img-29.png",
			"images/img-31.png",
			"images/img-32.png",
			"images/img-33.png",
			"images/img-34.png",
			"images/img-35.png",
			"images/img-36.png",
			"images/img-42.png",
			"images/img-43.png"
		]
	} else {
		FileList = [
			"music/bg.mp3",
			"images/loading.jpg",
			"images/animate/banma.png",
			"images/animate/changjinglu.png",
			"images/animate/daishu.png",
			"images/animate/hema.png",
			"images/animate/laohu.png",
			"images/animate/liebao.png",
			"images/animate/shizi.png",
			"images/animate/wugui.png",
			"images/img-01.jpg",
			"images/img-02.png",
			"images/img-03.jpg",
			"images/img-04.png",
			"images/img-05.png",
			"images/img-06.png",
			"images/img-07.png",
			"images/img-08.png",
			"images/img-09.png",
			"images/img-10.png",
			"images/img-11.png",
			"images/img-12.png",
			"images/img-13.png",
			"images/img-14.png",
			"images/img-15.png",
			"images/img-16.png",
			"images/img-17.jpg",
			"images/img-18.jpg",
			"images/img-19.png",
			"images/img-20.png",
			"images/img-21.png",
			"images/img-22.png",
			"images/img-23.png",
			"images/img-24.png",
			"images/img-25.png",
			"images/img-26.png",
			"images/img-27.png",
			"images/img-28.png",
			"images/img-29.png",
			"images/img-31.png",
			"images/img-32.png",
			"images/img-33.png",
			"images/img-34.png",
			"images/img-35.png",
			"images/img-36.png",
			"images/img-37.png",
			"images/img-38.png",
			"images/img-39.png",
			"images/img-40.png",
			"images/img-41.png",
			"images/img-42.png",
			"images/img-43.png",
			"images/img-45.png",
			"images/img-46.png",
			"images/img-47.png",
			"images/img-48.png",
			"images/img-49.png",
			"images/img-50.png",
			"images/img-51.png",
			"images/img-52.png",
			"images/img-53.png",
			"images/img-54.png",
			"images/img-55.png",
			"images/img-56.png",
			"images/img-57.png",
			"images/img-58.png",
			"images/img-59.png",
			"images/img-60.png",
			"images/img-61.png",
			"images/img-62.png",
			"images/img-63.png",
			"images/img-64.png",
			"images/img-65.png",
			"images/img-66.png",
			"images/img-67.png",
			"images/img-68.png",
			"images/img-69.png",
			"images/img-70.png",
			"images/img-71.png",
			"images/img-72.png",
			"images/img-73.png",
			"images/img-74.png",
			"images/img-75.png",
			"images/img-76.png",
			"images/3-3.png",
			"images/1-1.png",
			"images/2-2.png",
			"images/2.png",
			"images/3.png",
			"images/4.png",
			"images/5.png",
			"images/6.png",
			"images/50.png"
		];
	}
}

for(var i = 0; i < FileList.length; i++) {
	loader.addData(FileList[i]);
}

loader.addProgressListener(function(e) {

	var percent = Math.round((e.completedCount / e.totalCount) * 100); 

	$A('.load p').innerHTML = `${percent}%`;

	console.log(percent + "  " + e.resource.getName()); 

});

var time = 0;
var nT = 3000;
loader.addCompletionListener(function(e)  {     

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

function start(t) {

	setTimeout(function() {

		$A('.load').className = 'load fadeOut';

		init();
		
		bg_music.src = "music/bg.mp3"; 
		bg_music.play();
		
		setTimeout(function() {

			$A('.load').style.display = 'none';

			$A('.home span:nth-child(2)').className = 'fadeUp';

		}, 400);

	}, t);

}

var windowSize = {
	width: window.innerHeight,
	height: window.innerWidth,
	initSize: function() {
		if(IsPC()) {
			this.width = 1138;
			this.height = 640;
		}
	},
	iosSetHeight:function(){
		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			this.width = 990;
			this.height = 640;
		}
	}
}

windowSize.initSize();
windowSize.iosSetHeight();

window.addEventListener('resize', function() {

	if(!IsPC()) {

		$A('.container').style.width = window.innerHeight + 'px';

		$A('.container').style.height = window.innerWidth + 'px';

	}

}, false);

$A('.container').style.width = windowSize.width + 'px';
$A('.container').style.height = windowSize.height + 'px';

if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	$A('.hsp p').innerHTML = 'Lock your screen';

} else {
	$A('.hsp p').innerHTML = 'Unlock your automatic rotation';

}


if(!IsPC()){
	$A('.u-info-two span:nth-child(2)').style.overflow='hidden';
	var oSlideImg=$A('.u-info-two span:nth-child(2) img');
	oSlideImg.style.position='absolute';
	oSlideImg.style.top='0';
	oSlideImg.style.left='0';
	
	$A('.simg').style.display='block';	

	var imgBar=$A('.simg b');
	var friendsBar=$A('.sfriends b');
	var worldBar=$A('.sworld b');
	
	var oC=270;//height:270px;
	var oLi=66;//height:50,margin:0 0 16px 0;
	
	var f_wrapper=$A('#friends_wrapper');
	var w_wrapper=$A('#world_wrapper');
	var fLi=$All('#friends_wrapper ul li');
	var wLi=$All('#world_wrapper ul li');
	
	$A('.friends-ranking').style.overflow='hidden';
	$A('.world-ranking').style.overflow='hidden';
	
	var af=fLi.length*oLi-oC;
	var aw=wLi.length*oLi-oC;
	
	if(fLi.length>4){
		$A('.sfriends').style.display='block';
		slideBlock(f_wrapper,af,friendsBar,220);
	}
	
	if(wLi.length>4){
		$A('.sworld').style.display='block';
		slideBlock(w_wrapper,aw,worldBar,220);
	}
	
	slideBlock(oSlideImg,992,imgBar,206);
}


function slideBlock(obj,h,c,h2){
	var startX=0;
	var moveX=0;
	var endX=0;
	var disX=0;
	
	var sx=0;
	
	obj.addEventListener('touchstart',function(e){
		startX=e.touches[0].clientX; 
		obj.addEventListener('touchmove',function(e){
			moveX=e.touches[0].clientX-startX+endX; 
			console.log(moveX)
			if(moveX>h){
				moveX=h;
			}else if(moveX<0){
				moveX=0
			}
			obj.style.transform = 'translate3d(0px,' + -moveX + 'px,0px)';
			obj.style.webkitTransform = 'translate3d(0px,' + -moveX + 'px,0px)';
			
			sx=h2*moveX/h;
			c.style.transform = 'translate3d(0px,' + sx + 'px,0px)';
			c.style.webkitTransform = 'translate3d(0px,' + sx + 'px,0px)';
			
		},false);
		obj.addEventListener('touchend',function(e){
			endX=moveX;
		},false);
	},false);
}

var canvas = document.getElementById("stage");
canvas.width = windowSize.width;
canvas.height = windowSize.height;

var ctx = canvas.getContext('2d');

function init() {

	$A('.home span:nth-child(2)').addEventListener(touchEvents.touchstart, function(e) {

		e.preventDefault();

		official();

	}, false);

	var aLi = document.querySelectorAll('.score-groove ul li');

	for(var i = 0; i < aLi.length; i++) {
		aLi[i].style.left = i * 103 - 40 + 'px';
	}
}

function official() {

	$A('.home').className = 'home fadeOut';

	if(isOfficial) {

		if(isOpenAgain) {

			$A('.result-ct span:nth-of-type(2) img').src = 'images/img-41.png';
			$A('.result-ct span:nth-of-type(2) img').style.marginLeft = '210px';

			$A('.result').style.display = 'block';

			$A('.result-bg').className = 'result-background result-bg fadeIn';

			setTimeout(function() {

				$A('.result-ct').className = 'result-container result-ct translateDown';

				$A('.user-look').style.opacity = 1;

				$A('.user-look .right-getscore h2:nth-of-type(1) i').innerHTML = userScore;

				$A('.u-name').innerHTML = userName + ': ';
				$A('.u-score').innerHTML = userScore;

				setFadeIn();

			}, 500);

		} else {

			$A('.introduce').style.display = 'block';

			setTimeout(function() {

				$A('.home').style.display = 'none';

				$A('.introduce-container').className = 'introduce-container translateDown';

				setTimeout(function() {

					$A('.u-info-one').className = 'u-info-one translateFadeIn';

				}, 500);

				setFadeIn();

			}, 500);

			clickNext();

		}

	} else {

		if(isOpenAgain) {

			$A('.result-ct span:nth-of-type(2) img').src = 'images/img-41.png';
			$A('.result-ct span:nth-of-type(2) img').style.marginLeft = '210px';

			$A('.result').style.display = 'block';

			$A('.result-bg').className = 'result-background result-bg fadeIn';

			setTimeout(function() {

				$A('.result-ct').className = 'result-container result-ct translateDown';

				$A('.friends-look').style.opacity = 1;

				$A('.friends-look .right-getscore h2:nth-of-type(1) i').innerHTML = friendScore;

				$A('.u-name').innerHTML = userName + ': ';
				$A('.u-score').innerHTML = friendScore;

				setFadeIn();

				//				$A('.playing').style.width = '386px';
				//				$A('.playing').style.marginLeft = '-205px';
				//				$A('.playing').style.display = 'block';
				//				$A('.playing').style.opacity = 1;
				//				$A('.playing img').src = 'images/img-33.png';
				//
				//				$A('.openOfficial').style.display = 'block';

			}, 500);

		} else {

			$A('.ranking-list').style.display = 'block';

			setTimeout(function() {

				$A('.home').style.display = 'none';

				$A('.result-container').className = 'result-container translateDown';

				setTimeout(function() {

					$A('.playing').style.display = 'block';

					$A('.ranking-box').className = 'ranking-box fadeIn2';

					setFadeIn();

				}, 500);

				setTimeout(function() {

					$A('.playing').className = 'playing fadeIn';

				}, 1000);

			}, 500);

			$A('.playing').addEventListener(touchEvents.touchstart, function(e) {

				e.preventDefault();

				$A('.introduce').style.display = 'block';

				$A('.ranking-list').className = 'ranking-list fadeOut';

				setTimeout(function() {

					$A('.ranking-list').style.display = 'none';

					$A('.introduce-container').className = 'introduce-container translateDown';

					setTimeout(function() {

						$A('.u-info-one').className = 'u-info-one translateFadeIn';

					}, 500);

				}, 500);

				clickNext();

			}, false);

		}

		$A('.aBtn').style.display = 'none';
		$A('.hy-one-btn').style.display = 'block';

	}
}

function clickNext() {

	var nClick = 0;

	$A('.u-block span:nth-child(7)').addEventListener(touchEvents.touchstart, function(e) {

		e.preventDefault();

		if(nClick == 0) {

			nClick = 1;

			$A('.u-info-two').style.display = 'block';
			$A('.u-info-one').className = 'u-info-one translateFadeIn translateLeftFadeOut';

			$A('.u-block span:nth-child(7) img').src = 'images/img-06.png';
			$A('.u-block span:nth-child(2) img').src = 'images/img-66.png';
			$A('.u-block span:nth-child(2) img').style.margin = 'auto';
			setTimeout(function() {

				$A('.u-info-two').className = 'u-info-two translateFadeIn';

			}, 500);

		} else if(nClick == 1) {

			nClick = 2;

			touchEvents = {
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

			$A('.block').style.opacity = 1;

			$A('.u-info-two').className = 'u-info-two translateFadeIn translateLeftFadeOut';

			setTimeout(function() {

				$A('.introduce').className = 'introduce fadeOut';

				setTimeout(function() {

					$A('.introduce').style.display = 'none';

					if(isOpenAgain) {
						isStart = true;
						isPhotograph = true;
						setContDown();
						cA();
					} else {
						startGuidance();
					}

				}, 500);

			}, 150)

		}

	}, false);
}

//开始引导
function startGuidance() {
	$A('.guidanceCourse').style.display = 'block';

	$A('.guidance-1').style.display = 'block';
	$A('.guidance-1').className = 'guidance-1 fadeIn';
}

var aOpenResult = $('.openResult');

for(var i = 0; i < aOpenResult.length; i++) {
	aOpenResult[i].addEventListener(touchEvents.touchstart, function(e) {

		e.preventDefault();

		$A('.go-block').style.display = 'block';

		$A('.ranking-list').style.display = 'block';
		$A('.ranking-list').style.zIndex = 9990;
		$A('.ranking-list').className = 'ranking-list fadeIn';

		$A('.playing').style.display = 'none';

		$A('.result-container').className = 'result-container';

		$A('.ranking-box').className = 'ranking-box';

		setTimeout(function() {

			$A('.result-container').className = 'result-container translateDown';

			setTimeout(function() {

				$A('.ranking-box').className = 'ranking-box fadeIn2';

			}, 500);

		}, 500);

	}, false);
}

var aOpenShare = $('.openShare');
for(var i = 0; i < aOpenShare.length; i++) {
	aOpenShare[i].addEventListener(touchEvents.touchstart, function(e) {

		e.preventDefault();

		$A('.share').style.display = 'block';
		$A('.share').style.zIndex = 999;
		$A('.share').className = 'share fadeIn';

	}, false);
}
$A('.share').addEventListener(touchEvents.touchstart, function() {

	$A('.share').className = 'share fadeOut';

	setTimeout(function() {

		$A('.share').style.display = 'none';
		$A('.share').style.zIndex = 1;

	}, 500);

}, false);

$A('.go-block').addEventListener(touchEvents.touchstart, function(e) {

	e.preventDefault();

	$A('.ranking-list').className = 'ranking-list fadeOut';

	setTimeout(function() {

		$A('.ranking-list').style.display = 'none';
		$A('.ranking-list').style.zIndex = 90;

		$A('.result-container').className = 'result-container';

		$A('.ranking-box').className = 'ranking-box';

	}, 400);

}, false);

function setFadeIn() {

	var aLi = document.querySelectorAll('.ranking-box ul li');

	for(let i = 0; i < aLi.length; i++) {

		aLi[i].style.transitionDelay = i * 0.35 + 's';

		aLi[i].className = 'translateLeftFadeIn';

	}

}

var t1 = 0;
var t2 = 0;
var t3 = 1;
var t4 = 0;
var l1 = 100;

setGuidanceCourse();

//引导页
function setGuidanceCourse() {
	if(isGuidanceCourse) {

		$A('.guidance-1').addEventListener(touchEvents.touchstart, function() {

			this.style.display = 'none';

			$A('.photograph .u-shade').style.display = 'block';
			$A('.guidance-2').style.display = 'block';

			$A('.guidance-2').className = 'guidance-2 fadeIn';

		}, false);

		$A('.guidance-2').addEventListener(touchEvents.touchstart, function() {
			$A('.photograph .u-shade').style.display = 'none';
			$A('.guidance-2').style.display = 'none';

			$A('.guidance-3').style.display = 'block';

			$A('.guidance-3').className = 'guidance-3 fadeIn';

		}, false);

		$A('.guidance-3').addEventListener(touchEvents.touchstart, function() {

			$A('.guidance-3').style.display = 'none';
			$A('.guidanceCourse').style.display = 'block';

			isPause = false;

			next = 1;
			$A('.guidance-4').style.display = 'block';
			$A('.guidance-4').className = 'guidance-4 fadeIn';
			$A('.u1').style.display = 'block';
			$A('.u2').style.display = 'none';

		}, false);

		$A('.guidance-4').addEventListener(touchEvents.touchstart, function() {

			$A('.guidance-4').style.display = 'none';
			$A('.guidanceCourse').style.display = 'none';
			$A('.u-zz').style.display = 'block';

			$A('.u-zz').className = 'u-zz fadeIn';

			$A('.photograph').style.zIndex = 150;

		}, false);

		$A('.try-btn').addEventListener(touchEvents.touchstart, function() {

			$A('.u-zz').style.display = 'none';
			$A('.u-zz').className = 'u-zz';

			tryPhotograph();

			$A('.guidanceCourse').style.display = 'block';

			if(next == 1) {
				$A('.guidance-5').style.display = 'block';
				$A('.guidance-5').className = 'guidance-5 fadeIn';
				$A('.n-one').style.display = 'block';
				$A('.n-two').style.display = 'none';
				$A('.n-three').style.display = 'none';
			} else if(next == 2) {
				$A('.guidance-5').style.display = 'block';
				$A('.guidance-5').className = 'guidance-5 fadeIn';
				$A('.n-one').style.display = 'none';
				$A('.n-two').style.display = 'block';
				$A('.n-three').style.display = 'none';
			} else if(next == 3) {
				$A('.guidance-5').style.display = 'block';
				$A('.guidance-5').className = 'guidance-5 fadeIn';
				$A('.n-one').style.display = 'none';
				$A('.n-two').style.display = 'none';
				$A('.n-three').style.display = 'block';
			} else {
				$A('.guidance-8').style.display = 'block';
				$A('.guidance-8').className = 'guidance-8 fadeIn';
			}

		}, false);

		$A('.guidance-5').addEventListener(touchEvents.touchstart, function() {
			$A('.guidanceCourse').style.display = 'none';
			$A('.guidance-5').style.display = 'none';
			$A('.guidance-5').className = 'guidance-5';

			if(next == 1) {
				next = 2;
				t3 = 0;
				$A('.u-zz').style.display = 'block';
				$A('.u-zz').className = 'u-zz fadeIn';
				//$A('.guidance-4').style.display = 'block';
				//$A('.guidance-4').className = 'guidance-4 fadeIn';
			} else if(next == 2) {
				next = 3;
				t3 = 0;
				$A('.guidanceCourse').style.display = 'block';
				$A('.guidance-4').style.display = 'block';
				$A('.guidance-4').className = 'guidance-4 fadeIn';
				$A('.u2').style.display = 'block';
				$A('.u1').style.display = 'none';
			} else if(next == 3) {
				next = 100;
				$A('.guidanceCourse').style.display = 'block';
				$A('.guidance-6').style.display = 'block';
				$A('.guidance-6').className = 'guidance-6 fadeIn';
			}
		}, false);

		$A('.guidance-6 .u-shade span i').addEventListener(touchEvents.touchstart, function() {

			$A('.guidanceCourse').style.display = 'none';
			$A('.guidance-6').style.display = 'none';
			$A('.guidance-6').className = 'guidance-6';

			next = 4;

			tryOpenWideAngle();

		}, false);

		$A('.guidance-8').addEventListener(touchEvents.touchstart, function() {
			tryAnimalMoreContainer.alpha = 0;
			$A('.guidance-8').style.display = 'none';
			$A('.guidance-8').className = 'guidance-8';
			$A('.guidance-7').style.display = 'block';
			$A('.guidance-7').className = 'guidance-7 fadeIn';
		}, false);

		$A('.start').addEventListener(touchEvents.touchstart, function() {
			$A('.guidanceCourse').style.display = 'none';
			$A('.score').innerHTML = "Score : " + 0;
			$A('.count-down').innerHTML = 30 + 's';
			random = 100;
			if(istryOpenWideAngle) {
				tryOpenWideAngle();
			}
			setTimeout(function() {
				isStart = true;
				isPhotograph = true;
				setContDown();
				k = 0;
				isTryGame = false;
				isSingle = true;
				isTry = false;

				animalContainer.alpha = 1;
			}, 1500);
			$A('.u-zz2').style.display = 'none';
		}, false);

		$A('.againTry').addEventListener(touchEvents.touchstart, function() {
			$A('.guidanceCourse').style.display = 'none';
			$A('.score').innerHTML = "Score : " + 0;
			$A('.count-down').innerHTML = 30 + 's';
			random = 100;
			if(istryOpenWideAngle) {
				tryOpenWideAngle();
			}
			setTimeout(function() {
				isStart = true;
				isPhotograph = true;
				setContDown();

				isTryGame = false;
				isSingle = true;

				animalContainer.alpha = 1;
				isTry = true;
				k = 0;
				a = parseInt(Math.random() * animal.length);
				selectAnimal = animal[a]; //用户选择的动物

				createAnimal(selectAnimal);

				curAmimal = animalContainer.children[0]; //当前跑动动物	
				curAmimalWidth = curAmimal.spriteSheet._frameWidth; //当前跑动动物的高
			}, 1500);
			$A('.u-zz2').style.display = 'none';
		}, false);
	}
}