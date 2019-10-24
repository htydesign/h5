// JavaScript Document


/***********解决placeholder的问题*******************/
	 $(function(){
		if(!placeholderSupport()){   
			$('.search-input').focus(function() {
				var input = $(this);
				if (input.val() == input.attr('placeholder')) {
					input.val('');
					input.removeClass('placeholder');
				}
			}).blur(function() {
				var input = $(this);
				if (input.val() == '' || input.val() == input.attr('placeholder')) {
					input.addClass('placeholder');
					input.val(input.attr('placeholder'));
				}
			}).blur();
		};
	});
	function placeholderSupport() {
		return 'placeholder' in document.createElement('input');
	}
/***********解决placeholder的问题*******************/

$('.content-news ul li').mouseover(function(){
	$(this).addClass('add-word');
})

$('.content-news ul li').mouseleave(function(){
	$(this).removeClass('add-word');
})

$('.pager span a').click(function(){
	$(this).addClass('active').siblings().removeClass('active');
})