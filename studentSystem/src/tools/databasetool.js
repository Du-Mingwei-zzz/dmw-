/**
 * Created by Du Mingwei on 2018/8/29.
 */
const MongoClient=require('mongodb').MongoClient

const ObjectId=require('mongodb').ObjectId

const url='mongodb://localhost:27017'

const dbName='szhmqd21'

exports.ObjectId=ObjectId

const connectDB=(collectionName,callback)=>{
    MongoClient.connect(
        url,
        {useNewUrlParser:true},
        function (err,client) {
            const db=client.db(dbName)

            const collection=db.collection(collectionName)

            callback(err,client,collection)
        }
    )
}

exports.findList=(collectionName,params,callback)=>{
    connectDB(collectionName,(err,client,collection)=>{

            collection.find(params).toArray((err,docs)=>{
                client.close()

                callback(err,docs)
            })
        })
}

exports.findOne=(collectionName,param,callback)=>{
    connectDB(collectionName,(err,client,colletion)=>{
        colletion.findOne(param,(err,doc)=>{
            client.close()

            callback(err,doc)
        })
    })
}

exports.insertOne=(collectionName,param,callback)=>{
    connectDB(collectionName,(err,client,collection)=>{
        collection.insertOne(param,(err,result)=>{
            client.close()

            callback(err,result)
        })
    })
}

exports.updateOne=(collectionName,condition,params,callback)=>{
    connectDB(collectionName,(err,client,collection)=>{
        collection.updateOne(condition,{$set:params},(err,result)=>{
            client.close()

            callback(err,result)
        })
    })
}

exports.deleteOne=(collectionName,params,callback)=>{
    connectDB(collectionName,(err,client,collection)=>{
        collection.deleteOne(params,(err,result)=>{
            client.close()

            callback(err,result)
        })
    })
}