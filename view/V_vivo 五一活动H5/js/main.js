//是否参与过活动
var isJoin = true;

//是否中奖
var isWin = false;

//服务器返回用户的中奖信息 0->红包,1->vivo移动电源,2->vivo手机
var nn = 2;

//如果返回0

//选择器
function $A(obj) {
	return document.querySelector(obj);
}

function $All(obj) {
	return document.querySelectorAll(obj);
}

var oGameFastMusic = $A('#game_fast'); //游戏页（快节奏）音乐
var oHomeMusic = $A('#home_music'); //首页背景音乐

oHomeMusic.play();

var isHintEnd = false;
var isRun = false; //默认 不不运动
var isCountDown = false; //倒计时 默认没有结束
var isSlide = false; //默认按钮不能左右滑动
var isgameCountDown = false; //默认是否 开始游戏倒计时
var isPlayAgain = false; //默认是否再次玩游戏
var isGoHome = false; //是否返回首页
var redPacketNumber = 50; //设置红包个数
var speed = []; //存放每个红包的速度
var rainSpeed = []; //存放雨的速度
var rainstartX = []; //存放雨的开始位置
var startX, moveX;
var num = 0; //当前红包个数
var title = 8; //需要接到的红包个数
var dragButton = {
	width: 140,
	height: 203
};
var redPacket = {
	width: 52,
	height: 74
};
var n = 0;
var k = 0;
var j = 0;
var aTime = [{
		name: 3,
		images: "images/img-17.png",
		width: 100,
		height: 148
	},
	{
		name: 2,
		images: "images/img-18.png",
		width: 100,
		height: 148
	},
	{
		name: 1,
		images: "images/img-19.png",
		width: 90,
		height: 143
	},
	{
		name: "开始",
		images: "images/img-20.png",
		width: 147,
		height: 78
	}
];

var aRain = ["images/1.png", "images/2.png", "images/3.png", "images/4.png"];

var aTxt = ["X9手机与您擦肩而过~再抢一次！<br>（五一来vivo，更多大奖等您拿！）", "一阵大风把X9手机刮走了~再抢一次！<br>（五一来vivo，更多大奖等您拿！）", "小手一抖，X9溜走~再抢一次！<br>（五一来vivo，更多大奖等您拿！）", "差了一丢丢，X9在招手~再抢一次！<br>（五一来vivo，更多大奖等您拿！）"];

var redPacketTxt = ["红包在手，运气我有！", "X9在向你招手！", "考验运气的时候到了！", "注入念力！呼唤X9！", "见证奇迹的时刻到了！"];

var aImg = ["url(images/x9.png)", "url(images/y67.png)", "url(images/xplay6.png)"];

var startTime = new Date().getTime();
var endTime = 0;
var dis = 0;
var loadingTimer = null;

var aClassName = ['one', 'two', 'three'];
var a1 = 0,
	a2 = 1,
	a3 = 2;
var aLoadingLi = $All('.loading-container ul li');

loadingTimer = setInterval(function() {

	if(a1 >= 2) {
		a1 = 0;
	} else {
		a1++;
	}

	if(a2 >= 2) {
		a2 = 0;
	} else {
		a2++;
	}

	if(a3 >= 2) {
		a3 = 0;
	} else {
		a3++;
	}

	$A('.loading-container span').style.background = aImg[a1];
	aLoadingLi[0].className = aClassName[a1];
	aLoadingLi[1].className = aClassName[a2];
	aLoadingLi[2].className = aClassName[a3];

}, 700);

$A('body').addEventListener('touchstart', function(e) {
	e.preventDefault();
}, false);
$A('.win-container-detail').addEventListener('touchstart', function(e) {
	e.stopPropagation();
}, false);

//加载音效
function sendInit() {
	var assetsPath = "music/";
	var sounds = [{
			src: "receive-redPacket.mp3",
			id: 1
		}, //接红包
		{
			src: "buttom.mp3",
			id: 2
		}, //按钮点击
		{
			src: "game-loser.mp3",
			id: 3
		}, //游戏失败
		{
			src: "game-succeed.mp3",
			id: 4
		}, //游戏成功
		{
			src: "no-win.mp3",
			id: 5
		}, //没有中奖
		{
			src: "win.mp3",
			id: 6
		}, //中奖
		{
			src: "countdown.mp3",
			id: 7
		} //游戏开始倒计时
	];
	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this));
	createjs.Sound.registerSounds(sounds, assetsPath);
}

