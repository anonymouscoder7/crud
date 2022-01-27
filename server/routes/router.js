const express = require('express');
const route = express.Router();
const services =require('../services/render');
const controller =require('../controller/controller');



route.get('/', services.homeRoutes);
route.get('/adduser',services.adduserRoutes);
route.get('/updateuser', services.updateuserRoutes);


// API
route.post('/api/student',controller.create);
route.get('/api/students',controller.find);
route.post('/api/student/:id',controller.update);
route.get('/api/students/:id',controller.delete);


module.exports = route