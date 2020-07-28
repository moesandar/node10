var express=require('express');
var router=express.Router();
var Admin=require('../../model/Admin');
var jwt=require('jsonwebtoken');


router.post('/signup',function(req,res){

    var admin =new Admin();
    admin.name=req.body.name;
    admin.email=req.body.email;
    admin.password= req.body.password;

    admin.save(function(err,rtn){
        if(err){
            res.status(500).json({
                message:"inter server err",
                error:err,
            })

            }else{
                res.status(201).json({
                    message:" admin account create success",
                    admin:rtn,
                })
            }

    })


})

router.post('/signin',function(req,res){

    Admin.findOne({email:req.body.email},function(err,rtn){

        if(err){
            res.status(500).json({
                message:'internal server err',
                error:err
            })
        }
        else{
        if(rtn !=null && Admin.compare(req.body.password,rtn.password)){
        var token=jwt.sign(
            {

            email:rtn.email,
            id:rtn._id,
        },
        "techapi1234",
        {
        expiresIn:"1 hr"}
        
        );
        res.status(200).json({
            message:'it is correct',
            token:token,
        })
}
    
    else{
        res.status(404).json({
            message:"it is incorrect"
        })
    }
}
})
    })
module.exports=router;