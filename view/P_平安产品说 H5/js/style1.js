var oDial = document.getElementById("dial");
var aA = $('.u-list a');
var rotate = 360 / 15;
var angle = 0;
var speed = 0.1;
var rate = 0.99;
var startY, endY, targetY, aY, moveY, distance, moveAngle;
var n;
var stop = null;
var storage = window.sessionStorage;
var nS = 3;
var startAngle = 0;
var timer = null;
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
	$('.m-dial').css({
		'transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')',
		'-webkit-transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')'
	});
	stop = requestAnimFrame(animloop);
	storage.setItem('rotationAngle', angle);
})();

oDial.addEventListener('touchstart', onTouchStart, false);
oDial.addEventListener('touchmove', onTouchMove, false);
oDial.addEventListener('touchend', onTouchEnd, false);

var startAngle1 = 0;
var startAngle2 = 0;
var startAngle3 = 0;
var startAngle4 = 0;

var on = 0;

function onTouchStart(e) {
	e.preventDefault();
	startY = e.touches[0].pageY;
	window.cancelAnimationFrame(stop);
	startAngle1 = storage.getItem('rotationAngle');
	startAngle2 = storage.getItem('mAngle');
	startAngle3 = storage.getItem('sAngle');

	on++;

	if(on == 1) {
		console.log(1);
		startAngle4 = parseInt(startAngle1);
	} else {

		if(storage.getItem('sAngle')) {
			console.log(3);
			startAngle4 = parseInt(startAngle3);
		} else {
			console.log(2);
			startAngle4 = parseInt(startAngle2);
		}

	}

	//console.log('开始旋转后startAngle1：' + startAngle1);
	//console.log('手指滑动后startAngle2：' + startAngle2);
	//console.log('自动选择后startAngle3：' + startAngle3);

	console.log('开始旋转的角度：：：：' + startAngle4);

	clearTimeout(timer);

	if(e.target.nodeName == 'A') { // e.target是触发事件的DOM，e.target.nodeName是触发DOM标签名称
		aY = e.targetTouches[0].pageY;
	}
	$('.m-dial').css({
		'transform': 'rotate3d(0,0,1,' + startAngle4 + 'deg' + ')',
		'-webkit-transform': 'rotate3d(0,0,1,' + startAngle4 + 'deg' + ')'
	});
}
var endAngle = 0;

function onTouchMove(e) {
	moveY = e.touches[0].pageY;
	distance = moveY - startY;
	moveAngle = -distance / 10;
	endAngle = (parseInt(moveAngle) + parseInt(startAngle4));
	$('.m-dial').css({
		'transform': 'rotate3d(0,0,1,' + endAngle + 'deg' + ')',
		'-webkit-transform': 'rotate3d(0,0,1,' + endAngle + 'deg' + ')'
	});
}

function onTouchEnd(e) {
	e.preventDefault();
	storage.setItem('mAngle', endAngle);
	console.log('手指滑动后startAngle2-mAngle：' + storage.getItem('mAngle'));
	angle = parseInt(storage.getItem('mAngle'));
	if(e.target.nodeName == 'A') {
		if(Math.abs(e.changedTouches[0].pageY - aY) < e.target.offsetHeight) {
			e.target.click();
		}
	}

	endY = e.changedTouches[0].screenX;
	targetY = endY - startY;

	//timer = setTimeout(function() {
	console.log('自转的开始角度' + angle);
	if(targetY > 0) {

		(function up() {
			stop = requestAnimFrame(up);
			if(angle >= 360) {
				angle = 0;
			} else if(angle <= -360) {
				angle = 0;
			}
			angle -= speed;
			$('.m-dial').css({
				'transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')',
				'-webkit-transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')'
			});
			storage.setItem('sAngle', angle);
		})();

	} else if(targetY < 0) {

		(function down() {
			stop = requestAnimFrame(down);
			if(angle >= 360) {
				angle = 0;
			} else if(angle <= -360) {
				angle = 0;
			}
			angle += speed;
			$('.m-dial').css({
				'transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')',
				'-webkit-transform': 'rotate3d(0,0,1,' + angle + 'deg' + ')'
			});
			storage.setItem('sAngle', angle);
		})();
	}
	//}, 1000);

}