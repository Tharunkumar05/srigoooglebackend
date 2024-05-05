const userModel = require("../models/userModel");
const {hashPassword,comparePassword} = require('../helpers/authHelper');
const JWT = require('jsonwebtoken');
const registerController = async(req,res) =>{
    try{
        const {name,email,password,answer} = req.body;
        // validation
        if(!name){
            return res.send({message: 'Name is Required'})
        }
        if(!email){
            return res.send({message: 'Email is Required'})
        }
        if(!password){
            return res.send({message: 'Password is Required'})
        }
        if(!answer){
            return res.send({message: 'Answer is Required'})
        }
        // if(!role){
        //     return res.send({error: 'Role is Required'})
        // }

        const existingUser = await userModel.findOne({email})
        if(existingUser){
            return res.status(200).send({
                success: false,
                message:"Already Registered please login",
            })
        }
        const hashedPassword = await hashPassword(password)

        const user = new userModel({name, email, password:hashedPassword,answer}).save()
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    
    }
};

const loginController = async(req,res) =>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: "Invalid email or password"
            })
        }
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success: false,
                message:'Email is not registered' 
            })
        }
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success:false,
                message: 'Invalid Password'
            })
        }
        const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: 'login succesfully',
            user:{
                name:user.name,
                email:user.email,
            },
            token,
        });
        
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error,
        })
    }
}

const forgotPasswordController = async(req,res) =>{
    try{
        const {email,answer,newPassword} = req.body;
        if(!email){
            res.status(400).send({message: 'Email is required'})
        }
        if(!answer){
            res.status(400).send({message: 'Answer is required'})
        }
        if(!newPassword){
            res.status(400).send({message: 'New password is required'})
        }
        const user = await userModel.findOne({email,answer})

        if(!user){
            return res.status(404).send({
                success: false,
                message: 'Wrong Email 0r Answer',
            })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id,{password: hashed});
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully',
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something went wrong',
            error
        })
    }

}


const testController = (req,res)=>{
    try{
        res.send("Protected Routes");
    }catch (error){
        console.log(error);
        res.send({error});
    }
}

module.exports =  {registerController,loginController,testController,forgotPasswordController};