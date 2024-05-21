var db=require('../dbconnection');
var bcrypt=require('bcrypt')
var user=
 {
    Create_user:function(user_,callback)
    { 
        console.log("Hello")
        const { user_name,user_password, user_gender,user_email,user_photo,user_phone } = user_;
        // Basic validation - Check if username and password are provided
    if (!user_name||!user_password||!user_gender||!user_email || !user_phone) {
        return res.status(400).send('fill the form');
      }
    
      // // Password validation - Check if password meets certain criteria
      if (user_password.length < 8 || user_name.length<3) {
        return res.status(400).send('Password must be at least 8 characters long and username must be at least 3 characters long');
      }
      
      // Hash the password before inserting into the database
      bcrypt.hash(user_password, 10, (err, hash) => {
        if (err) throw err;
        const query = 'INSERT INTO user_details (user_name,user_password, user_gender, user_email,user_photo, user_phone) VALUES (?, ?, ?, ?, ?,?)';
        return db.query(query, [user_name,hash, user_gender,user_email,user_photo,user_phone], callback);
      })    
    },

    List_user:function(callback)
    { 
        const query = 'SELECT * FROM user_details';
        return db.query(query, callback);
              
    },
    Login_user: function(user_name, user_password, callback) {
        // Basic validation - Check if username and password are provided
        if (!user_name || !user_password) {
            return callback(null, { success: false, message: 'Username and password are required' });
        }
    
        const query = 'SELECT * FROM user_details where user_name=?';
        db.query(query, [user_name], (err, results) => {
            if (err) throw err;
    
            if (results.length === 0) {
                return callback(null, { success: false, message: 'Invalid username or password' });
            }
    
            const user = results[0];
            console.log(user);
    
            bcrypt.compare(user_password, user.user_password, (err, result) => {
                if (err) throw err;
    
                if (result) {
                    // Password is correct
                    return callback(null, { success: true, user });
                } else {
                    // Password is incorrect
                    return callback(null, { success: false, message: 'Invalid username or password' });
                }
            });
        });
    },

    // List_User:function(callback)
    // { 
    //     const query = 'SELECT * FROM user_details';
    //     return db.query(query, callback);
    // },

    Get_User: function (user_id, callback) {
        const query = `SELECT * FROM user_details WHERE user_id = ?`;
        db.query(query, [user_id], (err, result) => {
            if (err) {
                console.error("Error retrieving user:", err);
                return callback(err, null);
            }
            return callback(null, result[0]);
        });
    },

    Delete_User:function(user_id,callback)
    { 
        // const { admin_id } = req.params.admin_id;
        console.log("Deleting user with ID:", user_id);
        const query = `DELETE FROM user_details WHERE user_id = ?`;
        db.query(query, [user_id], (err, result) => {
            if (err) {
                console.error("Error deleting user:", err);
                return callback(err, null);
            }
            console.log("User deleted successfully");
            return callback(null, result);
        });
    },

    Update_User:function(user_id,updatedUser,callback)
    { 
        // const { id } = req.params;
        
        const query = `update user_details set ? WHERE user_id = ?`;
        db.query(query, [updatedUser,user_id], (err, result) => {
            if (err) {
                console.error("Error updating user:", err);
                return callback(err, null);
            }
            console.log("User updated successfully");
            return callback(null, result);
        });            
    },

    // Delete_user:function(user_id,callback)
    // { 
    //     // const { id } = req.params;
    //     const query = 'DELETE FROM user_details WHERE user_id = ?';
    //     db.query(query, [user_id], callback);
            
    // },

 };
 module.exports=user;
