## 组件实例化之前从ajax获取数据，然后渲染  


---

> 简单来说，如果我们需要在初始化组件之前获取数据，并将获取到的数据放到组件的data属性进行绑定。方法就是在vue-router的某一个生命周期时刻提供的钩子上绑定对应的`钩子函数`即可，执行完的任务后再继续生命周期的进行。

##### Vue-router的钩子函数包括：

+ data
+ activate
+ deactivate
+ `canActivate` -> 这是我们要用的钩子函数
+ canDeactivate
+ canReuse


##### Vue实例化配置选项route属性


`.vue文件中的script标签部分`

```

export default {
	data() {
		return {}
	},

	//-->【route】Vue实例化的属性
    route: {

        //--> 【钩子函数】vue-router的钩子方法，在路由可用的情况下执行以下方法
        canActivate: function (transition) {

            //--> ajax获取数据
            mp.getRec({}, function(data){

				//--> 【这里】接口获取成功后的数据处理部分
				dataProcess()

				//--> 【完成数据处理后执行transition.next()方法】
                transition.next()

            })
        }
    }
}

```

> //--> 标记部分是简单注释


##### 创建钩子函数步骤

1. Vue option里添加route属性
2. route中添加canActivate钩子函数
3. mp.getRec是示例中获取数据的ajax异步方法 `自定义获取数据方法`
4. dataProcess()是获取完数据后的执行函数 `自定义处理方法`
5. 执行transition.next()转到下一个生命周期即可！



##### Author
**[Alex Q](<mailto:alexqin@intv.com.cn> "send me a mail")**   
2015-11-20


