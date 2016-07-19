
var $ = function(args){
	return new Base(args);
}
function Base(args){
	this.elements = [];	//把返回的节点对象保存在Base对象的属性数组中
	if(typeof args == 'string'){
		//CSS方法模拟查找
		if(args.indexOf(' ') != -1){	//传入参数中带有空格
			var elements = args.split(' ');	//将节点分别拆开保存 保存每一个id class 和标签
			var childElements = []			//用来保存临时节点，防止elements被覆盖
			var node = []					//用来保存父节点
			if(node.length == 0){
				node.push(document);		//如果没有前缀 则设为document
			}
			for(var i = 0;i < elements.length;i ++){
				switch(elements[i].charAt(0)){
					case '#':
						childElements = [];			//清理父节点，一遍子节点有效，父节点失效
						childElements.push(this.getId(elements[i].substring(1)));
						node = childElements;
						break;
					case '.':
						childElements = [];
						for(var j = 0; j < node.length; j ++){
							var temps = this.getClassName(elements[i].substring(1),node[j]);
							for(var k = 0; k < temps.length; k ++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
						break;
					default:
						childElements = [];	
						for(var j = 0; j < node.length; j ++){
							var temps = this.getTagName(elements[i],node[j]);
							for(var k = 0; k < temps.length; k ++){
								childElements.push(temps[k]);
							}
						}
						node = childElements;
				}
			}
			this.elements = childElements;
		}else{//find方法模拟查找
			switch(args.charAt(0)){
				case '#':
					this.elements.push(this.getId(args.substring(1)));
					break;
				case '.':
					this.elements = this.getClassName(args.substring(1));
					break;
				default:
					this.elements = this.getTagName(args);
			}
		}
	}else if(typeof args == 'object'){
		if(args != undefined){	//_this为一个对象 undefined也是一个对象，与typeof返回的带单引号的undefined不同
			this.elements[0] = args;
		}
	}else if(typeof args == 'function'){
		addDomLoaded(args);
	}

};

Base.prototype.ready = function(fn){
	addDomLoaded(fn);
};

//获取元素ID
Base.prototype.getId = function(id){
	return document.getElementById(id);
};

//获取元素标签数组
Base.prototype.getTagName = function(tag,parentNode){
	var node =null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else if(arguments.length == 1){
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i = 0;i < tags.length;i++){
		temps.push(tags[i]);
	}
	return temps;
};

//获取CLASS数组
Base.prototype.getClassName = function(className,parentNode){
	//parentNode 解决区域化的问题
	var node = null;
	var temps = []
	if(parentNode != undefined){
		node = parentNode;
	}else if(arguments.length == 1){
		node = document;
	}
	//先获取到所有节点 再循环逐一比较
	var all = node.getElementsByTagName('*');
	for(var i = 0;i < all.length; i ++){
		if(all[i].className == className){
			temps.push(all[i]);
		}
	}
	return temps;
};

//添加className操作
Base.prototype.addClass = function(className){
	for(var i = 0;i < this.elements.length;i ++){
		//用于判断类名是否重复
		if(!hasClass(this.elements[i],className)){
			this.elements[i].className += ' ' + className;
		}
	}
	return this;
};

//移除className操作
Base.prototype.removeClass = function(className){
	for(var i = 0;i < this.elements.length;i ++){
		if(hasClass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)'+className+'(\\s|$)'),'');
		}
	}
	return this;
}

//获取到节点数组某一个节点，并返回这个节点
Base.prototype.ge = function(num){
	return this.elements[num];
};

//获取节点数组第一个节点 并返回节点对象
Base.prototype.first = function(){
	return this.elements[0];
}

//获取节点数组最后一个节点，并返回节点对象
Base.prototype.last = function(){
	return this.elements[this.elements.length - 1];
}

//获取到节点数组某一个节点，并返回Base对象
Base.prototype.eq = function(num){
	//点获取到节点 然后将节点数组清空 再将所获取节点赋值给第一个
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
};

//设置css方法
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length;i ++){
		if(arguments.length == 1){
			return getStyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}
	return this;
};

//CSS下寻找子节点
Base.prototype.find = function(str){
	var childElement = []	//零时数组 如果循环多次 用来保存循环结果
	for(var i = 0;i<this.elements.length;i++){
		switch (str.charAt(0)){
			case '#':
				childElement.push(this.getId(str.substring(1)));
				break;
			case '.':
				var temps = this.getClassName(str.substring(1),this.elements[i]);
				for(var j = 0;j < temps.length;j ++){
					childElement.push(temps[j]);
				} 
				break;
			default:
				var temps = this.getTagName(str,this.elements[i]);
				for(var j = 0;j < temps.length;j++){
					childElement.push(temps[j]);
				}
		}	
	}
	this.elements = childElement;
	return this;
};

