"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
    res.render("index", {
        title: "Welcome to Tracking app"
    });
});
const PORT = 8080;
app.listen(PORT, () => console.log(`server running at http://localhost:${PORT}`));