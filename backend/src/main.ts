require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())

const MODEL = "mistralai/Mistral-7B-Instruct-v0.3";  

app.post('/chat',async(req:any,res:any)=>{
  const {message} = await req.body;

  try{
     const response = await axios.post(
      `https://api-inference.huggingface.co/models/${MODEL}`,
      {
        inputs: message,
        parameters: {
          max_new_tokens: 100,
          temperature: 0.7,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
        },
      }
    );

     const botReply = response.data[0]?.generated_text || "Sorry, no response.";

    res.json({ reply: botReply });
  }
catch(error){
  console.error("OpenAI API Error",error);
  res.status(500).json({msg: "Internal Server Error",error})
}  
});

app.listen(PORT,()=>{
  console.log('Server Started Main')
})