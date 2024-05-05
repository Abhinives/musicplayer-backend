const express = require('express');
const router = express.Router();
const user = require('../models/login');


router.get('/login', async(req, res)=>{
   try{
    user.find().then((details)=>{
        res.status(200).json({userInfo: details});
    })
    .catch((err)=>{
        res.status(500).json({err: err});
    })
   }
   catch(err){
    res.status(500).json({error: err});
   }
})
router.post('/findUser', async(req,res)=>{
    try{
        const {username, password} = req.body;
        const details = await user.findOne({username});
        if(details!==null){
            if(details.username===username && details.password===password){
                res.status(200).json({status:'Success'});
            }
            else if(details.username===username && details.password!==password){
                res.status(500).json({status:'Password is incorrect'});
            }
     
        }
        else{
            res.status(404).json({msg:'User not found'});
        }
    }
    catch(err){
        res.status(500).json({error: err});
    }
})
router.post('/login', async(req, res)=>{
    try{
        console.log(req.body);
        const newUser = new user(req.body);
        await newUser.save()
        .then((data) => {
            console.log('Saved');
            res.status(200).json({ 'msg': 'saved' });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ 'msg': 'unable to save' });
        });
    }
    catch(err){
        res.status(500).json({error: err});
    }
});
module.exports = router;
