这里是各种路由，凡是被加到这里的文件都会被自动生成路由

【最佳实践】

1. layout中会自动为当前页面根据url添加名为.c-ControllerName和.p-CurrentUrlPath的两个外包装类，可以把本页特有的属性定义在里面，以免干扰全局设定
1. 如果需要在部分路由中禁用此特性，则在路由定义中增加一个noWrapperClass: true的属性，如：{templateUrl: '...', controller: '...', noWrapperClass: true}
1. 具有全局价值的设定，请逐步重构到styles目录下的各个样式表中
