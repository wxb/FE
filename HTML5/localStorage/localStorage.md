## 客户端存储数据:localStorage   
* **HTML5之前的客户端存储**   
	HTML5之前，客户端存储主要使用的是：cookie   
	但是cookie在使用过程中有一些不太方便或者说不优美的地方：   
		1. cookie 不适合大量数据的存储，一般来说cookie限制最大是保存4K的信息    
		2. cookie保存的同一个主域中的信息会在每一次http请求中发送，想想看我们的网站可能只是一个URL中需要cookie的信息，但是http在请求每一个URI时都会发送这个信息，这么做使得我们的http请求很臃肿    
		3. 安全问题，这也许不是cookie的错，也不光是cookie的问题；在http请求时，会在http头信息中附带cookie中的信息    

* **localStorage**   
	1. 没有时间限制的数据存储   
		localStorage 方法存储的数据没有时间限制。第二天、第二周或下一年之后，数据依然可用   
	2. 