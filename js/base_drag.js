$().extend('drag',function(tags){
	for(var i = 0;i<this.elements.length;i++){
		//根据自身定义绑定方法绑定事件
		addEvent(this.elements[i],'mousedown',function(e){
			if(trim(this.innerHTML).length == 0){
				e.preventDefault();	//阻止默认行为
				/*var e = getEvent(e);*/
			}
			var _this = this //登陆窗口本身

			var diffX = e.clientX - _this.offsetLeft;
			var diffY = e.clientY - _this.offsetTop;


			//自定义拖拽区域
			var flag = false;
			for(var i = 0;i < tags.length; i++){
				if(e.target == tags[i]){
					flag = true;	//只要有一个是符合拖拽区域 就跳出循环
					break;
				}
			};

			//鼠标滑动到H2区域时才能拖动登陆框，否则移除事件
			if(flag){
				addEvent(document,'mousemove',move);
				addEvent(document,'mouseup',up);
			}else{
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
			}


			//鼠标移动函数
			function move(e){
				/*var event = getEvent(e);*/
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

				//针对IE划出浏览器时 依然能捕获事件
				if(typeof _this.setCapture != 'undefined'){
					_this.setCapture();
				}
			}
			//鼠标松开函数
			function up(){
				removeEvent(document,'mousemove',move);
				removeEvent(document,'mouseup',up);
				//针对IE划出浏览器时 依然能捕获事件
				if(typeof _this.releaseCapture != 'undefined'){
					_this.releaseCapture();
				}
			}
		});
	}
	return this;
});