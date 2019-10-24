//是否是官方链接打开
var isOfficial = false;

//是否第二次打开
var isOpenAgain = true;

//用户的分数
var userScore=100;


var startTime = new Date().getTime();
var endTime = 0;
var dis = 0;

var paizhao_music = document.getElementById("music_photo");

//选择器
function $A(obj) {
	return document.querySelector(obj);
}

//判断是移动端还是PC端
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

//兼容移动端触摸事件与PC端点击事件 
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

var oContainer = $A('.container');

if(IsPC()) {
	oContainer.className = 'container pc';
}

var loader = new PxLoader();

var FileList = [
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
	"images/img-26.png"
];

for(var i = 0; i < FileList.length; i++) {
	loader.addData(FileList[i]);
}

loader.addProgressListener(function(e) {

	var percent = Math.round((e.completedCount / e.totalCount) * 100); 

	$A('.load p').innerHTML = `已加载 ${percent}%`;

	console.log(percent + "  " + e.resource.getName()); 

});

var time = 0;

loader.addCompletionListener(function(e)  {     

	endTime = new Date().getTime();

	dis = endTime - startTime;

	if(dis < 2000) {
		time = 2000 - dis;
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

		setTimeout(function() {

			$A('.load').style.display = 'none';

			$A('.home span:nth-child(2)').className = 'fadeUp';

		}, 400);

	}, t);

}

//兼容尺寸
var windowSize = {
	width: window.innerHeight,
	height: window.innerWidth,
	initSize: function() {
		if(IsPC()) {
			this.width = 1138;
			this.height = 640;
		}
	}
}

windowSize.initSize();

window.addEventListener('resize', function() {

	if(!IsPC()) {

		$A('.container').style.width = window.innerHeight + 'px';

		$A('.container').style.height = window.innerWidth + 'px';

	}

}, false);

$A('.container').style.width = windowSize.width + 'px';
$A('.container').style.height = windowSize.height + 'px';

//设置画布宽高
var canvas = document.getElementById("stage");
canvas.width = windowSize.width;
canvas.height = windowSize.height;

var ctx = canvas.getContext('2d');

function init() {

	$A('.home span:nth-child(2)').addEventListener(touchEvents.touchstart, function(e) {

		e.preventDefault();

		paizhao_music.play();

		paizhao_music.pause();

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

		if(isOpenAgain){
			
			$A('.result-ct span:nth-of-type(2) img').src = 'images/img-41.png';
			$A('.result-ct span:nth-of-type(2) img').style.marginLeft = '210px';
			
			$A('.result').style.display = 'block';

			$A('.result-bg').className = 'result-background result-bg fadeIn';

			setTimeout(function() {

				$A('.result-ct').className = 'result-container result-ct translateDown';

				$A('.user-look').style.opacity=1;
				
				$A('.user-look h2:nth-of-type(1) i').innerHTML=userScore;
				
				setFadeIn();

			}, 500);
			
		}else{
			
			$A('.introduce').style.display = 'block';

			setTimeout(function() {
	
				$A('.home').style.display = 'none';
	
				$A('.introduce-container').className = 'introduce-container translateDown';
	
				setTimeout(function() {
	
					$A('.u-info-one').className = 'u-info-one translateFadeIn';
	
				}, 500);
	
			}, 500);
	
			clickNext();
		
		}

	} else {

		if(isOpenAgain){
			
			$A('.result-ct span:nth-of-type(2) img').src = 'images/img-41.png';
			$A('.result-ct span:nth-of-type(2) img').style.marginLeft = '210px';
			
			$A('.result').style.display = 'block';

			$A('.result-bg').className = 'result-background result-bg fadeIn';

			setTimeout(function() {

				$A('.result-ct').className = 'result-container result-ct translateDown';

				$A('.friends-look').style.opacity=1;
				
				$A('.friends-look h2:nth-of-type(1) i').innerHTML=userScore;
				
				setFadeIn();

			}, 500);			
			
		}else{
			
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

			setTimeout(function() {

				$A('.u-info-two').className = 'u-info-two translateFadeIn';

			}, 500);

		} else if(nClick = 1) {

			nClick = 2;

			$A('.block').style.opacity = 1;

			$A('.u-info-two').className = 'u-info-two translateFadeIn translateLeftFadeOut';

			setTimeout(function() {

				$A('.introduce').className = 'introduce fadeOut';

				setTimeout(function() {

					$A('.introduce').style.display = 'none';

					isStart = true;

					setContDown();

				}, 500);

			}, 150)
		}
	}, false);
}

var aA = document.querySelectorAll('.result-container span:nth-child(3) a');

aA[0].addEventListener(touchEvents.touchstart, function(e) {
	
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

aA[1].addEventListener(touchEvents.touchstart, function(e) {
	
	e.preventDefault();

	$A('.share').style.display = 'block';
	$A('.share').style.zIndex = 999;
	$A('.share').className = 'share fadeIn';

}, false);

$A('.share').addEventListener(touchEvents.touchstart, function() {

	$A('.share').className = 'share fadeOut';

	setTimeout(function() {

		$A('.share').style.display = 'none';
		$A('.share').style.zIndex = 1;

	}, 500);

}, false);

$A('.go-block').addEventListener(touchEvents.touchstart, function() {

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