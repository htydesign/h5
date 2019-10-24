loading.addEventListener('touchstart',function(e){
	e.preventDefault();
},false);
//loading-----------------------------------------------
var loader = new window.PxLoader();

//for(var i = 0; i < fileList.length; i++) {
//	loader.addImage(fileList[i]);
//}

var fileDate=new Object;

fileDate.wall=[];
fileDate.theme=[];

for(var i=0;i<data.length;i++){
	var wallObject=new Object;
	wallObject.left=loader.addImage(data[i].left);
	wallObject.front=loader.addImage(data[i].front);
	wallObject.right=loader.addImage(data[i].right);
	wallObject.back=loader.addImage(data[i].back);
	fileDate.wall.push(wallObject);
}

for(var i=0;i<aImages.length;i++){
	var themeObject=new Object;
	themeObject.theme=aImages[i].theme;
	themeObject.img=[];
	
	for(var j=0;j<aImages[i].images.length;j++){		
		themeObject.img.push(loader.addImage("images/big/" + aImages[i].theme + "/" + aImages[i].images[j]));
		
	}	
	fileDate.theme.push(themeObject);
}


loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
	loadingProgress.style.width = percent + '%';
});
loader.addCompletionListener(function() {

	init(); //加载主体场景
	animate();

	setTimeout(function() {
		loading.className = 'section loading fade-out';
		setTimeout(function() {
			loading.style.display = 'none';
		}, 500);
		
	}, 500);

});
loader.start();

function init() {

	scene = new THREE.Scene();

	camera = new THREE.PerspectiveCamera(85, window_Width / window_Height, 1, 10000);
	camera.position.set(0, 0, 0);
	
	scene.add(camera);

	getOrientation = new THREE.DeviceOrientationControls(camera);
	getOrientation.connect();
	
	scene.add(oContainer);

	wallContainer.position.y = 0;
	if(iOS){
		wallContainer.rotation.y=Math.PI;
		hint.rotation.y=Math.PI;
	}
	if(!iOS){
		oContainer.rotation.y=Math.PI;
	}
	
	
	oContainer.add(wallContainer);
	oContainer.add(imagesContainer);
	oContainer.add(hint);
	
	oContainer.add(qinzi);
	oContainer.add(wuzhe);
	oContainer.add(chengshi);
	oContainer.add(hunsha);
	oContainer.add(shishang);
	oContainer.add(fengjing);
	oContainer.add(meishi);
	oContainer.add(daomangquan);
	oContainer.add(yundong);
	oContainer.add(xuezhiqian);
	
	wallContainer.add(qinzi_wall);
	wallContainer.add(wuzhe_wall);
	wallContainer.add(chengshi_wall);
	wallContainer.add(hunsha_wall);
	wallContainer.add(shishang_wall);
	wallContainer.add(fengjing_wall);
	wallContainer.add(meishi_wall);
	wallContainer.add(daomangquan_wall);
	wallContainer.add(yundong_wall);
	wallContainer.add(xuezhiqian_wall);

	createScene();

	renderer = new THREE.WebGLRenderer();
	
	renderer.setSize(window_Width, window_Height);
	renderer.setClearColor(0xececec);
	renderer.setPixelRatio(2);
	stage.appendChild(renderer.domElement);

	window.addEventListener('resize', onWindowResize, false);

	controls = new THREE.TrackballControls(camera, renderer.domElement);
	controls.rotateSpeed = 10;
	controls.zoomSpeed = 3;
	controls.panSpeed = 2;
	controls.staticMoving = true;
	controls.dynamicDampingFactor = 0.3;
	controls.minDistance = 1; //鼠标缩放的最近距离
	controls.maxDistance = 3000.0; //鼠标缩放的最远距离 

	raycaster = new THREE.Raycaster();
	_touch = new THREE.Vector2();

}

