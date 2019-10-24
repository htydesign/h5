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

var scene, camera, renderer, container;

var raycaster;
var _touch;

var object_ground_plane = new THREE.Object3D(); //存储机场场景地面
var object_ground_ditie = new THREE.Object3D(); //存储地铁场景地面
var object_ground_shamo = new THREE.Object3D(); //存储石油沙漠场景地面

var hintTxt_jichang; //存储机场提示文案
var hintTxt_ditie; //存储地铁提示文案
var hintTxt_chengshi; //存储城市提示文案
var hintTxt_jiaoqu; //存储郊区提示文案
var hintTxt_shiyou; //存储石油提示文案

var group; //大组
var bgSky_group; //远景城市组
var group1; //机场场景组
var group2; //地铁场景组
var group3; //城市场景组
var group4; //郊区场景组
var group5; //石油场景组
var video_group_1; //视频组 1
var video_group_2; //视频组 2
var video_group_3; //视频组 3
var tween; //
var isStart = false; //是否开始
var isRun = true; //是否运动
var isBuffer = false; //是否开始缓冲
var startTime = 0; //用户按下屏幕的开始时间
var endTime = 0; //用户手指离开屏幕的时间

var window_Width = 640; //定义屏幕的宽度
var window_Height = 1138; //定义屏幕的高度
var camera_Positin = { //定义照相机的位置
	x: 0,
	y: 0,
	z: 546 / 4
}
var groupZ = 0; //最外层group数组的Z轴坐标

var normal_speed = 3;
var slow_speed = 1.5;
var slow_speed2 = 0.8;
var speed = normal_speed; //定义场景移动的速度

var isPlayVideo1 = false; //定义视频机场是否可以播放
var isPlayVideo2 = false; //定义视频郊区是否可以播放
var isPlayVideo3 = false; //定义视频地铁是否可以播放
var isAppend = false; //是否添加了元素
var longPress = true; //用户是否长按屏幕
var timer = null; //定时器
var isStartPlayAnimate = false; //是否可以播放序列帧动画
var isUserCloseMusic = false; //是否用户关闭音乐
var isTouchPlayVideo = true; //是否可以点击播放
var h_1 = false;
var h_2 = false;
var h_3 = false;
var isRemove=true;
var isRemove2=true;
var isRemove3=true;

var textureLoader = new THREE.TextureLoader(); //材质加载器

var loading = document.querySelector('.loading');
var load_Txt = document.querySelector('.loading p');
var btn_Box = document.querySelector('.btn-box');
var startPage = document.querySelector('.start-page');
var loadingPoint = document.querySelector('.loading span:nth-child(2)');
var redPoint = document.querySelector('.loading span:nth-child(2) i');
var playhongbao = document.querySelector('.playhongbao');
var music_Icon = document.querySelector('.music-icon');
var click_hongbao = document.querySelector('.playhongbao span:nth-child(2)');
var oMusic = document.getElementById("music");
var oVideoBox = document.getElementById("video_box");
var oVideo = document.getElementById("video");

var oVideo_android = document.createElement("video");
oVideo_android.style.width = "640px";
oVideo_android.style.height = "360px";
oVideo_android.style.position="absolute";
oVideo_android.style.top="50%";
oVideo_android.style.left="0%";
oVideo_android.style.marginTop="-320px";

if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
	
}else{
	music_Icon.style.animationPlayState = 'running';
	music_Icon.style.webkitAnimationPlayState = 'running';
}

music_Icon.addEventListener('touchstart', function() {
	if(oMusic.paused) {
		isUserCloseMusic = false;
		oMusic.play();
		music_Icon.style.animationPlayState = 'running';
		music_Icon.style.webkitAnimationPlayState = 'running';
	} else {
		isUserCloseMusic = true;
		oMusic.pause();
		music_Icon.style.animationPlayState = 'paused';
		music_Icon.style.webkitAnimationPlayState = 'paused';
	}
}, false);

var a = document.querySelector('.loading span:nth-child(1) i:nth-child(1)');
var b = document.querySelector('.loading span:nth-child(1) i:nth-child(3)');

//a.addEventListener('animationend', onBefore);
//a.addEventListener('webkitAnimationEnd', onBefore);

setTimeout(function(){
	onBefore();
	setTimeout(function(){
		onLoadPoint();
	},500);
},350);

function onBefore() {
	b.style.animationPlayState = 'running';
	b.style.webkitAnimationPlayState = 'running';
}

//b.addEventListener('animationend', onLoadPoint);
//b.addEventListener('webkitAnimationEnd', onLoadPoint);

function onLoadPoint() {
	redPoint.style.opacity = 1;
	loadingPoint.style.animationPlayState = 'running';
	loadingPoint.style.webkitAnimationPlayState = 'running';
}

//--------------------------------------------------加载images--------------------------------------------------
loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
	load_Txt.innerHTML = percent + '%';
});
loader.addCompletionListener(function() {

	setTimeout(function(){
		oMusic.play(); //加载完成播放音乐
	
		init(); //加载主体场景
		animate();
		
		playRedPackect(); //加载红包序列帧
	
		startPage.style.display = 'block';
	
		setTimeout(function() { //加载完成后，延迟0.5s执行			
			setTimeout(function() { //延迟0.5s后隐藏、显示、添加class
				loading.style.display = 'none';
				isStartPlayAnimate = true;
			}, 500)
			loading.className = 'loading load-hide';
		}, 500)
	},500);
	
});

//---------------------------------------------------拆红包--------------------------------------------------

