window.addEventListener('touchmove', function(e) {
	e.preventDefault();
}, false);

var userData = {
	"sex": null, //0-> 男  1->女
	"city": null, //0->线城市  1->二线城市  2->三线城市
	"pay": null, //
	"house": null, //0->豪华小区 1->高档小区 2->中档小区
	"education": null, //0->出国留学 1->私立学校 2->公立学校
	"money": null //0->20W 1->10W 2->5W
}

var userImages = {
	"sex": [
		[],
		[]
	],
	"photo": [],
	"house": [],
	"edu": [],
	"money": []
}

var user = {
	"qrcode": null,
	"name": null,
	"mobile": null,
	"headImage": []
};

var textResult = [
	["我对品质生活的要求已经超越", "50%", "的吃瓜群众，", "快来围观......"],
	["我对品质生活的要求已经超越", "80%", "的吃瓜群众，", "快来围观......"],
	["我对品质生活的要求已经超越", "99.9%", "的吃瓜群众，", "快来围观......"]
]
var duanzi = [
	["给自己定个小目标，", "比如说先挣1个亿。"],
	["不必控制寄几，", "没有买买买，哪来赚赚赚。"],
	["天没降大任于我，", "照样苦我心智劳我筋骨。"],
	["生活越是艰难", "就越该展现自己的freestyle。"],
	["少一点得过且过的套路，", "多一点不将就的生活态度。"],
	["其实失败只有一种，", "那就是凡事都半途而废。"],
	["明明可以靠脸吃饭，", "我却还是要努力工作。"],
	["或许逆着风的方向，", "更适合你去展翅飞翔。"],
	["如果理想生活只是向往，", "远方依旧是远方。"],
	["很多人生活的理想，", "就是为了理想的生活。"],
	["生活不止眼前的苟且，", "还有无止尽的账单。"],
	["花的还没有没挣得多，", "你自己心里没点X数？"],
	["钱的重要性", "就在于把它变得不重要。"],
	["我本将心认真对待生活，", "奈何生活总在无情打劫我。"],
	["出来混，迟早是要成功的。", ""],
	["人生没有白走的路，", "每一步都算数。"],
	["梦想一定要有，", "万一实现了呢。"],
	["不被嘲笑", "的梦想是不值得被实现的。"],
	["永远年轻，永远热泪盈眶。", ""],
	["彪悍的人生，不需要解释。", ""]
];

var billData = {
	"pay": [
		["15000", "10000", "6000"],
		["12000", "8000", "4000"],
		["9000", "6000", "3000"]
	],
	"house": [
		["1000", "800", "600"],
		["600", "300", "200"],
		["150", "70", "50"]
	],
	"edu": ["80", "50", "20"],
	"money": ["20", "10", "5"]
};

function setUserInfo(qrcode, name, mobile) {
	user.qrcode = qrcode;
	user.name = name;
	user.mobile = mobile;
	$('.poster-user-info h1 img').attr('src', qrcode);
	$('.poster-user-info h2 a').html(mobile).attr("href", "tel:" + mobile);
}

//从URL上取参数
function getUrlParams(keyName) {
	var reg = new RegExp("(^|&)" + keyName + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r != null) return decodeURIComponent(r[2]);
	return null;
}

var agentNo = getUrlParams("agentNo"); //从url上取agentNo=1120103025
var interFace = getUrlParams("interFace"); //'dmz';

//获取业务员信息之后要执⾏的回调函数
function callback(status, data) {
	if(status === 'N') {
		alert(data.message); //弹出错误信息
	} else {
		//console.log(data); //获取业务员信息成功
		/*
		data.qrcode_path : 微信⼆维码地址
		data.agentName ：姓名
		data.wechatid ： 微信号
		data.mobile_no ： ⼿机号
		data.headImagePath ：头像
		data.wechatShop ：微店地址
		data.eCard ：名片地址
		*/
		setUserInfo(data.qrcode_path, data.agentName, data.mobile_no);
	}
}
/**
 *获取业务员信息⽅法
 * @agentNo 业务员编号
 * @interFace 环境判断 （dmz为测试，prd为⽣产）
 * @callback 回调⽅法
 */
getAgentInfo(agentNo, interFace, callback);

function joininPA() {
	var interFace = getUrlParams('interFace');
	var hostUrl = getHostUrl(interFace);
	var url = hostUrl + '/salesinfo/eLifeAssist/myStore/module/joinPingan.html?temp=' + new Date().getTime() + '#/index' + location.search;
	window.location.href = url;
}