function createScene() {
	var r1=0;
	var r2=0;
	//用户图片
	for(var i = 0; i < userImages.length; i++) {
		if(iOS){
			createPlane(userImages[i].w, userImages[i].h, "0", imagesContainer, -userImages[i].px,-userImages[i].py+0.75, -userImages[i].pz, -userImages[i].rx,-userImages[i].ry-r1,-userImages[i].rz,userImages[i].name);	
		}else{
			createPlane(userImages[i].w, userImages[i].h, "0", imagesContainer, userImages[i].px,userImages[i].py, userImages[i].pz, userImages[i].rx,userImages[i].ry,userImages[i].rz,userImages[i].name);	
		}
	}

	for(var i=0;i<=total;i++){
		if(i==0){
			createWall(i,0,arr_wall[i]);
		}else{
			createWall(i,-wallSize_1.h,arr_wall[i]);
		}
		
		var material = new THREE.MeshBasicMaterial({
			opacity: 0,
			map: loaderTextuer("images/other/img-07.png"),
			transparent: true,
			side:THREE.DoubleSide
		});
		
		var geometry = new THREE.PlaneGeometry(3, 0.9);
	
		var mesh = new THREE.Mesh(geometry, material);
		if(i==0 ||i==1||i==3||i==4||i==5){
			mesh.position.set(0,-3.1, wallSize_1.w / 2*iosdir-0.5);
		}else if(i==6){
			mesh.position.set(0,-2.8, wallSize_1.w / 2*iosdir-0.5);	
		}else{
			mesh.position.set(0,-3.25, wallSize_1.w / 2*iosdir-0.5);	
		}
		mesh.rotation.set(0, -Math.PI*iosdir, 0);
		mesh.name = "tishi";
		//mesh.visible=false;
		hint.add(mesh);
		hint.children[0].material.opacity=1;
	}	
	
	

	function createWall(num,y,container){
		
		container.position.y=y;
		
		//右边墙
		createPlane(wallSize_1.w, wallSize_1.h, fileDate.wall[num].right.src, container, -wallSize_2.w / 2*iosdir, 0, 0, 0, Math.PI / 180 * 90*iosdir, 0, "rightWall");		
		//左边墙
		createPlane(wallSize_1.w, wallSize_1.h, fileDate.wall[num].left.src, container, wallSize_2.w / 2*iosdir, 0, 0, 0, -Math.PI / 180 * 90*iosdir, 0, "leftWall");	
		//正前方墙
		createPlane(wallSize_2.w, wallSize_2.h, fileDate.wall[num].front.src, container, 0, 0, wallSize_1.w / 2*iosdir, 0, Math.PI*iosdir, 0, "frontWall");
		//后面墙
		createPlane(wallSize_2.w, wallSize_2.h, fileDate.wall[num].back.src, container, 0, 0, -wallSize_1.w / 2*iosdir, 0, 2*Math.PI*iosdir, 0, "backWall");
		//地板
		createPlane(wallSize_2.w, wallSize_1.w, "none", container, 0, -wallSize_2.h / 2*iosdir, 0, -Math.PI / 180 * 90*iosdir, 0, 0, "bottomWall");
	}
}



//创建平面
function createPlane(w, h, src, container, px, py, pz, rx, ry, rz, name) {

	var src = src;

	if(src === "none") {
		var material = new THREE.MeshBasicMaterial({
			opacity: 1,
			color: 0xececec,
			transparent: true,
			side:THREE.DoubleSide
		});
	} else if(src === "0") {
		var material = new THREE.MeshBasicMaterial({
			opacity: 0,
			color: 0x000000,
			transparent: true,
			side:THREE.DoubleSide
		});
	} else if(side="2") {
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: loaderTextuer(src),
			side:THREE.DoubleSide
		});
	}else{
		var material = new THREE.MeshBasicMaterial({
			color: 0xffffff,
			map: loaderTextuer(src),
			transparent: true
		});
	}

	var geometry = new THREE.PlaneGeometry(w, h);

	var mesh = new THREE.Mesh(geometry, material);
	mesh.position.set(px, py, pz);
	mesh.rotation.set(rx, ry, rz);
	mesh.name = name;
	container.add(mesh);
}


