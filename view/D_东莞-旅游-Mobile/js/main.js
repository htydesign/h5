window.addEventListener('touchmove', function(e) {

	//e.preventDefault();

}, false);

var loading_box = document.querySelector('.loading');

var loading_txt = document.querySelector('.loading p');

var images = [];

var bg = [];

var mapImage = ["images/map.jpg"];

var loader = new PxLoader();

var addImagesForTag = function(tag, files) {

	for(var i = 0; i < files.length; i++) {

		if(tag === "datalist") {

			images.push(loader.addImage(files[i].url));

		} else {

			bg.push(loader.addImage(files[i]));

		}

	}

}

addImagesForTag("mapImage", mapImage);
addImagesForTag("datalist", data);

loader.addProgressListener(function(e)  {      

	loading_txt.innerHTML = "已加载" + ((e.completedCount  /  e.totalCount) * 100).toFixed(0) + "%";

});

loader.addCompletionListener(function() {

	loading_box.className = "loading fadeOut";

	setTimeout(function() {

		loading_box.style.display = 'none';

	}, 600);

	MAP.init();
});

loader.start();

var MAP = {
	stage: new createjs.Stage("map"),
	canvas: document.getElementById("map"),
	os: document.getElementById("scale"),
	btn: document.getElementById("btn"),
	li: document.querySelectorAll('#list li'),
	oMagnify: document.querySelector('.magnify'),
	oShrink: document.querySelector('.shrink'),
	oOpenBottom: document.querySelector('.image-btn'),
	oImageContainer: document.querySelector('.images-container'),
	oImagesUl: document.querySelector('.image-ul ul'),
	aImagesLi: null,
	oImageInfoContainer: document.querySelector('.scenicSpotInfo-container'),
	oImageInfoBox: document.querySelector('.scenicSpotInfo-box'),
	oImageTitle: document.querySelector('.scenicSpotInfo-box h1'),
	oImageInfo: document.querySelector('.scenicSpotInfo p'),
	oInfoImage: document.querySelector('.infoImage'),
	oScenicSpotLink: document.querySelector('.scenicSpotLink'),
	container: new createjs.Container(),
	box: new createjs.Container(),
	map_container: new createjs.Container(),
	spot_container: new createjs.Container(),
	show_container: new createjs.Container(),
	info_container: new createjs.Container(),
	background_map: null,
	map_property: {
		startX: 0,
		startY: 0,
		moveX: 0,
		moveY: 0,
		width: 0,
		height: 0,
		curScale: 1,
		downScale: 1,
		endScale: 1,
		oldScale: 1,
		minScale: 0.5,
		maxScale: 2.5,
		centerX: 0,
		centerY: 0,
		disX: 0,
		disY: 0
	},
	border: {
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		n: 100
	},
	longPress: false,
	timer: null,
	blackRect: null,
	whiteRect: null,
	isSlide: true,
	isTouch: true,
	currentIndex: 0,
	window_width: window.innerWidth,
	window_height: window.innerHeight,
	setCanvasSize: function() {

		this.canvas.width = this.window_width;
		this.canvas.height = this.window_height;

	},
	createScene: function() {

		createjs.Touch.enable(this.stage);

		this.container.addChild(this.map_container);
		this.container.addChild(this.spot_container);

		this.stage.addChild(this.container);
		this.stage.addChild(this.show_container);

		this.background_map = new createjs.Bitmap(bg[0].src);

		this.map_property.width = this.background_map.image.width;
		this.map_property.height = this.background_map.image.height;

		this.map_container.addChild(this.background_map);


		this.onSetBorder(this.map_property.curScale);

	},
	onSetBorder: function(scale) {		
		this.map_property.centerX = this.map_property.width / 2 * this.map_property.curScale - this.window_width / 2;
		this.map_property.centerY = this.map_property.height / 2 * this.map_property.curScale - this.window_height / 2;
		
		this.container.regX = this.map_property.centerX;
		this.container.regY = this.map_property.centerY;

		this.map_container.scaleX = this.map_container.scaleY = scale;
		this.spot_container.scaleX = this.spot_container.scaleY = scale;

		//this.container.scaleX = this.container.scaleY = scale;

		this.border.left = this.window_width / 2 - this.border.n;
		this.border.right = this.map_property.width * scale - this.window_width / 2 + this.border.n;
		this.border.top = this.window_height / 2 - this.border.n;
		this.border.bottom = this.map_property.height * scale - this.window_height / 2 + this.border.n;

		console.log("container  ",this.container.regX,this.container.regY,this.container.x,this.container.y,this.container.scaleX)
		console.log("map_container  ",this.map_container.regX,this.map_container.regY,this.map_container.x,this.map_container.y,this.map_container.scaleX)
		console.log("spot_container  ",this.spot_container.regX,this.spot_container.regY,this.spot_container.x,this.spot_container.y,this.spot_container.scaleX)
	},
	createScenicSpot: function() {

		var _this = this;

		for(var i = 0; i < data.length; i++) {

			if(data[i].sprite) {
				var spriteData = {
					images: [images[i].src],
					frames: {
						width: parseInt(data[i].w),
						height: parseInt(data[i].h)
					},
					animations: {
						run: [0, data[i].step - 1, 'run', 0.35]
					}
				};

				var spriteSheet = new createjs.SpriteSheet(spriteData);

				var animation = new createjs.Sprite(spriteSheet, "run");

				animation.x = data[i].x;
				animation.y = data[i].y;

				this.spot_container.addChild(animation);

			} else {

				var bitmap = new createjs.Bitmap(images[i].src);

				bitmap.x = data[i].x;
				bitmap.y = data[i].y;

				this.spot_container.addChild(bitmap);
			}

		}

		for(var i = 0; i < this.spot_container.children.length; i++) {

			this.spot_container.children[i].index = i;

			if(this.isTouch) {

				this.spot_container.children[i].on("mousedown", function() {

					_this.timer = setTimeout(function() {

						_this.longPress = true;
						console.log("longPress");
					}, 200);
				});

				this.spot_container.children[i].on("pressup", function() {

					clearTimeout(_this.timer);

					if(!_this.longPress) {
						console.log(this.index, data[this.index].scenepPoit);
						if(data[this.index].scenepPoit != "") {
							_this.currentIndex = this.index;
							_this.onSetInfoData(_this.currentIndex);
						}
					}

					_this.longPress = false;

				});

			}

		}

	},
	touchMap: function() {
		var _this = this;

		this.stage.on("mousedown", function(event) {

			if(event.nativeEvent.touches.length === 1 && _this.isSlide) {

				_this.map_property.startX = _this.map_container.x - event.stageX;
				_this.map_property.startY = _this.map_container.y - event.stageY;

			} else if(event.nativeEvent.touches.length === 2 && _this.isSlide) {
				_this.map_property.downScale = getScale(event);
				_this.map_property.oldScale = _this.map_property.curScale;
			}

		});

		this.stage.on("pressmove", function(event) {

			if(event.nativeEvent.touches.length === 1 && _this.isSlide) {
				_this.map_property.moveX = _this.map_property.startX + event.stageX;
				_this.map_property.moveY = _this.map_property.startY + event.stageY ;

				_this.map_property.disX = _this.map_property.width / 2 * _this.map_property.curScale - _this.map_property.moveX;
				_this.map_property.disY = _this.map_property.height / 2 * _this.map_property.curScale - _this.map_property.moveY;

				if(_this.map_property.disX >= _this.border.left && _this.map_property.disX <= _this.border.right) {
					_this.map_container.x = _this.spot_container.x = _this.map_property.moveX;
					//_this.container.x = _this.map_property.moveX;
					//_this.container.regX = _this.map_property.moveX + _this.map_property.centerX;
				}
				if(_this.map_property.disY >= _this.border.top && _this.map_property.disY <= _this.border.bottom) {
					_this.map_container.y = _this.spot_container.y = _this.map_property.moveY;
					//_this.container.y = _this.map_property.moveY;
					//_this.container.regY = _this.map_property.moveY + _this.map_property.centerY;
				}
				console.log(_this.map_property.centerX, _this.map_property.centerY,_this.map_property.moveX,_this.map_property.moveY)

			} else if(event.nativeEvent.touches.length === 2 && _this.isSlide) {

			}
		});

		this.stage.on("pressup", function() {
			_this.map_property.centerX = _this.container.regX;
			_this.map_property.centerY = _this.container.regY;
		});

		function getScale(e) {
			var x1 = e.nativeEvent.touches[0].clientX;
			var x2 = e.nativeEvent.touches[1].clientX;
			var y1 = e.nativeEvent.touches[0].clientY;
			var y2 = e.nativeEvent.touches[1].clientY;

			var a = x1 - x2;
			var b = y1 - y2
			var s = Math.sqrt(a * a + b * b);

			return s;
		}
	},
	onWindowResize: function() {
		var _this = this;
		window.addEventListener('resize', function() {
			_this.window_width = window.innerWidth;
			_this.window_height = window.innerHeight;
			_this.setCanvasSize();
		}, false);
	},
	reconstruction: function() {
		this.update = this.update.bind(this);
	},
	update: function() {
		createjs.Ticker.addEventListener("tick", this.stage);
	},
	//创建景点列表
	onSetCreateScenePoint: function() {
		var _this = this;
		for(var i = 0; i < data.length; i++) {
			if(data[i].scenepPoit !== "") {
				var li = document.createElement("li");
				var span = document.createElement("span");
				var img = document.createElement("img");
				var p = document.createElement("p");
				img.src = "images/scenePoint/" + data[i].scenepPoit + "/" + data[i].infoImage[0];
				p.innerHTML = data[i].txt;
				span.appendChild(img);
				li.appendChild(span);
				li.appendChild(p);
				li.setAttribute("data-index", i);
				this.oImagesUl.appendChild(li);
			}
		}
		//设置ul的宽度
		this.aImagesLi = document.querySelectorAll('.image-ul ul li');
		this.oImagesUl.style.width = this.aImagesLi.length * (this.aImagesLi[0].offsetWidth + 20) + 20 + "px";

		this.onClickOpenScenicSpotInfo();
	},
	//点击半圆展开景点图片列表
	onClickOpenScenicSpot: function() {
		var _this = this;
		var moveY = false;
		_this.oOpenBottom.addEventListener("click", function() {
			moveY = !moveY;
			if(moveY) {
				_this.oImageContainer.style.transform = "translate3d(0,0,0)";
			} else {
				_this.oImageContainer.style.transform = "translate3d(0,170px,0)";
			}
		}, false);

	},
	//点击底部景点列表图片显示对应景点详细信息
	onClickOpenScenicSpotInfo: function() {
		var _this = this;
		for(var i = 0; i < _this.aImagesLi.length; i++) {
			_this.aImagesLi[i].index = i;
			_this.aImagesLi[i].addEventListener("click", function() {
				_this.currentIndex = this.getAttribute("data-index");
				_this.onSetInfoData(_this.currentIndex);
			}, false);
		}
		//点击透明区域隐藏
		_this.oImageInfoContainer.addEventListener("click", function() {
			fadeOut(_this.oImageInfoContainer);
		}, false);
		//点击白色区域不隐藏
		_this.oImageInfoBox.addEventListener("click", function(e) {
			e.stopPropagation();
		}, false);
	},
	onSetInfoData: function(index) {
		this.oImageTitle.innerHTML = data[index].txt;
		this.oImageInfo.innerHTML = data[index].info;
		this.oInfoImage.innerHTML = "";
		for(var j = 1; j < data[index].infoImage.length; j++) {
			var span = document.createElement("span");
			var img = document.createElement("img");
			img.src = "images/scenePoint/" + data[index].scenepPoit + "/" + data[index].infoImage[j];
			span.appendChild(img);
			this.oInfoImage.appendChild(span);
		}
		if(data[index].aLink) {
			this.oScenicSpotLink.style.display = "block";
			this.oScenicSpotLink.href = data[index].aLink;
		} else {
			this.oScenicSpotLink.style.display = "none";
		}

		fadeIn(this.oImageInfoContainer);
	},
	//点击缩放地图
	onClickZoomMap: function() {
		var _this = this;
		var s = this.map_property.curScale;

		this.oMagnify.addEventListener("click", function() {
			if(s < _this.map_property.maxScale) {
				s += 0.1;
			} else {
				s = _this.map_property.maxScale;
			}
			s = Math.floor(s * 100) / 100;
			_this.map_property.curScale = s;
			_this.onSetBorder(s);
			console.log(s)
		}, false);
		this.oShrink.addEventListener("click", function() {
			if(s > _this.map_property.minScale) {
				s -= 0.1;
			} else {
				s = _this.map_property.minScale;
			}
			s = Math.floor(s * 100) / 100;
			_this.map_property.curScale =s;
			_this.onSetBorder(s);
		}, false);
	},
	init: function() {
		this.setCanvasSize();
		//this.onWindowResize();
		this.createScene();
		this.createScenicSpot();
		this.reconstruction();
		this.update();
		this.touchMap();
		this.onSetCreateScenePoint();
		this.onClickOpenScenicSpot();
		this.onClickZoomMap();
	}
}

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