// add a comma then follow this format to add a new user and set his path
const uploaderslist = { 'username1': { password: 'ourpassword1',path: '../' },
        'username2': { password: 'password2',path:'./uploads' },
        'username3': { password: 'password3', path:'./up'  }
    };
    
const allowed_ext = ['.mp4' , '.mkv' , '.avi', '.mov'];

module.exports.uploaderslist = uploaderslist;

module.exports.allowed_ext = allowed_ext;



