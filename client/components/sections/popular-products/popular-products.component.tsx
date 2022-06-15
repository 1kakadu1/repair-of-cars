import { useState } from "react"
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectFade, Navigation } from 'swiper';
import { IProductData } from "../../../../@types"
import { ButtonDefault } from "../../buttons/default/default.component"
import { CardProduct } from "../../cards/card-product/card-product.component"
import { Container } from "../../container/container.component"
import { TabsContainer } from "../../tabs/tabs.component"
import TabsContext from "../../tabs/tabs.context"
import { Title } from "../../title/title"
import { IPopularProducts } from "./popular-products.model"
import cl from "./popular-products.module.scss";
import { useCart } from "../../../hooks/useCart";
import { useFavorite } from "../../../hooks/useFavorite";

const ProductRow = ({products , link}: {products: IProductData[], link?:{title: string, href: string}})=>{
    const {onAddItem, cart} = useCart();
    const {onToggleFavorite, favorites} = useFavorite();
    
    return(
        <div className={cl.popularContainerRow}>
            <div className={`container__row ${cl.popularRowMgTop}`}>
            {
                products.map(item =>(
                    <div className={`container__col-12 container__col-md-6 container__col-xl-3 container__col--stretch`} key={item.id}>
                        <CardProduct
                            product={item}
                            onAdd={onAddItem}
                            count={cart.find((x) => x.id === item.id )?.count}
                            onFavorite={onToggleFavorite}
                            isFavorite={!!favorites.find(x=>x.id === item.id)}
                        />
                    </div>
                ))
            }
            </div> 
            {
                link && (
                    <ButtonDefault
                        link={link.href}
                        className={cl.popularBtnAll}
                        outline
                    >
                       Посмотреть все шины
                    </ButtonDefault>
                )
            }

        </div>

    )
}

export const SectionProducts = ({title, products, tabsLabel ,swiperProps, link}:IPopularProducts)=>{
    const {onAddItem, cart} = useCart();
    const {onToggleFavorite, favorites} = useFavorite();
    const [refTabs, setTabsRef] = useState<any | null>(null);
    const [tab, setTab] = useState(0);
    const isArray = Array.isArray(products);
    const tabsContent: JSX.Element[] | undefined = isArray ? 
        undefined 
    : 
    Object.keys(products).map((key, index)=>(<ProductRow 
        products={products[key]} 
        key={key} 
        link={tabsLabel ? {
            title: tabsLabel[index].label || "",
            href:   tabsLabel[index].slug || "#",
        } : undefined}
    />));
    
    return(
        <TabsContext.Provider
            value={{
                tabsRef: refTabs,
                setTabsRef,
            }}
        >
            <section className="popular-products">
                <Container>
                    <Title
                            size={32}
                            title={title}
                            center
                    />
                    {
                        tabsLabel && !isArray && tabsContent ? (
                            <TabsContainer
                                labels={tabsLabel}
                                items={tabsContent}
                                tab={tab}
                                onChangeTab={setTab}
                                update
                                center
                            />
                        ) :
                        swiperProps ? 
                        
                        <Swiper
                            className={cl.sectionProductsSwiper + " "+ "swiper-products"}
                            modules={[EffectFade, Navigation]}
                            autoHeight={true}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                              }}
                            {...swiperProps}
                        >
                            {(products as IProductData[]).map((item) => (
                                <SwiperSlide key={item.id} className={cl.slide}>
                                        <CardProduct
                                            product={item}
                                            onAdd={onAddItem}
                                            onFavorite={onToggleFavorite}
                                            count={cart.find((x) => x.id === item.id )?.count}
                                            isFavorite={!!favorites.find(x=>x.id === item.id)}
                                        />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        :
                        <ProductRow products={products as IProductData[]} />
                    }
                    <>
                        {
                            link && (
                                <ButtonDefault
                                    link={link.href}
                                    className={cl.popularBtnAll}
                                    outline
                                >
                                    {link.title}
                                </ButtonDefault>
                            )
                        }
                    </>

                </Container>
            </section>
        </TabsContext.Provider>
    )
}