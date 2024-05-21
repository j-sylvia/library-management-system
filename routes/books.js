var express = require('express');
var router = express.Router();
var Book=require('../models/books');

router.get('/listbooks', (req, res) => {
    Book.List_Book(function (err, rows) 
    {
      // console.log("rows :" ,rows)
      const books_array=rows.results
      // console.log("bookarray :" ,books_array)
      // if (req.session.user) {
      //   res.render("list-books", { data: req.session.user.user_name });
      // } else {
      //   res.redirect("/users/signin");
      // }
    if (err) 
    {  //   res.json(err);
      throw err;
    }
    else 
    {  // res.json(rows);
        res.render('list-books',{ book: books_array , data: req.session.books_array,userdata:req.session.user.user_name});
        // console.log("Hi...",req.session.book.book_title)
    }
    });    
});


router.get('/listbooksadmin', (req, res) => {
  Book.List_Book(function (err, rows) 
  {
    // console.log("rows :" ,rows)
    const books_array=rows.results
    // console.log("bookarray :" ,books_array)
    // if (req.session.user) {
    //   res.render("list-books", { data: req.session.user.user_name });
    // } else {
    //   res.redirect("/users/signin");
    // }
  if (err) 
  {  //   res.json(err);
    throw err;
  }
  else 
  {  // res.json(rows);
      res.render('list-books-admin',{ book: books_array , data: req.session.books_array,admindata:req.session.admin.admin_name});
      // console.log("Hi...",book.book_title)
  }
  });    
});

router.get('/addbooks', (req, res) => {
  // if (req.session.admin) {
  //   res.render("add-books", { data: req.session.admin.admin_name });
  // } else {
  //   res.redirect("/admin/admin-login");
  // }
  res.render("add-books");
});

router.get('/:isbn/edit', (req, res) => {
  const isbn = req.params.isbn;
  Book.Get_Book(isbn, (err, result) => {
    if (err) {
      res.status(500).send('Error updating book');
    } else {
      res.render('edit-book', { book: result });
    }
  });
});


router.post('/:isbn/edit', (req, res) => {
  const isbn = req.params.isbn;
  const updatedBook = req.body;
  Book.Update_Book(isbn, updatedBook,(err, result) => {
    if (err) {
      res.status(500).send('Error updating book');
    } else {
      res.redirect('/books/listbooksadmin');
    }
  });
});

// Delete a book by ID
router.post('/:isbn/delete', (req, res) => {
  const isbn = req.params.isbn;
  console.log(isbn);
  Book.Delete_Book(isbn, (err, result) => {
    if (err) {
      res.status(500).send('Error deleting book');
    } else {
      // res.json({ message: 'Book deleted successfully' });
      res.redirect('/books/listbooksadmin');
    }
  });
});

router.post('/:isbn/borrow', (req, res) => {
  const isbn = req.params.isbn;
  // const userId = req.body.userId;
  Book.borrowBook(isbn, (err, result) => {
      if (err) {
          res.status(500).send('Error borrowing book');
      } else {
          // res.json({ message: 'Book borrowed successfully' });
          res.redirect('/books/listbooks');
      }
  });
});

router.post('/:isbn/return', (req, res) => {
  const isbn = req.params.isbn;
  Book.returnBook(isbn, (err, result) => {
      if (err) {
          res.status(500).send('Error returning book');
      } else {
          // res.json({ message: 'Book returned successfully' });
          res.redirect('/books/listbooks');
      }
  });
});

// router.post('/listbookspost',function(req,res,next)
//   { 
//   try 
//   {
//     console.log("Hi");
//     console.log("Book :");
//     console.log(req.body);
//     Book.Create_Book(req.body, function (err, rows) 
//   {
//   if (err) 
//   {
// //   res.json(err);
//     throw err;
//   }
//   else 
//   {
//   // res.json(rows);
//     res.render('list-books-admin', {admindata:admin.admin_name});
//   }
//   });
//   }
//   catch (e) 
//   {
//   }
//   finally 
//   {
//   }
//   });

// router.get('/books/:id/update',async (req,res)=>{
//   console.log(req.params)
//   const id=req.params.id;
//   var query = `SELECT * FROM book_details WHERE id = "${id}"`;

	// db.query(query, function(err, data){

	// 	response.render('sample_data', {title: 'Edit MySQL Table Data', action:'edit', sampleData:data[0]});

	// });
// });

// router.post('/books/:id/edit',async (req,res)=>{
//   const id=req.params.id;
//   const updatedItem=req.body;
//   console.log(req.body);
//   const result=await collection.updateOne({_id: new ObjectId(id)},{$set: updatedItem});

//   if(result.modifiedCount>0){
//     res.redirect('/listbooksadmin');
//   }
//   else{
//     res.status(404).send('Item not found')
//   }
// });

// router.post('/books/:id/delete', async (req,res)=>{
//   const id=req.params.id;
//   const result=await collection.deleteOne({_id: new ObjectId(id)});

//   if(result.deletedCount>0){
//     res.redirect('/viewitems');
//   }
//   else{
//     res.status(404).send('Item not found');
//   }
// });

module.exports=router;