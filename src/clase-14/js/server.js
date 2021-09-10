"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _expressHandlebars = require("express-handlebars");

var _expressHandlebars2 = _interopRequireDefault(_expressHandlebars);

var _http = require("http");

var _http2 = _interopRequireDefault(_http);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _socket = require("socket.io");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var app = (0, _express2.default)();
var router = _express2.default.Router();
var server = _http2.default.createServer(app);
var ioServer = new _socket.Server(server);

server.listen(8080, function () {
  console.log("Server ON");
});

server.on("error", function () {
  console.log("Error iniciando el server");
});

var ENGINE_NAME = "hbs";

app.engine(ENGINE_NAME, (0, _expressHandlebars2.default)({
  extname: "." + ENGINE_NAME,
  layoutsDir: __dirname + "/views/layouts",
  defaultLayout: "index.hbs"
}));

app.set("view engine", ENGINE_NAME);
app.set("views", "./views");

app.use(_express2.default.static("public"));
app.use(_express2.default.json());
app.use(_express2.default.urlencoded({ extended: true }));
app.use('/api', router);

app.get("/", function (_req, res) {
  res.sendFile("index.html", { root: _path2.default.join(__dirname, './public') });
});

var messages = [];
ioServer.on("connection", function (socket) {
  socket.emit("productList", Utils.getAllProducts());
  socket.emit("messageList", messages);

  socket.on("new-message", function (data) {
    data.date = getActualDate();
    messages.push(data);
    ioServer.sockets.emit("messageList", messages);
  });
});

app.get("/productos/vista", function (_, res) {
  var data = Utils.getAllProducts();
  res.render("main.hbs", { data: data });
});

router.get('/productos/listar', function (_, res) {
  var products = Utils.getAllProducts();
  res.json(products.length ? products : { error: 'No hay productos cargados.' });
});

router.get('/productos/listar/:id', function (req, res) {
  var product = Utils.getProductByID(Number(req.params.id));
  res.json(product ? product : { error: 'Producto no encontrado.' });
});

router.post('/productos/guardar', function (req, res) {
  Utils.saveProduct(req.body);
  var products = Utils.getAllProducts();
  ioServer.sockets.emit("productList", products);
  res.redirect('/');
});

router.put('/productos/actualizar/:id', function (req, res) {
  var updatedProduct = Utils.updateProduct(req.body, Number(req.params.id));
  res.send(updatedProduct);
});

router.delete('/productos/borrar/:id', function (req, res) {
  var deletedProduct = Utils.deleteProduct(Number(req.params.id));
  res.send(deletedProduct);
});

/// utils
var data = [];

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: "getAllProducts",
    value: function getAllProducts() {
      return data;
    }
  }, {
    key: "getProductByID",
    value: function getProductByID(id) {
      return data.find(function (product) {
        return product.id === id;
      });
    }
  }, {
    key: "saveProduct",
    value: function saveProduct(product) {
      var id = 1;
      if (data.length) {
        var productIds = data.map(function (product) {
          return product.id;
        });
        id = Math.max.apply(Math, _toConsumableArray(productIds)) + 1;
      }
      product['id'] = id;
      data.push(product);
    }
  }, {
    key: "updateProduct",
    value: function updateProduct(product, id) {
      var productIndexToUpdate = data.findIndex(function (product) {
        return product.id === id;
      });
      if (productIndexToUpdate !== -1) {
        data[productIndexToUpdate] = _extends({}, product, { id: id });
        return product;
      } else {
        return { error: 'Producto no encontrado.' };
      };
    }
  }, {
    key: "deleteProduct",
    value: function deleteProduct(id) {
      var productIndexToDelete = data.findIndex(function (product) {
        return product.id === id;
      });
      if (productIndexToDelete !== -1) {
        var productToDelete = data[productIndexToDelete];
        data.splice(productIndexToDelete, 1);
        return productToDelete;
      } else {
        return { error: 'Producto no encontrado.' };
      };
    }
  }]);

  return Utils;
}();

;

var getActualDate = function getActualDate() {
  var date = new Date();

  var day = date.getDate();
  if (day < 10) day = "0" + day;

  var month = date.getMonth() + 1;
  if (month < 10) month = "0" + month;

  var year = date.getFullYear();

  var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
  var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  var seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

  return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
};
