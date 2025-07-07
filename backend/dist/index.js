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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const openai_1 = __importDefault(require("openai"));
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = yield req.body;
    try {
        const response = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: message }]
        });
        const reply = response.choices[0].message.content;
        res.json({ reply });
    }
    catch (error) {
        console.error("OpenAI API Error", error);
        res.status(500).json({ msg: "Internal Server Error", error });
    }
}));
app.listen(PORT, () => {
    console.log('Server Started');
});
