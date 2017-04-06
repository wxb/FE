##Application Cache（应用缓存或离线缓存）

* **参考**  
  * Mozilla MDN 关于[Application Cache的讲解](https://developer.mozilla.org/zh-CN/docs/Web/HTML/Using_the_application_cache)
   
* **简介**
  * Application Cache也就是APPCache。  
  * APPCache 是基于***HTML5*** 的一种使WEB 浏览器可以缓存应用程序资源，已达到应用程序可以离线使用的目的。  
  * APPCache 不同于session cache，session cache是有过期时间的，到超过了过期时间或者浏览器关闭，缓存文件就会被自动删除；
    但是APPCache并没有这样类似的机制，所以如果没有手动或者程序设置地删除，APPCache会一直保存在客户端浏览器缓存区中。  
  
* **APPCache的优势**  
  * 离线浏览: 用户可以在离线状态下浏览网站内容。
  * 更快的速度: 因为数据被存储在本地，所以速度会更快。
  * 减轻服务器的负载: 浏览器只会下载在服务器上发生改变的资源。
  
* **APPCache的工作流程**  
  * 如何开启APPCache？  
  
    >通过在页面中的 <html> 元素上增加 manifest 属性来开启应用缓存，就像这样：
    > ```
      <html manifest="example.appcache"> 
      ...
      </html>
    > ```
    > a. manifest 属性值是 缓存清单(cache manifest) 文件，这个文件包含了浏览器需要为应用缓存的资源(文件)列表  
    > b. 你应当在每一个意图缓存的页面上添加 manifest 特性。浏览器不会缓存不带有manifest 特性的页面，除非这个页面已经被写在清单文件内的列表里了。你没有必要添加所有你意图缓存的页面的清单文件，浏览器会将用户访问过的并带有 manifest 特性的所有页面添加进应用缓存中。
    
 * **文档加载和更新流程**  
  * 使用了APPCache之后文档加载是这样的：
    
    > 1. 当浏览器访问一个包含 manifest 特性的文档时，如果应用缓存不存在，浏览器会加载文档，然后获取所有在清单文件中列出的文件，生成应用缓存的第一个版本。  
    > 2. 后续再次访问时，浏览器直接从应用缓存(而不是服务器)中加载文档与其他在清单文件中列出的资源。同时，浏览器还会向 window.applicationCache 对象发送一个 checking 事件，在遵循合适的 HTTP 缓存规则前提下，获取清单文件    
    > 3. 把上面提到的checking事件后获取到的服务器端的文件清单和当前浏览器缓存的清单副本比对，如果当前浏览器缓存的清单副本是最新的，浏览器将向 applicationCache 对象发送一个 noupdate 事件，到此，更新过程结束。**注意，如果你在服务器修改了任何缓存资源，同时也应该修改清单文件，这样浏览器才能知道它需要重新获取资源**。   
    > 4. 如果清单文件已经改变，文件中列出的所有文件(也包括通过调用 applicationCache.add() 方法添加到缓存中的那些文件)会被获取并放到一个临时缓存中，遵循适当的 HTTP 缓存规则。对于每个加入到临时缓存中的文件，浏览器会向 applicationCache 对象发送一个 progress 事件。如果出现任何错误，浏览器会发送一个 error 事件，并暂停更新。    
    > 5. 一旦所有文件都获取成功，它们会自动移送到真正的离线缓存中，并向  applicationCache 对象发送一个 cached 事件。***鉴于文档早已经被从缓存加载到浏览器中，所以更新后的文档不会重新渲染，直到页面重新加载(可以手动或通过程序)*** 这里特别注意一下，当你在服务器端修改了文件同时也更新了清单文件，刷新页面却没有显示我们的修改，这并没有错误，好好理解前面那句说明，你要想看到你的修改，可以简单的再刷新一次。   
     > 上面状态的变更，我们可以运行本示例，然后查看 console控制台的输出信息：
     
    ![image](https://github.com/wxb/xHTML5/raw/master/AppCache/APPCache.png)

* **清除离线缓存**   
 * chrome ：设置中选择 「清除浏览器数据...」 或访问 chrome://appcache-internals/ 来清除缓存      
 * Safari ： 在设置中有一个类似的"清空缓存" 选项，但是需要重启浏览器后才能生效。     
 *  Firefox： 通过访问 about:cache 页面(在「离线缓存设置」标题下)来检查离线缓存的当前状况    
 
* **manifest清单文件**   
 * manifest清单文件可以使用任意扩展名，但传输它的 MIME 类型必须为 text/cache-manifest。   
 * manifest清单文件中的记录
 
  > 1. 缓存清单文件是一个纯文本文件，它列出了所有浏览器应该缓存起来的资源，以便能够离线访问   
  > 2. 示例：
  > ```
   CACHE MANIFEST
   # v1 - 2011-08-13(注释 「v1」很有必要存在。只有当清单文件发生变化时，浏览器才会去更新应用缓存。如果你要更改缓存资源(比如说，你使用了一张新的 header.png 图片)，你必须同时修改清单文件中的内容，以便让浏览器知道它们需要更新缓存)
   # This is a comment.
   http://www.example.com/index.html
   http://www.example.com/header.png
   http://www.example.com/blah/blah
  > ```
  > 3. 一个缓存清单文件可以包含三段内容 (CACHE， NETWORK， 和 FALLBACK， 下面详细讨论)  
  > 4. 资源可以使用绝对或者相对 URL 来指定(例如 index.html)   
  > 5. **重要：不要在清单文件中指定清单文件本身，否则将无法让浏览器得知清单文件有新版本出现。**  

 * **CACHE， NETWORK，与 FALLBACK**   
 
  > 1. CACHE:    
            这是缓存文件中记录所属的默认段落。在 CACHE: 段落标题后(或直接跟在 CACHE MANIFEST  行后)列出的文件会在它们第一次下载完毕后缓存起来。   
  > 2. NETWORK:    
            在 NETWORK: 段落标题下列出的文件是需要与服务器连接的白名单资源。所有类似资源的请求都会绕过缓存，即使用户处于离线状态。可以使用通配符。     
  > 3. FALLBACK:    
            FALLBACK: 段指定了一个后备页面，当资源无法访问时，浏览器会使用该页面。该段落的每条记录都列出两个 URI—第一个表示资源，第二个表示后备页面。两个 URI 都必须使用相对路径并且与清单文件同源。可以使用通配符。   
  > 4. CACHE， NETWORK， 和 FALLBACK 段落可以以任意顺序出现在缓存清单文件中，并且每个段落可以在同一清单文件中出现多次。

* **一个复杂且完整的缓存清单文件示例**：  
 ```
CACHE MANIFEST
# v1 - 2015-05-6 12:18:00 (Version 版本号，强烈建议设置，因为只有更新了manifest清单文件，浏览器才会进行update更新缓存的操作)
# 这是一个manifest清单文件，这里CACHE段落中列出了需要缓存的文件.
cache_1.txt
cache_2.html

# 列出的文件是需要与服务器连接的白名单资源。所有类似资源的请求都会绕过缓存，即使用户处于离线状态。可以使用通配符
NETWORK:
ApplicationCache笔记.md

#段指定了一个后备页面，当资源无法访问时，浏览器会使用该页面。该段落的每条记录都列出两个URI—第一个表示资源，第二个表示后备页面。两个 URI 都必须使用相对路径并且与清单文件同源。可以使用通配符
FALLBACK:
fallback.html fallback/fallback.html
 ```
 
* **缓存清单文件的结构**   
 * 缓存清单文件必须以 text/cache-manifest MIME 类型来传输   
 * 缓存清单是 UTF-8 格式的文本文件，有可能包含一个 BOM 字符。     
 * 缓存清单文件的第一行必须包含字符串 CACHE MANIFEST     
 * 注释包括零或多个制表符或空白字符，紧接着是一个#字符，再然后是零或多个注释文本字符。注释只能在所在行起作用，不能追加到其他行上。这意味着你无法使用片段标识符。   
 * 段落数据:不同段落的数据行格式有所不同。在默认 (CACHE:) 段落，每行都是一个合法的  URI 或 IRI ，与一个要缓存的资源相关联(本段落内不允许通配符)。每行的 URI 或 IRI 前后允许出现空白字符。在 Fallback 段落内，每行都是一个合法的 URI 或 IRI(与一个资源关联)，紧跟着一个后备资源，用于当无法与服务器建立连接时访问。在 Network 段落内，每行都是一个合法的 URI 或 IRI，关联一个需要通过网络获取的资源(本段落内可以使用通配符 *)。**注意：相对 URI 是指相对于缓存清单的 URI，而不是包含清单的文档的 URI。**    
 
* **应用缓存中的资源**    
 * 主记录(Master): 用户浏览的一个上下文中包含一个文档，该文档用 manifest 特性明确指明了它属于该缓存   
 * 显示记录(Explicit): 这些是在应用缓存清单文件中显式列出的资源    
 * 网络记录: 这些是在应用缓存清单文件中作为网络记录列出的资源。    
 * 后备记录(fallback): 这些是在应用缓存清单文件中作为后备记录列出的资源。    
 * ![image](https://github.com/wxb/xHTML5/raw/master/AppCache/cachefiletype.png)
 * ***注意： 资源可以被标记为多个类别，因此可以作为多重记录来分类。例如，一条记录既可以是显式记录，也可以是一条后备记录。***  
* **缓存状态**   
 应用缓存都有一个状态，标示着缓存的当前状况   
 * UNCACHED(未缓存) 用于表明一个应用缓存对象还没有完全初始化。
 * IDLE(空闲) 应用缓存此时未处于更新过程中   
 * CHECKING(检查) 清单已经获取完毕并检查更新。
 * DOWNLOADING(下载中) 下载资源并准备加入到缓存中，这是由于清单变化引起的。     
 * UPDATEREADY(更新就绪)   一个新版本的应用缓存可以使用。有一个对应的事件 updateready，当下载完毕一个更新，并且还未使用 swapCache() 方法激活更新时，该事件触发，而不会是 cached 事件。    
 * OBSOLETE(废弃) 应用缓存现在被废弃(当删除manifest属性时，缓存状态就会显示废弃)。 
 * ![image](https://github.com/wxb/xHTML5/raw/master/AppCache/cachestatus.png)     
 * 注意：上面列出的状态可能你不容易发现，但是确实是这样的   
 
* **缓存陷阱**  
 * 永远不要使用传统 GET 参数(例如 other-cached-page.html?parameterName=value) 来访问缓存文件。这会使浏览器绕过缓存，直接从网络获取。若想链接一个参数需要在 JavaScript 中解析的资源，你可以将参数放到链接的 hash 部分，例如 other-cached-page.html#whatever?parameterName=value。      
 * 当应用被缓存后，仅仅更新在 web 页面中使用的资源(文件)还不足以更新被缓存的文件。你需要在浏览器获取和使用更新的文件前，去更新缓存清单文件本身。你可以使用 window.applicationCache.swapCache() 以编程的方式完成上述目的，虽然这无法影响到已经加载完毕的资源。为了保证资源从应用缓存的最新版本中加载，最理想的办法就是刷新页面。    
 * 通过在 web 服务器上设置 expires header 来使 *.appcache 文件立即过期是个好主意。这避免了将清单文件缓存的风险。例如，在 Apache 中，你可以指定下面的配置项：
ExpiresByType text/cache-manifest "access plus 0 seconds"     

* **兼容性**   
![image](https://github.com/wxb/xHTML5/raw/master/AppCache/jianrongxing.jpg)










