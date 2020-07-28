var express=require('express');
var router=express.Router();
var Post=require('../../model/Post');
var User=require('../../model/User');
var Checkauth=require('../middleware/check-auth');

router.get('/list',function(req,res){
Post.find(function(err,rtn){
    if(err){
        res.status(500).json({
            message:"internal server error",
            error:err
        })
    }else{
        res.status(201).json({
            posts:rtn,

        })
    }
})

})



router.post('/add',Checkauth,function(req,res){

    var post=new Post();
    post.title=req.body.title;
    post.content=req.body.content;
    post.author=req.body.author;

    post.save(function(err,rtn){
    if(err){
    res.status(500).json({

        message:'internal server error',
        error:err,
    })
}else{

    res.status(201).json({
        message:'it is created',
        posts:rtn,

                  })
            }
        })
    })


router.get('/detail/:id',Checkauth,function(req,res){
    Post.findById(req.params.id).populate("author").exec(function(err,rtn){
        if(err){
            res.status(500).json({
                message:'internal server err',
                error:err,
            })
        }else if(rtn==null){
            res.status(204).json({
                message:"it is no content"
            })
        }else{
            res.status(201).json({
                message:'it is created',
                posts:rtn
            })
        }
    })
})

router.patch('/update/:id',function(req,res){
            
    // var update={
    // title:req.body.title,
    // content:req.body.content,
    // author:req.body.author,

    // }

    var updateops= {};
    for(var ops of req.body){
        updateops[ops.proName]=ops.value;
    }

Post.findByIdAndUpdate(req.params.id,{$set:updateops},function(err,rtn){

    if(err){
            res.status(500).json({
                message:'internal server err',
                error:err,
            }) 
    }
       else{
        res.status(200).json({
            message:"created update",
                posts:rtn,
                })
            }
        })
    })


router.delete('/delete/:id',Checkauth,function(req,res){

    Post.findByIdAndRemove(req.params.id,function(err,rtn){
if(err){
res.status(500).json({
    message:"internal server err",
    error:err
})
}else{
res.status(200).json({
    message:"ok ok ok",

            })
        }
    })
})
    module.exports=router;