function playRedPackect() {

	//桌面--
	var stage = new createjs.Stage("redcanvas");
	createjs.Touch.enable(stage);

	var setFTP = 40; //设置帧频数 每秒 15张
	//createjs.Ticker.framerate=15;
	//createjs.Ticker.interval = setFTP + 1;
	createjs.Ticker.addEventListener("tick", function() {
		stage.update();
	});

	var canvas = document.getElementById("redcanvas");
	canvas.width = window_Width;
	canvas.height = window_Height;

	var imageWidth = 640,
		imageHeight = 1138;

	var total = 24;
	var index = 0;
	var LastTime = 0;
	//红包组
	var redPacketGroup = new createjs.Container();
	redPacketGroup.x = 0;
	redPacketGroup.y = 0;
	stage.addChild(redPacketGroup);

	var oGroup = new createjs.Container();
	oGroup.x = 167;
	oGroup.y = 300;
	stage.addChild(oGroup);

	var onTouchRedPackect = new createjs.Bitmap(fileList_other[5]);
	oGroup.addChild(onTouchRedPackect);

	//播放序列帧
	function playFrame(i) {
		var bitmap = new createjs.Bitmap(fileList[i]);
		bitmap.scaleX = bitmap.scaleY = 1;
		redPacketGroup.addChild(bitmap);
	}

	function setAnimation() {
		var dtNow = Date.now();

		if(dtNow - LastTime >= setFTP && index <= total) {
			redPacketGroup.removeAllChildren();
			LastTime = dtNow;
			playFrame(index);
			index++;
		} else if(index >= 3) {
			oGroup.removeAllChildren();
		}
		if(index >= total) {
			window.cancelAnimationFrame(setAnimation);			
			playhongbao.style.transform = "scale(2.12) translateZ(0)";
			playhongbao.style.webkitTransform = "scale(2.12) translateZ(0)";
			container.style.transform = "scale(1) translateZ(0)";
			container.style.webkitTransform = "scale(1) translateZ(0)";
			btn_Box.style.display = 'block';
			
			setTimeout(function() { //延迟0.5s后隐藏、显示、添加class
				startPage.style.display = 'none';
				playhongbao.className = "start-page loadhide";								
				setTimeout(function() {
					playhongbao.style.display = 'none';					
				}, 500);
			}, 1000);
			setTimeout(function(){
				btn_Box.className = 'btn-box show';
			},200);
		} else {
			window.requestAnimationFrame(setAnimation);
		}
	}

	//-------------------------------------------点击红包播放红包序列帧--------------------------------------------------
	click_hongbao.addEventListener('touchstart', function() {
		if(isStartPlayAnimate) { //可以播放序列帧
			setAnimation();
			document.querySelector('.start-page p').className = 'load-hide';
			if(oMusic.paused) {
				oMusic.play();
				if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
					music_Icon.style.animationPlayState = 'running';
					music_Icon.style.webkitAnimationPlayState = 'running';
				}
			}
//			
//			if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
//				if(oMusic.paused) { //ios 如果music没有播放，就让它播放
//					music_Icon.style.animationPlayState = 'running';
//					music_Icon.style.webkitAnimationPlayState = 'running';
//					oMusic.play();
//				}
//			}
		}
	}, false);
}

