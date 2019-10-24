var userID = '秦始皇'; //获取用户的ID-----------------------------------------------

var startLoadingTime = new Date().getTime();
var endLoadingTime = 0;
var disTime = 0;
var nTime = 0;

//简写JS选择器-----------------------------------------------
function $e(element) {
	return document.querySelector(element);
}

function $All(elements) {
	return document.querySelectorAll(elements);
}
var oLoading = $e('.loading');
var container = $e('.container');
var oRequest = $e('.request');
var aTitle = ['余文乐冯小刚给你送新年祝福啦', '新的朋友', '详细资料', ['余文乐', '冯小刚'], '给好友发祝福'];

var aLoaderTxt = $All('.loading p');

for(var i = 0; i < aLoaderTxt.length; i++) {
	aLoaderTxt[i].style.animation = 'txtLoading 1s ' + i * 1.5 + 's linear';
	aLoaderTxt[i].style.webkitAnimation = 'txtLoading 1s ' + i * 1.5 + 's linear';
}

//loading-----------------------------------------------
var loader = new window.PxLoader();

var fileList = [
	'images/hand.png',
	'images/img-01.jpg',
	'images/img-02.jpg',
	'images/img-03.jpg',
	'images/img-04.jpg',
	'images/img-05.jpg',
	'images/img-06.jpg',
	'images/img-07.jpg',
	'images/img-08.jpg',
	'images/img-09.jpg',
	'images/img-10.jpg',
	'images/img-11.jpg',
	'images/img-12_1.jpg',
	'images/img-13.jpg',
	'images/img-23.jpg',
	'images/img-24.jpg',
	'images/img-bg.jpg',
	'images/img-icon-01.png',
	'images/img-icon-02.png',
	'images/img-icon-03.jpg',
	'images/img-icon-04_1.jpg',
	'images/img-icon-05_1.jpg',
	'images/img-icon-06_1.jpg',
	'images/img-icon-07_1.jpg',
	'images/img-icon-08_1.jpg',
	'images/img-icon-09_1.jpg',
	'images/img-icon-10_1.jpg',
	'images/img-icon-11_1.jpg',
	'images/img-pj_1.png',
	'images/shurukuang1.jpg'
];

for(var i = 0; i < fileList.length; i++) {
	loader.addImage(fileList[i]);
}
loader.addProgressListener(function(e) {
	var percent = Math.round((e.completedCount / e.totalCount) * 100);
	//$('.loading p').innerHTML = percent + '%';
});
loader.addCompletionListener(function() {
	endLoadingTime = new Date().getTime();
	disTime = endLoadingTime - startLoadingTime;

	if(disTime < 2000) {
		setTimeout(function() {
			container.style.display = 'block';
		}, 1000);
		nTime = 2000 - disTime;
		main(nTime);
//		console.log(startLoadingTime);
//		console.log(endLoadingTime);
//		console.log(disTime);
//		console.log(nTime);
	} else {
		main(nTime);
	}
});
loader.start();

function sendInit() {

	var assetsPath = "music/";
	var sounds = [ 
		{src: "unlock.mp3",	id: 1},
		{src: "message.mp3",	id: 2},
		{src: "click.mp3",	id: 3},
		{src: "send.mp3",	id: 4},
		{src: "send.mp3",	id: 5}
	];

	createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Sound.addEventListener("fileload", createjs.proxy(soundLoaded, this)); 
	createjs.Sound.registerSounds(sounds, assetsPath);
}

function soundLoaded(event) {
	console.log(event.src);
}

