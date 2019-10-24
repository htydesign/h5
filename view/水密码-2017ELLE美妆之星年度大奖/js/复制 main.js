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

	main();
	start();

}

var init={
	
}

var oContainer = document.querySelector('.container');

var aBackground = document.querySelectorAll('.background-container .bg');

var aSence = document.querySelectorAll('.main-container .block');

var oMainContainer = document.querySelector('.main-container');

var nHeight = window.innerHeight,
	n = 0;

/***
 * 监听页面尺寸的变化，重新设置页面的位置
 */
window.addEventListener('resize', function() {

	nHeight = window.innerHeight;

	oMainContainerMove(n);

}, false);

/***
 * 设置主体画面容器的动画、位置
 */
function oMainContainerMove(i) {
	oMainContainer.style.transform = "translateY(" + -nHeight * i + "px)";
	oMainContainer.style.webkitTransform = "translateY(" + -nHeight * i + "px)";
	oMainContainer.style.transition = "all 0.5s ease-out";
	oMainContainer.style.webkitTransition = "all 0.5s ease-out";
}

/***
 * 开场动画
 */
function start() {
	aSence[0].classList.add("active");
}

/***
 * 监听用户上下滑动页面
 */
function main() {

//定义是否可以滑动||画面切换是否结束
	var isSlide = true;
	//定义是否向下滑
	var isToDown = true;

	var startY = 0,
		moveY = 0;

	oContainer.addEventListener('touchstart', onTouchStart, false);

	//用户按下
	function onTouchStart(e) {

		startY = e.touches[0].clientY;

		oContainer.addEventListener('touchmove', onTouchMove, false);

		oContainer.addEventListener('touchend', onTouchEnd, false);
	}
	//用户移动
	function onTouchMove(e) {

		moveY = e.touches[0].clientY - startY;

	}
	//用户抬起
	function onTouchEnd() {

		if(moveY < -150 && isSlide) {

			if(n >= aSence.length - 1) {

				n = aSence.length - 1;

			} else {

				n++;

				isToDown = true;

			}
		}

		if(moveY > 150 && isSlide) {

			if(n <= 0) {

				n = 0;

			} else {

				n--;

				isToDown = false;

			}
		}

		isSlide = false;

		boxTranslateY(n);
	}
	//页面单次滚动动画
	function boxTranslateY(t) {

		oMainContainerMove(t);

		for(var j = 0; j < aSence.length; j++) {

			aBackground[j].style.opacity = 0;

			aSence[j].classList.remove("active");

			if(j == t) {
				aBackground[t].style.opacity = 1;
				aSence[j].classList.add("active");
			}

		}

		setTimeout(function() {
			isSlide = true;
			moveY = 0;
		}, 550);
	}

}

/***
 * 场景5，图片滑动轮播
 */

function slideImages() {

	var oImagesContainer = document.querySelector('.images-container');

	var aLi = document.querySelectorAll('.images-box ul li');

	var oUl = document.querySelector('.images-box ul');

	var imageWidth = aLi[0].offsetWidth + 20;

	var aLenght = aLi.length * 3;

	oUl.innerHTML = oUl.innerHTML + oUl.innerHTML + oUl.innerHTML;

	oUl.style.width = imageWidth * aLenght + "px";

	//定义是否可以滑动||画面切换是否结束
	var isSlide = true;

	var startX = 0,
		moveX = 0,
		m = 4;
	
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

		if(moveX < -150 && isSlide) {

			if(m >= aLenght - 1) {

				m = aLenght - 1;

			} else {

				m++;
			}

			oUl.addEventListener('transitionend', function() {
				if(m == 9) {
					m = 4;
					imagesSlideBoxMoveX(m,false);
				}
			}, false);
		}

		if(moveX > 150 && isSlide) {

			if(m <= 0) {

				m = 0;

			} else {

				m--;

			}

			oUl.addEventListener('transitionend', function() {
				if(m == 4) {
					m = 9;
					imagesSlideBoxMoveX(m,false);
				}
			}, false);
		}

		isSlide = false;

		boxTranslateX(m);
	}
	//页面单次滚动动画
	function boxTranslateX(t) {

		imagesSlideBoxMoveX(t,true);

		setTimeout(function() {
			isSlide = true;
			moveX = 0;
		}, 550);
	}
	
	function imagesSlideBoxMoveX(i,flag){
		oUl.style.transform = "translateX(" + -imageWidth * m + "px)";
		oUl.style.webkitTransform = "translateX(" + -imageWidth * m + "px)";
		
		if(flag){
			oUl.style.transition = "all 0.5s ease-out";
			oUl.style.webkitTransition = "all 0.5s ease-out";			
		}else{
			oUl.style.transition = "none";
			oUl.style.webkitTransition = "none";
		}
	}
	
}

slideImages();