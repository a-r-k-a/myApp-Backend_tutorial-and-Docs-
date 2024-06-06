var express = require('express');
var router = express.Router();
const userModel = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/create', async function(req, res) {
  await userModel.create({
    username: "Arka",
    name: "Arkajyoti",
    age: 22
  })

  res.send("The user has been created")
})

router.get('/about', function(req, res) {
  res.send("THis is the about page")
})

module.exports = router;
