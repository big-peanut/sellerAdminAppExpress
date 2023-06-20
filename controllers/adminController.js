const Item = require('../models/items')

exports.addItem=async(req,res,next)=>{
    const item=req.body.item
    const price=req.body.price
    const data=await Item.create({
        item:item,
        price:price
    })
    res.status(201).json({dataValues:data})
}

exports.getItem=async(req,res,next)=>{
    try{
        const items=await Item.findAll()
        res.status(200).json({allitems:items})
    }
    catch(err){
        console.log(err)
    }
}

exports.delItem=async(req,res,next)=>{
    try{
        if(req.params.id=='undefined'){
            console.log("id is missing")
        }
        const Itemid=req.params.id
        await Item.destroy({where:{id: Itemid}})
        console.log('Item removed')
    }
    catch(err){
        console.log(err)
    }
}