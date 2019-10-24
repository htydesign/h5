/**
 * 阻止浏览器默认事件
 */
window.addEventListener('touchmove', function(e) {
	//e.preventDefault();
}, false);

/**
 * 淡入
 */
function fadeIn(obj) {
	obj.style.display = "block";
	obj.classList.remove("fadeOut", "fadeIn");
	setTimeout(function() {
		obj.classList.add("fadeIn");
	}, 100);
}

/**
 * 淡出
 */
function fadeOut(obj) {
	obj.classList.add("fadeOut");
	setTimeout(function() {
		obj.style.display = "none";
		obj.classList.remove("fadeOut", "fadeIn");
	}, 400);
}

function addClassName(obj, className) {
	var objec = document.querySelector(obj);
	objec.classList.add(className);
}
/**
 * 控制音乐播放暂停
 */
(function() {
	var bgMusic = document.querySelector('.music');

	setTimeout(function() {
		bgMusic.src = 'music/music.mp3';
		bgMusic.play();
		oMusicPlay.style.animationPlayState = "running";
		oMusicPlay.style.webkitAnimationPlayState = "running";
	}, 300);

	var oMusicIcon = document.querySelector('.musicIcon');
	var oMusicPlay = document.querySelector('.musicIcon span');
	var oMusicPause = document.querySelector('.musicIcon i');
	var isUserPauseMusic = false;

	oMusicIcon.addEventListener('click', function() {
		if(bgMusic.paused) {
			bgMusic.play();
			oMusicPlay.style.animationPlayState = "running";
			oMusicPlay.style.webkitAnimationPlayState = "running";
			oMusicPause.style.display = "none";
			isUserPauseMusic = false;
		} else {
			bgMusic.pause();
			oMusicPlay.style.animationPlayState = "paused";
			oMusicPlay.style.webkitAnimationPlayState = "paused";
			oMusicPause.style.display = "block";
			isUserPauseMusic = true;
		}
	}, false);

})();
/**
 * loading加载
 */
(function() {
	var startTime = new Date().getTime();
	var endTime = 0;
	var dis = 0;
	var time = 0;
	var nT = 3000;
	var oTxt = document.querySelector('.loading p');
	var aLi = document.querySelectorAll('.ali li');
	var loadingTimer = null;
	var n = 0;
	var loader = new PxLoader();

	for(var i = 0; i < fileList.length; i++) {
		loader.addImage(fileList[i]);
	}

	loader.addProgressListener(function(e) {
		var percent = Math.round((e.completedCount / e.totalCount) * 100);

		oTxt.innerHTML = percent + "%";

	});

	loader.addCompletionListener(function(e) {
		endTime = new Date().getTime();
		dis = endTime - startTime;
		//				if(dis < nT) {
		//					time = nT - dis;
		//					startMain(time);
		//				} else {
		//					startMain(time);
		//				}
		startMain(500);
	});

	loader.start();

	function startMain(t) {

		setTimeout(function() {

			var oLoading = document.querySelector('.loading');

			fadeOut(oLoading);

			setTimeout(function() {
				setIndex();
			}, 300);

		}, t);
		clearInterval(loadingTimer);
		for(var i = 0; i < aLi.length; i++) {
			if(i == n) {
				aLi[i].style.opacity = 1;
			} else {
				aLi[i].style.opacity = 0;
			}
		}
	}
	setLoading();

	function setLoading() {
		loadingTimer = setInterval(function() {
			for(var i = 0; i < aLi.length; i++) {
				if(i == n) {
					aLi[i].style.opacity = 1;
				} else {
					aLi[i].style.opacity = 0;
				}
			}
			if(n >= 6) {
				n = -1;
			} {
				n++;
			}
		}, 300);

	}
})();

function setIndex() {
	addClassName('.index-bg', 'active');

	setTimeout(function() {
		addClassName('.i-elevator', 'active');

		setTimeout(function() {
			addClassName('.i-title', 'active');

			setTimeout(function() {
				addClassName('.i-person', 'active');
				setTimeout(function() {
					addClassName('.i-open-btn', 'active');
				}, 1500)
			}, 750);
		}, 800);
	}, 200);
}

/**
 * 点击打开大门
 */
clickOpenDoor();

function clickOpenDoor() {
	var oBtn = document.querySelector('.i-open-btn');
	var oIndexContainer = document.querySelector('.container');
	var oMain = document.querySelector('.main');

	oBtn.addEventListener('click', function() {

		$('.i-elevator-box').addClass('active');
		fadeOut(oBtn);
		setTimeout(function() {
			fadeOut(oIndexContainer);
		}, 1000);
		$('html,body').scrollLeft(0);
	}, false);
}

var nLeft = 0;
nLeft = document.documentElement.scrollLeft || document.body.scrollLeft;

window.addEventListener('scroll', function(e) {
	nLeft = document.documentElement.scrollLeft || document.body.scrollLeft;
}, false);

/**
 * 设置对话框坐标
 */
setDialogBox();

