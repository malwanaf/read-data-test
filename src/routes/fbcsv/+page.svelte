<script>
	import Sun from 'svelte-radix/Sun.svelte';
	import Moon from 'svelte-radix/Moon.svelte';
	import { toggleMode } from 'mode-watcher';
	import { Button } from '$lib/components/ui/button';
	import { onMount } from 'svelte';
	import * as Table from '$lib/components/ui/table';
	import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
	import * as Pagination from '$lib/components/ui/pagination';

	let items = [];
	let currentPage = 1;
	let itemsPerPage = 10;

    async function fetchData() {
    try {
      const response = await fetch('https://lightningdetectorbmkg-default-rtdb.asia-southeast1.firebasedatabase.app/ld/raspytest/data.json');
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
    const interval = setInterval(fetchData, 10);
    
    // Clear interval on component unmount
    return () => clearInterval(interval);
  });

	$: paginatedItems = items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

	async function exportToCSV() {
        try {
            // Convert items array to CSV format
            const csvContent = "data:text/csv;charset=utf-8,"
                + items.map(item => Object.values(item).join(",")).join("\n");

            // Create a link element to trigger the download
            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "data.csv");
            document.body.appendChild(link);

            // Simulate click to trigger the download
            link.click();

            // Cleanup
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error exporting to CSV:', error);
        }
    }
</script>

<div class="m-4 inline-flex space-x-2">
	<a href="/fbui">
		<Button class="">
			<ChevronLeft class="h-4 w-4" />
			Back to Dashboard
		</Button>
	</a>

	
	<Button on:click={exportToCSV} variant="destructive">
		Export to CSV
	</Button>
	
	<Button on:click={toggleMode} variant="outline" size="icon">
		<Sun
			class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
		/>
		<Moon
			class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
		/>
		<span class="sr-only">Toggle theme</span>
	</Button>
</div>

<div class="relative mx-4 mb-4 overflow-x-auto rounded-md border">
	<Table.Root class="w-full text-lg">
		<Table.Header>
			<Table.Row>                
				<Table.Head>ID</Table.Head>
				<Table.Head>Time</Table.Head>
				<Table.Head>Distance</Table.Head>
				<Table.Head>Intensity</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#if !items || items.length === 0}
				<p class="m-2">No items found.</p>
			{:else}
				{#each paginatedItems as item}
					{#each Object.values(item) as innerItem}
						<Table.Row>                        
							<Table.Cell>{innerItem.id}</Table.Cell>
							<Table.Cell>{innerItem.time}</Table.Cell>
							<Table.Cell>{innerItem.distance}</Table.Cell>
							<Table.Cell>{innerItem.intensity}</Table.Cell>
						</Table.Row>
					{/each}
				{/each}
			{/if}
		</Table.Body>
	</Table.Root>
</div>

<div class="mb-4">
	<Pagination.Root count={items.length} perPage={itemsPerPage} let:pages>
		<Pagination.Content>
			<Pagination.Item>
				<Pagination.PrevButton
					on:click={() => (currentPage = currentPage - 1)}
					disabled={currentPage === 1}
				/>
			</Pagination.Item>
			{#each pages as page (page.key)}
				{#if page.type === 'ellipsis'}
					<Pagination.Item>
						<Pagination.Ellipsis />
					</Pagination.Item>
				{:else}
					<Pagination.Item>
						<Pagination.Link
							{page}
							on:click={() => (currentPage = page.value)}
							isActive={currentPage == page.value}
						>
							{page.value}
						</Pagination.Link>
					</Pagination.Item>
				{/if}
			{/each}
			<Pagination.Item>
				<Pagination.NextButton
					on:click={() => (currentPage = currentPage + 1)}
					disabled={currentPage === pages.length}
				/>
			</Pagination.Item>
		</Pagination.Content>
	</Pagination.Root>
</div>
