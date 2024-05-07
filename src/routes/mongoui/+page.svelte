<script lang="ts">
	import '../../app.css';
	import type { LatLngExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';
	import Marker from '$lib/Marker.svelte';
	import Popup from '$lib/Popup.svelte';
	import { Switch } from '$lib/components/ui/switch';
	import ExclamationTriangle from 'svelte-radix/ExclamationTriangle.svelte';
	import * as Alert from '$lib/components/ui/alert/index.ts';
	// import DraggableWindow from '$src/lib/DraggableWindow.svelte';
	import { Button } from '$lib/components/ui/button';
  	import ChevronRight from 'svelte-radix/ChevronRight.svelte';
  	import { Label } from '$lib/components/ui/label/index.ts';
  	import { Input } from '$lib/components/ui/input/index.ts';
	

	const initialView: LatLngExpression = [-7.816177085162616, 110.29458648417666];
	const markerLocations: Array<LatLngExpression> = [[-7.816177085162616, 110.29458648417666]];

	import * as Menubar from '$lib/components/ui/menubar/index.js';

	let bookmarks = false;
	let fullUrls = true;

	const profileRadioValue = 'benoit';

	//   get data
	import { onMount } from 'svelte';
	import { onDestroy } from 'svelte';

	let eventData = [];
	let eventSource;

	// Function to establish SSE connection
	const establishSSEConnection = () => {
		eventSource = new EventSource('http://localhost:3000/items/stream');

		// Event listener for 'message' event
		eventSource.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			eventData = data; // Update component state with received data
		});

		// Event listener for 'error' event
		eventSource.addEventListener('error', () => {
			console.error('SSE connection error');
			eventSource.close();
			// Attempt to reconnect after a delay
			setTimeout(establishSSEConnection, 2000); // Adjust the delay as needed
		});
	};

	onMount(() => {
		establishSSEConnection(); // Establish SSE connection on component mount
	});

	// Clean up SSE connection on component unmount
	onDestroy(() => {
		if (eventSource) {
			eventSource.close();
		}
	});
</script>

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
				<Alert.Description
					>{product.strikeId} - {product.timestamp} - {product.distance} - {product.intensity}</Alert.Description
				>
			</Alert.Root>
		{/each}
		<!-- {#each eventData as product}
    <Alert.Root class="m-2" >
        <ExclamationTriangle class="h-4 w-4" />
        <Alert.Title>New Strike Occurred</Alert.Title>
        <Alert.Description>{product.strikeId} - {product.timestamp} - {product.distance} - {product.intensity}</Alert.Description>
      </Alert.Root>
    {/each} -->
	</div>
</div>

<div class="z-0 h-screen w-full">
	<!-- Leaflet Map -->
	<Leaflet view={initialView} zoom={14}>
		{#each markerLocations as latLng}
			<Marker {latLng} width={40} height={40}>
				<!--  Icon -->
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xml:space="preserve"
					style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
					viewBox="0 0 50 50"
				>
					<path
						d="M20,10 L20,30 M10,20 L30,20"
						stroke="yellow"
						stroke-width="2"
						style="fill:#e9204f;fill-rule:nonzero"
						transform="matrix(1.25,0,0,1.25,0,0)"
					/>
				</svg>

				<Popup>Sensor Location</Popup>
			</Marker>
		{/each}
	</Leaflet>
</div>