function setDialogBox() {

	var a_position = [
		[370, 300],
		[470, 700],
		[160, 600],
		[780, 1180],
		[200, 1230],
		[624, 1460],
		[630, 2070],
		[100, 1960],
		[105, 2440],
		[615, 2436],
		[830, 3242],
		[160, 3236],
		[686, 3582],
		[530, 4062],
		[767, 4077],
		[444, 4521],
		[180, 4830],
		[550, 5265],
		[205, 5925],
		[755, 6336],
		[140, 6680]
	];

	var aSpan = document.querySelectorAll('.dialog-box span');

	for(var i = 0; i < aSpan.length; i++) {
		aSpan[i].style.bottom = a_position[i][0] + 'px';
		aSpan[i].style.left = a_position[i][1] + 'px';
	}
}
/**
 * 设置气泡冒泡
 */
createBubble();

function createBubble() {
	var oBubbleContainer = document.querySelector('.maopao');
	var aColor = ["#22d4ff", "#ffda81"];
	for(var i = 0; i < 40; i++) {
		var oI = document.createElement("i");
		var w = Math.random() * 15 + 10;
		var c = parseInt(Math.random() * aColor.length);
		oI.style.display = 'block';
		oI.style.width = w + 'px';
		oI.style.height = w + 'px';
		oI.style.borderRadius = "50%";
		oI.style.backgroundColor = aColor[c];
		oI.style.position = "absolute";
		oI.style.bottom = "0px";
		oI.style.left = (Math.random() * 350 + 20) + "px";
		oI.style.opacity = 0;
		oI.style.transform = "translateY(40px)";
		oI.style.webkitTransform = "translateY(40px)";
		oI.style.animation = "toUp " + (Math.random() * 10 + 10) + "s " + (Math.random() * 10) + "s linear infinite";
		oI.style.webkitAnimation = "toUp " + (Math.random() * 10 + 10) + "s " + (Math.random() * 10) + "s linear infinite";
		oBubbleContainer.appendChild(oI);
	}
}

/**
 * 设置下雪
 */
createSnow();

function createSnow() {
	var oSnowContainer = document.querySelector('.snow');
	var aColor = ["#fb75d9", "#22d4ff"];
	for(var i = 0; i < 20; i++) {
		var oI = document.createElement("i");
		var w = Math.random() * 8 + 5;
		var c = parseInt(Math.random() * aColor.length);
		oI.style.display = 'block';
		oI.style.width = w + 'px';
		oI.style.height = w + 'px';
		oI.style.borderRadius = "50%";
		oI.style.backgroundColor = aColor[c];
		oI.style.position = "absolute";
		oI.style.top = "0px";
		oI.style.left = (Math.random() * 180 + 20) + "px";
		oI.style.transform = "translateY(-20px)";
		oI.style.webkitTransform = "translateY(-20px)";
		oI.style.animation = "toDown " + (Math.random() * 10 + 5) + "s " + (Math.random() * 8) + "s linear infinite";
		oI.style.webkitAnimation = "toDown " + (Math.random() * 10 + 5) + "s " + (Math.random() * 8) + "s linear infinite";
		oSnowContainer.appendChild(oI);
	}
}

/**
 * 设置云
 */
createCloud();

function createCloud() {
	var oCloudContainer = document.querySelector('.cloud');

	for(var i = 0; i < 30; i++) {
		var oI = document.createElement("i");
		var oImg = document.createElement("img");
		var s = Math.random();
		var delayTime = 0;
		if(s > 1) {
			s = 1;
		} else if(s <= 0.5) {
			s = 0.5;
		}

		oImg.src = "images/img-98.png";
		oImg.style.transform = 'scale(' + s + ')';
		oI.appendChild(oImg);

		oI.style.display = 'block';
		oI.style.position = "absolute";
		oI.style.top = (Math.random() * 400 + 20) + "px";
		oI.style.left = (Math.random() * 7600) + "px";
		oI.style.animation = "toRight2 " + (Math.random() * 10 + 10) + "s " + (Math.random() * 8) + "s linear infinite";
		oI.style.webkitAnimation = "toRight2 " + (Math.random() * 10 + 10) + "s " + (Math.random() * 8) + "s linear infinite";
		oCloudContainer.appendChild(oI);
	}
}

onTouchSlide();

