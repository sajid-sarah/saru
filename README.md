# Saru

A café web shop built with SvelteKit, Tailwind CSS, and AI-powered drink and snack recommendations.

**Live demo:** https://saru-green.vercel.app

## Features

- Browse menu by category with milk and variation options
- Add items to bag with temperature, milk, and variation selection
- AI-powered "For you" page — describe your mood, get two personalised drink and snack recommendations
- Order flow with confirmation page

## Tech stack

- SvelteKit + TypeScript
- Tailwind CSS v4
- Svelte 5 runes for cart state
- Groq API (via OpenAI-compatible SDK) for recommendations
- Deployed on Vercel

## Running locally

```bash
npm install
npm run dev
```

### Environment variables

Create a `.env` file at the project root:

```
GROQ_API_KEY=your_groq_api_key_here
```

Get a free API key at [console.groq.com](https://console.groq.com). The key is used server-side only for the `/recommend` endpoint.

## Structure

```
src/
  lib/
    menu.ts          # Menu data — edit here to update the menu and AI prompt
    cart.svelte.ts   # Cart state (Svelte 5 runes)
    components/      # Nav, MenuCard, AddToCartModal
  routes/
    /                # Home
    /menu            # Full menu with category filter
    /recommend       # AI recommendations
    /cart            # Bag
    /order           # Order confirmation
    api/recommend    # Groq API endpoint
```
