// JavaScript Document

//jQuery("#slideBox").slide({
//	mainCell: ".bd ul",
//	autoPlay: true,
//	easing: "swing",
//	delayTime: 1500,
//	effect: "fold"
//	
//});
//
jQuery("#slideBox").slide({

	mainCell: ".bd ul",
	effect: "leftLoop",
	vis: "auto",
	delayTime: 1000,
	autoPlay: true,
	autoPage: false
});

//
//$(".slideBox2").slide({
//	mainCell: ".bd ul",
//	mouseOverStop: true,
//	easing: "swing",
//	delayTime: 1000,
//	effect: "leftLoop",
//	autoPlay: false,
//});
//
//$(".txtScroll-top").slide({
//	titCell: ".hd ul",
//	mainCell: ".bd ul",
//	autoPage: true,
//	effect: "top",
//	autoPlay: false,
//	scroll: 4,
//	vis: 4
//});
//
//$('.txtScroll-top .infoList li').mouseover(function() {
//	$(this).addClass('add-blue');
//})
//$('.txtScroll-top .infoList li').mouseleave(function() {
//	$(this).removeClass('add-blue');
//})
//
//$('.pro-chosse-ul ul li').click(function() {
//	$(this).addClass('add-sp').siblings().removeClass('add-sp');
//})
//
//$('.slideBox2 .bd li dl dt').mouseover(function() {
//	$(this).addClass('sp-bg-show');
//})
//$('.slideBox2 .bd li dl dt').mouseleave(function() {
//	$(this).removeClass('sp-bg-show');
//})
//
//$('.my-service-ul ul li').mouseover(function() {
//	$(this).addClass('add-ul-bg');
//})
//
//$('.my-service-ul ul li').mouseleave(function() {
//	$(this).removeClass('add-ul-bg');
//})
//
///***********解决placeholder的问题*******************/
//$(function() {
//	if (!placeholderSupport()) {
//		$('.email-input').focus(function() {
//			var input = $(this);
//			if (input.val() == input.attr('placeholder')) {
//				input.val('');
//				input.removeClass('placeholder');
//			}
//		}).blur(function() {
//			var input = $(this);
//			if (input.val() == '' || input.val() == input.attr('placeholder')) {
//				input.addClass('placeholder');
//				input.val(input.attr('placeholder'));
//			}
//		}).blur();
//	};
//})
//
//function placeholderSupport() {
//	return 'placeholder' in document.createElement('input');
//}
/***********解决placeholder的问题*******************/
//
////返回顶部效果
//jQuery(window).scroll(function() {
//
//	/*if(jQuery(document).scrollTop()>600){
//	    jQuery('.kefu-online').fadeIn();
//
//	}
//	else{
//	    jQuery('.kefu-online').fadeOut();
//	}*/
//	var Fs = jQuery(".footer").offset().top;
//
//	if ((Fs + 100) < (jQuery(window).scrollTop() + jQuery(window).height())) {
//		var topH = (jQuery(window).scrollTop() + jQuery(window).height()) - (Fs + 100);
//		topHs = (topH + 100) + "px";
//		jQuery(".kefu-online").addClass("gostop")
//
//	} else {
//		jQuery(".kefu-online").removeClass("gostop")
//	}
//});