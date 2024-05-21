var db=require('../dbconnection');
var Book=
 {
    Create_Book:function(Book_,callback)
    { 
        console.log("Book Created")
        const { book_title, isbn, genre,author,publishing_year,copies,cover_image} = Book_;
        const initial_copies = copies;
        const query = 'INSERT INTO book_details (book_title, isbn, genre,author,publishing_year,copies,cover_image,initial_copies) VALUES (?, ?, ?, ?,?,?,?,?)';
        console.log("Book Created")
        return db.query(query, [book_title, isbn, genre,author,publishing_year,copies,cover_image,initial_copies], callback);    
    },
    
    List_Book:function(callback)
    { 
        const query = 'SELECT * FROM book_details order by book_title';
        // db.query(query, callback);
        // const query = 'SELECT * FROM book_details where book_title=?';
        db.query(query, (err, results) => {
            if (err) throw err;
    
            if (results.length === 0) {
                return callback(null, { success: false, message: 'Invalid entries' });
            }
            else{
                // console.log("result : ",results)
                // const book = results[0];
                return callback(null, { success: true, results });
            }
            // const book = results[0];
            // console.log("book",book);
            // return book;      
        });      
    },

    
    Get_Book: function (isbn, callback) {
        const query = `SELECT * FROM book_details WHERE isbn = ?`;
        db.query(query, [isbn], (err, result) => {
            if (err) {
                console.error("Error retrieving book:", err);
                return callback(err, null);
            }
            return callback(null, result[0]);
        });
    },

    Delete_Book:function(isbn,callback)
    { 
        // const { isbn } = req.params.isbn;
        console.log("Deleting book with ID:", isbn);
        const query = `DELETE FROM book_details WHERE isbn = ?`;
        db.query(query, [isbn], (err, result) => {
            if (err) {
                console.error("Error deleting book:", err);
                return callback(err, null);
            }
            console.log("Book deleted successfully");
            return callback(null, result);
        });
    },

    Update_Book:function(isbn,updatedBook,callback)
    { 
        // const { id } = req.params;
        // const { book_title, genre, author, publishing_year, copies } = Book_;
        const query = `update book_details set ? WHERE isbn = ?`;
        db.query(query, [updatedBook,isbn], (err, result) => {
            if (err) {
                console.error("Error updating book:", err);
                return callback(err, null);
            }
            console.log("Book updated successfully");
            return callback(null, result);
        });            
    },

    borrowBook: function (isbn, callback) {
        const query = `UPDATE book_details SET copies = GREATEST(0, copies - 1) WHERE isbn = ?`;
        db.query(query, [isbn], (err, result) => {
            if (err) {
                console.error("Error borrowing book:", err);
                return callback(err, null);
            }
            console.log("Book borrowed successfully");
            return callback(null, result);
        });
    },

    returnBook: function (isbn, callback) {
        const query = `UPDATE book_details SET copies = LEAST(initial_copies,copies + 1) WHERE isbn = ?`;
        db.query(query, [isbn], (err, result) => {
            if (err) {
                console.error("Error returning book:", err);
                return callback(err, null);
            }
            console.log("Book returned successfully");
            return callback(null, result);
        });
    }

 };

 
 module.exports=Book;