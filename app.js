const express = require('express');

const app = express();
const path = require('path');
const router = express.Router();
app.use(express.static('public'));

router.get('/', function(req, res) {
	res.sendFile('index.html');
});

router.post('/', function(req, res) {
	console.log(req);
	res.send('Response saved!');
});

app.use('/', router);
app.listen(process.env.port || 3000);

console.log(path.join(__dirname + '/views/index.html'));
console.log('Running at Port 3000');
