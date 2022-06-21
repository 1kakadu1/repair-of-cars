import { cartSlice } from './reducer/cart/cart.reducer';
import { categorySlice } from './reducer/category/category.reducer';
import { favoriteSlice } from './reducer/favorite/favorite.reducer';
import { homeSlice } from './reducer/home/home.reducer';
import { newsSlice } from './reducer/news/news.reducer';
import { productSlice } from './reducer/product/product.reducer';
import { productsSlice } from './reducer/products/products.reducer';
import { servicesSlice } from './reducer/services/services.reducer';

export const slices = {
	[productsSlice.name]: productsSlice.reducer,
	[servicesSlice.name]: servicesSlice.reducer,
	[homeSlice.name]: homeSlice.reducer,
	[newsSlice.name]: newsSlice.reducer,
	[cartSlice.name]: cartSlice.reducer,
	[favoriteSlice.name]: favoriteSlice.reducer,
	[categorySlice.name]: categorySlice.reducer,
	[productSlice.name]: productSlice.reducer
};

export const sliceActions = {
	...productsSlice.actions,
	...servicesSlice.actions,
	...homeSlice.actions,
	...newsSlice.actions,
	...cartSlice.actions,
	...favoriteSlice.actions,
	...categorySlice.actions,
	...productSlice.actions,
}