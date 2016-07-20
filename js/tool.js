//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();

//DOM加载
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	}
	
	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		//无论采用哪种，基本上用不着了
		/*timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) { 	//loaded是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似于onload
				doReady();
			}
		}, 1);*/

		timer = setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		}, 1);
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}
//JS中一切皆为对象
addEvent.ID = 1;	//事件处理计数器

//跨浏览器添加事件
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){	//W3C
		obj.addEventListener(type,fn,false);
	}else {
		//模拟IE处理 解决IE事件不顺序处理
		//创建一个存放事件的哈希表
		if(!obj.events){
			obj.events = {};
		}
		//创建一个存放处理函数的数组
		if(!obj.events[type]){
			obj.events[type] = [];
			//把第一次的事件处理函数先存储到第一个位置
			if(obj['on' + type]){
				obj.events[type][0] = fn;
			}
		}else{
			//同一个函数进行屏蔽
			if(addEvent.equal(obj.events[type],fn)){
				return false;
			}
		}
		//从第二次用事件计数器来存储
		obj.events[type][addEvent.ID ++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;	
	}
}

//跨浏览器删除事件
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){	//W3C
		obj.removeEventListener(type,fn,false);
	}else {
		for(var i in obj.events[type]){
			if(obj.events[type][i] == fn){
				delete obj.events[type][i];
			}
		}
	}
}

//执行事件处理函数
addEvent.exec = function(event){
	var e = event || addEvent.fixEvent(window.event);
	var es = obj.events[e.type]
	for(var i in es){
		es[i].call(this,e);
	}
}

//同一个注册函数进行屏蔽
addEvent.equal = function(es,fn){
	for(var i in es){
		if(es[i] == fn) return true;
	}
	return false;
}

//把IE常用的Event对象配对到W3C中
addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;	//兼容IE属性
	return event;
};

//IE与W3C方法配对
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;	
};

//IE阻止冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
};


//跨浏览器获取窗口大小
function getInner(){
	if(typeof window.innerWidth != 'undefined'){//非IE
		return {
			width:window.innerWidth,
			height:window.innerHeight
		};
	}else{
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		};
	}
}

//跨浏览器获取Style
function getStyle(element,attr){
	var value;
	if(typeof window.getComputedStyle != 'undefined'){	//W3C
		value =  window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined'){	//IE
		value =  element.currentStyle[attr];
	}
	return value;
}

//获取滚动条距离顶部距离
function getScroll(){
	return {
		top:document.documentElement.scrollTop || document.body.scrollTop,
		left:document.documentElement.scrollLeft || document.body.scrollLeft
	};
}

//判断是否有相同类名
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))
};

/*//获取Event对象
function getEvent(event){
	return event || window.event;
}

//阻止默认行为
function preDef(event){
	var e = getEvent(event);
	if(typeof e.preventDefault != 'undefined'){//W3C
		e.preventDefault();
	}else{	//IE
		e.returnValue = false;
	}
}

*/


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

//跨浏览器获取 text
function getText(element, text) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}

//跨浏览器设置 text
function setText(element, text) {
	if (typeof element.textContent == 'string') {
		element.textContent = text;
	} else {
		element.innerText = text;
	}
}

//删除前后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g,'');
}

