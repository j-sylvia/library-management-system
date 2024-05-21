var express = require('express');
var router = express.Router();
var Admin=require('../models/admin');
var Book=require('../models/books');
var user=require('../models/users')

router.get('/', (req, res) => {
    Admin.List_Admin(function (err, rows) 
    {
    if (err) 
    {  //   res.json(err);
      throw err;
    }
    else 
    {  // res.json(rows);      
        res.render('admin-list', { adminlisting: rows,admindata:req.session.admin.admin_name});
        // const admin=rows[0];
        // console.log('Hi session.admin',admin);
        // console.log("Hi...",req.session.admin.admin_name)        
    }
    });    
});

// Route for displaying the form to create a new student
router.get('/create', (req, res) => {
  res.render('create-admin');
});

router.post('/create',function(req,res,next)
  { 
  try 
  {
    console.log("Hi");
    console.log(Admin);
    Admin.Create_Admin(req.body, function (err, rows) 
  {
  if (err) 
  {
//   res.json(err);
    throw err;
  }
  else 
  {
//   res.json(rows);
    res.redirect('/admin/admin-login');
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });

  router.get('/admin-login', function(req, res, next) {
    res.render('admin-login');
  });

  router.get('/admin-home', function(req, res, next) {
    res.render('admin-home');
  });

  router.post('/listbookspost',function(req,res,next)
  { 
  try 
  {
    console.log("Hi");
    console.log("Book :");
    
    Book.Create_Book(req.body, function (err, rows) 
  {
  if (err) 
  {
//   res.json(err);
    throw err;
  }
  else 
  {
  // res.json(rows);
  res.redirect('/books/listbooksadmin')
    // res.render('list-books-admin', {admindata:req.body.admin.admin_name});
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });

  router.get('/listbookspost',function(req,res,next)
  { 
  try 
  {
    console.log("Get Book :");
    
    Book.List_Book(req.body, function (err, rows) 
  {
  if (err) 
  {
//   res.json(err);
    throw err;
  }
  else 
  {
  // res.json(rows);
  res.redirect('/books/listbooksadmin')
    // res.render('list-books-admin', {admindata:req.body.admin.admin_name});
  }
  });
  }
  catch (e) 
  {
  }
  finally 
  {
  }
  });
  
  router.post("/admin-login", function (req, res, next) {
    try {
        Admin.Login_Admin(req.body.admin_name, req.body.admin_password, function (err, rows) {
            console.log("admin login");
  
            console.log(rows)

            if (err) {
                throw err;
            } else {
                if (rows.success) {
                    req.session.admin = rows.admin;
                    console.log("+++++++")
                    console.log(req.session.admin)
                    console.log("+++++++")
  
                    console.log(req.session.admin.admin_name)
                    // req.flash('message', 'You have successfully logged in.');
                    // req.flash('data', { username: rows.admin.admin_name });
                    // res.render("add-books",{admindata:req.session.admin.admin_name});
                    res.render("admin-home",{admindata:req.session.admin.admin_name});                    
                } else {
                  res.redirect("admin-login");
                }
            }
        });
    } catch (e) {
        console.error(e);
        res.redirect("/admin-login");
    } finally {
    }
  });
  
  router.get("/admin-home", function (req, res) {
    if (req.session.admin) {
      res.render("admin-home", { admindata: req.session.admin.admin_name });
    } else {
      res.redirect("/admin/signin");
    }
  });

  router.get("/add-books", function (req, res) {
    if (req.session.admin) {
      res.render("add-books", { admindata: req.session.admin.admin_name });
    } else {
      res.redirect("/admin/admin-home");
    }
  });
  
  router.get('/admin-logout', (req, res) => {
    console.log(req.session)  
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
      }
      console.log(req.session)
      res.redirect('/');
      
    });
  });

  //admin edit
  router.get('/:admin_id/edit', (req, res) => {
    const admin_id = req.params.admin_id;
    Admin.Get_Admin(admin_id, (err, result) => {
      if (err) {
        res.status(500).send('Error updating admin');
      } else {
        res.render('edit-admin', { admin: result });
      }
    });
  });

  router.post('/:admin_id/edit', (req, res) => {
    const admin_id = req.params.admin_id;
    const updatedAdmin = req.body;
    Admin.Update_Admin(admin_id, updatedAdmin,(err, result) => {
      if (err) {
        res.status(500).send('Error updating admin');
      } else {
        res.redirect('/admin');
      }
    });
  });
  
  // Delete a admin by ID
  router.post('/:admin_id/delete', (req, res) => {
    const admin_id = req.params.admin_id;
    console.log(admin_id);
    Admin.Delete_Admin(admin_id, (err, result) => {
      if (err) {
        res.status(500).send('Error deleting admin');
      } else {
        // res.json({ message: 'Book deleted successfully' });
        res.redirect('/admin');
      }
    });
  });

  //user 
  router.get('/user', (req, res) => {
    user.List_user(function (err, rows) 
    {
    if (err) 
    {  //   res.json(err);
      throw err;
    }
    else 
    {  // res.json(rows);      
        res.render('user-list', { users: rows,admindata:req.session.admin.admin_name});       
    }
    });    
});

  router.get('/user/:user_id/edit', (req, res) => {
    const user_id = req.params.user_id;
    user.Get_User(user_id, (err, result) => {
      if (err) {
        res.status(500).send('Error updating user');
      } else {
        res.render('edit-user', { users: result });
      }
    });
  });

  router.post('/user/:user_id/edit', (req, res) => {
    const user_id = req.params.user_id;
    const updatedUser = req.body;
    user.Update_User(user_id, updatedUser,(err, result) => {
      if (err) {
        res.status(500).send('Error updating user');
      } else {
        res.redirect('/admin/user');
      }
    });
  });
  
  // Delete a user by ID
  router.post('/user/:user_id/delete', (req, res) => {
    const user_id = req.params.user_id;
    console.log(user_id);
    user.Delete_User(user_id, (err, result) => {
      if (err) {
        res.status(500).send('Error deleting user');
      } else {
        // res.json({ message: 'Book deleted successfully' });
        res.redirect('/admin/user');
      }
    });
  });

  module.exports = router;