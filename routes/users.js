var express = require('express');
var router = express.Router();
var user = require('../models/users');

/* GET users listing. */
router.get('/signup', (req, res)=> {
  res.render('signup');
});

router.post("/create",function(req,res,next){
  try{
    console.log("user created");
    user.Create_user(req.body,function(err,rows){
      if(err){
        throw err;
      }
      else{
        res.redirect("/users/signin");
      }
    })
  }
  catch(e){

  }
  finally{}
});

router.get('/signin', function(req, res, next) {
  res.render('login');
});
router.post("/login", function (req, res, next) {
  try {
      user.Login_user(req.body.user_name, req.body.user_password, function (err, rows) {
          console.log("login");
          console.log(rows)
          if (err) {
              throw err;
          } else {
              if (rows.success) {
                  req.session.user = rows.user;
                  console.log("+++++++")
                  console.log(req.session.user)
                  console.log(req.session.user)
                  console.log("+++++++")

                  console.log(req.session.user.user_name)
                  // req.flash('message', 'You have successfully logged in.');
                  // req.flash('data', { username: rows.user.username });

                  res.redirect("/books/listbooks");
              } else {
                  res.redirect("signin");
              }
          }
      });
  } catch (e) {
      console.error(e);
      res.redirect("/login");
  } finally {
  }
});

router.get("/home", function (req, res) {
  if (req.session.user) {
    res.render("home", { data: req.session.user.user_name });
  } else {
    res.redirect("/users/signin");
  }
});

router.get('/logout', (req, res) => {
  console.log(req.session)

  req.session.destroy((err) => {
    if (err) {
      console.error(err);
    }
    console.log(req.session)
    res.redirect('/');
    
  });
});



module.exports = router;
