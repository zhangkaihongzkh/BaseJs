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
var $ = function(){
	return new Base();
}
function Base(){
	this.elements = [];	//把返回的节点对象保存在Base对象的属性数组中

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
			if(typeof window.getComputedStyle != 'undefined'){	//W3C
				return window.getComputedStyle(this.elements[i],null)[attr];
			}else if(typeof window.getComputedStyle != 'undefined'){	//IE
				return this.elements[i].currentStyle[attr];
			}
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

//点击事件
Base.prototype.click = function(fn){
	for(var i = 0;i<this.elements.length;i++){
		this.elements[i].onclick = fn;
	}
	return this;
};