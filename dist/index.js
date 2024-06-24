"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const path_1 = __importDefault(require("path"));
const index_1 = require("./routes/index");
const yamljs_1 = __importDefault(require("yamljs"));
const swaggerDocument = yamljs_1.default.load(path_1.default.join(__dirname, '/swagger.yaml'));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
app.use(index_1.router);
app.use("/", (req, res) => {
    return res.send({
        "200": "Build Done"
    });
});
const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`);
});
//# sourceMappingURL=index.js.map