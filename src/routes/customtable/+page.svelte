<script>
  import Sun from 'svelte-radix/Sun.svelte';
  import Moon from 'svelte-radix/Moon.svelte';
  import { toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button';
  import { onMount } from 'svelte';
  import * as Table from '$lib/components/ui/table';
  import ChevronLeft from 'svelte-radix/ChevronLeft.svelte';
  import { Label } from '$lib/components/ui/label/index.ts';
  import { Input } from '$lib/components/ui/input/index.ts';
  import { toast } from "svelte-sonner";
  import Reload from "svelte-radix/Reload.svelte";
  import * as Pagination from "$lib/components/ui/pagination";

  import * as Popover from '$lib/components/ui/popover';
  let items = [];
  let formData = { strikeId: '', timestamp: Date.now(), distance: '', intensity: '' };
  let isLoading = false;
  let isFormFilled = false;
  let currentPage = 1; // Current page number
  let itemsPerPage = 10; // Number of items per page


  function validateForm() {
    console.log("Form data:", formData);
    // Check if all form fields are filled
    isFormFilled = formData.strikeId !== '' && 
                   formData.timestamp !== '' && 
                   formData.distance !== '' && 
                   formData.intensity !== '';
    
  }

  onMount(() => {
    const eventSource = new EventSource('http://localhost:3000/items/stream');

    eventSource.onmessage = function (event) {
      items = JSON.parse(event.data);
    };
  });

  async function handleSubmit(event) {
    event.preventDefault();
    isLoading = true; // Set loading state to true while waiting for response
    const response = await fetch('http://localhost:3000/items/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    isFormFilled = false;
    
    if (response.ok) {
      // If the request was successful, reset the form data
      formData = { strikeId: '', timestamp: Date.now(), distance: '', intensity: '' };
      // If you want to update the items list or take other actions, you can do it here
      console.log('Data added successfully');
    } else {
      console.error('Failed to add data');
    }

    setTimeout(() => {
      isLoading= false;
    }, 2000);
    
  }
</script>

<div class="m-4 inline-flex space-x-2">

  <a href="/mongoui">
    <Button class="">
      <ChevronLeft class="h-4 w-4" />
      Back to Dashboard
    </Button>
  </a>

  <Button on:click={toggleMode} variant="outline" size="icon">
    <Sun class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    <Moon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    <span class="sr-only">Toggle theme</span>
  </Button>

  <!-- PopOver add Data -->
  <Popover.Root>
    <Popover.Trigger asChild let:builder>
      <Button builders={[builder]} variant="outline">Add New Data</Button>
    </Popover.Trigger>
    <Popover.Content class="w-80">
      <form on:submit={handleSubmit}>
        <div class="grid gap-4">
          <div class="space-y-2">
            <h4 class="font-medium leading-none">Dimensions</h4>
            <p class="text-sm text-muted-foreground">Set the dimensions for the layer.</p>
          </div>
          <div class="grid gap-2">
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="strikeId">ID</Label>
              <Input bind:value={formData.strikeId} id="strikeId" class="col-span-2 h-8" on:input={validateForm}/>
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="timestamp">Time</Label>
              <Input bind:value={formData.timestamp} id="timestamp" class="col-span-2 h-8" on:input={validateForm}/>
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="distance">Distance</Label>
              <Input bind:value={formData.distance} id="distance" class="col-span-2 h-8" on:input={validateForm}/>
            </div>
            <div class="grid grid-cols-3 items-center gap-4">
              <Label for="intensity">Intensity</Label>
              <Input bind:value={formData.intensity} id="intensity" class="col-span-2 h-8" on:input={validateForm}/>
            </div>
            <div class="flex justify-end">
              <!-- Disable the button if the form is not filled or if loading -->
              <Button type="submit" disabled={!isFormFilled || isLoading}>
                {#if isLoading}
                <Reload class="mr-2 h-4 w-4 animate-spin" />
                Please wait
                {:else}
                  Submit
                {/if}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Popover.Content>
  </Popover.Root>
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
      {#if items.length === 0}
      <p>No items found.</p>
      {:else}
      {#each items.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage) as item}
      <Table.Row>
        <Table.Cell>{item.strikeId}</Table.Cell>
        <Table.Cell>{item.timestamp}</Table.Cell>
        <Table.Cell>{item.distance}</Table.Cell>
        <Table.Cell>{item.intensity}</Table.Cell>
      </Table.Row>
      {/each}
      {/if}
    </Table.Body>
  </Table.Root>
</div>
<div class="mb-4">
  <Pagination.Root count={items.length} perPage={itemsPerPage} let:pages>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton on:click={() => (currentPage = currentPage - 1)} disabled={currentPage === 1} />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} on:click={() => (currentPage = page.value)} isActive={currentPage == page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton on:click={() => (currentPage = currentPage + 1)} disabled={currentPage === pages.length} />
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
</div>