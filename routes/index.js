const express = require('express');
const router = express.Router();
const ListSchema = require('../models/list');
// router.get('/', (req, res, next)=>{
//     ListSchema.find()
//     .then(items => res.json(items))
// });

router.get('/',(req,res,next)=>{
    ListSchema.find({},(err, listItem)=>{
        if(err) console.log(err);
        else{
            res.json(listItem)
        }
    })
    .sort({date:-1})
    console.log(`GET REQUEST RECIEVED****`);
});

router.post('/postItems', (req,res)=>{
    const newList = new ListSchema({
        name: req.body.name,
        description: req.body.description,
    });
    newList.save()
    .then(postedList => 
        res.json({
         postedList,
         msg:console.log(`Request Posted`)
    })
        )
    .catch(err => res.json({
        Success:false,
        message:console.log(`FAILED TO POSTED****, STH MISSING ${err}`)
       }));
}) 

router.delete('/removeItem/:id',  async (req, res) => {
    try {
      let listItemId = await ListSchema.findById(req.params.id)
        await listItemId.remove(
            {
                 id: req.params.id,
                 msg:console.log(`ITEM DELETED***`)
             })
    } catch (err) {
      console.error(err)
      res.json({
          msg:console.log(err)
        })
    }
});

// router.delete('/removeItem/:id', (req,res)=>{
//     ListSchema.findById(req.params.id)
//     .then(listItemId => listItemId
//        .remove()
//        .then(()=> res.json({
//            Success:console.log(`ITEM DELETED`)
//         })))
//        .catch(err=>res.json({
//            Success:console.log(`FAILED TO POSTED****, STH MISSING`)
//         })) 
//  });


// router.put('/update/:id', (req, res)=>{
    //     ListSchema.findByIdAndUpdate(
//         {
//         _id: req.params.id
//         }, 
//         req.body,
//         {
//         new:true
//         }
//     ).save()
//     .catch(err=> res.json({
//         msg:console.log(`ERROR #### ${err}`)
//     }))
// })




module.exports= router;