//音效加载完成
function soundLoaded(event) {
	console.log(event.src);
}

sendInit();

var instance;

//播放 某一首音效
function playSound(id) {
	instance = createjs.Sound.play(id);
	if(instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
		return;
	}
	instance.addEventListener("complete", function(instance) {
		//console.log('complete');
	});
}

var loader = new PxLoader();

//加载资源列表
var FileList = [
	"music/buttom.mp3",
	"music/game-fast.mp3",
	"music/game-loser.mp3",
	"music/game-succeed.mp3",
	"music/home.mp3",
	"music/no-win.mp3",
	"music/win.mp3",
	"music/countdown.mp3",
	"music/receive-redPacket.mp3",
	"images/loading-xplay6.png",
	"images/loading-x9.png",
	"images/loading-y67.png",
	"images/xplay6.png",
	"images/x9.png",
	"images/y67.png",
	"images/img-01.jpg",
	"images/img-02.png",
	"images/img-03.png",
	"images/img-05.png",
	"images/img-06.png",
	"images/img-07.png",
	"images/img-08.png",
	"images/img-09.png",
	"images/img-10.png",
	"images/img-11.png",
	"images/img-12.jpg",
	"images/img-13.png",
	"images/img-14.png",
	"images/img-15.png",
	"images/img-16.png",
	"images/img-17.png",
	"images/img-18.png",
	"images/img-19.png",
	"images/img-20.png",
	"images/img-21.jpg",
	"images/img-22.png",
	"images/img-24.png",
	"images/img-25.png",
	"images/img-26.png",
	"images/img-27.png",
	"images/img-28.png",
	"images/img-29.png",
	"images/img-30.png",
	"images/img-31.png",
	"images/1.png",
	"images/2.png",
	"images/3.png",
	"images/4.png",
	"images/img-36.png",
	"images/img-37.png",
	"images/img-40.png",
	"images/img-43.png",
	"images/img-50.png",
	"images/img-51.png",
	"images/img-52.png",
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
	"images/img-64.png"
];

for(var i = 0; i < FileList.length; i++) {
	loader.addData(FileList[i]);
}

//加载进度
loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100); 
	//$A('.loading p').innerHTML = `已加载...${percent}%`;
	console.log(percent + "  " + e.resource.getName()); 
});

var time = 0;

//加载完成
loader.addCompletionListener(function(e)  {     
	endTime = new Date().getTime();
	dis = endTime - startTime;
	//	if(dis < 4500) {
	//		time = 4500 - dis;
	//		startInit(time);	
	//	} else {
	//		startInit(time);
	//	}

	startInit(0);
}); 

//加载开始
loader.start();

//设置加载的时间
function startInit(t) {

	setTimeout(function() {
		$A('.loading').className = 'loading fadeOut';

		setTimeout(function() {
			clearInterval(loadingTimer);
			$A('.loading').style.display = 'none';
			$A('.two-open').style.display = 'block';

			$A('.img2 img').className = 'active';
			$A('.img14 img').className = 'translateDownIn3';
			$A('.img15 img').className = 'translateDownIn3';
			$A('.img3 img').className = 'translateDownIn3';
			$A('.img17 img').className = 'translateDownIn3';
			$A('.img5 img').className = 'translateDownIn3';
			$A('.img6 img').className = 'translateDownIn3';

			setTimeout(function() {
				$A('.play-container h1').className = 'translateDownIn2';
			}, 400);
			setTimeout(function() {
				$A('.two-open').className = 'two-open translateUpIn';
			}, 600);
		}, 500);
	}, t);
}

//点击活动锦囊按钮显示->活动锦囊弹窗
$A('.active-rule').addEventListener('touchstart', function() {
	$A('.rule-popup').style.display = 'block';
	$A('.rule-popup').className = 'rule-popup fadeIn';
	playSound(2);
}, false);

//关闭活动锦囊弹窗
$A('.rule-close').addEventListener('touchstart', function() {
	$A('.rule-popup').className = 'rule-popup fadeOut';
	playSound(2);
	setTimeout(function() {
		$A('.rule-popup').style.display = 'none';
	}, 500);
}, false);

