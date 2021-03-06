const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product');

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling GET requests to /products'
    });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    console.log('before saving')
    product
        .save()
        .then(result => {
            console.log('hello this is in result',result)
            res.status(201).json({
                message: 'Handling POST requests to /products',
                createdProduct: product
            });
        })
        .catch( err => {
            console.log(err)
            res.status(500).json({
                error: err
            });
        })

});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    console.log(id)
    Product.findById(id)
        .exec()
        .then( doc => {
            console.log("from database", doc);
            res.status(200).json(doc);
        })
        .catch( err => {
            console.log(err);
            res.status(500).json({error:err})
        })
    
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated product!'
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Deleted product!'
    });
});

module.exports = router;