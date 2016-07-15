/*window.onload = function(){

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
	$login.drag([$().getTagName('h2').getElement(0)]);
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
	/*$().getClassName('box1').css('backgroundColor','red');
	$("#box2").css('backgroundColor','green').click(function(){
		alert($(this).html());
	});

	$("p").find('span').css('color','red');
	$("div").find('span').css('color','blue');*/
	/*$('p').find('.a').css('color','red');*/
	/*$('p').find('span').css('color','red');*/
	/*$('p .a').css('color','red');*/

	//浏览器检测
//}; */

/*$(function(){
	alert(document.body);
});*/

$(function(){
	//个人中心
	$('.menber').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$('.menber_ul').show();
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$('.menber_ul').hide();
	});

	//登陆框
	var $login = $('#login');
	var $screen = $('#screen');
	$login.center(350,250).resize(function(){
		if($login.css('display') == 'block'){
			$('#screen').lock();
		}
	});
	$('.login').click(function(){
		$login.center(350,250)
		$login.css('display','block');
		$('#screen').lock();
	});
	$('.close').click(function(){
		$login.css('display','none');
		$('#screen').unlock();
	});

	//拖拽
	$login.drag($('h2').ge(0),$('.other').ge(0));
});
