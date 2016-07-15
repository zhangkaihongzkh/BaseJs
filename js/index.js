window.onload = function(){

	//个人中心
	/*$().getClassName('menber').hover(function(){
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
	$login.drag([$().getTagName('h2').getElement(0)]);*/
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
	(function(){
		window.sys = {};
		var ua = navigator.userAgent.toLowerCase();
		var s;
		(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
		(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
		(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] :
		(s = ua.match(/opera.*version\/([\d.]+)/)) ? sys.opera = s[1] :
		(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0
	})();
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