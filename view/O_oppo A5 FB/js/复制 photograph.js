function shuffle(arr) {
	var len = arr.length;
	for(var i = 0; i < len - 1; i++) {
		var idx = Math.floor(Math.random() * (len - i));
		var temp = arr[idx];
		arr[idx] = arr[len - i - 1];
		arr[len - i - 1] = temp;
	}
	return arr;
}

//动物属性
var animal = [
	{
		name: "斑马", 							//名字
		images: "images/animate/banma.png", 	//图片URL
		width: 400, 							//图片的宽
		height: 262, 							//图片的高
		x: 0, 								//起始点X
		y: 480, 									//起始点Y
		speed: 0.5, 							//帧动画的速度
		move: 8, 								//移动的速度
		count: 4 								//分数
	},
	{
		name: "长颈鹿",
		images: "images/animate/changjinglu.png",
		width: 292,
		height: 467,
		x: 0,
		y: 480,
		speed: 0.4,
		move: 4,
		count: 2
	},
	{
		name: "袋鼠",
		images: "images/animate/daishu.png",
		width: 280,
		height: 262,
		x: 0,
		y: 480,
		speed: 0.6,
		move: 10,
		count: 5
	},
	{
		name: "河马",
		images: "images/animate/hema.png",
		width: 373,
		height: 162,
		x: 0,
		y: 480,
		speed: 0.5,
		move: 6,
		count: 3
	},
	{
		name: "老虎",
		images: "images/animate/laohu.png",
		width: 241,
		height: 262,
		x: 0,
		y: 480,
		speed: 0.7,
		move: 10,
		count: -2
	},
	{
		name: "猎豹",
		images: "images/animate/liebao.png",
		width: 311,
		height: 135,
		x: 0,
		y: 480,
		speed: 0.7,
		move: 12,
		count: 6
	},
	{
		name: "狮子",
		images: "images/animate/shizi.png",
		width: 271,
		height: 262,
		x: 0,
		y:480,
		speed: 0.7,
		move: 11,
		count: -1
	},
	{
		name: "乌龟",
		images: "images/animate/wugui.png",
		width: 173,
		height: 146,
		x: 0,
		y: 480,
		speed: 0.2,
		move: 2,
		count: 1
	}
];

//创建舞台
var stage = new createjs.Stage("stage");
createjs.Touch.enable(stage);


var bgBitmap=new createjs.Bitmap('images/img-17.jpg');
bgBitmap.scaleX=bgBitmap.scaleY=640/windowSize.height;
stage.addChild(bgBitmap);

//单个动物容器
var animalContainer = new createjs.Container();
animalContainer.x = 0;
animalContainer.y = 0;
stage.addChild(animalContainer);

//多个动物容器
var animalMoreContainer = new createjs.Container();
animalMoreContainer.x = 0;
animalMoreContainer.y = 0;
stage.addChild(animalMoreContainer);

var photograph = { width: 381, height: 356, x: 140, y: 140 };


//加载随机选择的动物到舞台
var a = parseInt(Math.random() * animal.length);
var selectAnimal = animal[a]; //用户选择的动物
createAnimal(selectAnimal);


//倒计时计数
function setContDown() {
	var s = 30;
	setInterval(function() {
		if(s <= 0) {
			s = 0;
			//isContDown = true;
		} else {
			s -= 1;
		}
		$A('.count-down').innerHTML=s;
	}, 1000);
}

var curAmimal = animalContainer.children[0]; //当前跑动动物
var curAmimalWidth = curAmimal.spriteSheet._frameWidth; //当前跑动动物的高

var a=0;;

//刷新舞台
createjs.Ticker.addEventListener("tick", handleTick);

function handleTick(event) {
	stage.update();
	run();
}

function run(){
	if(!isContDown) { //计时开始
		if(isSingle) { //单个动物
			if(isStart) { //开始运动
				if(runOver){
					a = parseInt(Math.random() * animal.length);
					selectAnimal = animal[a]; //用户选择的动物
					createAnimal(selectAnimal);
					
					curAmimal = animalContainer.children[0]; //当前跑动动物
					curAmimalWidth = curAmimal.spriteSheet._frameWidth; //当前跑动动物的高
					
					console.log(selectAnimal);
					runOver=false; 
				}
				if(curAmimal.name == selectAnimal.name) {
					if(!isPause) {
						if(curAmimal.x > confine) {
							runOver=true;
							curAmimal.x = -selectAnimal.width;
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
							animalMoreContainer.children[i].x = 0;
						} else {
							animalMoreContainer.children[i].x += animal[i].move;
						}
						if(animalMoreContainer.children[i].x > confine-animal[i].width*2){
							var tween= createjs.Tween.get(animalMoreContainer.children[i], {
								loop: 0
							}).to({
								alpha: 0
							}, 5*animal[i].width, createjs.Ease.linear);
						}else{
							animalMoreContainer.children[i].alpha=1;
						}
					}
				}
			}
		}
	} else {
		isStart = false;
		var tween= createjs.Tween.get(curAmimal, {
			loop: 0
		}).to({
			alpha: 0
		}, 500, createjs.Ease.linear);
		//console.log("游戏结束！");
	}
}



