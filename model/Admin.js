var mongoose=require("mongoose");
var Schema=mongoose.Schema;
var bcrypt=require('bcryptjs');
var AdminShema=new Schema({

    name:{
        type:String,
        required:true
    },
    
    email:{
        type:String,
        required:true
    },
    
password:{
        type:String,
        required:true
    },


})

AdminShema.pre("save",function(next){
    this.password=bcrypt.hashSync(this.password,
         bcrypt.genSaltSync(8),null);
         next();
})

AdminShema.statics.compare=function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
};


module.exports=mongoose.model("Admin",AdminShema);