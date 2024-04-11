const path = require('path')
const multer = require('multer')
const { model } = require('mongoose')


// Multer configuration
var storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, 'uploads/'); // Destination directory where files will be uploaded
    },
    filename: function(req, file, cb) {
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Use Date.now() to make filename unique
    }
});

var upload = multer({
    storage: storage,
    fileFilter: function(req, file, callback){
        if (file.mimetype == "image/png" || file.mimetype == 'image/jpeg') {
            callback(null, true);
        } else {
            console.log("only jpg or png is accepted");
            callback(null, false);
        }
    }, 
    limits: {
        fileSize: 1024 * 1024 * 2 // 2MB file size limit
    }
});


module.exports = upload;
