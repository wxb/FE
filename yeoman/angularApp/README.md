# yeoman

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.11.1.

## Build & development

Run `grunt` for building and `grunt serve` for preview.

## Testing

Running `grunt test` will run the unit tests with karma.

___

## 碰到问题

* `Cannot read property 'contents' of undefined` ？      
解决：`"grunt-contrib-imagemin": "^1.0.0",` and `"imagemin":"^4.0.0"`

* 同时也要时刻注意是否由于**权限**问题引起的 `grunt serve`, `grunt test`, `grunt`等任务执行错误
