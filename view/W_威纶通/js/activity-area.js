// JavaScript Document

$('.latest-trip-box ul li').mouseover(function(){
	$(this).addClass('trip-border');
})

$('.latest-trip-box ul li').mouseleave(function(){
	$(this).removeClass('trip-border');
})

$('.content-news ul li').mouseover(function(){
	$(this).addClass('sp-ac');
})

$('.content-news ul li').mouseleave(function(){
	$(this).removeClass('sp-ac');
})