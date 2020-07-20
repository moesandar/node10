var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var bcrypt=require('bcryptjs');
var UserSchema= new Schema({
    name:{
        type:String,
        required:true        
    },
    email:{
        type:String,
        required:true        
    },
    passward:{
        type:String,
        required:true        
    }
})

UserSchema.pre("save",function(next){
    this.passward=bcrypt.hashSync(this.passward,
         bcrypt.genSaltSync(8),null);
         next();
})

UserSchema.statics.compare=function(cleartext,encrypted){
    return bcrypt.compareSync(cleartext,encrypted);
};  

module.exports=mongoose.model('Users',UserSchema);