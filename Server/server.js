var express = require('express');
var fs = require('fs');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'aplication/json'}));

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Credentails", true);
    next();
});

app.get('/', function (req, res) {
    res.send('ok');
});

app.post('/', function (req, res) {
    var obj = req.body;
    var parsedUsers = JSON.parse(obj);
    readUsersFile(parsedUsers, res);
});

function readUsersFile(parsedUsers, res){
    fs.readFile('users.json', 'utf8', function(err, users) {
        var parsedData = JSON.parse(users);
        var resUserID = checkUsersID(parsedData, parsedUsers);
        if(resUserID) {
            return res.status(200).send(JSON.stringify(resUserID));
        } else {
            return res.status(401).send(JSON.stringify('Not found'));
        }
    });
}

function checkUsersID(parsedData, parsedUsers) {
    for(let i = 0; i < parsedData.length; i++){
        if (parsedData[i].login == parsedUsers.login && parsedData[i].password == parsedUsers.password) {
            return parsedData[i].id;
        }
    }
    return false;
};

app.post('/newUser', function (req, res) {
    var newObj = req.body;
    var parsedNewUser = JSON.parse(newObj);
    readNewUserFile(parsedNewUser, res);
});

function readNewUserFile(parsedNewUser, res){
    fs.readFile('users.json', 'utf8', function(err, users) {
        var newParsedData = JSON.parse(users);
        var resNewUser = createNewUserID(newParsedData, parsedNewUser);
        if(resNewUser) {
            result = JSON.stringify(resNewUser);
            fs.writeFile('users.json',result, function(err){
            });
            console.log(parsedNewUser, 'new user data');
            return res.status(200).send(JSON.stringify(resNewUser));
        } else {
            return res.status(403).send(JSON.stringify('This user already exists'));
        }
    });
};

function createNewUserID(newParsedData, parsedNewUser) {
    for(let i = 0; i < newParsedData.length; i++){
        if (newParsedData[i].login == parsedNewUser.login) {
            return false;
        }
    }
    parsedNewUser.id = JSON.stringify(newParsedData.length + 1);
    newParsedData.push(parsedNewUser);
    return newParsedData;
};

app.post('/order/new', function (req, res) {
    var newOrder = req.body;
    var parsedNewOrder = JSON.parse(newOrder);
    console.log(parsedNewOrder,'new order info');
    readNewOrderFile(parsedNewOrder, res);
});

function readNewOrderFile(parsedNewOrder, res){
    fs.readFile('orders/orders.json', 'utf8', function(err, orders) {
        var newParsedData = JSON.parse(orders);
        var resNewOrder = createNewOrderNumber(newParsedData, parsedNewOrder);
        if(resNewOrder) {
            result = JSON.stringify(resNewOrder);
            fs.writeFile('orders/orders.json',result, function(err){
            });
            return res.status(200).send(JSON.stringify(resNewOrder));
        } else {
            return res.status(403).send(JSON.stringify('Sorry, we cannot process your order right now.'));
        }
    });
};

function createNewOrderNumber(newParsedData, parsedNewOrder) {
    parsedNewOrder.number = JSON.stringify(newParsedData.length + 1);
    newParsedData.push(parsedNewOrder);
    return newParsedData;  
};

app.post('/products', function (req, res) {
    fs.readFile('products/product.json', 'utf8', function(err, productList) { 
        var parsedProductList = JSON.parse(productList);  
        return res.send(JSON.stringify(parsedProductList));
    });
});

app.listen(3000, function () {
  console.log('Example app listening on port http://localhost:3000/');
});