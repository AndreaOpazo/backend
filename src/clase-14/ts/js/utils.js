"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActualDate = void 0;
var data_1 = __importDefault(require("./data"));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.getAllProducts = function () {
        return data_1.default;
    };
    ;
    Utils.getProductByID = function (id) {
        return data_1.default.find(function (product) { return product.id === id; });
    };
    ;
    Utils.saveProduct = function (product) {
        var id = 1;
        if (data_1.default.length) {
            var productIds = data_1.default.map(function (product) { return product.id; });
            id = Math.max.apply(Math, productIds) + 1;
        }
        product['id'] = id;
        data_1.default.push(product);
    };
    ;
    Utils.updateProduct = function (product, id) {
        var productIndexToUpdate = data_1.default.findIndex(function (product) { return product.id === id; });
        if (productIndexToUpdate !== -1) {
            data_1.default[productIndexToUpdate] = __assign(__assign({}, product), { id: id });
            return product;
        }
        else {
            return { error: 'Producto no encontrado.' };
        }
        ;
    };
    ;
    Utils.deleteProduct = function (id) {
        var productIndexToDelete = data_1.default.findIndex(function (product) { return product.id === id; });
        if (productIndexToDelete !== -1) {
            var productToDelete = data_1.default[productIndexToDelete];
            data_1.default.splice(productIndexToDelete, 1);
            return productToDelete;
        }
        else {
            return { error: 'Producto no encontrado.' };
        }
        ;
    };
    ;
    return Utils;
}());
;
var getActualDate = function () {
    var date = new Date();
    var day = date.getDate();
    if (day < 10)
        day = "0" + day;
    var month = date.getMonth() + 1;
    if (month < 10)
        month = "0" + month;
    var year = date.getFullYear();
    var hours = (date.getHours() < 10 ? '0' : '') + date.getHours();
    var minutes = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    var seconds = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    return day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
};
exports.getActualDate = getActualDate;
exports.default = Utils;