//--------------------------------------------------主体场景--------------------------------------------------
function init() {

	container = document.getElementById("container");

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(55, window_Width / window_Height, 1, 6000);
	camera.position.set(camera_Positin.x, camera_Positin.y, camera_Positin.z);
	scene.add(camera);

	group = new THREE.Group();
	scene.add(group);

	bgSky_group = new THREE.Group();

	group1 = new THREE.Group(); //机场场景组
	group2 = new THREE.Group(); //地铁场景组
	group3 = new THREE.Group(); //城市场景组
	group4 = new THREE.Group(); //郊区场景组
	group5 = new THREE.Group(); //石油场景组
	group.add(group1);
	group.add(group2);
	group.add(group3);

	video_group_1 = new THREE.Group(); //视频1
	video_group_2 = new THREE.Group(); //视频2
	video_group_3 = new THREE.Group(); //视频3
	group.add(video_group_1);
	group.add(video_group_2);
	group.add(video_group_3);

	group.add(object_ground_plane);
	group.add(object_ground_ditie);
	group.add(object_ground_shamo);

	hintTxt_jichang = new THREE.Object3D();
	group.add(hintTxt_jichang);

	hintTxt_ditie = new THREE.Object3D();
	group.add(hintTxt_ditie);

	hintTxt_chengshi = new THREE.Object3D();
	group.add(hintTxt_chengshi);

	hintTxt_jiaoqu = new THREE.Object3D();
	group.add(hintTxt_jiaoqu);

	hintTxt_shiyou = new THREE.Object3D();
	group.add(hintTxt_shiyou);

	//天空背景
	var t = textureLoader.load(fileList_other[0]);
	var m = new THREE.SpriteMaterial({
		map: t,
		depthWrite: false
	});
	var p = new THREE.Sprite(m);
	p.scale.set(2800, 2800, 1);
	p.position.x = 0;
	p.position.y = 250;
	p.position.z = -3000;
	scene.add(p);

	//天空背景2
	for(var i = 0; i < data_scene_6.length; i++) {
		drawScene(bgSky_group, data_scene_6[i].w / 8, data_scene_6[i].h / 8, fileList_other[9], data_scene_6[i].x / 8, data_scene_6[i].y / 8, data_scene_6[i].z / 8, data_scene_6[i].mi);
	}
	bgSky_group.children[0].material.opacity = 0;
	//天空模糊背景3
	for(var i = 0; i < data_scene_6.length; i++) {
		drawScene(bgSky_group, data_scene_6[i].w / 8, data_scene_6[i].h / 8, fileList_other[10], data_scene_6[i].x / 8, data_scene_6[i].y / 8, data_scene_6[i].z / 8, data_scene_6[i].mi);
	}
	bgSky_group.children[1].material.opacity = 0;
	group.add(bgSky_group);
	//--------------------------------------------------绘制场景1--------------------------------------------------

	//机场场景--8个飞机-------------------
	for(var i = 0; i < scene_1_plane.length / 2; i++) {
		drawSceneMirroring(group1, scene_1_plane[i].w / 8, scene_1_plane[i].h / 8, fileList_scene_1[0], scene_1_plane[i].x / 8, scene_1_plane[i].y / 8, scene_1_plane[i].z / 8, scene_1_plane[i].mi);
	}
	//机场场景--航站楼-------------------
	for(var i = 0; i < scene_1_floor.length / 2; i++) {
		drawScenehangzhanlou(group1, scene_1_floor[i].w / 8, scene_1_floor[i].h / 8, fileList_scene_1[2], scene_1_floor[i].x / 8, scene_1_floor[i].y / 8, scene_1_floor[i].z / 8, scene_1_floor[i].mi);
	}
	//机场场景--天空的大飞机-------------------
	for(var i = 0; i < data_scene_1.length; i++) {
		drawScene(group1, data_scene_1[i].w / 8, data_scene_1[i].h / 8, fileList_scene_1[1], data_scene_1[i].x / 8, data_scene_1[i].y / 8, data_scene_1[i].z / 8, data_scene_1[i].mi);
	}
	//机场场景--地面-------------------
	drawRoad(object_ground_plane, scene_1_dimian[0].w, scene_1_dimian[0].h, scene_1_dimian[0].z, scene_1_dimian[0].y, -Math.PI * 0.5);
	drawRoad(object_ground_plane, scene_1_dimian[1].w, scene_1_dimian[1].h, scene_1_dimian[1].z, scene_1_dimian[1].y, 0);

	//机场场景--线条---------------------
	for(var i = 0; i < 8; i++) {
		if(i < 5) {
			drawSceneMirroring_xiantiao(object_ground_plane, scene_1_xiantiao[i].w / 8, scene_1_xiantiao[i].h / 8, scene_1_xiantiao[i].x / 8, scene_1_xiantiao[i].y / 8, scene_1_xiantiao[i].z / 8, scene_1_xiantiao[i].mi, 0);
		} else {
			drawSceneMirroring_xiantiao(object_ground_plane, scene_1_xiantiao[i].w / 8, scene_1_xiantiao[i].h / 8, scene_1_xiantiao[i].x / 8, scene_1_xiantiao[i].y / 16, scene_1_xiantiao[i].z / 8, scene_1_xiantiao[i].mi, -0.5 * Math.PI);
		}

	}

	//--------------------------------------------------绘制场景2--------------------------------------------------
	//地铁场景---------------------
	for(var i = 0; i < scene_2_floor.length; i++) {
		if(i == 0) {
			drawSceneMirroring(group2, scene_2_floor[i].w / 8, scene_2_floor[i].h / 8, fileList_scene_2[0], scene_2_floor[i].x / 8, scene_2_floor[i].y / 8, scene_2_floor[i].z / 8, scene_2_floor[i].mi);
		} else if(i == 1) {
			drawSceneMirroring(group2, scene_2_floor[i].w / 8, scene_2_floor[i].h / 8, fileList_scene_2[0], scene_2_floor[i].x / 8, scene_2_floor[i].y / 8, scene_2_floor[i].z / 8, scene_2_floor[i].mi);
		} else {
			drawSceneMirroring(group2, scene_2_floor[i].w / 8, scene_2_floor[i].h / 8, fileList_scene_2[1], scene_2_floor[i].x / 8, scene_2_floor[i].y / 8, scene_2_floor[i].z / 8, scene_2_floor[i].mi);
		}
	}
	//马路，铁轨，地铁，东方明珠
	for(var i = 1; i < data_scene_2.length; i++) {
		if(i == 1) {
			drawtiegui(group2, data_scene_2[1].w, data_scene_2[1].h, data_scene_2[1].z, -data_scene_2[i].y);
		} else {
			drawSceneMirroring(group2, data_scene_2[i].w / 8, data_scene_2[i].h / 8, fileList_scene_2[i], data_scene_2[i].x / 8, data_scene_2[i].y / 8, data_scene_2[i].z / 8, data_scene_2[i].mi);
		}
	}
	//地铁场景--地面-------------------
	drawRoad(object_ground_ditie, data_scene_2[0].w, data_scene_2[0].h, data_scene_2[0].z, data_scene_2[0].y, -Math.PI * 0.5);

	//--------------------------------------------------绘制场景3--------------------------------------------------
	//城市场景---------------------
	for(var i = 1; i < data_scene_3.length; i++) {

		drawScene(group3, data_scene_3[i].w / 8, data_scene_3[i].h / 8, fileList_scene_3[i - 1], data_scene_3[i].x / 8, data_scene_3[i].y / 8, data_scene_3[i].z / 8, data_scene_3[i].mi);

	}
	//城市线条
	drawSceneMirroring_xiantiao(group, data_scene_3[0].w / 8, data_scene_3[0].h / 8, data_scene_3[0].x / 8, data_scene_3[0].y / 8, data_scene_3[0].z / 8, data_scene_3[0].mi, 0);

	//新增-------------------
	for(var i = 1; i < add_scene_3_1.length; i++) {
		if(i == 5) {
			drawScene(group3, add_scene_3_1[i].w / 8, add_scene_3_1[i].h / 8, fileList_scene_3[3], add_scene_3_1[i].x / 8, data_scene_3[i].y / 8, add_scene_3_1[i].z / 8, add_scene_3_1[i].mi);
		} else {
			drawScene(group3, add_scene_3_1[i].w / 8, add_scene_3_1[i].h / 8, fileList_scene_3[4], add_scene_3_1[i].x / 8, data_scene_3[i].y / 8, add_scene_3_1[i].z / 8, add_scene_3_1[i].mi);
		}
	}

	//--------------------------------------------------绘制场景4--------------------------------------------------
	//郊区场景---------------------
	for(var i = 0; i < scene_4_floor.length; i++) {
		if(i == 2) {
			drawScenekejilou(group4, scene_4_floor[i].w / 8, scene_4_floor[i].h / 8, fileList_scene_4[2], scene_4_floor[i].x / 8, scene_4_floor[i].y / 8, scene_4_floor[i].z / 8, scene_4_floor[i].mi);
		} else {
			drawSceneMirroring(group4, scene_4_floor[i].w / 8, scene_4_floor[i].h / 8, fileList_scene_4[1], scene_4_floor[i].x / 8, scene_4_floor[i].y / 8, scene_4_floor[i].z / 8, scene_4_floor[i].mi);
		}
	}
	for(var i = 0; i < data_scene_4.length; i++) {
		drawScene(group4, data_scene_4[i].w / 8, data_scene_4[i].h / 8, fileList_scene_4[i + 3], data_scene_4[i].x / 8, data_scene_4[i].y / 8, data_scene_4[i].z / 8, data_scene_4[i].mi);
	}
	//新增
	for(var i = 0; i < add_scene_4_1.length; i++) {
		drawScene(group4, add_scene_4_1[i].w / 8, add_scene_4_1[i].h / 8, fileList_scene_3[4], add_scene_4_1[i].x / 8, add_scene_4_1[i].y / 8, add_scene_4_1[i].z / 8, add_scene_4_1[i].mi);
	}

	//--------------------------------------------------绘制场景5--------------------------------------------------
	//石油场景---------------------
	for(var i = 0; i < scene_5_floor.length; i++) {

		drawSceneMirroring(group5, scene_5_floor[i].w / 8, scene_5_floor[i].h / 8, fileList_scene_5[i], scene_5_floor[i].x / 8, scene_5_floor[i].y / 8, scene_5_floor[i].z / 8, scene_5_floor[i].mi);
	}
	for(var i = 0; i < data_scene_5.length; i++) {

		drawScene(group5, data_scene_5[i].w / 8, data_scene_5[i].h / 8, fileList_scene_5[i + 4], data_scene_5[i].x / 8, data_scene_5[i].y / 8, data_scene_5[i].z / 8, data_scene_5[i].mi);

	}
	//石油场景--沙漠地面-------------------
	drawshamo(object_ground_shamo, scene_5_shamo[0].w, scene_5_shamo[0].h, scene_5_shamo[0].z, scene_5_shamo[0].y, -Math.PI * 0.5);

	//----------------------------------机场场景文案-----------------------------------------------------------
	for(var i = 0; i < hint_1.length; i++) {
		if(i == 2) {
			drawSceneHint(hintTxt_jichang, hint_1[i].w / 8, hint_1[i].h / 8, fileList_border[1], hint_1[i].x / 8, hint_1[i].y / 8, hint_1[i].z / 8, hint_1[i].mi);
		} else {
			drawSceneHint(hintTxt_jichang, hint_1[i].w / 8, hint_1[i].h / 8, fileList_border[0], hint_1[i].x / 8, hint_1[i].y / 8, hint_1[i].z / 8, hint_1[i].mi);
		}
	}

	//----------------------------------地铁场景文案-----------------------------------------------------------
	for(var i = 0; i < hint_2.length; i++) {
		drawSceneHint(hintTxt_ditie, hint_2[i].w / 8, hint_2[i].h / 8, fileList_border[i + 2], hint_2[i].x / 8, hint_2[i].y / 8, hint_2[i].z / 8, hint_2[i].mi);
	}

	//----------------------------------城市场景文案-----------------------------------------------------------
	for(var i = 0; i < hint_3.length; i++) {
		drawSceneHint(hintTxt_chengshi, hint_3[i].w / 8, hint_3[i].h / 8, fileList_border[i + 4], hint_3[i].x / 8, hint_3[i].y / 8, hint_3[i].z / 8, hint_3[i].mi);
	}

	//----------------------------------郊区场景文案-----------------------------------------------------------
	for(var i = 0; i < hint_4.length; i++) {
		if(i == 0 || i == 1) {
			drawSceneHint(hintTxt_jiaoqu, hint_4[i].w / 8, hint_4[i].h / 8, fileList_border[9], hint_4[i].x / 8, hint_4[i].y / 8, hint_4[i].z / 8, hint_4[i].mi);
		} else if(i == 2 || i == 3 || i == 4) {
			drawSceneHint(hintTxt_jiaoqu, hint_4[i].w / 8, hint_4[i].h / 8, fileList_border[10], hint_4[i].x / 8, hint_4[i].y / 8, hint_4[i].z / 8, hint_4[i].mi);
		} else {
			drawSceneHint(hintTxt_jiaoqu, hint_4[i].w / 8, hint_4[i].h / 8, fileList_border[11], hint_4[i].x / 8, hint_4[i].y / 8, hint_4[i].z / 8, hint_4[i].mi);
		}
	}

	//----------------------------------石油场景文案-----------------------------------------------------------
	for(var i = 0; i < hint_5.length; i++) {
		if(i == 2) {
			drawSceneHint(hintTxt_shiyou, hint_5[i].w / 8, hint_5[i].h / 8, fileList_border[13], hint_5[i].x / 8, hint_5[i].y / 8, hint_5[i].z / 8, hint_5[i].mi);
		} else {
			drawSceneHint(hintTxt_shiyou, hint_5[i].w / 8, hint_5[i].h / 8, fileList_border[12], hint_5[i].x / 8, hint_5[i].y / 8, hint_5[i].z / 8, hint_5[i].mi);
		}
	}

	//场景--4-郊区视频提示
	for(var i = 0; i < video_hint_1.length; i++) {
		drawSceneBtn(video_group_1, video_hint_1[i].w / 8, video_hint_1[i].h / 8, fileList_other[11+i], video_hint_1[i].x / 8, video_hint_1[i].y / 8, video_hint_1[i].z / 8, video_hint_1[i].mi,"btn04");
	}
	video_group_1.children[0].material.opacity = 0;
	video_group_1.children[1].material.opacity = 0;

	//场景--1-机场视频提示
	for(var i = 0; i < video_hint_2.length; i++) {
		drawSceneBtn(video_group_2, video_hint_2[i].w / 8, video_hint_2[i].h / 8, fileList_other[11+i], video_hint_2[i].x / 8, video_hint_2[i].y / 8, video_hint_2[i].z / 8, video_hint_2[i].mi,"btn01");
	}
	video_group_2.children[0].material.opacity = 0;
	video_group_2.children[1].material.opacity = 0;
	
	//场景--2-地铁视频提示
	for(var i = 0; i < video_hint_3.length; i++) {
		drawSceneBtn(video_group_3, video_hint_3[i].w / 8, video_hint_3[i].h / 8, fileList_other[11+i], video_hint_3[i].x / 8, video_hint_3[i].y / 8, video_hint_3[i].z / 8, video_hint_2[i].mi,"btn02");
	}
	video_group_3.children[0].material.opacity = 0;
	video_group_3.children[1].material.opacity = 0;

	raycaster = new THREE.Raycaster();
	_touch = new THREE.Vector2();

	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setClearColor(0xffffff);
	renderer.setPixelRatio(1);
	renderer.setSize(window_Width, window_Height);
	container.appendChild(renderer.domElement);

	document.getElementById("H5_box").addEventListener('touchstart', documentTouchStart, false);
}
document.querySelector('.video-box span').addEventListener('touchstart',function(e){
	e.stopPropagation();
},false);
function documentTouchStart(event) {
	event.preventDefault();
	_touch.x = (event.touches[0].clientX / window_Width) * 2 - 1;
	_touch.y = -(event.touches[0].clientY / window_Height) * 2 + 1;

	raycaster.setFromCamera(_touch, camera);

	//视频1--机场
	var intersects1 = raycaster.intersectObjects(video_group_2.children);
	if(intersects1.length > 0) {
		console.log(intersects1[0].object.id);
		if(intersects1[0].object.name === "btn01") {
			if(isPlayVideo1) {
				if(isTouchPlayVideo) {
					isTouchPlayVideo = false;					
					isAppend = true;
					oMusic.pause();
					oVideoBox.style.visibility = 'visible';					
					if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
						oVideo.src = "video/jichang.mp4";
						oVideo.play();
					}else{
						isRemove=false;
						if(isRemove2){
							oVideoBox.removeChild(oVideo);
						}	
						isRemove2=false;
						oVideo_android.src = "video/jichang.mp4";
						oVideoBox.appendChild(oVideo_android);
						oVideo_android.play();
					}
				}
				h_1 = true;
			}
		}
	}

	//视频2--郊区
	var intersects4 = raycaster.intersectObjects(video_group_1.children);
	if(intersects4.length > 0) {
		console.log(intersects4[0].object.id);
		if(intersects4[0].object.name === "btn04") {
			if(isPlayVideo2) {
				if(isTouchPlayVideo) {
					isTouchPlayVideo = false;					
					isAppend = true;
					oMusic.pause();
					oVideoBox.style.visibility = 'visible';					
					if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {						
						oVideo.src = "video/jiaoqu.mp4";
						oVideo.play();
					}else{
						isRemove=false;
						if(isRemove2){
							oVideoBox.removeChild(oVideo);
						}	
						isRemove2=false;
						oVideo_android.src = "video/jiaoqu.mp4";
						oVideoBox.appendChild(oVideo_android);
						oVideo_android.play();
					}
				}
				h_2 = true;
			}
		}
	}
	//视频3--地铁
	var intersects2 = raycaster.intersectObjects(video_group_3.children);
	if(intersects2.length > 0) {
		console.log(intersects2[0].object.id);
		if(intersects2[0].object.name === "btn02") {
			if(isPlayVideo3) {
				if(isTouchPlayVideo) {
					isTouchPlayVideo = false;					
					isAppend = true;
					oMusic.pause();
					oVideoBox.style.visibility = 'visible';					
					if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {						
						oVideo.src = "video/ditie.mp4";
						oVideo.play();
					}else{
						isRemove=false;
						if(isRemove2){
							oVideoBox.removeChild(oVideo);
						}	
						isRemove2=false;
						oVideo_android.src = "video/ditie.mp4";
						oVideoBox.appendChild(oVideo_android);
						oVideo_android.play();
					}
				}
				h_3 = true;
			}
		}
	}
}
$('.video-box').on('touchstart', function() {
	if(!isTouchPlayVideo) {
		oVideoBox.style.visibility = 'hidden';
		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {
			
		}else{
			if(isRemove){
				
			}else{
				oVideoBox.removeChild(oVideo_android);
				isRemove=true;
			}
		}
		setTimeout(function() {
			isTouchPlayVideo = true;
		}, 500)
	}
});

