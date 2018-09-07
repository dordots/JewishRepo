import GoogleMapsLoader = require("google-maps");

export function initializeGoogleMaps(){
  return () => {
    GoogleMapsLoader.KEY = "AIzaSyBCptJVdxT9qytWXFkm4cVfXa6qdDWOncI";
    GoogleMapsLoader.LANGUAGE = 'he';
    GoogleMapsLoader.REGION = 'IL';
    GoogleMapsLoader.LIBRARIES = ['places'];
    return new Promise<void>(resolve => GoogleMapsLoader.load(() => {
      resolve();
    }));
  }
}

export function initializeUserGeoposition(provider){
  return ()=>{
    return new Promise((resolve, reject) => {
      // provider.geolocation.getCurrentPosition(/*{timeout: 10000, maximumAge: 1209600000, enableHighAccuracy: true}*/)
      //   .then(()=>resolve()).catch(()=>resolve());
      resolve();
    });
  }
}
