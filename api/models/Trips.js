/**
 * Trips.js
 *
 * @description Trip info
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
      OriginDateTime: {
          type: 'datetime',
          required: true,
          columnName: 'Origin DateTime'
      },
      OriginAddress: {
        type: 'string',
        required: true,
        columnName: 'Origin House Number and Street Name'
      },
      OriginCity: {
        type: 'string',
        required: true
      },
      OriginState: {
        type: 'string',
        required: true,
        regex: /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/
      },
      OriginZip: {
        type: 'string',
        required: true,
        regex: /^\d{5}$|^\d{5}(-\d{4})$/
      },
      DestinationDateTime: {
        type: 'datetime',
        required: true,
        columnName: 'Destination DateTime'
      },
      DestinationAddress: {
        type: 'string',
        required: true,
        columnName: 'Destination House Number and Street Name'
      },
      DestinationCity: {
        type: 'string',
        required: true
      },
      DestinationState: {
        type: 'string',
        required: true,
        regex: /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/
      },
      DestinationZip: {
        type: 'string',
        required: true,
        regex: /^\d{5}$|^\d{5}(-\d{4})$/
      },
      DestinationPhone: {
        type: 'string',
        required: true
      },
      Miles: {
        type: 'decimal',
        required: false
      },
      EstimatedTime: {
        type: 'decimal',
        required: false
      },
      Deleted: {
          type: 'boolean'
      }
    }

};

