<script>
  import Sun from 'svelte-radix/Sun.svelte';
  import Moon from 'svelte-radix/Moon.svelte';
  import { toggleMode } from 'mode-watcher';
  import { Button } from '$lib/components/ui/button';
  import Reload from "svelte-radix/Reload.svelte";
  import * as Popover from '$lib/components/ui/popover';
  import { Label } from '$lib/components/ui/label/index.ts';
  import { Input } from '$lib/components/ui/input/index.ts';
  import { toast } from "svelte-sonner";
  import * as Pagination from "$lib/components/ui/pagination";

  // Import necessary Firebase database functions
  //import { getDatabase, ref, push, onValue } from '$src/lib/firebase';
  import { onMount } from 'svelte';

  // Initialize Firebase database
  const db = getDatabase();

  // Define reactive variables
  let items = [];
  let formData = { strikeId: '', timestamp: Date.now(), distance: '', intensity: '' };
  let isLoading = false;
  let isFormFilled = false;
  let currentPage = 1; // Current page number
  let itemsPerPage = 10; // Number of items per page

  // Fetch data from Firebase on component mount
  onMount(() => {
    // Listen for changes in the 'items' node of the database
    onValue(ref(db, 'items'), (snapshot) => {
      items = snapshot.val() || [];
    });
  });

  // Validate form function
  function validateForm() {
    isFormFilled = formData.strikeId !== '' && 
                   formData.timestamp !== '' && 
                   formData.distance !== '' && 
                   formData.intensity !== '';
  }

  // Form submission function
  async function handleSubmit(event) {
    event.preventDefault();
    isLoading = true;

    try {
      // Push form data to the 'items' node in Firebase
      await push(ref(db, 'items'), formData);
      formData = { strikeId: '', timestamp: Date.now(), distance: '', intensity: '' };
      console.log('Data added successfully');
    } catch (error) {
      console.error('Failed to add data:', error);
    }

    isLoading = false;
  }
</script>



<!-- Your HTML code remains the same -->

<div class="m-4 inline-flex space-x-2">
  <!-- Your existing code -->
</div>

<div class="relative mx-4 mb-4 overflow-x-auto rounded-md border">
  <!-- Your existing table code -->
</div>

<div class="mb-4">
  <!-- Your existing pagination code -->
</div>
