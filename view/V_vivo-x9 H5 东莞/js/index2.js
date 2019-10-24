var container = document.getElementById("container"),
	scene,
	camera,
	renderer,
	boxGroup,
	skyGroup,
	sceneGeometry,
	sceneMaterial,
	scenePlaneMesh,
	startX = 0,
	moveX = 0,
	endX = 0,
	slideDistance = 10,
	cameraStartZ = 100,
	cameraEndZ = 1400,
	speed1 = 1,
	speed2 = 2.5,
	direction = 1,
	isUser = false,
	isPause = true,
	bBtn = false,
	isAlterSpeed=false,
	isCritical = false,
	minDistance = false,
	maxDistance = false,
	bgMaps = [],
	textureLoader = new THREE.TextureLoader(),
	stageGeometry,
	stageMaterial,
	stagePlaneMesh,
	lightGeometry,
	lightMaterial,
	lightPlaneMesh,
	oGeo1,oGeo2,oGeo3,oMat1,oMat2,oMat3,oMesh1,oMesh2,oMesh3,
	tween;

var imgUrl = 'texture/00.jpg'; //刚开始的用户图片
var newimgUrl = 'texture/11.jpg'; //拍照者的图片
var isblur=false,isDim=true;
var oMusic = document.getElementById("music");
var startTime=new Date().getTime();
var endTime=0;
var dis=0;
//创建一个加载
var loader = new window.PxLoader();

