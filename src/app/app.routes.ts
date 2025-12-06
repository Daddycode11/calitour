import { Routes } from '@angular/router';

import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { CreateProductComponent } from './products/layouts/create-product/create-product.component';
import { exitPageGuard } from './common/guards/exit-page.guard';
import { ViewProductComponent } from './products/layouts/view-product/view-product.component';
import { ProductListComponent } from './products/layouts/product-list/product-list.component';
import { DashboardComponent } from './admin/pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { RegisterComponent } from './admin/auth/register/register.component';
import { LoginComponent } from './admin/auth/login/login.component';
import { MainComponent } from './admin/main/main.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';

export const routes: Routes = [
  // Redirect root
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LandingPageComponent,
    children: [
      // ---------- PUBLIC ROUTES ----------
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'about',
        component: AboutComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
    ],
  },

  {
    path: 'admin',
    component: MainComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
      },
      {
        path: 'orders',
        component: OrdersComponent,
        data: { breadcrumb: 'Orders' },
      },
      {
        path: 'products',
        component: ProductsComponent,
        data: { breadcrumb: 'Products' },
        children: [
          {
            path: '',
            component: ProductListComponent,
            data: { breadcrumb: 'Product List' },
          },
          {
            path: 'create/:id',
            component: CreateProductComponent,
            canDeactivate: [exitPageGuard],
            data: { breadcrumb: 'Create Product' },
          },
          {
            path: 'view/:id',
            component: ViewProductComponent,
            data: { breadcrumb: 'View Product' },
          },
        ],
      },
      {
        path: 'transactions',
        component: TransactionsComponent,
        data: { breadcrumb: 'Transactions' },
      },
    ],
  },

  {
    path: '**',
    redirectTo: '/',
  },
];
