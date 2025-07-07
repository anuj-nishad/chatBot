"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
const MODEL = "mistralai/Mistral-7B-Instruct-v0.3";
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { message } = yield req.body;
    try {
        const response = yield axios.post(`https://api-inference.huggingface.co/models/${MODEL}`, {
            inputs: message,
            parameters: {
                max_new_tokens: 100,
                temperature: 0.7,
            },
        }, {
            headers: {
                Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
            },
        });
        const botReply = ((_a = response.data[0]) === null || _a === void 0 ? void 0 : _a.generated_text) || "Sorry, no response.";
        res.json({ reply: botReply });
    }
    catch (error) {
        console.error("OpenAI API Error", error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
}));
app.listen(PORT, () => {
    console.log('Server Started Main');
});
