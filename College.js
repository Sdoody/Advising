const fs = require('fs'); 

module.exports = { 
    addCollegePage: (req, res) => {
        res.render('add_college.ejs', {
            title: "Welcome!" , message: ''
        });
    },

    addCollege: (req, res) => {
        let message = '';
        let collegeID = req.params.id
        let collegeName = req.body.collegeName;
        let CoAbbreviation = req.body.CoAbbreviation;
    
        let collegeNameQuery = `SELECT * FROM College`; //WHERE collegeName = ${collegeName}`;
        //console.log(collegeNameQuery);

        db.query(collegeNameQuery), (err, result) => {
            if (err) { 
                return res.send(500).send(err);
            }
            if (result.length > 0) { 
                message = 'College name already exists';
                res.render('add_college.ejs', {
                    message, 
                    title: "Welcome! | Add new College"
                });
            } else {
                console.log('THIS IS RUNNING');
                let query = `INSERT INTO College (collegeName, CoAbbreviation) VALUES(${collegeName} + ',' +  ${CoAbbreviation})`;
                
                db.query(query, (err,result) => {
                
                    if (err) { 
                        return res.status(500).send(err);
                    }
                    
                    res.redirect('/');

                });
            }
        
        }

    },

    editCollegePage: (req, res) => {
        
        let collegeID = req.params.id;
        let query = `SELECT * FROM College WHERE collegeID = ${collegeID}`;
        //let query = `SELECT * FROM College`;
        //console.log(query);

        db.query(query, (err, result) => {
            if (err) {
                // error 500 is internal sever error 
                res.send(500).send(err)
            }
            
            res.render('edit_college.ejs', {
                title: "Edit College",
                College: result[0],
                message: ''
            });
        })
        
    },
    
    editCollege: (req, res) => {

        let collegeID = req.params.id;
        let collegeName = req.body.collegeName;
        let CoAbbreviation = req.body.CoAbbreviation;

        let editCollegeQuery = `Update College SET collegeName = ${collegeName} `+ `, ` + `CoAbbreviation = ${CoAbbreviation}` +` WHERE collegeID = ${collegeID}`;
        //console.log(editCollegeQuery);
        db.query(editCollegeQuery, (err, results) => {
            if(err){
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },

    deleteCollege: (req,res) => {
        let collegeID = req.params.id;
        let deleteCollegeQuery =  `DELETE FROM College WHERE collegeID = ${collegeID}`;
        console.log(collegeID);

        db.query(deleteCollegeQuery, (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });

    }

};


//************END ADD COLLEGE***************************