function onTouchSlide() {

	var oContainer = document.querySelector('.main');

	var startX = 0;
	var moveX = 0;
	var endX = 0;
	var translateX = 0;
	var touchX = 0;
	var w_width = window.innerWidth;
	var clockwise = true; //顺时针

	var a_position = [
		[0, 300],
		[0, 600],
		[1, 800],
		[0, 1180],
		[0, 1230],
		[2, 1700],
		[2, 1750],
		[1, 2100],
		[1, 2200],
		[2, 2350],
		[0, 3142],
		[1, 3350],
		[2, 3700],
		[2, 3900],
		[0, 4077],
		[0, 4460],
		[1, 4600],
		[0, 5200],
		[0, 5925],
		[0, 6336],
		[1, 6500]
	];
	var num = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

	var aDialogSpan = document.querySelectorAll('.dialog-box span');
	var aPerson = document.querySelectorAll('.road-right .p');

	var person_positon = [700, 2050, 2150, 4500, 6400, 3300];
	var person_num = [0, 0, 0, 0, 0, 0];
	var mn = 0;

	var aPerson2 = document.querySelectorAll('.road-left .p');
	var person_positon2 = [1600, 1650, 2250, 3600, 3800];
	var person_num2 = [0, 0, 0, 0, 0];
	var h=0;
//	num[0] = 1;
//	aDialogSpan[0].style.transform = "scale(1)";
//	aDialogSpan[0].style.webkitTransform = "scale(1)";

	oContainer.addEventListener('touchstart', onTouchStart, false);

	function onTouchStart(e) {
		e.preventDefault();

		startX = e.touches[0].clientX;

		oContainer.addEventListener('touchmove', onTouchMove, false);
		oContainer.addEventListener('touchend', onTouchEnd, false);
		oContainer.style.transition = "none";
		oContainer.style.webkitTransition = "none";
		
		if(h==0){
			h=1;
			$('.hint').hide();
		}
	}

	function onTouchMove(e) {
		e.preventDefault();
		moveX = startX - e.touches[0].clientX + endX;
		translateX = startX - e.touches[0].clientX

		if(moveX < 0) {
			moveX = 0;
		} else if(moveX >= 7676 - w_width) {
			moveX = 7676 - w_width;
		}
	
		oContainer.style.transform = "translate3d(" + -moveX + "px,0px,0px)";
		oContainer.style.webkitTransform = "translate3d(" + -moveX + "px,0px,0px)";
		showDialog(moveX);
		//console.log(moveX);
	}

	function onTouchEnd(e) {
		e.preventDefault();

		if(translateX > 20) {
			endX = moveX + 20;
		} else if(translateX < -20) {
			endX = moveX - 20;
		}
		if(endX < 0) {
			endX = 0;
		} else if(endX >= 7676 - w_width) {
			endX = 7676 - w_width;
		}
		oContainer.style.transform = "translate3d(" + -endX + "px,0px,0px)";
		oContainer.style.webkitTransform = "translate3d(" + -endX + "px,0px,0px)";;
		oContainer.style.transition = "all 0.1s ease-out";
		oContainer.style.webkitTransition = "all 0.1s ease-out";
		translateX = 0;
		moveY = 0;

	}

	function showDialog(x) {

		for(var i = 0; i < aDialogSpan.length; i++) {
			var minX = a_position[i][1] - w_width / 2 - 50;
			var maxX = a_position[i][1] + 200;

			if(x >= minX && x <= maxX && num[i] === 0) {
				num[i] = 1;
				aDialogSpan[i].style.transform = "scale(1)";
				aDialogSpan[i].style.webkitTransform = "scale(1)";
			} else if(x < minX && num[i] === 1) {
				num[i] = 0;
				minX = a_position[i][1] - w_width / 2 - 50;

				aDialogSpan[i].style.transform = "scale(0)";
				aDialogSpan[i].style.webkitTransform = "scale(0)";
			} else if(x > maxX && num[i] === 1) {
				num[i] = 0;
				maxX = a_position[i][1] + 200;

				aDialogSpan[i].style.transform = "scale(0)";
				aDialogSpan[i].style.webkitTransform = "scale(0)";
			}
		}

		for(var i = 0; i < aPerson.length; i++) {
			var minX = person_positon[i] - w_width / 2;
			var maxX = person_positon[i] + w_width / 2;

			if(x >= minX && x <= maxX && person_num[i] === 0) {
				person_num[i] = 1;
				aPerson[i].classList.add('active');
			} else if(x < minX && person_num[i] === 1) {
				person_num[i] = 0;
				aPerson[i].classList.remove('active');
			} else if(x > maxX && person_num[i] === 1) {
				person_num[i] = 0;
				aPerson[i].classList.remove('active');
			}
		}
		if(x >= 6900 && mn === 0) {
			mn = 1;
			$('.t-text').addClass('active');
			$('.b-button').addClass('active');
		} else if(x < 6300 && mn === 1) {
			mn = 0;
			$('.t-text').removeClass('active');
			$('.b-button').removeClass('active');
		}

		for(var i = 0; i < aPerson2.length; i++) {
			var minX = person_positon2[i] - w_width / 2;
			var maxX = person_positon2[i] + w_width / 2;

			if(x >= minX && x <= maxX && person_num2[i] === 0) {
				person_num2[i] = 1;
				aPerson2[i].classList.add('active');
			} else if(x < minX && person_num2[i] === 1) {
				person_num2[i] = 0;
				aPerson2[i].classList.remove('active');
			} else if(x > maxX && person_num2[i] === 1) {
				person_num2[i] = 0;
				aPerson2[i].classList.remove('active');
			}
		}
	}
}

$('.b-button a').on('touchstart',function(e){
	e.stopPropagation();
	window.location.href="http://www.nl-in.com/";
});