//加载图片纹理
function loaderTextuer(src) {

	var texture = new THREE.TextureLoader().load(src);
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

	return texture;
}
//监听屏幕设置大小
function onWindowResize() {

	window_Width = window.innerWidth;
	window_Height = window.innerHeight;

	camera.aspect = window_Width / window_Height;
	camera.updateProjectionMatrix();
	renderer.setSize(window_Width, window_Height);
}
//主动画
function animate() {
	
	TWEEN.update();
	//controls.update();
	if(isStart){
		if(isSlide){			
			var tweenQ = new TWEEN.Tween(camera.rotation);	
			if(iOS){
				tweenQ.to({
					y: 0
				}, 300).start().onComplete(function(){
					var tweenW = new TWEEN.Tween(camera.rotation);
					tweenW.to({
						y: cameraY
					}, 300).start();
				});
			}else{
				tweenQ.to({
					y:Math.PI
				}, 300).start().onComplete(function(){
					var tweenW = new TWEEN.Tween(camera.rotation);
					tweenW.to({
						y: cameraY
					}, 300).start();
				});
			}			
		}else{
			getOrientation.update();
		}		
		if(!iOS){
			oContainer.rotation.y=0;
		}
	}
	
	cameraY=camera.rotation.y;
	
	//oContainer.rotation.y+=0.0025;

	render();
	requestAnimationFrame(animate);
}
//渲染
function render() {

	camera.rotation.x=0;
	camera.rotation.z=0;
	camera.position.y=0.5;
	
	renderer.render(scene, camera);
}

window.addEventListener('touchstart', documentTouchStart, false);

function documentTouchStart(event) {
	event.preventDefault();
	//console.log("isUserTouch: "+isUserTouch+"   isShow: " + isShow + "   isSlideVertical: " + isSlideVertical + "   isSlideHorizontal: " + isSlideHorizontal + "   isBottom: " + isBottom);
	clearTimeout(timer);
	
	startY = event.targetTouches[0].clientY;

	_touch.x = (event.targetTouches[0].clientX / window_Width) * 2 - 1;
	_touch.y = -(event.targetTouches[0].clientY / window_Height) * 2 + 1;

	raycaster.setFromCamera(_touch, camera);
		
	var intersects = raycaster.intersectObjects(imagesContainer.children);
	
	
	
	timer = setTimeout(function() {

		if(intersects.length > 0) {
			
			isUserTouch = true;
			
			if(isShow && isClick) {
				oShowImage.className = 'section showImage';
				oShowImage.style.display = 'block';
				//oShowImage.className = 'section showImage fade-in';
				
				if(!iOS){
					oShowImage.className = 'section showImage fade-in';
				}
				
				isShow = false;
				isClick = false;
				
				var curImage=intersects[0].object.name;		
				console.log(curImage);
				createShowSlideImages(parseInt(curImage));
			}
		}
		
	}, 300);
	
	if(openNewWorld) {		
		isShow = false;		
		addevent.addEventListener('touchmove', documentTouchMove2, false);
	} else {
		isShow = true;	
		renderer.domElement.addEventListener('touchmove', documentTouchMove, false);	
	}
}

oClose.addEventListener('touchstart', function() {
	
	var tTime=100;
	
	if(iOS){
		tTime=100;
	}else{
		tTime=500;
		oShowImage.className = 'section showImage fade-out';
	}
	
	setTimeout(function() {
		oShowImage.style.display = 'none';
		isShow = true;
		isClick = true;
		isUserTouch = false;
		isSlideVertical = true;
		
		var oldLi=document.querySelectorAll(".box ul li");
		if(oldLi){
			for(var i=0;i<oldLi.length;i++){
				box.removeChild(oldLi[i]);
			}
		}
		
	}, tTime);
}, false)

