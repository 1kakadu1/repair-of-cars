import cl from "./card-post.module.scss";
import Image from 'next/image'
import { ICardPostProps } from "./card-post.model";
import notFound from "../../../assets/images/not-found.jpg";
import Link from "next/link";
// import { RoutsPath } from "../../../../@types";

export const CardPost = <T extends {
    preview: string, 
    slug: string, 
    title: string, 
    description?: string, 
    price?: number, 
    workDesc?: string,
    isStock?: boolean,
    validUntil?: string,
    tags?: string,
}> ({data, href}: ICardPostProps<T>)=>{
    const preview = data.preview === "" || data.preview === undefined ? notFound : data.preview;
    const tags = data.tags !== undefined && Array.isArray(JSON.parse(data.tags)) ?  JSON.parse(data.tags) as string[]: undefined;
    return (
        <div className={cl.cardPost}>
            <Link href={href+"/"+data.slug}>
                <a className={cl.cardPostPreviewContainer}>
                    <Image
                        layout='fill'
                        src={preview}
                        alt={data.title}
                        objectFit='cover'
                        objectPosition="center"
                    />
                </a>
            </Link>
            
            <div className={cl.cardPostInfo}>
                <Link href={href+"/"+data.slug}>
                    <a className={cl.cardPostInfoTitle}>{data.title}</a>
                </Link>
                { 
                   data.description && data.description !== "" && <div className={cl.cardPostInfoDesc}>{data.description}</div>
                }
                {
                    tags && (
                        <ul className={cl.cardPostTags}>
                            {
                               tags.map((item, index)=>(<li className={cl.cardPostTagsItem} key={index}>
                                   {item}
                               </li>))
                            }
                        </ul>
                    )
                }
                {
                    (data.workDesc || data.validUntil) && (
                        <div className={cl.cardPostInfoWorkDesc}>
                            <span className={cl.cardPostIcon}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M14 8C14 11.3137 11.3137 14 8 14C4.68629 14 2 11.3137 2 8C2 4.68629 4.68629 2 8 2C11.3137 2 14 4.68629 14 8ZM15 8C15 11.866 11.866 15 8 15C4.13401 15 1 11.866 1 8C1 4.13401 4.13401 1 8 1C11.866 1 15 4.13401 15 8ZM8.5 7.79289V4H7.5V8.20711L9.64645 10.3536L10.3536 9.64645L8.5 7.79289Z" fill="#6A6A6A"/>
                                </svg>
                            </span>
                            
                            {data.workDesc && data.workDesc}
                            {data.validUntil &&  data.validUntil}
                        </div>
                    )
                }

                {
                    data.price && (
                        <div className={cl.cardPostInfoPrice}>
                            <span className={cl.cardPostIcon}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M4 2H2V3H4V9H2V10H4V12H2V13H4V15H5V13H11V12H5V10H10C12.2091 10 14 8.20914 14 6C14 3.79086 12.2091 2 10 2H5H4ZM5 3V9H10C11.6569 9 13 7.65685 13 6C13 4.34315 11.6569 3 10 3L5 3Z" fill="#6A6A6A"/>
                                </svg>
                            </span>
                            {data.price === 0 ? 'Бесплатно': data.price}
                        </div>
                    )
                }

            </div>
            
        </div>
    )
}