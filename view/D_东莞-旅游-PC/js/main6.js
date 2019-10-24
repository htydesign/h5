var oImg = document.querySelector('#map img');
var images = [];
var bg = [];
var mapImage = ["images/map.jpg"];
var loader = new PxLoader();

var addImagesForTag = function(tag, files) {
	for(var i = 0; i < files.length; i++) {
		if(tag === "data") {
			images.push(loader.addImage(files[i].url));
		} else {
			bg.push(loader.addImage(files[i]));
		}
	}
}

addImagesForTag("data", data);
addImagesForTag("mapImage", mapImage);

loader.addProgressListener(function(e)  {      
	//console.log(e.completedCount  +  ' / '  +  e.totalCount); 
	
	$('.loading p').html("正在加载..."+((e.completedCount  /  e.totalCount) * 100).toFixed(0) + "%");
});

loader.addCompletionListener(function() {
	oImg.src = bg[0].src;
	MAP.init();
	
	$('.loading').fadeOut(500);
})

loader.start();

var MAP = {
	oMap: document.getElementById("map"),
	oBox: document.getElementById("box"),
	scene: document.querySelector(".scene"),
	showInfo: document.querySelector(".showInfo"),
	showInfo_p: document.querySelector(".showInfo p"),
	controlBar: document.querySelector(".map-controls"),
	contorlsPoint: document.querySelector('.map-controls span i'),
	oMagnify: document.querySelector(".magnify"),
	oShrink: document.querySelector(".shrink"),
	oReset: document.querySelector('.reset'),
	_this: null,
	timer: null,
	window_width: 1260,
	window_height: 900,
	oldSize: {
		w: 5000,
		h: 3563,
		s: 1,
		x: 0,
		y: 0
	},
	newSize: {
		w: 0,
		h: 0,
		s: 1,
		x: 0,
		y: 0
	},
	mouse: {
		startX: 0,
		startY: 0,
		moveX: 0,
		moveY: 0,
		endX: 0,
		endY: 0
	},
	point: {
		x: 0,
		newScale: 0,
		oldScale: 0,
		minScale: 0,
		maxScale: 1
	},
	mapPosition: {
		x: 0,
		y: 0,
		mx: 0,
		my: 0
	},
	scroll: {
		scale: 0,
		max: 1,
		min: 0,
		n: 0.05
	},
	border: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		n: 100
	},
	isScroll: false, //是否出现到达最小宽度
	isDrag: false, //是否可以拖拽
	isScale: false,
	isChange: false,
	click_num: 0,
	setMapSize: function() {

		_this = this;

		_this.mapPosition.mx = -_this.oldSize.w / 2;
		_this.mapPosition.my = -_this.oldSize.h / 2;

		window.addEventListener('resize', function() {
			onWindowResize();
		}, false);

		onWindowResize();

		function onWindowResize() {

			if(_this.isScale) {
				_this.oBox.style.transform = "matrix(" + _this.newSize.s + ",0,0," + _this.newSize.s + "," + _this.mapPosition.x + "," + _this.mapPosition.y + ")";
				_this.oBox.style.transformOrigin = -_this.mapPosition.x + "px " + -_this.mapPosition.y + "px";
			} else {
				if(_this.window_width <= 1260) {
					setStyle(1260);
					_this.isDrag = true;
				} else {
					setStyle(_this.window_width);
				}
			}
			if(_this.newSize.w > _this.window_width || _this.newSize.h > _this.window_height) {
				_this.isDrag = true;
			} else {
				_this.isDrag = false;
			}
		}

		function setStyle(w) {

			_this.oldSize.s = w / _this.oldSize.w;

			_this.newSize.w = _this.oldSize.w * _this.oldSize.s;
			_this.newSize.h = _this.oldSize.h * _this.oldSize.s;
			_this.newSize.s = _this.oldSize.s;

			_this.newSize.x = _this.mapPosition.mx;
			_this.newSize.y = _this.mapPosition.my;

			_this.point.oldScale = _this.newSize.s;
			_this.point.minScale = _this.newSize.s;

			_this.scroll.min = _this.newSize.s;

			_this.oBox.style.width = _this.oldSize.w + "px";
			_this.oBox.style.height = _this.oldSize.h + "px";

			_this.oBox.style.transform = "matrix(" + _this.newSize.s + ",0,0," + _this.newSize.s + "," + _this.newSize.x + "," + _this.newSize.y + ")";
			_this.oBox.style.transformOrigin = -_this.newSize.x + "px " + -_this.newSize.y + "px";

			_this.showInfo.style.transform = "scale(" + 1 / _this.newSize.s + ")";

		}

	},
	onMouse: function() {

		_this = this;

		window.addEventListener('mousedown', onMouseDown, false);

		function onMouseDown(event) {

			event.preventDefault();

			_this.mouse.endX = _this.newSize.x;
			_this.mouse.endY = _this.newSize.y;

			_this.mouse.moveX = _this.newSize.x;
			_this.mouse.moveY = _this.newSize.y;

			if(_this.isDrag) {
				_this.mouse.startX = event.clientX / _this.newSize.s - _this.mouse.endX;
				_this.mouse.startY = event.clientY / _this.newSize.s - _this.mouse.endY;
			}
			window.addEventListener('mousemove', onMouseMove, false);
			window.addEventListener('mouseup', onMouseUp, false);

		}

		function onMouseMove(event) {

			event.preventDefault();

			if(_this.isDrag) {

				_this.mouse.moveX = event.clientX / _this.newSize.s - _this.mouse.startX;
				_this.mouse.moveY = event.clientY / _this.newSize.s - _this.mouse.startY;

				_this.border.left = parseInt(_this.window_width / (2 * _this.newSize.s) - _this.border.n);
				_this.border.right = parseInt((_this.newSize.w - _this.window_width / 2) / _this.newSize.s + _this.border.n);
				_this.border.top = parseInt(_this.window_height / (2 * _this.newSize.s) - _this.border.n);
				_this.border.bottom = parseInt((_this.newSize.h - _this.window_height / 2) / _this.newSize.s + _this.border.n);

				if(_this.mouse.moveX <= -_this.border.left && _this.mouse.moveX >= -_this.border.right) {
					_this.mapPosition.x = _this.mouse.moveX;
				}
				if(_this.mouse.moveY <= -_this.border.top && _this.mouse.moveY >= -_this.border.bottom) {
					_this.mapPosition.y = _this.mouse.moveY;
				}

				_this.newSize.x = _this.mapPosition.x;
				_this.newSize.y = _this.mapPosition.y;

				_this.oBox.style.transform = "matrix(" + _this.newSize.s + ",0,0," + _this.newSize.s + "," + _this.mapPosition.x + "," + _this.mapPosition.y + ")";
				_this.oBox.style.transformOrigin = -_this.mapPosition.x + "px " + -_this.mapPosition.y + "px";

			}
		}

		function onMouseUp(event) {

			event.preventDefault();

			window.removeEventListener('mousemove', onMouseMove);
			window.removeEventListener("mouseup", this);

			if(_this.isDrag) {

				_this.mapPosition.mx = _this.mapPosition.x;
				_this.mapPosition.my = _this.mapPosition.y;

				_this.isChange = true;
			}
		}

		$(document).mousewheel(function(event,  delta,  deltaX,  deltaY)  {

			_this.isScale = true;

			var s_width = 1200;
			var s_height = 800;

			_this.click_num = 0;

			_this.mapPosition.x = _this.newSize.x;
			_this.mapPosition.y = _this.newSize.y;

			_this.scroll.scale = _this.newSize.s;

			if(delta == 1) {
				if(_this.scroll.scale >= _this.scroll.max - _this.scroll.n) {
					_this.scroll.scale = _this.scroll.max - _this.scroll.n;
					if(_this.scroll.scale == _this.scroll.max - _this.scroll.n) {
						_this.scroll.scale = _this.scroll.max;
					}
				} else {
					_this.scroll.scale += _this.scroll.n;
				}
				_this.oBox.style.transition = "none";
			} else if(delta == -1) {
				if(_this.scroll.scale <= _this.scroll.min + _this.scroll.n) {
					_this.scroll.scale = _this.scroll.min + _this.scroll.n;

					if(_this.newSize.w < s_width || _this.newSize.h < s_height) {
						_this.mapPosition.x = -_this.oldSize.w / 2;
						_this.mapPosition.y = -_this.oldSize.h / 2;

						_this.newSize.x = _this.mapPosition.x;
						_this.newSize.y = _this.mapPosition.y;
						_this.oBox.style.transition = "all 0.2s ease";
					}
					if(_this.scroll.scale == _this.scroll.min + _this.scroll.n) {
						_this.scroll.scale = _this.scroll.min;
						setTimeout(function() {
							_this.oBox.style.transition = "none";
						}, 300);
					}
				} else {
					_this.scroll.scale -= _this.scroll.n;
					_this.oBox.style.transition = "none";
				}
			}

			_this.oBox.style.transform = "matrix(" + _this.scroll.scale + ",0,0," + _this.scroll.scale + "," + _this.mapPosition.x + "," + _this.mapPosition.y + ")";
			_this.oBox.style.transformOrigin = -_this.mapPosition.x + "px " + -_this.mapPosition.y + "px";
			_this.newSize.s = _this.scroll.scale;
			_this.newSize.w = _this.oldSize.w * _this.scroll.scale;
			_this.newSize.h = _this.oldSize.h * _this.scroll.scale;

			_this.point.newScale = _this.scroll.scale;

			_this.point.x = (_this.point.newScale - _this.point.minScale) * 122/ (1 - _this.point.minScale);

			_this.contorlsPoint.style.top = _this.point.x + "px";

			if(_this.newSize.w > s_width || _this.newSize.h > s_height) {
				_this.isDrag = true;
			} else {
				_this.isDrag = false;
			}

			_this.isChange = true;

		});
	},
	addImages: function() {

		_this = this;

		var isLongPress = false;
		var ow = 0;
		for(var i = 0; i < data.length; i++) {
			var oA = document.createElement("a");
			var img = document.createElement("img");

			img.src = images[i].src;
			oA.style.position = "absolute";
			oA.style.left = data[i].x + "px";
			oA.style.top = data[i].y + "px";
			oA.style.zIndex = 1;
			oA.target = "_blank";
			oA.appendChild(img);
			_this.scene.appendChild(oA);

			oA.index = i;
			oA.addEventListener('mouseenter', function() {
				var index = this.index;
				if(data[index].aLink == "") {
					this.href = "javascript:;";
				} else {
					this.href = data[index].aLink;
					console.log(data[index].aLink)
				}

				this.style.zIndex = 10;
				this.style.transform = "matrix(" + 1.1 + ",0,0," + 1.1 + "," + 0 + "," + (-30 * (1 - _this.newSize.s) - 10) + ")";

				_this.showInfo.style.transform = "matrix(" + (1 / _this.newSize.s).toFixed(2) + ",0,0," + (1 / _this.newSize.s).toFixed(2) + "," + 0 + "," + -100 * (1 - _this.newSize.s) + ")";
				_this.showInfo.style.zIndex = 20;
				_this.showInfo.style.left = parseInt(data[index].x) + parseInt(data[index].w / 2) + "px";
				_this.showInfo.style.top = parseInt(data[index].y) - parseInt(data[index].h / 3 * (1 - _this.newSize.s)) + "px";

				if(!data[index].txt == "") {
					_this.showInfo.style.display = "block";
				}

				_this.showInfo_p.innerHTML = data[index].txt;

				ow = $('.showInfo').width();
				_this.showInfo.style.marginLeft = -ow / 2 + "px";
				clearTimeout(_this.timer);

			}, false);
			oA.addEventListener('mouseleave', function() {
				_this.showInfo.style.display = "none";
				_this.showInfo.style.marginLeft = 0 + "px";
				this.style.transform = "matrix(1,0,0,1,0,0)";
				this.style.zIndex = 1;
				ow = 0;
			}, false);

			_this.showInfo.addEventListener('mouseenter', function() {
				_this.showInfo.style.display = "block";
			}, false);
			_this.showInfo.addEventListener('mouseleave', function() {
				_this.showInfo.style.display = "none";
			}, false);

			oA.addEventListener("mousedown", function(event) {
				var this_ = this;
				_this.timer = setTimeout(function() {
					this_.href = "javascript:;";
				}, 500);
			}, false);
		}
	},
	setMapControls: function() {

		_this = this;

		var controls = {
			startX: 0,
			moveX: 0,
			endX: 0
		}
		_this.mapPosition.x = _this.newSize.x;
		_this.mapPosition.y = _this.newSize.y;

		_this.oMagnify.addEventListener("click", function() {

			_this.click_num = _this.newSize.s;

			if(_this.click_num >= _this.scroll.max - _this.scroll.n) {
				_this.click_num = _this.scroll.max - _this.scroll.n;
				if(_this.click_num == _this.scroll.max - _this.scroll.n) {
					_this.click_num = _this.scroll.max;
				}
			} else {
				_this.click_num += _this.scroll.n;
			}

			clickbtn();

		}, false);

		_this.oShrink.addEventListener("click", function() {
			_this.click_num = _this.newSize.s;

			if(_this.click_num <= _this.scroll.min + _this.scroll.n) {
				_this.click_num = _this.scroll.min + _this.scroll.n;
				if(_this.click_num == _this.scroll.min + _this.scroll.n) {
					_this.click_num = _this.scroll.min;
				}
			} else {
				_this.click_num -= _this.scroll.n;
			}
			
			clickbtn();
			
		}, false);
		
		
		function clickbtn(){
			_this.point.newScale = _this.click_num;
			_this.point.x = (_this.point.newScale - _this.point.minScale) * 122 / (1 - _this.point.minScale);

			_this.contorlsPoint.style.top = _this.point.x + "px";

			_this.oBox.style.transform = "matrix(" + _this.point.newScale + ",0,0," + _this.point.newScale + "," + _this.mapPosition.x + "," + _this.mapPosition.y + ")";

			_this.newSize.s = _this.point.newScale;
			_this.newSize.w = _this.oldSize.w * _this.point.newScale;
			_this.newSize.h = _this.oldSize.h * _this.point.newScale;

			controls.endX = _this.point.x;
		}
		
		_this.controlBar.addEventListener('mousedown', function(event) {
			event.stopPropagation();
		}, false);

		_this.contorlsPoint.addEventListener('mousedown', onMouseDown, false);

		function onMouseDown(event) {
			event.preventDefault();

			controls.endX = _this.point.x;
			controls.startX = event.clientY - controls.endX;

			document.addEventListener('mousemove', onMouseMove, false);
			document.addEventListener('mouseup', onMouseUp, false);
			console.log(controls.startX)
		}

		function onMouseMove(event) {
			event.preventDefault();
			
			controls.moveX = event.clientY - controls.startX;
			
			if(controls.moveX >= 0 && controls.moveX <= 122) {
				_this.point.x = controls.moveX;
				
				_this.point.newScale =_this.point.x * ( 1-_this.point.minScale) / 122 + _this.point.minScale;
				console.log(_this.point.minScale)	
				_this.contorlsPoint.style.top = _this.point.x + "px";

			_this.oBox.style.transform = "matrix(" + _this.point.newScale + ",0,0," + _this.point.newScale + "," + _this.mapPosition.x + "," + _this.mapPosition.y + ")";

			}

			
		}

		function onMouseUp() {
			event.preventDefault();

			document.removeEventListener('mousemove', onMouseMove);
			document.removeEventListener('mouseup', this);

			_this.newSize.s = _this.point.newScale;
			_this.newSize.w = _this.oldSize.w * _this.point.newScale;
			_this.newSize.h = _this.oldSize.h * _this.point.newScale;

			controls.endX = _this.point.x;

			if(_this.newSize.w > _this.window_width || _this.newSize.h > _this.window_height) {
				_this.isDrag = true;
			} else {
				_this.isDrag = false;
			}
		}
	},
	onReset: function() {
		_this = this;
		_this.oReset.addEventListener('click', function() {
			_this.oBox.style.transform = "matrix(" + _this.newSize.s + ",0,0," + _this.newSize.s + "," + -_this.oldSize.w / 2 + "," + -_this.oldSize.h / 2 + ")";
			_this.oBox.style.transformOrigin = _this.oldSize.w / 2 + "px " + _this.oldSize.h / 2 + "px";
			_this.newSize.x = -_this.oldSize.w / 2;
			_this.newSize.y = -_this.oldSize.h / 2;
			_this.mapPosition.x = _this.newSize.x;
			_this.mapPosition.y = _this.newSize.y;
		}, false);
	},
	setBorder: function() {
		console.log(this.border);
	},
	init: function() {
		this.setMapSize();
		this.onMouse();
		this.addImages();
		this.setMapControls();
		this.onReset();
	}
}