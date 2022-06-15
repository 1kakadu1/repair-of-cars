import { ICardProductProps } from "./card-product.model";
import cl from "./card-product.module.scss";
import Image from 'next/image'
import { ButtonDefault } from "../../buttons/default/default.component";
import { money } from "../../../const/setting";
import { HeartIcon } from "../../icons/heart.icon";
import Link from "next/link";
import { Rating } from "../../rating/rating.component";

export const CardProduct = ({product, count = 0, onAdd, onFavorite, isFavorite}: ICardProductProps) =>{

    const handlerAdd = ()=> onAdd({
        preview: product.preview,
        price: product.price,
        title: product.name,
        id: product.id,
        count: 1,
        code: product.code,
        quantity: product.quantity,
        slug: product.slug
    });

    const handlerFavorite = ()=> onFavorite && onFavorite({
        preview: product.preview,
        price: product.price,
        title: product.name,
        id: product.id,
        count: 1,
        code: product.code,
        quantity: product.quantity,
        slug: product.slug
    })

    const seasonIcon = (id: number)=>{
        if(id == 2){
            return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 2V0H7.5V2H6.5ZM3.35355 2.64645L1.35355 0.646454L0.646446 1.35356L2.64645 3.35356L3.35355 2.64645ZM13.3536 12.6465L11.3536 10.6465L10.6464 11.3536L12.6464 13.3536L13.3536 12.6465ZM7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10ZM7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11ZM12.6464 0.646454L10.6464 2.64645L11.3536 3.35356L13.3536 1.35356L12.6464 0.646454ZM2.64645 10.6465L0.646446 12.6465L1.35355 13.3536L3.35355 11.3536L2.64645 10.6465ZM6.5 12V14H7.5V12H6.5ZM2 7.5H0V6.5H2L2 7.5ZM12 7.5H14V6.5H12V7.5Z" fill="#1A1E29"/>
            </svg>
        }

        if(id === 3){
            return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.5 2V0H7.5V2H6.5ZM3.35355 2.64645L1.35355 0.646454L0.646446 1.35356L2.64645 3.35356L3.35355 2.64645ZM13.3536 12.6465L11.3536 10.6465L10.6464 11.3536L12.6464 13.3536L13.3536 12.6465ZM7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10ZM7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11ZM12.6464 0.646454L10.6464 2.64645L11.3536 3.35356L13.3536 1.35356L12.6464 0.646454ZM2.64645 10.6465L0.646446 12.6465L1.35355 13.3536L3.35355 11.3536L2.64645 10.6465ZM6.5 12V14H7.5V12H6.5ZM2 7.5H0V6.5H2L2 7.5ZM12 7.5H14V6.5H12V7.5Z" fill="#1A1E29"/>
                    </svg> 
        }

        return <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M6.5 2V0H7.5V2H6.5ZM3.35355 2.64645L1.35355 0.646454L0.646446 1.35356L2.64645 3.35356L3.35355 2.64645ZM13.3536 12.6465L11.3536 10.6465L10.6464 11.3536L12.6464 13.3536L13.3536 12.6465ZM7 10C8.65685 10 10 8.65685 10 7C10 5.34315 8.65685 4 7 4C5.34315 4 4 5.34315 4 7C4 8.65685 5.34315 10 7 10ZM7 11C9.20914 11 11 9.20914 11 7C11 4.79086 9.20914 3 7 3C4.79086 3 3 4.79086 3 7C3 9.20914 4.79086 11 7 11ZM12.6464 0.646454L10.6464 2.64645L11.3536 3.35356L13.3536 1.35356L12.6464 0.646454ZM2.64645 10.6465L0.646446 12.6465L1.35355 13.3536L3.35355 11.3536L2.64645 10.6465ZM6.5 12V14H7.5V12H6.5ZM2 7.5H0V6.5H2L2 7.5ZM12 7.5H14V6.5H12V7.5Z" fill="#1A1E29"/>
                </svg>
        
    }

    return(
        <div className={cl.cardProduct}>
            <Link href={"/products/"+product.slug}>
                <a className={cl.cardProductPreviewContainer}>
                        <div className={cl.cardProductCounter +" "+ (count > 0 ? cl.cardProductCounterActive:"")}>{count}</div>
                        <Image
                            layout='fill'
                            src={product.preview}
                            alt={product.name}
                            objectFit='contain'
                            objectPosition="center"
                        />
                </a>
            </Link>

            <div className={cl.cardProductContent}>
                <div className={cl.cardProductHeader}>
                    <div className={cl.cardProductHeaderComments}>
                        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 3H10V4H4V3Z" fill="#6A6A6A"/>
                        <path d="M10 6H4V7H10V6Z" fill="#6A6A6A"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M4 10H14V0H0V13L4 10ZM1 11L3.66667 9H13V1H1V11Z" fill="#6A6A6A"/>
                    </svg>
                    <span className={cl.cardProductHeaderCommentsCount}>{product?.comments?.length || 0}</span>
                    </div>
                    <div className={cl.cardProductHeaderStars}>
                        <Rating
                            id={product.id}
                            selected={product.rating}
                            offChange
                            width={18}
                        />
          
                    </div>
                </div>
                <div className={cl.cardProductBody}>
                        <Link href={"/products/"+product.slug}>
                            <a className={cl.cardProductBodyTitle}>
                                {product.name}
                            </a>
                        </Link>
                        <div className={cl.cardProductBodyIcons}>
                            {seasonIcon(product.seasonId)}
                        </div>
                </div>
                <div className={cl.cardProductFooter}>
                        <div className={cl.cardProductCount}>
                            В наличии: {product.quantity} шт.
                        </div>
                        <div className={cl.cardProductActions}>
                            <ButtonDefault
                                disabled={count >= product.quantity}
                                className={cl.cardProductActionAdd}
                                onClick={handlerAdd}
                            >
                                <span>
                                    {product.price}    {money}
                                </span>
                            </ButtonDefault>
                            {
                                (
                                    isFavorite !== undefined && onFavorite &&(
                                        <ButtonDefault
                                            outline
                                            onClick={handlerFavorite}
                                            className={cl.cardProductActionFavorite + " " + (isFavorite ? cl.cardProductActionFavoriteActive : "")}
                                        >
                                            <HeartIcon />
                                        </ButtonDefault>
                                    )
                                )
                            }

                        </div>

                </div>
            </div>

        </div>
    )
}