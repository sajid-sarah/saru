<script lang="ts">
	import type { MenuItem, MilkOption } from '$lib/menu';
	import { milkLabels } from '$lib/menu';
	import { cart } from '$lib/cart.svelte.js';

	interface Props {
		item: MenuItem | null;
		onclose: () => void;
	}

	let { item, onclose }: Props = $props();

	let selectedTemp = $state<'hot' | 'iced'>('hot');
	let selectedMilk = $state<MilkOption>('whole');
	let selectedVariation = $state('');

	$effect(() => {
		if (item) {
			selectedTemp = item.tags.includes('hot') ? 'hot' : 'iced';
			selectedMilk = 'whole';
			selectedVariation = item.variations?.[0] ?? '';
		}
	});

	const hasTemp = $derived(!!item && item.tags.includes('hot') && item.tags.includes('iced'));
	const hasMilk = $derived(!!item?.milkOptions?.length);
	const hasVariations = $derived(!!item?.variations?.length);

	function addToCart() {
		if (!item) return;
		cart.add(item, {
			temp: selectedTemp,
			milk: hasMilk ? selectedMilk : undefined,
			variation: hasVariations ? selectedVariation : undefined
		});
		onclose();
	}
</script>

{#if item}
	<div
		class="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
		role="dialog"
		aria-modal="true"
		tabindex="-1"
	>
		<button
			class="absolute inset-0 bg-ink/10 backdrop-blur-[2px] cursor-default w-full"
			onclick={onclose}
			aria-label="Close"
		></button>

		<div
			class="relative bg-canvas w-full sm:max-w-sm p-8 shadow-xl"
			role="presentation"
		>
			<button
				class="absolute top-4 right-4 text-ink-muted hover:text-ink text-xl leading-none cursor-pointer"
				onclick={onclose}
				aria-label="Close"
			>×</button>

			<div class="mb-7">
				<h2 class="font-display text-2xl text-ink">{item.name}</h2>
				<p class="text-sm text-ink-muted mt-1">{item.description}</p>
			</div>

			{#if hasTemp}
				<div class="mb-5">
					<p class="text-[11px] text-stone uppercase tracking-widest mb-2.5">Temperature</p>
					<div class="flex gap-2">
						{#each ['hot', 'iced'] as temp}
							<button
								class="flex-1 py-2 text-sm border transition-colors cursor-pointer {selectedTemp === temp ? 'bg-brown text-white border-brown' : 'border-border text-ink-muted hover:border-brown-mid'}"
								onclick={() => (selectedTemp = temp as 'hot' | 'iced')}
							>{temp}</button>
						{/each}
					</div>
				</div>
			{/if}

			{#if hasVariations}
				<div class="mb-5">
					<p class="text-[11px] text-stone uppercase tracking-widest mb-2.5">Variation</p>
					<div class="flex flex-wrap gap-2">
						{#each item.variations! as v}
							<button
								class="px-3 py-1.5 text-sm border transition-colors cursor-pointer {selectedVariation === v ? 'bg-brown text-white border-brown' : 'border-border text-ink-muted hover:border-brown-mid'}"
								onclick={() => (selectedVariation = v)}
							>{v}</button>
						{/each}
					</div>
				</div>
			{/if}

			{#if hasMilk}
				<div class="mb-7">
					<p class="text-[11px] text-stone uppercase tracking-widest mb-2.5">Milk</p>
					<div class="flex flex-wrap gap-2">
						{#each item.milkOptions! as milk}
							<button
								class="px-3 py-1.5 text-sm border transition-colors cursor-pointer {selectedMilk === milk ? 'bg-brown text-white border-brown' : 'border-border text-ink-muted hover:border-brown-mid'}"
								onclick={() => (selectedMilk = milk)}
							>{milkLabels[milk]}</button>
						{/each}
					</div>
				</div>
			{/if}

			<div class="flex items-center justify-between">
				<span class="font-display text-xl text-ink">€{item.price.toFixed(2)}</span>
				<button
					class="px-7 py-2.5 bg-brown text-white text-sm tracking-wide hover:bg-brown-mid transition-colors cursor-pointer"
					onclick={addToCart}
				>Add to bag</button>
			</div>
		</div>
	</div>
{/if}
