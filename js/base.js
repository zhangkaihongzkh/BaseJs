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

	//获取元素ID
	this.getId = function(id){
		this.elements.push(document.getElementById(id));
		return this;
	};

	//获取标签名
	this.getTagName = function(tag){
		var tags = document.getElementsByTagName(tag);
		for(var i = 0;i < tags.length;i++){
			this.elements.push(tags[i]);
		}
		return this;
	};
};

//设置css方法
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length;i++){
		this.elements[i].style[attr] = value;
	}
	return this;
};

//HTML方法
Base.prototype.html = function(str){
	for(var i =0;i<this.elements.length;i++){
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