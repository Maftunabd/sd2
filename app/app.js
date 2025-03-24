// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');

// Get the functions in the db.js file to use
const db = require('./services/db');

// Create a route for root
app.get("/", function(req, res) {
    res.render("index",{'title': 'My index page', 'heading': 'My heading'});
});


app.get("/all-students-formatted", async (req, res) => {
    try {
        const sql = 'SELECT * FROM Students';
        const results = await db.query(sql);
        console.log(results);

        // Convert results into a single row (array of names)
        const formattedResults = results.map(student => student.name.toUpperCase());

        res.json({ students: formattedResults });
    } catch (error) {
        console.error("❌ Error fetching formatted students:", error);
        res.status(500).json({ message: "Database error", error: error.message });
    }
});


app.get("/db_test", async (req, res) => {
    try {
        const sql = 'SELECT * FROM test_table';
        const results = await db.query(sql);
        console.log(results);
        res.json(results);
    } catch (error) {
        console.error("❌ Error testing database:", error);
        res.status(500).json({ message: "Database error", error: error.message });
    }
});


// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});