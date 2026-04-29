<script lang="ts">
	import { cart } from '$lib/cart.svelte.js';
	import { menuItems } from '$lib/menu';

	let mood = $state('');
	let loading = $state(false);
	let error = $state('');
	type Recommendation = { id: string; name: string; variation: string | null; reason: string };

	let recommendations = $state<Recommendation[]>([]);

	async function getRecommendation() {
		if (!mood.trim()) return;
		loading = true;
		error = '';
		recommendations = [];

		try {
			const res = await fetch('/api/recommend', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ mood })
			});

			if (!res.ok) throw new Error('Could not get a recommendation. Try again.');
			const data = await res.json();
			recommendations = data.recommendations;
		} catch (err) {
			error = err instanceof Error ? err.message : 'Something went wrong.';
		} finally {
			loading = false;
		}
	}

	function addToCart(rec: Recommendation) {
		const item = menuItems.find((i) => i.id === rec.id);
		if (!item) return;
		cart.add(item, {
			temp: item.tags.includes('iced') ? 'iced' : 'hot',
			variation: rec.variation ?? undefined
		});
		recommendations = [];
		mood = '';
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter' && !e.shiftKey) {
			e.preventDefault();
			getRecommendation();
		}
	}
</script>

<main class="min-h-[calc(100vh-3.5rem)] flex flex-col items-center justify-center px-6 text-center">
	<p class="text-[11px] text-stone uppercase tracking-[0.2em] mb-8">For you</p>
	<h1 class="font-display text-4xl text-ink mb-3 leading-snug">What are you<br />in the mood for?</h1>
	<p class="text-sm text-ink-muted mb-10 max-w-xs">
		Tell us how you're feeling and we'll suggest something from the menu.
	</p>

	<div class="w-full max-w-sm">
		<textarea
			class="w-full bg-surface border border-border text-ink text-sm px-4 py-3 resize-none focus:outline-none focus:border-brown-mid transition-colors placeholder:text-stone"
			rows="3"
			placeholder="e.g. slow morning, need a gentle boost..."
			bind:value={mood}
			onkeydown={handleKeydown}
			maxlength={300}
		></textarea>

		<button
			class="mt-3 w-full py-3 bg-brown text-white text-sm tracking-wide hover:bg-brown-mid transition-colors disabled:opacity-40 disabled:cursor-default cursor-pointer"
			onclick={getRecommendation}
			disabled={!mood.trim() || loading}
		>
			{loading ? 'Thinking...' : 'Ask'}
		</button>
	</div>

	{#if error}
		<p class="mt-6 text-sm text-red-600">{error}</p>
	{/if}

	{#if recommendations.length > 0}
		<div class="mt-10 w-full max-w-sm space-y-4">
			<p class="text-[11px] text-stone uppercase tracking-[0.2em]">We think you'd like</p>
			{#each recommendations as rec}
				<div class="bg-surface p-6 text-left">
					<h2 class="font-display text-xl text-ink mb-1">
						{rec.name}{rec.variation && rec.variation !== 'classic' ? ` — ${rec.variation}` : ''}
					</h2>
					<p class="text-sm text-ink-muted mb-5">{rec.reason}</p>
					<button
						class="w-full py-2.5 bg-brown text-white text-sm tracking-wide hover:bg-brown-mid transition-colors cursor-pointer"
						onclick={() => addToCart(rec)}
					>
						Add to bag
					</button>
				</div>
			{/each}
			<a
				href="/menu"
				class="block text-center text-sm text-ink-muted hover:text-ink transition-colors py-2 mb-12"
			>
				No thanks, I'll figure it out
			</a>
		</div>
	{/if}
</main>