function documentTouchMove(event) {
	
	clearTimeout(timer);
	isUserTouch = false;
	
	moveY = event.targetTouches[0].clientY - startY;

	if(moveY < -100 && isSlideVertical) {
		
		isSlideVertical = false;
		
		if(n >= total) {
			n = total;
			openNewWorld=true;
			
			isSlideVertical = true;
			stage.style.transform = 'translate3d(0,-100%,0)';
			stage.style.webkitTransform = 'translate3d(0,-100%,0)';
			poster.style.transform = 'translate3d(0,0,0)';
			poster.style.webkitTransform = 'translate3d(0,0,0)';
			
			addevent.style.display='block';
			isb=true;
		} else {
			isb=false;
			n++;
			direction=1;
			changeWallMaterial();
			//remove_children();
			addevent.style.display='none';
		}
		openOrientation();
	} else if(moveY > 100 && isSlideVertical) {
		
		isSlideVertical = false;
		
		if(n <= 0) {
			n = 0;
			isSlideVertical = true;
		} else {
			n--;
			direction=-1;
			changeWallMaterial();	
			//remove_children();
			
		}
		
		openOrientation();
	}
}



function openOrientation(){
	isSlide=true;
	setTimeout(function(){
		isSlide=false;
	},1500);
}

function documentTouchMove2(event) {

	isSlideVertical = false;

	moveY2 = event.targetTouches[0].clientY - startY;
	if(moveY2 > 100) {
		isb=false;
		isBottom = false;
		openNewWorld=false;
		isUserTouch = false;
		stage.style.transform = 'translate3d(0,0,0)';
		stage.style.webkitTransform = 'translate3d(0,0,0)';
		poster.style.transform = 'translate3d(0,100%,0)';
		poster.style.webkitTransform = 'translate3d(0,100%,0)';
		addevent.style.display='none';
		isSlideVertical = true;
		setTimeout(function() {
			isShow = true;			
		}, 600);
	}
}

//改变纹理
function changeWallMaterial() {
	
	//changeImageSize();
	for(var h=0;h<=total;h++){
		if(h==n){
			var tween = new TWEEN.Tween(hint.children[h].material);
			tween.to({
				opacity: 1
			}, 500).delay(400).start();
		}else{
			var tween = new TWEEN.Tween(hint.children[h].material);
			tween.to({
				opacity: 0
			}, 100).start();
		}
	}
	var m=0;
	
	var prev=0;
	var next=0;
	
	//n=1
	
	var a=[0,1,2,3,4,5,6,7,8,9];
	
	for(var k=0;k<a.length;k++){
		
		if(k==n && n==1){
			prev = k-1;
			next = k;
			//console.log((k-1)+"  "+n+"  "+(k))
			
		}else if(k==n && n==a.length-1){
			prev = k-1;
			next = k;
			//console.log((k-1)+"  "+n+"  "+(k))
			
		}else if(k==n && n>1 && n<a.length-1){	
			prev = k-1;
			next = k+1;
			//console.log((k-1)+"  "+n+"  "+(k+1))		
		}		
	}
	
	if(direction=="1"){
		if(n<=1){
			var tweenA = new TWEEN.Tween(arr_wall[0].position);
			tweenA.to({
				y: wallSize_1.h
			}, 500).start();
			
			var tweenB = new TWEEN.Tween(arr_wall[n].position);
			tweenB.to({
				y: 0
			}, 500).start();
		}else if(n==total){
			var tweenA = new TWEEN.Tween(arr_wall[prev].position);
			tweenA.to({
				y: wallSize_1.h
			}, 500).start();
			
			var tweenB = new TWEEN.Tween(arr_wall[n].position);
			tweenB.to({
				y: 0
			}, 500).start();
			var tweenC = new TWEEN.Tween(arr_wall[next].position);
			tweenC.to({
				y: 0
			}, 500).start();
		}else{
			var tweenA = new TWEEN.Tween(arr_wall[prev].position);
			tweenA.to({
				y: wallSize_1.h
			}, 500).start().onComplete(function(){
				//arr_wall[prev].visible=false;
			});
			
			var tweenB = new TWEEN.Tween(arr_wall[n].position);
			tweenB.to({
				y: 0
			}, 500).start();
			
			var tweenC = new TWEEN.Tween(arr_wall[next].position);
			tweenC.to({
				y: 	-wallSize_1.h
			}, 500).start().onComplete(function(){
				//arr_wall[next].visible=true;
			});
		}
		//arr_wall[9].visible=true;
		
		//console.log("prev:"+prev+"  "+"n: "+n+"  next:"+next);
		//console.log("prev:"+arr_wall[prev].position.y+"  "+"n: "+arr_wall[n].position.y+"  next:"+arr_wall[next].position.y);
		
	} else if(direction == "-1"){
	
		if(n<=1){
			var tweenA = new TWEEN.Tween(arr_wall[prev+1].position);
			tweenA.to({
				y: 0
			}, 500).start();
			var tweenC = new TWEEN.Tween(arr_wall[n].position);
			tweenC.to({
				y: 0
			}, 500).start();
			var tweenB = new TWEEN.Tween(arr_wall[next+1].position);
			tweenB.to({
				y: -wallSize_1.h
			}, 500).start();
			
		}else if(n==total){
			var tweenA = new TWEEN.Tween(arr_wall[prev].position);
			tweenA.to({
				y: wallSize_1.h
			}, 500).start();
			
			var tweenB = new TWEEN.Tween(arr_wall[n].position);
			tweenB.to({
				y: 0
			}, 500).start();
		}else{
			var tweenA = new TWEEN.Tween(arr_wall[prev].position);
			tweenA.to({
				y: wallSize_1.h
			}, 500).start().onComplete(function(){
				//arr_wall[prev].visible=true;
			});		
			
			var tweenB = new TWEEN.Tween(arr_wall[n].position);
			tweenB.to({
				y: 0
			}, 500).start();
			
			var tweenC = new TWEEN.Tween(arr_wall[next].position);
			tweenC.to({
				y: 	-wallSize_1.h
			}, 500).start().onComplete(function(){
				//arr_wall[next].visible=false;
			});
		}
		
		//console.log("prev:"+prev+"  "+"n: "+n+"  next:"+next);
		//console.log("prev:"+arr_wall[prev].position.y+"  "+"n: "+arr_wall[n].position.y+"  next:"+arr_wall[next].position.y);
	}
	setTimeout(function() {
		isSlideVertical = true;
	}, 750);
}

