window.onload = function(){
	$().getClassName('menber').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$().getTagName('ul').show();
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$().getTagName('ul').hide();
	});
}; 