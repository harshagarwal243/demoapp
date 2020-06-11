const express = require('express');
const router = express.Router();
const { signup , signin } = require('../controllers/auth.js')
const { check } = require('express-validator')

//Routes

router.post('/signup',[ check('name','name should be at least 3 char').isLength({min : 3}),
                        check('email','should be email').isEmail(),
                        check('password','password must be at least 5 char').isLength({min : 5})] , signup);

router.post('/signin',[ check('email','should be email').isEmail(),
                        check('password','password must be there').isLength({min : 1})],signin);


// exports
module.exports =  router 