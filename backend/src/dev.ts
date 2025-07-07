require("dotenv").config();
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
const PORT = 3000;

app.use(cors())
app.use(express.json())

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey : process.env.OPENROUTER_API_KEY,

});

app.post('/chat',async(req:any,res:any)=>{
  const {message} = await req.body;
  console.log(message)

  try{
    const response = await openai.chat.completions.create({
      model: "openrouter/cypher-alpha:free",
      messages: [
        {
          "role": "user",
          "content": message,
        }
      ],
      
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