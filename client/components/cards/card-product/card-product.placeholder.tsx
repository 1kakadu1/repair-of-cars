import Skeleton from 'react-loading-skeleton';
import { Box } from '../../box/box.component';
import cl from "./card-product.module.scss";

export const CardProductPlaceholder = () =>{

   

    return(
        
        <div className={cl.cardProduct} style={{maxHeight: "610px"}}>
            <Skeleton className={cl.cardProductPreviewContainer}  />
            <div className={cl.cardProductContent}>
                <div className={cl.cardProductHeader}>
                    <div className={cl.cardProductHeaderComments}>
                        <Skeleton height={21} width={30}  />
                    </div>
                    <div className={cl.cardProductHeaderStars}>
                        <Skeleton height={21} width={120}  />
                    </div>
                </div>
                <Box styles={{padding: '6px'}} />
                <div className={cl.cardProductBody}>
                    <div>
                        <Skeleton />
                        <Box styles={{padding: '4px'}} />
                        <Skeleton />
                        <Box styles={{padding: '4px'}} />
                        <Skeleton />
                        <Box styles={{padding: '4px'}} />
                        <Skeleton />
                    </div>
                    <Box styles={{padding: '12px'}} />
                    <div className={cl.cardProductBodyIcons}>
                        <Skeleton width={16} height={16} />
                        <Box styles={{padding: '6px'}} />
                        <Skeleton width={16} height={16} />
                    </div>
                </div>
                <div className={cl.cardProductFooter}>
                        <Skeleton />
                        <div className={cl.cardProductActions}>
                            <Skeleton height={39} width={168}/>
                        </div>

                </div>
            </div>

        </div>
    )
}