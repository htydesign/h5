
$A('body').addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

document.addEventListener('touchstart', function(e) {
	e.preventDefault();
}, false);

$A('.openOfficial').addEventListener('touchstart', function(e) {
	e.stopPropagation();
}, false);

var confine = windowSize.width - 100; //动物奔跑的边界
//动物属性
var animal = [{
		name: "斑马",
		images: "images/animate/banma.png", //图片URL
		width: 329, //单帧的宽
		height: 250, //单帧的高
		x: 0, //起始点X
		y: 480, //起始点Y
		speed: 0.5, //帧动画的速度
		move: 45, //移动的速度
		count: 5 //分数
	},
	{
		name: "长颈鹿",
		images: "images/animate/changjinglu.png",
		width: 200,
		height: 317,
		x: 0,
		y: 480,
		speed: 0.3,
		move: 35,
		count: 3
	},
	{
		name: "袋鼠",
		images: "images/animate/daishu.png",
		width: 249,
		height: 250,
		x: 0,
		y: 480,
		speed: 0.5,
		move: 35,
		count: 6
	},
	{
		name: "河马",
		images: "images/animate/hema.png",
		width: 248,
		height: 106,
		x: 0,
		y: 480,
		speed: 0.5,
		move: 35,
		count: 4
	},
	{
		name: "老虎",
		images: "images/animate/laohu.png",
		width: 228,
		height: 250,
		x: 0,
		y: 480,
		speed: 0.5,
		move: 42,
		count: -1
	},
	{
		name: "猎豹",
		images: "images/animate/liebao.png",
		width: 240,
		height: 102,
		x: 0,
		y: 480,
		speed: 0.5,
		move: 50,
		count: -3
	},
	{
		name: "狮子",
		images: "images/animate/shizi.png",
		width: 254,
		height: 250,
		x: 0,
		y: 480,
		speed: 0.5,
		move: 44,
		count: -2
	},
	{
		name: "乌龟",
		images: "images/animate/wugui.png",
		width: 200,
		height: 140,
		x: 0,
		y: 480,
		speed: 0.5,
		move: 34,
		count: 2
	}
];

var scoreIcon = [{
		name: 6,
		images: "images/6.png"
	},
	{
		name: 5,
		images: "images/5.png"
	},
	{
		name: 4,
		images: "images/4.png"
	},
	{
		name: 3,
		images: "images/3.png"
	},
	{
		name: 2,
		images: "images/2.png"
	},
	{
		name: -1,
		images: "images/1-1.png"
	},
	{
		name: -2,
		images: "images/2-2.png"
	},
	{
		name: -3,
		images: "images/3-3.png"
	},
	{
		name: 50,
		images: "images/50.png"
	}
];

//创建舞台
var stage = new createjs.Stage("stage");

createjs.Touch.enable(stage);

var bgBitmap = new createjs.Bitmap('images/img-17.jpg');

bgBitmap.scaleX = bgBitmap.scaleY = windowSize.height / 1080 * 1.35;

stage.addChild(bgBitmap);

var disX = (windowSize.height / 1080 * 1.35 * windowSize.height - windowSize.height) / 2 - 55;
var disY = (windowSize.height / 1080 * 1.35 * windowSize.width - windowSize.width) / 2 + 20;

bgBitmap.x = disX;
bgBitmap.y = disY;

//单个动物容器
var animalContainer = new createjs.Container();
animalContainer.x = 0;
animalContainer.y = 0;
animalContainer.alpha = 0;
stage.addChild(animalContainer);

//单个动物容器
var tryAnimalContainert = new createjs.Container();
tryAnimalContainert.x = 0;
tryAnimalContainert.y = 0;
stage.addChild(tryAnimalContainert);

//多个动物容器
var animalMoreContainer = new createjs.Container();
animalMoreContainer.x = 0;
animalMoreContainer.y = 0;
stage.addChild(animalMoreContainer);


