import { ICategoryReqData, IHomeReqData, IProductReqData } from "../@types";
import { toCategoryAction } from "../client/store/reducer/category/category.reducer";
import { toHomeAction } from "../client/store/reducer/home/home.reducer";
import { toProductAction } from "../client/store/reducer/product/product.reducer";
import { toProductsAction } from "../client/store/reducer/products/products.reducer";
import { AppStore } from "../client/store/state";
import { apiService } from "./api";

class InitialPropsServices {

    async getCategory(store: AppStore){
        try {
            const state = store.getState().category;
            if(!state.isHydrate){
                const {data: dataCat, error: errorCat} = await apiService.get<ICategoryReqData>("category");
                if(dataCat){
                  store.dispatch(toCategoryAction.setCategoryList(dataCat));
                }else if(errorCat){
                  store.dispatch(toCategoryAction.categoryRequestFailed(errorCat));
                }
            }
        } catch (error: any) {
            console.error("Req error "+ error.message.toString())
        }

    }

    async getProducts(store: AppStore,query: {[key: string]: any,}, page: number){
        const state = store.getState().products;
        try {
            const {data, error} = await apiService.get<IProductReqData>(
                `products`, 
                JSON.parse(JSON.stringify({
                    ...query,
                    limit:  
                    state.options.limit, 
                    offset: page === 1 ? 0 : state.options.limit * (page - 1)}))
                );
            if(!state.isHydrate){
                if(data){
                    store.dispatch(toProductsAction.setProducts(data));
                  }else if(error){
                    store.dispatch(toProductsAction.productsRequestFailed(error));
                  }
            }
        } catch (error: any) {
            console.error("Req error "+ error.message.toString())
        }
    }

    async getProduct(store: AppStore,query: {[key: string]: any,}){
      const state = store.getState().product;
      try {
          if(query["slug"] === undefined || query["slug"] === null || query["slug"] === "" || typeof query["slug"] !== "string"){
            throw Error("404. Not found product")
          }
          

          const {data, error} = await apiService.get<IProductReqData>(
              `products/${query["slug"]}`);

          if(!state.isHydrate){
              if(data){
                  store.dispatch(toProductAction.setProduct(data));
                }else if(error){
                  store.dispatch(toProductAction.productsRequestFailed(error));
                }
          }
      } catch (error: any) {
          store.dispatch(toProductAction.productsRequestFailed( error.message.toString()));
      }
  }

    async getHome(store: AppStore){
        const state = store.getState().home;
        if(!state.isHydrate){
            try {
              const {data, error} = await apiService.get<IHomeReqData>(`home`,);
              if(data){
                store.dispatch(toHomeAction.setHome(data));
              }else if(error){
                store.dispatch(toHomeAction.homeRequestFailed(error));
              }
            } catch (error: any) {
              console.error("Req error "+ error.message.toString())
            }
        
          }
    }


}

export const intPropsServices = new InitialPropsServices();