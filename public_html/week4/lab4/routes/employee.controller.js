
var Employee = require('./employee.model');
var debug = require('debug')('lab4:employee');

module.exports.home = function(req, res){
        
    if (req.method === 'POST') {
        
       var msg = '';
        
        Employee.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          department: req.body.department,
          startDate: req.body.startDate,
          jobTitle: req.body.jobTitle,
          salary: req.body.salary
        })
        .then(function(){
            msg = 'New employee was added.';
            return;
        })
        .catch(function(err){            
            msg = 'Entered invalid information.';
            return err.message;
        }).then(function(err){
            res.render('index', { 
                title: 'Enter Information',
                message : msg,
                error: err
             });
        });   
              
    } else {
        res.render('index', { 
            title: 'Enter Information',
            message : ''
        }); 
    }
     
};

module.exports.view = function(req, res){
    
       Employee
       .find()
       .exec()
       .then(function(results){
            res.render('view', { 
                title: 'All Employees' + ' (' + results.length + ')',
                results : results
            });
       }); 
};

module.exports.delete = function(req, res){

     var id = req.params.id,
         removed = '';
      
        Employee.remove({ _id: id })
        .then(function(){            
            removed = `Employee (ID:"${id}") has been removed.`;
            return;
        })
        .catch(function (err) {            
            removed = `Employee (ID:"${id}") has not been removed.`;
            return err; 
        })
        .then( (err) => {
          res.render('delete', { 
                removed : removed
            });    
        });                           
};

module.exports.update = function(req, res){
    
    var id = req.params.id;
    var msg = '';
    
    if (req.method === 'POST') {
         
        id = req.body._id;

        Employee
            .findById(id)
            .exec() 
            .then(function(employeeData) {
                // figure out why the data is not saving. 
                debug(req.body);
                employeeData.author = req.body.author;
                employeeData.rating = req.body.rating;
                employeeData.reviewText = req.body.reviewText;

                return employeeData.save();
                                
            })
            .then(function(){
                msg = 'data has been updated';
            })
            .catch(function(err){
                msg = 'data has NOT been updated';
                debug(err);
            });
        
    }
        
    Employee
    .findOne({ '_id': id })
    .exec()
    .then(function(results){    
        res.render('update', { 
            title: 'Update Results',
            message: msg,
            results : results
        });
    })
    .catch(function(){
        res.render('notfound', { 
            message: 'Sorry ID not found'
        });
    });
};