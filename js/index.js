window.onload = function(){

	//个人中心
	$().getClassName('menber').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$().getClassName('menber_ul').show();
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$().getClassName('menber_ul').hide();
	});

	//登陆框
	var $login = $().getId('login');
	var $screen = $().getId('screen');
	$login.center(350,250);

	$().resize(function(){
		$login.center(350,250);
		if($login.css('display') == 'block'){
			$().getId('screen').lock();
		}
	});
	$().getClassName('login').click(function(){
		$login.css('display','block');
		$().getId('screen').lock();
	});
	$().getClassName('close').click(function(){
		$login.css('display','none');
		$().getId('screen').unlock();
	});

	//拖拽
	$login.drag();


}; 