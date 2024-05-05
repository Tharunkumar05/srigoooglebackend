const contactModel = require('../models/contactModel');
const mongoose = require('mongoose');


const contactController = async(req,res) => {
    try{
        const {firstname, lastname, email, phone, qns, optional} = req.body;
        const contact = new contactModel({...req.body}).save();
        res.status(201).send({
            success: true,
            message: 'Submitted Successfully',
            contact,
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error occured',
        })
    }
}


const getContactController = async(req,res) =>{
    try{
        const contacts = await contactModel.find({});
        res.status(200).send({
            success: true,
            message: 'All Contacts',
            contacts,
            counttotal: contacts.length,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in getting Contacts',
        })
    }
}


const deleteContactController = async(req,res)=>{
    try{
        const {id} = req.params;
        await contactModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Contact Deleted Successfully'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while deleting contact'
        })
    }
}

module.exports = {contactController, getContactController, deleteContactController };