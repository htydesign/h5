/***
 * 阻止浏览器默认事件
 */
window.addEventListener('touchmove', function(e) {

	e.preventDefault();

}, false);

var w_Href = window.location.href;

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
 * 播放背景音乐
 */

var oMusicIcon = document.querySelector('.music-icon');
var oBgMusic = document.getElementById("bgMusic");

setTimeout(function() {
	oBgMusic.src = 'music/bgMusic.mp3';
	oBgMusic.play();
	//bgMusic.muted = true; //静音
	//bgMusic.volume=0;
}, 300);

oMusicIcon.addEventListener('click', function() {
	if(oBgMusic.paused) {
		oBgMusic.play();
		oMusicIcon.classList.remove('active');
	} else {
		oBgMusic.pause();
		oMusicIcon.classList.add('active');
	}
}, false);

/***
 * loading加载
 */

(function() {

	var startTime = new Date().getTime();
	var endTime = 0;
	var dis = 0;
	var time = 0;
	var nT = 3000;
	var oTxt = document.querySelector('.loading p');
	var loadingTimer = null;
	var img = document.getElementById("loadingImage")

	var canvas = document.getElementById("loadingCanvas");
	var ctx = canvas.getContext("2d");

	var w = 150;
	var h = 142;
	var n = 0;
	var LastTime = 0;
	var setFTP = 60;
	var direct = true;
	canvas.width = w;
	canvas.height = h;

	var loader = new PxLoader();

	for(var i = 0; i < fileList.length; i++) {

		loader.addImage(fileList[i]);

	}

	loader.addProgressListener(function(e) {

		var percent = Math.round((e.completedCount / e.totalCount) * 100);

		oTxt.innerHTML = "loading    " + percent + "%";

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

		window.cancelAnimationFrame(loadingTimer);

	});

	loader.start();

	function startMain(t) {

		setTimeout(function() {

			var oLoading = document.querySelector('.loading');

			fadeOut(oLoading);
			MAIN.isFirstOpen = true;
			MAIN.init();

		}, t);

	}

	dramImage();

	function dramImage() {
		var dtNow = Date.now();
		loadingTimer = requestAnimationFrame(dramImage);
		if(dtNow - LastTime >= setFTP) {
			if(direct) {
				n++
				if(n >= 16) {
					direct = false;
				}
			} else {
				n--;
				if(n <= 0) {
					direct = true;
				}
			}

			//				if(n >= 16) {
			//					n=0;
			//				}else{
			//					n++;
			//				} 

			ctx.clearRect(0, 0, w, h);
			ctx.drawImage(img, n * w, 0, w, h, 0, 0, w, h);
			LastTime = dtNow;
		}
	}

})();

