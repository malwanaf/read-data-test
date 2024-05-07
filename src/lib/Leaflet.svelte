<script lang="ts">
	import { onMount, onDestroy, setContext, createEventDispatcher, tick } from 'svelte';
	import L from 'leaflet';
	import 'leaflet/dist/leaflet.css';
	import { Opacity } from 'svelte-radix';
	//import 'https://cdn.jsdelivr.net/gh/Falke-Design/L.Donut@latest/src/L.Donut.js';
	import { writable } from 'svelte/store';
	export let bounds: L.LatLngBoundsExpression | undefined = undefined;
	export let view: L.LatLngExpression | undefined = undefined;
	export let zoom: number | undefined = undefined;
	
	const updateCircleStore = writable(null);

// Function to update circle properties based on new product data
function updateCircle(product) {
  if (circle) {
	map.removeLayer(circle); // Remove existing circle
	createCircle(product); // Create new circle based on new product data
  }
}

// Set the updateCircle function in the store along with its parameters
updateCircleStore.set(updateCircle);
	export { map };

	const dispatch = createEventDispatcher();

	let map: L.Map | undefined;
	let mapElement: HTMLElement;
	let circle;

	let center = [-7.816177085162616, 110.29458648417666]; // Central point

	function calculateRadius(distance) {
		// Logic to calculate radius based on distance
		return distance * 100; // Adjust the multiplier as needed
	}

	function createCircle(product) {
		const center = [51.5, -0.09]; // Center of the circle
		const radius = calculateRadius(product.distance); // Calculate radius based on product.distance
		circle = L.circle(center, {
			color: 'yellow', // Border color
			opacity: 0, // Border opacity
			fillColor: 'yellow', // Fill color
			fillOpacity: 0.1, // Initial fill opacity
			radius: radius
		}).addTo(map);
	}

	onMount(() => {
		if (!bounds && (!view || !zoom)) {
			throw new Error('Must set either bounds, or view and zoom.');
		}

		map = L.map(mapElement, { zoomControl: false })
			// example to expose map events to parent components:
			.on('zoom', (e) => dispatch('zoom', e))
			.on('popupopen', async (e) => {
				await tick();
				e.popup.update();
			});

		// zoom control
		// m ex

		// scale control
		// let scale = L.control.scale(); // Creating scale control
		//  scale.addTo(map); // Adding scale control to the map

		// L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
		// 	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'

		L.tileLayer(
			'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
		).addTo(map);

		// let labelLayer = L.tileLayer(
		// 	'https://server.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
		// 	{
		// 		attribution: 'Labels &copy; Esri &mdash; Source: Esri'
		// 	}
		// ).addTo(map);

		let Stadia_StamenTerrainLabels = L.tileLayer(
			'https://tiles.stadiamaps.com/tiles/stamen_terrain_labels/{z}/{x}/{y}{r}.{ext}',
			{
				minZoom: 0,
				maxZoom: 20,
				ext: 'png'
			}
		).addTo(map);

		// NewMap From Falke. L. Donut:

		// 	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		//       maxZoom: 18,
		//       attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		//   }).addTo(map);

		//////FAlKE

		// let donut = L.donut(map.getCenter(),{
		// 	radius: 2000,
		// 	innerRadius: 1000,
		// 	innerRadiusAsPercent: false,
		// 	}).addTo(map);

		// Define the custom control
		// let CustomZoomControl = L.Control.extend({
		// onAdd: function(map) {
		// 	let container = L.DomUtil.create('div', 'custom-zoom-control');
		// 	container.innerHTML = '<button class="zoom-in">+</button><button class="zoom-out">-</button>';

		// 	// Prevent click events on the control from being propagated to the map
		// 	L.DomEvent.disableClickPropagation(container);

		// 	// Handle click events on the zoom buttons
		// 	L.DomEvent.on(container, 'click', function(e) {
		// 	let zoomDelta = (e.target.classList.contains('zoom-in')) ? 1 : -1;
		// 	map.setZoom(map.getZoom() + zoomDelta);
		// 	});

		// 	return container;
		// }
		// });

		// // Create an instance of the custom control
		// let customZoomControl = new CustomZoomControl();

		// // Add the custom control to the map
		// customZoomControl.addTo(map);

		// Define radii in meters
		// 	let radii = [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,10000,
		// 		11000, 12000, 13000, 14000, 15000, 16000, 17000, 18000, 19000, 20000,
		// 		21000, 22000, 23000, 24000, 25000, 26000, 27000, 28000, 29000,
		// 	]; // in meters

		// // Draw geodetic range rings
		// radii.reverse().forEach((radius, index) => {
		// 	let circle = L.circle(center, {
		// 		color: 'yellow', // Border color
		// 		opacity: 0, // Border opacity
		// 		fillColor: 'yellow', // Fill color
		// 		fillOpacity: 0.1 / (index + 1), // Adjust fill opacity to prevent stacking
		// 		radius: radius,
		// 	}).addTo(map);

		// 	// Create popup content
		// 	let popupContent = `Radius: ${radius/1000} km`;

		// 	// Bind popup to circle
		// 	circle.bindPopup(popupContent);
		// });

		// Function to update circle properties based on new product data
		
	});

	

	onDestroy(() => {
		map?.remove();
		map = undefined;
	});

	setContext('map', {
		getMap: () => map
	});

	$: if (map) {
		if (bounds) {
			map.fitBounds(bounds);
		} else if (view && zoom) {
			map.setView(view, zoom);
		}
	}
</script>

<div class="z-0 h-full w-full" bind:this={mapElement}>
	{#if map}
		<slot />
	{/if}
</div>