var aTime = null;
var aSendNum = 0;
var aTime2 = null;
var aSendNum2 = 0;
var clickTime=null;
sendInit();
var instance;
function playSound(id) {
	instance = createjs.Sound.play(id);
	if(instance == null || instance.playState == createjs.Sound.PLAY_FAILED) {
		return;
	}
	if(id==3){
		clickTime=setInterval(function(){
			if(instance.position>1300){
				clearInterval(clickTime);
				createjs.Sound.stop();
			}
		},100);
	}else if(id == 4) {
		createjs.Sound.stop();
		setTimeout(function() {
			createjs.Sound.play(id);
//			console.log('1');
			aTime = setInterval(function() {
				createjs.Sound.play(id);
				if(aSendNum > 4) {
					clearInterval(aTime);
					createjs.Sound.stop();
				} else {
					aSendNum++;
//					console.log(aSendNum);
				}

			}, 1500);
		}, 500);
	}else if(id == 5) {
		createjs.Sound.stop();
		setTimeout(function() {
			createjs.Sound.play(id);
//			console.log('1');
			aTime2 = setInterval(function() {
				createjs.Sound.play(id);
				if(aSendNum2 >0) {
					clearInterval(aTime2);
					createjs.Sound.stop();
				} else {
					aSendNum2++;
//					console.log(aSendNum2);
				}
			}, 1500);
		}, 500);
	}


	instance.addEventListener("complete", function(instance) {
//		console.log('complete');
	});
}
function audioAutoPlay(id){
    var audio = document.getElementById(id);
    audio.play();
    document.addEventListener("WeixinJSBridgeReady", function () {
        audio.play();
    }, false);
    document.addEventListener('YixinJSBridgeReady', function() {
        audio.play();
    }, false);
}


function main(t) {
	setTimeout(function() {
		oLoading.className = 'loading loadfadeout';
		//oLoading.style.display = 'none';
		setTimeout(function() {
			oLoading.style.display = 'none';
			//init(messageSrc, 0);
			playSound(2);
//            audioAutoPlay('message');
			$e('.info-active').style.display = 'block';
			$e('.info-active').style.animationPlayState = 'running';
			$e('.info-active').style.webkitAnimationPlayState = 'running';
		}, 1000);
	}, t);
}

//获取系统时间-----------------------------------------------

var startTime = null;

var aWeek = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

var oTimeTxt = $e('.u-time');
var oDateTxt = $e('.u-date');
var lastTime = 0;

function getTime() {
	var dateTime = new Date();
	var oHours = dateTime.getHours();
	var oMinutes = dateTime.getMinutes();
	var oSecond = dateTime.getSeconds();
	var oDate = dateTime.getDate();
	var oMonth = dateTime.getMonth();
	var oDay = dateTime.getDay();

	if(oMinutes < 10) {
		oTimeTxt.innerHTML = oHours + ':' + '0' + oMinutes;
	} else {
		oTimeTxt.innerHTML = oHours + ':' + oMinutes;
	}
	oDateTxt.innerHTML = (oMonth + 1) + '月' + oDate + '日' + '  ' + aWeek[oDay];

	return lastTime = 60 - oSecond;
}

getTime();

setTimeout(function() {
	getTime();
	startTime = setInterval(function() {
		getTime();
	}, 60000);
}, lastTime * 1000);

//滑动解锁-----------------------------------------------

function slideControl(oClass, className, centerX) {
	setTitle(aTitle[0]);
	var oSlide = $e(oClass);
	var oSlideBox = $e('.slide');
	var startX;
	var moveX;
	var endX;
	var oSlideStartX = 0;
	var oSlideTargetX = centerX;
	var oSlideDuration = 0;


	oSlide.addEventListener('touchstart', onTouchStart, false);

	function onTouchStart(e) {
		//e.preventDefault();
		var _touch = e.touches[0];
		startX = _touch.pageX;
		oRequest.style.display = 'block';
		oSlide.className = className;
		oSlide.style.transitionDuration = '0s';
		oSlide.style.webkitTransitionDuration = '0s';

//		oSlide.addEventListener('touchmove', onTouchMove, false);
//		oSlide.addEventListener('touchend', onTouchEnd, false);
		oSlide.addEventListener('click', click, false);
	}
    function click(){
        oSlideBox.className = 'section slide slideActive';
        setTimeout(function() {
            clearInterval(startTime);
            //init(unlockSrc, 0);
            playSound(1);
            container.removeChild(oSlideBox);
            setTimeout(function() {
                $e('.requestHint').style.display = 'block';
            }, 500);
            setTitle(aTitle[1]);
        }, 400);
    }
	function onTouchMove(e) {
		//e.preventDefault();
		var _touch = e.touches[0];
		moveX = _touch.pageX - startX;
		oSlide.style.transform = 'translate3d(' + moveX + 'px,0px,0px)';
		oSlide.style.webkitTransform = 'translate3d(' + moveX + 'px,0px,0px)';
	}

	function onTouchEnd() {
		endX = moveX;
		oSlide.className = className + ' slideActive';
		oSlideDuration = (0.35 * moveX / oSlideTargetX).toFixed(2);
		if(endX > oSlideTargetX) {
			oSlide.style.transitionDuration = '0.35s';
			oSlide.style.webkitTransitionDuration = '0.35s';
			oSlide.style.transform = 'translate3d(' + (oSlideTargetX + 300) + 'px,0px,0px)';
			oSlide.style.webkitTransform = 'translate3d(' + (oSlideTargetX + 300) + 'px,0px,0px)';
			oSlide.style.opacity = 0;
			oSlideBox.className = 'section slide slideActive';
			setTimeout(function() {
				clearInterval(startTime);
				//init(unlockSrc, 0);
				playSound(1);
				container.removeChild(oSlideBox);
				setTimeout(function() {
					$e('.requestHint').style.display = 'block';
				}, 500);
				setTitle(aTitle[1]);
			}, 400);
		} else {
			oSlideBox.style.opacity = 1;
			oSlide.style.transitionDuration = oSlideDuration + 's';
			oSlide.style.webkitTransitionDuration = oSlideDuration + 's';
			oSlide.style.transform = 'translate3d(0px,0px,0px)';
			oSlide.style.webkitTransform = 'translate3d(0px,0px,0px)';
		}
	}
}

