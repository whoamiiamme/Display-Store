import { YOUR_API_KEY } from './config';

export function geoLocation() {
	if (navigator.geolocation) {
		return new Promise((resolve) => {
			navigator.geolocation.getCurrentPosition(function(position) {
				resolve({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
					accuracy: position.coords.accuracy
				});
			});
		});
	}
}

export function geoCoding({ place_id }) {
	return new Promise((resolve, reject) => {
		fetch(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${place_id}
		&key=${YOUR_API_KEY}`)
			.then((res) => res.json())
			.then((result) => {
				resolve(result.results[0].formatted_address);
			})
			.catch((error) => {
				reject(error);
			});
	});
}

export async function NearbySearch({ map, position, query }) {
	let service;
	let infowindow;
	const sydney = new window.google.maps.LatLng(position.latitude, position.longitude);

	infowindow = new window.google.maps.InfoWindow();
	map = await new window.google.maps.Map(document.getElementById('map'), {
		center: sydney,
		zoom: 15
	});
	const request = {
		keyword: query,
		location: sydney,
		radius: '5000000'
	};
	service = new window.google.maps.places.PlacesService(map);
	let locState = [];
	return new Promise((resolve) => {
		service.nearbySearch(request, async (results, status) => {
			if (status === window.google.maps.places.PlacesServiceStatus.OK) {
				for (let i = 0; i < results.length; i++) {
					// console.log(results);
					const state = {
						name: results[i].name,
						address: await geoCoding({ place_id: results[i].place_id })
					};
					locState.push(state);
					createMarker({
						place: results[i],
						infowindow,
						map
					});
					map.setCenter(results[0].geometry.location);
				}
			}
		});
		resolve(locState);
	});
}

export function createMarker({ place, infowindow, map }) {
	const marker = new window.google.maps.Marker({
		map,
		position: place.geometry.location
	});
	window.google.maps.event.addListener(marker, 'click', () => {
		infowindow.setContent(place.name);
		infowindow.open(map);
	});
}