var tryAnimalMoreContainer = new createjs.Container();
tryAnimalMoreContainer.x = 0;
tryAnimalMoreContainer.y = 0;
stage.addChild(tryAnimalMoreContainer);

//分数容器
var scoreContainer = new createjs.Container();

scoreContainer.x = 0;
scoreContainer.y = 0;

stage.addChild(scoreContainer);

var photograph = {
	width: 311,
	height: 309,
	x: 150,
	y: 180
};

//加载随机选择的动物到舞台
var a = parseInt(Math.random() * animal.length);
var selectAnimal = animal[a]; //用户选择的动物

createAnimal(selectAnimal);

var curAmimal = animalContainer.children[0]; //当前跑动动物	
var curAmimalWidth = curAmimal.spriteSheet._frameWidth; //当前跑动动物的高

var timer = null;

//倒计时计数
function setContDown() {

	var s = 30;

	timer = setInterval(function() {

		if(s <= 0) {

			s = 0;

			isContDown = true;

			clearInterval(timer);

		} else {

			s -= 1;

		}

		$A('.count-down').innerHTML = s + 's';

	}, 1000);

}

//刷新舞台
createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {

	stage.update();

	if(isTryGame) {
		tryGame();
	} else {
		run();
	}

}



function run() {

	if(!isContDown) { //计时开始

		if(isOpenWideAngle) {

			confine = windowSize.width * 1.35;

		} else {

			confine = windowSize.width;

		}

		if(isSingle) { //单个动物

			if(isStart) { //开始运动

				if(runOver) {

					if(random == 100) {

						isShowAll = true;

						random = 10;

					}

					if(isShowAll) {

						allAnimate();

						isShowAll = false;

					} else {

						a = parseInt(Math.random() * animal.length);

						selectAnimal = animal[a]; //用户选择的动物

						createAnimal(selectAnimal);

						curAmimal = animalContainer.children[0]; //当前跑动动物

						curAmimalWidth = curAmimal.spriteSheet._frameWidth; //当前跑动动物的高

						console.log(selectAnimal);

						runOver = false;

					}

				}

				if(curAmimal.name == selectAnimal.name) {
					
					if(!isPause) {

						if(curAmimal.x > confine) {

							runOver = true;

							isPhotograph = true;

						} else {

							curAmimal.x += selectAnimal.move;

						}

					}

				}

			}

		} else {

			if(!isPause) {

				for(var i = 0; i < animal.length; i++) {
					
					if(animal[i].name == animalMoreContainer.children[i].name) {

						if(animalMoreContainer.children[i].x > confine) {

							animalMoreContainer.children[i].alpha = 0;

						} else {

							animalMoreContainer.children[i].x += animal[i].move;

						}

						if(animalMoreContainer.children[i].name == '乌龟' && animalMoreContainer.children[i].x > confine) {

							animalMoreContainer.removeAllChildren();

							isSingle = true;

							isStart = true;

							isPhotograph = true;

						}

					}

				}

			}

		}

	} else {

		isStart = false;

		var tween = createjs.Tween.get(curAmimal, {
			loop: 0
		}).to({
			alpha: 0
		}, 500, createjs.Ease.linear).call(function() {

			if(k < 1) {

				if(isTry) {
					isContDown = false;
					num = 0;
					isTry = false;
					$A('.guidanceCourse').style.display = 'block';
					$A('.guidance-7').style.display = 'block';
					$A('.guidance-7').className = 'guidance-7 fadeIn';
					
				} else {

						if(isOfficial) {
							if(isOpenAgain) {
								
							} else {
								
							}
						} else {
							if(isOpenAgain) {
								
							} else {
								$A('.aBtn').style.display='none';
								$A('.hy-one-btn').style.display='block';
							}
						}


					$A('.result').style.display = 'block';

					$A('.result-bg').className = 'result-background result-bg fadeIn';

					setTimeout(function() {

						$A('.result-ct').className = 'result-container result-ct translateDown';

						if(num == 0) {

							$A('.result-ct span:nth-of-type(2) img').src = 'images/img-27.png';
							$A('.result-ct span:nth-of-type(2) img').style.marginLeft = '190px';

							$A('.failed').style.opacity = 1;

						} else {

							$A('.getScore').style.opacity = 1;

							$A('.getScore i').innerHTML = num;

						}

						$A('.u-name').innerHTML = userName + ': ';
						$A('.u-score').innerHTML = num;

					}, 500);
				}

				k = 2;

			}

		});

	}

}

