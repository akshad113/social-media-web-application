const express = require('express');
const passport = require('passport');
const router = express.Router();



const usersConrtoller = require('../controllers/users_controller');

router.get('/profile',passport.checkAuthentication, usersConrtoller.profile);
router.get('/signIn',usersConrtoller.signIn);
router.get('/signUp',usersConrtoller.signUp);

router.post('/create',usersConrtoller.create);
router.get('/signOut',usersConrtoller.destroySession)
//use passport as a mddleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signIn'},
),usersConrtoller.createSession)




module.exports = router