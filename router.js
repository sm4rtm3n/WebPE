var express = require('express'),
	user = express.Router(),
	userrouter,
	frontPage = require("./handlers/frontPage"),
	collectionPage = require("./handlers/collectionPage"),
	editPage = require("./handlers/editPage"),
	errorPage = require("./handlers/errorPage"),
	infoPage = require("./handlers/infoPage"),
	registerPage = require("./handlers/registerPage");
	
var Auth = require("./auth");
	
    
userrouter = function(app){
	// GET
	user.get('/admin',admin_loginPage.page);
    user.get('/',frontPage.page);
	user.get('/error',errorPage.page);
	user.get('/info',infoPage.page);
	user.get('/register',registerPage.page);
	user.get('/Collection/:username',Auth.validate,collectionPage.page);
	user.get("/Collection/:username/:filename/download",collectionPage.downloadphoto);
	user.get('/Collection/:username/delete/:filename',Auth.validate,collectionPage.deletephoto);
	user.get('/Collection/:username/edit/:filename',Auth.validate,editPage.page);
	user.get('/logout/:username',Auth.validate,function(req,res){
		res.clearCookie('auth');
		res.redirect('/');
	})
	
	//POST
	user.post('/login',frontPage.login);
	user.post('/createUser',registerPage.checkFormat,registerPage.checkUSER,registerPage.saveUser);
	user.post('/Collection/:username/upload',Auth.validate,collectionPage.uploadphoto);
	user.post('/Collection/:username/edit/:filename/save',Auth.validate,editPage.saveEdit);
	
	app.use(user);
}

//admin handler
var	admin_loginPage = require("./handlers/admin_loginPage"),
	Auth_admin = require('./auth_admin');
	//
	
var admin = express.Router(),
	adminrouter;
	
adminrouter = function(app){
	// GET
	admin.get('/info',infoPage.page);
	// POST
	admin.post('/login',admin_loginPage.login);
	
	app.use('/admin',admin);
}

var router = {
	userrouter : userrouter,
	adminrouter : adminrouter
}

module.exports = router;