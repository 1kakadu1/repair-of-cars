import { ICardProductProps } from "./card-product.model";
import cl from "./card-product.module.scss";
import Image from 'next/image'
import { ButtonDefault } from "../../buttons/default/default.component";
import { money } from "../../../const/setting";
import { HeartIcon } from "../../icons/heart.icon";
import Link from "next/link";
import { Rating } from "../../rating/rating.component";
import { RoutsPath } from "../../../../@types";
import { productFieldIcon } from "../../../utils/product.utils";

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
    });

    return(
        <div className={cl.cardProduct}>
            <Link href={RoutsPath.product+"/"+product.slug}>
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
                        <Link href={RoutsPath.product+"/"+product.slug}>
                            <a className={cl.cardProductBodyTitle}>
                                {product.name}
                            </a>
                        </Link>
                        <div className={cl.cardProductBodyIcons}>
                            {productFieldIcon(product.seasonId, "season")}
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