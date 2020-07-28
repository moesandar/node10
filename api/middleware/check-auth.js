var  jwt=require('jsonwebtoken');
module.exports=function(req,res,next){

try {
    var token=req.headers.token;

    const decode=jwt.verify(token,'techapi1234');
    console.log(decode);

    next();

    
} catch (error) {

    res.status(401).json({
    message:'auth fail',
    })
    
}


}