var express = require('express');
var router = express.Router();




var users = {};

/* GET users listing. */
router.get('/', function(req, res, next) {


    res.send(JSON.stringify(users));

});
router.post('/add', function(req, res, next) {


    var id = guid();
     var name = req.body;
    console.log(req.body);

    var user_ob = {
      'id':id,
      'name': name.name
    }
     users[id] =user_ob ;
    res.send(JSON.stringify(user_ob));

});
router.post('/update', function(req, res, next) {


    var id = guid();
    var user = req.body;
    users[user.id] = user;
    res.send(JSON.stringify(user));

});
router.post('/remove', function(req, res, next) {


    var id = guid();
    var user = req.body;
    //users[user.id] = user;
    console.log("remove")
    console.log(user)
    console.log(users[user.id])
    //users.splice(user.id, 1);
    delete users[user.id];
    res.send(JSON.stringify(user));

});

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

module.exports = router;
