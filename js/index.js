

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
	//表单密码校验
	function check_pass(_this) {
		var flag = false;
		var value = trim($(_this).value());
		var value_length = value.length;
		var code_length = 0;
		if (value_length > 0 && !/\s/.test(value)) {
			$('#reg .info_pass .q2').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q2').html('○').css('color', '#666');
		}
		if (value_length >= 6 && value_length <= 20) {
			$('#reg .info_pass .q1').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q1').html('○').css('color', '#666');
		}
		if (/[0-9]/.test(value)) {
			code_length++;
		}
		if (/[a-z]/.test(value)) {
			code_length++;
		}
		if (/[A-Z]/.test(value)) {
			code_length++;
		}
		if (/[^a-zA-Z0-9]/.test(value)) {
			code_length++;
		}
		if (code_length >= 2) {
			$('#reg .info_pass .q3').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q3').html('○').css('color', '#666');
		}
		if (code_length >= 3 && value_length >= 10) {
			$('#reg .info_pass .s1').css('color', 'green');
			$('#reg .info_pass .s2').css('color', 'green');
			$('#reg .info_pass .s3').css('color', 'green');
			$('#reg .info_pass .s4').html('高').css('color', 'green');
		} else if (code_length >= 2 && value_length >= 8) {
			$('#reg .info_pass .s1').css('color', '#f60');
			$('#reg .info_pass .s2').css('color', '#f60');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('中').css('color', '#f60');
		} else if (code_length >= 1) {
			$('#reg .info_pass .s1').css('color', 'maroon');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('低').css('color', 'maroon');
		} else {
			$('#reg .info_pass .s1').css('color', '#ccc');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html(' ').css('color', '#ccc');
		}
		if (value_length >= 6 && value_length <= 20 && code_length >= 2) {
			flag = true;
		}
		return flag;
	}
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
		if ($(this).value().indexOf('@') == -1) $('#reg .all_email').css('display', 'block');
			$('#reg .info_email').css('display', 'block');
			$('#reg .error_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'none');
		}).bind('blur', function () {
			$('#reg .all_email').css('display', 'none');
			check_email();
	});
	//电子邮件选定补全
	$('#reg .all_email li').bind('mousedown', function () {
		$('form').form('email').value($(this).text());
		check_email();
	});
	//电子邮件键入补全
	$('form').form('email').bind('keyup', function (event) {
		if ($(this).value().indexOf('@') == -1) {
			$('#reg .all_email').css('display', 'block');
			$('#reg .all_email li span').html($(this).value());
		} else {
			$('#reg .all_email').css('display', 'none');
		}
		$('#reg .all_email li').css('background', 'none');
		$('#reg .all_email li').css('color', '#666');
		if (event.keyCode == 40) {
			if (this.index == undefined || this.index >= $('#reg .all_email li').length() - 1) {
				this.index = 0;
			} else {
				this.index ++;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#E5EDF2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		if (event.keyCode == 38) {
			if (this.index == undefined || this.index <= 0) {
				this.index = $('#reg .all_email li').length() -1;
			} else {
				this.index --;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#E5EDF2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		if (event.keyCode == 13) {
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').css('display', 'none');
			this.index = undefined;
		}
	});
	function check_email() {
		if (trim($('form').form('email').value()) == '') {
			$('#reg .info_email').css('display', 'none');
		} else if (/^[\w-\.]+@[\w-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'block');
		} else {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .succ_email').css('display', 'none');
		}
	}
	//电子邮件补全移入效果
	$('#reg .all_email li').hover(function () {
		$(this).css('background', '#E5EDF2');
		$(this).css('color', '#369');
	}, function () {
		$(this).css('background', 'none');
		$(this).css('color', '#666');
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