//--------------------------------------------------绘制场景图片--------------------------------------------------
//镜像-------------------------
function drawSceneMirroring(g, w, h, i, x, y, z, mi) {
	var t = textureLoader.load(i);
	var m = new THREE.SpriteMaterial({
		map: t,
		transparent: true,
		depthWrite: false
	});
	var p = new THREE.Sprite(m);
	p.scale.set(mi * w, h, 1);
	p.position.set(x, z, -y);
	g.add(p);
	var cp = p.clone();
	cp.position.x = -x;
	cp.scale.x = -mi * w;
	g.add(cp);
}
function drawScenehangzhanlou(g, w, h, i, x, y, z, mi) {
	var t = textureLoader.load(i);
	var m = new THREE.SpriteMaterial({
		map: t,
		transparent: true,
		depthWrite: false
	});
	var p = new THREE.Sprite(m);
	p.scale.set(mi * w, h, 1);
	p.position.set(x, z, -y);
	p.name="hangzhanlou";
	g.add(p);
	var cp = p.clone();
	cp.position.x = -x;
	cp.scale.x = -mi * w;
	g.add(cp);
}
function drawScenekejilou(g, w, h, i, x, y, z, mi) {
	var t = textureLoader.load(i);
	var m = new THREE.SpriteMaterial({
		map: t,
		transparent: true,
		depthWrite: false
	});
	var p = new THREE.Sprite(m);
	p.scale.set(mi * w, h, 1);
	p.position.set(x, z, -y);
	p.name="kejilou";
	g.add(p);
	var cp = p.clone();
	cp.position.x = -x;
	cp.scale.x = -mi * w;
	g.add(cp);
}
//非镜像-------------------------
function drawScene(g, w, h, i, x, y, z, mi) {
	var t = textureLoader.load(i);
	var m = new THREE.SpriteMaterial({
		map: t,
		transparent: true,
		depthWrite: false
	});
	var p = new THREE.Sprite(m);
	p.scale.set(mi * w, h, 1);
	p.position.set(x, z, -y);
	g.add(p);
}
function drawSceneBtn(g, w, h, i, x, y, z, mi,n) {
	var t = textureLoader.load(i);
	var m = new THREE.SpriteMaterial({
		map: t,
		transparent: true,
		depthWrite: false
	});
	var p = new THREE.Sprite(m);
	p.scale.set(mi * w, h, 1);
	p.position.set(x, z, -y);
	p.name=n;
	g.add(p);
}
//镜像----------机场场景线条---------------
function drawSceneMirroring_xiantiao(obj, w, h, x, y, z, mi, rz) {
	var g = new THREE.PlaneGeometry(w, h);
	var m = new THREE.MeshBasicMaterial({
		color: 0xffffff,
		opacity: 0.1,
		alphaTest: false,
		transparent: true
	});
	var p = new THREE.Mesh(g, m);
	p.position.set(x, z, -y);
	p.rotation.set(-0.5 * Math.PI, 0, rz);
	obj.add(p);
	var cp = p.clone();
	cp.position.x = -x;
	obj.add(cp);
}

