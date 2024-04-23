const express=require('express');
const CrudController=require('../controller/CrudController')


const router=express.Router();


router.post('/Create',CrudController.Create)
router.get('/Read',CrudController.Read)
router.post('/Update',CrudController.Update)
router.get('/Delete',CrudController.Delete)



module.exports=router;