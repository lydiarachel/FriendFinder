// ===============================================================================
// DEPENDENCIES AND LOAD DATA
// ==============================================================================

var friendData = require("../data/friends");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });


  // API POST Requests
  // Below code handles when a user submits questionairre and then submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out the questionairre... this data is then sent to the server...
  // Then the server saves the data to the friendData array)
  // ---------------------------------------------------------------------------

app.post("/api/friends", function(req, res) {
	var userData= req.body;
	var newScore = 0;
	var total = 0;
	var match = {
		name: "",
		photo: "",
		difference: 10000
	}

	// Calculating totals 
	for (var i = 0; i < friendData.length; i++) {
    total = 0;
    console.log(friendData)

		for (var j = 0; j < friendData[i].scores.length; j++) {
			total += Math.abs(parseInt(friendData[i].scores[j]) - parseInt(userData.scores[j]));

			if (total <= match.difference) {
				match.name = friendData[i].name,
				match.photo = friendData[i].photo,
				match.difference = total
			}
    	}
    }
    friendData.push(userData);
    res.json(match);
});
}