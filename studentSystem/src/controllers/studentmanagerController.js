/**
 * Created by Du Mingwei on 2018/8/29.
 */
const xtpl=require('xtpl')

const path=require('path')

const databasetool=require(path.join(__dirname,'../tools/databasetool.js'))


exports.getStudentListPage=(req,res)=>{
    const keyword=req.query.keyword||''

    databasetool.findList('studentInfo',{name:{$regex:keyword}},(err,docs)=>{
        xtpl.renderFile(path.join(__dirname,'../statics/views/list.html'),{
            students:docs,
            keyword,
            loginedName:req.session.loginedName
        }, function (err,content) {
            res.send(content)
        })
    })
}

exports.getAddStudentPage=(req,res)=>{
    xtpl.renderFile(path.join(__dirname,'../statics/views/add.html'),{
        loginedName:req.session.loginedName
    }, function (error,content) {
        res.send(content)
    })
}

exports.addStudent=(req,res)=>{
    databasetool.insertOne('studentInfo',req.body,(err,result)=>{
        if  (err){
            res.setHeader('Content-Type','text/html;charset=utf-8')

            res.end("<script>alert('插入失败')</script>")
        }else{
            res.send("<script>location.href='/studentmanager/list'</script>")
        }
    })
}

exports.getEditStudentPage=(req,res)=>{
    const studentId=databasetool.ObjectId(req.params.studentId)

    databasetool.findOne("studentInfo",{_id:studentId},(err,doc)=>{
        xtpl.renderFile(path.join(__dirname,'../statics/views/edit.html'),{
            studentInfo:doc,
            loginedName:req.session.loginedName
        },(err,content)=>{
            res.send(content)
        })
    })
}

exports.editStudent=(req,res)=>{
    const studentId=databasetool.ObjectId(req.params.studentId)

    databasetool.updateOne('studentInfo',{_id:studentId},req.body,(err,result)=>{
        if  (err){
            res.setHeader('Content-Type','text/html;charset=utf-8')

            res.end("<script>alert('修改失败')</script>")
        }else{
            res.send("<script>location.href='/studentmanager/list'</script>")
        }
    })
}

exports.deleteStudent=(req,res)=>{
    const studentId=databasetool.ObjectId(req.params.studentId)

    databasetool.deleteOne('studentInfo',{_id:studentId},(err,result)=>{
        if  (err){
            res.setHeader('Content-Type','text/html;charset=utf-8')

            res.end("<script>alert('删除失败')</script>")
        }else{
            res.send("<script>location.href='/studentmanager/list'</script>")
        }
    })
}