var fileList = [
	'texture/scene-01/scene-01-left-01.png',
	'texture/scene-01/scene-01-left-02.png',
	'texture/scene-01/scene-01-left-03.png',
	'texture/scene-01/scene-01-left-04.png',
	'texture/scene-01/scene-01-right-01.png',
	'texture/scene-01/scene-01-right-02.png',
	'texture/scene-01/scene-01-right-03.png',
	'texture/scene-01/scene-01-right-04.png',
	'texture/scene-01/scene-01-kaixuanmen.png',
	'texture/scene-01/scene-01-img-01.png',
	'texture/scene-01/scene-01-img-03.png',
	'texture/scene-01/scene-01-img-04.png',
	'texture/scene-01/scene-01-img-05.png',
	'texture/scene-01/scene-01-img-06.png',
	'texture/scene-01/scene-01-img-07.png',
	'texture/scene-01/scene-01-img-08.png',
	'texture/scene-01/scene-01-img-09.png',
	'texture/scene-01/scene-01-img-10.png',
	'texture/scene-01/scene-01-img-11.png',
	'texture/scene-01/scene-01-img-12.png',
	'texture/scene-01/scene-01-img-13.png',

	'texture/scene-02/scene-02-left-01.png',
	'texture/scene-02/scene-02-left-02.png',
	'texture/scene-02/scene-02-left-03.png',
	'texture/scene-02/scene-02-left-04.png',
	'texture/scene-02/scene-02-right-01.png',
	'texture/scene-02/scene-02-right-02.png',
	'texture/scene-02/scene-02-right-03.png',
	'texture/scene-02/scene-02-right-04.png',
	'texture/scene-02/scene-02-tieta.png',
	'texture/scene-02/scene-02-zixingche.png',
	'texture/scene-02/scene-02-img-01.png',
	'texture/scene-02/scene-02-img-02.png',
	'texture/scene-02/scene-02-img-03.png',
	'texture/scene-02/scene-02-img-04.png',
	'texture/scene-02/scene-02-img-05.png',
	'texture/scene-02/scene-02-img-06.png',

	'texture/scene-03/scene-03-left-01.png',
	'texture/scene-03/scene-03-left-02.png',
	'texture/scene-03/scene-03-left-03.png',
	'texture/scene-03/scene-03-left-04.png',
	'texture/scene-03/scene-03-right-01.png',
	'texture/scene-03/scene-03-right-02.png',
	'texture/scene-03/scene-03-right-03.png',
	'texture/scene-03/scene-03-right-04.png',
	'texture/scene-03/scene-03-img-01.png',
	'texture/scene-03/scene-03-img-02.png',
	'texture/scene-03/scene-03-img-03.png',
	'texture/scene-03/scene-03-img-04.png',
	'texture/scene-03/scene-03-img-05.png',
	'texture/scene-03/scene-03-img-06.png',
	'texture/scene-03/scene-03-img-07.png',

	'texture/scene-04/scene-05-img-01.png',
	'texture/scene-04/scene-05-img-02.png',
	'texture/scene-04/scene-05-img-03.png',
	'texture/scene-04/scene-05-img-04.png',
	'texture/scene-04/scene-05-img-05.png',
	'texture/scene-04/scene-05-img-07.png',
	'texture/scene-04/scene-05-img-08.png',
	'texture/scene-04/scene-05-img-09.png',
	'texture/scene-04/scene-05-img-10.png',
	'texture/scene-04/scene-05-img-12.png',
	'texture/scene-04/scene-05-img-13.png',
	'texture/scene-04/scene-05-img-14.png',
	
	'texture/scene-04/scene-05-img-17.png',
	'texture/scene-04/scene-05-img-18.png',
	'texture/scene-04/scene-05-img-20.jpg',

	'texture/scene-jia-01.png',
	'texture/scene-jia-02.png',
	'texture/scene-jia-03.png',
	'texture/scene-jia-04.png',

	'texture/scene-01/500w.png',
	'texture/scene-02/800w.png',
	'texture/scene-03/1600w.png',
	'texture/scene-04/2000w.png',

	'images/hint-scale.png',

	'images/1.jpg',
	'images/2.jpg',
	'images/3.jpg',
	'images/4.jpg',
	'images/5.jpg',
	'images/6.jpg',
	'images/7.jpg',
	'images/8.jpg',
	'images/9.jpg',
	'images/10.jpg',
	'images/11.jpg',
	'images/12.jpg',
	'images/13.jpg',
	'images/14.jpg',
	'images/15.jpg',
	'images/16.jpg',
	'images/17.jpg',
	'images/18.jpg',
	'images/19.jpg',
	'images/20.jpg',
	'images/21.jpg',
	'images/22.jpg',
	'images/23.jpg',
	'images/24.jpg',
	'images/25.jpg',
	'images/26.jpg',
	'images/27.jpg',
	'images/28.jpg',
	'images/29.jpg',
	'images/30.jpg',
	'images/31.jpg',
	
	'texture/xuhua/1.png',
	'texture/xuhua/2.png',
	'texture/xuhua/3.jpg',
	
	'texture/scene-04/scene-05-img-11.jpg',

	'images/index-bg.jpg',
	'texture/world.png',
	'texture/scene-malu.jpg',
	'texture/scene-04/scene-05-img-15.png',	
	'texture/scene-04/scene-05-img-16.jpg',
	'texture/scene-04/scene-05-img-21.png',
	'texture/scene-bg.jpg'
];

var copyList = [
	'texture/scene-01/scene-01-img-03.png',
	'texture/scene-01/scene-01-img-04.png',
	'texture/scene-01/scene-01-img-05.png',
	'texture/scene-01/scene-01-img-06.png',
	'texture/scene-01/scene-01-img-11.png',
	'texture/scene-01/scene-01-img-12.png',
	'texture/scene-01/scene-01-img-13.png',

	'texture/scene-02/scene-02-img-03.png',
	'texture/scene-02/scene-02-img-04.png',
	'texture/scene-02/scene-02-img-06.png',

	'texture/scene-03/scene-03-img-02.png',
	'texture/scene-03/scene-03-img-06.png'

];
var xuhuaMaps=[];
var xuhua=[
	'texture/xuhua/1.png',
	'texture/xuhua/2.png',
	'texture/xuhua/3.jpg',
	'texture/scene-04/scene-05-img-21.png',
];

