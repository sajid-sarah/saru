<script lang="ts">
	import { cart } from '$lib/cart.svelte.js';
</script>

<header class="fixed top-0 left-0 right-0 z-50 bg-canvas border-b border-border">
	<div class="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
		<a href="/" class="font-display text-xl text-ink tracking-tight">Saru</a>
		<nav class="flex items-center gap-8">
			<a href="/menu" class="text-sm text-ink-muted hover:text-ink transition-colors">Menu</a>
			<a href="/recommend" class="text-sm text-ink-muted hover:text-ink transition-colors">For you</a>
			<a href="/cart" class="relative text-sm text-ink-muted hover:text-ink transition-colors">
				Bag
				{#if cart.count > 0}
					<span class="absolute -top-2 -right-3.5 w-4 h-4 rounded-full bg-brown text-white text-[10px] flex items-center justify-center">
						{cart.count}
					</span>
				{/if}
			</a>
		</nav>
	</div>
</header>