slideControl('.m-info', 'm-info', 200); //滑动信息解锁

//点击接受好友请求-----------------------------------------------

var infoData = [{
	name: '余文乐',
	wxh: 'yuwenle',
	headImgURL: 'images/img-24.jpg',
	region: '中国  香港',
	photoURL: 'images/img-07.jpg',
	posterURL: 'images/img-02.jpg'
}, {
	name: '冯小刚',
	wxh: 'fengxiaogang',
	headImgURL: 'images/img-23.jpg',
	region: '北京  海淀区',
	photoURL: 'images/img-08.jpg',
	posterURL: 'images/img-01.jpg'
}];

var aAccept = $All('.abtn-2');

for(var i = 0; i < aAccept.length; i++) {
	aAccept[i].index = i;
	aAccept[i].addEventListener('touchstart', function() {
		var nIndex = this.index;
		selectUser(nIndex);
		setTitle(aTitle[2]);

	}, false);
}

function selectUser(id) {

	container.removeChild(oRequest);

	var oDetailed = $e('.detailed');
	oDetailed.style.display = 'block';

	var oUserImg = $e('.u-user-img img');
	oUserImg.src = infoData[id].headImgURL;

	var oUserName = $e('.u-name-txt span:first-child');
	oUserName.innerHTML = infoData[id].name;

	var oUserWX = $e('.u-name-wx span:last-child');
	oUserWX.innerHTML = infoData[id].wxh;

	var oUserRegion = $e('.u-region span:nth-of-type(2)');
	oUserRegion.innerHTML = infoData[id].region;

	var oUserPhotoImg = $e('.u-user-photo span:nth-of-type(2) img');
	oUserPhotoImg.src = infoData[id].photoURL;

	var oUserPhotoImgHint = $e('.detailedHint .u-user-photo span:nth-of-type(2) img');
	oUserPhotoImgHint.src = infoData[id].photoURL;

	setTimeout(function() {
		$e('.detailedHint').style.display = 'block';
	}, 500);

	var oUserPhoto = $e('.detailedHint-btn');
	var oUserInfo = $e('.m-user-info');

	var oFriends = $e('.friends');
	var oFriendsPoster = $e('.m-user-poster span:nth-of-type(1) img');
	var oFriendsName = $e('.m-user-poster span:nth-of-type(2)');
	var oFriendsHeadImg = $e('.m-user-poster span:nth-of-type(3) img');

	var oInfoHeadImg = $e('.user-friends .m-info-headImg img');
	var oInfoName = $e('.user-friends .m-info-container h1');
	var oInfoContainer = $e('.user-friends .m-info-container');

	var isAnimation = false;
	var isInputBox = false;
	var aCommentSpan = $All('.u-comment-box span');
	var aCommentP = $All('.u-comment-box span p');
	var oCommentBox = $e('.u-comment-box');
	var n = 0;
	var m = 0;
	var j = 0;
	var a = 0;
	var b = 0;
	var c = 0;
	var setHeight = null;
	var setScrollTop = null;
	var setHeight2 = null;
	var setScrollTop2 = null;
	var setScrollTop3 = null;
	var oFriendscrollTop = $e(".m-friends");
	var oInputBox = $e('.u-input-box');
	var oInputBoxAnimation = $e('.u-input-box span');
	var oInputBoxBtn = $e('.u-input-box h2');
	var oInputBoxHand = $e('.u-input-box h1');

	var oSetUserName = $All('.userID');

	var aHeight = [];
	var result = 0;

	for(var i = 0; i < oSetUserName.length; i++) {
		if(i == 0) {
			oSetUserName[i].innerHTML = userID;
		} else {
			oSetUserName[i].innerHTML = userID + '：';
		}
	}

	var aSpanTxt = ['：</i>横批,来干一杯！<img src="images/img-icon-10_1.jpg"></p>', '<p><i>金立:</i>往来有“芯”更安全！<img src="images/img-icon-11_1.jpg"></p>'];

	oUserPhoto.addEventListener('touchstart', function() {
		container.removeChild(oDetailed);
		setTitle(aTitle[3][id]);
		oFriends.style.display = 'block';
		oFriendsPoster.src = infoData[id].posterURL;
		oFriendsName.innerHTML = infoData[id].name;
		oFriendsHeadImg.src = infoData[id].headImgURL;
		oInfoHeadImg.src = infoData[id].headImgURL;
		oInfoName.innerHTML = infoData[id].name;

	}, false);

	oFriendscrollTop.addEventListener('scroll', function() {
//        console.log(oFriendscrollTop.scrollTop);
		if(oFriendscrollTop.scrollTop >= 740) {
			if(j < 1) {
				j++;
				$e('.m-zzc').style.display = 'block';
				setTimeout(function() {
					for(var i = 0; i < aCommentSpan.length; i++) {
						if(i == 0) {
							aCommentSpan[i].style.animation = 'showUp 0.35s 0.8s ease forwards';
							aCommentSpan[i].style.webkitAnimation = 'showUp 0.35s 0.8s ease forwards';
						} else {
							aCommentSpan[i].style.animation = 'showUp 0.35s ' + (1.5 * i + 0.8) + 's ease forwards';
							aCommentSpan[i].style.webkitAnimation = 'showUp 0.35s ' + (1.5 * i + 0.8) + 's ease forwards';
						}
					}
//					var sendTime = null;
//					var aT = 0;
//					setTimeout(function() {
//						init(sendSrc, 0);
//						sendTime = setInterval(function() {
//							if(aT > 3) {
//								clearInterval(sendTime);
//								soundInstance.stop();
//							} else {
//								aT++;
//							}
//							soundInstance.play({
//								interrupt: createjs.Sound.INTERRUPT_ANY,
//								loop: 0
//							});
//						}, 1500);
//					}, 500);

					playSound(4);

					$e('.u-comment-box span:nth-of-type(6)').addEventListener('animationend', function() {
						clearInterval(setScrollTop);
					}, false);
					$e('.u-comment-box span:nth-of-type(6)').addEventListener('webkitAnimationEnd', function() {
						clearInterval(setScrollTop);
					}, false);

					var nT = aCommentSpan.length * 1500 + 500;
					oCommentBox.style.display = 'block';
					setTimeout(function() {
						if(b < 1) {
							for(var i = 0; i < aCommentP.length; i++) {
								var newHeight = aCommentP[i].offsetHeight + 13;
								aHeight.push(newHeight);
							}
							b++;
						}
						for(var i = 0; i < aHeight.length; i++) {
							result += aHeight[i];
						}
						setTimeout(function() {
							oInputBox.style.display = 'block';
							setTimeout(function() {

								oInputBoxAnimation.style.animationPlayState = 'running';
								oInputBoxAnimation.style.webkitAnimationPlayState = 'running';

								playSound(3);
								
								oInfoContainer.style.marginBottom = result + 300 + 'px';
								oFriendscrollTop.scrollTop += (result + 260);
								setTimeout(function() {
									oInputBoxHand.style.animationPlayState = 'running';
									oInputBoxHand.style.webkitAnimationPlayState = 'running';
								}, 1500);
							}, 100);
						}, nT);
						oCommentBox.style.height = result + 20 + 'px';
					}, 350);

					setScrollTop = setInterval(function() {
						if(oFriendscrollTop.scrollTop > 1500) {
							clearInterval(setScrollTop);
						} else {
							oFriendscrollTop.scrollTop += 1;
						}
					}, 20);

					oInputBoxAnimation.addEventListener('animationend', function() {
						$e('.m-zzc').style.display = 'none';
						oInputBoxBtn.style.display = 'block';
						if(a < 1) {
							a++;
							oInputBoxBtn.addEventListener('touchstart', function() {


								
								oInputBox.style.display = 'none';
								oInfoContainer.style.marginBottom = '0';
								setTimeout(function() {
									for(var i = 0; i < 2; i++) {
										var oCreateSpan = document.createElement("span");
										if(i == 0) {
											oCreateSpan.innerHTML = '<p><i class="userID">' + userID + aSpanTxt[i];
											oCreateSpan.style.animation = 'showUp 0.35s ' + 0.7 + 's forwards';
											oCreateSpan.style.webkitAnimation = 'showUp 0.35s ' + 0.7 + 's forwards';
										} else {
											oCreateSpan.innerHTML = aSpanTxt[i];
											oCreateSpan.style.animation = 'showUp 0.35s ' + 1.8 + 's forwards';
											oCreateSpan.style.webkitAnimation = 'showUp 0.35s ' + 1.8 + 's forwards';
										}

										oCommentBox.appendChild(oCreateSpan);
										
									}
									setTimeout(function() {
										clearInterval(setScrollTop2);
									}, 2000);
									

									playSound(5);
									
									setTimeout(function() {
										setTimeout(function() {
											container.removeChild(oFriends);
											setTitle(aTitle[4]);
											$e('.benediction').style.display = 'block';
										}, 2000 + 2000);
										oCommentBox.style.transition = 'all 0.25s linear';
										oCommentBox.style.webkitTransition = 'all 0.25s linear';
										oCommentBox.style.height = 60 * 2 + result + 'px';
									}, 50);
									setScrollTop2 = setInterval(function() {
										if(oFriendscrollTop.scrollTop > 1640) {
											clearInterval(setScrollTop2);
										} else {
											oFriendscrollTop.scrollTop += 2;
										}
									}, 20);
								}, 1000);
							}, false);
						}
					}, false);

					oInputBoxAnimation.addEventListener('webkitAnimationEnd', function() {
						
						$e('.m-zzc').style.display = 'none';
						oInputBoxBtn.style.display = 'block';
						if(a < 1) {
							a++;
							oInputBoxBtn.addEventListener('touchstart', function() {
								oInputBox.style.display = 'none';
								oInfoContainer.style.marginBottom = '0';
								setTimeout(function() {
									for(var i = 0; i < 2; i++) {
										var oCreateSpan = document.createElement("span");
										if(i == 0) {
											oCreateSpan.innerHTML = '<p><i class="userID">' + userID + aSpanTxt[i];
											oCreateSpan.style.animation = 'showUp 0.35s ' + 0.5 + 's forwards';
											oCreateSpan.style.webkitAnimation = 'showUp 0.35s ' + 0.5 + 's forwards';
										} else {
											oCreateSpan.innerHTML = aSpanTxt[i];
											oCreateSpan.style.animation = 'showUp 0.35s ' + 1.5 + 's forwards';
											oCreateSpan.style.webkitAnimation = 'showUp 0.35s ' + 1.5 + 's forwards';
										}

										oCommentBox.appendChild(oCreateSpan);
										
									}
									setTimeout(function() {
										clearInterval(setScrollTop2);
									}, 2000);
									
									playSound(5);

									setTimeout(function() {
										setTimeout(function() {
											container.removeChild(oFriends);
											setTitle(aTitle[4]);
											$e('.benediction').style.display = 'block';
										}, 2000 + 2000);
										oCommentBox.style.transition = 'all 0.25s linear';
										oCommentBox.style.webkitTransition = 'all 0.25s linear';
										oCommentBox.style.height = 60 * 2 + result + 'px';
									}, 50);
									setScrollTop2 = setInterval(function() {
										if(oFriendscrollTop.scrollTop > 1640) {
											clearInterval(setScrollTop2);
										} else {
											oFriendscrollTop.scrollTop += 2;
										}
									}, 20);
								}, 1000);
							}, false);
						}
					}, false);

				}, 800);
			}
		}

	}, false);
}
$e('.m-zzc').addEventListener('touchstart', function(e) {
	e.preventDefault();
}, false);
//遮盖消失
var duilian_tan = $e('.duilian_tan');
duilian_tan.addEventListener('touchstart', function() {
    $e('.duilian_tan').style.display = 'none';
});
//给好友发祝福-----------------------------------------------

