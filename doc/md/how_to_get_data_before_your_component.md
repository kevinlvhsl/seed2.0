## 组件实例化之前从ajax获取数据，然后渲染  

---

如果我们需要在初始化组件之前获取数据，讲获取到的数据绑定到我们的组件上。


##### Vue实例化配置选项route属性


`.vue文件中的script标签部分`

```

export default {
	data() {
		return {}
	},
	//【route】Vue实例化的属性
    route: {
        // 【钩子函数】vue-router的钩子方法，在路由可用的情况下执行以下方法
        canActivate: function (transition) {

            // ajax获取数据
            mp.getRec({}, function(data){
				// 【这里】接口获取成功后的数据处理部分
				dataProcess()
				// 【完成数据处理后执行transition.next()方法】
                transition.next()
            })
        }
    }
}

```