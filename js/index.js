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
	$login.center(350,250).resize(function(){

		if($login.css('display') == 'block'){
			$().getId('screen').lock();
		}
	});
	$().getClassName('login').click(function(){
		$login.center(350,250)
		$login.css('display','block');
		$().getId('screen').lock();
	});
	$().getClassName('close').click(function(){
		$login.css('display','none');
		$().getId('screen').unlock();
	});

	//拖拽
	$login.drag([$().getTagName('h2').getElement(0),$().getTagName('span').getElement(0)]);
/*
	var oButton = document.getElementById('button');
	addEvent(oButton,'click',fn1);;
	addEvent(oButton,'click',fn2);
	addEvent(oButton,'click',fn3);
	removeEvent(oButton,'click',fn1);*/
/*	oButton.onclick = function(e){
		
	}*/

	/*alert($().getTagName('h2').getElement(0));
	alert($().getTagName('span').getElement(0));*/
}; 

function fn1(e){
	alert('1' + this.value + e.clientX);
}
function fn2(e){
	alert('2' + this.value + e.clientX);
}
function fn3(e){
	alert('3' + this.value + e.clientX);
}