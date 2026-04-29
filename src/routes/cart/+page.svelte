<script lang="ts">
	import { cart } from '$lib/cart.svelte.js';
	import { milkLabels } from '$lib/menu';
	import { goto } from '$app/navigation';

	function placeOrder() {
		goto('/order');
	}
</script>

<main class="max-w-xl mx-auto px-6 py-14">
	<h1 class="font-display text-4xl text-ink mb-10">Your bag</h1>

	{#if cart.items.length === 0}
		<div class="py-20 text-center">
			<p class="text-ink-muted">Nothing here yet.</p>
			<a href="/menu" class="mt-4 inline-block text-sm text-brown hover:underline">Browse the menu</a>
		</div>
	{:else}
		<div class="space-y-0 mb-10">
			{#each cart.items as cartItem, i}
				<div class="flex items-start gap-4 py-5 border-b border-border">
					<div class="flex-1">
						<p class="font-display text-lg text-ink">{cartItem.item.name}</p>
						<div class="flex gap-1.5 mt-1 flex-wrap text-xs text-ink-muted">
							<span>{cartItem.temp}</span>
							{#if cartItem.variation && cartItem.variation !== 'classic'}
								<span>· {cartItem.variation}</span>
							{/if}
							{#if cartItem.milk && cartItem.milk !== 'whole'}
								<span>· {milkLabels[cartItem.milk]}</span>
							{/if}
						</div>
						<p class="text-sm text-ink-muted mt-2">€{(cartItem.item.price * cartItem.quantity).toFixed(2)}</p>
					</div>
					<div class="flex items-center gap-3 mt-0.5">
						<button
							class="w-7 h-7 border border-border text-ink-muted hover:border-brown hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
							onclick={() => cart.decrement(i)}
						>−</button>
						<span class="text-sm text-ink w-3 text-center">{cartItem.quantity}</span>
						<button
							class="w-7 h-7 border border-border text-ink-muted hover:border-brown hover:text-ink flex items-center justify-center transition-colors cursor-pointer"
							onclick={() => cart.increment(i)}
						>+</button>
					</div>
				</div>
			{/each}
		</div>

		<div class="flex items-center justify-between mb-8">
			<span class="font-display text-xl text-ink">Total</span>
			<span class="font-display text-xl text-ink">€{cart.total.toFixed(2)}</span>
		</div>

		<button
			class="w-full py-3.5 bg-brown text-white text-sm tracking-wide hover:bg-brown-mid transition-colors cursor-pointer"
			onclick={placeOrder}
		>Place order</button>

		<button
			class="w-full mt-3 py-3 text-sm text-ink-muted hover:text-ink transition-colors cursor-pointer"
			onclick={() => cart.clear()}
		>Clear bag</button>
	{/if}
</main>
