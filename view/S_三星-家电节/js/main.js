//小喇叭交替出现
var notice = $('.run_p>img');
setInterval(function() {

	if(notice.attr('src') === 'images/notice1.png') {
		notice.attr('src', 'images/notice2.png');
	} else {
		notice.attr('src', 'images/notice1.png');
	}
	
}, 800);

var oTitle=document.querySelector('.index span:nth-of-type(18)');

oTitle.addEventListener('transitionend',function(){
	$('.run_p').fadeIn();
},false);

oTitle.addEventListener('webkitTransitionEnd',function(){
	$('.run_p').fadeIn();
},false);





/***
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
			
			if(window.localStorage.getItem("open")){
				MAIN.isFirstOpen = false;
			}else{
				MAIN.isFirstOpen = true;
				window.localStorage.setItem("open",1);
			}

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

	isStart: true,

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

			if(_this.isStart) {

				_this.isStart = false;

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

				oBgMusic.volume = 0.1;

			}

		}, false);

	},

	createImage: function(num) {

		var oCreateImage = document.querySelector('.canvas-createImage img');

		var oFinish = document.querySelector('.finish');
		oFinish.classList.remove('active');

		//按照分数排等级
		var n = 0;

		if(num < 50) {
			n = 0;
		} else if(num < 100 && num >= 50) {
			n = 1;
		} else if(num < 140 && num >= 100) {
			n = 2;
		} else if(num >= 140) {
			n = 3;
		}

		var H5_url = window.location.href;

		var w = window.innerWidth;
		var h = 800;

		var oCanvas = document.createElement("canvas");
		var ctx = oCanvas.getContext("2d");

		oCanvas.width = w;
		oCanvas.height = h;

		var er_width = 120;
		var er_height = 120;
		var aT = 60;

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

		var createImageData = [{
			textImage: "images/img-70.png",
			yhq: "images/img-75.png"
		}, {
			textImage: "images/img-71.png",
			yhq: "images/img-76.png"
		}, {
			textImage: "images/img-72.png",
			yhq: "images/img-77.png"
		}, {
			textImage: "images/img-73.png",
			yhq: "images/img-78.png"
		}];

		//图片背景
		var bgImage = new Image();
		bgImage.src = "images/img-74.png";
		bgImage.onload = function() {

			ctx.drawImage(bgImage, (w - bgImage.naturalWidth) / 2, 80 - aT);

			//二维码的白底
			ctx.beginPath();
			ctx.fillStyle = "#FFFFFF";
			ctx.fillRect(385, 590, 124, 124 - aT);
			ctx.closePath();

			//绘制二维码
			ctx.drawImage(qrcodeCanvas, 387, 592 - aT, er_width, er_height);

			//扫码参与游戏
			ctx.beginPath();
			ctx.fillStyle = "#333333";
			ctx.font = "18px 微软雅黑";
			ctx.fillText("扫码参与游戏", 392, 735 - aT);
			ctx.closePath();

			//根据用户得分，对应的文案图片
			var userTextImage = new Image();
			userTextImage.src = createImageData[n].textImage;
			userTextImage.onload = function() {

				ctx.drawImage(userTextImage, (w - userTextImage.naturalWidth) / 2, 266 - aT);

				//根据用户得分，对应的文案图片==优惠券
				var userYHQImage = new Image();
				userYHQImage.src = createImageData[n].yhq;
				userYHQImage.onload = function() {

					ctx.drawImage(userYHQImage, 130, 595 - aT);

					//恭喜您获得？？分
					var userScore = new Image();
					userScore.src = "images/img-32.png";
					userScore.onload = function() {

						ctx.drawImage(userScore, (w - userScore.naturalWidth) / 2, 470 - aT);

						//用户分数
						ctx.beginPath();
						ctx.fillStyle = "#F20";
						ctx.font = "32px 微软雅黑";
						ctx.fillText(num, 360, 498 - aT);
						ctx.textAlign = "center";
						ctx.closePath();

						//生成图片
						oCreateImage.src = oCanvas.toDataURL("image/png");

						oFinish.classList.add('active');

					}

				}

			}

		}

		this.onClickAwards(n);

	},

	onClickShare: function() {

		var oShareBottom = document.querySelector('.share-btn');

		var oShareContainer = document.querySelector('.share');

		var oCloseShare = document.querySelector('.share .close');

		oShareBottom.addEventListener('click', function() {

			//fadeIn(oShareContainer);
			window.location.href = 'https://cuxiao.m.suning.com/sanxingday.html'

		}, false);

		oCloseShare.addEventListener('click', function() {

			fadeOut(oShareContainer);

		}, false);

	},

	onClickAwards: function(m) {
		console.log(m);

		var oBottom = document.querySelector('.finish h2');

		var oAwardsContainer = document.querySelector('.awards');

		var oCloseAwards = document.querySelector('.awards .close');

		var aLink = document.querySelectorAll('.awards-info a');

		oBottom.addEventListener('click', function() {

			if(m !== 0) {
console.log(m);
				fadeIn(oAwardsContainer);

			}

		}, false);

		oCloseAwards.addEventListener('click', function() {

			fadeOut(oAwardsContainer);

		}, false);

		var aA = [
			"http://quan.suning.com/lqzx_recommend.do?activityId=201802130002050006&activitySecretKey=9oGRfXDAkGC9lbQNXhFy7f1D",		
			"http://quan.suning.com/lqzx_recommend.do?activityId=201802130002049886&activitySecretKey=98BJ680SE9ZXuo67BEELc2ge",
			"http://quan.suning.com/lqzx_recommend.do?activityId=201802130002049882&activitySecretKey=Peav7XnCaKI13HObzoFPH0Va"			
		];

		if(m !== 0) {

			for(var i = 0; i < aLink.length; i++) {

				if(i === aLink.length - m) {

					aLink[i].classList.add('active');
					aLink[i].href = aA[i];

				} else {

					aLink[i].classList.remove('active');
					aLink[i].href = "javascript:;";

				}

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

	oFailDownMusic: document.querySelector('#fail'),

	oFinish: document.querySelector('.finish'),

	oAgainBottom: document.querySelector('.again-btn'),

	oAddRoSubContainer: document.querySelector('.addRoSub'),

	sumsungGoodsContainer: document.querySelectorAll(".sumsungGoods-container"),

	ketingImages: document.querySelectorAll(".keting img"),

	woshiImages: document.querySelectorAll(".woshi img"),

	yangtaiImages: document.querySelectorAll(".yangtai img"),

	ketingText: document.querySelectorAll(".keting b"),

	woshiText: document.querySelectorAll(".woshi b"),

	yangtaiText: document.querySelectorAll(".yangtai b"),

	level: 0, //当前关卡

	speed: 12,

	isBegin: false, //是否开始下落

	total: 0, //当前分数

	isNext: false, //是否可以点击进入下一关

	q: 5, //加分与减分的比率

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

	bombContainer: new createjs.Container(),

	createRandomArray: function(n, k) { //创建随机数组 n=》当前关卡，k=》加分与减分的比率

		var arr = [];

		var t = mapData[n].add.length + mapData[n].sub.length;

		arr = arr.concat(setAddArray(n));

		for(var i = 0; i < t; i++) {

			var m = parseInt(Math.random() * 10);

			if(n == 3) {

				arr.push(mapData[n].add[parseInt(Math.random() * mapData[n].add.length)]);

			} else {

				if(m <= k) { //加分

					arr.push(mapData[n].add[parseInt(Math.random() * mapData[n].add.length)]);

				} else { //减分

					arr.push(mapData[n].sub[parseInt(Math.random() * mapData[n].sub.length)]);

				}

			}

		}

		//随机排序
		function randomSort(a, b) {

			return Math.random() > 0.5 ? -1 : 1;

		}

		arr.sort(randomSort);

		return arr;

	},

	setLevelArray: function(a, lvl, k) { //创建每一个关卡的数组

		this.aArray.length = 0;

		var arr = [];

		for(var i = 0; i <= a; i++) {

			arr.push(this.createRandomArray(lvl, k));

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

		this.oCanvas.style.backgroundColor = this.bgColor[this.level];

		$('.game').css('background-color', this.bgColor[this.level]);

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
		this.oStage.addChild(this.bombContainer);

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

			if(_this.isNext) {

				_this.isNext = false;

				_this.speed += 4; //12 16 20 24

				console.log(_this.speed);

				_this.q += 0.8;

				fadeOut(_this.oNextContainer);

				if(_this.level == 3) {

					_this.speed = 25;

					_this.setLevelArray(_this.level + 10, _this.level, _this.q);

					$('.showGoods i').hide();

					$('.four').fadeIn();

					setTimeout(function() {

						$('.four').fadeOut();

						_this.onStartCountDown();

					}, 3000);

				} else {

					_this.setLevelArray(_this.level + 2, _this.level, _this.q);

					_this.onStartCountDown();

				}

			}

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

			if(this.aArray[i].product) {

				bitmap.product = this.aArray[i].product;

			}

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

				_this.isNext = true;

				clearInterval(timer);

				//停止计时=》物品容器慢慢淡出
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

						//改变场景左上角的文案
						for(var i = 0; i < _this.aTxt.length; i++) {

							if(i == _this.level) {

								_this.aTxt[_this.level].style.display = "block";

							} else {

								_this.aTxt[i].style.display = "none";

							}

						}

						//改变场景装物品的容器
						for(var i = 0; i < _this.sumsungGoodsContainer.length; i++) {

							if(i == _this.level) {

								fadeIn(_this.sumsungGoodsContainer[i]);

							} else {

								_this.sumsungGoodsContainer[i].style.display = "none";
								_this.sumsungGoodsContainer[i].style.opacity = "0";

							}

						}
						
						if(_this.level == 3){
							
							$('.logo').css("top","26px");
							
							$('.logo img').attr("src","images/img-18-1.png");
						
						}

						//场景背景图片的过度
						var currentChildBgImage = _this.bgContainer.getChildAt(1);

						var tweenBgImage = createjs.Tween.get(currentChildBgImage).to({

							alpha: 1

						}, 400, createjs.Ease.linear).call(function() {

							_this.bgContainer.removeChildAt(0);

						});

						//场景背景色的过度
						var currentChildBgColor = _this.rectColorContainer.getChildAt(1);

						var tweenBgColor = createjs.Tween.get(currentChildBgColor).to({

							alpha: 1

						}, 400, createjs.Ease.linear).call(function() {

							_this.rectColorContainer.removeChildAt(0);

							fadeIn(_this.oNextContainer);

							_this.oCanvas.style.backgroundColor = _this.bgColor[_this.level];

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

					if(this.score == -2) {

						_this.total -= 2;

						_this.setVibrate();

						_this.oFailDownMusic.play();

					} else if(this.score == 1) {

						_this.total += 1;

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

					_this.showImage(_this.level, this.name, this.image.src, this.sumsung, this.image.width, this.image.height, this.product);
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

	showImage: function(lvl, oName, src, sumsung, w, h, txt) { //若点击三星物品，则在框中显示该物品

		if(lvl === 0) {

			if(oName === "product1") {

				this.ketingImages[0].style.transform = "translate(-50%,-50%) scale(0.25)";
				this.ketingImages[0].style.WebkitTransform = "translate(-50%,-50%) scale(0.25)";
				this.ketingImages[0].style.marginTop = "-4px";
				this.ketingImages[0].src = "";
				this.ketingText[0].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.ketingText[0].innerHTML = "";

					_this.ketingImages[0].src = src;

				}, 1000);

			}

			if(oName === "product2") {

				this.ketingImages[0].style.transform = "translate(-50%,-50%) scale(0.25)";
				this.ketingImages[0].style.WebkitTransform = "translate(-50%,-50%) scale(0.25)";
				this.ketingImages[0].style.marginTop = "-4px";
				this.ketingImages[0].src = "";
				this.ketingText[0].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.ketingText[0].innerHTML = "";

					_this.ketingImages[0].src = src;

				}, 1000);

			}

			if(oName === "product5" || oName === "product6") {

				this.ketingImages[1].style.transform = "translate(-50%,-50%) scale(0.32)";
				this.ketingImages[1].style.WebkitTransform = "translate(-50%,-50%) scale(0.32)";
				this.ketingImages[1].style.marginTop = "-10px";
				this.ketingImages[1].src = "";
				this.ketingText[1].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.ketingText[1].innerHTML = "";

					_this.ketingImages[1].src = src;

				}, 1000);

			}

			if(oName === "product7" || oName === "product8") {

				this.ketingImages[2].style.transform = "translate(-50%,-50%) scale(0.32)";
				this.ketingImages[2].style.WebkitTransform = "translate(-50%,-50%) scale(0.32)";
				this.ketingImages[2].style.marginTop = "-10px";
				this.ketingImages[2].src = "";
				this.ketingText[2].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.ketingText[2].innerHTML = "";

					_this.ketingImages[2].src = src;

				}, 1000);

			}

			if(oName === "product9" || oName === "product10") {

				this.ketingImages[2].style.transform = "translate(-50%,-50%) scale(0.32)";
				this.ketingImages[2].style.WebkitTransform = "translate(-50%,-50%) scale(0.32)";
				this.ketingImages[2].style.marginTop = "-10px";
				this.ketingImages[2].src = "";
				this.ketingText[2].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.ketingText[2].innerHTML = "";

					_this.ketingImages[2].src = src;

				}, 1000);

			}

		} else if(lvl === 1) {

			if(oName === "product1") {

				this.woshiImages[0].style.transform = "translate(-50%,-50%) scale(0.25)";
				this.woshiImages[0].style.WebkitTransform = "translate(-50%,-50%) scale(0.25)";
				this.woshiImages[0].style.marginTop = "-4px";
				this.woshiImages[0].src = "";
				this.woshiText[0].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.woshiText[0].innerHTML = "";

					_this.woshiImages[0].src = src;

				}, 1000);

			}

			if(oName === "product2") {

				this.woshiImages[0].style.transform = "translate(-50%,-50%) scale(0.25)";
				this.woshiImages[0].style.WebkitTransform = "translate(-50%,-50%) scale(0.25)";
				this.woshiImages[0].style.marginTop = "-4px";
				this.woshiImages[0].src = "";
				this.woshiText[0].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.woshiText[0].innerHTML = "";

					_this.woshiImages[0].src = src;

				}, 1000);

			}

			if(oName === "product5" || oName === "product6") {

				this.woshiImages[1].style.transform = "translate(-50%,-50%) scale(0.32)";
				this.woshiImages[1].style.WebkitTransform = "translate(-50%,-50%) scale(0.32)";
				this.woshiImages[1].style.marginTop = "-10px";
				this.woshiImages[1].src = "";
				this.woshiText[1].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.woshiText[1].innerHTML = "";

					_this.woshiImages[1].src = src;

				}, 1000);

			}

		} else if(lvl === 2) {

			if(oName === "product3" || oName === "product4") {

				this.yangtaiImages[0].style.transform = "translate(-50%,-50%) scale(0.32)";
				this.yangtaiImages[0].style.WebkitTransform = "translate(-50%,-50%) scale(0.32)";
				this.yangtaiImages[0].style.marginTop = "-10px";
				this.yangtaiImages[0].src = "";
				this.yangtaiText[0].innerHTML = txt;

				var _this = this;

				setTimeout(function() {

					_this.yangtaiText[0].innerHTML = "";

					_this.yangtaiImages[0].src = src;

				}, 1000);

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

	onWindowResize: function() {

		var _this = this;

		window.addEventListener('resize', function() {

			_this.setCanvas();

			_this.nWidth = window.innerWidth;

			_this.nHeight = window.innerHeight;

		}, false);

	},

	onOrientation: function() { //判断手机横竖屏状态：

		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			$('.rotation-hint span img').attr("src", "images/ios.png");
		} else {
			$('.rotation-hint span img').attr("src", "images/android.png");
		}

		window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", function() {

			if(window.orientation == 180 || window.orientation == 0) {

				//document.title = `竖屏状态!`;		
				$('.rotation-hint').hide();

			}
			if(window.orientation == 90 || window.orientation == -90) {

				//document.title = `横屏状态!`;				
				$('.rotation-hint').show();

			}

		}, false);

	},

	init: function() { //初始化

		var _this = this;

		createjs.Touch.enable(this.oStage);

		this.setContainer();

		this.onChangeBackground(0);

		this.setCanvas();

		this.setLevelArray(2, 0, this.q);

		this.aTxt[0].style.display = "block";

		this.playAgain();

		this.createBomb();

		//this.onWindowResize();

		this.onOrientation();

		for(var i = 0; i < this.sumsungGoodsContainer.length; i++) {

			if(i == 0) {

				fadeIn(this.sumsungGoodsContainer[0]);

			} else {

				this.sumsungGoodsContainer[i].style.display = "none";
				this.sumsungGoodsContainer[i].style.opacity = "0";

			}

		}

		createjs.Ticker.addEventListener("tick", function() {

			_this.oStage.update();

			_this.running();

		});

	}

}

GAME.init();