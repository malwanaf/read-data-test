<script lang="ts">
    
    
    import { onMount } from 'svelte';
    import * as Table from "$lib/components/ui/table";
  
    let data = [];
  
    onMount(() => {
      const eventSource = new EventSource('http://localhost:3000/items/stream');
  
      eventSource.onmessage = function(event) {
        data = JSON.parse(event.data);
      };
    });
    import { DataHandler, Datatable, Th, ThFilter } from '@vincjo/datatables'

    const handler = new DataHandler(data, { rowsPerPage: 10 })
    const rows = handler.getRows()

</script>


<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="strikeId">ID</Th>
                <Th {handler} orderBy="timestamp">Time</Th>
                <Th {handler} orderBy="distance">Distance</Th>
                <Th {handler} orderBy="intensity">Intensity</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="strikeId"/>
                <ThFilter {handler} filterBy="timestamp" />
                <ThFilter {handler} filterBy="distance"/>
                <ThFilter {handler} filterBy="intensity"/>
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.strikId}</td>
                    <td>{row.timestamp}</td>
                    <td>{row.distance}</td>
                    <td>{row.intensity}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<!-- <style>
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style> -->
