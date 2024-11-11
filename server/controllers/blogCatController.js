const BlogCategory = require('../models/blogCategoryModel');
const asyncHandler = require('express-async-handler');
const validateMongoDbId = require('../utils/validateMongodbId');


const createBlogCategory = asyncHandler(async (req, res) => {
    try {
        const newBlogCategory = await BlogCategory.create(req.body);
        res.json(newBlogCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const updateBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const updatedBlogCategory = await BlogCategory.findByIdAndUpdate(id, req.body, { new: true });
        res.json(updatedBlogCategory);
    } catch (error) {
        
    }
})

const deleteBlogCategory = asyncHandler(async (req, res) => {
    const { id } = req.params
    validateMongoDbId(id)
    try {
        const deleteBlogCategory = await BlogCategory.findByIdAndDelete(id);
        res.json(deleteBlogCategory);
    } catch (error) {
        
    }
})

const getBlogCategoryById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
  
    try {
        const findBlogCategory = await BlogCategory.findById(id);
     
        res.json(findBlogCategory);
    } catch (error) {
        throw new Error(error);
    }
})

const getAllBlogCategories = asyncHandler(async (req, res) => {
    try {
        const getAllBlogCategories = await BlogCategory.find().sort({createdAt: -1});
        res.json(getAllBlogCategories);
    } catch (error) {
        throw new Error(error);
    }
})


module.exports = {
    createBlogCategory,
    updateBlogCategory,
    deleteBlogCategory,
    getBlogCategoryById,
    getAllBlogCategories,

}