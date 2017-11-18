// noinspection Annotator
/**
 * People.js
 *
 * @description Name and address info
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
        FirstName: {
            type: 'string',
            required: true,
            columnName: 'First Name',
            regex: /[^a-zA-Z]?/
        },
        LastName: {
            type: 'string',
            required: true,
            columnName: 'Last Name',
            regex: /[^a-zA-Z]?/
        },
        StreetAddress: {
            type: 'string',
            required: true,
            columnName: 'House Number and Street Name'
        },
        City: {
            type: 'string',
            required: true
        },
        State: {
            type: 'string',
            required: true,
            regex: /^((A[LKSZR])|(C[AOT])|(D[EC])|(F[ML])|(G[AU])|(HI)|(I[DLNA])|(K[SY])|(LA)|(M[EHDAINSOT])|(N[EVHJMYCD])|(MP)|(O[HKR])|(P[WAR])|(RI)|(S[CD])|(T[NX])|(UT)|(V[TIA])|(W[AVIY]))$/
        },
        Zip: {
            type: 'string',
            required: true,
            regex: /^\d{5}$|^\d{5}(-\d{4})$/
        },
        Deleted: {
            type: 'boolean'
        }
    }

};

