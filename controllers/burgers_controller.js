// Set up Controller.  Activity 16
var express = require("express");
var router = express.Router();
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
// Routing is the where.  Function is handled by controller.  Function is the what.  However don't define functions here.   
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/", function(req, res) {
  burger.insertOne(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
      console.log("condition", condition);

  burger.updateOne(
    {
    devoured: req.body.devoured
  }, 
    condition, function() {
    res.redirect("/");
  });
});



// Export routes for server.js to use.
module.exports = router;
