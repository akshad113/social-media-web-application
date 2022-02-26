const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy;
const User= require('../models/user')

// authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email',
    passReqToCallback:true,
},
function(req,email,password,done){
    //find the user and establish the identity
    User.findOne({email:email},function(error,user){
        if(error){
            req.flash("error",err);
            return done(err);
        }
        if(!user || user.password != password){
           req.flash('error',"Invalid Username/Password");
            return done(null,false);
        }

        return done(null,user);
    })

}
));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);
})


// deserializing the suer from the key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log("Error in finding user --> passport");
            return done(err);
        }
        return done(null,user);
    })
});



// check if user is auathenticated
passport.checkAuthentication = function(req,res,next){
    // if user is signed in , then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }
    // if the user is not signed in 
    return res.redirect('/users/signIn');
}

passport.setAuthenticatedUser = function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contain the current signed in user from the session cookie and we are just ending this to thelocals for the view
        res.locals.user = req.user; 
    }
    next();
}

module.exports = passport;