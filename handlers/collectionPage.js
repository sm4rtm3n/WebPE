var collectionPage,
    page,
    Collection = require('../utils/COLLECTION');

var fs = require('fs');
var path = require('path');
var uid = require('uid2');
var formidable = require('formidable');

page = function(req,res){
    var user = req.decoded;
    console.log(user);
    Collection.fetchCOLLECTION(user.id_user).then(function(Collection){
        console.log(Collection);
        res.render('collection.html',{user : user , collection : JSON.parse(Collection[0].photos) , path: Collection[0].path});
    })
}

var uploadphoto = function(req,res){
    var form = new formidable.IncomingForm();
    var user = req.decoded;
    form.parse(req,function(err,fields,files){
        
            var old_path = files.file.path,
      
            file_size = files.file.size,
            
            file_ext = files.file.name.split(/[. ]+/).pop(),
            
            file_name = uid(22);
          
            var targetPath = path.join(__dirname, '../public/images/'+user.username+'/'+file_name+'.'+file_ext);
              console.log(file_name);
            console.log(file_size);
            console.log(old_path);
            console.log(file_ext);
            console.log(targetPath);
        
        fs.readFile(old_path, function(err, data) {
            fs.writeFile(targetPath, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if (err) {
                        res.status(500);
                        res.json({'success': false});
                    } else {
                        
                        Collection.fetchCOLLECTION(user.id_user).then(function(collection){
                            var col= JSON.parse(collection[0].photos);
                            var uploaded_photo = {
                                filename : file_name+"."+file_ext
                            }
                            col.push(uploaded_photo);
                            Collection.updateCOLLECTION(JSON.stringify(col),collection[0].path,user.id_user,'id_user = ?',user.id_user).then(function(){
                                res.render('info.html',{info: 'Upload berhasil',back:'/Collection/'+user.username}); 
                            })
                        })
                        

                    }
                });
            });
        });
        
        
    });
    
}


collectionPage = {
    page : page,
    uploadphoto : uploadphoto
}

module.exports = collectionPage;