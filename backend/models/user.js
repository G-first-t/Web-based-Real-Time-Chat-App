
const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema= new mongoose.Schema({
    username:{type:'string'},
    email:{type:'string',required:true, unique:true},
    password:{type:'string',required:true}
});
//saving password before sending them to db
userSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password = await bcrypt.hash( this.password,10);
    next();
})

//comparing password
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

 module.exports=mongoose.model('User', userSchema)