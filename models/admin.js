var db=require('../dbconnection');
const bcrypt = require('bcrypt');
var Admin=
 {
    Create_Admin:function(Admin_,callback)
    { 
        console.log("Hello Admin")
        const { admin_name, admin_email, admin_password,admin_photo } = Admin_;
        // const query = 'INSERT INTO admin_details (admin_name, admin_password, admin_email, admin_photo) VALUES (?, ?, ?, ?)';
        // return db.query(query, [admin_name, admin_password, admin_email, admin_photo], callback);    
        if (!admin_name||!admin_email||!admin_password || !admin_photo) {
            return res.status(400).send('fill the form');
          }
          if (admin_password.length < 8 || admin_name.length<3) {
            return res.status(400).send('Password must be at least 8 characters long and username must be at least 3 characters long');
          }
          // Hash the password before inserting into the database
          bcrypt.hash(admin_password, 10, (err, hash) => {
            if (err) throw err;
            const query = 'INSERT INTO admin_details (admin_name, admin_password, admin_email, admin_photo) VALUES (?, ?, ?, ?)';
            return db.query(query, [admin_name, hash, admin_email, admin_photo], callback);
          })  
    },

    Login_Admin: function(admin_name, admin_password, callback) {
        // Basic validation - Check if username and password are provided
        if (!admin_name || !admin_password) {
            return callback(null, { success: false, message: 'Username and password are required' });
        }
    
        const query = 'SELECT * FROM admin_details where admin_name=?';
        db.query(query, [admin_name], (err, results) => {
            if (err) throw err;
    
            if (results.length === 0) {
                return callback(null, { success: false, message: 'Invalid username or password' });
            }
    
            const admin = results[0];
            console.log(admin);
    
            bcrypt.compare(admin_password, admin.admin_password, (err, result) => {
                if (err) throw err;
    
                if (result) {
                    // Password is correct
                    return callback(null, { success: true, admin });
                } else {
                    // Password is incorrect
                    return callback(null, { success: false, message: 'Invalid username or password' });
                }
            });
        });
    },

    List_Admin:function(callback)
    { 
        const query = 'SELECT * FROM admin_details';
        return db.query(query, callback);
    },

    Get_Admin: function (admin_id, callback) {
        const query = `SELECT * FROM admin_details WHERE admin_id = ?`;
        db.query(query, [admin_id], (err, result) => {
            if (err) {
                console.error("Error retrieving admin:", err);
                return callback(err, null);
            }
            return callback(null, result[0]);
        });
    },

    Delete_Admin:function(admin_id,callback)
    { 
        // const { admin_id } = req.params.admin_id;
        console.log("Deleting admin with ID:", admin_id);
        const query = `DELETE FROM admin_details WHERE admin_id = ?`;
        db.query(query, [admin_id], (err, result) => {
            if (err) {
                console.error("Error deleting admin:", err);
                return callback(err, null);
            }
            console.log("Admin deleted successfully");
            return callback(null, result);
        });
    },

    Update_Admin:function(admin_id,updatedAdmin,callback)
    { 
        // const { id } = req.params;
        
        const query = `update admin_details set ? WHERE admin_id = ?`;
        db.query(query, [updatedAdmin,admin_id], (err, result) => {
            if (err) {
                console.error("Error updating admin:", err);
                return callback(err, null);
            }
            console.log("Admin updated successfully");
            return callback(null, result);
        });            
    },

    //user
    // List_User:function(callback)
    // { 
    //     const query = 'SELECT * FROM user_details';
    //     return db.query(query, callback);
    // },

    // Get_User: function (user_id, callback) {
    //     const query = `SELECT * FROM user_details WHERE user_id = ?`;
    //     db.query(query, [user_id], (err, result) => {
    //         if (err) {
    //             console.error("Error retrieving user:", err);
    //             return callback(err, null);
    //         }
    //         return callback(null, result[0]);
    //     });
    // },

    // Delete_User:function(user_id,callback)
    // { 
    //     // const { admin_id } = req.params.admin_id;
    //     console.log("Deleting user with ID:", user_id);
    //     const query = `DELETE FROM user_details WHERE user_id = ?`;
    //     db.query(query, [user_id], (err, result) => {
    //         if (err) {
    //             console.error("Error deleting user:", err);
    //             return callback(err, null);
    //         }
    //         console.log("User deleted successfully");
    //         return callback(null, result);
    //     });
    // },

    // Update_User:function(user_id,updatedUser,callback)
    // { 
    //     // const { id } = req.params;
        
    //     const query = `update user_details set ? WHERE user_id = ?`;
    //     db.query(query, [updatedUser,user_id], (err, result) => {
    //         if (err) {
    //             console.error("Error updating user:", err);
    //             return callback(err, null);
    //         }
    //         console.log("Admin updated successfully");
    //         return callback(null, result);
    //     });            
    // },


    
    // Delete_Admin:function(Admin_Id_,callback)
    // { 
    //     // const { id } = req.params;
    //     const query = 'DELETE FROM admin_details WHERE id = ?';
    //     db.query(query, [Admin_Id_], callback);
            
    // },
    // Update_Student:function(Student_,Student_Id_,callback)
    // { 
    //     // const { id } = req.params;
    //     const { name, email, phone, } = Student_;
    //     const query = 'update student set name =?, email=?, phone=? WHERE id = ?';
    //     db.query(query, [Student_Id_], callback);
            
    // },

 };
 module.exports=Admin;
