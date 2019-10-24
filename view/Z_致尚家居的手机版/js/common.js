var bBtn = true;
$('.search').on('click', function() {
	if (bBtn) {
		$('.search-box').show();
		$('.search-box').animate({
			left: 0
		});
	} else {
		$('.search-box').animate({
			left: -100 + '%'
		}, function() {
			$(this).hide();
		});
	}
	bBtn = !bBtn;
});

$('.search_btn').on('click', function() {
	alert('search');
})

$('.nav').on('click', function() {
	bBtn = !bBtn;
	$('.search-box').animate({
		left: -100 + '%'
	}, function() {
		$(this).hide();
	});
	$('.header').animate({
		marginLeft: 100 + '%'
	});
	$('.nav-box').animate({
		left: 0
	});
	$("body").height($(window).height()).css({
		"overflow-y": "hidden"
	});
})
$('.close-btn').on('click', function() {

	$('.header').animate({
		marginLeft: 0
	})
	$('.nav-box').animate({
		left: -100 + '%'
	})
	$("body").height($(window).height()).css({
		"overflow-y": "auto"
	});
})

function playVideo(id) {
	var myVideo = document.getElementById(id);
	myVideo.onclick = function() {
		if (myVideo.paused) {
			myVideo.play();
			myVideo.controls = true;
		} else {
			myVideo.pause();
		}
	}
}

//分页按钮
var liHeight = $('.c-lists ul li').height();
var aLi = $('.c-lists ul li').length - 1;
var num = 0;
$('.b-next').on('click', function() {
	if (num >= aLi) {
		num = aLi;
	} else {
		num++;
	}
	$('.c-lists ul').animate({
		top: -num * liHeight + 'px'
	})
})
$('.b-prev').on('click', function() {
	if (num <= 0) {
		num = 0;
	} else {
		num--;
	}
	$('.c-lists ul').animate({
		top: -num * liHeight + 'px'
	})
})

//我们的团队
var tli = $('.o-ul li');
for (var i = 0; i < tli.length; i++) {
	if (i % 2 == 0) {
		$(tli[i]).css({
			paddingRight: 8 + 'px'
		});
	} else {
		$(tli[i]).css({
			paddingLeft: 8 + 'px'
		});
	}
}

//左侧导航适配
var wHeight = $(window).height();

if (wHeight <= 480) {
	$('.nav-container ul li').css({
		height: 12 + '%',
		lineHeight: 300 + '%'
	});
} else if (wHeight <= 650) {
	$('.nav-container ul li').css({
		height: 14 + '%',
		lineHeight: 400 + '%'
	});
}

//点赞
var like = $('.like-img');
var likenum = $('.like-num');
for (var i = 0; i < like.length; i++) {
	like[i].index = i;
	$(like[i]).on('click', function() {
		var index = this.index;
		var text = parseInt($(likenum[index]).html());
		if ($(like[index]).is('.onlike')) {
			//			$(likenum[index]).html(text-1);
			//			$(like[index]).removeClass('onlike');
			//			$(like[index]).children('img').attr('src','../images/like.png');
			var onLike = $('.onlike');
			var oI = document.createElement('i');
			oI.innerHTML = '您已经点过赞了！';
			$(like[index]).append(oI);
			setTimeout(function() {
				$(like[index]).children('i').remove();
			}, 1000);
		} else {
			$(likenum[index]).html(text + 1);
			$(like[index]).addClass('onlike');
			$(like[index]).children('img').attr('src', '../images/onlike.png');
		}
	});

}

//提示弹窗

$('.toolTip-container').on('click', function() {
	$('.toolTip-container').hide();
});
$('.toolTip-box').on('click', function(e) {
	e = window.event || e;
	if (e.stopPropagation) {
		e.stopPropagation();
	} else {
		e.cancelBubble = true;
	}

});
$('.toolTip-close').on('click', function(e) {
	$('.toolTip-container').hide();
});