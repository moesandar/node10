var express = require('express');
var router = express.Router();
var User=require('../model/User');
var bcrypt=require('bcryptjs');
var validator=require('email-validator');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


router.get('/useradd',function(req,res){
  res.render('user/user-add');
})

router.post('/useradd',function(req,res){
var user=new User();
user.name=req.body.uname;
user.email=req.body.uemail;
user.passward=req.body.upassward;
user.save(function(err,rtn){
  if(err)throw err;
  console.log(rtn);
  res.redirect('/users/userlist')
  })

})
router.get('/userlist',function(req,res){
  User.find(function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.render('user/user-list',{users:rtn});

  } )
})

router.get('/userdetail/:id',function(req,res){
User.findById(req.params.id,function(err,rtn){
  if(err)throw err;
  res.render('user/user-detail',{user:rtn});
})
})

router.get('/userupdate/:id',function(req,res){
  User.findById(req.params.id,function(err,rtn){
    if(err)throw err;
    res.render('user/user-update',{user:rtn});

  })

})
 

router.post('/userupdate',function(req,res){
  update={
    name:req.body.uname,
    email:req.body.uemail,
    passward:bcrypt.hashSync(req.body.upassward,bcrypt.genSaltSync(8),null)
};

User.findByIdAndUpdate(req.body.id,{$set:update},function(err,rtn){
  if(err)throw err;
  console.log(rtn);
  res.redirect('/users/userlist');
})
})
router.get('/userdelete/:id',function(req,res){
  User.findByIdAndRemove(req.params.id,function(err,rtn){
    if(err)throw err;
    console.log(rtn);
    res.redirect('/users/userlist');

  })
})
router.post('/emaildu',function(req,res){
  User.findOne({email:req.body.uemail},
    function(err,rtn){
      if(err) throw err;
      if(rtn ==null && validator.validate(req.body.uemail)){
        res.json({status:false});
      }else{
        res.json({status:true});
      }
    })
})
module.exports = router;