for(var i = 0; i < fileList.length; i++) {
	loader.addImage(fileList[i]);
}
for(var i = fileList.length - 4; i < fileList.length; i++) {
	var t = textureLoader.load(fileList[i]);
	bgMaps.push(t);
}
for(var i = 0; i < xuhua.length; i++) {
	var t = textureLoader.load(xuhua[i]);
	xuhuaMaps.push(t);
}

//加载的进度...
loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
});

var time=0;
//加载完成执行...
loader.addCompletionListener(function() {
	endTime=new Date().getTime();
	dis=endTime-startTime;
	
	if(dis<5000){
		time=5000-dis;
		setTimeout(function(){
			oMusic.play();
			init();
			animate();
			setTimeout(function() {
				$('.loading').remove();
			}, 1000);
		},time);
	}else{
		oMusic.play();
		init();
		animate();
		setTimeout(function() {
			$('.loading').remove();
		}, 1000);
	}
	
});

//开始加载loader...
loader.start();
var tt=true;
$('.box').on('touchstart', function() {
	if(tt){
		setAnimation();
		tt=false;
	}
	$('.light').remove();
	setInterval(function() {
		$('.box').fadeOut(400, function() {
			$(this).remove();
			$('.hint-user').fadeIn();
		});
		bBtn = true;
	}, 1000);
});
var oAnimation = document.getElementById("animation");
(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
		window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || // Webkit中此取消方法的名字变了
			window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if(!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
			var id = window.setTimeout(function() {
				callback(currTime + timeToCall);
			}, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}
	if(!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}
}());
var u = 1
var stop = null;

function setAnimation() {
	stop = requestAnimationFrame(setAnimation);
	oAnimation.src = 'images/' + u + '.jpg';
	if(u >= 31) {
		window.cancelAnimationFrame(stop);
		u = 1;
	} else {
		u++;
	}
}

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 1, 2500);
	camera.position.z = cameraStartZ;

	scene.add(camera);

	//场景物体容器
	boxGroup = new THREE.Group();
	boxGroup.position.z = 0;
	boxGroup.rotation.y = Math.PI;
	scene.add(boxGroup);

	//背景容器
	skyGroup = new THREE.Group();
	scene.add(skyGroup);

	//星空背景
	sceneGeometry = new THREE.PlaneGeometry(800, 728);
	sceneMaterial = new THREE.MeshBasicMaterial({
		map: bgMaps[3]
	});
	scenePlaneMesh = new THREE.Mesh(sceneGeometry, sceneMaterial);
	scenePlaneMesh.position.z = -1600;
	scenePlaneMesh.position.y = 400;
	scenePlaneMesh.scale.set(1.5, 1.5, 1);
	skyGroup.add(scenePlaneMesh);
	
	//舞台背景
	stageMaterial = new THREE.SpriteMaterial({
		map: bgMaps[2],
		transparent: true
	});
	stagePlaneMesh = new THREE.Sprite(stageMaterial);
	stagePlaneMesh.scale.set(stage[0].w/8, stage[0].h/8, 1);
	stagePlaneMesh.material.rotation = 0 / 180 * Math.PI;
	stagePlaneMesh.position.x = stage[0].x/8;
	stagePlaneMesh.position.y = stage[0].z/8;
	stagePlaneMesh.position.z = stage[0].y/8;
	boxGroup.add(stagePlaneMesh);
	
	lightMaterial = new THREE.SpriteMaterial({
		map: bgMaps[2],
		transparent: true
	});
	lightPlaneMesh = new THREE.Sprite(lightMaterial);
	lightPlaneMesh.scale.set(stage[1].w/8, stage[1].h/8, 1);
	lightPlaneMesh.material.rotation = 0 / 180 * Math.PI;
	lightPlaneMesh.position.x = stage[1].x/8;
	lightPlaneMesh.position.y = stage[1].z/8;
	lightPlaneMesh.position.z = stage[1].y/8;
	boxGroup.add(lightPlaneMesh);
	
	oMat1 = new THREE.SpriteMaterial({
		map: xuhuaMaps[0],
		transparent: true
	});
	oMesh1 = new THREE.Sprite(oMat1);
	oMesh1.scale.set(blur[0].w/8, blur[0].h/8, 1);
	oMesh1.material.rotation = 0 / 180 * Math.PI;
	oMesh1.position.x = blur[0].x/8;
	oMesh1.position.y = blur[0].z/8;
	oMesh1.position.z = blur[0].y/8;
	
	oMat2 = new THREE.SpriteMaterial({
		map: xuhuaMaps[1],
		transparent: true
	});
	oMesh2 = new THREE.Sprite(oMat2);
	oMesh2.scale.set(blur[1].w/8, blur[1].h/8, 1);
	oMesh2.material.rotation = 0 / 180 * Math.PI;
	oMesh2.position.x = blur[1].x/8;
	oMesh2.position.y = blur[1].z/8;
	oMesh2.position.z = blur[1].y/8;
	
	oMat3 = new THREE.SpriteMaterial({
		map: xuhuaMaps[2],
		transparent: true
	});
	oMesh3 = new THREE.Sprite(oMat3);
	oMesh3.scale.set(blur[2].w/8, blur[2].h/8, 1);
	oMesh3.material.rotation = 0 / 180 * Math.PI;
	oMesh3.position.x = blur[2].x/8;
	oMesh3.position.y = blur[2].z/8;
	oMesh3.position.z = blur[2].y/8;

	function isAndriod(){
        var naviga      = navigator.userAgent;
        if(naviga.indexOf('Android') > -1 || naviga.indexOf('Adr') > -1)
            return true;
        else
            return false;
    }
	
	console.log(isAndriod());
	
	renderer = new THREE.WebGLRenderer({
		antialias: true
	});
	renderer.setClearColor(0x000000);
	var _ratio = isAndriod() ? window.devicePixelRatio : window.devicePixelRatio * 2 ;
	renderer.setPixelRatio(_ratio);
	renderer.setSize(window.innerWidth, window.innerHeight);
