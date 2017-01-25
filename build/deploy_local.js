/**
 * Created by Totooria Hyperion on 2016/12/29.
 */
"use strict";
const fs = require("fs");
const path = require("path");
let file = fs.readFileSync(path.resolve(__dirname,'./deploy_constants.js'),'utf-8');
let newFile = file.replace(/\{orderJSHost\}/,'localhost/api/');
fs.writeFileSync(path.resolve(__dirname,'../src/constants/constants.ts'),newFile);