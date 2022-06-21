import { useCart } from "../../../hooks/useCart";
import { useFavorite } from "../../../hooks/useFavorite";
import { ButtonDefault } from "../../buttons/default/default.component";
import { CardWrapper } from "../../card-wrapper/card-wrapper.component";
import { Counter } from "../../counter/counter.component";
import { HeartIcon } from "../../icons/heart.icon";
import { ICardActionProductProps } from "./card-action-product.model";
import { CSSTransition } from 'react-transition-group';
import cl from "./card-action-product.module.scss";
import { money } from "../../../const/setting";

export const CardActionProduct = ({product}: ICardActionProductProps)=>{
    const {cart, onAddItem, onSubItem} = useCart();
    const {favorites, onToggleFavorite} = useFavorite();
    const productCart = cart.find(x=> x.id === product.id);
    const productFavorite = favorites.find(x=> x.id === product.id);
    const count = productCart ? productCart.count : 0;
    const  disable = productCart ? productCart.count >= productCart.quantity : false
    const mockAction = {
        preview: product.preview,
        price: product.price,
        title: product.name,
        id: product.id,
        count: 1,
        code: product.code,
        quantity: product.quantity,
        slug: product.slug
    }

    const handlerFavorite = ()=> onToggleFavorite(mockAction);
    const onAdd = ()=> onAddItem(mockAction);
    const onSub = ()=> onSubItem(mockAction);


    return (
        <CardWrapper > 
            <div className={cl.container}>
                <div className={cl.header}>

                    <div className={cl.price}>
                        {product.price} {money}
                        <span className={cl.priceInfo}> цена за {product.completeSet ? "комплект" : "1 шт"}</span>
                    </div>

                    {
                        count > 0 && (
                            <div className={cl.totalPrice}>
                            {product.price}  × {count} = {(count * product.price).toFixed(2) }
                        </div>
                        )
                    }

                </div>

                <div className={cl.actions}>
                    <CSSTransition
                        in={count > 0}
                        timeout={300}
                        classNames="loader"
                        unmountOnExit
                    >                    
                        <Counter
                            count={count}
                            onAdd={onAdd}
                            onSub={onSub}
                            disableAdd={disable}
                        />
                    </CSSTransition>
                    
                    <CSSTransition
                        in={count === 0}
                        timeout={300}
                        classNames="loader"
                        unmountOnExit
                    >                    
                        <ButtonDefault
                            disabled={disable}
                            className={cl.add}
                            onClick={onAdd}
                        >
                            В корзину
                        </ButtonDefault>
                    </CSSTransition>


                    <ButtonDefault
                        outline
                        onClick={handlerFavorite}
                        className={cl.favorite + " " + (productFavorite ? cl.favoriteActive : "")}
                    >
                        <HeartIcon />
                    </ButtonDefault>
                </div>

                <div className={cl.priceInfo}> В наличии: {product.quantity} шт</div>

                <div className={cl.itemInfo}>
                    <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6 0C3.62453 0 0 1 0 1V10C0 12.6197 6 14 6 14C6 14 12 12.6197 12 10V1C12 1 8.37547 0 6 0ZM1 1.77594C1.35117 1.69017 1.80501 1.58457 2.31266 1.47908C3.50394 1.23153 4.92024 1 6 1C7.07976 1 8.49606 1.23153 9.68734 1.47908C10.195 1.58457 10.6488 1.69017 11 1.77594V10C11 10.2457 10.8613 10.5729 10.3998 10.9813C9.94592 11.383 9.29968 11.7521 8.59088 12.0699C7.89221 12.3832 7.18522 12.6235 6.64768 12.7863C6.38041 12.8672 6.15854 12.9279 6.00506 12.968L6 12.9694L5.99494 12.968C5.84146 12.9279 5.61959 12.8672 5.35232 12.7863C4.81478 12.6235 4.10779 12.3832 3.40912 12.0699C2.70032 11.7521 2.05408 11.383 1.60023 10.9813C1.13873 10.5729 1 10.2457 1 10L1 1.77594ZM9 5L8.29289 4.29289L5 7.58579L3.70711 6.29289L3 7L5 9L9 5Z" fill="currentColor"/>
                    </svg>

                    Гарантия:  Бессрочная от {product.manufacturers?.name}
                </div>
            </div>
      </CardWrapper >  

    )
}