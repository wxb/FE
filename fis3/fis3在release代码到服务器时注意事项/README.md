# Fis3 在 release 时注意事项

## to 服务器目标目录读写权限

在我们配置fis-conf.js 时，对于 `to` 发不到服务器或测试环境下的 **目标目录** 一点要保证 **读写** 权限

```

 fis.match('*', {
   deploy: fis.plugin('http-push', {
     receiver: 'http://iweb.com/fuelphp/receiver.php',
     to: '/usr/local/nginx/www/fuelphp' // 注意这个是指的是测试机器的路径，而非本地机器
   })
 })
 
```

检查目录 `ls -l ` 权限，添加写权限 `chmod -R a+w fuelphp`


## 对于 receive.php 接受文件

release 文件到服务器，要注意nginx 和 PHP 对于文件上传大小的限制
### nginx
修改 `nginx.conf` 配置文件    

```
 location ~ \.php$ {
            root           /home/www/htdocs;
            fastcgi_pass   127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME /home/www/htdocs$fastcgi_script_name;
            include        fastcgi_params;

            client_max_body_size 35m;        #客户端上传文件大小设为35M
            client_body_temp_path /home/www/nginx_temp;        #设置临时目录
        }
        
```

### php
对于 fis3 远程服务器接受脚步 `receive.php`来说需要注意的是：**PHP本身对于文件上传的大小限制！**    

php.ini(这里的配置仅仅是说明文件上传大小限制涉及那几个配置项)   

```
upload_max_filesize = 8M 
post_max_size = 10M 
memory_limit = 20M
max_execution_time=300
file_uploads = On

默认允许HTTP文件上传，此选项不能设置为OFF。
upload_tmp_dir =/tmp/www

``` 
配置引用说明：
> * [post_max_size](http://php.net/manual/zh/ini.core.php#ini.post-max-size)    
> post_max_size 涉及了memory_limit, upload_max_filesize关系。简单来说就是：memory_limit > post_max_size > upload_max_filesize    
> * [file-uploads](http://php.net/manual/zh/ini.core.php#ini.file-uploads)
> 

