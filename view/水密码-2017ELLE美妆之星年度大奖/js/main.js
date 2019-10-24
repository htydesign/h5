/***
 * 阻止浏览器默认事件
 */
window.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

/***
 * 页面加载完成后执行
 */
window.onload = function() {

	MAIN.onResize();
	MAIN.onStart();
	MAIN.onSlideContainer();
	MAIN.onSlideImages();
	MAIN.onControlsMusic();
	MAIN.onAddEventAnimationEnd();
}

var MAIN = {
	oContainer: document.querySelector('.container'),
	aBackground: document.querySelectorAll('.background-container .bg'),
	aSence: document.querySelectorAll('.main-container .block'),
	oMainContainer: document.querySelector('.main-container'),
	oHint: document.querySelector('.hint'),
	nHeight: window.innerHeight,
	n: 0,
	isSlide: false, //定义是否可以滑动||画面切换是否结束
	isAround: true,
	onResize: function() {
		_this = this;
		window.addEventListener('resize', function() {
			_this.nHeight = window.innerHeight;
			_this.oMainContainerMove(_this.oMainContainer, _this.n, 0, _this.nHeight, true);
		}, false);
	},
	oMainContainerMove: function(obj, i, x, y, flag) {
		_this = this;
		obj.style.transform = "translate3d(" + -x * i + "px," + -y * i + "px,0px)";
		obj.style.webkitTransform = "translate3d(" + -x * i + "px," + -y * i + "px,0px)";
		if(flag) {
			obj.style.transition = "all 0.5s ease-out";
			_this.oMainContainer.style.webkitTransition = "all 0.5s ease-out";
		} else {
			obj.style.transition = "none";
			obj.style.webkitTransition = "none";
		}
	},
	onStart: function() {
		_this = this;
		_this.aSence[0].classList.add("active");
	},
	onSlideContainer: function() {

		_this = this;

		var startY = 0,
			moveY = 0;

		var oHintImage = document.querySelector('.hint span img');

		_this.oContainer.addEventListener('touchstart', onTouchStart, false);

		//用户按下
		function onTouchStart(e) {
			startY = e.touches[0].clientY;

			_this.oContainer.addEventListener('touchmove', onTouchMove, false);
			_this.oContainer.addEventListener('touchend', onTouchEnd, false);
		}
		//用户移动
		function onTouchMove(e) {

			moveY = e.touches[0].clientY - startY;

		}
		//用户抬起
		function onTouchEnd() {
			if(moveY < -150 && _this.isSlide) {
				if(_this.n >= _this.aSence.length - 1) {
					_this.n = _this.aSence.length - 1;
				} else {
					_this.n++;
					_this.isSlide = false;
					_this.isAround = false;
				}
				boxTranslateY(_this.n);
			}

			if(moveY > 150 && _this.isSlide) {
				if(_this.n <= 0) {
					_this.n = 0;
				} else {
					_this.n--;
					_this.isSlide = false;
					_this.isAround = false;
				}
				boxTranslateY(_this.n);
			}

		}
		//页面单次滚动动画
		function boxTranslateY(t) {
			_this.oMainContainerMove(_this.oMainContainer, t, 0, _this.nHeight, true);

			if(!_this.isAround) {
				_this.oHint.classList.remove('active');
			}

			if(t == 2) {
				oHintImage.src = "images/img-21.png";
			} else {
				oHintImage.src = "images/img-01.png";
			}

			for(var j = 0; j < _this.aSence.length; j++) {

				_this.aBackground[j].style.opacity = 0;

				_this.aSence[j].classList.remove("active");

				if(j == t) {
					_this.aBackground[t].style.opacity = 1;
					_this.aSence[j].classList.add("active");
				}

			}

			setTimeout(function() {
				moveY = 0;
			}, 550);
		}

	},
	onSlideImages: function() {

		var oImagesContainer = document.querySelector('.images-container');

		var aLi = document.querySelectorAll('.images-box ul li');

		var oUl = document.querySelector('.images-box ul');

		var oPrev = document.querySelector('.prev');

		var oNext = document.querySelector('.next');

		var imageWidth = aLi[0].offsetWidth + 20;

		var aLenght = aLi.length * 3;

		oUl.innerHTML = oUl.innerHTML + oUl.innerHTML + oUl.innerHTML;

		oUl.style.width = imageWidth * aLenght + "px";

		//定义是否可以滑动||画面切换是否结束
		var isSlide2 = true;

		var startX = 0,
			moveX = 0,
			m = 5;
		var isClick = false;

		oUl.style.transform = "translateX(" + -imageWidth * m + "px)";
		oUl.style.webkitTransform = "translateX(" + -imageWidth * m + "px)";

		oImagesContainer.addEventListener('touchstart', onTouchStart, false);

		//用户按下
		function onTouchStart(e) {

			startX = e.touches[0].clientX;

			oImagesContainer.addEventListener('touchmove', onTouchMove, false);

			oImagesContainer.addEventListener('touchend', onTouchEnd, false);
		}
		//用户移动
		function onTouchMove(e) {

			moveX = e.touches[0].clientX - startX;

		}
		//用户抬起
		function onTouchEnd() {

			if(moveX < -150 && isSlide2) {
				toRightMove();
				isClick = false;
			}

			if(moveX > 150 && isSlide2) {
				toLeftMove();
				isClick = false;
			}
			if(!isClick) {
				boxTranslateX(m);
			}
		}
		//向左运动
		function toLeftMove() {
			if(m <= 0) {
				m = 0;
			} else {
				m--;
				_this.isAround = true;
			}
			oUl.addEventListener('transitionend', function() {
				if(m <= 4) {
					m = 9;
					_this.oMainContainerMove(oUl, m, imageWidth, 0, false);
				}
			}, false);
			isSlide2 = false;
		}

		//向右运动
		function toRightMove() {
			if(m >= aLenght - 1) {
				m = aLenght - 1;
			} else {
				m++;
				_this.isAround = true;
			}

			oUl.addEventListener('transitionend', function() {
				if(m >= 9) {
					m = 4;
					_this.oMainContainerMove(oUl, m, imageWidth, 0, false);
				}
			}, false);
			isSlide2 = false;
		}

		oPrev.addEventListener('click', function() {
			isClick = true;
			if(isSlide2) {
				toLeftMove();
				if(isClick) {
					boxTranslateX(m);
				}
				isSlide2 = false;
			}
		}, false);

		oNext.addEventListener('click', function() {
			isClick = true;
			if(isSlide2) {
				toRightMove();
				if(isClick) {
					boxTranslateX(m);
				}
				isSlide2 = false;
			}
		}, false);

		//页面单次滚动动画
		function boxTranslateX(t) {

			_this.oMainContainerMove(oUl, t, imageWidth, 0, true);

			setTimeout(function() {
				isSlide2 = true;
				moveX = 0;
			}, 550);
		}
	},
	onControlsMusic: function() {
		var oMusicIcon = document.querySelector('.music-icon');
		var bgMusic = document.getElementById("music");

		setTimeout(function() {
			bgMusic.src = 'music/music.m4a';
			bgMusic.play();
			//bgMusic.muted = true; //静音
			//bgMusic.volume=0;
		}, 300);

		var isUserPauseMusic = false;

		oMusicIcon.addEventListener('click', function() {
			if(bgMusic.paused) {
				bgMusic.play();
				isUserPauseMusic = false;
				oMusicIcon.classList.remove('active');
			} else {
				bgMusic.pause();
				isUserPauseMusic = true;
				oMusicIcon.classList.add('active');
			}
		}, false);
	},
	onAddEventAnimationEnd() {
		_this = this;

		onAnimamtionEnd('.sence-1 span:nth-of-type(4)');
		onAnimamtionEnd('.sence-2 span:nth-of-type(6)');
		onAnimamtionEnd('.sence-3 span:nth-of-type(8)');
		onAnimamtionEnd('.sence-4 span:nth-of-type(5)');
		onAnimamtionEnd('.sence-5 .next');
		onAnimamtionEnd('.sence-6 .s6-text i:nth-of-type(5)');

		function onAnimamtionEnd(obj) {
			var a = document.querySelector(obj);
			a.addEventListener('animationend', function() {
				_this.isSlide = true;
				if(obj !== '.sence-6 .s6-text i:nth-of-type(5)') {
					_this.oHint.classList.add('active');
				}
			}, false);
		}
	}
}