const express = require('express');
const { resolve } = require('path');

const mongoose=require('mongoose')
const user=require('./schema');
const users = require('./schema');

const app = express();
const port = 3010;

const connectdb=mongoose.connect('mongodb://localhost:27017/RESTAURANTMENU')
.then(()=>{
  console.log("connected to database")
})
.catch((err)=>{
  console.log(err)
})

app.use(express.json())

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});

app.post('/menu',async(req,res)=>{
  try{
  const{name ,description,price}=req.body
  const newmenu= new users({name,description,price})
  await newmenu.save()
  res.status(200).json(newmenu)
  }
  catch(err){
    res.status(500).json({message:err})
  }
})




app.get('/menu:id',async(req,res)=>{
  try{
  const id=req.params.id
  const data=await user.findById(id)
  res.status(200).json(data)}
  catch(err){
    res.status(404).json({message:err.message})
  }
})


app.delete('/menu/:id',async(req,res)=>{
  try{
    const id=req.params.id;
    const data=await user.findByIdAndDelete(id)
    res.status(200).json("data deleted")
  }
  catch(err){
    res.status(404).json({message:err})
  }
})





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
