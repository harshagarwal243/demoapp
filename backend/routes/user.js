const express = require('express');
const router = express.Router();
const { isSignedIn , isAuthorized } = require('../controllers/auth')
const { getUserById , getUser } = require('../controllers/user')

//Params
router.param('userId',getUserById)


//routes

router.get('/user/:userId',isSignedIn,isAuthorized,getUser)

module.exports = router ;