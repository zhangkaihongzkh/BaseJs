# BaseJs
模拟JQ一些常用方法 封装JS库 

## $实现的思路
### $赋予匿名函数 其中传参为args 执行完毕后返回一个new Base(args)对象

### 构造函数 Base
1. 为当前Base对象的 **this.elements** 赋予 空[] 保证每次调用均为新的数组
2. 先用typeof 判断传入的参数args 是否为对象

- 若为 'object' 判断当前传入为对象this 将传入args 赋值给this.lements[0]

- 若为'function' 判断传入为函数 即为**$(function(){})**运行tool.js的加载方法addDomLoaded(该方法主要修改了DOM加载顺序 不等window.onload完全加载)

- 若为'string' 说明传入的是字符串
>   
>   - 先用args.indexOf(' ') != 1判断传入是否有空格 若没有说明只传入一个 用args。charAt(0) 判断第一个符号是 # . 还是 空 
>   
>   - 若有空格 则用elements 保存 **split(' ')** 分隔后的字符串 同时childElements 保存子节点 然后对elements进行遍历 遍历过程中 判断 elements[i]。charAt(0)第一个字符为# . 还是空 在对应的分支下 进行处理 用 Base原型上封装好的函数 getId getClassName getTagName 
>   

### 基础函数 getId getTagName getClassName
1.getId(id) 
- return document.getElementById(id);  之前是将this.elements.push进去 之后修改为内部调用 所以返回的是document.getElementById(id)

2.getTagName(tag,parentNode) 
- 定义变量 **node** 用于判断是否传入父节点, 若传入父节点 则将 **parentNode** 赋值给node 否则将全局 **document** 赋值给node

- 定义变量 **temps** 用于存放临时节点并返回

- 定义变量 tags = node.getElementsByTagName(tag); 同时遍历tags 将tags[i]push到temps中

3.getClassName(className,parentNode)
- 原理与getTagName类似，只是一开始是获取所有节点 在循环体中判断类名是否相同 相同才push

### 插件引入入口  的调用
- **extend(name,fn)**
通过在原型上定义extend方法 传入两个参数 插件名称name 和 函数fn extend内部赋予 Base.prototype[name] = fn; 
- 外部插件引入的时候通过 $().extend(name,function(){})即可
