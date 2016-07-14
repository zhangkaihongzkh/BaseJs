
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
	return event;
};

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
	if(typeof window.getComputedStyle != 'undefined'){	//W3C
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined'){	//IE
		return element.currentStyle[attr];
	}
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