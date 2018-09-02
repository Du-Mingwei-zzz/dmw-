/**
 * Created by Du Mingwei on 2018/8/28.
 */
const express=require('express')

const path=require('path')

const accountRouter=express.Router()

const accountCTRL=require(path.join(__dirname,'../controllers/accountController.js'))

accountRouter.get('/login',accountCTRL.getLoginPage)

accountRouter.get('/register',accountCTRL.getRegisterPage)

accountRouter.post('/register',accountCTRL.register)

accountRouter.get('/vcode',accountCTRL.getVcodeImage)

accountRouter.post('/login',accountCTRL.login)

accountRouter.get('/logout',accountCTRL.logout)

module.exports=accountRouter