<script lang="ts">
	import { cart } from '$lib/cart.svelte.js';
	import { onMount } from 'svelte';

	let orderItems = $state(cart.items.map((i) => ({ ...i })));
	let orderTotal = $state(cart.total);

	onMount(() => {
		cart.clear();
	});
</script>

<main class="max-w-xl mx-auto px-6 py-20 text-center">
	<p class="text-[11px] text-stone uppercase tracking-[0.2em] mb-5">Order placed</p>
	<h1 class="font-display text-5xl text-ink mb-5">Thank you.</h1>
	<p class="text-ink-muted mb-12">We'll have your order ready shortly.</p>

	<div class="text-left space-y-3 border-t border-border pt-6 mb-10">
		{#each orderItems as item}
			<div class="flex justify-between text-sm">
				<span class="text-ink">{item.item.name} × {item.quantity}</span>
				<span class="text-ink-muted">€{(item.item.price * item.quantity).toFixed(2)}</span>
			</div>
		{/each}
		<div class="flex justify-between pt-4 border-t border-border">
			<span class="font-display text-ink">Total</span>
			<span class="font-display text-ink">€{orderTotal.toFixed(2)}</span>
		</div>
	</div>

	<a href="/" class="text-sm text-ink-muted hover:text-ink transition-colors">← Back to home</a>
</main>
