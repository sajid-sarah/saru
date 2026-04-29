import type { MenuItem, MilkOption } from './menu';

export interface CartItem {
	item: MenuItem;
	quantity: number;
	temp: 'hot' | 'iced';
	milk?: MilkOption;
	variation?: string;
}

let items = $state<CartItem[]>([]);

export const cart = {
	get items() {
		return items;
	},
	get count() {
		return items.reduce((sum, i) => sum + i.quantity, 0);
	},
	get total() {
		return items.reduce((sum, i) => sum + i.item.price * i.quantity, 0);
	},

	add(item: MenuItem, options: { temp: 'hot' | 'iced'; milk?: MilkOption; variation?: string }) {
		const existing = items.find(
			(i) =>
				i.item.id === item.id &&
				i.temp === options.temp &&
				i.milk === options.milk &&
				i.variation === options.variation
		);
		if (existing) {
			existing.quantity++;
		} else {
			items.push({ item, quantity: 1, ...options });
		}
	},

	increment(index: number) {
		items[index].quantity++;
	},

	decrement(index: number) {
		if (items[index].quantity > 1) {
			items[index].quantity--;
		} else {
			items.splice(index, 1);
		}
	},

	clear() {
		items = [];
	}
};
