var express = require('express');
var multer  = require('multer');
var fs  = require('fs');
var os = require('os');
var app = express();

var path = require('path');
var auth = require('basic-auth');

var reslist;


var dir2scan = './'; // put the directory to scan here



app.use( express.static( "./" ) );
var temppath = './uploads';



//functions to scan directory and return the tree

//var router = express.Router();

function flatten(lists) {
  return lists.reduce((a, b) => a.concat(b), []);
}
function getDirectories(srcpath) {
  return fs.readdirSync(srcpath)
    .map(file => path.join(srcpath, file))
    .filter(path => fs.statSync(path).isDirectory());
}
function getDirectoriesRecursive(srcpath) {
  return [srcpath, ...flatten(getDirectories(srcpath).map(getDirectoriesRecursive))];
}
// p.s the getDirectoriesRecursive function shall be called letter


//a helper function to return the time and date
function timestamp(){
  function pad(n) {return n<10 ? "0"+n : n}
  d=new Date()
  dash="-"
  colon=":"
  return d.getFullYear()+dash+
  pad(d.getMonth()+1)+dash+
  pad(d.getDate())+" "+
  pad(d.getHours())+colon+
  pad(d.getMinutes())+colon+
  pad(d.getSeconds())
}

// user accounts credintials goes here
const admins = { 'username': { password: 'password' },
        'username2': { password: 'password2' },
        'usernanem3': { password: 'passkkword3' }};


//authentification
				
app.use(
function (request, response, next) {
  var user = auth(request);

  if (!user || !admins[user.name] || admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    return response.status(401).send();

  } else{
	
	console.log (user.name + ' has logged in at ' + timestamp() );
  if (user.name === 'username2')
    dir2scan = './';
    
  if (user.name === 'msrt')
	  dir2scan = './';

  if (user.name === 'username')
	  dir2scan = './';

	reslist = getDirectoriesRecursive(dir2scan);
	reslist = reslist.map(function(x){ return x.replace(/\\/g,"/") });
  return next();
 


  }
}
)






/////////////////
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('index', {data: reslist});
});






var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        var dir = temppath;
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        callback(null, dir);
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
		
    }
});




var upload = multer({storage: storage,
    fileFilter: function (req, file, callback) {
        var ext = path.extname(file.originalname);
        if(ext !== '.mp4' && ext !== '.mkv' && ext !== '.avi' && ext !== '.mov') {
            return callback(new Error('Only videos are allowed'))
        }
        callback(null, true)
    },
    limits:{
        fileSize: 1024 * 1024 * 1024 //1gb
    }
		}).array('files', 12);
		
app.post('/upload', function (req, res, next) {
    upload(req, res, function (err) {
        if (err) {
            return res.end("Something went wrong:("  + err );
			//console.log (req.body);
        }
        res.end("Upload completed.");
		newDest = req.body.pathselector ;
		
		filesArray = req.files ;
	
		//move file from tempfolder to choosen path
		//'req.body.pathselector' is the path that the user will choose from the upload form
		//sth like fs.rename from temppath/filename to req.body.pathselector/same_filename (no need to rename files);

		for (var item in filesArray) {
		var oldPath = filesArray[item].path;
		// the delimiter is usually / but on windows it's\ so we need to check the OS type
		
		if ( os.platform() == 'Windows_NT'){
			var delimiterOFthisOS = '\\';
		}else{
			var delimiterOFthisOS = '/';
		}
		
		var newPath = newDest + delimiterOFthisOS + filesArray[item].filename ;
		
		fs.rename(oldPath, newPath, function (err) {
		  if (err) throw err
		  console.log( newPath + 'Successfully moved and uploaded!')
		})
}
		//Do the stuff you need to do after renaming the files

		
		

    });
})

app.listen(3100);
console.log("runnig on :3100");