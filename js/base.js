/*var Base = {
	getId:function(id){
		return document.getElementById(id);
	},
	getName:function(name){
		return document.getElementsByName(name);
	},
	getTagName:function(tagName){
		return document.getElementsByTagName(tagName);
	}
}*/
var $ = function(_this){
	return new Base(_this);
}
function Base(_this){
	this.elements = [];	//把返回的节点对象保存在Base对象的属性数组中
	if(_this != undefined){	//_this为一个对象 undefined也是一个对象，与typeof返回的带单引号的undefined不同
		this.elements[0] = _this;
	}
};

//获取元素ID
Base.prototype.getId = function(id){
	this.elements.push(document.getElementById(id));
	return this;
};

//获取元素标签数组
Base.prototype.getTagName = function(tag){
	var tags = document.getElementsByTagName(tag);
	for(var i = 0;i < tags.length;i++){
		this.elements.push(tags[i]);
	}
	return this;
};

//获取CLASS数组
Base.prototype.getClassName = function(className,idName){
	//解决区域化的问题
	var node = null;
	if(arguments.length == 2){
		node = document.getElementById(idName);
	}else if(arguments.length == 1){
		node = document;
	}
	//先获取到所有节点 再循环逐一比较
	var all = node.getElementsByTagName('*');
	for(var i = 0;i < all.length; i ++){
		if(all[i].className == className){
			this.elements.push(all[i]);
		}
	}
	return this;
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

//获取到节点数组某一个节点
Base.prototype.getElement = function(num){
	//点获取到节点 然后将节点数组清空 再将所获取节点赋值给第一个
	var element = this.elements[num];
	this.elements = [];
	this.elements[0] = element;
	return this;
}

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
		this.elements[i].onmouseover = over;
		this.elements[i].onmouseout = out;
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

//窗口改变触发事件
Base.prototype.resize = function(fn){
	for(var i = 0;i < this.elements.length;i ++){
		var element = this.elements[i];
		window.onresize = function(){
			fn();
			//针对缩小窗口后登陆窗口仍然可以在右下角显示
			if(element.offsetLeft > getInner().width - element.offsetWidth){
				element.style.left = getInner().width - element.offsetWidth + 'px';
			}
			if(element.offsetTop > getInner().height - element.offsetHeight){
				element.style.top = getInner().height - element.offsetHeight + 'px';
			}
		};
	}
	
	return this;
}

//拖拽
Base.prototype.drag = function(){
	for(var i = 0;i<this.elements.length;i++){
		this.elements[i].onmousedown = function(e){
			preDef(e);	//阻止默认行为
			var e = getEvent(e);
			var _this = this //登陆窗口本身

			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;

			//针对IE划出浏览器时 依然能捕获事件
			if(typeof _this.setCapture != 'undefined'){
				_this.setCapture();
			}

			document.onmousemove = function(e){

				var event = getEvent(e);
				var left = event.clientX - diffX;
				var top = event.clientY- diffY;

				//判断是否到达浏览器窗口边界
				if(left < 0){
					left = 0;
				}else if(left > getInner().width - _this.offsetWidth){
					left = getInner().width - _this.offsetWidth;
				}
				if(top < 0){
					top = 0;
				}else if(top > getInner().height - _this.offsetHeight){
					top = getInner().height - _this.offsetHeight;
				}

				_this.style.left = left + 'px';
				_this.style.top = top + 'px';
			}
			document.onmouseup = function(){
				this.onmousemove = null;
				this.onmouseup = null;
				//针对IE划出浏览器时 依然能捕获事件
				if(typeof _this.releaseCapture != 'undefined'){
					_this.releaseCapture();
				}
			}
		};
	}
	return this;
}