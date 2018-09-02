/**
 * Created by Du Mingwei on 2018/8/28.
 */
const path=require('path')

const databasetool=require(path.join(__dirname,'../tools/databasetool.js'))

const captchpng=require('captchapng')

exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/login.html'))
}

exports.getRegisterPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/register.html'))
}

exports.register=(req,res)=>{
    const result={status:0,message:'注册成功'}

    databasetool.findOne('accountInfo',{username:req.body.username},(err,doc)=>{
        if  (doc){
            result.status=1

            result.message='用户名已存在'

            res.json(result)
        }else{
            databasetool.insertOne('accountInfo',req.body,(err,result2)=>{
                if  (result2==null){
                    result.status=2

                    result.message='注册失败'
                }
                res.json(result)
            })
        }
    })
}

exports.getVcodeImage=(req,res)=>{
    const vcode=parseInt(Math.random()*9000+1000)

    req.session.vcode=vcode

    var p=new captchpng(80,30,vcode)

    p.color(0,0,0,0)

    p.color(80,80,80,255)

    var img=p.getBase64()

    var imgbase64=new Buffer(img,'base64')

    res.writeHead(200,{
        'Content-Type':'image/png'
    })

    res.end(imgbase64)
}

exports.login=(req,res)=>{
    const result={status:0,message:'登录成功'}

    if  (req.body.vcode!=req.session.vcode){
        result.status=1

        result.message='验证码不正确'

        res.json(result)
        return
    }

    databasetool.findOne('accountInfo',{username:req.body.username,password:req.body.password},(err,doc)=>{
        if  (doc==null){
            result.status=2

            result.message='用户名或密码错误'
        }else{
            req.session.loginedName=req.body.username
        }
        res.json(result)
    })
}

exports.logout=(req,res)=>{
    req.session.loginedName=null

    res.send("<script>alert('确定登出?');location.href='/account/login'</script>")
}