function allAnimate() {

	isSingle = false;

	isStart = false;

	createMoreAnimals();

	curAmimal.alpha = 0;

}

//拍照框
var pg = new createjs.Bitmap('images/img-12.png');

pg.x = photograph.x;
pg.y = photograph.y;

stage.addChild(pg);

var animateX, minX, maxX, allNum = 0;
var tt = 0;
//按下拍照暂停画面
$A('.photograph_Btn').addEventListener(touchEvents.touchstart, function(e) {

	e.preventDefault();

	if(!isContDown) {

		storageAninmal.length = 0;

		if(isPhotograph) {

			changeBtnState();

			$A('.white').style.display = 'block';
			$A('.white').className = 'white active';

			paizhao_music.play();

			isPhotograph = false;

			setTimeout(function() {

				isPause = true;

				if(isSingle) {

					minX = photograph.x - 50;

					maxX = photograph.x + photograph.width - curAmimalWidth + 50;

					if(isOpenWideAngle) {

						animateX = curAmimal.x - disX * 0.6 * 2;

						maxX = maxX * 1.66;

					} else {

						animateX = curAmimal.x;

					}

					if(animateX >= minX && animateX <= maxX) {

						num += selectAnimal.count;

						if(num <= 0) {
							num = 0;
						}

						createScore();

						console.log(`恭喜你，你拍到了。加${selectAnimal.count}分！`);

					}

					$A('.score').innerHTML = "Score : " + num;

				} else {

					for(var i = 0; i < animal.length; i++) {

						var curMoreAnimalWidth = animalMoreContainer.children[i].spriteSheet._frameWidth;

						if(animal[i].name == animalMoreContainer.children[i].name) {

							if(animalMoreContainer.children[i].x > photograph.x - curMoreAnimalWidth / 2 - 30 && animalMoreContainer.children[i].x < photograph.x + photograph.width - curMoreAnimalWidth / 2 + 30) {
							
								storageAninmal.push(animalMoreContainer.children[i].name);

							}

						}

					}

					for(var i = 0; i < storageAninmal.length; i++) {

						for(var j = 0; j < animal.length; j++) {

							if(storageAninmal[i] == animal[j].name) {

								allNum += animal[j].count;

							}

						}

					}
					if(allNum == 14) {

						num += 50;

						createScore();

						$A('.score').innerHTML = "Score : " + num;

					} else {

						num += 0;

					}

				}
				setTimeout(function() {

					isPause = false;

					$A('.white').style.display = 'none';
					$A('.white').className = 'white';

				}, 500);

			}, 100);

		}

	}

}, false);

