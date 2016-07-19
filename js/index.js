

$(function(){
	//个人中心
	$('.menber').hover(function(){
		$(this).css('background','url(images/arrow2.png) no-repeat 55px center');
		$('.menber_ul').show();
		$('.menber_ul').animate({
			attr:'o',
			target:'100',
			step:10,
			t:30
		});
	},function(){
		$(this).css('background','url(images/arrow.png) no-repeat 55px center');
		$('.menber_ul').animate({
			attr:'o',
			target:'0',
			step:10,
			t:30,
			fn:function(){
				$('.menber_ul').hide();
			}
		});
	});

	//登陆框
	var $login = $('#login');
	var $screen = $('#screen');
	$login.center(350,250).resize(function(){
		if($login.css('display') == 'block'){
			$('#screen').animate({
				attr:'o',
				target:'0',
				step:10,
				t:30,
				fn:function(){
					$('#screen').lock();
				}
			});
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

	//注册框
	var $reg = $('#reg');
	$reg.center(600,550).resize(function(){
		if($reg.css('display') == 'block'){
			$screen.lock();
		}
	});
	$('#header .reg').click(function(){
		$reg.center(600,550).css('display','block');
		$('#screen').lock();
		$('#screen').animate({
			attr:'o',
			target:30,
			step:10,
			t:30
		});
	});
	$('#reg .close').click(function(){
		$reg.css('display','none');
		$screen.animate({
			attr:'o',
			target:0,
			step:10,
			t:30,
			fn:function(){
				$screen.unlock();
			}		
		});
	});

	
	//拖拽
	$login.drag($('#login h2').first());
	$reg.drag($('#reg h2').last());

	//滑动导航栏
	$('#nav .about li').hover(function () {
		var target = $(this).first().offsetLeft;
		$('#nav .nav_bg').animate({
			attr : 'x',
			target : target + 20,
			t : 30,
			step : 30,
			fn : function () {
				$('#nav .white').animate({
					attr : 'x',
					target : -target
				});
			}
		});
	}, function () {
		$('#nav .nav_bg').animate({
			attr : 'x',
			target : 20,
			t : 30,
			step : 30,
			fn : function () {
				$('#nav .white').animate({
					attr : 'x',
					target : 0
				});
			}
		});
	});

	//百度分享初始位置
	$('#share').css('top', (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2 + 'px');
	//随滚轮改变保持中央
	addEvent(window,'scroll',function(){
	/*	console.log(document.body.scrollTop);*/
		$('#share').animate({
			attr:'y',
			target:getScroll().top + (getInner().height - parseInt(getStyle($('#share').first(), 'height'))) / 2
		});
	});

	//百度分享收缩功能
	$('#share').hover(function(){
		$(this).animate({
			step:100,
			t:10,
			attr:'x',
			target:0
		});
	},function(){
		$(this).animate({
			step:100,
			t:10,
			attr:'x',
			target:-210
		});
	});

	//左侧信息菜单
	$('#sidebar h2').toggle(function(){
		$(this).next().animate({
			step:50,
			t:10,
			attr:'h',
			target:0
		});
	},function(){
		$(this).next().animate({
			step:50,
			t:10,
			attr:'h',
			target:150
		});
	});


	//测试
	$('#btn').toggle(function(){
		$('#test').css('backgroundColor','green');
	},function(){
		$('#test').css('backgroundColor','red');
	});

	console.log($('#test').next());
	
});