//HTML方法
Base.prototype.html = function(str){
	for(var i =0;i<this.elements.length;i++){
		if(arguments.length == 0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
};

//显示方法
Base.prototype.show = function(){
	for(var i =0;i<this.elements.length;i++){	
		this.elements[i].style.display = 'block';
	}
	return this;
};

//隐藏方法
Base.prototype.hide = function(){
	for(var i =0;i<this.elements.length;i++){	
		this.elements[i].style.display = 'none';
	}
	return this;
};

//鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i = 0;i < this.elements.length; i ++){
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
};

//设置居中方法(已知物体宽高)
Base.prototype.center = function(width,height){
	var top = (getInner().height - height) / 2;
	var left = (getInner().width - width) / 2;
	for(var i = 0;i < this.elements.length; i ++){
		this.elements[i].style.top = top + 'px';
		this.elements[i].style.left = left + 'px';
	}
	return this;
};

//锁屏操作
Base.prototype.lock = function(){
	for(var i = 0;i < this.elements.length;i ++){
		this.elements[i].style.width = getInner().width + 'px';
		this.elements[i].style.height = getInner().height + 'px';
		this.elements[i].style.display = 'block';
		document.documentElement.style.overflow = 'hidden';//出现遮照时将滚动条去除
	}
};

//解锁操作
Base.prototype.unlock = function(){
	for(var i = 0;i < this.elements.length;i ++){
		this.elements[i].style.display = 'none';
		document.documentElement.style.overflow = 'auto';//还原滚动条

	}
};

//点击事件
Base.prototype.click = function(fn){
	for(var i = 0;i < this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
};

//设置动画
Base.prototype.animate = function (obj) {
	for (var i = 0; i < this.elements.length; i ++) {
		var element = this.elements[i];
		var attr = obj['attr'] == 'x' ? 'left' : obj['attr'] == 'y' ? 'top' : 
					   obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
					   obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';

		
		var start = obj['start'] != undefined ? obj['start'] : 
						attr == 'opacity' ? parseFloat(getStyle(element, attr)) * 100 : 
												   parseInt(getStyle(element, attr));
		
		var t = obj['t'] != undefined ? obj['t'] : 30;												//可选，默认30毫秒执行一次
		var step = obj['step'] != undefined ? obj['step'] : 10;								//可选，每次运行10像素
		
		var mul = obj['mul'];		//同步动画用于传入的键值对

		var alter = obj['alter'];
		var target = obj['target'];
		
		
		var speed = obj['speed'] != undefined ? obj['speed'] : 6;							//可选，默认缓冲速度为6
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';		//可选，0表示匀速，1表示缓冲，默认缓冲
		
		//如果为单组动画
		if(mul == undefined){
			mul = {};
			mul[attr] = target;
		}

		if (alter != undefined && target == undefined) {
			target = alter + start;
		} else if (alter == undefined && target == undefined && mul == undefined) {
			throw new Error('alter增量或target目标量必须传一个！');
		}
			
		if (start > target) step = -step;
		
		if (attr == 'opacity') {
			element.style.opacity = parseInt(start) / 100;
			element.style.filter = 'alpha(opacity=' + parseInt(start) +')';
		} else {
			element.style[attr] = start + 'px';
		}
		
		
		clearInterval(element.timer);
		element.timer = setInterval(function () {
		
			var flag = true;		
			for(var i in mul){
				attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != 'undefined' ? i : left;
				target = mul[i];
				if (type == 'buffer') {
					step = attr == 'opacity' ? (target - parseFloat(getStyle(element, attr)) * 100) / speed :
														 (target - parseInt(getStyle(element, attr))) / speed;
					step = step > 0 ? Math.ceil(step) : Math.floor(step);
				}
				
				
				
				if (attr == 'opacity') {
					if (step == 0) {
						setOpacity();
					} else if (step > 0 && Math.abs(parseFloat(getStyle(element, attr)) * 100 - target) <= step) {
						setOpacity();
					} else if (step < 0 && (parseFloat(getStyle(element, attr)) * 100 - target) <= Math.abs(step)) {
						setOpacity();
					} else {
						var temp = parseFloat(getStyle(element, attr)) * 100;
						element.style.opacity = parseInt(temp + step) / 100;
						element.style.filter = 'alpha(opacity=' + parseInt(temp + step) + ')'
					}
					if(parseInt(target) != parseInt(parseFloat(getStyle(element,attr)*100))){
						flag = false;
					}

				} else {
					if (step == 0) {
						setTarget();
					} else if (step > 0 && Math.abs(parseInt(getStyle(element, attr)) - target) <= step) {
						setTarget();
					} else if (step < 0 && (parseInt(getStyle(element, attr)) - target) <= Math.abs(step)) {
						setTarget();
					} else {
						element.style[attr] = parseInt(getStyle(element, attr)) + step + 'px';
					}
					if(parseInt(target) != parseInt(getStyle(element,attr))){
						flag = false;
					}
				}
			}
			//document.getElementById('aaa').innerHTML += step + '<br />';
			
			if(flag){
				clearInterval(element.timer);
				if(obj.fn != undefined ){
					obj.fn();
				}
			}
		}, t);
		
		function setTarget() {
			element.style[attr] = target + 'px';
		}
		
		function setOpacity() {
			element.style.opacity = parseInt(target) / 100;
			element.style.filter = 'alpha(opacity=' + parseInt(target) + ')';
		}
	}
	return this;
};

//窗口改变触发事件
Base.prototype.resize = function(fn){
	for(var i = 0;i < this.elements.length;i ++){
		var element = this.elements[i];
		addEvent(window,'resize',function(){
			fn();
			//针对缩小窗口后登陆窗口仍然可以在右下角显示
			if(element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if(element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
		});
	}
	
	return this;
};

//拖拽
/*Base.prototype.drag = function(){
	
}*/

//切换函数
Base.prototype.toggle = function(){
	for(var i = 0; i < this.elements.length; i ++){
		var count = 0;
		var args = arguments;
		addEvent(this.elements[i],'click',function(){
			args[count++ % args.length]();
		});
	}
	return this;
};

//插件引入入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;
};