function setBenediction() {
	var oBenedictionImg = $e('.m-benediction-container h3 img');
	var oUserInputTxt = $e('#benediction-txt');
	var oUserBenediction = $e('.user-benediction');
	var oChangeTxt = $e('.user-benediction p i');
	var oChangeTxt2 = $e('.user-benediction p span');
	var oBtn = $e('.u-benediction-input a');
	var oErrorPopup = $e('.error-popup');
	var oConfirm = $e('.error-popup a');
	var oClose = $e('.error-title span:last-child');
	var oErrorContainer = $e('.error-container');
	var oChangeTxtStyle = $e('.user-benediction p');
	var oRedPacket = $e('.u-red-packet');
	var oBenedictionInput = $e('.u-benediction-input');
	var oUserTip = $e('.benediction h1');
	var oHintShare = $e('.m-hint-share');

	oBtn.addEventListener('touchstart', function() {

		var  inputReg = /^[\u2E80-\u9FFF]+$/;
		if(inputReg.test(oUserInputTxt.value)) {
			if(oUserInputTxt.value.length > 4) {
				oErrorPopup.style.display = 'block';
			} else {
			    onckjsname();
                $e('.duilian_tan').style.display = 'block';
				//$e('.m-benediction-container').className='m-benediction-container benedictionActive';
				if(oUserInputTxt.value.length == 4) {
					$e('.new_text').style.fontSize = '40px';
					$e('.new_text').style.lineHeight = '44px';

					oChangeTxt.style.fontSize = '40px';
					oChangeTxt.style.lineHeight = '44px';
				} else if(oUserInputTxt.value.length == 3) {
                    $e('.new_text').style.fontSize = '45px';
					$e('.new_text').style.lineHeight = '51px';
                    oChangeTxt.style.fontSize = '45px';
					oChangeTxt.style.lineHeight = '51px';
				} else if(oUserInputTxt.value.length == 2) {
                    $e('.new_text').style.fontSize = '48px';
					$e('.new_text').style.lineHeight = '60px';
                    oChangeTxt.style.fontSize = '48px';
					oChangeTxt.style.lineHeight = '60px';
				} else {
                    $e('.new_text').style.fontSize = '55px';
					$e('.new_text').style.lineHeight = '72px';
                    oChangeTxt.style.fontSize = '55px';
					oChangeTxt.style.lineHeight = '72px';
				}
				oBenedictionImg.src = 'images/img-bg3.png';
				oUserBenediction.style.display = 'block';
				oChangeTxt.innerHTML = oUserInputTxt.value;
				oBenedictionInput.style.display = 'none';
				oUserTip.style.display = 'none';
				oRedPacket.style.display = 'block';
				oChangeTxt.className = 'showTxt';
				//oChangeTxt2.className = 'showTxt2';
				$e('.m-highlight').style.display = 'block';
				$e('.new_text').style.opacity = 1;
			}
		} else {
			oErrorPopup.style.display = 'block';
		}
	}, false);

	oConfirm.addEventListener('touchstart', function() {
		oUserInputTxt.value = '';
		oErrorPopup.style.display = 'none';
	}, false);
	oClose.addEventListener('touchstart', function() {
		oErrorPopup.style.display = 'none';
	}, false);
	oErrorPopup.addEventListener('touchstart', function() {
		oErrorPopup.style.display = 'none';
	}, false);
	oErrorContainer.addEventListener('touchstart', function(e) {
		e.stopPropagation();
	}, false);
	//提示分享
	oRedPacket.addEventListener('touchstart', function() {
		oHintShare.style.display = 'block';
	}, false);
	oHintShare.addEventListener('touchstart', function() {
		oHintShare.style.display = 'none';
	}, false);
}
setBenediction();

//修改标题-----------------------------------------------

function setTitle(title) {
	var $body = $('body');
	document.title = title;
	var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
		setTimeout(function() {
			$iframe.off('load').remove();
		}, 0)
	}).appendTo($body);
}