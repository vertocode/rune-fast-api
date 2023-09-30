"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 3000;
const API_URL = 'https://secure.runescape.com';
const options = {
    origin: '*'
};
app.use((0, cors_1.default)(options));
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Rune Fast API');
});
app.get('/categories', (req, res) => {
    const filePath = path_1.default.join(__dirname, 'data', 'categories.json');
    try {
        const categories = fs.readFileSync(filePath, 'utf-8');
        res.send(categories);
    }
    catch (error) {
        console.error('Error reading categories.json:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.get('/rank-players/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const response = yield (0, axios_1.default)(`${API_URL}/m=hiscore/ranking.json?table=9&category=${params.id}&size=50`);
    res.send({ players: response.data });
}));
app.get('/rank-clans', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const response = yield (0, axios_1.default)(`${API_URL}/m=clan-hiscores/clanRanking.json`);
    res.send({ clans: response.data });
}));
app.get('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const params = req.params;
    const response = yield (0, axios_1.default)(`${API_URL}/m=itemdb_rs/api/catalogue/category.json?category=${params.id}`);
    const letterWithItems = response.data.alpha.map(({ letter, items }) => !!items ? letter : null).filter((letter) => letter);
    const response2 = yield (0, axios_1.default)(`${API_URL}/m=itemdb_rs/api/catalogue/items.json?category=${params.id}&alpha=${letterWithItems[0]}&page=1`);
    const allItemsByCategory = yield Promise.all(letterWithItems.map((letter) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, axios_1.default)(`${API_URL}/m=itemdb_rs/api/catalogue/items.json?category=${params.id}&alpha=${letter}&page=1`);
        return response.data.items;
    })));
    res.send({ items: allItemsByCategory.flat() });
}));
app.listen(port, () => {
    console.log(`⚡️[server]: Rune Fast API is running at http://localhost:${port}`);
});
module.exports = app;
