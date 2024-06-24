"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("./routes/index");
//const swaggerDocument = YAML.load('./src/swagger.yaml');
const app = (0, express_1.default)();
app.use(express_1.default.json());
//app.use("/api-docs",swaggerui.serve,swaggerui.setup(swaggerDocument))
app.use(index_1.router);
app.use("/", (req, res) => {
    return res.send({
        "200": "Build Done"
    });
});
//FROM PLACE TO PLACE
//AC NON AC SLEEPER SEMI SLEEPER
//SEAT NUMBER CODE
//TICKET PRICE BASED ON SEAT
//CONFIRMATION BOOK
//SIGNUP AND LOGIN
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
//# sourceMappingURL=index.js.map