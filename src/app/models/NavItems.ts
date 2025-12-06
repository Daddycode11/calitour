export interface NavItems {
  label: string;
  route: string;
  icon: string; // mat-icon name
}

export const NAV_ITEMS: NavItems[] = [
  {
    label: 'Dashboard',
    route: '/dashboard',
    icon: 'dashboard',
  },
  {
    label: 'Orders',
    route: '/orders',
    icon: 'shopping_cart',
  },
  {
    label: 'Products',
    route: '/products',
    icon: 'inventory_2',
  },
  {
    label: 'Transactions',
    route: '/transactions',
    icon: 'receipt_long',
  },
];
