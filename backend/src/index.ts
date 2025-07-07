require("dotenv").config();
const express = require("express");
const cors = require("cors");
import OpenAI from "openai";

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  apiKey : process.env.OPENAI_API_KEY,
});

app.post('/chat',async(req:any,res:any)=>{
  const {message} = await req.body;

  try{
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: message}]
    });

    const reply = response.choices[0].message.content;

    res.json({reply});
  }
catch(error){
  console.error("OpenAI API Error",error);
  res.status(500).json({msg: "Internal Server Error",error})
}  
});

app.listen(PORT,()=>{
  console.log('Server Started')
})