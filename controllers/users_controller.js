const User = require("../models/user")


module.exports.profile = function(req,res){
     
    return res.render("user_profile",{
        title:'Profile'
    })
 }

 module.exports.signIn = function(req,res){
     return res.render('user_sign_in',{
         title:'Codeial | Sign In' 
     })
 }

 module.exports.signUp = function(req,res){
     return res.render('user_sign_up',{
         title: 'Codeial | Sign Up'
     })
 }


// get the sign up data
module.exports.create=function(req,res){
    // if(req.body.password != req.body.confirm__password){
    //     return res.redirect('back');
    // }
    // User.findOne({email:req.body.email},function(err,user){
    //     if(err){
    //         console.log("erro in finding user in signing up");
    //         return;
    //     }

    //     if(!user){
    //         User.create(req.body, function(err,user){
    //             if(err){
    //             console.log("Error in creating user while signing up");
    //             return;
    //             } 
    //             return res.redirect("/users/sign-in");
    //         })
    //     }else{
    //         return res.redirect('back');
    //     }
    // })

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log("Error while searching user email");
            return;
        }
        if(!user){
            User.create(req.body,function(err,user){ 
                if(err){
                    console.log("Error while creating the user in signUp");
                    return;
                }
                return res.redirect('/users/signIn');
            })
        }else{
            return res.redirect('back');
        }
        
    })
}



// sign in and create a session for the user
module.exports.createSession = function(req,res){
    //create todo
}