//绘制地面
function drawRoad(obj, w, h, y, z, rx) {
	var texture_dimian = textureLoader.load(fileList_other[3]);
	texture_dimian.wrapS = texture_dimian.wrapT = THREE.RepeatWrapping;
	texture_dimian.repeat.set(5, 5);
	var dimian = new THREE.Mesh(new THREE.PlaneGeometry(w / 8, h / 8), new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: texture_dimian
	}));
	dimian.rotation.x = rx;
	dimian.position.set(0, y / 8, -z / 8);
	obj.add(dimian);
}

//绘制铁轨
function drawtiegui(obj, w, h, y, z) {
	var texture_tiegui = textureLoader.load(fileList_scene_2[4]);
	texture_tiegui.wrapS = texture_tiegui.wrapT = THREE.RepeatWrapping;
	texture_tiegui.repeat.set(1, 6);
	var tiegui = new THREE.Mesh(new THREE.PlaneGeometry(w / 16, h / 8), new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: texture_tiegui
	}));
	tiegui.rotation.x = -Math.PI * 0.5;
	tiegui.position.set(0, y / 8, z / 8);
	obj.add(tiegui);
}
//绘制沙漠
function drawshamo(obj, w, h, y, z, rx) {
	var texture_shamo = textureLoader.load(fileList_other[8]);
	texture_shamo.wrapS = texture_shamo.wrapT = THREE.RepeatWrapping;
	texture_shamo.repeat.set(6, 6);
	var shamo = new THREE.Mesh(new THREE.PlaneGeometry(w / 8, h / 8), new THREE.MeshBasicMaterial({
		color: 0xffffff,
		map: texture_shamo
	}));
	shamo.rotation.x = rx;
	shamo.position.set(0, y / 8, -z / 8);
	obj.add(shamo);
}

