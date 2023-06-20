const express=require('express')
const controller=require('../controllers/adminController')

const router=express.Router()

router.post('/additem',controller.addItem)

router.get('/getitem',controller.getItem)

router.delete('/delitem/:id',controller.delItem)

module.exports=router