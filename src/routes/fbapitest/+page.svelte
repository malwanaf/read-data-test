<script>
  import { onMount } from 'svelte';

  let items = [];
  
  async function fetchData() {
    try {
      const response = await fetch('https://lightningdetectorbmkg-default-rtdb.asia-southeast1.firebasedatabase.app/ld/data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const rawData = await response.json();
      console.log('Parsed data:', rawData);
      items = Object.values(rawData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  onMount(() => {
    fetchData(); // Fetch data initially
    
    // Poll for new data every 5 seconds
    const interval = setInterval(fetchData, 5000);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  });
</script>

<h1>Items</h1>

{#if items.length === 0}
  <p>No items found.</p>
{:else}
  <ul>
    {#each items as item}
      <li>
        <p>Distance: {item.distance}</p>
        <p>Intensity: {item.intensity}</p>
        <p>Timestamp: {item.timestamp}</p>
      </li>
    {/each}
  </ul>
{/if}
