# TypeScript Utility functions

TypeScript function I use almost in every project in TypeScript and mostly VueJS.

## What does it include:

- **toBase64:** Convert File from input to Base64 string.
- **getBase64StringFromDataURL:** Resolve Base64 string from DataURL.
- **convertBlobToBase64:** Convert Blob to Base64 string.
- **isValidEmail:** Check if the email has valid format using RegEx.
- **isNullOrEmpty:** Check if the string is not empty, undefined nor null.
- **handleVirtualKeyboard:** Utility function used in a Virtual Keyboard VueJS component. [Check the article](https://medium.com/@mehdi.jai/create-a-virtual-text-keyboard-with-vuejs-x-typescript-x-scss-205f31c000ec)
- **handleNumPad:** Utility function used for a VueJS Virtual NumPad component.
- **dateHasPassedOffset:** Check if a date has passed an offset in seconds.
- **formatIsoDate:** Convert date from `yyyy/MM/dd HH:MM:ss` to `yyyy-mm-ddThh:mm`.
- **formatSSDate:** Convert date from `yyyy-mm-ddTHH:MM` to `yyyy/MM/dd HH:MM:ss`
- **getColor:** Generate random `hsl` color.
- **formatDistance:** Format distance to `KM` and `m`.
- **EnumToArray:** Convert enum to array of keys and values.
- **ObjectToArray:** Convert Object to array of keys and values.
- **sortBy:** Generic function to sort array of `T` type.

## Map Helper

This's a collection of helpers I use for Google Maps JS SDK.

- **isCoordinates:** Check if the input a map coordinates.
- **pathGenerator:** Generate random polygone path.
- **isWithinDiameter:** Check if a point is withing a diameter of a circle.
- **GetSegmentCenter:** Get the center point of a segment.
- **toString:** Convert GeoLocation latitude and longitude object to string.
- **setMap:** Initialize Google Maps map object
- **setMarker:** Add a marker a map.
- **setPolyline:** Add a polygone to a map.
- **setRadarCircle:** Add a circle to a map.
- **drawShape:** Draw a custom shape on a map.
- **getPosition:** Get the current localisation.

