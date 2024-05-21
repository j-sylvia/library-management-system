var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('landing', { title: 'Library Management System' });
});


router.get('/home', (req, res) => {
  if (!req.session.user) {
    // If the user is not authenticated, redirect to the login page
    res.redirect("/users/signin");
    return;
  }

  // If the user is authenticated, render the home page
  res.render("home", { data: req.session.user.user_name });
});


// router.get('/addbooks', (req, res) => {
//   res.render('add-books');
// });

// router.get('/books',function(req,res,next){
//   res.render('add-books');
// });

// router.post('/books',function(req,res){
//   console.log(req.body);
//   // const book=new Book(req.body);
//   // book.save(function(err,result){
//   //   if(err){
//   //     res.send(err);
//   //   }
//   //   else{
//   //     res.json(result);
//   //   }
//   // });
//   // Book.create(req.body,function(err,result){
//   //   if(err){
//   //     res.send(err);
//   //   }
//   //   else{
//   //     res.json(result);
//   //   }});
// });

module.exports = router;
