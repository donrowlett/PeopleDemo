/**
 * Vehicles.js
 *
 * @description Vehicle info
 */

module.exports = {

    attributes: {
      ID: {
          type: 'integer',
          unique: true,
          primaryKey: true,
          columnName: 'Primary_key',
          autoIncrement: true
      },
      Name: {
          type: 'string',
          required: true,
          columnName: 'Name'
      },
      Description: {
        type: 'string',
        required: true,
        columnName: 'Description'
      },
      VehiclePhotoUrl: {
        type: 'string',
        required: false
      },
      MaxSpeed: {
        type: 'string',
        required: true
      },
      Persons: {
        type: 'string',
        required: true
      },
      Driver: {
        type: 'string',
        required: false
      },
      DriverPhotoUrl: {
        type: 'string',
        required: false
      },
      WheelchairLift: {
        type: 'boolean',
        required: true
      },
      InService: {
        type: 'boolean',
        required: true
      },
      Deleted: {
          type: 'boolean'
      }
    }

};