//提示文案-------------------------
function drawSceneHint(obj, w, h, i, x, y, z, mi) {
	var t = textureLoader.load(i);
	var m = new THREE.SpriteMaterial({
		map: t,
		transparent: true,
		depthWrite: false,
		opacity: 0
	});
	var p = new THREE.Sprite(m);
	p.scale.set(mi * w, h, 1);
	p.position.set(x, z, -y);
	obj.add(p);
}

//--------------------------------------------------文案建筑线条显示动画--------------------------------------------------
//机场
function hint_jichang() {
	tweenAnimationA(hintTxt_jichang.children[0]);
	tweenAnimationA(hintTxt_jichang.children[1]);
	setTimeout(function() {
		tweenAnimationB(hintTxt_jichang.children[2]);
	}, 500);
}
//地铁
function hint_ditie() {
	tweenAnimationA(hintTxt_ditie.children[0]);
	setTimeout(function() {
		tweenAnimationB(hintTxt_ditie.children[1]);
	}, 500);
}
//城市
function hint_chengshi() {

	tweenAnimationA(hintTxt_chengshi.children[0]);

	setTimeout(function() {
		tweenAnimationA(hintTxt_chengshi.children[1]);
	}, 500);

	tweenAnimationB(hintTxt_chengshi.children[3]);

}

