# allinone
人员管理平台

# mongo 
采用mongoDB官网免费线上数据库
ip：localhost:27017
Auth DB: manageSystem
User name: admin
Password: 123456

# 身份验证


# 所有表单提交都要 利用Session防止表单重复提交
实现原理：

服务器返回表单页面时，会先生成一个subToken保存于session，并把该subToen传给表单页面。当表单提交时会带上subToken，服务器拦截器Interceptor会拦截该请求，拦截器判断session保存的subToken和表单提交subToken是否一致。若不一致或session的subToken为空或表单未携带subToken则不通过。

首次提交表单时session的subToken与表单携带的subToken一致走正常流程，然后拦截器内会删除session保存的subToken。当再次提交表单时由于session的subToken为空则不通过。从而实现了防止表单重复提交。