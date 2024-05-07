<!-- GetData.svelte -->
<script>
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
  
    // Function to fetch data
    async function fetchData() {
      try {
        const response = await fetch('https://lightningdetectorbmkg-default-rtdb.asia-southeast1.firebasedatabase.app/ld/data.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const rawData = await response.json();
        console.log('Parsed data:', rawData);
        return Object.values(rawData);
      } catch (error) {
        console.error('Error fetching data:', error);
        return [];
      }
    }
  
    // Store to hold the fetched data
    export const eventData = writable([]);
  
    // Fetch data on component mount and poll for new data
    onMount(() => {
      fetchData().then(data => {
        eventData.set(data); // Assign fetched data to eventData store
      });
      
      // Poll for new data every 10 seconds
      const interval = setInterval(() => {
        fetchData().then(data => {
          eventData.set(data); // Assign fetched data to eventData store
        });
      }, 10000);
      
      // Clear interval on component unmount
      return () => clearInterval(interval);
    });
  </script>
  