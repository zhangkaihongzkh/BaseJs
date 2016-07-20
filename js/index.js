

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

	//注册框校验
	//用户名校验
	$('form').form('user').bind('focus', function () {
		$('#reg .info_user').css('display', 'block');
		$('#reg .error_user').css('display', 'none');
		$('#reg .succ_user').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_user').css('display', 'none');
			$('#reg .error_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else if (!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).value()))) {
			$('#reg .error_user').css('display', 'block');
			$('#reg .info_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else {
			$('#reg .succ_user').css('display', 'block');
			$('#reg .error_user').css('display', 'none');
			$('#reg .info_user').css('display', 'none');
		}
	});
	//密码校验
	$('form').form('pass').bind('focus', function () {
		$('#reg .info_pass').css('display', 'block');
		$('#reg .error_pass').css('display', 'none');
		$('#reg .succ_pass').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_pass').css('display', 'none');
			$('#reg .error_pass').css('display', 'none');
			$('#reg .succ_pass').css('display', 'none');
		} else if (!/[a-zA-Z0-9_]{2,20}/.test(trim($(this).value()))) {
			$('#reg .error_pass').css('display', 'block');
			$('#reg .info_pass').css('display', 'none');
			$('#reg .succ_pass').css('display', 'none');
		} else {
			$('#reg .succ_pass').css('display', 'block');
			$('#reg .error_pass').css('display', 'none');
			$('#reg .info_pass').css('display', 'none');
		}
	});
	//密码强度校验
	$('form').form('pass').bind('keyup',function(){
		check_pass(this);
	});
	//密码回答
	$('form').form('notpass').bind('focus', function () {
		$('#reg .info_notpass').css('display', 'block');
		$('#reg .error_notpass').css('display', 'none');
		$('#reg .succ_notpass').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_notpass').css('display', 'none');
		} else if (trim($('form').form('pass').value()) == trim($(this).value())) {
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'none');
			$('#reg .succ_notpass').css('display', 'block');
		} else {
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'block');
			$('#reg .succ_notpass').css('display', 'none');
		}
	});	
	//回答
	$('form').form('ans').bind('focus', function () {
		$('#reg .info_ans').css('display', 'block');
		$('#reg .error_ans').css('display', 'none');
		$('#reg .succ_ans').css('display', 'none');
	}).bind('blur', function () {
	if (trim($(this).value()) == '') {
		$('#reg .info_ans').css('display', 'none');
	} else if (trim($(this).value()).length >= 2 && trim($(this).value()).length <= 32) {
		$('#reg .info_ans').css('display', 'none');
		$('#reg .error_ans').css('display', 'none');
		$('#reg .succ_ans').css('display', 'block');
	} else {
		$('#reg .info_ans').css('display', 'none');
		$('#reg .error_ans').css('display', 'block');
		$('#reg .succ_ans').css('display', 'none');
	}
	});
	//电子邮件
	$('form').form('email').bind('focus', function () {
		$('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
	}).bind('blur', function () {
	if (trim($(this).value()) == '') {
		$('#reg .info_email').css('display', 'none');
	} else if (/^[\w-\.]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($(this).value()))) {
		$('#reg .info_email').css('display', 'none');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'block');
	} else {
		$('#reg .info_email').css('display', 'none');
		$('#reg .error_email').css('display', 'block');
		$('#reg .succ_email').css('display', 'none');
	}
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

/*	$('#btn').bind('click',function(){
		alert("");
	});*/
/*	$('form').form('user').bind('focus',function(){
		alert($(this).value());
	});*/

	
});
