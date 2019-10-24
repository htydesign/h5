// JavaScript Document

$('.navigation ul li').mouseover(function(){
	$(this).addClass('add-border');
})
$('.navigation ul li').hover(function(){
	$(this).addClass('add-color2').siblings().removeClass('add-color2');
})

$('.navigation ul li').mouseout(function(){
	$(this).removeClass('add-border');
})

$('.nav-bottom-inner dl dt').mouseover(function(){
	$(this).addClass('add-border2');
})

$('.nav-bottom-inner dl dt').mouseout(function(){
	$(this).removeClass('add-border2');
})