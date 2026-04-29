export type Category = 'espresso' | 'tea' | 'signature' | 'food';
export type MilkOption = 'whole' | 'oat' | 'almond' | 'pistachio' | 'coconut';

export interface MenuItem {
	id: string;
	name: string;
	description: string;
	price: number;
	category: Category;
	tags: string[];
	milkOptions?: MilkOption[];
	variations?: string[];
}

const allMilk: MilkOption[] = ['whole', 'oat', 'almond', 'pistachio', 'coconut'];

export const menuItems: MenuItem[] = [
	{
		id: 'espresso-1',
		name: 'Americano',
		description: 'Double shot, filtered water.',
		price: 3.8,
		category: 'espresso',
		tags: ['hot', 'iced']
	},
	{
		id: 'espresso-2',
		name: 'Flat White',
		description: 'Ristretto, velvety microfoam.',
		price: 4.5,
		category: 'espresso',
		tags: ['hot'],
		milkOptions: allMilk
	},
	{
		id: 'espresso-3',
		name: 'Latte',
		description: 'Espresso, steamed milk.',
		price: 4.8,
		category: 'espresso',
		tags: ['hot', 'iced'],
		milkOptions: allMilk
	},
	{
		id: 'espresso-4',
		name: 'Cappuccino',
		description: 'Espresso, thick foam.',
		price: 4.5,
		category: 'espresso',
		tags: ['hot'],
		milkOptions: allMilk
	},
	{
		id: 'tea-1',
		name: 'Matcha Latte',
		description: 'Ceremonial grade matcha, steamed milk.',
		price: 5.5,
		category: 'tea',
		tags: ['hot', 'iced'],
		milkOptions: allMilk,
		variations: ['classic', 'strawberry', 'oolong shot', 'espresso shot']
	},
	{
		id: 'signature-1',
		name: 'Fog',
		description: 'Slow-steeped cold brew, vanilla foam.',
		price: 6.0,
		category: 'signature',
		tags: ['iced']
	},
	{
		id: 'food-1',
		name: 'Sesame Croissant',
		description: 'Flaky, black sesame filling.',
		price: 4.2,
		category: 'food',
		tags: ['seasonal']
	},
	{
		id: 'food-2',
		name: 'Panini',
		description: "Ask us what's in today.",
		price: 7.5,
		category: 'food',
		tags: ['savoury']
	},
	{
		id: 'food-3',
		name: 'Pancakes',
		description: 'Fluffy stack, seasonal toppings.',
		price: 9.0,
		category: 'food',
		tags: ['weekend']
	}
];

export const categoryLabels: Record<Category, string> = {
	espresso: 'Espresso',
	tea: 'Tea',
	signature: 'Signature',
	food: 'Food'
};

export const milkLabels: Record<MilkOption, string> = {
	whole: 'Whole',
	oat: 'Oat',
	almond: 'Almond',
	pistachio: 'Pistachio',
	coconut: 'Coconut'
};
