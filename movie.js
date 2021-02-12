const {check , validationResult} = require('express-validator');
const express = require('express');
const router = express.Router();
const Movie=require('../models/movie');
const movie = require('../models/movie');

 router.get('/', async (req, res) => {
  const movies = await Movie.find().sort('name');
  res.send(movies);
}); 

router.post('/',[
    check("title" , "it is required").isLength({min:5 , max:255}),
    check("numberInStock","it is required").isNumeric(),
    check("dailyRentalRate" ,"it is required").isNumeric()
],async(req,res)=>{
    const err = validationResult(req)
    if(!err.isEmpty()){
        res.status(400).send(err)
    } else{

      try {
        //console.log(req.body.title)
        const movie = new Movie({ 
            title: req.body.title,
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate
          });
          await movie.save();
        
          res.json(movie);
       
      } catch (error) {
       res.json(error)   
      }
    }
    
});


 router.put('/:id',[
    check("title" , "it is required").isLength({min:5 , max:255}),
    check("numberInStock","it is required").isNumeric(),
    check("dailyRentalRate" ,"it is required").isNumeric()
 ] , async(req,res)=>{
     const err = validationResult(req)
     if(!err.isEmpty()){
         res.status(400).send(err)
     }
     else{
        try {
            // console.log(req.params.id)
         const movie = await Movie.findByIdAndUpdate(req.params.id ,{
            title:req.body.title,
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate
        },{new:true})
        res.json(movie)
        } catch (error) {
            res.json(error)
        }
     }
     

 });
  
 router.delete("/:id",async(req,res)=>{
  
         try {
            const movie = await Movie.findByIdAndRemove(req.params.id) 
            if(movie)
            {
                res.json(" deleted successfully !")
            }
             else
             {
                res.json("Data is already Deleted")
             }
             
         } catch (error) {
             res.status(404).json(error)
             
         }
         
     })

     router.get("/:id" , async(req,res)=>{
         try {
            const movie = await Movie.findById(req.params.id)
            res.json("Data not Found")
         } catch (error) {
             res.status(404).json(error)
         }
     })
 
module.exports = router; 