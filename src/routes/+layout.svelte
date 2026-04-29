<script lang="ts">
	import './layout.css';
	import Nav from '$lib/components/Nav.svelte';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>

<Nav />
<div class="pt-14">
	{@render children()}
</div>
