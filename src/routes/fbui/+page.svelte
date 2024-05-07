<script lang="ts">
	// Import statements
	import '../../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import ExclamationTriangle from 'svelte-radix/ExclamationTriangle.svelte';
	import * as Alert from '$lib/components/ui/alert/index.ts';
	import { Button } from '$lib/components/ui/button';
	import ChevronRight from 'svelte-radix/ChevronRight.svelte';
	import { Label } from '$lib/components/ui/label/index.ts';
	import { Input } from '$lib/components/ui/input/index.ts';
	import * as Menubar from '$lib/components/ui/menubar/index.js';
	
	
	import { updateCircleStore } from '$lib/Leaflet.svelte'; // Adjust the path as needed

let updateCircle;

// Subscribe to the updateCircleStore to get the updateCircle function
updateCircleStore.subscribe(value => {
  updateCircle = value;
});

updateCircle(8);

	// Initial data and variables
	const initialView: LatLngExpression = [-7.816177085162616, 110.29458648417666];
	const markerLocations: Array<LatLngExpression> = [[-7.816177085162616, 110.29458648417666]];
	let eventData = [];
	
	// Function to fetch data
	async function fetchData() {
	  try {
		const response = await fetch('https://lightningdetectorbmkg-default-rtdb.asia-southeast1.firebasedatabase.app/ld/data.json');
		if (!response.ok) {
		  throw new Error('Failed to fetch data');
		}
		const rawData = await response.json();
		console.log('Parsed data:', rawData);
		eventData = Object.values(rawData);
	  } catch (error) {
		console.error('Error fetching data:', error);
	  }
	}
	
	// Fetch data on component mount and poll for new data
	import { onMount } from 'svelte';
	import { update } from 'firebase/database';
	onMount(() => {
	  fetchData(); // Fetch data initially
	  
	  // Poll for new data every 10 seconds
	  const interval = setInterval(fetchData, 10000);
	  
	  // Clear interval on component unmount
	  return () => clearInterval(interval);
	});

	
	
  </script>
  
  <!-- HTML Structure -->
  <div class="absolute z-20 m-2 w-max top-0 right-0">
	<a href="/customtable">
	  <Button variant="secondary" class="">
		Go to data-viewer
		<ChevronRight class="h-4 w-4" />
	  </Button>
	</a>
  </div>
  
  <div class="absolute bottom-0 left-0 z-30 m-2 w-max">
	<div class="alert-area mb-2">
  {#each eventData.slice().slice(-1) as product}
    <Alert.Root variant="default" class="m-2 bg-opacity-70 border-opacity-10">
      <ExclamationTriangle class="h-4 w-4" />
      <Alert.Title>Latest Strike</Alert.Title>
      <Alert.Description>
        {product.timestamp} - {product.distance} - {product.intensity}
      </Alert.Description>
    </Alert.Root>
	
    
  {/each}
</div>

  </div>
  
  <div class="z-0 h-screen w-full">
	<!-- Leaflet Map -->
	<Leaflet view={initialView} zoom={14}>
	  {#each markerLocations as latLng}
		<Marker {latLng} width={40} height={40}>
		  <!-- Icon -->
		  <svg xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
			viewBox="0 0 50 50">
			<path d="M20,10 L20,30 M10,20 L30,20"
			  stroke="red"
			  stroke-width="2"
			  style="fill:#e9204f;fill-rule:nonzero"
			  transform="matrix(1.25,0,0,1.25,0,0)" />
		  </svg>
		  <Popup>Sensor Location</Popup>
		</Marker>
	  {/each}
	</Leaflet>
  </div>
  