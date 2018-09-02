/**
 * Created by Du Mingwei on 2018/8/28.
 */
//导入模块
const express=require('express')

const path=require('path')

const bodyParser=require('body-parser')

const session=require('express-session')

//创建应用,使用中间件
const app=express()

app.use(bodyParser.urlencoded({extends: false}))

app.use(bodyParser.json())

app.use(session({secret:'keyboard cat',resave:true,saveUninitialized:false,cookie:{maxAge:600000}}))

app.use(express.static(path.join(__dirname,'statics')))

//拦截所有请求,设置访问权限
app.all("*",(req,res,next)=>{
    if  (req.url.includes('studentmanager')){
        if(req.session.loginedName){
            next()
        }else{
            res.send("<script>alert('请先登录');window.location='/account/login'</script>")
        }
    }else{
        next()
    }
})

//拿到路由路径,使用路由
const accountRouter=require(path.join(__dirname,'./routers/accountRouter.js'))

const studentManagerRouter=require(path.join(__dirname,'./routers/studentmanagerRouter.js'))

app.use('/account',accountRouter)

app.use('/studentmanager',studentManagerRouter)

app.listen(5200,'127.0.0.1',err=>{
    if  (err){
        console.log(err);
    }else{
        console.log('start ok');
    }
})