var express = require("express");
var router = express.Router();
// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");
// Create all our routes and set up logic within those routes where required.
// The following route is the home page or generic page route
router.get("/", function(req, res) {
  burger.all(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
// This route adds a new burger to the un-eaten list
router.post("/api/burgers", function(req, res) {
  burger.create([
    "name", "devoured"
  ], [
    req.body.name, "false"
  ], function(result) {
    // Send back the ID of the new burger after saving to the database
    res.json({ id: result.insertId });
  });
});
// Update the focused burger to devour
router.put("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  console.log("condition", condition);
  burger.update({
    devoured: "true"
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// delete a burger. I don't really need this however
router.delete("/api/burgers/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  cat.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
// Export routes for server.js to use.
module.exports = router;