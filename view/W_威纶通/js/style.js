//banner

//设置导航切换
function setNav() {
	var timer = null;
	$('.nav-li').hover(
		function() {
			clearTimeout(timer);
			$('.sub-bg').css({
				display: 'block'
			});
			$('.sub-nav').hide().eq($(this).index() - 1).show();
			$('.nav-li').eq($(this).index() - 1).addClass('nav-active').siblings().removeClass('nav-active');
		},
		function() {
			var index = $(this).index() - 1;
			timer = setTimeout(function() {
				$('.sub-bg').css({
					display: 'none'
				});
				$('.nav-li').eq(index).removeClass('nav-active');
				$('.sub-nav').eq(index).hide();
			}, 300);
		});
	$('.sub-nav').hover(function() {
			clearTimeout(timer);
			$('.sub-bg').css({
				display: 'block'
			});
			$('.nav-li').eq($(this).index()).addClass('nav-active').siblings().removeClass('nav-active');
		},
		function() {
			var index = $(this).index();
			timer = setTimeout(function() {
				$('.sub-bg').css({
					display: 'none'
				});
				$('.nav-li').eq(index).removeClass('nav-active');
				$('.sub-nav').eq(index).hide();
			}, 300);
		});

}

//首页我们的产品tab切换
function setIndexTab() {
	$('.us-tab ul li').click(function() {
		$(".us-tab ul li").eq($(this).index()).addClass("us-tab-active").siblings().removeClass("us-tab-active");
		$('.us-text').eq($(this).index()).addClass("us-text-active").siblings().removeClass("us-text-active");
		$('.us-img').eq($(this).index()).addClass("us-img-active").siblings().removeClass("us-img-active");
		$('.us-slider').eq($(this).index()).addClass("us-slider-active").siblings().removeClass("us-slider-active");
	});
}
//导航顶部搜索
function setTopsearch() {
	var bBtn = true;
	$('.search-topimg').click(function(event) {
		if (bBtn) {
			$('.search form').addClass('search_on');
			$('.search-bg p').css({
				display: 'none'
			});
		} else {
			$('.search form').removeClass('search_on');
			$('.search-bg p').css({
				display: 'inline-block'
			});
		}
		bBtn = !bBtn;
	});
}

//设置产品系列触摸屏系列UL的宽度
function setProUlWidth() {
	var oPro_ul = document.getElementById('pro_ul');
	var aUlLi = oPro_ul.getElementsByTagName('li');
	oPro_ul.style.width = (aUlLi[0].offsetWidth + 15) * 3 + 'px';
}

//设置产品系列筛选结果result_ul的宽度和变频器页面UL宽度
function setProResultUlWidth() {
	var oResult_ul = document.getElementById('result_ul');
	var aUlLi = oResult_ul.getElementsByTagName('li');
	oResult_ul.style.width = (aUlLi[0].offsetWidth + 22) * 4 + 'px';
}

//page_ulwidth
function setPageUlWidth() {
	var oPage_ulwidth = document.getElementById('page_ulwidth');
	var aUlLi = oPage_ulwidth.getElementsByTagName('li');
	oPage_ulwidth.style.width = (aUlLi[0].offsetWidth + 20) * 5 + 'px';
}

//solution_ul
function setSolutionUlWidth() {
	var oSolution_ulwidth = document.getElementById('solution_ul');
	var aUlLi = oSolution_ulwidth.getElementsByTagName('li');
	oSolution_ulwidth.style.width = (aUlLi[0].offsetWidth + 30) * 3 + 'px';
}

//服务品牌项目优势 Advantage
function setAdvantageUlWidth() {
	var oAdvantage = document.getElementById('advantage');
	var oUl = oAdvantage.getElementsByTagName('ul')[0];
	var aUlLi = oUl.getElementsByTagName('li');
	oUl.style.width = (aUlLi[0].offsetWidth + 80) * 2 + 'px';
}
//设置视频
function setVideoPlay() {
	//视频
	var oVideoBg = document.getElementById('video_bg');
	var oVideo = document.getElementById('video');

	//点击显示视频
	$('.video_box ul li').on('click', function(event) {
		//alert(1);
		$('#video_bg').fadeIn();
		event = event ? event : window.event;
		event.cancelBubble = true;
	})

	oVideoBg.onclick = function() {
		//oVideoBg.style.display='none';
		$('#video_bg').fadeOut();
	}

	oVideo.onclick = function(event) {
		event = event ? event : window.event;
		event.cancelBubble = true;
	}

}

function setMap() {

	var aTitle = ['威纶通<br/>地址:深圳市南山区南海大道和登良路交汇处恒裕中心B座410', '威纶通<br/>地址:2', '威纶通<br/>地址:3', '威纶通<br/>地址:4'];

	var aCoord = [{
		"x": 113.931221,
		"y": 22.516683
	}, {
		"x": 113.901221,
		"y": 22.416683
	}, {
		"x": 113.431221,
		"y": 22.216683
	}, {
		"x": 113.231221,
		"y": 22.516683
	}]

	var aT = $('.a-ul li h4');

	for (var i = 0; i < aT.length; i++) {
		// 百度地图API功能
		var sContent = aTitle[0];
		var map = new BMap.Map("l-map");
		map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放22.5166830000,113.9312210000
		var point = new BMap.Point(aCoord[0].x, aCoord[0].y);
		map.centerAndZoom(point, 25);
		var infoWindow = new BMap.InfoWindow(sContent); // 创建信息窗口对象	
		map.openInfoWindow(infoWindow, point); //开启信息窗口

		aT[i].index = i;

		aT[i].onclick = function() {
			var index = this.index;
			// 百度地图API功能
			var sContent2 = aTitle[index];
			console.log(index);
			var map2 = new BMap.Map("l-map");
			map2.enableScrollWheelZoom(true);
			var point2 = new BMap.Point(aCoord[index].x, aCoord[index].y);
			map2.centerAndZoom(point2, 25);
			var infoWindow2 = new BMap.InfoWindow(sContent2); // 创建信息窗口对象	
			map2.openInfoWindow(infoWindow2, point2); //开启信息窗口
		}
	}

}

