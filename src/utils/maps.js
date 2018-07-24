/* global google */

export const getUserLocation = () => new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition((postition) => {
    resolve(postition);
  });
});


export const getNearbyPlaces = ({ latitude, longitude }) => {
  const map = new google.maps.Map(document.getElementById('map'));
  const location = new google.maps.LatLng(latitude, longitude);
  const service = new google.maps.places.PlacesService(map);
  const request = {
    location,
    radius: '300',
    type: 'point_of_interest',
    openNow: true,
  };
  return new Promise((resolve) => {
    service.nearbySearch(request, (res) => {
      resolve(res.map(place => ({
        id: place.id,
        name: place.name,
      })));
    });
  });
};
