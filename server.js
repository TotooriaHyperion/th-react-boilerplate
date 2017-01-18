const express = require('express');
const app = express();
const fs = require('fs');
const compress = require('compression');
const path = require("path");
 
app.use(compress());
app.use("/",express.static("./dist"));

app.get("/api", function (req, res) {
	res.end(JSON.stringify(req.query));
});

app.get('*', function (req, res) {
	fs.readFile("./dist/index.html",'utf-8',function(err,data){
		res.end(data);
	});
});
 
app.listen(11344);