var MAIN = {

	oIndex: document.querySelector('.index'),

	oRuleContainer: document.querySelector('.rule'),

	isFirstOpen: false, //是否是第一次打开

	onShowRule: function() { //显示隐藏规则页面

		var _this = this;

		var endAnimtation = document.querySelector(".index span:nth-of-type(17)");

		var oCloseRule = document.querySelector('.rule .close');

		var oOpenRule = document.querySelector('.rule-bottom');

		//如果是第一次打开此H5，则自动显示规则页
		if(this.isFirstOpen) {

			endAnimtation.addEventListener('transitionend', function() {

				fadeIn(_this.oRuleContainer);

			}, false);

		}

		//点击游戏规则，显示规则页
		oOpenRule.addEventListener('click', function() {

			fadeIn(_this.oRuleContainer);

		}, false);

		//点击关闭按钮，隐藏规则页
		oCloseRule.addEventListener('click', function() {

			fadeOut(_this.oRuleContainer);

		}, false);

	},

	onStartGame: function() { //点击开始游戏

		var _this = this;

		var oStartBottom = document.querySelector('.start-bottom');

		var oNextContainer = document.querySelector('.next');

		oStartBottom.addEventListener('click', function() {

			fadeOut(_this.oIndex);

			oMusicIcon.style.top = "130px";

			GAME.onClickNextCheckpoint();

			setTimeout(function() {

				fadeIn(oNextContainer);

				setTimeout(function() {

					fadeOut(oNextContainer);

					GAME.onStartCountDown();

				}, 3000);

			}, 1000);

			oBgMusic.volume = 0.2;

		}, false);

	},

	createImage: function(num) {

		var oCreateImage = document.querySelector('.canvas-createImage img');

		var oFinish = document.querySelector('.finish');
		oFinish.classList.remove('active');

		var n = 0;

		if(num < 50) {
			n = 0;
		} else if(num < 100 && num >= 50) {
			n = 1;
		} else if(num < 150 && num >= 100) {
			n = 2;
		} else if(num >= 150) {
			n = 3;
		}

		var aTxt = [{
			a: "images/img-30.png",
			b: "恭喜获得“家电Day潇洒浪子”荣誉称号",
			c: "可兑换50元代金券",
			img1: "images/img-65.png",
			img2: "images/img-33.png"
		}, {
			a: "images/img-59.png",
			b: "恭喜获得“家电Day划水好手”荣誉称号",
			c: "可兑换50元代金券",
			img1: "images/img-65.png",
			img2: "images/img-62.png"
		}, {
			a: "images/img-60.png",
			b: "恭喜获得“家电Day带头大哥”荣誉称号",
			c: "可兑换50元代金券",
			img1: "images/img-58.png",
			img2: "images/img-63.png"
		}, {
			a: "images/img-61.png",
			b: "恭喜获得“家电Day火云大侠”荣誉称号",
			c: "可兑换50元代金券",
			img1: "images/img-66.png",
			img2: "images/img-64.png"
		}];

		var H5_url = window.location.href;

		var w = window.innerWidth;
		var h = 964;
		var x1 = 360;
		var x2 = 448;

		if(num < 10) {
			x1 = 370;
			x2 = 418;
		} else if(num < 100 && num >= 10) {
			x1 = 365;
			x2 = 428;
		} else {
			x1 = 360;
			x2 = 448;
		}

		var oCanvas = document.createElement("canvas");
		var ctx = oCanvas.getContext("2d");

		oCanvas.width = w;
		oCanvas.height = h;

		var er_width = 120;
		var er_height = 120;

		//文案12=>二维码
		$('#qrcodeCanvas').qrcode({
			render: "canvas",
			text: H5_url,
			width: er_width,
			height: er_height,
			background: "#ffffff",
			foreground: "#000000",
			src: ''
		});

		var qrcodeCanvas = document.querySelector("#qrcodeCanvas canvas");

		//大框
		var a = new Image();
		a.src = "images/img-27.png";
		a.onload = function() {

			ctx.drawImage(a, (w - a.naturalWidth) / 2, 80);

			//文案3=>分数
			ctx.beginPath();
			ctx.fillStyle = "#c21437";
			ctx.font = "42px 微软雅黑";

			ctx.fillText(num, x1, 332);
			ctx.closePath();

			//文案11=>二维码的白底
			ctx.beginPath();
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(395, 650, 124, 124);
			ctx.closePath();

			ctx.drawImage(qrcodeCanvas, 397, 652, er_width, er_height);

			//文案13=>扫码参与游戏
			ctx.beginPath();
			ctx.fillStyle = "#333333";
			ctx.font = "18px 微软雅黑";
			ctx.fillText("扫码参与游戏", 402, 795);
			ctx.closePath();

			//文案1
			var image_1 = new Image();
			image_1.src = aTxt[n].img2;
			image_1.onload = function() {

				ctx.drawImage(image_1, (w - image_1.naturalWidth) / 2, 188);

				//文案2=>恭喜您共获得
				var image_2 = new Image();
				image_2.src = "images/img-34.png";
				image_2.onload = function() {

					ctx.drawImage(image_2, 166, 300);

					//文案4=>图标
					var image_3 = new Image();
					image_3.src = "images/img-32.png";
					image_3.onload = function() {

						ctx.drawImage(image_3, x2, 300);

						//文案5=>分数对应图标
						var image_4 = new Image();
						image_4.src = aTxt[n].a;
						image_4.onload = function() {

							ctx.drawImage(image_4, (w - image_4.naturalWidth) / 2, 380);

							//文案7=>恭喜获得“家电Day潇洒浪子”荣誉称号
							ctx.beginPath();
							ctx.fillStyle = "#c21437";
							ctx.font = "20px 微软雅黑";
							ctx.textAlign = "center";
							ctx.fillText(aTxt[n].b, w / 2, 610);
							ctx.closePath();

							//文案8=>可兑换50元代金券
							ctx.beginPath();
							ctx.fillStyle = "#c21437";
							ctx.font = "20px 微软雅黑";
							ctx.textAlign = "center";
							ctx.fillText(aTxt[n].c, w / 2, 635);
							ctx.closePath();

							//文案9=>优惠券的框
							var image_5 = new Image();
							image_5.src = "images/img-28.png";
							image_5.onload = function() {

								ctx.drawImage(image_5, 114, 648);

								//文案10=>优惠券
								var image_6 = new Image();
								image_6.src = aTxt[n].img1;
								image_6.onload = function() {

									ctx.drawImage(image_6, 142, 670);

									oCreateImage.src = oCanvas.toDataURL("image/png");

									oFinish.classList.add('active');

								}

							}

						}

					}

				}

			}

		}

		this.onClickAwards(0);

	},

	onClickShare: function() {

		var oShareBottom = document.querySelector('.share-btn');

		var oShareContainer = document.querySelector('.share');

		var oCloseShare = document.querySelector('.share .close');

		oShareBottom.addEventListener('click', function() {

			fadeIn(oShareContainer);

		}, false);

		oCloseShare.addEventListener('click', function() {

			fadeOut(oShareContainer);

		}, false);

	},

	onClickAwards: function(m) {

		var oBottom = document.querySelector('.finish h2');

		var oAwardsContainer = document.querySelector('.awards');

		var oCloseAwards = document.querySelector('.awards .close');

		var aLink = document.querySelectorAll('.awards-info a');

		oBottom.addEventListener('click', function() {

			fadeIn(oAwardsContainer);

		}, false);

		oCloseAwards.addEventListener('click', function() {

			fadeOut(oAwardsContainer);

		}, false);

		for(var i = 0; i < aLink.length; i++) {
			if(i === m) {
				aLink[i].classList.add('active');
				aLink[i].href = "https://www.hao123.com";
			} else {
				aLink[i].classList.remove('active');
				aLink[i].href = "javascript:;";
			}
		}

	},

	init: function() { //初始化

		this.oIndex.classList.add('active');
		this.onShowRule();
		this.onStartGame();
		this.onClickShare();
	}

}

