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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const openai_1 = __importDefault(require("openai"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const openai = new openai_1.default({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
});
app.post('/chat', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { message } = yield req.body;
    console.log(message);
    try {
        const response = yield openai.chat.completions.create({
            model: "openrouter/cypher-alpha:free",
            messages: [
                {
                    "role": "user",
                    "content": message,
                }
            ],
        });
        const reply = response.choices[0].message;
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