//	renderer.autoClear = false;
//  renderer.gammaInput = true;
//  renderer.gammaOutput = true;
//  renderer.toneMapping = THREE.ReinhardToneMapping;
//  renderer.toneMappingExposure = 3;
    
    console.log('setPixelRatio:'+_ratio+'	window.devicePixelRatio:'+window.devicePixelRatio+'	autoClear:'+renderer.autoClear+'	gammaInput:'+renderer.gammaInput+'	gammaOutput:'+renderer.gammaOutput+'	toneMapping:'+renderer.toneMapping+'	toneMappingExposure:'+renderer.toneMappingExposure);
    
	container.appendChild(renderer.domElement);

	container.addEventListener('touchstart', onTouchStart, false);

	window.addEventListener('resize', onWindowResize, false);
	
	
	//复制的
	for(var i = 0; i < copy.length; i++) {
		drawScene(copy[i].w / 8, copy[i].h / 8, copyList[i], -copy[i].x / 8, copy[i].z / 8, copy[i].y / 8);
	}
	//绘制两边街道
	for(var i = 0; i < data.length; i++) {
		drawScene(data[i].w / 8, data[i].h / 8, fileList[i], -data[i].x / 8, data[i].z / 8, data[i].y / 8);
	}
	//绘制大世界几个字
	for(var i = 0; i < world.length; i++) {
		drawRoad(world[i].w / 8, world[i].h / 8, fileList[fileList.length - 6], -world[i].x / 8, world[i].z / 8, world[i].y / 8, 90);
	}
	
	//绘制路面
	for(var i = 0; i < ground.length; i++) {
		if(i == 0) {
			drawRoad(ground[i].w / 8, ground[i].h / 8, fileList[fileList.length - 8], -ground[i].x / 8, ground[i].z / 8, ground[i].y / 8, 90);
		} else if(i==7) {
			drawRoad(ground[i].w / 8, ground[i].h / 8, fileList[fileList.length - 5], -ground[i].x / 8, ground[i].z / 8, ground[i].y / 8, 90-4.7);
		}else {
			drawRoad(ground[i].w / 8, ground[i].h / 8, fileList[fileList.length - 5], -ground[i].x / 8, ground[i].z / 8, ground[i].y / 8, 90);
		}
	}

	showUserImg(imgUrl);
	
	//点击虚化背景
	$('.btn span:nth-of-type(2)').on('touchstart', function() {
		
		if(isDim){
			boxGroup.add(oMesh1);
			boxGroup.add(oMesh2);
			boxGroup.add(oMesh3);
			bBtn=false;
		}
		if(isblur){
			oMat1.map=xuhuaMaps[0];
			oMat2.map=xuhuaMaps[1];
			oMat3.map=xuhuaMaps[2];
			isblur=false;
		}
		
		$('.btn').hide();
		$('.btn2').show();
	});

	$('.btn span:nth-of-type(1)').on('touchstart', function() {
		showUserImg(newimgUrl);
	});
	

}

