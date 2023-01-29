// required packages
const express = require('express')
const {item} = require('../models')
const router = express.Router()
const db = require('../models')

// mount our routes on the router

// GET /:id -- get one item
router.get('/:id', async (req,res) =>{
    try{
       
        const item = await db.Item.findOne({
            _id: req.params.id
        })
        res.json(item)
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'internal server error, contact the system administrator'
        })
    }
})


// GET / -- display all items
router.get('/', async (req,res) =>{
    try{
        const items = await db.Item.find()
        res.json(items)
    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'internal server error, contact the system administrator'
        })
    }
})


// POST /item/new -- create one item 
router.post('/new', async (req,res) =>{
    try{
  // find user
  const existingUser = await db.User.findOne(
    { 
        _id: req.body.user
    })
    // creates a new item
    const newItem = await db.Item.findOneAndUpdate( 
        {name: req.body.name} ,
        { price: req.body.price , 
          category: req.body.category , 
          url: req.body.url } ,
        //upsert is an update or create command
        {upsert: true, new: true}
    )

    //associates user with item
    existingUser.items.push(newItem._id)
    await existingUser.save()

    // associates item with a user
    newItem.userId = existingUser._id
    await newItem.save()

    res.json({msg: 'user created item'})

    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'internal server error, contact the system administrator'
        })
    }
})
// PUT /item/:id -- update one item
router.put('/:id', async (req,res) =>{
    try{

    // update an existing item
    const updateItem = await db.Item.updateOne( 
        {_id: req.params.id} , 
        { 
            $set: {
            name: req.body.name,
            price: req.body.price , 
            category: req.body.category , 
            url: req.body.url
            }
        } ,
        //upsert is an update or create command
        {upsert: true, new: true}
    )

    res.json({msg: `user updated item`})

    } catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'internal server error, contact the system administrator'
        })
    }
})

//DELETE /:id - deletes an item from items table and the reference in the users table
    router.delete('/:id', async (req,res) =>{
        try{
            //get item to delete from items table, need to get info before we delete the table to use in the user table
            const itemToDelete = await db.Item.findOne({
                _id: req.params.id
            })
            
            //find user that created the item in the user table
            const getUser = await db.User.findOne({
                _id: itemToDelete.userId  
            })
           
            //update user table to remove one item from user table
            const deleteFromUser = await db.User.updateOne(
                {_id: itemToDelete.userId},
                {$pull: {items: {$in: [req.params.id]}}}
            )

            //delete entire item from item table
            const deletedItem = await db.Item.findByIdAndDelete(req.params.id)

            res.json('item deleted from items table and from user who created it')
            
        } catch(err){
            console.log(err)
            res.status(500).json({
                msg: 'internal server error, contact the system administrator'
            })
        }
    })



//export the router
module.exports = router
