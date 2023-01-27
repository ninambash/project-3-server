const db = require('./models')

const testCRUD = async () => {
    try{
    // === !! create
        const newItem = new db.item({
        name: 'Silverware Set v2',
        price: 30,
        category: 'Cutlery',
        url: 'https://www.amazon.com/40-Piece-Silverware-Stainless-Restaurant-Dishwasher/dp/B07ZVC6DMM/ref=sr_1_5?crid=3K6PJDHB8IWXC&keywords=kitchen+ware&qid=1674847066&sprefix=kitchen+ware%2Caps%2C89&sr=8-5',
        userId: '63d1b3d91064cb3975e1b733',   
        })
        await newItem.save()

    // // === !read
    //     const foundItem = await db.item.find({
    //         userId: '63d1b3d91064cb3975e1b733'
    //     })
    //     console.log(foundItem)

    // //update
    // const updatedItem = await db.item.findOneAndUpdate(
    //     {name: 'Silverware Set'}, 
    //     {price: '26'}, 
    //     {new: true, upsert: true} 
    //     )
    // console.log(updatedItem)

    // // delete
    // const deleted = await db.item.findOneAndDelete({
    //     name: 'Silverware Set'
    // })
    // console.log(deleted) 

    // process.exit()

    } catch(err) {
        console.log(err)
    }
}

testCRUD()