var express = require("express");
var router = express.Router();
const userModel = require("./users");

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   //setting the session name
//   //when visiting the '/' route session name will be set
//   req.session.sessionName = "This is the session under home page"
//   req.session.ban = false;
//   //we are sending othe cookie from the server to the browser(client)
//   res.cookie("password", "htu6&6%%huwiedfhue")
//   res.render('index', { title: 'Express' });
// });

// router.get('/read', function (req, res) {
//   res.send(req.cookies);
//   res.send(req.cookies.password);
// })

// router.get('/deleteCookie', function (req, res) {
//   //deleting a cookie with the name "password"
//   res.clearCookie("password");
// })

// router.get('/checkSession', function(req, res) {
//   //we can access the sesison created on a particular route on any other route
//   console.log(req.session)
//   if (req.session.ban === true) {
//     res.send("You are banned");
//   }
//   else {
//     res.send("You are not banned")
//   }
//   res.send("Checking the session name")
// })

// router.get('/deleteSession', function(req, res) {
//   //deleting the session
//   req.session.destroy(function(err) {
//     if (err) throw err;
//     res.send("The session is removed")
//   })
// })

// //create a single user
router.get("/create", async function (req, res) {
  const userData = await userModel.create({
    username: "Test User",
    name: "Testuser",
    age: 40,
    password: "test338489",
    description: "I am a test user",
    categories: ["test 1", "test 2", "test 3"],
  });

  res.send(userData);
});

// //find all users
router.get("/find", async function (req, res) {
  // ^ -----indicates the starting
  // $ -----indicates the ending
  var regex = new RegExp("^rohit Sharma$", 'i') //insemsitive search
  const users = await userModel.find({categories: { $all: ['test 1'] }});
  var date1 = new Date('2024-06-09')
  var date2 = new Date('2024-06-12')
  // let user = await userModel.find({dateCreated: {$gte: date1, $lte: date2}})
  // let user = await userModel.find( { categories: { $exists: true } } )
  let user = await userModel.find({
    $expr: {
      //return names of users whose names are of length 0 - 12
      $and: [
        { $gte: [{ $strlenCP: "$name" }, 0] },
        { $lte: [{ $strlenCP: "$name" }, 12] },
      ],
    },
  });
  res.send(user);
});

// //finding a single user
// router.get('/singleUser', async function(req, res) {
//   const singleUser = await userModel.findOne({_id: "6662c59dce1a2114532d73a4"})
//   res.send(singleUser);
// })

// //deleting a single user
// //it also returns the data of the deleted user
// router.get('/delete', async function(req, res) {
//   const deleteUser = await userModel.findOneAndDelete({
//     _id: "6662c59dce1a2114532d73a4"
//   });
//   res.send(deleteUser);
// })

// //deleting all the current users
// router.get('/deleteAll', async function(req, res) {
//   const deleteAllUsers = await userModel.deleteMany({});
//   res.send(deleteAllUsers);
// })

router.get("/", function (req, res) {
  // res.render('index', { title: 'Express' });
  res.render("index");
});

//make a flash message under /failed route
//the same flash mrssage will be displayed at the the / route with ejs

//flash message-----make data in a route in the server and use the data inside another route of the same server
//flash entirely works on session data that is stored inside the server
router.get("/failed", function (req, res) {
  req.flash("name", "Arkajyoti"); //this data an be used inside multiple routes
  res.send("data is created");
});

router.get("/check", function (req, res) {
  res.send(req.flash("name"));
});

module.exports = router;
