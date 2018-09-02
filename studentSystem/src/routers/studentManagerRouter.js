/**
 * Created by Du Mingwei on 2018/8/29.
 */
const express=require('express')

const path=require('path')

const studentManagerRouter=express.Router()

const studentManagerCTRL=require(path.join(__dirname,'../controllers/studentmanagerController.js'))

studentManagerRouter.get('/list',studentManagerCTRL.getStudentListPage)

studentManagerRouter.get('/add',studentManagerCTRL.getAddStudentPage)

studentManagerRouter.post('/add',studentManagerCTRL.addStudent)

studentManagerRouter.get('/edit/:studentId',studentManagerCTRL.getEditStudentPage)

studentManagerRouter.post('/edit/:studentId',studentManagerCTRL.editStudent)

studentManagerRouter.get('/delete/:studentId',studentManagerCTRL.deleteStudent)

module.exports=studentManagerRouter