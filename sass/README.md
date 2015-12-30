# sass - 学习笔记

sass 是基于ruby开发出来的成熟、稳定、强大的 CSS 扩展语言。

# sass 语法  

sass有两种语法：1. 类ruby的语法: `.sass`；2. css3 超集的语法: `.scss`   
![sass-scss](sass-scss.png)  

# sass 的安装  

sass 是基于ruby开发的，所以使用之前请先确认你的环境中是否已经安装了ruby，关于ruby的安装可以查看ruby官方网站：https://www.ruby-lang.org 
> 这里说几点关于ruby的小知识：
> rvm - ruby的版本管理工具
> > 官网给出的说明：RVM is a command-line tool which allows you to easily install, manage, and work with multiple ruby environments from interpreters to sets of gems.（rvm是一个便于安装，管理和切换多个ruby环境的命令行工具）  

> gem - ruby的包管理工具（相当于node上的npm）
> > 可以通过：gem install sass 来安装sass
> > 更多信息使用：gem -h 来学习   

sass的安装使用命令：`$ gem install sass`   
使用命令 `sass -h` 查看sass命令更多用法   

# compass  
  - Compass is an open-source CSS Authoring Framework.   
  - compass是一个开源的css书写框架, compass 实在sass基础上二次开发的一个css框架     
  * 官网：http://compass-style.org   
  * compass 安装：`$ gem install compass` 或者 `$sudo gem install compass`   
  * 使用 `compass -h` 学习compass命令用法   
  
# sass-convert  

上面已经指明：在sass中存在两种语法格式：类ruby 和 类CSS3 。这两者之间并没有什么优略，选择合适自己的就是最好的。   

那么两种格式如何转换？难道要手动转？哈哈！那不要累死人了！   

sass提供了一个命令：`sass-convert` 来帮助我们自动转换这两种风格的语法，sass-convert的使用很简单：

```bash

$ sass-convert demo_01.scss demo_01.sass   // scss -> sass  
$ sass-convert demo_02.cass demo_02.scss   // sass -> scss   

```   

```sass
// demo_01.scss
body {
    background: red;
    width: 980px;
    margin: 0 auto;
}
// demo_02.sass
body
  background: red
  width: 980px
  margin: 0 auto

```

# sass 中注释
sass中添加注释和大多数语言一样：`//` - 行注释；`/*   */`块注释. 不同的是，行注释不会编译到css文件中，块注释则会添加在生成的css文件中
![](1.png)

# sass 变量声明
* sass中变量声明有点类似php使用 `$`   
* 如果变量需要镶嵌在字符串之中，就必须需要写在#{}之中
```sass
$side : left;
　　.rounded {
　　　　border-#{$side}-radius: 5px;
　　}
```
* 变量也有作用域   

# sass 文件引入 

文件引入和css中类似：`@import "xxx"` ， 但是sass对import进行了升级，解决了一下问题
![](2.png)

默认生成文件中的 `@import "compass/reset";` 作用是：去掉浏览器默认的一些样式行为，因为有些浏览器默认的样式并不统一。

** 那如何引入css文件 **  
![](3.png)

# sass 文件名 

* sass规定：以下划线开头文件名的文件是局部文件，这些.scss文件前面都有一个下划线(_)，用来告诉Sass，这些.scss文件只是局部，不通过@import 是不应该被编译出.css文件。事实上，它们是导入和合并文件的基本文件而以。
* 在没有文件名后缀时，sass会自动添加 .scss 或者 .sass 的后缀       
* 同一目录下，局部文件和非局部文件是不能同名的   

# sass 嵌套语法

![](4.png)

# sass 父类选择器 & 

请仔细查看下面三个不同之处   
![](5.png)  

在没有父类选择器时（第一个），编译后的css，会作用于a标签下所有 `:hover` 的效果，有了父类选择器，就只会作用于a标签（第二个）；第三个意思是：如果你有一个深层嵌套的规则，父选择符也会在 & 被替换之前被完整的解析    

# sass 嵌套属性  

sass不光提供了类的嵌套，还提供了属性的嵌套,注意属性的嵌套使用 `:` 的形式，例如下面 `font:{}`
   
![](6.png)





  



