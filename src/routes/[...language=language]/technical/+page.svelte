<script lang="ts">
    import { getStores, navigating, page, updated } from '$app/stores';
</script>

<div class="container">
    <p>{@html JSON.stringify($page, null, 4)}</p>
</div>