var GAME = {

	oStage: new createjs.Stage("stage"),

	oCanvas: document.getElementById("stage"),

	oCountTime: document.querySelector('.time p'),

	oCurrScore: document.querySelector('.score p'),

	oNextContainer: document.querySelector('.next'),

	oNextBottom: document.querySelector('.next-btn'),

	oNextH2Img: document.querySelector('.next h2 img'),

	oNextH3Img: document.querySelector('.next h3 img'),

	aTxt: document.querySelectorAll(".game h1"),

	oCountDownMusic: document.querySelector('#countdown_music'),

	oFinish: document.querySelector('.finish'),

	oAgainBottom: document.querySelector('.again-btn'),

	oAddRoSubContainer: document.querySelector('.addRoSub'),

	level: 0, //当前关卡

	speed: 15,

	isBegin: false, //是否开始下落

	total: 0, //当前分数

	bgColor: ["#d8b830", "#26a8c6", "#56ba5a", "#c21437"],

	bgImage: ["img-19.jpg", "img-20.jpg", "img-22.jpg", "img-24.jpg"],

	countDownImage: ["img-45.png", "img-46.png", "img-47.png", "img-48.png"],

	countDownImageSize: [{
		w: 91,
		h: 132
	}, {
		w: 91,
		h: 132
	}, {
		w: 91,
		h: 132
	}, {
		w: 201,
		h: 108
	}],

	nextImages: [{
		h2: "img-50.png",
		h3: "img-54.png"
	}, {
		h2: "img-51.png",
		h3: "img-55.png"
	}, {
		h2: "img-52.png",
		h3: "img-56.png"
	}, {
		h2: "img-53.png",
		h3: "img-57.png"
	}],

	aArray: [],

	nWidth: window.innerWidth,

	nHeight: window.innerHeight,

	bgContainer: new createjs.Container(),

	rectColorContainer: new createjs.Container(),

	countDownContainer: new createjs.Container(),

	goodsContainer: new createjs.Container(),

	showContainer: new createjs.Container(),

	bombContainer: new createjs.Container(),
	
	createRandomArray: function(n) { //创建随机数组

		var arr = [];

		var a = mapData[n].sceneElement.length;

		var b = mapData[n].sumsungGoods.length;

		var c = 20 - a - b;

		//添加本场景元素
		for(var i = 0; i < a; i++) {

			arr.push(mapData[n].sceneElement[i]);

		}

		//添加产品元素
		for(var i = 0; i < b; i++) {

			arr.push(mapData[n].sumsungGoods[i]);

		}

		//添加非本场景元素和元宵节元素
		for(var i = 0; i < c; i++) {

			var m = parseInt(Math.random() * 10);

			if(m <= 6) {

				arr.push(mapData[n].noEceneElement[parseInt(Math.random() * mapData[n].noEceneElement.length)]);

			} else {

				arr.push(mapData[n].LanternFestival[parseInt(Math.random() * mapData[n].LanternFestival.length)]);

			}

		}

		//随机排序
		function randomSort(a, b) {

			return Math.random() > 0.5 ? -1 : 1;

		}

		arr.sort(randomSort);

		return arr;

	},

	setLevelArray: function(a, lvl) { //创建每一个关卡的数组

		this.aArray.length = 0;

		var arr = [];

		for(var i = 0; i <= a; i++) {

			arr.push(this.createRandomArray(lvl));

		}

		for(var i = 0; i < arr.length; i++) {

			this.aArray = this.aArray.concat(arr[i]);

		}

		console.log(this.aArray);
	},

	onChangeBackground: function(lvl) { //改变场景图片和背景色

		var bgBitmap = new createjs.Bitmap("images/" + this.bgImage[lvl]);
		bgBitmap.scaleX = bgBitmap.scaleY = 1;
		bgBitmap.y = -108;
		bgBitmap.name = lvl;
		bgBitmap.alpha = (lvl === 0) ? 1 : 0;
		this.bgContainer.addChild(bgBitmap);

		var drawRectBgColor = new createjs.Shape();
		drawRectBgColor.graphics.beginFill(this.bgColor[lvl]).drawRect(0, 0, this.nWidth, this.nHeight);
		drawRectBgColor.x = drawRectBgColor.y = 0;
		drawRectBgColor.alpha = (lvl === 0) ? 1 : 0;
		this.rectColorContainer.addChild(drawRectBgColor);

	},

	setCanvas: function() { //设置画布大小

		this.oCanvas.width = window.innerWidth;
		this.oCanvas.height = window.innerHeight;

	},

	setContainer: function() { //设置各个容器

		this.oStage.addChild(this.rectColorContainer);
		this.oStage.addChild(this.bgContainer);
		this.oStage.addChild(this.bombContainer);
		this.oStage.addChild(this.countDownContainer);
		this.oStage.addChild(this.goodsContainer);
		this.oStage.addChild(this.showContainer);
		this.oStage.addChild(this.bombContainer);
		var bitmap = new createjs.Bitmap("images/img-14.png");
		bitmap.x = this.nWidth / 2 - 145 / 2;
		bitmap.y = 856;
		this.showContainer.addChild(bitmap);

	},

	setVibrate: function() { //调用手机震动

		var vibrateSupport = "vibrate" in navigator;

		if(vibrateSupport) { //兼容不同的浏览器

			navigator.vibrate = navigator.vibrate || navigator.webkitVibrate || navigator.mozVibrate || navigator.msVibrate;

			navigator.vibrate(500);

		}

	},

	onClickNextCheckpoint: function() { //点击下一关进入下一个关卡

		var _this = this;

		_this.oNextBottom.addEventListener('click', function() { //点击canvas改变整个关卡的背景

			_this.speed += 5;

			fadeOut(_this.oNextContainer);

			_this.setLevelArray(_this.level + 2, _this.level);

			_this.onStartCountDown();

		}, false);

	},

	onStartCountDown: function() { //倒计时 //3、2、1、开始=》

		var _this = this;

		var timer = null;

		var n = 0;

		timer = setInterval(function() {

			_this.countDownContainer.removeAllChildren();

			_this.oCountDownMusic.play();

			var bitmap = new createjs.Bitmap("images/" + _this.countDownImage[n]);
			bitmap.scaleX = bitmap.scaleY = 5;
			bitmap.x = _this.nWidth / 2 - _this.countDownImageSize[n].w / 2 * 5;
			bitmap.y = _this.nHeight / 2 - _this.countDownImageSize[n].h / 2 * 5;
			bitmap.alpha = 0;
			_this.countDownContainer.addChild(bitmap);

			var tween = createjs.Tween.get(bitmap, {
				loop: 0
			}).to({
				alpha: 1,
				scaleX: 1,
				scaleY: 1,
				x: _this.nWidth / 2 - _this.countDownImageSize[n].w / 2,
				y: _this.nHeight / 2 - _this.countDownImageSize[n].h / 2
			}, 300, createjs.Ease.linear);

			if(n >= 3) {

				clearInterval(timer);

				setTimeout(function() {

					_this.countDownContainer.removeAllChildren();

					_this.beginGame();

				}, 1000);

			} else {

				n++;

			}

		}, 1000);

	},

	createGoods: function() { //创建物品

		var _this = this;

		for(var i = 0; i < this.aArray.length; i++) {

			var marginTop = parseInt(Math.random() * 400);
			marginTop = (marginTop < 200) ? 200 : marginTop;

			var bitmap = new createjs.Bitmap("images/goods/" + this.aArray[i].src);

			if(this.aArray[i].w == 240 && this.aArray[i].h == 240) {

				bitmap.scaleX = bitmap.scaleY = 1;

			} else {

				bitmap.scaleX = bitmap.scaleY = 0.5;

			}

			bitmap.x = parseInt(Math.random() * 450) + 30;
			bitmap.y = -200 * i - marginTop;
			bitmap.name = this.aArray[i].name;
			bitmap.score = this.aArray[i].score;
			bitmap.sumsung = this.aArray[i].sumsung;
			this.goodsContainer.addChild(bitmap);
			this.goodsContainer.alpha = 1;

		}

	},

	running: function() { //物品元素从上往下移动

		var _this = this;

		var nGoods = this.goodsContainer.children;

		if(this.isBegin) {

			for(var i = 0; i < nGoods.length; i++) {

				if(nGoods[i].y > this.nHeight) {

					this.goodsContainer.removeChild(nGoods[i]);

				} else {

					nGoods[i].y += this.speed;

				}

			}

		}

		if(nGoods.length === 0) {

			this.isBegin = false;

		}

	},

	gameCountDown: function() { //30秒游戏倒计时

		var _this = this;

		var timer = null;

		var s = 30;

		timer = setInterval(function() {

			if(s <= 0) {

				_this.isBegin = false;

				clearInterval(timer);

				if(_this.showContainer.children.length > 1) {

					_this.showContainer.removeChildAt(1);

				}

				var tweenContainer = createjs.Tween.get(_this.goodsContainer).to({

					alpha: 0

				}, 300, createjs.Ease.linear).call(function() {

					_this.goodsContainer.removeAllChildren();

					if(_this.level === mapData.length - 1) {

						MAIN.createImage(_this.total);

						fadeIn(_this.oFinish);

						oBgMusic.volume = 1;

						oMusicIcon.style.top = "10px";

					} else {

						_this.oCountTime.innerHTML = "00：" + 30;

						_this.oNextContainer.classList.add("active");

						_this.oNextH2Img.src = "images/" + _this.nextImages[_this.level + 1].h2;
						_this.oNextH3Img.src = "images/" + _this.nextImages[_this.level + 1].h3;

						_this.level++;

						_this.onChangeBackground(_this.level);

						for(var i = 0; i < _this.aTxt.length; i++) {

							if(i == _this.level) {

								_this.aTxt[_this.level].style.display = "block";

							} else {

								_this.aTxt[i].style.display = "none";

							}

						}

						var currentChildBgImage = _this.bgContainer.getChildAt(1);

						var tweenBgImage = createjs.Tween.get(currentChildBgImage).to({

							alpha: 1

						}, 400, createjs.Ease.linear).call(function() {

							_this.bgContainer.removeChildAt(0);

						});

						var currentChildBgColor = _this.rectColorContainer.getChildAt(1);

						var tweenBgColor = createjs.Tween.get(currentChildBgColor).to({

							alpha: 1

						}, 400, createjs.Ease.linear).call(function() {

							_this.rectColorContainer.removeChildAt(0);

							fadeIn(_this.oNextContainer);

						});

					}

				});

			} else {

				s--;

				if(s < 10) {

					s = "0" + s;

				}

			}

			_this.oCountTime.innerHTML = "00：" + s;

		}, 1000);

	},

	onClickGoods: function() { //点击物品元素

		var _this = this;

		var nGoods = this.goodsContainer.children;

		if(this.isBegin) {

			for(var i = 0; i < nGoods.length; i++) {

				nGoods[i].on("mousedown", function() {

					var aP = document.querySelectorAll('.addRoSub'); 

					aP.innerHTML = ""; 

					var oP = document.createElement("p");
					oP.classList.add("active");

					if(this.score == -1) {

						_this.total -= 1;

						_this.setVibrate();

					} else if(this.score == -5) {

						_this.total -= 5;

						_this.setVibrate();

					} else if(this.score == 1) {

						_this.total += 1;

					} else if(this.score == 2) {

						_this.total += 2;

					} else if(this.score == 3) {

						_this.total += 3;

					}

					if(_this.total <= 0) {

						_this.total = 0;

					}

					if(this.score > 0) {

						oP.innerHTML = "+" + this.score;

					} else {

						oP.innerHTML = this.score;;

					}

					_this.oAddRoSubContainer.appendChild(oP);

					setTimeout(function() {
						_this.oCurrScore.innerHTML = _this.total;
					}, 300);

					_this.goodsContainer.removeChild(this);

					_this.showImage(_this.level, this.name, this.image.src, this.sumsung, this.image.width, this.image.height);
					//console.log(_this.level, this.name, this.image.src, this.sumsung);

					if(this.name == "common1") {

						_this.bombContainer.x = this.x - 28;
						_this.bombContainer.y = this.y - 10;
						_this.bombContainer.alpha = 1;

						setTimeout(function() {

							var bombContainerAlpha = createjs.Tween.get(_this.bombContainer).to({

								alpha: 0

							}, 200, createjs.Ease.linear);

						}, 300);

					}

				});

			}

		}

	},

	createBomb: function() {

		var bitmap = new createjs.Bitmap("images/bomb.png");
		bitmap.scaleX = bitmap.scaleY = 0.5;
		bitmap.x = 0;
		bitmap.y = 0;
		this.bombContainer.alpha = 0;
		this.bombContainer.addChild(bitmap);

	},

	showImage: function(lvl, oName, src, sumsung, w, h) { //若点击三星物品，则在框中显示该物品

		for(var i = 0; i < mapData[lvl].sumsungGoods.length; i++) {

			if(mapData[lvl].sumsungGoods[i].name === oName && sumsung === 1) {

				var bitmap = new createjs.Bitmap(src);

				if(oName == "product2") {

					bitmap.scaleX = bitmap.scaleY = 0.25;
					bitmap.x = this.nWidth / 2 - w / 2 * 0.25;
					bitmap.y = 875 + h / 2 * 0.15;

				} else if(oName == "product1") {

					bitmap.scaleX = bitmap.scaleY = 0.3;
					bitmap.x = this.nWidth / 2 - w / 2 * 0.3;
					bitmap.y = 860 + h / 2 * 0.15;

				} else {

					bitmap.scaleX = bitmap.scaleY = 0.3;
					bitmap.x = this.nWidth / 2 - w / 2 * 0.3;
					bitmap.y = 856 + h / 2 * 0.15;

				}

				if(this.showContainer.children.length > 1) {

					this.showContainer.removeChildAt(1);

				}

				this.showContainer.addChild(bitmap);

			}

		}

	},

	beginGame: function() { //开始游戏

		this.createGoods();

		this.isBegin = true;

		this.onClickGoods();

		this.gameCountDown();

	},

	playAgain: function() {

		var _this = this;

		this.oAgainBottom.addEventListener('click', function() {

			window.location.href = w_Href;

		}, false);

	},

	init: function() { //初始化

		var _this = this;

		createjs.Touch.enable(this.oStage);

		this.setContainer();

		this.onChangeBackground(0);

		this.setCanvas();

		this.setLevelArray(2, 0);

		this.aTxt[0].style.display = "block";

		this.playAgain();

		this.createBomb();

		createjs.Ticker.addEventListener("tick", function() {

			_this.oStage.update();

			_this.running();

		});

	}
	
}

GAME.init();