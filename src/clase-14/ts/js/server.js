"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var express_handlebars_1 = __importDefault(require("express-handlebars"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var socket_io_1 = require("socket.io");
var utils_1 = __importStar(require("./utils"));
var app = express_1.default();
var router = express_1.default.Router();
var server = http_1.default.createServer(app);
var ioServer = new socket_io_1.Server(server);
server.listen(8080, function () {
    console.log("Server ON");
});
server.on("error", function (error) {
    console.log(error);
});
var ENGINE_NAME = "hbs";
app.engine(ENGINE_NAME, express_handlebars_1.default({
    extname: "." + ENGINE_NAME,
    layoutsDir: __dirname + "/views/layouts",
    defaultLayout: "index.hbs",
}));
app.set("view engine", ENGINE_NAME);
app.set("views", "./views");
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', router);
app.get("/", function (_req, res) {
    res.sendFile("index.html", { root: path_1.default.join(__dirname, './public') });
});
var messages = [];
ioServer.on("connection", function (socket) {
    socket.emit("productList", utils_1.default.getAllProducts());
    socket.emit("messageList", messages);
    socket.on("new-message", function (data) {
        data.date = utils_1.getActualDate();
        messages.push(data);
        ioServer.sockets.emit("messageList", messages);
    });
});
app.get("/productos/vista", function (_, res) {
    var data = utils_1.default.getAllProducts();
    res.render("main.hbs", { data: data });
});
router.get('/productos/listar', function (_, res) {
    var products = utils_1.default.getAllProducts();
    res.json(products.length ? products : { error: 'No hay productos cargados.' });
});
router.get('/productos/listar/:id', function (req, res) {
    var product = utils_1.default.getProductByID(Number(req.params.id));
    res.json(product !== null && product !== void 0 ? product : { error: 'Producto no encontrado.' });
});
router.post('/productos/guardar', function (req, res) {
    utils_1.default.saveProduct(req.body);
    var products = utils_1.default.getAllProducts();
    ioServer.sockets.emit("productList", products);
    res.redirect('/');
});
router.put('/productos/actualizar/:id', function (req, res) {
    var updatedProduct = utils_1.default.updateProduct(req.body, Number(req.params.id));
    res.send(updatedProduct);
});
router.delete('/productos/borrar/:id', function (req, res) {
    var deletedProduct = utils_1.default.deleteProduct(Number(req.params.id));
    res.send(deletedProduct);
});
