### how to define the build.js tag position 

1. 修改template.html文件

	添加以下模板语句到文件中任意位置

	```
		<script src="{%= o.htmlWebpackPlugin.files.js[0] %}"></script>
	```
	
	上面部分是生成的包含build.js的位置，移动到想要生成的位置，理解为占位符即可。
	
+ 修改webpack.config.js文件

	**	修改inject属性为false**

	修改前：

	```
       new HtmlWebpackPlugin({  
            hash: true,  
            inject: 'body',  
            template: 'template.html',  
            filename: '../index.html',  
       })
	```
	
	修改后：

	```
       new HtmlWebpackPlugin({  
            hash: true,  
            inject: false,  
            template: 'template.html',  
            filename: '../index.html',  
       })
	```	
	
+ 运行命令生成index.html文件

	```
		npm run build
	```

##### Author
**[Alex Q](<mailto:alexqin@intv.com.cn> "send me a mail")** 