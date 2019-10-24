//设置 高度
function setHight() {
	var proli = $('.sub_pro_title li');
	$('.sub_pro_title').css({
		width: proli.length * (proli.width() + 20) + 'px'
	});
}
$(window).load(function() {
	setHight();
});
//导航产品中心
$(window).ready(function() {
	$(window).resize(function() {
		setHight();
	});
	setHight();
	
	var proli = $('.sub_pro_title li');
	proli.on('hover', function() {
		$('.sub_pro_title li').eq($(this).index()).addClass('subActive').siblings().removeClass('subActive');
		$('.small_img').eq($(this).index()).addClass('pro_show').siblings().removeClass('pro_show');
	});
});