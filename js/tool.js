
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
};

//跨浏览器获取Style
function getStyle(element,attr){
	if(typeof window.getComputedStyle != 'undefined'){	//W3C
		return window.getComputedStyle(element,null)[attr];
	}else if(typeof element.currentStyle != 'undefined'){	//IE
		return element.currentStyle[attr];
	}
};

//判断是否有相同类名
function hasClass(element,className){
	return element.className.match(new RegExp('(\\s|^)'+className+'(\\s|$)'))
};

//获取Event对象
function getEvent(event){
	return event || window.event;
};

//阻止默认行为
function preDef(event){
	var e = getEvent(event);
	if(typeof e.preventDefault != 'undefined'){//W3C
		e.preventDefault();
	}else{	//IE
		e.returnValue = false;
	}
}