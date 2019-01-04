import GoogleMapsLoader = require("google-maps");

export function initializeGoogleMaps() {
  return () => {
    GoogleMapsLoader.KEY = "AIzaSyBCptJVdxT9qytWXFkm4cVfXa6qdDWOncI";
    GoogleMapsLoader.LANGUAGE = "he";
    GoogleMapsLoader.REGION = "IL";
    GoogleMapsLoader.LIBRARIES = ["places"];
    return new Promise(resolve =>
      GoogleMapsLoader.load(() => {
        console.log("GoogleMaps Initialized");
        resolve();
      })
    );
  };
}