function hint_chengshi2() {

	tweenAnimationA(hintTxt_chengshi.children[2]);	
	setTimeout(function() {
		tweenAnimationB(hintTxt_chengshi.children[4]);
	}, 500);
}

//郊区 6个子元素
function hint_jiaoqu() {
	tweenAnimationA(hintTxt_jiaoqu.children[2]);

	setTimeout(function() {
		tweenAnimationA(hintTxt_jiaoqu.children[3]);
		tweenAnimationA(hintTxt_jiaoqu.children[4]);
	}, 500);
	setTimeout(function() {
		tweenAnimationB(hintTxt_jiaoqu.children[5]);
	}, 1000);
}

function hint_jiaoqu2() {
	tweenAnimationA(hintTxt_jiaoqu.children[1]);
	tweenAnimationA(hintTxt_jiaoqu.children[0]);
}

//石油
function hint_shiyou() {
	tweenAnimationA(hintTxt_shiyou.children[1]);
	tweenAnimationA(hintTxt_shiyou.children[0]);
	setTimeout(function() {
		tweenAnimationB(hintTxt_shiyou.children[2]);
	}, 500);
}

//视频手指提示
function setHanderHint(obj) {
	var tweenA = new TWEEN.Tween(obj.children[1].material);
	tweenA.to({
		opacity: 1
	}, 250).start();

	tweenA.repeat(Infinity);
	tweenA.yoyo(true);
	
	var tweenB = new TWEEN.Tween(obj.children[0].material);
	tweenB.to({
		opacity: 1
	}, 500).start();
}

function setHanderHintHide(obj) {
	var tweenA = new TWEEN.Tween(obj.children[0].material);
	tweenA.to({
		opacity: 0
	}, 100).start();
}

//建筑高亮
function tweenAnimationA(obj) {
	var tweenA = new TWEEN.Tween(obj.material);
	tweenA.to({
		opacity: 0.5
	}, 250).start();

	tweenA.repeat(5);
	tweenA.yoyo(true);
	tweenA.onComplete(function() {
		obj.material.opacity = 0;
	});
}
//文案出现
function tweenAnimationB(obj) {
	var tweenA = new TWEEN.Tween(obj.material);
	tweenA.to({
		opacity: 1
	}, 500).start();
}

function bgsky() {

	tween = new TWEEN.Tween(scene.children[2].material);
	tween.to({
		opacity: 0
	}, 2000).delay(500).start();
}

function bgsky2() {
	tween = new TWEEN.Tween(bgSky_group.children[0].material);
	tween.to({
		opacity: 1
	}, 2000).start();
	var tweenb = new TWEEN.Tween(bgSky_group.children[1].material);
	tweenb.to({
		opacity: 1
	}, 2000).delay(1000).start();
}

function bgskyMohu() {
	tween = new TWEEN.Tween(bgSky_group.children[0].material);
	tween.to({
		opacity: 0
	}, 1000).delay(1000).start();
	tween.onComplete(function() {
		$('.info').delay(700).fadeIn(700);
	});
}
//--------------------------------------------------文案建筑线条隐藏动画--------------------------------------------------
function hint_hide(obj) {
	for(var i = 0; i < obj.children.length; i++) {
		obj.children[i].material.opacity = 0;
	}
}

//--------------------------------------------------按下按钮播放动画--------------------------------------------------

var onPressBtn = document.querySelector('.btn-box span:nth-child(2)');
var oActive = document.querySelector('.btn-box span:nth-child(1)');

onPressBtn.addEventListener('touchstart', onTouchStart, false);

//--------------------------------------------------手指按下--------------------------------------------------
function onTouchStart(e) {
	e.preventDefault();
	longPress = true;
	isStart = false;

	if(isAppend) {
		oVideoBox.style.visibility = 'hidden';
		if(browser.versions.iPhone || browser.versions.iPad || browser.versions.ios) {			
		}else{
			if(isRemove){
				
			}else{
				oVideoBox.removeChild(oVideo_android);
				isRemove=true;
			}
		}
		isTouchPlayVideo = true;
		isAppend = false;

		if(isUserCloseMusic) {

		} else {
			if(oMusic.paused) {
				oMusic.play();
			}
		}
	}
	onPressBtn.addEventListener('touchend', onTouchEnd, false);

	startTime = Date.now();

	timer = setTimeout(function() {
		if(longPress) {

			if(isRun) {
				btn_Paused();
				isStart = true;
				btn_Running();
			}
		}
	}, 300);
}

//--------------------------------------------------手指抬起--------------------------------------------------
function onTouchEnd() {
	endTime = Date.now();
	btn_Paused();
	if(endTime - startTime > 300) {
		isStart = false;
	}
	longPress = false;
	clearTimeout(timer);
}

//--------------------------------------------------删除元素组--------------------------------------------------
function removeCube(i) {
	var allChildren = group.children;
	var lastObject = allChildren[i];
	if(lastObject instanceof THREE.Group) {
		group.remove(lastObject)
		group.numberOfObjects = group.children.length;
	}
}