//点击幸运榜单按钮显示->幸运榜单弹窗
$A('.luck-btn').addEventListener('touchstart', function() {
	$A('.win-popup').style.display = 'block';
	$A('.win-popup').className = 'win-popup fadeIn';
	playSound(2);

	//

	if(isJoin) {
		if(isWin) {
			if(nn == 0) {
				$A('.win-vivomoney').style.display = 'block';
			} else if(nn == 1) {
				$A('.win-vivopower').style.display = 'block';
			} else if(nn == 2) {
				$A('.win-vivophone').style.display = 'block';
			}
		} else {
			$A('.no-join').style.display = 'block';
		}
	} else {
		$A('.no-join').style.display = 'block';
	}

}, false);

//关闭幸运榜单弹窗
$A('.win-close').addEventListener('touchstart', function() {
	$A('.win-popup').className = 'win-popup fadeOut';
	playSound(2);
	setTimeout(function() {
		$A('.win-popup').style.display = 'none';
	}, 500);
}, false);

//点击马上抢红包按钮-》跳转到下一个页面，进入游戏
var aPlayBtn = $All('.playgame');

for(var i = 0; i < aPlayBtn.length; i++) {
	aPlayBtn[i].addEventListener('touchstart', function() {
		playSound(2);
		$A('.scene').style.display = 'block';
		$A('.scene').className = 'scene fadeIn';
		$A('.play').className = 'play fadeOut';
		setTimeout(function() {
			$A('.play').style.display = 'none';
			oHomeMusic.pause();
			isgameCountDown = true;
			gameCountDown();
			if(!isPlayAgain) {
				createHint();
			}

			//$A('.play-container').removeChild($A('#home'));
		}, 500);
	}, false)
}

//获取屏幕宽高
var windowWidht = 640;
var windowHeight = 1040;

var canvas = document.getElementById("scene");

//设置画布宽高
canvas.width = windowWidht;
canvas.height = windowHeight;

//创建舞台
var stage = new createjs.Stage("scene");
createjs.Touch.enable(stage);

//舞台背景
var bg = new createjs.Bitmap('images/img-21.jpg');
bg.x = 0;
bg.y = 0;
bg.scaleY = windowHeight / 1030;
stage.addChild(bg);

//雨容器
var rainContainer = new createjs.Container();
rainContainer.x = 0;
rainContainer.y = 0;
stage.addChild(rainContainer);

//滑块
var container = new createjs.Container();
container.x = 0;
container.y = 0;
stage.addChild(container);

//红包容器
var redPackContainer = new createjs.Container();
redPackContainer.x = 0;
redPackContainer.y = 0;
stage.addChild(redPackContainer);

//游戏倒计时容器
var countDownContainer = new createjs.Container();
countDownContainer.x = 0;
countDownContainer.y = 0;
stage.addChild(countDownContainer);

//箭头指示容器
var hintContainer = new createjs.Container();
hintContainer.x = 0;
hintContainer.y = 0;
stage.addChild(hintContainer);

//倒计时计数
var timer = null;

function startCountDown() {
	var s = 8;
	oGameFastMusic.play();
	timer = setInterval(function() {
		if(s <= 0) {
			s = 0;
			isCountDown = true;
			isRun = false;
			clearInterval(timer);
			if(num < title) {
				showResultUnFinish();
				isSlide = false;
			}
		} else {
			s -= 1;
		}
		$A('.count-down').innerHTML = s + 's';
	}, 1000);
}

//小V  按住对象滑动
var p = new createjs.Bitmap('images/img-11.png');
p.x = windowWidht / 2 - dragButton.width / 2;
p.y = windowHeight - 300;
container.addChild(p);

var o = new createjs.Bitmap('images/img-43.png');
o.x = windowWidht / 2 - dragButton.width / 2;
o.y = windowHeight - 300;
container.addChild(o);
o.alpha = 0;

p.on("mousedown", function(event) {
	startX = event.stageX - p.x;
});

p.on("pressmove", function(event) {
	moveX = event.stageX - startX;
	if(moveX >= 0 && moveX <= windowWidht - dragButton.width) {
		if(isSlide) {
			this.x = moveX;
			o.x = moveX;
		}
	}
});

//创建提示
var hand = new createjs.Bitmap('images/hand.png');
hand.x = windowWidht / 2 - dragButton.width / 2 + 50;
hand.y = windowHeight - 200;
hand.scaleX = hand.scaleY = 0.6;
container.addChild(hand);