function addEvent(obj, event, fn) {
	if (window.addEventListener) {
		obj.addEventListener(event, fn, false);
	} else {
		obj.attachEvent(on + event, fn);
	}
}

function OnlinePlayVideo() {
//	console.log($(window).width());
//	
//	$(window).resize(function(){
//		console.log($(window).width());
//	});

	
	
	var oVbg = document.getElementById('video_bg');
	
	$('.v-close').click(function(){
		$('.video_bg').hide();
		$('.paly').hide();
		jwplayer("player01").setup({
			width: '1120',
			height: '600',
			autostart: false,
			assessControlBarState:false,
			controlbar:false,
			controls:false,
			allowPlaylistControl:false,
			file: file_url,
			dock: false,
			repeat: true
		});
	});
	
	function stopPropagation(e) {
		if (e.stopPropagation) {
			e.stopPropagation();
		} else {
			e.cancelBubble = true;
		}
	}
	oVbg.onclick = function(e) {
		stopPropagation(e);
		$('.video_bg').hide();
		$('.paly').hide();
		jwplayer("player01").setup({
			width: '1120',
			height: '600',
			autostart: false,
			assessControlBarState:false,
			controlbar:false,
			controls:false,
			allowPlaylistControl:false,
			file: file_url,
			dock: false,
			repeat: true
		});
		
	}
	$(".video_1").click(function(e) {
		stopPropagation(e);
	});
	
	document.onkeydown = function(e) {
		var e = event || window.event || arguments.callee.caller.arguments[0];
		if (e.keyCode == 27) {
			$('.video_bg').fadeOut(500);
			$(".video_1").fadeOut(300);
			
			jwplayer("player01").setup({
				width: '1120',
				height: '600',
				autostart: false,
				file: file_url,
				dock: false,
				repeat: true
			});
		}
	}
	var file_url = '';
	$(".training-box-img").click(function() {
		$(".video_bg").fadeIn();
		$(".video_1").fadeIn(300);
		
		file_url = $(this).attr('data-url');
		jwplayer("player01").setup({
			width: '1120',
			height: '600',
			autostart: true,
			file: file_url,
			dock: false,
			repeat: true,
			smoothing:false
		});
	});

}

function setanimate() {
	var ow = $('.year_img li').width();
	$('.year_img').css({
		width: (ow + 10) * $('.year_img li').length + 'px'
	});
	$('.year_text').css({
		width: (ow + 10) * $('.year_img li').length + 'px'
	});
	var aC = [{
		"x": 0,
		"y": 240
	}, {
		"x": 0,
		"y": 240
	}, {
		"x": 0,
		"y": 240
	}, {
		"x": 0,
		"y": 240
	}, {
		"x": 0,
		"y": 190
	}, {
		"x": 0,
		"y": 130
	}, {
		"x": 0,
		"y": 70
	}, {
		"x": 0,
		"y": 0
	}];
	var num = 0;
	var oUl = document.getElementById('year_img');
	var am = $('.img');
	var aA = am.length - aC.length;
	var oPrev = $('.year-prev');
	var oNext = $('.year-next');
	for (var i = 0; i < aC.length - 1; i++) {
		am[aA + i + 1].style.top = aC[i].y + 'px';
	}

	oPrev.on('click', function() {
		if (num >= aA + 1) {
			num = aA + 1;
			return;
		} else {
			num++;
		}
		//oUl.style.right=-num*170+'px';
		$('#year_img').animate({
			'right': -num * 170 + 'px'
		}, 100);
		$('#year_text').animate({
			'right': -num * 170 + 'px'
		}, 100);
		var aN = [];
		for (var i = 0; i < am.length; i++) {
			aN.push(am[i].offsetTop);
		}
		//console.log(aN);
		for (var i = 1; i < aN.length; i++) {
			var oldT = aN[i];
			//am[i-1].style.top=oldT+'px';
			$(am[i - 1]).animate({
				'top': oldT + 'px'
			}, 100);
		}
	});
	oNext.on('click', function() {
		if (num <= 0) {
			num = 0;
			return;
		} else {
			num--;
		}
		//oUl.style.right = -num * 170 + 'px';
		$('#year_img').animate({
			'right': -num * 170 + 'px'
		}, 100);
		$('#year_text').animate({
			'right': -num * 170 + 'px'
		}, 100);
		var aN = [];
		for (var i = 0; i < am.length; i++) {
			aN.push(am[i].offsetTop);
		}
		var aM = [];
		for (var i = 0; i < aM.length; i++) {
			aM.push(aN[aM.length - i]);
		}
		//console.log(aN);
		for (var i = 0; i < aN.length - 1; i++) {
			var oldT = aN[i];
			//am[i + 1].style.top = oldT + 'px';
			$(am[i + 1]).animate({
				'top': oldT + 'px'
			}, 100);
		}
	});
}