var oDial = document.getElementById("dial");
var aA = $('.u-list a');
var rotate = 360 / 15;
var angle = 0;
var speed = 0.1;
var rate = 0.99;
var startY, endY, targetY, aY;
var n;
var stop = null,stop2=null;
var storage = window.sessionStorage;
var nS = 5;

for(var i = 0; i < aA.length; i++) {
	aA[i].style.transform = 'rotate3d(0,0,1,' + rotate * i + 'deg' + ')';
	aA[i].style.webkitTransform = 'rotate3d(0,0,1,' + rotate * i + 'deg' + ')';
}

window.requestAnimFrame = (function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		function(callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

if(storage.getItem('open')) {
	$('.hint-layer').hide();
	nS = speed;
} else {
	storage.setItem('open', 1);
}

(function animloop() {
	if(angle >= 360) {
		angle = 0;
	}
	if(nS <= speed) {
		nS = speed;
	}
	nS = nS * rate;
	angle += nS;
	console.log(nS);
	$('.m-dial').css({
		'transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')',
		'-webkit-transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')'
	});
	stop = requestAnimFrame(animloop);
})();

oDial.addEventListener('touchstart', onTouchStart, false);
//oDial.addEventListener('touchmove', onTouchMove, false);
oDial.addEventListener('touchend', onTouchEnd, false);
function onTouchStart(e) {
	e.preventDefault();
	startY = e.touches[0].screenY;
	
	if(e.target.nodeName == 'A') { // e.target是触发事件的DOM，e.target.nodeName是触发DOM标签名称
		aY = e.targetTouches[0].pageY;
	}

}
function onTouchMove(e){
	e.preventDefault();
	
}
function onTouchEnd(e) {
	e.preventDefault();
	window.cancelAnimationFrame(stop);
	if(e.target.nodeName == 'A') {
		// 通过上下的移动距离判断是否为误触
		if(Math.abs(e.changedTouches[0].pageY - aY) < e.target.offsetHeight) {
			e.target.click();
			//window.cancelAnimationFrame(stop);
		}
	}

	endY = e.changedTouches[0].screenX;
	targetY = endY - startY;

	if(targetY > 0) {
		n = Math.abs(targetY / 30);
		(function up() {
			stop = requestAnimFrame(up);
			if(angle >= 360) {
				angle = 0;
			} else if(angle <= -360) {
				angle = 0;
			}
			if(n <= speed) {
				n = speed;
			}
			n = n * rate;
			angle -= n;
			$('.m-dial').css({
				'transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')',
				'-webkit-transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')'
			});
		})();

	} else if(targetY < 0) {
		n = Math.abs(targetY / 50);
		(function down() {
			stop = requestAnimFrame(down);
			if(angle >= 360) {
				angle = 0;
			} else if(angle <= -360) {
				angle = 0;
			}
			if(n <= speed) {
				n = speed;
			}
			n = n * rate;
			angle += n;
			$('.m-dial').css({
				'transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')',
				'-webkit-transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')'
			});
		})();
	}

}