function createHint() {
	if(!isHintEnd) {
		var tweenE = createjs.Tween.get(p, {
			loop: 0
		}).to({
			x: windowWidht / 2 - dragButton.width / 2 + 200,
		}, 400, createjs.Ease.linear).to({
			x: windowWidht / 2 - dragButton.width / 2 - 200,
		}, 800, createjs.Ease.linear).to({
			x: windowWidht / 2 - dragButton.width / 2 + 200,
		}, 800, createjs.Ease.linear).to({
			x: windowWidht / 2 - dragButton.width / 2 - 200,
		}, 800, createjs.Ease.linear).to({
			x: windowWidht / 2 - dragButton.width / 2,
		}, 400, createjs.Ease.linear);

		var tweenF = createjs.Tween.get(hand, {
			loop: 0
		}).to({
			x: windowWidht / 2 - dragButton.width / 2 + 200 + 50,
		}, 400, createjs.Ease.linear).to({
			x: windowWidht / 2 - dragButton.width / 2 - 200 + 50,
		}, 800, createjs.Ease.linear).to({
			x: windowWidht / 2 - dragButton.width / 2 + 200 + 50,
		}, 800, createjs.Ease.linear).to({
			x: windowWidht / 2 - dragButton.width / 2 - 200 + 50,
		}, 800, createjs.Ease.linear).to({
			alpha: 0,
			x: windowWidht / 2 - dragButton.width / 2 + 50,
		}, 400, createjs.Ease.linear).call(function() {
			//hand.alpha=0;
		});
	}

}

createRedPacket();

//刷新舞台
createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
	stage.update();
	run();
}

//创建红包
function createRedPacket() {
	for(var i = 0; i < redPacketNumber; i++) {
		var a = new createjs.Bitmap('images/img-27.png');
		a.x = parseInt(Math.random() * 550 + 30);
		a.y = -110 - i * 300;
		redPackContainer.addChild(a);

		var s = parseInt(Math.random() * 50 + 20);
		speed.push(s);
	}
}

createRain();

//创建雨
function createRain() {
	for(var i = 0; i < 50; i++) {

		var jj = parseInt(Math.random() * aRain.length);

		var a = new createjs.Bitmap(aRain[jj]);
		a.x = parseInt(Math.random() * 550 + 30);
		a.y = -110 - i * 300;
		rainContainer.addChild(a);
		rainstartX.push(a.y);
		var s = parseInt(Math.random() * 50 + 20);
		rainSpeed.push(s);
	}
}
var tt = 0;
//红包雨
function run() {
	if(!isCountDown && isRun) {
		for(var i = 0; i < redPackContainer.children.length; i++) {
			if(redPackContainer.children[i].y > windowHeight) {
				redPackContainer.removeChild(redPackContainer.children[i]);
				speed.splice(i, 1);
			} else {
				redPackContainer.children[i].y += speed[i];
			}
			if(redPackContainer.children[i].y > p.y && redPackContainer.children[i].y < p.y + dragButton.height / 3 && redPackContainer.children[i].x < p.x + dragButton.width - redPacket.width && redPackContainer.children[i].x > p.x) {
				num++;
				$A('.score').innerHTML = 'x' + num;
				o.alpha = 1;
				p.alpha = 0;
				setTimeout(function() {
					p.alpha = 1;
					o.alpha = 0;
				}, 300);
				if(num == title) {
					isRun = false;
					clearInterval(timer);
					showResultFinish();
				}
				speed.splice(i, 1);
				playSound(1);
				redPackContainer.removeChild(redPackContainer.children[i]);
			}
		}

	}
	for(var i = 0; i < rainContainer.children.length; i++) {
		if(rainContainer.children[i].y >= windowHeight) {
			rainContainer.children[i].y = rainstartX[i];
			rainContainer.children[i].alpha = 1;
			tt = 0;
			//rainContainer.removeChild(rainContainer.children[i]);
			//rainSpeed.splice(i, 1);rainstartX
		} else {
			rainContainer.children[i].y += rainSpeed[i];
		}
	}
}

//游戏倒计时
function gameCountDown() {
	setdaojishi();
}

