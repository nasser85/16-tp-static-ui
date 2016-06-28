var express = require('express');
var router = express.Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Place = require('../models/place');
var Promise = require('bluebird');

router.get('/', function(req, res, next) {

  // var findingHotels = Hotel.findAll({
  //   include: [Place]
  // });

  // var findingActivities = Activity.findAll({
  //   include: [Place]
  // });

  // var findingRestaurants = Restaurant.findAll({
  //   include: [Place]
  // });

  // Promise.all([
  //   findingHotels,
  //   findingActivities,
  //   findingRestaurants
  // ])
  // .spread(function(hotels, activities, restaurants) {
  //   res.render('index', {
  //     hotels: hotels,
  //     activities: activities,
  //     restaurants: restaurants
  //   });
  // })
  var databaseCollection = {};
  var placePromise = Place.findAll({});
  var hotelPromise = Hotel.findAll({});
  var restaurantPromise = Restaurant.findAll({});
  var activityPromise = Activity.findAll({});

  Promise.all([placePromise, hotelPromise, restaurantPromise, activityPromise])
  .then(function(promiseArr){
    databaseCollection['places'] = promiseArr[0];
    databaseCollection['hotels'] = promiseArr[1];
    databaseCollection['restaurants'] = promiseArr[2];
    databaseCollection['activities'] = promiseArr[3];
    res.render('index', databaseCollection);
  })
  .catch(next);

});

module.exports = router;
