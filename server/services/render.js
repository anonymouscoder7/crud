const axios  = require("axios");

exports.homeRoutes=(req,res)=>{
    axios.get('http://localhost:3000/api/students')
    .then(function(response){
        res.render('index', { students : response.data });
    })
    .catch(err =>{
        res.send(err);
    })
}

exports.adduserRoutes=(req,res)=>{
    res.render('create-user');
}

exports.updateuserRoutes=(req,res)=>{
    res.render('update-user');
}
