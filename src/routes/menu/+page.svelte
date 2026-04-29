<script lang="ts">
	import { menuItems, categoryLabels, type Category, type MenuItem } from '$lib/menu';
	import { cart } from '$lib/cart.svelte.js';
	import MenuCard from '$lib/components/MenuCard.svelte';
	import AddToCartModal from '$lib/components/AddToCartModal.svelte';

	const categories = Object.keys(categoryLabels) as Category[];
	let activeCategory = $state<Category | 'all'>('all');
	let selectedItem = $state<MenuItem | null>(null);

	const filtered = $derived(
		activeCategory === 'all' ? menuItems : menuItems.filter((i) => i.category === activeCategory)
	);

	function handleAdd(item: MenuItem) {
		const needsOptions =
			(item.tags.includes('hot') && item.tags.includes('iced')) ||
			item.milkOptions?.length ||
			item.variations?.length;

		if (needsOptions) {
			selectedItem = item;
		} else {
			cart.add(item, { temp: item.tags.includes('iced') ? 'iced' : 'hot' });
		}
	}
</script>

<main class="max-w-5xl mx-auto px-6 py-14">
	<h1 class="font-display text-4xl text-ink mb-10">Menu</h1>

	<div class="flex gap-0 mb-10 border-b border-border overflow-x-auto">
		<button
			class="px-4 py-2.5 text-sm whitespace-nowrap transition-colors cursor-pointer {activeCategory === 'all' ? 'text-ink border-b border-ink -mb-px' : 'text-ink-muted hover:text-ink'}"
			onclick={() => (activeCategory = 'all')}
		>All</button>
		{#each categories as cat}
			<button
				class="px-4 py-2.5 text-sm whitespace-nowrap transition-colors cursor-pointer {activeCategory === cat ? 'text-ink border-b border-ink -mb-px' : 'text-ink-muted hover:text-ink'}"
				onclick={() => (activeCategory = cat)}
			>{categoryLabels[cat]}</button>
		{/each}
	</div>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
		{#each filtered as item (item.id)}
			<MenuCard {item} onadd={handleAdd} />
		{/each}
	</div>
</main>

<AddToCartModal item={selectedItem} onclose={() => (selectedItem = null)} />