function setdaojishi() {
	countDownContainer.removeAllChildren();

	if(isHintEnd) {
		var tweenA = createjs.Tween.get(p, {
			loop: 0
		}).to({
			x: windowWidht / 2 - dragButton.width / 2,
		}, 300, createjs.Ease.linear);
		
		var tweenB = createjs.Tween.get(o, {
			loop: 0
		}).to({
			x: windowWidht / 2 - dragButton.width / 2,
		}, 300, createjs.Ease.linear);
	}

	if(n < 4) {

		if(isgameCountDown) {

			var q = new createjs.Bitmap(aTime[n].images);
			q.scaleX = q.scaleY = 8;
			q.x = windowWidht / 2 - aTime[n].width / 2 * 8;
			q.y = windowHeight / 2 - aTime[n].height / 2 * 8;
			q.alpha = 0;
			countDownContainer.addChild(q);
			isgameCountDown = false;
		}
		playSound(7);
		var tweenB = createjs.Tween.get(q, {
			loop: 0
		}).to({
			alpha: 1,
			scaleX: 1,
			scaleY: 1,
			x: windowWidht / 2 - aTime[n].width / 2,
			y: windowHeight / 2 - aTime[n].height
		}, 300, createjs.Ease.linear).call(function() {
			setTimeout(function() {
				isgameCountDown = true;
				gameCountDown();
				isHas = false;
			}, 1000);
		});

		n++;
	} else {
		isHintEnd = true;
		setTimeout(function() {
			isRun = true;
			isSlide = true;
			startCountDown();

			if(isPlayAgain) {
				resetScene();
				isPlayAgain = false;
			}

		}, 1000);
	}
}

//显示完成结果页
var isOpen = false;

function showResultFinish() {

	clearInterval(timer);
	k = 0;
	oGameFastMusic.pause();
	playSound(4);
	setTimeout(function() {

		$A('.result').style.display = 'block';
		$A('.result').className = 'result fadeIn';
		$A('.finish').style.display = 'block';

		var r = parseInt(Math.random() * redPacketTxt.length);

		$A('.redpack-txt').innerHTML = redPacketTxt[r];

		setTimeout(function() {
			$A('.finish').className = 'finish redPacketSacle';
			$A('.finish span:nth-of-type(1)').addEventListener('touchstart', function() {
				if(k < 1) {
					$A('.finish span:nth-of-type(1)').style.display = 'none';
					playSound(2);
					$A('.setframes').style.animationPlayState = 'running';

					setTimeout(function() { //等待服务器响应,返回结果
						isOpen = true;
						if(isOpen) {
							$A('.setframes').style.animationPlayState = 'paused';
							setResult();
						}
					}, 3000);

					k = 1;
				}
			}, false);
		}, 500);
	}, 500);
}

//显示 未 完成结果页

function showResultUnFinish() {
	j = 0;

	setTimeout(function() {
		playSound(3);
		oGameFastMusic.pause();
		$A('.result').style.display = 'block';
		$A('.result').className = 'result fadeIn';
		$A('.unfinished').style.display = 'block';
		setTimeout(function() {
			$A('.unfinished').className = 'unfinished translateDownIn';
			$A('.unfinished-again').addEventListener('touchstart', function() {
				if(j < 1) {
					isPlayAgain = true;
					playSound(2);
					//n = 0;
					j = 1;
					playAgain();
				}
			}, false);
		}, 500);
	}, 500);
}

//再来一次
function playAgain() {
	$A('.score').innerHTML = 'x' + 0;
	$A('.count-down').innerHTML = 8 + 's';
	redPackContainer.removeAllChildren();

	$A('.result').className = 'result fadeOut';

	setTimeout(function() {

		setdaojishi();
		$A('.result').style.display = 'none';
		$A('.result').className = 'result';
		$A('.finish').style.display = 'none';
		$A('.finish').className = 'finish';
		$A('.unfinished').style.display = 'none';
		$A('.unfinished').className = 'unfinished';

	}, 500);

}

//中奖结果
function setResult() {

	redPackContainer.removeAllChildren();

	$A('.result').className = 'result fadeOut';

	$A('.openRedPacket').style.display = 'block';
	$A('.openRedPacket').className = 'openRedPacket fadeIn';

	setTimeout(function() {

		$A('.result').style.display = 'none';
		$A('.result').className = 'result';

		$A('.finish').style.display = 'none';
		$A('.finish').className = 'finish';

		if(isWin) {
			//没有中奖，鼓励文案
			showNoWin();
			finishPlayAgain();
			isSlide = false;
		} else {

			var mm = parseInt(Math.random() * 4);

			//mm =1;

			if(mm == 0) {
				//没有中奖，鼓励文案
				showNoWin();
				finishPlayAgain();
				isSlide = false;
			} else if(mm == 1) {
				//现金红包
				showMoney();
			} else if(mm == 2) {
				//实物奖品--手机
				showPrizePhone();
				showSubSucceed();
			} else if(mm == 3) {
				//实物奖品--电源
				showPrizePower();
				showSubSucceed();
			}
		}
	}, 500);
}

