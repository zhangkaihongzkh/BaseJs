# BaseJs
模拟JQ一些常用方法 封装JS库 

## $实现的思路
### $赋予匿名函数 其中传参为args 执行完毕后返回一个new Base(args)对象

### 构造函数 Base
1. 为当前Base对象的**this.elements **赋予 空[] 保证每次调用均为新的数组
2. 先用typeof 判断传入的参数args 是否为对象

#### 若为 'object' 判断当前传入为对象this 将传入args 赋值给this.lements[0]

#### 若为'function' 判断传入为函数 即为**$(function(){})**运行tool.js的加载方法addDomLoaded
