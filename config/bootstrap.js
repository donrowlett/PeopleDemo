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
  "use strict";
    bootstrapTimeout: 10000, // in millis

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
          Driver : 'Han',
          DriverPhotoUrl: 'han.jpg',
          InService: true
        },
        {
          Name : 'Wright Flyer',
          Description : 'Wright Brothers Aircraft',
          VehiclePhotoUrl: 'wright.jpg',
          MaxSpeed: '26mph',
          Persons: '2',
          Driver : 'Orville',
          DriverPhotoUrl: 'orville.jpg',
          InService: true
        },
        {
          Name : 'RVTD Van #1',
          Description : '12 Passenger',
          VehiclePhotoUrl: 'van1.jpg',
          MaxSpeed: '55mph',
          Persons: '12',
          Driver : 'Aaron',
          DriverPhotoUrl: 'aaron.jpg',
          InService: true
        },
        {
          Name : 'RVTD Van #2',
          Description : '8 Passenger',
          VehiclePhotoUrl: 'van2.jpg',
          MaxSpeed: '55mph',
          Persons: '8',
          Driver : 'Bob',
          DriverPhotoUrl: 'bob.jpg',
          InService: true
        },
        {
          Name : 'RVTD Van #3',
          Description : '6 Passenger',
          VehiclePhotoUrl: 'van3.jpg',
          MaxSpeed: '55mph',
          Persons: '6',
          Driver : 'Charles',
          DriverPhotoUrl: 'charles.jpg',
          InService: true
        },
        {
          Name : 'Rockswagon',
          Description : 'Flintstones human-powered vehicle',
          VehiclePhotoUrl: 'rockswagon.jpg',
          MaxSpeed: '5mph',
          Persons: '4',
          Driver : 'Barney',
          DriverPhotoUrl: 'barney.jpg',
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