//改变图片点击区域大小
function changeImageSize(){
	if(n==1){
		imagesContainer.children[0].scale.set(0.75,1.25,1);
		imagesContainer.children[0].position.z=-1;	
		imagesContainer.children[5].scale.set(0.75,1.25,1);
		imagesContainer.children[5].position.z=3.4;
	}else if(n==4){
		imagesContainer.children[0].scale.set(0.75,1.25,1);
		imagesContainer.children[0].position.z=-1;		
		imagesContainer.children[5].scale.set(0.75,1.25,1);
		imagesContainer.children[5].position.z=3.4;
	}else if(n==5){		
		imagesContainer.children[0].position.z=-2.95;		
		imagesContainer.children[1].scale.set(1.3,0.75,1);
		imagesContainer.children[1].position.z=2.75;
		imagesContainer.children[2].position.x=-5.6;
		imagesContainer.children[3].scale.set(1.3,0.75,1);	
		imagesContainer.children[4].position.x=5.6;		
		imagesContainer.children[5].position.z=2.8;		
	}else{
		imagesContainer.children[0].scale.set(1,1,1);
		imagesContainer.children[0].position.z=-1.68;
		imagesContainer.children[1].scale.set(1,1,1);
		imagesContainer.children[1].position.z=3.5;
		imagesContainer.children[2].position.x=-5.1;
		imagesContainer.children[3].scale.set(1,1,1);	
		imagesContainer.children[4].position.x=5.1;	
		imagesContainer.children[5].scale.set(1,1,1);
		imagesContainer.children[5].position.z=2.75;
	}
}

