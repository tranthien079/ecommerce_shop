const ProductCategory = require('../models/productCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');


const createProductCategory = asyncHandler(async (req, res) => {
    try {
        const newProductCategory = await ProductCategory.create(req.body);
        res.json(newProductCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const updateProductCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updatedProductCategory = await ProductCategory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedProductCategory);
    } catch (error) {
        
    }
})

const deleteProductCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteProductCategory = await ProductCategory.findByIdAndDelete(id);
        res.json(deleteProductCategory);
    } catch (error) {
        
    }
})

const getProductCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
  
    try {
        const findProductCategory = await ProductCategory.findById(id);
     
        res.json(findProductCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const getAllProductCategories = asyncHandler(async (req, res) => {
    try {
        const getProductCategories = await ProductCategory.find().sort({ createdAt: -1 });
        res.json(getProductCategories);
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = {
    createProductCategory,
    updateProductCategory,
    deleteProductCategory,
    getProductCategoryById,
    getAllProductCategories,

}