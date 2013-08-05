'use strict';

trckrApp
  .factory('dataService', ['parseService', 'parse', function (parseService, parse) {
    
    // define models
    function Fuelling(attributes) {
      parse.Model.call(this, 'Fuelling', attributes);
    }

    Fuelling.prototype = Object.create(parse.Model.prototype);
    Fuelling.prototype.constructor = Fuelling;
  
    return {

      // retrieves all fuellings
      getAllFuellings: function() {
        //return parseService.getAllFuellings();
        var obj = new Fuelling({});
        return obj.query();
      },

      // adds fuelling to database
      addFuelling: function(fuelling) {
        var obj = new Fuelling({
          date: fuelling.date,
          country: fuelling.country,
          state: fuelling.state,
          volume: fuelling.volume,
          volumeType: fuelling.volumeType
        });
        return obj.save();
      },

      getVolumeType: function(country) {
        if( country.name === 'Canada' ) {
          return { name: 'Litres', abbreviation: 'L' };
        }

        if( country.name === 'US' ) {
          return { name: 'Gallons', abbreviation: 'G' };
        }
      },

      getCountries: function() {
        return [
          { name: 'Canada' },
          { name: 'US' }
        ];
      },

      getStates: function(country) {
        if( country.name === 'Canada' ) {
          return [
            {
              name: "Alberta",
              abbreviation: "AB",
            },
            {
              name: "British Columbia",
              abbreviation: "BC",
            },
            {
              name: "Manitoba",
              abbreviation: "MB",
            },
            {
              name: "New Brunswick",
              abbreviation: "NB",
            },
            {
              name: "Newfoundland",
              abbreviation: "NL"
            },
            {
              name: "Northwest Territories",
              abbreviation: "NT"
            },
            {
              name: "Nova Scotia",
              abbreviation: "NS"
            },
            {
              name: "Nunavut",
              abbreviation: "NU"
            },
            {
              name: "Ontario",
              abbreviation: "ON"
            },
            {
              name: "Prince Edward Island",
              abbreviation: "PE"
            },
            {
              name: "Quebec",
              abbreviation: "QC"
            },
            {
              name: "Saskatchewan",
              abbreviation: "SK"
            },
            {
              name: "Yukon Territory",
              abbreviation: "YT"
            }
          ];
        }

        if( country.name === 'US' ) {
          return [
            {
              name: "Alabama",
              abbreviation: "AL"
            },
            {
              name: "Alaska",
              abbreviation: "AK"
            },
            {
              name: "Arizona",
              abbreviation: "AZ"
            },
            {
              name: "Arkansas",
              abbreviation: "AR"
            },
            {
              name: "California",
              abbreviation: "CA"
            },
            {
              name: "Colorado",
              abbreviation: "NC"
            },
            {
              name: "Connecticut",
              abbreviation: "CT"
            },
            {
              name: "Delaware",
              abbreviation: "DE"
            },
            {
              name: "District of Columbia",
              abbreviation: "DC"
            },
            {
              name: "Florida",
              abbreviation: "FL"
            },
            {
              name: "Georgia",
              abbreviation: "GA"
            },
            {
              name: "Hawaii",
              abbreviation: "HI"
            },
            {
              name: "Idaho",
              abbreviation: "ID"
            },
            {
              name: "Illinois",
              abbreviation: "IL"
            },
            {
              name: "Indiana",
              abbreviation: "IN"
            },
            {
              name: "Iowa",
              abbreviation: "IA"
            },
            {
              name: "Kansas",
              abbreviation: "KS"
            },
            {
              name: "Kentucky",
              abbreviation: "KY"
            },
            {
              name: "Louisiana",
              abbreviation: "LA"
            },
            {
              name: "Maine",
              abbreviation: "ME"
            },
            {
              name: "Maryland",
              abbreviation: "MD"
            },
            {
              name: "Massachusetts",
              abbreviation: "MA"
            },
            {
              name: "Michigan",
              abbreviation: "MI"
            },
            {
              name: "Minnesota",
              abbreviation: "Mn"
            },
            {
              name: "Mississippi",
              abbreviation: "MS"
            },
            {
              name: "Missouri",
              abbreviation: "MO"
            },
            {
              name: "Montana",
              abbreviation: "MT"
            },
            {
              name: "Nebraska",
              abbreviation: "NE"
            },
            {
              name: "Nevada",
              abbreviation: "NV"
            },
            {
              name: "New Hampshire",
              abbreviation: "NH"
            },
            {
              name: "New Jersey",
              abbreviation: "NJ"
            },
            {
              name: "New Mexico",
              abbreviation: "NM"
            },
            {
              name: "New York",
              abbreviation: "NY"
            },
            {
              name: "North Carolina",
              abbreviation: "NC"
            },
            {
              name: "North Dakota",
              abbreviation: "ND"
            },
            {
              name: "Ohio",
              abbreviation: "OH"
            },
            {
              name: "Oklahoma",
              abbreviation: "OK"
            },
            {
              name: "Oregon",
              abbreviation: "OR"
            },
            {
              name: "Pennsylvania",
              abbreviation: "PA"
            },
            {
              name: "Rhode Island",
              abbreviation: "RI"
            },
            {
              name: "South Carolina",
              abbreviation: "SC"
            },
            {
              name: "South Dakota",
              abbreviation: "SD"
            },
            {
              name: "Tennessee",
              abbreviation: "TN"
            },
            {
              name: "Texas",
              abbreviation: "TX"
            },
            {
              name: "Utah",
              abbreviation: "UT"
            },
            {
              name: "Vermont",
              abbreviation: "VT"
            },
            {
              name: "Virginia",
              abbreviation: "VA"
            },
            {
              name: "Washington",
              abbreviation: "WA"
            },
            {
              name: "West Virginia",
              abbreviation: "WV"
            },
            {
              name: "Wisconsin",
              abbreviation: "WI"
            },
            {
              name: "Wyoming",
              abbreviation: "WY"
            }
          ];
        }
        return [

        
        ]
      }
    };
  }]);