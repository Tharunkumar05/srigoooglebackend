const productModel = require('../models/productModel');
const fs = require('fs');
const slugify = require('slugify');
const mongoose = require('mongoose');

const createProductController = async(req,res) => {
    try{
        const {name,description,slug,price,category,quantity,photo} = req.fields;
        console.log(category);
        switch(true){
            case !name:
                return res.status(500).send({error:"Model Name is Required"})
            case !description:
                return res.status(500).send({error:"Description is Required"})
            case !price:
                return res.status(500).send({error:"Price is Required"})
            case !category:
                return res.status(500).send({error:"Category is Required"})
            case !quantity:
                return res.status(500).send({error:"Model is Required"})
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"Photo is Required and should be less than 1mb"});

        }
        const products = new productModel({...req.fields, slug:slugify(name)})
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Created Successfully',
            products,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in adding Mobile',
        })
    }
}


const getProductController = async(req,res) => {
    try{
        const products = await productModel.find({}); 
        res.status(200).send({
            success: true,
            message: 'All Products',
            products,
            counttotal: products.length,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success: false,
            error: error.message,
            message: 'Error in getting Products',
        })
    }
}

const getSingleProductController = async(req,res) =>{
    try{
        const product  = await productModel.findOne({slug:req.params.slug}).populate("category");
        res.status(200).send({
            success: true,
            message: "Product Fetched ",
            product,
        })
    }
    catch(error){
        console.log(error);
        res.status(200).send({
            success: false,
            message: "Error in getting single product",
            error: error.message,
        })
    }
}



const deleteProductController = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.params.pid);
        res.status(200).send({
            success:true,
            message:'Product Deleted Succcessfully'
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error while deleting product',
            error
        })
    }
}

const updateProductController = async(req,res) =>{
    try{
        const {name,description,slug,price,category,quantity,photo} = req.fields;
        switch(true){
            case !name:
                return res.status(500).send({error:"Model Name is Required"})
            case !description:
                return res.status(500).send({error:"Description is Required"})
            case !price:
                return res.status(500).send({error:"Price is Required"})
            case !category:
                return res.status(500).send({error:"Category is Required"})
            case !quantity:
                return res.status(500).send({error:"Model is Required"})
            case photo && photo.size > 1000000:
                return res.status(500).send({error:"Photo is Required and should be less than 1mb"});
        }
        const products = await productModel.findByIdAndUpdate(req.params.pid,{...req.fields, slug:slugify(name)})
        await products.save();
        res.status(201).send({
            success: true,
            message: 'Product Updated Successfully',
            products,
        })
    }
    catch(error){
        console.log(error);
        res.status(500).send({
            success:false,
            error,
            message:'Error in Updating Product',
        })
    }
}


const productFiltersController = async(req,res)=>{
    try{
        const {checked, radio} = req.body;
        let args = {};
        if(checked.length > 0) args.category = checked;
        if(radio.length) args.price = { $gte: radio[0], $lte: radio[1]};
        const products = await productModel.find(args);
        res.status(200).send({
            success:true,
            products,

        });
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success:false,
            message:'Error While Filtering Products',
            error
        })
    }
}


const searchProductController = async(req,res) =>{
    try{
        const {keyword} = req.params;
        const result = await productModel.find({
            $or:[
                {name:{$regex: keyword, $options:"i"}},
                {description:{$regex: keyword, $options:"i"}},
            ]
        })
        res.json(result)
    }
    catch(error){
        console.log(error);
        res.status(400).send({
            success: false,
            message: 'Error in Searching',
            error
        })
    }
}





module.exports = { createProductController, getProductController, getSingleProductController, deleteProductController, updateProductController, productFiltersController, searchProductController};