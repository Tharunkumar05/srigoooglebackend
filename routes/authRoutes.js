const express = require('express');
const {registerController,loginController,testController,forgotPasswordController} = require('../controllers/authController.js')
const {requireSignIn,isAdmin} = require('../middleware/authMiddleware.js'); 

const router = express.Router()

router.post('/register', registerController)
router.post('/login', loginController)

router.get('/test', requireSignIn, isAdmin, testController)

router.post('/forgot-password', forgotPasswordController)

router.get('/user-auth', requireSignIn, (req,res) =>{
    res.status(200).send({Ok: true});
})

router.get('/admin-auth', requireSignIn,isAdmin, (req,res) =>{
    res.status(200).send({Ok: true});
})

module.exports = router;