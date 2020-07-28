var express=require("express");
var router=express.Router();
var bcrypt=require("bcryptjs");
var  User=require("../../model/User");
var Checkauth=require("../middleware/check-auth");
const { param } = require("../../routes/users");
const Post = require("../../model/Post");
router.get('/tests',function(req,res){

  res.status(200).json({message:"testing"}) ;

})

router.get('/list',Checkauth,function(req,res){
   
    User.find(function(err,rtn){
        if(err){
        res.status(500).json({
            message:"internal server error",
            error:err,
        });
    }
    else{
        res.status(200).json({
            users:rtn,
        });
    }
    });
    });

    router.post("/add",Checkauth,function(req,res){

        User.findOne({email:req.body.email},function(err2,rtn2){
            if(err2){
                res.status(500).json({
                    message:"inter server err",
                    error:err2,
                })
            }
            if(rtn2 != null){

                res.status(500).json({
                    message:"duplicate email",
                   
                })
            }
            else{
        
        var user=new User();
        user.name=req.body.name;
        user.email=req.body.email;
        user.passward=req.body.passward;

        user.save(function(err,rtn){
            if(err){
                res.status(500).json({
                    message:"inter server err",
                    error:err,
                })

                }else{
                    res.status(201).json({
                        message:"create success",
                        users:rtn,
                    })
                }
            })
        }
                 
        });
        });

        router.get('/detail/:id',Checkauth,function(req,res){
            User.findById(req.params.id,function(err,rtn){
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
                        users:rtn
                    })
                }
            
                
            })
        })

            router.patch('/:id',Checkauth,function(req,res){
            
                var update={
                name:req.body.name,
                email:req.body.email,
                passward:bcrypt.hashSync(req.body.passward,bcrypt.genSaltSync(8),null)

                }

            User.findByIdAndUpdate(req.params.id,{$set:update},function(err,rtn){

                if(err){
                        res.status(500).json({
                            message:'internal server err',
                            error:err,
                        }) 
                }else{
                    res.status(200).json({
                        message:"created update",
                        users:rtn
                    })
                }
            })
        })

    router.delete('/delete/:id',Checkauth,function(req,res){

        User.findByIdAndRemove(req.params.id,function(err,rtn){
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