function showUserImg(img) {
	drawUserImg(userImg[0].w / 8, userImg[0].h / 8, img, -userImg[0].x / 8, userImg[0].z / 8, userImg[0].y / 8, 29.3);
}

function drawScene(w, h, i, x, y, z) {
	var t = textureLoader.load(i);
	var m = new THREE.SpriteMaterial({
		map: t,
		transparent: true
	});
	var p = new THREE.Sprite(m);
	p.scale.set(w, h, 1);
	p.material.rotation = 0 / 180 * Math.PI;
	p.position.x = x;
	p.position.y = y;
	p.position.z = z;
	boxGroup.add(p);
}

function drawSceneCopy(w, h, i, x, y, z, s) {
	var t = textureLoader.load(i);
	var g = new THREE.PlaneGeometry(w, h);
	var m = new THREE.MeshBasicMaterial({
		map: t,
		transparent: true
	});
	var p = new THREE.Mesh(g, m);
	p.position.x = x;
	p.position.y = y;
	p.position.z = z;
	p.scale.x = s;
	boxGroup.add(p);
}

function drawRoad(w, h, i, x, y, z, r) {
	var t = textureLoader.load(i);
	var g = new THREE.PlaneGeometry(w, h);
	var m = new THREE.MeshBasicMaterial({
		map: t,
		transparent: true,
		side: THREE.DoubleSide,
		blending: THREE.NormalBlending
	});
	var p = new THREE.Mesh(g, m);
	p.rotation.x = Math.PI / 180 * r;

	p.position.x = x;
	p.position.y = y;
	p.position.z = z;
	p.scale.x = -1;
	boxGroup.add(p);
}

function drawUserImg(w, h, i, x, y, z, r) {
	var t = textureLoader.load(i);
	var g = new THREE.PlaneGeometry(w, h);
	var m = new THREE.MeshBasicMaterial({
		map: t,
		transparent: true,
		side: THREE.DoubleSide,
		blending: THREE.NormalBlending
	});
	var p = new THREE.Mesh(g, m);
	p.rotation.z = Math.PI / 180 * r;

	p.position.x = x;
	p.position.y = y;
	p.position.z = z;
	p.scale.x = -1;
	boxGroup.add(p);
}

function onTouchStart(e) {
	e.preventDefault();

	var touch = e.touches[0];

	isPause = !isPause;

	startX = touch.pageX;

	container.addEventListener('touchmove', onTouchMove, false);
	container.addEventListener('touchend', onTouchEnd, false);
}

function onTouchMove(e) {
	e.preventDefault();
	var touch = e.touches[0];
	moveX = touch.pageX - startX;
}