//删除组内子元素
function remove_children() {
	
	var m=0;
	
	if(direction=="1"){
		if(n==0){
			m=0;
		}else{
			m=n-1;			
			
		}
	} else if(direction == "-1"){
		if(n==total){
			m=total;
		}else{
			m=n+1;
		}
	}
	setRemoveChildren();
	
	function setRemoveChildren(){
				
		for(var i = 0; i < arr[m].children.length; i++) {			
			var lastObject = arr[m].children[i];
			arr[m].remove(lastObject);	
		}
		
		for(var i = 0; i < userImages.length; i++) {
			createPlane(userImages[i].w, userImages[i].h, "none", arr[n], userImages[i].px, userImages[i].py, userImages[i].pz,userImages[i].rx,userImages[i].ry,userImages[i].rz,userImages[i].name)
		}
	}
}


//创建显示的图片
function createShowSlideImages(x) {
	
	isSlideHorizontal=true;

	var basicURL = "images/big/";

	var max_length = aImages[n].images.length - 1;
	var min_length = 0;
	var t = x-1;
	if(t==0){
		left_icon.style.opacity = 0.2;
	}else if(t==5){
		right_icon.style.opacity = 0.2;
	}

	
	box.style.transform = "translateX(" + -t * lw + "px)";
	box.style.webkitTransform = "translateX(" + -t * lw + "px)";
	
	box.style.width = aImages[n].images.length * lw + 'px';
	
	for(var i = 0; i < aImages[n].images.length; i++) {
		var oLi = document.createElement("li");
		var oSpan = document.createElement("span");
		var oImg = document.createElement("img");
		var oP = document.createElement("p");

		oImg.src = fileDate.theme[n].img[i].src;
		//oP.innerHTML = aImages[n].txt[i];
		oLi.style.width=lw+'px';
		oImg.style.width=lw+'px';
		
		var userImage = new Image();
		userImage.src = fileDate.theme[n].img[i].src;
		console.log(userImage.naturalWidth)
		
		if(userImage.naturalHeight>0 && userImage.naturalHeight<693){
			if(n==0 && i==2){
				
			}else{
				oImg.style.transform="rotate(90deg)";
				oImg.style.webkitTransform="rotate(90deg)";
				oImg.style.height=lw+'px';
				oImg.style.width=lw*520/390+'px';
			}
		}
		if(n==0 && i==2){
			oImg.style.transform="rotate(90deg)";
			oImg.style.webkitTransform="rotate(90deg)";
			oImg.style.height=lw+'px';
			oImg.style.width=lw*520/390+'px';
		}
		
		oSpan.appendChild(oImg);
		//oSpan.appendChild(oP);
		oLi.appendChild(oSpan);
		box.appendChild(oLi);
	}

	box.addEventListener('touchstart', onBoxStart, false);

	var bx = 0;
	var tx = 0;

	function onBoxStart(e) {
		e.preventDefault();
		bx = e.targetTouches[0].clientX;
		box.addEventListener('touchmove', onBoxMove, false);
	}

	function onBoxMove(e) {
		e.preventDefault();
		tx = e.targetTouches[0].clientX - bx;

		if(tx < -100 && isSlideHorizontal) {
			if(t >= max_length) {
				t = max_length;
			} else {
				t++;

			}
			if(t == max_length) {
				right_icon.style.opacity = 0.2;
			} else {
				right_icon.style.opacity = 1;
				left_icon.style.opacity = 1;
			}
			boxTranslateX(t);
			isSlideHorizontal = false;
		} else if(tx > 100 && isSlideHorizontal) {
			if(t <= min_length) {
				t = min_length;
				left_icon.style.opacity = 0.2;
			} else {
				t--;
				right_icon.style.opacity = 1;
				left_icon.style.opacity = 1;
			}
			if(t == min_length) {
				left_icon.style.opacity = 0.2;
			} else {
				right_icon.style.opacity = 1;
				left_icon.style.opacity = 1;
			}
			boxTranslateX(t);
			isSlideHorizontal = false;
		}
	}

	function boxTranslateX(t) {
		box.style.transform = "translateX(" + -t * lw + "px)";
		box.style.webkitTransform = "translateX(" + -t * lw + "px)";
		setTimeout(function() {
			isSlideHorizontal = true;
		}, 500);
	}

}




