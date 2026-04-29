<script lang="ts">
	import { menuItems } from '$lib/menu';

	const featured = menuItems.filter((i) => ['espresso-3', 'tea-1', 'signature-1'].includes(i.id));
</script>

<main>
	<section class="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center text-center px-6">
		<p class="text-[11px] text-stone uppercase tracking-[0.2em] mb-7">Berlin · Est. 2026</p>
		<h1 class="font-display text-8xl text-ink mb-5 leading-none">Saru</h1>
		<p class="text-ink-muted font-light text-lg max-w-xs leading-relaxed">
			Good coffee.<br />Slow mornings.
		</p>
		<div class="mt-12 flex gap-3">
			<a
				href="/menu"
				class="px-8 py-3 bg-brown text-white text-sm tracking-wide hover:bg-brown-mid transition-colors"
			>
				View menu
			</a>
			<a
				href="/recommend"
				class="px-8 py-3 border border-border text-ink-muted text-sm tracking-wide hover:border-brown-mid hover:text-ink transition-colors"
			>
				For you
			</a>
		</div>
	</section>

	<section class="max-w-5xl mx-auto px-6 pb-24">
		<p class="text-[11px] text-stone uppercase tracking-[0.2em] mb-8">From the menu</p>
		<div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
			{#each featured as item}
				<a href="/menu" class="bg-surface p-6 hover:bg-border/40 transition-colors group block">
					<p class="font-display text-xl text-ink mb-1.5 group-hover:text-brown transition-colors">
						{item.name}
					</p>
					<p class="text-sm text-ink-muted">{item.description}</p>
					<p class="mt-4 text-sm text-stone">€{item.price.toFixed(2)}</p>
				</a>
			{/each}
		</div>
	</section>
</main>