//拍照框
var pg=new createjs.Bitmap('images/img-12.png');
pg.x = photograph.x;
pg.y = photograph.y;
stage.addChild(pg);

var paizhao_music=document.getElementById("music_photo");
//按下拍照暂停画面
$A('.photograph span:nth-child(4) i').addEventListener(touchEvents.touchstart, function() {
	if(!isContDown) {
		storageAninmal.length = 0;
		if(isPhotograph) {
			paizhao_music.play();
			isPhotograph = false;
			curAmimal = animalContainer.children[0]; //当前跑动动物
			curAmimalWidth = curAmimal.spriteSheet._frameWidth; //当前跑动动物的高
			selectAnimal = animal[a]; //用户选择的动物
			console.log(curAmimal)
			setTimeout(function() {
				isPause = true;
//				if(isSingle) {
//					
//					if(curAmimal.x >= photograph.x && curAmimal.x < photograph.x + photograph.width - curAmimalWidth) {
//						num += selectAnimal.count;
//						console.log('恭喜你，你拍到了。加5分！');
//					} 
//					
////					if(curAmimal.x - curAmimalWidth / 2 > photograph.x - curAmimalWidth && curAmimal.x < photograph.x) {
////						num += selectAnimal.count / 5;
////						console.log('恭喜你，你拍到了一部分。加1分');
////					} else if(curAmimal.x >= photograph.x && curAmimal.x < photograph.x + photograph.width - curAmimalWidth) {
////						num += selectAnimal.count;
////						console.log('恭喜你，你拍到了。加5分！');
////					} else if(curAmimal.x >= photograph.x + photograph.width - curAmimalWidth && curAmimal.x < photograph.x + photograph.width - curAmimalWidth / 2) {
////						num += selectAnimal.count / 5;
////						console.log('恭喜你，你拍到了一部分。加1分');
////					} else {
////						console.log('不在拍照范围内！');
////					}
//					$A('.score').innerHTML = "当前分数：" + num + "分";
//				} else {
//					for(var i = 0; i < animal.length; i++) {
//						var curMoreAnimalHeight = animalMoreContainer.children[i].spriteSheet._frameWidth;
//						if(animal[i].name == animalMoreContainer.children[i].name) {
//							if(animalMoreContainer.children[i].x > photograph.x - curMoreAnimalHeight / 2 && animalMoreContainer.children[i].x < photograph.x + photograph.width - curMoreAnimalHeight / 2) {
//								storageAninmal.push(animalMoreContainer.children[i].name);
//							}
//						}
//					}
//					for(var i = 0; i < storageAninmal.length; i++) {
//						for(var j = 0; j < animal.length; j++) {
//							if(storageAninmal[i] == animal[j].name) {
//								num += animal[j].count;
//							}
//						}
//					}
//					$A('.score').innerHTML = "当前分数：" + num + "分";
//				}
				setTimeout(function() {
					isPause = false;
					isPhotograph = true;
				}, 500);
			}, 100);
		}
	}
},false);

//创建动物
function createAnimal(obj) {	
	animalContainer.removeAllChildren();
	var data = {
		images: [obj.images],
		frames: {width:obj.width, height:obj.height },
		animations: {
			run: [0, 2, 'run', obj.speed]
		}
	};
	var spriteSheet = new createjs.SpriteSheet(data);
	var animation = new createjs.Sprite(spriteSheet, "run");
	animation.x = -obj.width;
	animation.y = obj.y-obj.height;
	animation.name = obj.name;
	animalContainer.addChild(animation);	
}

//创建多个动物animalMoreContainer
function createMoreAnimals() {
	for(var i = 0; i < animal.length; i++) {		
		var data = {
			images: [animal[i].images],
			frames: {width:animal[i].width, height:animal[i].height },
			animations: {
				run: [0, 2, 'run', animal[i].speed]
			}
		};
		var spriteSheet = new createjs.SpriteSheet(data);
		var animation = new createjs.Sprite(spriteSheet, "run");
		animation.x = animal[i].x;
		animation.y = animal[i].y;
		animation.name = animal[i].name;
		animalMoreContainer.addChild(animation);		
	}
}

