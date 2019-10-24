var app = new Vue({
	el: ".m-main",
	data: {
		isVideo: false, //是否显示播放KV视频弹窗
		videoUrl: null,
		window_height: 0,
		window_width: 0,
		w_scrollTop: 0,
		traitIndex: 0, //高对比快响应准色彩广视角===默认选择的是第一个
		isTraitHeight: false, //对比增强天然黑
		isTraitFast: false, //快速响应无拖尾
		isTraitColour: false, //色彩真实更惊艳
		isTraitWideAngle: false, //超广角
		isInitAnchor: true,
		ratioArray: [
			[50, 50, 65, 65, 0, 30, 30, 70],
			[50, 25, 25, 25, 0, 50, 35, 25],
			[50, 50, 50, 50, 0, 75, 30, 75],
			[50, 50, 50, 50, 0, 50, 50, 50],
			[50, 50, 50, 50, 0, 0, 50, 60],
			[50, 50, 60, 60, 0, 50, 35, 25],
			[50, 30, 30, 30, 0, 50, 50, 50]
		], //AI场景自适应
		ratioIndex: 0, //选择的AI场景
		loadingPoints: 0, //
		wifiActive: false,
		isClickAnchor: false,
		aBox: null,
		imgArray: {
			elevation: [],
			bezel_less: [],
			wideAngle: [],
			voice: [],
			music: [],
			dialogue: []
		},
		isBuyPopus: false,
		isMiniQRCode: false,
		isPhoneNavBtn: false,
		isGoTop: false,
		mouseDirect: false, //true向下滚动 -false向上滚动
		openAnimation: [true, true, true, true, true],
		openIndex: 0,
		openClassNameArr: [".s81-design", ".s81-oled", ".s81-image-quality", ".s81-tone-quality", ".s81-intelligence"],
		oBezel_less: null,
		oDialogue: null,
		isGJActive: false,
		isWeb: true,
	},
	methods: {
		/**
		 * 监听屏幕大小
		 */
		onWindowResize() {
			window.addEventListener("resize", () => {
				this.window_height = window.innerHeight;
				this.window_width = window.innerWidth;
			}, false);
		},
		/**
		 * kv屏，点击播放视频
		 */
		onPlayVideo() {
			var aBtn = document.querySelectorAll(".play-btn i");
			var _this = this;
			for (var i = 0; i < aBtn.length; i++) {
				aBtn[i].index = i;
				aBtn[i].addEventListener("click", function() {
					_this.isVideo = true;
					_this.videoUrl = this.getAttribute("data-videourl");
					setTimeout(function() {
						var oVideo = document.getElementById("kvVideo");
						console.log(oVideo.offsetHeight, _this.window_height)
						if (oVideo.offsetHeight > _this.window_height) {
							oVideo.style.width = "auto";
							oVideo.style.height = "100%";
						} else {
							oVideo.style.width = "100%";
							oVideo.style.height = "auto";
						}
					}, 100);
				}, false);
			}

		},
		/**
		 * kv屏，点击关闭视频
		 */
		onCloseVideo() {
			this.isVideo = false;
		},
		/**
		 * 点击购买，显示购物链接弹窗
		 */
		onClickOpenBuyPopups() {
			this.isBuyPopus = true;
		},
		/**
		 * 点击关闭，隐藏购物链接弹窗
		 */
		onClickCloseBuyPopups() {
			this.isBuyPopus = false;
		},
		/**
		 * 点击创维优品，显示小程序码
		 */
		onClickOpenMiniQRCode() {
			this.isMiniQRCode = true;
		},
		/**
		 * 点击关闭，隐藏小程序码
		 */
		onClickCloseMiniQRCode() {
			this.isMiniQRCode = false;
		},
		/**
		 * 点击打开或者关闭导航子菜单
		 */
		onClickOpenSubNav() {
			this.isPhoneNavBtn = !this.isPhoneNavBtn;
		},
		/**
		 * 监听滚动条
		 */
		onScrollTop() {
			var oNavBox = document.querySelector(".s81-navBox");
			var aBox = document.querySelectorAll(".s81-box");
			var aOpen = document.querySelectorAll(".s81-open");
			var aOpenBG = document.querySelectorAll(".s81-open .s81-open-bg");
			var aOpenText = document.querySelectorAll(".s81-open-text span:nth-child(1)");
			var aOpenCanvas = document.querySelectorAll(".s81-open-text span:nth-child(2)");
			var aAnchor = document.querySelectorAll(".s81-nav a");
			var aFrameCanvas = document.querySelectorAll(".frameCanvas");
			var windowScrollTop = 0;
			var _this = this;
			var index = 0;
			var n = 0;
			var m = 0;
			var v = 0;
			var oPinghua = document.querySelector(".s81-pinghua");
			var oTarget = document.querySelector(".target");
			var oDefinition = document.querySelector(".definition");
			var w = 0;
			var e = 0;
			var r = 0;
			var t = 0;
			var u = 0;
			var oElevationCanvas = document.querySelector(".s81-yangjiao");
			var oBezel_lessCanvas = document.querySelector(".s81-quanmianping");
			var oVoiceCanvas = document.querySelector(".s81-dolby2");
			var oMusicCanvas = document.querySelector(".s81-WonderAudio");
			var oDialogueCanvas = document.querySelector(".s81-dialogue");
			var oDialogueUl = document.querySelector(".s81-dialogue .s81-image");
			var o = 0;
			var oGGP = document.querySelector(".s81-ggp");
			var oGoTop = document.querySelector(".s81-goTop");
			var a = 0;
			var b = 0;
			var oShenWen = document.querySelector(".s81-shengwen");
			var oAIPQ = document.querySelector(".s81-AIPQ"); //1向下滚动 -1向上滚动
			var next = 10;
			var perv = 0;
			var scale = 1.5;
			var q1 = 0;
			var q2 = 0;
			var w1 = 0;
			var w2 = 0;
			var a1 = 0;
			var a2 = 0;
			var b1 = 0;
			var b2 = 0;
			var oWideAnglePoster = document.querySelector(".s81-wideAngle .s81-image");
			var fadeInTimer = null;

			var oBezel_lessY = 0;
			var oBezel_less_canvas = document.getElementById("bezel_less");
			var oBezel_less_text = document.querySelector(".s81-quanmianping .s81-text");
			var _h = 0;
			var n1 = 0;
			var n2 = 0;
			var webS81NavTarget = document.querySelectorAll(".s81-nav-target");

			function setScrollTop() {
				prev = next;
				windowScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
				windowScrollTop = windowScrollTop + oNavBox.offsetHeight;
				next = windowScrollTop;
				if (windowScrollTop < 100) {
					for (var i = 0; i < aBox.length; i++) {
						aBox[i].classList.remove("active");
					}
					oDialogueUl.classList.remove("active");
				}
				if ((next - prev) >= 0) {
					_this.mouseDirect = true;
				} else {
					_this.mouseDirect = false;
				}

				if (windowScrollTop > 200) {
					_this.isGoTop = true;
				} else {
					_this.isGoTop = false;
				}

				for (var i = 0; i < aBox.length; i++) {
					if (_this.mouseDirect) {
						if (windowScrollTop >= (aBox[i].offsetTop + _this.window_height / 2) && windowScrollTop <= (aBox[i].offsetTop +
								_this.window_height + aBox[i].offsetHeight)) {
							if (!aBox[i].classList.contains("active")) {
								aBox[i].classList.add("active");
							}
						} else if (windowScrollTop > (aBox[i].offsetTop + _this.window_height + aBox[i].offsetHeight)) {
							if(_this.isPC()){
								if (aBox[i].classList.contains("active") && !aBox[i].classList.contains("s81-yangjiao")) {
									aBox[i].classList.remove("active");
								}
								if (aBox[i].classList.contains("toDown") && !aBox[i].classList.contains("s81-yangjiao")) {
									aBox[i].classList.remove("toDown");
								}
								if (!aBox[i].classList.contains("on") && !aBox[i].classList.contains("s81-yangjiao")) {
									aBox[i].classList.add("on");
								}
							}else{
								if (aBox[i].classList.contains("active")) {
									aBox[i].classList.remove("active");
								}
								if (aBox[i].classList.contains("toDown")) {
									aBox[i].classList.remove("toDown");
								}
								if (!aBox[i].classList.contains("on")) {
									aBox[i].classList.add("on");
								}
							}
						}
					} else {
						if (windowScrollTop <= (aBox[i].offsetTop + _this.window_height + aBox[i].offsetHeight / 2) && windowScrollTop >=
							aBox[i].offsetTop) {
							if(_this.isPC()){
								if (!aBox[i].classList.contains("toDown") && !aBox[i].classList.contains("s81-yangjiao")) {
									aBox[i].classList.add("toDown");
								}if (!aBox[i].classList.contains("toDown") && !aBox[i].classList.contains("s81-yangjiao")) {
									aBox[i].classList.add("toDown");
								}
							}else{
								if (!aBox[i].classList.contains("toDown")) {
									aBox[i].classList.add("toDown");
								}
							}
						} else if (windowScrollTop < (aBox[i].offsetTop + _this.window_height / 2)) {
							if(_this.isPC()){
								if (aBox[i].classList.contains("on") && !aBox[i].classList.contains("s81-yangjiao")) {
									aBox[i].classList.remove("on");
								}
							}else{
								if (aBox[i].classList.contains("on")) {
									aBox[i].classList.remove("on");
								}
							}
						}
					}
				}
				
				if(_this.isPC()){
					for (var i = 0; i < aOpen.length; i++) {
						if (windowScrollTop > aOpen[i].offsetTop) {
							index = i;
							_this.openIndex = i;
						}
						if (!_this.isClickAnchor) {
							if (_this.mouseDirect) {
								if (windowScrollTop >= (aOpen[i].offsetTop + _this.window_height * 2 / 3) && windowScrollTop < (aOpen[i].offsetTop +
										_this.window_height + aOpen[i].offsetHeight / 2)) {
									if (!aOpen[i].classList.contains("active")) {
										aOpen[i].classList.add("active");
									}
								} else {
									if (aOpen[i].classList.contains("active")) {
										aOpen[i].classList.remove("active");
									}
								}
							} else {
								if (windowScrollTop < (aOpen[i].offsetTop + oNavBox.offsetHeight + _this.window_height) && windowScrollTop >=
									(aOpen[i].offsetTop + aOpen[i].offsetHeight / 2)) {
									if (!aOpen[i].classList.contains("active")) {
										aOpen[i].classList.add("active");
									}
								} else {
									if (aOpen[i].classList.contains("active")) {
										aOpen[i].classList.remove("active");
									}
								}
							}
						}
					}
				}else{
					for (var i = 0; i < webS81NavTarget.length; i++){
						if (windowScrollTop > webS81NavTarget[i].offsetTop) {
							index = i;
							_this.openIndex = i;
						}
					}
				}
				
				if (_this.isInitAnchor) {
					for (var i = 0; i < aOpen.length; i++) {
						if (windowScrollTop >= (aOpen[i].offsetTop + _this.window_height)) {
							if (!aOpen[i].classList.contains("active")) {
								aOpen[i].classList.add("active");
							}
						}
					}
					_this.isInitAnchor = false;
				}
				


				if (_this.mouseDirect) {
					if (windowScrollTop >= (oElevationCanvas.offsetTop + _this.window_height * 2 / 3) && windowScrollTop < (
							oElevationCanvas.offsetTop + _this.window_height + oElevationCanvas.offsetHeight)) {
						if (q1 == 0) {
							_this.setElevation(true);
							q1++;
						}

					} else if (windowScrollTop >= (oElevationCanvas.offsetTop + _this.window_height + oElevationCanvas.offsetHeight)) {
						q1 = 0;
						q2 = 0;
					}
				} else {
					if (windowScrollTop < (oElevationCanvas.offsetTop + oElevationCanvas.offsetTop) && windowScrollTop >= (
							oElevationCanvas.offsetTop + _this.window_height * 2 / 3)) {
						if (q2 == 0) {
							_this.setElevation(false);
							q2++;
						}
					} else if (windowScrollTop < (oElevationCanvas.offsetTop + _this.window_height * 2 / 3)) {
						q1 = 0;
						q2 = 0;
					}
				}


				// 全面屏
				if (_this.window_width >= 1921) {
					_h = oBezel_less_canvas.offsetHeight + _this.window_height / 10;
				} else {
					_h = oBezel_less_canvas.offsetHeight + _this.window_height / 10;
				}
				if (_this.mouseDirect) {
					if (windowScrollTop >= (oBezel_lessCanvas.offsetTop + _h) && windowScrollTop < (oBezel_lessCanvas.offsetTop +
							oBezel_lessCanvas.offsetHeight)) {
						oBezel_lessY = windowScrollTop - (oBezel_lessCanvas.offsetTop + _h);
						oBezel_lessY = oBezel_lessY > 150 ? oBezel_lessY : 150;
						if (_this.isPC()) {
							oBezel_less_canvas.style.transform = "translateY(" + oBezel_lessY + "px)";
							oBezel_less_text.style.transform = "translateY(" + oBezel_lessY + "px)";
							oElevationCanvas.style.transform = "translateY(" + (oBezel_lessY - 150) + "px)";
							var _height = oBezel_lessCanvas.offsetHeight - _h;
							_this.setDrawRunBezel_less(_height, oBezel_lessY)
						}
						if (n1 == 0) {
							oBezel_lessCanvas.classList.add("active");
							n1++;
						}
					} else if (windowScrollTop >= (oBezel_lessCanvas.offsetTop + oBezel_lessCanvas.offsetHeight + _this.window_height *2/3)) {
						n1 = 0;
						n2 = 0;
						oBezel_lessCanvas.classList.remove("active", "toDown");
						oBezel_lessCanvas.classList.add("on");
						oElevationCanvas.classList.remove("active", "toDown");
						oElevationCanvas.classList.add("on");
					}
				} else {
					if (_this.isPC()){
						if (windowScrollTop >= (oBezel_lessCanvas.offsetTop + _h) && windowScrollTop < (oBezel_lessCanvas.offsetTop + oBezel_lessCanvas.offsetHeight)) {
							oBezel_lessY = windowScrollTop - (oBezel_lessCanvas.offsetTop + _h);
							oBezel_lessY = oBezel_lessY > 150 ? oBezel_lessY : 150;
							if (_this.isPC()) {
								oBezel_less_canvas.style.transform = "translateY(" + oBezel_lessY + "px)";
								oBezel_less_text.style.transform = "translateY(" + oBezel_lessY + "px)";
								oElevationCanvas.style.transform = "translateY(" + (oBezel_lessY - 150) + "px)";
								var _height = oBezel_lessCanvas.offsetHeight - _h;
								_this.setDrawRunBezel_less(_height, oBezel_lessY)
							}
							if (n2 == 0) {
								oBezel_lessCanvas.classList.add("toDown");
								n2++;
								oElevationCanvas.classList.add("toDown");
							}
						} else if (windowScrollTop < oBezel_lessCanvas.offsetTop) {
							oBezel_lessCanvas.classList.remove("on");
							oElevationCanvas.classList.remove("on");
							n1 = 0;
							n2 = 0;
						}
					}else{
						if (windowScrollTop <= (oBezel_lessCanvas.offsetTop + oBezel_lessCanvas.offsetHeight+_this.window_height*2/3) && windowScrollTop > (oBezel_lessCanvas.offsetTop)) {
							if (n2 == 0) {
								oBezel_lessCanvas.classList.add("toDown");
								n2++;
							}
						console.log(windowScrollTop , oBezel_lessCanvas.offsetTop, oBezel_lessCanvas.offsetHeight,_this.window_height)
						} else if (windowScrollTop < oBezel_lessCanvas.offsetTop) {
							oBezel_lessCanvas.classList.remove("on");
							n1 = 0;
							n2 = 0;
						}
					}
					
					
				}

				for (var i = 0; i < aAnchor.length; i++) {
					if (i == index) {
						aAnchor[i].classList.add("active");
					} else {
						aAnchor[i].classList.remove("active");
					}
				}
				
				if (n == 0 && windowScrollTop > (oPinghua.offsetTop + _this.window_height / 2)) {
					_this.setDragImageSlide(".s81-pinghua");
					n++;
				}
				if (m == 0 && windowScrollTop > (oTarget.offsetTop + _this.window_height / 2)) {
					_this.setDragImageSlide(".target");
					m++;
				}
				if (v == 0 && windowScrollTop > (oDefinition.offsetTop + _this.window_height / 2)) {
					_this.setDragImageSlide(".definition");
					v++;
				}
				if (a == 0 && windowScrollTop > (oAIPQ.offsetTop + _this.window_height / 2)) {
					_this.setAIPQ();
					a++;
				}
				if (b == 0 && windowScrollTop > (oShenWen.offsetTop + _this.window_height / 2)) {
					_this.setVoiceprintRecognition();
					b++;
				}

				if (r == 0 && windowScrollTop > (oVoiceCanvas.offsetTop + _this.window_height)) {
					
					r++;
				}
				if (t == 0 && windowScrollTop > (oMusicCanvas.offsetTop + _this.window_height / 2) && _this.imgArray.music.length >
					0) {
					_this.setPlayFrame(".s81-WonderAudio", "music", _this.imgArray.music, true);
					t++;
				}
				if (u == 0 && windowScrollTop > (oDialogueCanvas.offsetTop + _this.window_height)) {
					_this.setRunningDrawLine(_this.oDialogue.ctx, _this.oDialogue.w, _this.oDialogue.h, _this.oDialogue.oImg);
					oDialogueUl.classList.add("active");
					u++;
				}
				if (o == 0 && windowScrollTop > oGGP.offsetTop + _this.window_height / 2) {
					_this.setLoadingPoint();
					o++;
				}
				if (windowScrollTop < 10) {
					for (var j = 0; j < aAnchor.length; j++) {
						if (j == 0) {
							aAnchor[0].classList.add("active");
						} else {
							aAnchor[j].classList.remove("active");
						}
					}
				}
			}

			setScrollTop();

			window.addEventListener("scroll", () => {
				setScrollTop();
				_this.isClickAnchor = false;
			}, false);

		},
		/**
		 * 判断是PC端还是手机端
		 */
		isPC() {
			var userAgentInfo = navigator.userAgent;
			var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
			var flag = true;
			for (var i = 0; i < Agents.length; i++) {
				if (userAgentInfo.indexOf(Agents[i]) > 0) {
					flag = false;
					break;
				}
			}
			return flag;
		},
		/**
		 * 点击返回顶部
		 */
		onClickGoTop() {
			var oGoTop = document.querySelector(".s81-goTop");
			var iTimer;
			var heightTop;
			var h = 0;
			var w_height = document.querySelector("body").offsetHeight;
			oGoTop.addEventListener("click", function() {
				var iSpeed = 0;
				heightTop = document.documentElement.scrollTop || document.body.scrollTop;
				h = heightTop;
				animate();
				window.cancelAnimationFrame(iTimer);
			}, false);

			function animate() {
				heightTop -= h * 50 / w_height;
				document.body.scrollTop = heightTop;
				document.documentElement.scrollTop = heightTop;
				iTimer = window.requestAnimationFrame(animate);
				if (heightTop < 0) {
					window.cancelAnimationFrame(iTimer);
				}
			}
		},
		/**
		 * 判断是否点击了顶部的锚点
		 */
		onClickAnchor() {
			var aAnchor = document.querySelectorAll(".s81-nav a");
			var aOpen = document.querySelectorAll(".s81-open");
			
			var _this = this;
			for (var i = 0; i < aAnchor.length; i++) {
				aAnchor[i].index = i;
				aAnchor[i].addEventListener("click", function() {
					_this.isClickAnchor = true;
					_this.isPhoneNavBtn = false
					for (var j = 0; j < aAnchor.length; j++) {
						if (j == this.index) {
							aAnchor[j].classList.add("active");
							if (!aOpen[j].classList.contains("active")) {
								aOpen[j].classList.add("active");
							}
						} else {
							aAnchor[j].classList.remove("active");
							if (aOpen[j].classList.contains("active")) {
								aOpen[j].classList.remove("active");
							}
						}
					}
				}, false);
			}
		},
		/**
		 * @param {className} obj
		 * 监听开篇文字动画结束执行画线
		 */
		onTransitionend(obj) {
			var oText = document.querySelector(obj + " .s81-open-bg");
			var oTarget = document.querySelector(obj);

			oText.addEventListener("transitionend", () => {
				if (this.openAnimation[this.openIndex]) {
					this.openAnimation[this.openIndex] = false;
				}

			}, false);

		},
		/**
		 * @param {className} obj
		 * isRunning
		 * 绘制开篇线条
		 */
		setDrawLine(obj, isRunning = false) {
			var oCanvas = document.querySelector(obj + " .drawLine");
			var oBox = document.querySelector(obj + " .s81-open-text span:nth-child(2)");
			var w2 = oBox.offsetWidth;
			var w = w2 - 1;
			var h2 = oBox.offsetHeight;
			var h = h2 - 1;
			oCanvas.width = w;
			oCanvas.height = h2;
			var ctx = oCanvas.getContext("2d");
			var point = [{
				x: 0,
				y: h * 1 / 5
			}, {
				x: 0,
				y: 0
			}, {
				x: w,
				y: 0
			}, {
				x: w,
				y: h
			}, {
				x: 0,
				y: h
			}, {
				x: 0,
				y: h * 4 / 5
			}];
			ctx.strokeStyle = "#fff";
			ctx.lineWidth = 2;

			var n = 0;
			var x = point[0].x;
			var y = point[0].y;
			var timer = null;
			var s = 6;

			ctx.clearRect(0, 0, w, h);

			function noAnimte() {
				ctx.clearRect(0, 0, w, h);
				ctx.beginPath();
				ctx.moveTo(point[0].x, point[0].y);
				ctx.lineTo(point[1].x, point[1].y);
				ctx.lineTo(point[2].x, point[2].y);
				ctx.lineTo(point[3].x, point[3].y);
				ctx.lineTo(point[4].x, point[4].y);
				ctx.lineTo(point[5].x, point[5].y);
				ctx.stroke();
				ctx.closePath();
			}

			function animate() {
				timer = window.requestAnimationFrame(animate);

				if (n === 0) {
					ctx.moveTo(point[0].x, point[0].y);
					if (y <= 0 && x == 0) {
						n = 1;
						y = 0;
					} else {
						y -= s;
					}
					ctx.lineTo(x, y);
				} else if (n === 1) {
					if (x >= w && y == 0) {
						n = 2;
						x = w;
					} else {
						x += s;
					}
					ctx.lineTo(x, y);
				} else if (n === 2) {
					if (y >= h && x == w) {
						n = 3;
						y = h;
					} else {
						y += s;
					}
					ctx.lineTo(x, y);
				} else if (n === 3) {
					if (x <= 0 && y == h) {
						n = 4;
						x = 0;
					} else {
						x -= s;
					}
					ctx.lineTo(x, y);
				} else if (n === 4) {
					if (y <= h * 4 / 5 && x == 0) {
						n = 5;
						y = h * 4 / 5;
					} else {
						y -= s;
					}
					ctx.lineTo(x, y);
				} else if (n === 5) {
					window.cancelAnimationFrame(timer);
				}
				ctx.stroke();
			}

			if (isRunning) {
				animate();
			}
		},
		/**
		 * 高对比快响应准色彩广视角
		 * 点击对应的显示对应弹窗
		 */
		onClickTrait() {
			var aLi = document.querySelectorAll(".s81-trait ul li");
			var _this = this;
			var timer = null;
			for (var i = 0; i < aLi.length; i++) {
				aLi[i].index = i;
				aLi[i].addEventListener("click", function() {
					if (this.index === 0) {
						_this.isTraitHeight = true;
					} else if (this.index === 1) {
						_this.isTraitFast = true;
					} else if (this.index === 2) {
						_this.isTraitColour = true;
					} else {
						_this.isTraitWideAngle = true;
						setTimeout(function() {
							_this.isGJActive = true;
						}, 1300);
					}
					timer = setTimeout(function() {
						clearTimeout(timer);
						var box = document.querySelectorAll(".s81-fixed");
						box[0].classList.remove("active");
						box[0].classList.add("active");
					}, 300);
				}, false);
			}
		},
		/**
		 * 关闭高对比快响应准色彩广视角
		 */
		onClickCloseTrait() {
			this.isTraitHeight = false;
			this.isTraitFast = false;
			this.isTraitColour = false;
			this.isTraitWideAngle = false;
			this.isGJActive = false;
		},
		/**
		 * @param {class} obj
		 * 按住拖拽点左右滑动
		 */
		setDragImageSlide(obj) {
			var oTarget = document.querySelector(obj);
			var oDrageBox = document.querySelector(obj + " .s81-image span:nth-child(3)");
			var oImgBox = document.querySelector(obj + " .s81-image span:nth-child(2)");
			var oContainer = document.querySelector(obj + " .s81-image");
			var w = oContainer.offsetWidth;
			var oBtn = document.querySelector(obj + " .s81-image span:nth-child(3) i");
			var oImage1 = document.querySelector(obj + " .s81-image span:nth-child(1) img");
			var oImage2 = document.querySelector(obj + " .s81-image span:nth-child(2) img");
			var timer = null;
			var x = 0;
			var direct = 1;
			var n = 0;
			var isMove = false;
			var startX = 0;
			var moveX = 0;
			var endX = 0;
			var tx = 0;
			oImage1.style.width = w + "px";
			oImage2.style.width = w + "px";
			clearInterval(timer);
			timer = setInterval(function() {
				if (n < 2) {
					if (direct === 1) {
						x += 2;
					} else if (direct === -1) {
						x -= 2;
					}
					if (x >= (w / 2 - oDrageBox.offsetWidth / 2)) {
						direct = -1;
						n++;
					} else if (x <= -(w / 2 - oDrageBox.offsetWidth / 2)) {
						direct = 1;
						n++;
					}
				} else {
					if (x >= 0) {
						clearInterval(timer);
					} else {
						x+=2;
					}
				}
				oDrageBox.style.transform = "translateX(" + (x - oDrageBox.offsetWidth / 2) + "px)";
				oImgBox.style.width = (w / 2 - x) + "px";
			}, 10);

			if (this.isPC()) {
				oBtn.addEventListener("mousedown", function(e) {
					isMove = true;
					startX = e.clientX - endX;
					clearInterval(timer);
				}, false);
				oContainer.addEventListener("mousemove", function(e) {
					if (isMove) {
						moveX = e.clientX - startX;
						tx = moveX - oDrageBox.offsetWidth / 2;
						if (tx < (w / 2 - oDrageBox.offsetWidth) && tx > (-w / 2)) {
							oDrageBox.style.transform = "translateX(" + (moveX - oDrageBox.offsetWidth / 2) + "px)";
							oImgBox.style.width = (w / 2 - moveX) + "px";
						}
					}
				}, false);
				oContainer.addEventListener("mouseup", function(e) {
					isMove = false;
					endX = moveX;
				}, false);
				oBtn.addEventListener("mouseup", function(e) {
					isMove = false;
					endX = moveX;
				}, false);
				oContainer.addEventListener("mouseleave", function(e) {
					isMove = false;
					endX = moveX;
				}, false);
			} else {
				oBtn.addEventListener("touchstart", function(e) {
					isMove = true;
					startX = e.touches[0].clientX - endX;
					clearInterval(timer);
				}, false);
				oContainer.addEventListener("touchmove", function(e) {
					if (isMove) {
						moveX = e.touches[0].clientX - startX;
						tx = moveX - oDrageBox.offsetWidth / 2;
						if (tx < (w / 2 - oDrageBox.offsetWidth) && tx > (-w / 2)) {
							oDrageBox.style.transform = "translateX(" + (moveX - oDrageBox.offsetWidth / 2) + "px)";
							oImgBox.style.width = (w / 2 - moveX) + "px";
						}
					}
				}, false);
				oContainer.addEventListener("touchend", function(e) {
					isMove = false;
					endX = moveX;
				}, false);
				oBtn.addEventListener("touchend", function(e) {
					isMove = false;
					endX = moveX;
				}, false);
			}

			window.addEventListener("resize", function() {
				w = oContainer.offsetWidth;
				oImage1.style.width = w + "px";
				oImage2.style.width = w + "px";
				tx = moveX - oDrageBox.offsetWidth / 2;
				if (tx < (w / 2 - oDrageBox.offsetWidth) && tx > (-w / 2)) {
					oDrageBox.style.transform = "translateX(" + (moveX - oDrageBox.offsetWidth / 2) + "px)";
					oImgBox.style.width = (w / 2 - moveX) + "px";
				}
			}, false);
		},
		/**
		 * AI场景自适应
		 * 定时轮播
		 */
		setAIPQ() {
			var aClassifyLi = document.querySelectorAll(".s81-movie-classify ul li");
			var aPosterLi = document.querySelectorAll(".s81-movie-poster ul li");
			var _this = this;
			var timer = null;
			var index = _this.ratioIndex;
			for (var i = 0; i < aClassifyLi.length; i++) {
				aClassifyLi[i].index = i;
				aClassifyLi[i].addEventListener("click", function() {
					_this.ratioIndex = this.index;
					index = _this.ratioIndex;
					for (var j = 0; j < aClassifyLi.length; j++) {
						if (j == this.index) {
							aClassifyLi[j].classList.add("active");
							aPosterLi[j].classList.add("active");
						} else {
							aClassifyLi[j].classList.remove("active");
							aPosterLi[j].classList.remove("active");
						}
					}
					clearInterval(timer);
					onSetInterval();
				}, false);
			}
			onSetInterval();

			function onSetInterval() {
				timer = setInterval(function() {
					if (index >= aClassifyLi.length - 1) {
						index = 0;
					} else {
						index++;
					}
					_this.ratioIndex = index;
					for (var i = 0; i < aClassifyLi.length; i++) {
						if (i === index) {
							aClassifyLi[i].classList.add("active");
							aPosterLi[i].classList.add("active");
						} else {
							aClassifyLi[i].classList.remove("active");
							aPosterLi[i].classList.remove("active");
						}
					}
				}, 2000);
			}
		},
		/**
		 * 声纹识别
		 */
		setVoiceprintRecognition() {
			var aBtnLi = document.querySelectorAll(".s81-shengwen .s81-text ul li");
			var aPosterLi = document.querySelectorAll(".s81-shengwen .s81-image ul li");
			var _this = this;
			var timer = null;
			var index = 0;
			for (var i = 0; i < aBtnLi.length; i++) {
				aBtnLi[i].index = i;
				aBtnLi[i].addEventListener("click", function() {
					index = this.index;
					for (var j = 0; j < aBtnLi.length; j++) {
						if (j == this.index) {
							aBtnLi[j].classList.add("active");
							aPosterLi[j].classList.add("active");
						} else {
							aBtnLi[j].classList.remove("active");
							aPosterLi[j].classList.remove("active");
						}
					}
					clearInterval(timer);
					onSetInterval();
				}, false);
			}
			onSetInterval();

			function onSetInterval() {
				timer = setInterval(function() {
					if (index >= aBtnLi.length - 1) {
						index = 0;
					} else {
						index++;
					}
					for (var i = 0; i < aBtnLi.length; i++) {
						if (i === index) {
							aBtnLi[i].classList.add("active");
							aPosterLi[i].classList.add("active");
						} else {
							aBtnLi[i].classList.remove("active");
							aPosterLi[i].classList.remove("active");
						}
					}
				}, 3000);
			}
		},
		/**
		 *  小维智联 智控万物
		 */
		setPointRun() {
			var oCanvas = document.getElementById("mycanvas");
			var oImg = document.getElementById("img");
			var oPoint = document.getElementById("point");
			var w_width = window.innerWidth;
			var w = 1920;
			var h = 570;

			oCanvas.width = w;
			oCanvas.height = h;

			var ctx = oCanvas.getContext("2d");

			let pointOrigin = [
				[{
					x: 144,
					y: 372
				}, {
					x: 0,
					y: 266
				}],
				[{
					x: 514,
					y: 72
				}, {
					x: 358,
					y: 206
				}],
				[{
					x: 482,
					y: 344
				}, {
					x: 236,
					y: 450
				}],
				[{
					x: 482,
					y: 344
				}, {
					x: 392,
					y: 308
				}],
				[{
					x: 810,
					y: 260
				}, {
					x: 586,
					y: 76
				}],
				[{
					x: 734,
					y: 300
				}, {
					x: 612,
					y: 366
				}],
				[{
					x: 1148,
					y: 266
				}, {
					x: 1306,
					y: 134
				}],
				[{
					x: 1400,
					y: 110
				}, {
					x: 1548,
					y: 200
				}],
				[{
					x: 1422,
					y: 314
				}, {
					x: 1548,
					y: 200
				}],
				[{
					x: 1578,
					y: 146
				}, {
					x: 1730,
					y: 40
				}],
				[{
					x: 1582,
					y: 220
				}, {
					x: 1692,
					y: 328
				}],
				[{
					x: 1764,
					y: 308
				}, {
					x: 1920,
					y: 222
				}]
			];
			let point = [];
			let disArr = [];
			for (let i = 0; i < pointOrigin.length; i++) {
				point.push(JSON.parse(JSON.stringify(pointOrigin[i]))[0]);
				disArr.push(Math.max(Math.abs(pointOrigin[i][0].x - pointOrigin[i][1].x), Math.abs(pointOrigin[i][0].y -
					pointOrigin[i][1].y)));
			}

			/**
			 * @param {array} pointOrigin 	默认起始结束的坐标
			 * @param {array} point 		点运动的坐标
			 * @param {number} d			起始结束的坐标=>x或者y的最大距离
			 */
			function draw(pointOrigin, point, d) {
				if ((pointOrigin[0].x - pointOrigin[1].x) <= 0) {
					if (point.x > pointOrigin[1].x) {
						point.x = pointOrigin[0].x;
						point.y = pointOrigin[0].y;
					}
					point.x += Math.abs(pointOrigin[0].x - pointOrigin[1].x) / d * 2;
				} else {
					if (point.x < pointOrigin[1].x) {
						point.x = pointOrigin[0].x;
						point.y = pointOrigin[0].y;
					}
					point.x -= Math.abs(pointOrigin[0].x - pointOrigin[1].x) / d * 2;
				}
				if ((pointOrigin[0].y - pointOrigin[1].y) <= 0) {
					if (point.y > pointOrigin[1].y) {
						point.x = pointOrigin[0].x;
						point.y = pointOrigin[0].y;
					}
					point.y += Math.abs(pointOrigin[0].y - pointOrigin[1].y) / d * 2;

				} else {
					if (point.y < pointOrigin[1].y) {
						point.x = pointOrigin[0].x;
						point.y = pointOrigin[0].y;
					}
					point.y -= Math.abs(pointOrigin[0].y - pointOrigin[1].y) / d * 2;
				}

				ctx.beginPath();
				ctx.strokeStyle = "#08f3f3";
				ctx.lineWidth = 2;
				ctx.moveTo(pointOrigin[0].x, pointOrigin[0].y);
				ctx.lineTo(pointOrigin[1].x, pointOrigin[1].y);
				ctx.stroke();
				ctx.closePath();
				ctx.save();
				ctx.beginPath();
				ctx.drawImage(oPoint, point.x - 10, point.y - 10);
				ctx.closePath();
				ctx.restore();
			}

			/**
			 * 执行requestAnimationFrame
			 */
			function animate() {
				ctx.clearRect(0, 0, w, h);
				for (let i = 0; i < pointOrigin.length; i++) {
					draw(pointOrigin[i], point[i], disArr[i]);
				}
				ctx.drawImage(oImg, 0, 0);

				window.requestAnimationFrame(animate);
			}
			animate();

			window.addEventListener("resize", function() {
				w_width = window.innerWidth;
				h2 = w_width * h / w;
				oCanvas.style.height = h2 + "px";
			}, false);

		},
		/**
		 * TrensAI AOD 息屏显示 定时轮播图
		 */
		setTrensAIAODSilde() {
			var aLi = document.querySelectorAll(".s81-TrensAI-AOD .s81-image ul li");
			var timer = null;
			var index = 0;
			timer = setInterval(function() {
				if (index >= aLi.length - 1) {
					index = 0;
				} else {
					index++;
				}
				for (var i = 0; i < aLi.length; i++) {
					if (i === index) {
						aLi[i].classList.add("active");
					} else {
						aLi[i].classList.remove("active");
					}
				}
			}, 3000);
		},
		/**
		 * loading 3个点动画
		 */
		setLoadingPoint() {
			var timer = null;
			var index = 1;
			var n = 0;
			timer = setInterval(() => {
				if (index >= 3) {
					n++;
					if (n >= 2) {
						//clearInterval(timer);
						this.wifiActive = true;
					} else {
						//index = 1;
					}
					index = 1;
				} else {
					index++;
				}
				this.loadingPoints = index;
			}, 500);
		},
		/**
		 * @param {Object} num 图片数量
		 * @param {Object} url 图片地址
		 * @param {Object} format 图片格式
		 * @param {Object} arr 装载图片数组
		 */
		setImageLoader(num, url, format, arr) {
			var loader = new window.PxLoader();
			var imageArr = [];
			var _this = this;
			for (var i = 1; i <= num; i++) {
				imageArr.push(loader.addImage("images/frame/" + url + i + format));
			}
			loader.addProgressListener(function(e) {
				var percent = Math.round((e.completedCount / e.totalCount) * 100);
			});
			loader.addCompletionListener(function(e) {
				_this.imgArray[arr].push(imageArr);
			});
			loader.start();
		},
		/**
		 * @param {Object} className
		 * @param {Object} id canva id
		 * @param {Object} imgArr 图片
		 * @param {Object} num 图片数量
		 * @param {Object} loop 是否循环
		 * 序列帧
		 */
		setPlayFrame(className, id, imgArr, loop, fn = function() {}) {
			var oBox = document.querySelector(className + " .s81-image");
			var oPosterImage = document.querySelector(className + " .s81-image .poster-image");
			var oCanvas = document.getElementById(id);
			var ctx = oCanvas.getContext("2d");
			var w = oBox.offsetWidth;
			var h = oBox.offsetHeight;
			oCanvas.width = w;
			oCanvas.height = h;
			var imageArr = Array.from(imgArr[0]);
			var timer = null;
			var n = 0;
			var LastTime = 0;
			var setFTP = 72;

			oPosterImage.style.opacity = 0;

			function animate() {
				var dtNow = Date.now();
				timer = window.requestAnimationFrame(animate);
				if (dtNow - LastTime >= setFTP) {
					ctx.clearRect(0, 0, w, h);
					ctx.drawImage(imageArr[n], 0, 0, w, h);
					if (n >= imageArr.length - 1) {
						if (loop) {
							n = 0;
						} else {
							window.cancelAnimationFrame(timer);
						}
					} else {
						n++;
					}
					LastTime = dtNow;
				}
				fn(timer);
			}
			animate();
		},
		/**5°健康仰角设计
		 * @param {Object} rotateDirection 旋转方向，逆时针/顺时针
		 */
		setElevation(rotateDirection) {
			var oBox = document.querySelector(".s81-yangjiao .s81-image");
			var oImg1 = document.querySelector(".s81-yangjiao .poster-image img:nth-child(1)");
			var oImg2 = document.querySelector(".s81-yangjiao .poster-image img:nth-child(2)");
			var oCanvas = document.getElementById("elevation");
			var ctx = oCanvas.getContext("2d");
			var w = 520;
			var h = 1000;
			oCanvas.width = w;
			oCanvas.height = h;
			var timer = null;
			var angle = 0;

			window.cancelAnimationFrame(timer);
			oImg1.style.opacity = 0;
			oImg2.style.opacity = 0;
			if (rotateDirection) {
				angle = 0;
				clockwiseAnimate();
			} else {
				angle = 0;
				anticlockwiseAnimate();
			}

			function clockwiseAnimate() {
				timer = window.requestAnimationFrame(clockwiseAnimate);
				ctx.clearRect(0, 0, w, h);
				ctx.beginPath();
				ctx.drawImage(oImg1, 0, 0, w, h);
				ctx.save();
				ctx.translate(w / 2, h);
				if (angle >= 3.5) {
					angle = 3.5;
					window.cancelAnimationFrame(timer);
				} else {
					angle += 0.04;
				}
				ctx.rotate(angle * Math.PI / 180);
				ctx.drawImage(oImg2, -w / 2, -h, w, h);
				ctx.restore();
				ctx.closePath();
			}

			function anticlockwiseAnimate() {
				timer = window.requestAnimationFrame(anticlockwiseAnimate);
				ctx.clearRect(0, 0, w, h);
				ctx.beginPath();
				ctx.drawImage(oImg1, 0, 0, w, h);
				ctx.save();
				ctx.translate(w / 2, h);
				if (angle <= 0) {
					angle = 0;
					window.cancelAnimationFrame(timer);
				} else {
					angle -= 0.04;
				}
				ctx.rotate(angle * Math.PI / 180);
				ctx.drawImage(oImg2, -w / 2, -h, w, h);
				ctx.restore();
				ctx.closePath();
			}
		},
		/**
		 * 悬浮全面屏
		 */
		setBezel_less() {
			this.w_scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
			var oElevationCanvas = document.querySelector(".s81-yangjiao");
			var oBezel_lessCanvas = document.querySelector(".s81-quanmianping");
			var oBezel_less_canvas = document.getElementById("bezel_less");
			var oBezel_less_text = document.querySelector(".s81-quanmianping .s81-text");
			var oCanvas = document.getElementById("bezel_less");
			var ctx = oCanvas.getContext("2d");
			var w = 1920;
			var h = 997;
			oCanvas.width = w;
			oCanvas.height = h;
			var timer = null;
			var angle = 0;
			var oImg1 = document.querySelector(".s81-quanmianping .poster-image img:nth-child(1)");
			var oImg2 = document.querySelector(".s81-quanmianping .poster-image img:nth-child(2)");
			var oImg3 = document.querySelector(".s81-quanmianping .poster-image img:nth-child(3)");
			oImg1.style.opacity = 0;
			var y = 0;
			var scale = 1.3;
			if (this.isPC()) {
				if (this.w_scrollTop >= (oBezel_lessCanvas.offsetTop + oBezel_less_canvas.offsetHeight + this.window_height / 10) &&
					this.w_scrollTop < (oBezel_lessCanvas.offsetTop + oBezel_lessCanvas.offsetHeight)) {
					y = (this.w_scrollTop - (oBezel_lessCanvas.offsetTop + oBezel_less_canvas.offsetHeight + this.window_height / 10)) /
						3;
				} else if (this.w_scrollTop >= (oBezel_lessCanvas.offsetTop + oBezel_lessCanvas.offsetHeight)) {
					y = 0;
				} else {
					y = (oBezel_lessCanvas.offsetHeight - oBezel_less_canvas.offsetHeight - this.window_height / 10) / 3;
				}
			} else {
				y = 0;
				scale = 1;
			}


			ctx.clearRect(0, 0, w, h);

			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.scale(scale, scale);
			ctx.drawImage(oImg1, 0 - w / 2, y - h / 2, w, h);
			ctx.restore();

			ctx.beginPath();
			ctx.save();
			ctx.save();
			ctx.beginPath();
			ctx.transform(1, -0.39, 0, 1, -130, 580 + y);
			ctx.rect(0, y, 1100, 900);
			ctx.closePath();
			//ctx.fill();
			ctx.restore();
			ctx.clip();
			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.scale(scale, scale);
			ctx.drawImage(oImg2, 0 - w / 2, y - h / 2, w, h);
			ctx.restore();
			ctx.restore();

			ctx.closePath();
			ctx.drawImage(oImg3, 0, y * 2, w, h);

			this.oBezel_less = {
				ctx,
				oImg1,
				oImg2,
				oImg3,
				w,
				h,
				y,
				scale
			};
			var oBezel_lessY = 0;
			if (this.isPC()) {
				if (this.w_scrollTop >= (oBezel_lessCanvas.offsetTop + oBezel_less_canvas.offsetHeight + this.window_height / 10) &&
					this.w_scrollTop < (oBezel_lessCanvas.offsetTop + oBezel_lessCanvas.offsetHeight)) {
					oBezel_lessY = this.w_scrollTop - (oBezel_lessCanvas.offsetTop + oBezel_less_canvas.offsetHeight + this.window_height /
						10);
				} else if (this.w_scrollTop >= (oBezel_lessCanvas.offsetTop + oBezel_lessCanvas.offsetHeight)) {
					oBezel_lessY = oBezel_lessCanvas.offsetHeight - oBezel_less_canvas.offsetHeight - this.window_height / 10;
				} else {
					oBezel_lessY = 0;
				}
				oBezel_lessY = oBezel_lessY > 150 ? oBezel_lessY : 150;
			} else {
				oBezel_lessY = 0;
			}
			oBezel_less_canvas.style.transform = "translateY(" + oBezel_lessY + "px)";
			oBezel_less_text.style.transform = "translateY(" + oBezel_lessY + "px)";
		},
		/**
		 * 
		 */
		setDrawRunBezel_less(height, translateY) {
			this.oBezel_less.y = (height - translateY) / 3;
			this.oBezel_less.scale = 0;
			this.oBezel_less.scale = (height - translateY) / (height) + 1;
			var ctx = this.oBezel_less.ctx;
			var w = this.oBezel_less.w;
			var h = this.oBezel_less.h;
			var angle = 0;
			var oImg1 = this.oBezel_less.oImg1;
			var oImg2 = this.oBezel_less.oImg2;
			var oImg3 = this.oBezel_less.oImg3;
			var y = this.oBezel_less.y;
			var scale = this.oBezel_less.scale;
			ctx.clearRect(0, 0, w, h);

			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.scale(scale, scale);
			ctx.drawImage(oImg1, 0 - w / 2, y - h / 2, w, h);
			ctx.restore();

			ctx.beginPath();
			ctx.save();
			ctx.save();
			ctx.beginPath();
			ctx.transform(1, -0.39, 0, 1, -130, 580 + y);
			ctx.rect(0, y, 1100, 900);
			ctx.closePath();
			ctx.restore();
			ctx.clip();
			ctx.save();
			ctx.translate(w / 2, h / 2);
			ctx.scale(scale, scale);
			ctx.drawImage(oImg2, 0 - w / 2, y - h / 2, w, h);
			ctx.restore();
			ctx.restore();

			ctx.closePath();
			ctx.drawImage(oImg3, 0, y * 2, w, h);


		},
		/**
		 * 对话
		 */
		setDrawArcLine() {
			var oCanvas = document.getElementById("dialogue");
			var img = document.querySelector(".s81-dialogue .s81-image .poster-image img");
			var w = 400;
			var h = 400;
			var ctx = oCanvas.getContext("2d");
			oCanvas.width = w;
			oCanvas.height = h;

			var oImg = new Image();
			oImg.src = "images/PC/s81-dialogue.png";
			oImg.onload = function() {
				img.style.opacity = 0;
			}
			return {
				ctx,
				w,
				h,
				oImg
			};
		},
		/**
		 * 
		 */
		setRunningDrawLine(ctx, w, h, oImg, fn = function() {}) {
			var x = w / 2;
			var y = h / 2;
			var r = 0;
			var r2 = 50;
			var r3 = 100;
			var r4 = 150;
			var r5 = 200;

			var maxR = w / 2;
			ctx.lineWidth = 2;
			var startS = 2;
			var s1 = startS;
			var s2 = startS;
			var s3 = startS;
			var s4 = startS;
			var s5 = startS;
			var speed = 1;
			var t = 150;
			var timer = null;

			function drawArc() {
				timer = window.requestAnimationFrame(drawArc);
				ctx.clearRect(0, 0, w, h);
				ctx.save();
				ctx.beginPath();
				var grd = ctx.createLinearGradient(0, 0, w, h);
				if (r >= t) {
					grd.addColorStop(0.2, "rgba(206,22,190," + (1 - (r - t) / (maxR - t)) + ")");
					grd.addColorStop(0.8, "rgba(0,161,198," + (1 - (r - t) / (maxR - t)) + ")");
				} else {
					grd.addColorStop(0.2, "rgba(206,22,190,1)");
					grd.addColorStop(0.8, "rgba(0,161,198,1)");
				}

				ctx.strokeStyle = grd;
				if (r >= maxR) {
					r = 0;
					s1 = startS;
				} else {
					s1 = s1 * speed;
					r += s1;
				}
				ctx.arc(x, y, r, 0, Math.PI * 2);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();

				ctx.save();
				ctx.beginPath();
				var grd2 = ctx.createLinearGradient(0, 0, w, h);
				if (r2 > t) {
					grd2.addColorStop(0.2, "rgba(206,22,190," + (1 - (r2 - t) / (maxR - t)) + ")");
					grd2.addColorStop(0.8, "rgba(0,161,198," + (1 - (r2 - t) / (maxR - t)) + ")");
				} else {
					grd2.addColorStop(0.2, "rgba(206,22,190,1)");
					grd2.addColorStop(0.8, "rgba(0,161,198,1)");
				}
				ctx.strokeStyle = grd2;
				if (r2 >= maxR) {
					r2 = 0;
					s2 = startS;
				} else {
					s2 = s2 * speed;
					r2 += s2;
				}
				ctx.arc(x, y, r2, 0, Math.PI * 2);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();

				ctx.save();
				ctx.beginPath();
				var grd3 = ctx.createLinearGradient(0, 0, w, h);
				if (r3 > t) {
					grd3.addColorStop(0.2, "rgba(206,22,190," + (1 - (r3 - t) / (maxR - t)) + ")");
					grd3.addColorStop(0.8, "rgba(0,161,198," + (1 - (r3 - t) / (maxR - t)) + ")");
				} else {
					grd3.addColorStop(0.2, "rgba(206,22,190,1)");
					grd3.addColorStop(0.8, "rgba(0,161,198,1)");
				}
				ctx.strokeStyle = grd3;
				if (r3 >= maxR) {
					r3 = 0;
					s3 = startS;
				} else {
					s3 = s3 * speed;
					r3 += s3;
				}
				ctx.arc(x, y, r3, 0, Math.PI * 2);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();

				ctx.save();
				ctx.beginPath();
				var grd4 = ctx.createLinearGradient(0, 0, w, h);
				if (r4 > t) {
					grd4.addColorStop(0.2, "rgba(206,22,190," + (1 - (r4 - t) / (maxR - t)) + ")");
					grd4.addColorStop(0.8, "rgba(0,161,198," + (1 - (r4 - t) / (maxR - t)) + ")");
				} else {
					grd4.addColorStop(0.2, "rgba(206,22,190,1)");
					grd4.addColorStop(0.8, "rgba(0,161,198,1)");
				}
				ctx.strokeStyle = grd4;
				if (r4 >= maxR) {
					r4 = 0;
					s4 = startS;
				} else {
					s4 = s4 * speed;
					r4 += s4;
				}
				ctx.arc(x, y, r4, 0, Math.PI * 2);
				ctx.stroke();
				ctx.closePath();
				ctx.restore();

				ctx.drawImage(oImg, (w - 160) / 2, (h - 160) / 2, 160, 160);

				fn(timer);
			}
			drawArc();
		},
		/**
		 * 杜比全景声2.0
		 */
		setDrawVocie() {
			var oCanvas = document.getElementById("voice");
			var ctx = oCanvas.getContext("2d");
			var oImg1 = document.querySelector(".s81-dolby2 .poster-image span:nth-child(1) img");
			var oImg2 = document.querySelector(".s81-dolby2 .poster-image span:nth-child(2) img");
			var timer = null;
			var w = 1435;
			var h = 793;
			oCanvas.width = w;
			oCanvas.height = h;
			
			var _s=0.024;
			var _g = 0.9724;
			var _y=5;

			var w2 = 1432;
			var h2 = 182;

			var s = 0.2;
			var y = 70;
			var angle = 0;
			var speed = _s;
			var globalAlpha = 1;

			var s2 = 0.4;
			var y2 = 256;
			var angle2 = 0;
			var speed2 = _s;
			var globalAlpha2 = 1;

			var s3 = 0.6;
			var y3 = 520;
			var angle3 = 0;
			var speed3 = _s;
			var globalAlpha3 = 1;

			var s4 = 0.8;
			var y4 = 780;
			var angle4 = 0;
			var speed4 =_s;
			var globalAlpha4 = 1;
			
			



			function draw() {

				ctx.clearRect(0, 0, w, h);

				timer = window.requestAnimationFrame(draw);

				ctx.drawImage(oImg1, 0, 0, w, h);

				ctx.save();
				if (y >= (h + h2)) {
					y = 70;
					s = 0.2;
					globalAlpha = 1;
					speed = _s;
				} else {
					y += _y;
				}
				if (s >= 1) {
					s = 1;
				} else {
					speed *= _g;
					s += speed;
				}

				if (s >= 0.9) {
					if (globalAlpha < 0.03) {
						globalAlpha = 0;
					} else {
						globalAlpha -= 0.03;
					}
				}
				ctx.save();
				ctx.scale(s, s);
				ctx.translate((w - w2 * s) / 2 / s, 0);
				ctx.globalAlpha = globalAlpha;
				ctx.drawImage(oImg2, 0, y, w2, h2);
				ctx.restore();

				if (y2 >= (h + h2)) {
					y2 = 70;
					s2 = 0.2;
					globalAlpha2 = 1;
					speed2 = _s;
				} else {
					y2 +=_y;
				}
				if (s2 >= 1) {
					s2 = 1;
				} else {
					speed2 *=_g;
					s2 += speed2;
				}

				if (s2 >= 0.9) {
					if (globalAlpha2 < 0.03) {
						globalAlpha2 = 0;
					} else {
						globalAlpha2 -= 0.03;
					}
				}
				ctx.save();
				ctx.scale(s2, s2);
				ctx.translate((w - w2 * s2) / 2 / s2, 0);
				ctx.globalAlpha = globalAlpha2;
				ctx.drawImage(oImg2, 0, y2, w2, h2);
				ctx.restore();


				ctx.save();
				if (y3 >= (h + h2)) {
					y3 = 70;
					s3 = 0.2;
					globalAlpha3 = 1;
					speed3 = _s;
				} else {
					y3 +=_y;
				}
				if (s3 >= 1) {
					s3 = 1;
				} else {
					speed3 *= _g;
					s3 += speed3;
				}

				if (s3 >= 0.9) {
					if (globalAlpha3 < 0.03) {
						globalAlpha3 = 0
					} else {
						globalAlpha3 -= 0.03;
					}
				}
				ctx.save();
				ctx.scale(s3, s3);
				ctx.translate((w - w2 * s3) / 2 / s3, 0);
				ctx.globalAlpha = globalAlpha3;
				ctx.drawImage(oImg2, 0, y3, w2, h2);
				ctx.restore();


				ctx.save();
				if (y4 >= (h + h2)) {
					y4 = 70;
					s4 = 0.2;
					globalAlpha4 = 1;
					speed4 = _s;
				} else {
					y4 += _y;
				}
				if (s4 >= 1) {
					s4 = 1;
				} else {
					speed4 *= _g;
					s4 += speed4;
				}

				if (s4 >= 0.9) {
					if (globalAlpha4 < 0.03) {
						globalAlpha4 = 0
					} else {
						globalAlpha4 -= 0.03;
					}
				}
				ctx.save();
				ctx.scale(s4, s4);
				ctx.translate((w - w2 * s4) / 2 / s4, 0);
				ctx.globalAlpha = globalAlpha4;
				ctx.drawImage(oImg2, 0, y4, w2, h2);
				ctx.restore();

			}

			draw();

		}
	},
	mounted() {
		this.isWeb = this.isPC() ? true : false;
		this.oDialogue = this.setDrawArcLine();
		this.setBezel_less();
		this.onClickGoTop();
		this.onPlayVideo();
		this.onClickTrait();
		this.onClickAnchor();
		if(	this.isWeb){
			this.setPointRun();
		}
		this.onScrollTop();
		this.setTrensAIAODSilde();
		this.setImageLoader(32, "music/music_", ".jpg", "music");
		this.onWindowResize();
		this.setDrawVocie();
		
	},
	created() {
		this.window_height = window.innerHeight;
		this.window_width = window.innerWidth;
		this.kvHeight = this.window_height;
	}
});
