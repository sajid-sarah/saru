<script lang="ts">
	import type { MenuItem } from '$lib/menu';

	interface Props {
		item: MenuItem;
		onadd: (item: MenuItem) => void;
	}

	let { item, onadd }: Props = $props();
</script>

<div class="bg-surface p-6 flex flex-col">
	<div class="flex-1">
		<div class="flex items-start justify-between gap-4 mb-2">
			<h3 class="font-display text-lg text-ink leading-snug">{item.name}</h3>
			<span class="text-sm text-ink-muted shrink-0 mt-0.5">€{item.price.toFixed(2)}</span>
		</div>
		<p class="text-sm text-ink-muted leading-relaxed">{item.description}</p>
		{#if item.tags.length > 0}
			<div class="flex flex-wrap gap-1.5 mt-3">
				{#each item.tags as tag}
					<span class="text-[11px] text-stone uppercase tracking-wide">{tag}</span>
				{/each}
			</div>
		{/if}
	</div>
	<button
		class="mt-5 w-full py-2 border border-border text-ink-muted text-sm hover:border-brown hover:text-brown transition-colors cursor-pointer"
		onclick={() => onadd(item)}
	>
		Add
	</button>
</div>
