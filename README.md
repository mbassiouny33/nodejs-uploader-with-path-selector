# nodejs uploader with path selector
A nodejs fileuploader form that allows the user to upload files to a directory of their choice (recursively from the parent directory specified upon account creation)

## Dependencies:
clone this git repo and navigate to the folder then run the following command:
`npm i express multer basic-auth ejs`

## How to use

First start by downlading this repo as a zip file or using git clone.

Uploaders need an account. You can create accounts in the config file by modifying the uploaderslist vairable. By default there are 3 accounts with weak passwords that you should change, you have to specify the home folder(folder where file are uploaded) for each user in the same uploaderlist varaibale in config.js file see the exisiting example in config.js file.

You can only allow specific file extensions by specifying them in const allowed_ext. 

Once you finished your configuration run the script. By default it will run on port 3100

`node serverauth.js`


## Changelog:
#### V2:
- Separted users definition in a clean config file
- File extensions can be set in the config file
- Increased the maximum number of files to 100

#### V1: 
- Initial release
- Videos only
- Users are hardcoded withing the code
