const categoryModel = require("../models/categoryModel.js");
const slugify = require('slugify');
const mongoose = require('mongoose');

const createCategoryController = async(req,res) =>{
    try{
        const {name} = req.body;
        // console.log(name);
        if(!name){
            return res.status(401).send({message:'Brand is required'})
        }
        const existingCategory = await categoryModel.findOne({name})
        if(existingCategory){
            return res.status(200).send({
                success: true,
                message: 'Brand Already Existed'
            })
        }
        const category = await new categoryModel({name, slug:slugify(name)}).save();
        res.status(201).send({
            success: true,
            message: 'New Brand Added',
            category,
        });

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error in Brand'
        })
    }
};

const updateCategoryController = async(req,res) =>{
    try{
        const {name} = req.body;
        const {id} = req.params;
        const category = await categoryModel.findByIdAndUpdate(id, {name,slug:slugify(name)},{new:true})
        res.status(200).send({
            success: true,
            message: 'Brand Updated Successfully',
            category
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error in Updation'
        })
    }
}

const categoryController = async(req,res) =>{
    try{
        const category = await categoryModel.find({});
        res.status(200).send({
            success:true,
            message: 'All Brands Listed',
            category,
        })

    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting all Brands'
        })
    }
}

const singleCategoryController = async(req,res) =>{
    try{
        const category = await categoryModel.findOne({slug:req.params.slug})
        res.status(200).send({
            success: true,
            message: 'Get Single Brand Successfully',
            category
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while getting single Brand'
        })
    }
}

const deleteCategoryController = async(req,res) =>{
    try{
        const {id} = req.params;
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: 'Brand Deleted Successfully'
        })
    }catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message: 'Error while deleting Brand'
        })
    }
}


module.exports =  {createCategoryController, updateCategoryController, categoryController, singleCategoryController, deleteCategoryController};