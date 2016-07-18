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
	$('#header .login').click(function(){
		$login.center(350,250).css('display','block');
		$('#screen').lock();
		$('#screen').animate({
			attr:'o',
			target:30,
			step:10,
			t:30
		});
	});
	$('#login .close').click(function(){
		$login.css('display','none');
		$('#screen').animate({
			attr:'o',
			target:0,
			step:10,
			t:30,
			fn:function(){
				$screen.unlock();
			}		
		});
	});

	//测试
	$('#test').click(function(){
		var _this = this;
		$(_this).animate({
			/*attr:'w',
			target:200,
			step:10,
			t:30,
			fn:function(){
				$(_this).animate({
					attr:'h',
					target:200,
					step:10,
					t:30,
					fn:function(){
						$(_this).animate({
							attr:'o',
							target:30,
							step:10,
							t:30
						})
					}
				})
			}	*/
			attr:'o',
			target:30,
			step:10,
			t:30
		});
	});

	//拖拽
	$login.drag($('#login h2').first(),$('#login .other').first());

	//百度分享初始位置
	$('#share').css('top', (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
	+ 'px');

	//百度分享收缩功能
	$('#share').hover(function(){
		$(this).animate({
			'attr':'x',
			'target':0
		});
	},function(){
		$(this).animate({
			'attr':'x',
			'target':-210
		});
	});
});
