var Studentdb = require('../model/model');


// Create and Save
exports.create=(req,res)=>{
    // validate
    if(!req.body){
        res.status(400).send({message:"Content can't be blank"});
        return;
    }
    // new student
    const student = new Studentdb({
        name:req.body.name,
        email:req.body.email
    })
    // save
    student
        .save(student)
        .then(data=>{
            res.redirect('/');
        })
        .catch(err=>{
            res.status(500).send({
                message:err.message || "some error occurs" 
            });
        });
}

// retrive and return all/single student
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Studentdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        Studentdb.find()
            .then(student => {
                res.send(student)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}

// Update a new student
exports.update=(req,res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    Studentdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// delete a student
exports.delete=(req,res)=>{
    const id = req.params.id;

    Studentdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{                
                res.redirect('/');
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}