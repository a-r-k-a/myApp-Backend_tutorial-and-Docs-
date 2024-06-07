var express = require('express');
var router = express.Router();
const userModel = require('./users')

/* GET home page. */
router.get('/', function(req, res, next) {
  //setting the session name
  //when visiting the '/' route session name will be set 
  req.session.sessionName = "This is the session under home page"
  req.session.ban = false;
  //we are sending othe cookie from the server to the browser(client)
  res.cookie("password", "htu6&6%%huwiedfhue")
  res.render('index', { title: 'Express' });
});

router.get('/read', function (req, res) {
  res.send(req.cookies);
  // res.send(req.cookies.password);
})

router.get('/deleteCookie', function (req, res) {
  //deleting a cookie with the name "password"
  res.clearCookie("password");
})

router.get('/checkSession', function(req, res) {
  //we can access the sesison created on a particular route on any other route
  console.log(req.session)
  if (req.session.ban === true) {
    res.send("You are banned");
  }
  else {
    res.send("You are not banned")
  }
  res.send("Checking the session name")
})

router.get('/deleteSession', function(req, res) {
  //deleting the session
  req.session.destroy(function(err) {
    if (err) throw err;
    res.send("The session is removed")
  })
})

//create a single user
router.get('/create', async function(req, res) {
  const createdUser = await userModel.create({
    username: "Arka",
    name: "Arkajyoti",
    age: 22
  })

  res.send(createdUser)
})

//find all users
router.get('/allusers', async function(req, res) {
  const allUsers = await userModel.find();
  res.send(allUsers);
})

//finding a single user
router.get('/singleUser', async function(req, res) {
  const singleUser = await userModel.findOne({_id: "6662c59dce1a2114532d73a4"})
  res.send(singleUser);
})

//deleting a single user
//it also returns the data of the deleted user
router.get('/delete', async function(req, res) {
  const deleteUser = await userModel.findOneAndDelete({
    _id: "6662c59dce1a2114532d73a4"
  });
  res.send(deleteUser);
})

//deleting all the current users
router.get('/deleteAll', async function(req, res) {
  const deleteAllUsers = await userModel.deleteMany({});
  res.send(deleteAllUsers);
})

module.exports = router;