//没有中奖，鼓励文案
function showNoWin() {
	playSound(5);
	var t = parseInt(Math.random() * aTxt.length);
	$A('.encourage-container p').innerHTML = aTxt[t];
	$A('.encourage').style.display = 'block';
	$A('.encourage').className = 'encourage fadeIn';
}

//现金红包
function showMoney() {
	playSound(6);
	$A('.money').style.display = 'block';
	$A('.money').className = 'money fadeIn';

	setTimeout(function() {
		$A('.money-box span:nth-of-type(1)').className = 'translateY';
		$A('.money-box span:nth-of-type(2)').className = 'translateY';
		$A('.money-info').className = 'money-info redPacketSacle';
		$A('.money-btn').className = 'money-btn translateY';
	}, 300);
}

//实物奖品-->手机
function showPrizePhone() {
	playSound(6);
	$A('.prize').style.display = 'block';
	$A('.prize').className = 'prize fadeIn';
	$A('.prize-title .win-vivophone').className = 'win-vivophone active';
	$A('.prize-container p i').innerHTML = 'vivo X9 手机';
}
//实物奖品-->电源
function showPrizePower() {
	playSound(6);
	$A('.prize').style.display = 'block';
	$A('.prize').className = 'prize fadeIn';
	$A('.prize-title .win-vivopower').className = 'win-vivopower active';
	$A('.prize-container p i').innerHTML = 'vivo 移动电源';
}
//完成任务后再玩一次
var l = 0;

function finishPlayAgain() {
	l = 0;
	$A('.encourage-container .again').addEventListener('touchstart', function() {
		if(l < 1) {
			isPlayAgain = true;
			playSound(2);
			setPlayAgain();
			l = 1;
			//n = 0;
		}
	}, false);
}

function setPlayAgain() {

	$A('.openRedPacket').className = 'openRedPacket fadeOut';
	$A('.count-down').innerHTML = 8 + 's';
	$A('.score').innerHTML = 'x' + 0;
	redPackContainer.removeAllChildren();

	setTimeout(function() {

		setdaojishi();

		$A('.openRedPacket').style.display = 'none';
		$A('.openRedPacket').className = 'openRedPacket';

		$A('.encourage').style.display = 'none';
		$A('.encourage').className = 'encourage';

		$A('.money').style.display = 'none';
		$A('.money').className = 'money';

	}, 500);
}

//重置画布内容
function resetScene() {
	$A('.finish span:nth-of-type(1)').style.display = 'block';
	oGameFastMusic.play();
	num = 0;
	speed.length = 0;
	//startCountDown();
	createRedPacket();
	isCountDown = false;
	isRun = true;
	isSlide = true;
}

//实物奖品 信息填写提交成功
function showSubSucceed() {
	$A('.prize-container .sub-btn').addEventListener('touchstart', function() {
		playSound(2);
		var phone = $A('.t_tel').value;
		var name = $A('.t_name').value;
		var add = $A('.t_add').value;

		if((/^1(3|4|5|7|8)\d{9}$/.test(phone))) {

			if((/^[a-z\u4e00-\u9fa5]+$/i.test(name))) {

				if((/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(add))) {
					$A('.prize-sub-succeed').style.display = 'block';
					$A('.prize-sub-succeed').className = 'prize-sub-succeed largen';

					$A('.prize-container').className = 'prize-container diminish';
					setTimeout(function() {
						$A('.prize-sub-succeed b').style.display = 'none';
						$A('.prize-container').style.display = 'none';
					}, 1000);

				} else {
					alert("您的输入有误,请重新输入!");
					$A('.t_add').value = '';
					return false;
				}
			} else {
				alert("您的输入有误,请重新输入!");
				$A('.t_name').value = '';
				return false;
			}
		} else {
			alert("您的输入有误,请重新输入!");
			$A('.t_tel').value = '';
			return false;
		}

		//		if((/^1(3|4|5|7|8)\d{9}$/.test(phone)) && (/^[a-z\u4e00-\u9fa5]+$/i.test(name)) && (/^[A-Za-z0-9\u4e00-\u9fa5]+$/.test(add))) {
		//			$A('.prize-sub-succeed').style.display = 'block';
		//			$A('.prize-sub-succeed').className = 'prize-sub-succeed largen';
		//
		//			$A('.prize-container').className = 'prize-container diminish';
		//			setTimeout(function() {
		//				$A('.prize-sub-succeed b').style.display = 'none';
		//				$A('.prize-container').style.display = 'none';
		//			}, 1000);
		//		} else {
		//			alert("您的输入有误,请重新输入!");
		//			return false;
		//		}

	}, false);
}