//删除组内子元素
function remove_children(obj) {
	var allChildren = obj.children;
	for(var i = 0; i < allChildren.length; i++) {
		var lastObject = allChildren[i];
		obj.remove(lastObject);
		obj.numberOfObjects = obj.children.length;
	}
}

function btn_Paused() {
	oActive.style.animationPlayState = 'paused';
	oActive.style.webkitAnimationPlayState = 'paused';
}

function btn_Running() {
	oActive.style.animationPlayState = 'running';
	oActive.style.webkitAnimationPlayState = 'running';
}
//--------------------------------------------------动画循环--------------------------------------------------
var t1 = 0;
var t2 = 0;
var t3 = 0;
var t4 = 0;
var t5 = 0;
var t6 = 0;
var t7 = 0;
var t8 = 0;
var t9 = 0;
var d1 = 0;

var v1 = 0;
var v2 = 0;

var add = 0;

var h1=0;
var h2=0;
var h3=0;

function animate() {

	requestAnimationFrame(animate);

	TWEEN.update();

	groupZ = group.position.z;

	//机场场景提示文案
	if(groupZ > 200 && groupZ < 250) {
		if(t1 < 1) {
			hint_jichang();
			speed = slow_speed;
			isPlayVideo1 = true;
			$('.hint-txt h1:nth-child(1)').fadeIn(500);
			t1++;
		}
	} else if(groupZ >= 250 && groupZ < 500) { //暂停
		if(v1 < 1) {
			isStart = false;
			isPlayVideo1 = true;
			btn_Paused();
			speed = slow_speed;
			setHanderHint(video_group_2);
			
			v1++;
		}
	} else if(groupZ >= 570 && groupZ < 580) {
		if(h1 < 1) {
			$('.hint-txt h1:nth-child(1)').fadeOut();
			h1++;
		}
	}else if(groupZ >= 630 && groupZ < 830) { //进入地铁场景后删除机场场景
		if(d1 < 1) {
			console.log("进入地铁场景后删除机场场景");
			removeCube(0);
			hint_ditie();
			isStart = false;
			btn_Paused();
			speed = slow_speed;
			isPlayVideo3 = true;
			setHanderHint(video_group_3);
			$('.hint-txt h1:nth-child(2)').fadeIn(500);			
			d1++;
		}
	} else if(groupZ >= 830 && groupZ < 900) { //地铁场景提示文案
		if(t2 < 1) {
			speed = normal_speed;
			t2++;
		}
	} else if(groupZ >= 900 && groupZ < 920) {
		if(h2 < 1) {
			$('.hint-txt h1:nth-child(2)').fadeOut();
			speed = normal_speed;
			h2++;
		}
	} else if(groupZ >= 920 && groupZ < 1200) {
		if(add < 1) {
			speed = normal_speed;
			group.add(group4); //添加郊区场景
			group.add(group5); //添加石油场景
			add++;
		}
	} else if(groupZ >= 1200 && groupZ < 1450) { //城市场景1提示文案
		if(t3 < 1) {
			console.log("进入城市场景删除地铁场景");
			removeCube(0); //进入城市场景删除地铁场景
			hint_chengshi();
			speed = slow_speed;
			$('.hint-txt h1:nth-child(3)').fadeIn(500);
			t3++;
		}
	}else if(groupZ >= 1450 && groupZ < 1750) { //城市场景2提示文案
		if(t9 < 1) {
			hint_chengshi2();
			speed = slow_speed;
			t9++;
		}
	}else if(groupZ >= 1750 && groupZ < 1900) {
		if(h3 < 1) {
			$('.hint-txt h1:nth-child(3)').fadeOut();
			h3++;
		}
	} else if(groupZ >= 1900 && groupZ < 2100) { //郊区场景提示文案
		if(t4 < 1) {
			hint_jiaoqu();
			speed = slow_speed2;
			$('.hint-txt h1:nth-child(4)').fadeIn(500);
			t4++;
		}
	} else if(groupZ >= 2100 && groupZ < 2200) {
		if(t8 < 1) {
			setHanderHint(video_group_1);
			hint_jiaoqu2();
			isPlayVideo2 = true;
			btn_Paused();
			speed = slow_speed;
			isStart = false;
			console.log("进入郊区场景后删除城市场景");
			removeCube(0);
			t8++;
		}
	} else if(groupZ >= 2200 && groupZ <= 2400) { //播放第二个视频
		if(v2 < 1) {

			$('.hint-txt h1:nth-child(4)').fadeOut();
			v2++;
		}
	} else if(groupZ >= 2500 && groupZ <= 2890) { //石油场景提示文案
		if(t5 < 1) {
			console.log("进入石油场景后删除郊区场景");
			removeCube(0); //进入石油场景后删除郊区场景
			hint_shiyou();
			speed = slow_speed;
			t5++;
		}
	} else if(groupZ >= 2900 && groupZ <= 3235) { //显示远景城市
		if(t6 < 1) {
			bgsky();
			bgsky2();
			t6++;
		}
	} else if(groupZ >= 3235) { //终点
		if(t7 < 1) {
			bgskyMohu();
			btn_Box.className = 'btn-box load-hide';
			isRun = false;
			t7++;
		}
	} else {
		speed = normal_speed;
	}

	//是否运动
	if(isRun) {
		if(isStart) {
			group.position.z += speed;
			console.log("距离： " + groupZ + "   " + "速度： " + speed);
		}
	}

	renderer.render(scene, camera);

}

$('.share_btn').on('touchstart', function() {
	$('.share-box').fadeIn();
});
$('.share-box').on('touchstart', function() {
	$('.share-box').fadeOut();
});

