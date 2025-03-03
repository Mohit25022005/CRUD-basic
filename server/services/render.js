const axios = require('axios');

exports.homeRoutes = (req, res) => {
    // Fetch all users
    axios.get('http://localhost:8080/api/users')
        .then(function(response){
            res.render('index', { users : response.data });
        })
        .catch(err =>{
            res.send(err);
        });
}

exports.add_user = (req, res) => {
    res.render('add_user');
}

exports.update_user = (req, res) => {
    const userId = req.query.id;  // Extract user ID from query params

    axios.get(`http://localhost:8080/api/users/${userId}`)
        .then(function(userdata) {
            res.render("update_user", { user: userdata.data });
        })
        .catch(err => {
            res.status(500).send("Error fetching user data");
        });
};