function getHostUrl(interFace) {
	var prd = "https://salescdn.pa18.com"; //生产
	var stg = "https://sales-stg3.paic.com.cn"; //测试
	var dmz = "https://salestest-dmzstg3.pa18.com:30443"; //测试stg3外网
	if(interFace == "stg") {
		return stg;
	} else if(interFace == "dmz") {
		return dmz;
	} else {
		return prd;
	}
}

function loadContaier() {
	$('.b1-1').fadeIn(300, function() {
		$('.b1-2').fadeIn(300, function() {
			$('.b1-3').fadeIn(300, function() {
				$('.b1-4').fadeIn(300, function() {
					$('.b1-5').fadeIn(300, function() {
						$('.b1').addClass("fadeOutLeft");
						setTimeout(function() {
							$('.b2-1').fadeIn(300, function() {
								$('.b2-2').fadeIn(300, function() {
									$('.b2-3').fadeIn(300, function() {
										$('.b2-4').fadeIn(300, function() {
											$('.b2-5').fadeIn(300, function() {
												$('.b2').addClass("fadeOutLeft");
												setTimeout(function() {
													$('.b3-1').fadeIn(300, function() {
														$('.b3-2').fadeIn(300, function() {
															$('.b3-3').fadeIn(300, function() {
																$('.b3-4').fadeIn(300, function() {
																	$('.b3-5').fadeIn(300, function() {
																		$('.b3').addClass("fadeOutLeft");
																		setTimeout(function() {
																			$('.loading-bill span').hide();
																			$('.b1').removeClass("fadeOutLeft").hide().fadeIn(300);
																			$('.b2').removeClass("fadeOutLeft").hide().fadeIn(400);
																			$('.b3').removeClass("fadeOutLeft").hide().fadeIn(500, function() {
																				loadContaier();
																			});
																		}, 300);
																	});
																});
															});
														});
													});
												}, 300);
											});
										});
									});
								});
							});
						}, 300);
					});
				});
			});
		});
	});
}
var click_music = document.getElementById("click_music");
var startTime = new Date().getTime();
var endTime = 0;
var dis = 0;
var time = 0;
var main = {
	images: [],
	isStart: false,
	isNext: false,
	isNextPay: false,
	isNextHouse: false,
	isNextEdu: false,
	isNextMoney: false,
	longPress: false,
	timer: null,
	loadAnimate: function() {
		var canvas = document.getElementById("loadCanvas");
		var ctx = canvas.getContext('2d');
		var w = window.innerWidth;
		var h = 274;
		var l = (w - 247) / 2;

		canvas.width = w;
		canvas.height = h;

		var img_bg = document.getElementById("img_02");
		var img_pen = document.getElementById("img_01");

		animate();

		function drawImg() {
			ctx.drawImage(img_bg, l, 0, 247, h);

			ctx.font = "22px 苹方,helvetica,microsoft yahei";
			ctx.fillStyle = "#8b8b8b";
			ctx.fillText("生活账单", l + 85, 60);

			ctx.fillStyle = "#cbc9c8";
		}

		var rectWidth = 130;
		var nw1 = 0;
		var nw2 = 0;
		var nw3 = 0;
		var nw4 = 0;
		var pen_w = 0;
		var pen_h = 0;
		var pen_h1 = 0;
		var pen_h2 = 30;
		var pen_h3 = 60;
		var pen_w1 = 0;
		var pen_w2 = 0;
		var pen_w3 = 0;
		var pen_w4 = 0;
		var isFinish = false;
		var n = 0;

		function animate() {

			requestAnimationFrame(animate);
			ctx.clearRect(0, 0, w, h);
			if(nw1 >= rectWidth) {
				nw1 = rectWidth;

				if(pen_h1 >= 25) {
					pen_h1 = 25;
				} else {
					pen_h1++;
					pen_h = pen_h1;
				}

				if(pen_w1 <= 0) {
					pen_w1 = 0;
					n = 1;

					if(nw2 >= rectWidth) {
						nw2 = rectWidth

						if(pen_h2 >= 50) {
							pen_h2 = 50;
						} else {
							pen_h2++;
							pen_h = pen_h2;
						}

						if(pen_w2 <= 0) {
							pen_w2 = 0;
							n = 2;
							if(nw3 >= rectWidth) {
								nw3 = rectWidth;

								if(pen_h3 >= 75) {
									pen_h3 = 75;
								} else {
									pen_h3++;
									pen_h = pen_h3;
								}

								if(pen_w3 <= 0) {
									pen_w3 = 0;
									n = 3;
									if(nw4 >= rectWidth) {
										nw4 = rectWidth;
										isFinish = true;
									} else {
										nw4 += 10;
										pen_w4 = nw4;
									}
								} else if(n == 2) {
									pen_w3 -= 10;
								}
							} else {
								nw3 += 10;
								pen_w3 = nw3;
							}
						} else if(n == 1) {
							pen_w2 -= 10;
						}
					} else if(n == 1) {
						nw2 += 10;
						pen_w2 = nw2;
					}

				} else if(n == 0) {
					pen_w1 -= 10;
				}

			} else {
				nw1 += 10;
				pen_w1 = nw1;
			}

			if(n == 0) {
				pen_w = pen_w1;
			} else if(n == 1) {
				pen_w = pen_w2;
			} else if(n == 2) {
				pen_w = pen_w3;

			} else if(n == 3) {
				pen_w = pen_w4;

			}

			if(isFinish) {
				ctx.clearRect(0, 0, w, h);
				if(pen_w4 <= 0) {
					pen_w = 0;
					nw1 = 0;
					nw2 = 0;
					nw3 = 0;
					nw4 = 0;
					pen_h1 = 0;
					pen_h2 = 25;
					pen_h3 = 50;
					pen_w1 = 0;
					pen_w2 = 0;
					pen_w3 = 0;
					pen_w4 = 0;
					isFinish = false;
					n = 0;
					//run();
				} else {
					pen_w4 -= 7;
				}
				if(pen_h <= 0) {
					pen_h = 0;
				} else {
					pen_h -= 4;
				}
				//drawImg();
				ctx.drawImage(img_pen, l + 10 + pen_w, -10 + pen_h, 243, 180);
			} else {
				//drawImg();
				//run();
				ctx.drawImage(img_pen, l + 10 + pen_w, -10 + pen_h, 243, 180);
			}

			function run() {
				ctx.beginPath();
				ctx.fillRect(l + 65, 95, nw1, 16);
				ctx.fillRect(l + 65, 125, nw2, 16);
				ctx.fillRect(l + 65, 155, nw3, 16);
				ctx.fillRect(l + 65, 185, nw4, 16);
				ctx.closePath();
			}
		}
	},
	load: function() {
		_this = this;
		var loader = new PxLoader();

		for(var i = 0; i < data.length; i++) {
			_this.images.push(loader.addImage(data[i]));
		}

		loader.addProgressListener(function(e)  {      
			//console.log("已加载" + ((e.completedCount  /  e.totalCount) * 100).toFixed(0) + "%");
		});

		loader.addCompletionListener(function() {

			userImages.sex[0].push(_this.images[4], _this.images[5], _this.images[6]);
			userImages.sex[1].push(_this.images[7], _this.images[8], _this.images[9]);
			userImages.photo.push(_this.images[66], _this.images[65], _this.images[64]);
			userImages.house.push(_this.images[15], _this.images[14], _this.images[13]);
			userImages.edu.push(_this.images[20], _this.images[19], _this.images[18]);
			userImages.money.push(_this.images[25], _this.images[24], _this.images[23]);
			user.headImage.push(_this.images[39], _this.images[40]);

			endTime = new Date().getTime();
			dis = endTime - startTime;
			if(dis < 3000) {
				time = 3000 - dis;
				setTimeout(function() {
					_this.fadeOut('.loading');
				}, time);
			} else {
				setTimeout(function() {
					_this.fadeOut('.loading');
				}, time);
			}

		});

		loader.start();
	},
	fadeOut: function(aCalss) {
		var target = document.querySelector(aCalss);
		var class_name = target.className;

		target.className = class_name + " fadeOut";

		setTimeout(function() {
			target.style.display = "none";
			target.className = class_name
		}, 400);
	},
	fadeIn: function(aCalss) {
		var target = document.querySelector(aCalss);
		var class_name = target.className;
		target.style.display = "block";
		target.className = class_name + " fadeIn";
	},
	addClass: function(tag, aclass) {
		var target = document.querySelector(tag);
		var class_name = target.className;
		target.className = class_name + " " + aclass;

		setTimeout(function() {
			target.className = class_name;
		}, 400);
	},
	$A: function(obj) {
		return document.querySelector(obj);
	},
	$All: function(obj) {
		return document.querySelectorAll(obj);
	},
	clickStart: function() {
		this.$A('.index span:nth-of-type(3)').addEventListener('touchstart', function() {
			_this.fadeOut('.index');
		}, false);
	},
	userSelect: function() {
		_this = this;

		var progress_bar = this.$A(".progress-bar i");

		choose('.sex li', "sex", sexAndCity);
		choose('.city li', "city", sexAndCity);
		choose('.pay li', "pay", changePay, ".user-sex");
		choose('.house li', "house", changeHouse, ".user-house");
		choose('.education li', "education", changeEducation, ".user-education");
		choose('.money li', "money", changeMoney, ".user-money");

		function choose(classbtn, udata, call, box) {

			var sex_btn = _this.$All(classbtn);

			for(var i = 0; i < sex_btn.length; i++) {
				sex_btn[i].index = i;
				sex_btn[i].addEventListener('touchstart', function() {
					click_music.pause();
					click_music.currentTime = 0;
					click_music.play();

					for(var j = 0; j < sex_btn.length; j++) {
						sex_btn[j].className = "";
						if(this.index == j) {

							sex_btn[this.index].className = "active";
							userData[udata] = this.index;
							if(call) {
								call(this.index);
							}
						}
					}
				}, false);
			}
		}

		function clearClass(classbtn, sceneImg) {
			var sex_btn = _this.$All(classbtn);
			for(var j = 0; j < sex_btn.length; j++) {
				sex_btn[j].className = "";
			}
			if(typeof(sceneImg) !== "undefined") {
				_this.$A(sceneImg).src = "";
			}
		}

		function sexAndCity() {
			if(userData.sex !== null && userData.city !== null) {
				_this.isStart = true;
				_this.$A('.clickTest img').src = _this.images[38].src;
				if(parseInt(userData.sex) == 1) {
					_this.$A('.user-sex img').style.left = "0px";
				} else {
					_this.$A('.user-sex img').style.left = "2px";
				}
				for(var i = 0; i < _this.$All('.pay p').length; i++) {
					_this.$All('.pay p')[i].innerHTML = billData.pay[parseInt(userData.city)][i] + "元";
				}
				_this.$A('.user-sex img:nth-of-type(1)').src = userImages.sex[parseInt(userData.sex)][0].src;
				_this.$A('.user-sex img:nth-of-type(2)').src = userImages.sex[parseInt(userData.sex)][1].src;
				_this.$A('.user-sex img:nth-of-type(3)').src = userImages.sex[parseInt(userData.sex)][2].src;
			}
		}

		function changePay(n) {

			progress_bar.style.width = "25%";
			_this.$A('.choose-pay .bg').src = _this.images[11].src;
			_this.isNextPay = true;

			$('.user-photo img').eq(n).addClass("down").siblings().removeClass('down');
			$('.user-sex img').eq(n).addClass("right").siblings().removeClass('right');
		}

		function changeHouse(n) {
			progress_bar.style.width = "50%";
			_this.$A('.choose-house .bg').src = _this.images[11].src;
			_this.isNextHouse = true;

			$('.brush').addClass('runBrunsh');
			setTimeout(function() {
				$('.user-house img').eq(n).addClass("fadeIn").siblings().removeClass('fadeIn');
				$('.brush').removeClass('runBrunsh');
			}, 750);
		}

		function changeEducation(n) {
			progress_bar.style.width = "75%";
			_this.$A('.choose-education .bg').src = _this.images[11].src;
			_this.isNextEdu = true;
			$('.user-education img').eq(n).addClass("scaleIn").siblings().removeClass('scaleIn');
		}

		function changeMoney(n) {
			progress_bar.style.width = "100%";
			_this.$A('.choose-money .bg').src = _this.images[58].src;
			_this.isNextMoney = true;
			$('.user-money img').eq(n).addClass("down2").siblings().removeClass('down2');
			$('.light img').siblings().removeClass('runRotation').hide();
			setTimeout(function() {
				$('.light img').eq(n).fadeIn().addClass("runRotation");
			}, 450);
		}

		this.$A('.clickTest').addEventListener('touchstart', function() {
			if(_this.isStart) {
				_this.fadeOut('.select');
			}
		}, false);

		//上一步

		this.$A('.pay-btn .retreat').addEventListener('touchstart', function() {
			_this.fadeIn('.select');
			progress_bar.style.width = "0%";
			clearClass(".pay li");
			_this.$A('.choose-pay .bg').src = _this.images[63].src;
			_this.isNextPay = false;
			$('.user-photo img').siblings().removeClass('down');
			$('.user-sex img').siblings().removeClass('right');
		}, false);
		this.$A('.house-btn .retreat').addEventListener('touchstart', function() {
			_this.fadeIn('.choose-pay');
			progress_bar.style.width = "25%";
			clearClass(".house li");
			_this.$A('.choose-house .bg').src = _this.images[63].src;
			_this.isNextHouse = false;
			$('.user-house img').siblings().removeClass('fadeIn');
		}, false);
		this.$A('.education-btn .retreat').addEventListener('touchstart', function() {
			_this.fadeIn('.choose-house');
			progress_bar.style.width = "50%";
			clearClass(".education li");
			_this.$A('.choose-education .bg').src = _this.images[63].src;
			_this.isNextEdu = false;
			$('.user-education img').siblings().removeClass('scaleIn');
		}, false);
		this.$A('.money-btn .retreat').addEventListener('touchstart', function() {
			_this.fadeIn('.choose-education');
			progress_bar.style.width = "75%";
			clearClass(".money li", ".user-money img");
			_this.$A('.choose-money .bg').src = _this.images[62].src;
			_this.isNextMoney = false;
			$('.user-money img').siblings().removeClass('down2');
			$('.light img').siblings().removeClass('runRotation').hide();
		}, false);

		function setStage(aLi, isBtn) {
			var ali = _this.$All(aLi);

			for(var i = 0; i < ali.length; i++) {
				if(ali[i].className == "active") {
					isBtn = true;
					console.log("000")
				}
			}
		}

		//下一步
		this.$A('.pay-btn .advance').addEventListener('touchstart', function() {

			var ali = _this.$All(".pay li");

			for(var i = 0; i < ali.length; i++) {
				if(ali[i].className == "active") {
					_this.isNextPay = true;
				}
			}

			if(_this.isNextPay) {
				_this.fadeOut('.choose-pay');
				_this.isNextPay = false;
				progress_bar.style.width = "25%";
			}

		}, false);

		this.$A('.house-btn .advance').addEventListener('touchstart', function() {
			var ali = _this.$All(".house li");

			for(var i = 0; i < ali.length; i++) {
				if(ali[i].className == "active") {
					_this.isNextHouse = true;
				}
			}
			if(_this.isNextHouse) {
				_this.fadeOut('.choose-house');
				_this.isNextHouse = false;
				progress_bar.style.width = "50%";
			}
		}, false);

		this.$A('.education-btn .advance').addEventListener('touchstart', function() {
			var ali = _this.$All(".education li");

			for(var i = 0; i < ali.length; i++) {
				if(ali[i].className == "active") {
					_this.isNextEdu = true;
				}
			}

			if(_this.isNextEdu) {
				_this.fadeOut('.choose-education');
				_this.isNextEdu = false;
				progress_bar.style.width = "75%";
			}
		}, false);

		this.$A('.money-btn .advance').addEventListener('touchstart', function() {
			var ali = _this.$All(".money li");

			for(var i = 0; i < ali.length; i++) {
				if(ali[i].className == "active") {
					_this.isNextMoney = true;
				}
			}

			if(_this.isNextMoney) {
				_this.fadeOut('.test-container');
				_this.isNextMoney = false;
				progress_bar.style.width = "100%";
				var oUrl = window.location.href;
				var l = oUrl.split("?");
				var u = l[0] + "?agentNo=" + agentNo + "&interFace=" + interFace;
				_this.saveInventory(u, user.headImage[parseInt(userData.sex)]);
			}
		}, false);

		this.$A('.liveInventory-btn .retreat').addEventListener('touchstart', function() {
			_this.isStart = false;
			_this.isNextPay = false;
			_this.isNextHouse = false;
			_this.isNextEdu = false;
			_this.isNextMoney = false;

			_this.fadeIn('.select');

			clearClass(".sex li");
			clearClass(".city li");
			clearClass(".pay li");
			clearClass(".house li");
			clearClass(".education li");
			clearClass(".money li");

			_this.$A('.choose-pay .bg').src = _this.images[63].src;
			_this.$A('.choose-house .bg').src = _this.images[63].src;
			_this.$A('.choose-education .bg').src = _this.images[63].src;
			_this.$A('.choose-money .bg').src = _this.images[62].src;
			_this.$A('.clickTest img').src = _this.images[61].src;

			_this.$A('.user-sex img:nth-of-type(1)').src = "";
			_this.$A('.user-sex img:nth-of-type(2)').src = "";
			_this.$A('.user-sex img:nth-of-type(3)').src = "";

			$('.user-photo img').siblings().removeClass('down');
			$('.user-sex img').siblings().removeClass('right');
			$('.user-house img').siblings().removeClass('fadeIn');
			$('.user-education img').siblings().removeClass('scaleIn');
			$('.user-money img').siblings().removeClass('down2');
			$('.light img').siblings().removeClass('runRotation').hide();

			progress_bar.style.width = "0%";

			userData.sex = null;
			userData.city = null;
			userData.pay = null;
			userData.house = null;
			userData.education = null;
			userData.money = null;

			setTimeout(function() {
				_this.$A('.choose-pay').style.display = "block";
				_this.$A('.choose-house').style.display = "block";
				_this.$A('.choose-education').style.display = "block";
				_this.$A('.choose-money').style.display = "block";
				_this.$A('.test-container').style.display = "block";
			}, 400);

		}, false);

		this.$A('.liveInventory-btn .advance').addEventListener('touchstart', function() {
			_this.fadeOut('.liveInventory');
		}, false);

		this.$A('.excessive span:nth-of-type(3)').addEventListener('touchstart', function() {
			_this.fadeOut('.excessive');
		}, false);

	},
	saveInventory: function(url, src) {
		_this = this;
		var user_pay = parseInt(billData.pay[parseInt(userData.city)][parseInt(userData.pay)]);
		var user_house = parseInt(billData.house[parseInt(userData.city)][parseInt(userData.house)]);
		var user_edu = parseInt(billData.edu[parseInt(userData.education)]);
		var user_money = parseInt(billData.money[parseInt(userData.money)]);

		var total = (user_pay / 10000 + (user_house + user_edu + user_money) / 120).toFixed(3);
					
		var txt1 = {
			text: null,
			x2: 330
		};
		var leftX=0;
		if(0.925 <= total && total <= 3) {
			txt1.text = textResult[0];
			leftX=15;
		}
		if(3 < total && total <= 6) {
			txt1.text = textResult[1];
			leftX=15;
		} else if(6 < total && total <= 10.67) {
			txt1.text = textResult[2];
		}

		var r = parseInt(Math.random() * duanzi.length);

		var user_duanzi_1 = duanzi[r][0];
		var user_duanzi_2 = duanzi[r][1];
		
		var duanzi1X=680;
		
		if(user_duanzi_2==""){
			duanzi1X=700;
		}

		var canvas = document.createElement("canvas");
		var ctx = canvas.getContext('2d');
		var w = 640;
		var h = 800;
		var er_width = 180;
		var er_height = 180;

		canvas.width = w;
		canvas.height = h;

		ctx.beginPath();
		ctx.fillStyle = "#FFFFFF";
		ctx.fillRect(0, 0, w, h);
		ctx.closePath();

		$('#qrcodeCanvas').qrcode({
			render: "canvas",
			text: url,
			width: er_width,
			height: er_height,
			background: "#ffffff",
			foreground: "#000000",
			src: ''
		});
		var qrcodeCanvas = document.querySelector("#qrcodeCanvas canvas");

		var img_1 = new Image();
		img_1.src = _this.images[42].src;

		var img_2 = new Image();
		img_2.src = _this.images[43].src;

		img_1.onload = function() {
			img_2.onload = function() {
				ctx.drawImage(img_1, 0, 20);
				ctx.drawImage(img_2, 0, 120);
				ctx.drawImage(qrcodeCanvas, 375, 550, er_width, er_height);
				drawUserHead();

				ctx.beginPath();
				ctx.moveTo(75, 525);
				ctx.strokeStyle = "#647ab4";
				ctx.lineTo(554, 525);
				ctx.stroke();
				ctx.closePath();

				ctx.beginPath();
				ctx.fillStyle = "#FFB745";
				ctx.fillRect(72, 575, 112, 56);
				ctx.closePath();

				writeText(txt1.text[0], 70, 160, 22, "#647ab4", "left","normal");
				writeText(txt1.text[1], 408-leftX, 164, 32, "#FFB745", "center","normal");
				writeText(txt1.text[2], 460-leftX*2, 160, 22, "#647ab4", "left","normal");
				writeText(txt1.text[3], 70, 195, 22, "#647ab4", "left","normal");

				writeText("生活杂费:", 75, 460, 20, "#647ab4", "left","normal");
				writeText("元/月", 265, 460, 20, "#647ab4", "left","normal");
				writeText("买        房:", 350, 460, 20, "#647ab4", "left","normal");
				writeText("万", 540, 460, 20, "#647ab4", "left","normal");
				writeText("子女教育:", 75, 505, 20, "#647ab4", "left","normal");
				writeText("万", 265, 505, 20, "#647ab4", "left","normal");
				writeText("备  用  金:", 350, 505, 20, "#647ab4", "left","normal");
				writeText("万", 540, 505, 20, "#647ab4", "left","normal");

				writeText("实现品质生活", 76, 597, 17, "#ffffff", "left","normal");
				writeText("每月我要入金", 76, 623, 17, "#ffffff", "left","normal");

				writeText(user_pay, 214, 463, 30, "#FFB745", "center","normal");
				writeText(user_house, 494, 463, 30, "#FFB745", "center","normal");
				writeText(user_edu, 214, 508, 30, "#FFB745", "center","normal");
				writeText(user_money, 494, 508, 30, "#FFB745", "center","normal");
				
				var num=total * 10000;
				
				var len=num.toString().length;
				
				if(len==6){
					txt1.x2 = 335;
				}else if(len==5){
					txt1.x2 = 325;
				}else if(len==4){
					txt1.x2 = 315;
				}
				
				writeText(total * 10000, 260, 620, 42, "#FFB745", "center","bold");

				//writeText("合计:", 70, 580, 30, "#647ab4", "left","normal");
				writeText("元", txt1.x2, 618, 34, "#FFB745", "left","bold");

				//writeText("*参考人均消费值", 70, 660, 22, "#717171", "left","normal");

				writeText("扫码参与测试", 405, 760, 20, "#717171", "left","normal");

				writeText(user_duanzi_1, 72, duanzi1X, 24, "#717171", "left","normal");
				writeText(user_duanzi_2, 72, 712, 24, "#717171", "left","normal");

				//				writeText("长", 425, 635, 20, "#717171", "left","normal");
				//				writeText("按", 425, 666, 20, "#717171", "left","normal");
				//				writeText("体", 425, 697, 20, "#717171", "left","normal");
				//				writeText("验", 425, 727, 20, "#717171", "left","normal";

				setTimeout(function() {
					_this.$A('.saveImage img').src = canvas.toDataURL();
				}, 100);

			}
		}

		function drawUserHead() {
			var r = 60;
			var x = 262;
			var y = 245;
			if(parseInt(userData.sex) == 0) {
				x = 258;
				y = 245;
			}

			ctx.save();
			ctx.beginPath();
			ctx.arc(x + r - 2, y + r + 3, r + 3, 0, Math.PI * 2);
			ctx.clip();
			//ctx.fillStyle="rgba(0,0,0,0.5)";
			ctx.fillRect(x, y, 2 * r, 2 * r);
			ctx.drawImage(src, x, y, 2 * r, 2 * r);
			ctx.closePath();
			ctx.restore();
		}

		function writeText(txt, x, y, fontsize, color, txtAlign,textWeight) {
			ctx.beginPath();
			ctx.fillStyle = color;
			ctx.font = textWeight +" "+fontsize + "px 苹方,helvetica,microsoft yahei";
			ctx.textAlign = txtAlign;
			ctx.fillText(txt, x, y);
			ctx.closePath();
		}

		_this.$A('.saveImage img').addEventListener('touchstart', function(e) {
			e.stopPropagation();
		}, false);

	},
	slideJobAnalysis: function() {
		_this = this;
		var jobkind = this.$All(".jobAnalysis-class li i");
		var points = this.$All(".job-container .job-points li");
		var close = this.$A(".close");
		var jobContainer = this.$A(".job-ul");
		var n = 0;

		jobContainer.style.width = 530 * 5 + "px";

		for(var i = 0; i < jobkind.length; i++) {
			jobkind[i].index = i;
			jobkind[i].addEventListener('click', function(e) {

				e.stopPropagation();
				_this.fadeIn('.jobAnalysis');
				for(var j = 0; j < points.length; j++) {
					points[j].className = "";
					if(this.index == j) {
						points[this.index].className = "active";
						n = this.index;
						jobContainer.style.transform = "translateX(" + -530 * this.index + "px)";
					}
				}

			}, false);
		}
		close.addEventListener('touchstart', function() {
			_this.fadeOut('.jobAnalysis');
			setTimeout(function() {
				_this.$A('.jobAnalysis').className = "jobAnalysis";
			}, 450);
		}, false);

		var startX = 0;
		var moveX = 0;
		var isSlide = true;

		_this.$A('.job-container').addEventListener('touchstart', function(e) {
			startX = e.touches[0].clientX;

			_this.$A('.job-container').addEventListener('touchmove', function(e) {
				moveX = e.touches[0].clientX - startX;
			}, false);

			_this.$A('.job-container').addEventListener('touchend', function(e) {
				if(moveX < -150 && isSlide) {
					if(n >= points.length - 1) {
						n = points.length - 1;
					} else {
						n++;
					}
				}
				if(moveX > 150 && isSlide) {
					if(n <= 0) {
						n = 0;
					} else {
						n--;
					}
				}

				isSlide = false;
				boxTranslateX(n);
			}, false);

		}, false);

		function boxTranslateX(t) {
			jobContainer.style.transform = "translateX(" + -530 * t + "px)";
			for(var j = 0; j < points.length; j++) {
				points[j].className = "";
				if(t == j) {
					points[t].className = "active";
					n = t;
				}
			}
			setTimeout(function() {
				isSlide = true;
				moveX = 0;
			}, 400);
		}

		_this.$A('.poster-btn').addEventListener('touchstart', function(e) {
			_this.fadeIn('.shaer');
		}, false);

		_this.$A('.shaer').addEventListener('touchstart', function(e) {
			_this.fadeOut('.shaer');
			setTimeout(function() {
				_this.$A('.shaer').className = "shaer";
			}, 450);
		}, false);
		_this.$A('.poster-user-info h1 img').addEventListener('touchstart', function(e) {
			e.stopPropagation();
		}, false);

		_this.$A('.poster-user-info h2 a').addEventListener('touchstart', function(e) {
			e.stopPropagation();
		}, false);

		_this.$A('.poster-user-info h4 a').addEventListener('touchstart', function(e) {
			e.stopPropagation();
			joininPA();
		}, false);
	},
	posterSlide: function() {
		_this = this;

		var startX = 0;
		var moveX = 0;
		var isSlide = true;
		var points = this.$All(".endPage .job-points li");
		var posterContainer = this.$A(".poster-container");
		var n = 0;

		var w = window.innerWidth;

		posterContainer.style.width = w * points.length + "px";

		_this.$A('.endPage').addEventListener('touchstart', function(e) {
			startX = e.touches[0].clientX;

			_this.$A('.endPage').addEventListener('touchmove', function(e) {
				moveX = e.touches[0].clientX - startX;
			}, false);

			_this.$A('.endPage').addEventListener('touchend', function(e) {
				if(moveX < -150 && isSlide) {
					if(n >= points.length - 1) {
						n = points.length - 1;
					} else {
						n++;
					}
				}
				if(moveX > 150 && isSlide) {
					if(n <= 0) {
						n = 0;
					} else {
						n--;
					}
				}

				isSlide = false;
				boxTranslateX(n);

			}, false);

		}, false);

		function boxTranslateX(t) {
			posterContainer.style.transform = "translateX(" + -w * t + "px)";

			for(var j = 0; j < points.length; j++) {
				points[j].className = "";
				if(t == j) {
					points[t].className = "active";
					n = t;
				}
				if(t != 0) {
					$('.endPage').addClass('changeColor');
				} else {
					$('.endPage').removeClass('changeColor');
				}
			}

			setTimeout(function() {
				isSlide = true;
				moveX = 0;
			}, 400);
		}
	},
	init: function() {
		this.loadAnimate();
		loadContaier();
		this.load();
		this.clickStart();
		this.userSelect();
		this.slideJobAnalysis();
		this.posterSlide();
	}
}

main.init();