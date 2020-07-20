var express = require('express');
var router = express.Router();
var User=require('../model/User');
var Admin=require('../model/Admin');
var validator=require('email-validator');
var passwordValidator = require('password-validator');
var schema=new passwordValidator();

/* GET home page. */
schema
.is().min(8)                                    // Minimum length 8
.is().max(100)                                  // Maximum length 100
.has().uppercase()                              // Must have uppercase letters
.has().lowercase()                              // Must have lowercase letters
.has().digits()                                 // Must have digits
.has().not().spaces()                           // Should not have spaces
.is().not().oneOf(['Passw0rd', 'Password123']); 

router.get('/', function(req, res, next) {
  var user=req.session.user? req.session.user.name:"unknown";
  console.log(user);
  res.render('index', { user: user });
})

router.get('/home',function(req,res){
  res.render("home",{name:'justin bieber'});
})

router.get('/signup',function(req,res){
  res.render('signup');

})

router.post('/signup',function(req,res){
  var admin=new Admin();
  admin.name=req.body.name;
  admin.email=req.body.email;
  admin.password=req.body.pass;

  admin.save(function(err,rtn){
    if(err) throw err;
    console.log(rtn);
    res.redirect('/');
  })
})

router.get("/signin", function(req,res){
  res.render("signin");
})

router.post('/signin',function(req,res){
  Admin.findOne({email:req.body.email},function(err,rtn){
    if(err) throw err;
    if(rtn !=null && Admin.compare(req.body.pwd,rtn.password)){
     
      req.session.user={name:rtn.name,email:rtn.email};
      res.redirect('/')

    }else{
      res.redirect('/signin')
    }

  })  })

  router.get('/logout',function(req,res){
    req.session.destroy(function(err,rtn){
      if(err)throw err;
      res.redirect("/");
    })
  })

  router.post('/emaildu',function(req,res){
    Admin.findOne({email:req.body.email},
      function(err,rtn){
        if(err) throw err;
        if(rtn ==null && validator.validate(req.body.email)){
          res.json({status:false});
        }else{
          res.json({status:true});
        }
      })
  })
  
  router.post('/passval',function(req,res){
    res.json({status:schema.validate(req.body.pass)});
  })
module.exports = router;
