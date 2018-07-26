/* global google */

export const getUserPosition = () => new Promise((resolve) => {
  navigator.geolocation.getCurrentPosition((postition) => {
    resolve({
      latitude: postition.coords.latitude,
      longitude: postition.coords.longitude,
    });
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
        address: place.vicinity,
      })));
    });
  });
};

const shoudlFetchPlaces = (currentPosition, newPosition) => {
  if (currentPosition) {
    const { latitude, longitude } = currentPosition;
    return (newPosition.latitude - latitude) ** 2 + (newPosition.longitude - longitude) ** 2 > 0.01;
  }
  return true;
};

export const getUserPlaces = (currentPosition, currentPlaces) => (
  getUserPosition().then((newPosition) => {
    if (shoudlFetchPlaces(currentPosition, newPosition)) {
      return getNearbyPlaces(newPosition).then(places => ({
        places,
        location: newPosition,
      }));
    }
    return {
      places: currentPlaces,
      location: newPosition,
    };
  })
);