//创建动物
function createAnimal(obj) {

	animalContainer.removeAllChildren();

	var data = {
		images: [obj.images],
		frames: {
			width: obj.width,
			height: obj.height
		},
		animations: {
			run: [0, 2, 'run', obj.speed]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);

	var animation = new createjs.Sprite(spriteSheet, "run");

	if(isOpenWideAngle) {
		animation.x = -obj.width * 1.66;
	} else {
		animation.x = -obj.width;
	}

	animation.y = obj.y - obj.height;

	animation.name = obj.name;

	animalContainer.addChild(animation);

}

function tryCreateAnimal(obj) {

	tryAnimalContainert.removeAllChildren();

	var data = {
		images: [obj.images],
		frames: {
			width: obj.width,
			height: obj.height
		},
		animations: {
			run: [0, 2, 'run', obj.speed]
		}
	};

	var spriteSheet = new createjs.SpriteSheet(data);

	var animation = new createjs.Sprite(spriteSheet, "run");

	if(isOpenWideAngle) {
		animation.x = -obj.width * 1.66;
	} else {
		animation.x = -obj.width;
	}

	animation.y = obj.y - obj.height;

	animation.name = obj.name;

	tryAnimalContainert.addChild(animation);

}
//创建多个动物animalMoreContainer
function createMoreAnimals() {
	animalMoreContainer.removeAllChildren();
	for(var i = 0; i < animal.length; i++) {

		var data = {
			images: [animal[i].images],
			frames: {
				width: animal[i].width,
				height: animal[i].height
			},
			animations: {
				run: [0, 2, 'run', animal[i].speed]
			}
		};

		var spriteSheet = new createjs.SpriteSheet(data);

		var animation = new createjs.Sprite(spriteSheet, "run");

		if(isOpenWideAngle) {
			animation.x = -animal[i].width * 1.66;
		} else {
			animation.x = -animal[i].width;
		}

		animation.y = animal[i].y - animal[i].height;

		animation.name = animal[i].name;

		animalMoreContainer.addChild(animation);

	}
}
function tryCreateMoreAnimals() {

	for(var i = 0; i < animal.length; i++) {

		var data = {
			images: [animal[i].images],
			frames: {
				width: animal[i].width,
				height: animal[i].height
			},
			animations: {
				run: [0, 2, 'run', animal[i].speed]
			}
		};

		var spriteSheet = new createjs.SpriteSheet(data);

		var animation = new createjs.Sprite(spriteSheet, "run");

		if(isOpenWideAngle) {
			animation.x = -animal[i].width * 1.66;
		} else {
			animation.x = -animal[i].width;
		}

		animation.y = animal[i].y - animal[i].height;

		animation.name = animal[i].name;

		tryAnimalMoreContainer.addChild(animation);

	}
}
//创建分数
function createScore() {

	scoreContainer.removeAllChildren();

	var src = null;

	if(isSingle) {

		if(selectAnimal.count == 2) {

			src = scoreIcon[4].images;

		} else if(selectAnimal.count == 3) {

			src = scoreIcon[3].images;

		} else if(selectAnimal.count == 4) {

			src = scoreIcon[2].images;

		} else if(selectAnimal.count == 5) {

			src = scoreIcon[1].images;

		} else if(selectAnimal.count == 6) {

			src = scoreIcon[0].images;

		} else if(selectAnimal.count == -1) {

			src = scoreIcon[5].images;

		} else if(selectAnimal.count == -2) {

			src = scoreIcon[6].images;

		} else if(selectAnimal.count == -3) {

			src = scoreIcon[7].images;

		}

	} else {

		if(allNum == 14) {

			src = scoreIcon[8].images;

		}

	}

	var scoreBitmap = new createjs.Bitmap(src);

	scoreBitmap.x = 400;

	scoreBitmap.y = 120;

	scoreContainer.addChild(scoreBitmap);

	var tweenA = createjs.Tween.get(scoreBitmap, {
		loop: 0
	}).to({
		y: 50,
		alpha: 1
	}, 300, createjs.Ease.linear).to({
		y: 0,
		alpha: 0
	}, 300, createjs.Ease.linear);

}

var m = 0;

$A('.photograph span:nth-child(2)').addEventListener(touchEvents.touchstart, function(e) {

	e.preventDefault();

	this.className = '';

	setOffOnWideAngle();

}, false);

//开关广角
function setOffOnWideAngle() {
	
	var aA=animalContainer||tryAnimalContainer;
	var aB=animalMoreContainer||tryAnimalMoreContainer;
		
	
	if(isOpenWideAngle) {
		
		if(m == 1) {

			m = 0;

			var tweenA = createjs.Tween.get(bgBitmap, {
				loop: 0
			}).to({
				x: disX,
				y: disY,
				scaleX: windowSize.height / 1080 * 1.35,
				scaleY: windowSize.height / 1080 * 1.35
			}, 350, createjs.Ease.linear);

			var tweenB = createjs.Tween.get(aA, {
				loop: 0
			}).to({
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1
			}, 350, createjs.Ease.linear);

			var tweenC = createjs.Tween.get(aB, {
				loop: 0
			}).to({
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1
			}, 350, createjs.Ease.linear);

			$A('.photograph span:nth-child(2) img').src = 'images/img-14.png';

			$A('.photograph span:nth-child(1)').className = 'onScaleDiminish';
		}

	} else {
		
		if(m == 0) {

			m = 1;

			var tweenA = createjs.Tween.get(bgBitmap, {
				loop: 0
			}).to({
				x: 0,
				y: 0,
				scaleX: windowSize.height / 1080,
				scaleY: windowSize.height / 1080
			}, 350, createjs.Ease.linear);

			var tweenB = createjs.Tween.get(aA, {
				loop: 0
			}).to({
				x: -disX * 0.6 * 2,
				y: -disY * 0.6 * 2.5,
				scaleX: 0.6,
				scaleY: 0.6
			}, 350, createjs.Ease.linear);

			var tweenC = createjs.Tween.get(aB, {
				loop: 0
			}).to({
				x: -disX * 0.6 * 2,
				y: -disY * 0.6 * 2.5,
				scaleX: 0.6,
				scaleY: 0.6
			}, 350, createjs.Ease.linear);

			$A('.photograph span:nth-child(2) img').src = 'images/img-13.png';

			$A('.photograph span:nth-child(1)').className = 'onScaleLargen';
		}

	}

	isOpenWideAngle = !isOpenWideAngle;
}


function tryOpenWideAngle(){
	
	if(istryOpenWideAngle) {
		
		if(tryM == 1) {

			tryM = 0;

			var tweenA = createjs.Tween.get(bgBitmap, {
				loop: 0
			}).to({
				x: disX,
				y: disY,
				scaleX: windowSize.height / 1080 * 1.35,
				scaleY: windowSize.height / 1080 * 1.35
			}, 350, createjs.Ease.linear);

			
			var tweenC = createjs.Tween.get(tryAnimalMoreContainer, {
				loop: 0
			}).to({
				x: 0,
				y: 0,
				scaleX: 1,
				scaleY: 1
			}, 350, createjs.Ease.linear);

			$A('.photograph span:nth-child(2) img').src = 'images/img-14.png';

			$A('.photograph span:nth-child(1)').className = 'onScaleDiminish';
		}

	} else {
		
		if(tryM == 0) {

			tryM = 1;

			var tweenA = createjs.Tween.get(bgBitmap, {
				loop: 0
			}).to({
				x: 0,
				y: 0,
				scaleX: windowSize.height / 1080,
				scaleY: windowSize.height / 1080
			}, 350, createjs.Ease.linear);

			

			var tweenC = createjs.Tween.get(tryAnimalMoreContainer, {
				loop: 0
			}).to({
				x: -disX * 0.6 * 2,
				y: -disY * 0.6 * 2.5,
				scaleX: 0.6,
				scaleY: 0.6
			}, 350, createjs.Ease.linear);

			$A('.photograph span:nth-child(2) img').src = 'images/img-13.png';

			$A('.photograph span:nth-child(1)').className = 'onScaleLargen';
		}

	}

	istryOpenWideAngle = !istryOpenWideAngle;
}

//改变拍照按钮的状态
function changeBtnState() {

	$A('.photograph span:nth-child(4) i:nth-of-type(1)').style.opacity = 0;

	$A('.photograph span:nth-child(4) i:nth-of-type(2)').style.opacity = 1;

	setTimeout(function() {

		$A('.photograph span:nth-child(4) i:nth-of-type(1)').style.opacity = 1;

		$A('.photograph span:nth-child(4) i:nth-of-type(2)').style.opacity = 0;

	}, 300)

}

//试玩教程
tryCreateAnimal(animal[2]);

var tryCurAmimal = tryAnimalContainert.children[0];

isPause = true;

function tryGame() {

	if(istryOpenWideAngle) {

		confine = windowSize.width * 1.35;

	} else {

		confine = windowSize.width;

	}

	if(next == 2) {
		if(t3 < 1) {
			tryCreateAnimal(animal[3]);
			tryCurAmimal = tryAnimalContainert.children[0];
			isPause = false;
			t3 = 1;
			t1 = 0
			t2 = 0;
			l1 = 250;
		}
	} else if(next == 3) {
		if(t3 < 1) {
			tryCreateAnimal(animal[5]);
			tryCurAmimal = tryAnimalContainert.children[0];
			isPause = false;
			t3 = 1;
			t1 = 0
			t2 = 0;
			l1 = 150;
		}
	} else if(next == 4) {
		if(t4 < 1) {
			tryAnimalContainert.removeAllChildren();
			tryCreateMoreAnimals();
			tryCurAmimal = tryAnimalMoreContainer.children[2];
			isPause = false;
			isSingle = false;
			t4 = 1;
			t1 = 0
			t2 = 0;
			next = 5;
		}
	}

	if(isSingle) {
		if(!isPause) {
			if(tryCurAmimal.x > l1 && tryCurAmimal.x < confine) {
				if(t1 < 1) {
					isPause = true;
					t1 = 1;
				}
				tryCurAmimal.x += 30;
			} else if(tryCurAmimal.x >= confine) {
				if(t2 < 1) {
					tryCurAmimal.x = confine;
					var tweenA = createjs.Tween.get(tryCurAmimal, {
						loop: 0
					}).to({
						alpha: 0
					}, 300, createjs.Ease.linear).call(function() {
						t1 = 0;
						tryAnimalContainert.removeAllChildren();
					});
					t2 = 1;

				}
			} else {
				tryCurAmimal.x += 30;
			}
		}
	} else {
		if(!isPause) {
			for(var i = 0; i < animal.length; i++) {

				if(animal[i].name == tryAnimalMoreContainer.children[i].name) {

					if(tryCurAmimal.x > 50 && tryCurAmimal.x < confine) {
						if(t1 < 1) {
							isPause = true;
							t1 = 1;
							$A('.u-zz').style.display = 'block';
							$A('.u-zz').className = 'u-zz fadeIn';
						}
					}
					if(tryAnimalMoreContainer.children[i].x >= confine) {

						tryAnimalMoreContainer.children[i].alpha = 0;

					} else {

						tryAnimalMoreContainer.children[i].x += animal[i].move;

					}
				}
			}
		}
	}
}

function tryPhotograph() {
	changeBtnState();

	$A('.guidanceCourse').style.display = 'none';
	$A('.guidance-4').style.display = 'none';

	$A('.white').style.display = 'block';
	$A('.white').className = 'white active';

	paizhao_music.play();

	scoreContainer.removeAllChildren();

	var src = null;

	if(next == 1) {
		src = scoreIcon[0].images;
	} else if(next == 2) {
		src = '';
	} else if(next == 3) {
		src = scoreIcon[7].images;
	} else if(next == 5) {
		src = scoreIcon[8].images;
	}

	var scoreBitmap = new createjs.Bitmap(src);
	scoreBitmap.x = 400;
	scoreBitmap.y = 120;
	scoreContainer.addChild(scoreBitmap);

	var tweenG = createjs.Tween.get(scoreBitmap, {
		loop: 0
	}).to({
		y: 50,
		alpha: 1
	}, 300, createjs.Ease.linear).to({
		y: 0,
		alpha: 0
	}, 300, createjs.Ease.linear);

	setTimeout(function() {
		isPause = false;
	}, 500);

}