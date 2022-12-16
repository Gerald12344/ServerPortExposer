"use strict";
// Open some ports \\
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var dotenv_1 = require("dotenv");
var Mongodb_1 = __importDefault(require("./Mongodb"));
var Tunnel_1 = require("./Tunnel");
(0, dotenv_1.config)();
(0, Mongodb_1["default"])().then(function () {
    var tunnelData = [
        { port: "9000", tunnelName: "PORTAINER" },
        { port: "22", tunnelName: "PORTAINER_SSH" },
    ];
    tunnelData.forEach(function (_a) {
        var port = _a.port, tunnelName = _a.tunnelName;
        (0, Tunnel_1.setupTunnel)(port, tunnelName);
    });
});