$A('.prize-container form').addEventListener('touchstart', function(e) {
	e.stopPropagation();
}, false);
$A('.prize-sub-succeed a').addEventListener('touchstart', function(e) {
	//e.stopPropagation();
	e.preventDefault();
	//window.location.href = 'index.html';
	isGoHome = true;
	resetElement();

}, false);

$A('.money-btn a').addEventListener('touchstart', function(e) {
	//e.stopPropagation();
	e.preventDefault();
	//window.location.href = 'index.html';
	isGoHome = true;
	resetElement();
}, false);

function resetElement() {

	oHomeMusic.play();

	setHome();
	
	$A('.scene').style.display = 'none';
	$A('.scene').className = 'scene';

	$A('.openRedPacket').style.display = 'none';
	$A('.openRedPacket').className = 'openRedPacket';

	$A('.money').style.display = 'none';
	$A('.money').className = 'money';

	$A('.prize').style.display = 'none';
	$A('.prize').className = 'prize';

	$A('.prize-container').className = 'prize-container';

	$A('.prize-sub-succeed').style.display = 'none';
	$A('.prize-sub-succeed').className = 'prize-sub-succeed';

	$A('.money-box').className = 'money-box';

	$A('.money-info').className = 'money-info';

	$A('.money-btn').className = 'money-btn';

	$A('.finish span:nth-of-type(1)').style.display = 'block';

	$A('.count-down').innerHTML = 8 + 's';
	$A('.score').innerHTML = 'x' + 0;

	isRun = false; //默认 不不运动
	isCountDown = false; //倒计时 默认没有结束
	isSlide = false; //默认按钮不能左右滑动
	isgameCountDown = false; //默认是否 开始游戏倒计时
	isPlayAgain = true; //默认是否再次玩游戏
	isGoHome = false; //是否返回首页
	//n = 0;
	redPackContainer.removeAllChildren();
}

function setHome(){
	$A('.play').style.display = 'block';
	$A('.play').className = 'play fadeIn';
	
	$A('.img2 img').className='';
	$A('.img14 img').className='';
	$A('.img15 img').className='';
	$A('.img3 img').className='';
	$A('.img17 img').className='';
	$A('.img5 img').className='';
	$A('.img6 img').className='';
	$A('.play-container h1').className='';
	$A('.two-open').className = 'two-open';
	
	$A('.img2 img').style.opacity=1;
	$A('.img14 img').style.opacity=1;
	$A('.img15 img').style.opacity=1;
	$A('.img3 img').style.opacity=1;
	$A('.img17 img').style.opacity=1;
	$A('.img5 img').style.opacity=1;
	$A('.img6 img').style.opacity=1;
	$A('.play-container h1').style.opacity=1;
	$A('.two-open').style.opacity=1;

	
	
	$A('.img2 img').style.transform='translate3d(0, 0, 0)';
	$A('.img2 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.img14 img').style.transform='translate3d(0, 0, 0)';
	$A('.img14 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.img15 img').style.transform='translate3d(0, 0, 0)';
	$A('.img15 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.img14 img').style.transform='translate3d(0, 0, 0)';
	$A('.img14 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.img3 img').style.transform='translate3d(0, 0, 0)';
	$A('.img3 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.img17 img').style.transform='translate3d(0, 0, 0)';
	$A('.img17 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.img5 img').style.transform='translate3d(0, 0, 0)';
	$A('.img5 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.img6 img').style.transform='translate3d(0, 0, 0)';
	$A('.img6 img').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.play-container h1').style.transform='translate3d(0, 0, 0)';
	$A('.play-container h1').style.WebkitTransform='translate3d(0, 0, 0)';
	
	$A('.two-open').style.transform='translate3d(0, 0, 0)';
	$A('.two-open').style.WebkitTransform='translate3d(0, 0, 0)';

	
}
