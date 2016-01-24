// ============================================================
// Set variables 
// ============================================================
var express = require('express');
var _ = require('lodash');
var router = express.Router();
var NutritionixClient = require('nutritionix');
var nutritionix = new NutritionixClient({
    appId: '7c710fbd',
    appKey: 'a2f106128aa4b2ab81fd783fca5bf0ee'
    // debug: true, // defaults to false
});


// ============================================================
// error handling functions 
// ============================================================
var errMsgs = {
    natural: 'There was an issue performing a natural search',
    uncaught: 'There was an uncaught exception'
};

function logJson(o) {
    console.log(JSON.stringify(o,null,4));
}

function RequestErrorHandler(msg) {
    return function reqErrHndlr(e) {
        console.error(msg.red);

        if (_.isObject(e) && !(e instanceof Error)) {
            logJson(e);
        } else {
            console.error(e);
        }

        process.exit(1);

    };
}


// ============================================================
// routes 
// ============================================================
/*
 * POST to addChartValue.
 */
router.post('/addChartValue', function(req, res) {
    var db = req.db;
    var collection = db.get('nutritionixChart');
    var requestBody = req.body
    var itemToBeLookedUp = [ String(requestBody.yAxis) ];

    nutritionix.natural(itemToBeLookedUp.join('\n'))
	.then(naturalSearchSuccess, new RequestErrorHandler(errMsgs.natural))
	.catch(new RequestErrorHandler(errMsgs.uncaught));

	function naturalSearchSuccess(nRes){

	    _.forEach(nRes.results, function(r){
	        var foodSearched = r.parsed_query.food;
	  		
	        calories = _.find(r.nutrients, {attr_id: 208}) || { attr_id: null, value: null, unit: null, usda_tag: null };
	        protein  = _.find(r.nutrients, {attr_id: 203}) || { attr_id: null, value: null, unit: null, usda_tag: null };
	        fat      = _.find(r.nutrients, {attr_id: 204}) || { attr_id: null, value: null, unit: null, usda_tag: null };
	        carbs    = _.find(r.nutrients, {attr_id: 205}) || { attr_id: null, value: null, unit: null, usda_tag: null };

	    	var nutritionalValues = { xAxis: String(foodSearched), yAxisCalories: String(calories.value), yAxisProtein: String(protein.value), yAxisFat: String(fat.value), yAxisCarbs: String(carbs.value) }
			
			collection.insert(nutritionalValues, function(err, result){
		        res.send(
		            (err === null) ? { msg: '' } : { msg: err }
		        );
		    });
	    });
	}
});


/*
 * GET d3Chart.
 */
router.get('/nutritionixChart', function(req, res) {
    var db = req.db;
    var collection = db.get('nutritionixChart');
    collection.find({},{},function(e,docs){
        res.json(docs);
    });
});


/*
DELETE to deleteBar.
*/
router.delete('/deleteBar/:id', function(req, res) {
    var db = req.db;
    var collection = db.get('nutritionixChart');
    var barToDelete = req.params.id;
    collection.remove({ '_id' : barToDelete }, function(err) {
        res.send((err === null) ? { msg: '' } : { msg:'error: ' + err });
    });
});


module.exports = router;
