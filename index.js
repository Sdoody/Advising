module.exports = {
    getHomePage: (req, res) => {
        let query = "SELECT * FROM `College`ORDER BY collegeID ASC"; // query database to get all the Colleges
        
        // execute query
        db.query(query, (err, result) => {
            if (err) {
                res.redirect('/');
            }
            //console.log(query);
            
            res.render('index.ejs', {
                title: "Welcome to Lewis University | View" 
                ,College: result
            
            });
            
        });
    },
};