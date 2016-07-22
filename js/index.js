

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

	//遮罩画布
	var screen = $('#screen');
	
	//登录框
	var login = $('#login');
	login.center(350, 250).resize(function () {
		if (login.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .login').click(function () {
		login.center(350, 250).css('display', 'block');
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#login .close').click(function () {
		login.css('display', 'none');
		//先执行渐变动画，动画完毕后再执行关闭unlock
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//注册框
	var reg = $('#reg');
	reg.center(600, 550).resize(function () {
		if (reg.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#header .reg').click(function () {
		reg.center(600, 550).css('display', 'block');
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
	});
	$('#reg .close').click(function () {
		reg.css('display', 'none');
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
	});
	
	//拖拽
	login.drag($('#login h2').last());
	reg.drag($('#reg h2').last());
	

	//注册框校验
	//表单验证
	
	//初始化表单操作
	$('form').first().reset();
	
	//focus, blur
	//alert($('form').first().user.value);
	//$('form').form('user').value('bbb');
	
	$('form').form('user').bind('focus', function () {
		$('#reg .info_user').css('display', 'block');
		$('#reg .error_user').css('display', 'none');
		$('#reg .succ_user').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_user').css('display', 'none');
			$('#reg .error_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			$('#reg .info_user').css('display', 'none');
			$('#reg .succ_user').css('display', 'none');
		} else {
			$('#reg .succ_user').css('display', 'block');
			$('#reg .error_user').css('display', 'none');
			$('#reg .info_user').css('display', 'none');
		}
	});
	
	function check_user() {
		if (/[\w]{2,20}/.test(trim($('form').form('user').value()))) return true;
	}
	
	
	//密码验证
	$('form').form('pass').bind('focus', function () {
		$('#reg .info_pass').css('display', 'block');
		$('#reg .error_pass').css('display', 'none');
		$('#reg .succ_pass').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_pass').css('display', 'none');
		} else {
			if (check_pass()) {
				$('#reg .info_pass').css('display', 'none');
				$('#reg .error_pass').css('display', 'none');
				$('#reg .succ_pass').css('display', 'block');
			} else {
				$('#reg .info_pass').css('display', 'none');
				$('#reg .error_pass').css('display', 'block');
				$('#reg .succ_pass').css('display', 'none');
			}
		}
	});
	
	//密码强度验证
	$('form').form('pass').bind('keyup', function () {
		check_pass();
	});
	
	//密码验证函数
	function check_pass() {
		var value = trim($('form').form('pass').value());
		var value_length = value.length;
		var code_length = 0;
		
		//第一个必须条件的验证6-20位之间
		if (value_length >= 6 && value_length <= 20) {
			$('#reg .info_pass .q1').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q1').html('○').css('color', '#666');
		}
		
		//第二个必须条件的验证，字母或数字或非空字符，任意一个即可
		if (value_length > 0 && !/\s/.test(value)) {
			$('#reg .info_pass .q2').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q2').html('○').css('color', '#666');
		}
		
		//第三个必须条件的验证，大写字母，小写字母，数字，非空字符 任意两种混拼即可
		if (/[\d]/.test(value)) {
			code_length++;
		}
		
		if (/[a-z]/.test(value)) {
			code_length++;
		}
		
		if (/[A-Z]/.test(value)) {
			code_length++;
		}
		
		if (/[^\w]/.test(value)) {
			code_length++;
		}
		
		if (code_length >= 2) {
			$('#reg .info_pass .q3').html('●').css('color', 'green');
		} else {
			$('#reg .info_pass .q3').html('○').css('color', '#666');
		}
		
		//安全级别
		if (value_length >= 10 && code_length >= 3) {
			$('#reg .info_pass .s1').css('color', 'green');
			$('#reg .info_pass .s2').css('color', 'green');
			$('#reg .info_pass .s3').css('color', 'green');
			$('#reg .info_pass .s4').html('高').css('color', 'green');
		} else if (value_length >= 8 && code_length >= 2) {
			$('#reg .info_pass .s1').css('color', '#f60');
			$('#reg .info_pass .s2').css('color', '#f60');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('中').css('color', '#f60');
		} else if (value_length >= 1) {
			$('#reg .info_pass .s1').css('color', 'maroon');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html('低').css('color', 'maroon');
		} else {
			$('#reg .info_pass .s1').css('color', '#ccc');
			$('#reg .info_pass .s2').css('color', '#ccc');
			$('#reg .info_pass .s3').css('color', '#ccc');
			$('#reg .info_pass .s4').html(' ');
		}	
		
		if (value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2) {
			return true;
		} else {
			return false;
		}
	}
	
	
	//密码确认
	$('form').form('notpass').bind('focus', function () {
		$('#reg .info_notpass').css('display', 'block');
		$('#reg .error_notpass').css('display', 'none');
		$('#reg .succ_notpass').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_notpass').css('display', 'none');
		} else if (check_notpass()){
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'none');
			$('#reg .succ_notpass').css('display', 'block');
		} else {
			$('#reg .info_notpass').css('display', 'none');
			$('#reg .error_notpass').css('display', 'block');
			$('#reg .succ_notpass').css('display', 'none');
		}
	});
	
	function check_notpass() {
		if (trim($('form').form('notpass').value()) == trim($('form').form('pass').value())) return true;
	}
	
	//提问
	$('form').form('ques').bind('change', function () {
		if (check_ques()) $('#reg .error_ques').css('display', 'none');
	});
	
	function check_ques() {
		if ($('form').form('ques').value() != 0) return true;
	}
	
	//回答
	$('form').form('ans').bind('focus', function () {
		$('#reg .info_ans').css('display', 'block');
		$('#reg .error_ans').css('display', 'none');
		$('#reg .succ_ans').css('display', 'none');
	}).bind('blur', function () {
		if (trim($(this).value()) == '') {
			$('#reg .info_ans').css('display', 'none');
		} else if (check_ans()) {
			$('#reg .info_ans').css('display', 'none');
			$('#reg .error_ans').css('display', 'none');
			$('#reg .succ_ans').css('display', 'block');
		} else {
			$('#reg .info_ans').css('display', 'none');
			$('#reg .error_ans').css('display', 'block');
			$('#reg .succ_ans').css('display', 'none');
		}
	});
	
	function check_ans() {
		if (trim($('form').form('ans').value()).length >= 2 && trim($('form').form('ans').value()).length <= 32) return true;
	}
	
	//电子邮件
	$('form').form('email').bind('focus', function () {
	
		//补全界面
		if ($(this).value().indexOf('@') == -1) $('#reg .all_email').css('display', 'block');
	
		$('#reg .info_email').css('display', 'block');
		$('#reg .error_email').css('display', 'none');
		$('#reg .succ_email').css('display', 'none');
	}).bind('blur', function () {
	
		//补全界面
		$('#reg .all_email').css('display', 'none');
	
		if (trim($(this).value()) == '') {
			$('#reg .info_email').css('display', 'none');
		} else if (check_email()) {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'none');
			$('#reg .succ_email').css('display', 'block');
		} else {
			$('#reg .info_email').css('display', 'none');
			$('#reg .error_email').css('display', 'block');
			$('#reg .succ_email').css('display', 'none');
		}
	});
	
	function check_email() {
		if (/^[\w\-\.]+@[\w\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) return true;
	}
	
	
	//电子邮件补全系统键入
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
				this.index++;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		
		if (event.keyCode == 38) {
			if (this.index == undefined || this.index <= 0) {
				this.index = $('#reg .all_email li').length() - 1;
			} else {
				this.index--;
			}
			$('#reg .all_email li').eq(this.index).css('background', '#e5edf2');
			$('#reg .all_email li').eq(this.index).css('color', '#369');
		}
		
		
		if (event.keyCode == 13) {
			$(this).value($('#reg .all_email li').eq(this.index).text());
			$('#reg .all_email').css('display', 'none');
			this.index = undefined;
		}
		
	});
	
	//电子邮件补全系统点击获取
	$('#reg .all_email li').bind('mousedown', function () {
		$('form').form('email').value($(this).text());
	});
	
	//电子邮件补全系统鼠标移入移出效果
	$('#reg .all_email li').hover(function () {
		$(this).css('background', '#e5edf2');
		$(this).css('color', '#369');
	}, function () {
		$(this).css('background', 'none');
		$(this).css('color', '#666');
	});
	
	
	//年月日
	var year = $('form').form('year');
	var month = $('form').form('month');
	var day = $('form').form('day');
	
	var day30 = [4, 6, 9, 11];
	var day31 = [1, 3, 5, 7, 8, 10, 12];
	
	//注入年
	for (var i = 1950; i <= 2016; i ++) {
		year.first().add(new Option(i, i), undefined);
	}
	
	//注入月
	for (var i = 1; i <= 12; i ++) {
		month.first().add(new Option(i, i), undefined);
	}
	
	
	year.bind('change', select_day);
	month.bind('change', select_day);
	day.bind('change', function () {
		if (check_birthday()) $('#reg .error_birthday').css('display', 'none');
	});
	
	function check_birthday() {
		if (year.value() != 0 && month.value() != 0 && day.value() != 0) return true;
	}
	
	function select_day() {
		if (year.value() != 0 && month.value() != 0) {
			
			//清理之前的注入
			day.first().options.length = 1;
			
			//不确定的日
			var cur_day = 0;
			
			//注入日
			if (inArray(day31, parseInt(month.value()))) {
				cur_day = 31;
			} else if (inArray(day30, parseInt(month.value()))) {
				cur_day = 30;
			} else {
				if ((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0) {
					cur_day = 29;
				} else {
					cur_day = 28;
				}
			}
			
			for (var i = 1; i <= cur_day; i ++) {
				day.first().add(new Option(i, i), undefined);
			}
			
		} else {
			//清理之前的注入
			day.first().options.length = 1;
		}
	}

	
	//备注
	$('form').form('ps').bind('keyup', check_ps).bind('paste', function () {
		//粘贴事件会在内容粘贴到文本框之前触发
		setTimeout(check_ps, 50);
	});
	
	//清尾
	$('#reg .ps .clear').click(function () {
		$('form').form('ps').value($('form').form('ps').value().substring(0,200));
		check_ps();
	});
	
	function check_ps() {
		var num = 200 - $('form').form('ps').value().length;
		if (num >= 0) {
			$('#reg .ps').eq(0).css('display', 'block');
			$('#reg .ps .num').eq(0).html(num);
			$('#reg .ps').eq(1).css('display', 'none');
			return true;
		} else {
			$('#reg .ps').eq(0).css('display', 'none');
			$('#reg .ps .num').eq(1).html(Math.abs(num)).css('color', 'red');
			$('#reg .ps').eq(1).css('display', 'block');
			return false;
		}
	}
	
	//提交
	$('form').form('sub').click(function () {
		var flag = true;
	
		if (!check_user()) {
			$('#reg .error_user').css('display', 'block');
			flag = false;
		}
		
		if (!check_pass()) {
			$('#reg .error_pass').css('display', 'block');
			flag = false;
		}
		
		if (!check_notpass()) {
			$('#reg .error_notpass').css('display', 'block');
			flag = false;
		}
		
		if (!check_ques()) {
			$('#reg .error_ques').css('display', 'block');
			flag = false;
		}
		
		if (!check_ans()) {
			$('#reg .error_ans').css('display', 'block');
			flag = false;
		}
		
		if (!check_email()) {
			$('#reg .error_email').css('display', 'block');
			flag = false;
		}
		
		if (!check_birthday()) {
			$('#reg .error_birthday').css('display', 'block');
			flag = false;
		}
		
		if (!check_ps()) {
			flag = false;
		}
	
		if (flag) {
			$('form').first().submit();
		}
	});
	


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

	//轮播器初始化
	//$('#banner img').css('display', 'none');
	//$('#banner img').eq(0).css('display', 'block');
	$('#banner img').opacity(0);
	$('#banner img').eq(0).opacity(100);
	$('#banner ul li').eq(0).css('color', '#333');
	$('#banner strong').html($('#banner img').eq(0).attr('alt'));
	
	//轮播器计数器
	var banner_index = 1;
	
	//轮播器的种类
	var banner_type = 1; 		//1表示透明度，2表示上下滚动
	
	//自动轮播器
	var banner_timer = setInterval(banner_fn, 3000);
	
	//手动轮播器
	$('#banner ul li').hover(function () {
		clearInterval(banner_timer);
		if ($(this).css('color') != 'rgb(51, 51, 51)' && $(this).css('color') != '#333') {
			banner(this, banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		}
	}, function () {
		banner_index = $(this).index() + 1;
		banner_timer = setInterval(banner_fn, 3000);
	});
	
	function banner(obj, prev) {
		$('#banner ul li').css('color', '#999');
		$(obj).css('color', '#333');
		$('#banner strong').html($('#banner img').eq($(obj).index()).attr('alt'));
		
		if (banner_type == 1) {
			$('#banner img').eq(prev).animate({
				attr : 'o',
				target : 0,
				t : 30,
				step : 10
			}).css('zIndex', 1);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('zIndex', 2);
		} else if (banner_type == 2) {
			$('#banner img').eq(prev).animate({
				attr : 'y',
				target : 150,
				t : 30,
				step : 10
			}).css('zIndex', 1).opacity(100);
			$('#banner img').eq($(obj).index()).animate({
				attr : 'y',
				target : 0,
				t : 30,
				step : 10
			}).css('top', '-150px').css('zIndex', 2).opacity(100);
		}
		
	}
	
	function banner_fn() {
		if (banner_index >= $('#banner ul li').length()) banner_index = 0;
		banner($('#banner ul li').eq(banner_index).first(), banner_index == 0 ? $('#banner ul li').length() - 1 : banner_index - 1);
		banner_index++;
	}

//问题1：将xsrc地址替换到src中去
	//当图片进入到可见区域的时候，将图片的xsrc的地址替换到src即可
	//alert($('.wait_load').eq(0).attr('xsrc'));
	//$('.wait_load').eq(0).attr('src', $('.wait_load').eq(0).attr('xsrc'));
	
	
	//问题2：获取图片元素到最外层顶点元素的距离
	//alert(offsetTop($('.wait_load').first()));
	
	//问题3：获取页面可视区域的最低点的位置
	//alert(getInner().height + getScroll().top);
	
	var wait_load = $('.wait_load');
	wait_load.opacity(0);
	$(window).bind('scroll', _wait_load);
	$(window).bind('resize', _wait_load);
	
	function _wait_load() {
		setTimeout(function () {
			for (var i = 0; i < wait_load.length(); i ++) {
				var _this = wait_load.ge(i);
				if (getInner().height + getScroll().top >= offsetTop(_this)) {
					$(_this).attr('src', $(_this).attr('xsrc')).animate({
						attr : 'o',
						target : 100,
						t : 30,
						step : 10
					});
				}
			}
		}, 100);
	}
	
	
	//图片弹窗
	var photo_big = $('#photo_big');
	photo_big.center(620, 511).resize(function () {
		if (reg.css('display') == 'block') {
			screen.lock();
		}
	});
	$('#photo dl dt img').click(function () {
		photo_big.center(620, 511).css('display', 'block');
		screen.lock().animate({
			attr : 'o',
			target : 30,
			t : 30,
			step : 10
		});
		
		var temp_img = new Image();

		$(temp_img).bind('load', function () {
			$('#photo_big .big img').attr('src', temp_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
		});
		
		temp_img.src = $(this).attr('bigsrc');
		
		var children = this.parentNode.parentNode;
		
		prev_next_img(children);

	});
	$('#photo_big .close').click(function () {
		photo_big.css('display', 'none');
		screen.animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10,
			fn : function () {
				screen.unlock();
			}
		});
		
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	});
	
	//拖拽
	photo_big.drag($('#photo_big h2').last());
	
	/*
	//图片加载
	$('#photo_big .big img').attr('src', 'http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg').animate({
		attr : 'o',
		target : 100,
		t : 30,
		step : 10
	}).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
	
	//问题1，loading的样式被大图的高和宽改变了
	//问题2，动画的渐变效果没有出现

	
	//创建一个临时的图片对象，用以保存图片
	//alert($('#photo_big .big img').first());
	//alert(new Image());
	
	var temp_img = new Image();			//创建一个临时区域的图片对象

	$(temp_img).bind('load', function () {
		$('#photo_big .big img').attr('src', temp_img.src).animate({
			attr : 'o',
			target : 100,
			t : 30,
			step : 10
		}).css('width', '600px').css('height', '450px').css('top', 0).opacity(0);
	});
	
	//IE必须把src这个属性放在load事件的下面才有效
	temp_img.src = 'http://pic2.desk.chinaz.com/file/201212/6/yidaizongshi6.jpg';  //src属性可以在后台加载这张图片到本地缓存
	*/
	
	
	//图片鼠标划过
	$('#photo_big .big .left').hover(function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sl').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});
	
	//图片鼠标划过
	$('#photo_big .big .right').hover(function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 50,
			t : 30,
			step : 10
		});		
	}, function () {
		$('#photo_big .big .sr').animate({
			attr : 'o',
			target : 0,
			t : 30,
			step : 10
		});
	});
	
	
	//图片上一张 
	$('#photo_big .big .left').click(function () {
	
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	
		var current_img = new Image();
	
		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});

		current_img.src = $(this).attr('src');
		
		var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
		
		prev_next_img(children);

		
	});
	
	
	//图片下一张
	$('#photo_big .big .right').click(function () {
	
		$('#photo_big .big img').attr('src', 'images/loading.gif').css('width', '32px').css('height', '32px').css('top', '190px');
	
		var current_img = new Image();
	
		$(current_img).bind('load', function () {
			$('#photo_big .big img').attr('src', current_img.src).animate({
				attr : 'o',
				target : 100,
				t : 30,
				step : 10
			}).opacity(0).css('width', '600px').css('height', '450px').css('top', 0);
		});

		current_img.src = $(this).attr('src');
		
		var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'), $('#photo').first())).parentNode.parentNode;
		
		prev_next_img(children);

		
	});
	
	function prev_next_img(children) {
		var prev = prevIndex($(children).index(), children.parentNode);
		var next = nextIndex($(children).index(), children.parentNode);
		
		var prev_img = new Image();
		var next_img = new Image();
		
		prev_img.src = $('#photo dl dt img').eq(prev).attr('bigsrc');
		next_img.src = $('#photo dl dt img').eq(next).attr('bigsrc');
		$('#photo_big .big .left').attr('src', prev_img.src);
		$('#photo_big .big .right').attr('src', next_img.src);
		$('#photo_big .big img').attr('index', $(children).index());
		$('#photo_big .big .index').html(parseInt($(children).index()) + 1 + '/' + $('#photo dl dt img').length());
	}




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
