var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/cam',function(req,res){
    console.log(req.url);
    res.sendFile('chat.html', { root: path.join(__dirname, '../views') });
});
module.exports = router;
