import { IProductData } from "../../@types";

export const createTabsDataPopularProduct = (popular: IProductData[], excludeIds: string[] = []) => {
    const labels: {id: string | number, label: string, slug: string}[] = [];
    const tabsData: {[key: string | number]: IProductData[]} = {};
    popular.forEach(element => {
        if(element.categories){
            const catList = element.categories
                    .filter(filterItem=> excludeIds.some(item=> item !== filterItem.id) );

                    catList.forEach((item)=>{
                        if(tabsData[item.id] !==undefined){
                            tabsData[item.id].push(element);
                        }else{
                            labels.push({
                                label: item.name,
                                id: item.id,
                                slug: item.slug
                            });
                            tabsData[item.id] = [];
                            tabsData[item.id].push(element);
                        }
                    });
        }
    });

    return {
        labels,
        tabs: tabsData
    }
}