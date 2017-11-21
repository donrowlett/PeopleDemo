/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function (cb) {
  "Use strict";
  Vehicles.count().exec(function (err, numVehicles) {
    if (err) {
      return cb(err);
    }

    if (numVehicles === 0) {
      var seedData = [
        {
          Name : 'Millenium Falcon',
          Description : 'Fastest ship in the observable universe',
          VehiclePhotoUrl: 'falcon.jpg',
          MaxSpeed: '86,000 mps',
          Persons: '6',
          WheelchairLift: true,
          InService: true
        }
        ];

      Vehicles.create(seedData).exec(function(err, vehicleRecordsCreated) {
        if (err) {
          return cb(err);
        }

      });
      return (cb);
    }

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();

});
};