function onTouchEnd(e) {
	endX = moveX;
	moveX = 0;

	if(isCritical) {
		if(minDistance) {
			if(endX < -slideDistance) {
				isPause = false;
				isCritical = false;
				minDistance = false;
				isAlterSpeed=false;
				direction = 1;
			}
		}
		if(maxDistance) {
			if(endX > slideDistance) {
				isPause = false;
				isCritical = false;
				maxDistance = false;
				direction = -1;
				isAlterSpeed=false;
			}
		}
	} else {
		if(endX < -slideDistance) {
			isPause = false;
			isCritical = false;
			isAlterSpeed=false;
			direction = 1;
		} else if(endX > slideDistance) {
			isPause = false;
			isCritical = false;
			isAlterSpeed=false;
			direction = -1;
		}
	}
	container.removeEventListener('touchmove', onTouchMove, false);
	container.removeEventListener('touchend', onTouchEnd, false);
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

var a = 0,
	b = 0,
	c = 0,
	f = 0,
	o = 0,
	u = 0,
	q = 0,
	w = 0,
	k = 0,
	y = 0;

function animate() {
	requestAnimationFrame(animate);
	
	if(isUser) {
		if(!isPause) {
			if(!isAlterSpeed){
				if(boxGroup.position.z > 1460){
					if(k<1){
						speed2=1;
						k++;
						y=0;
					}
					
				}else{
					if(y<1){
						speed2=2.5;
						y++;
						k=0;
					}							
				}
			}
			if(!isCritical) {
				boxGroup.position.z += speed2 * direction;

				if(f < 1) {
					if(boxGroup.position.z > 1460) {
						isPause = true;
						f++;
						$('.show-txt').fadeIn();
						setTimeout(function() {
							isPause = false;
							$('.show-txt').hide();
						}, 3000);
					}
				}

				if(boxGroup.position.z < 0) {
					boxGroup.position.z = 0;
					isPause = true;
					minDistance = true;
					isCritical = true;
				}
				if(boxGroup.position.z > 1600) {
					boxGroup.position.z = 1600;
					isPause = true;
					maxDistance = true;
					isCritical = true;
				}

				if(o < 1) {
					if(boxGroup.position.z > 1590) {
						$('.show-box').show();
						o++;
						u = 0;
					}
				} else if(u < 1) {
					if(boxGroup.position.z < 1590) {
						$('.show-box').hide();
						u++;
						o = 0;
					}
				}

				if(boxGroup.position.z > 1500) {
					if(q < 1) {
						stageMaterial.map = bgMaps[1];
						lightMaterial.map = bgMaps[0];
						b++;
						w = 0;
					}
				} else {
					if(w < 1) {
						stageMaterial.map = bgMaps[2];
						lightMaterial.map = bgMaps[2];	
						oMat1.map=xuhuaMaps[3];
						oMat2.map=xuhuaMaps[3];
						oMat3.map=xuhuaMaps[3];
						w++;
						q = 0;
						isblur=true;
						$('.btn').show();
						$('.btn2').hide();
					}
				}
			}
		}
	} else {
		if(c < 1) {
			if(bBtn) {
				boxGroup.position.z += speed1 * direction;
				if(a < 1) {
					if(boxGroup.position.z > 600) {
						tween = new TWEEN.Tween(boxGroup.position);
						tween.to({ z: '+30' }, 2000).start();
						tween.easing(TWEEN.Easing.Quadratic.Out);
						a++;
						isUser = true;
						bBtn = false;
						//boxGroup.position.z = 630;
					}
				}

			}
		}
	}
	TWEEN.update();
	document.title = boxGroup.position.z;
	renderer.render(scene, camera);
}

$('.hint-user').on('touchstart', function() {
	$(this).hide();
	isUser = true;
	isPause=false;
	speed2=1;
	isAlterSpeed=true;
});