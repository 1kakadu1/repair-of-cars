import { ButtonDefault } from '../../buttons/default/default.component';
import { ITextInfoProps } from './text-info.model';
import Image from 'next/image'
import cl from './text-info.module.scss';

export const TextInfo = ({title, desc, preview, link, children, order="right"}: ITextInfoProps)=>{
    return(
        <section className={cl.textInfo}>
            <div className={cl.textInfoPreviewWrap + " " + (order === 'right' ? cl.textInfoOrderDefault : cl.textInfoOrderLeft)}>
                <Image
                        layout='fill'
                        src={preview}
                        alt={title}
                        objectFit='cover'
                        objectPosition="center"
                />
            </div>
            <div className={cl.textInfoBody + " " + (order === 'right' ? cl.textInfoOrderLeft : cl.textInfoOrderDefault)}>
                {
                    title && (
                        <h2 className={cl.textInfoBodyTitle}>
                            {title}
                        </h2>
                    )
                }

                {
                    desc && (
                        <p className={cl.textInfoBodyDesc}>
                            {desc}
                        </p>
                    )
                }

                <div className={cl.textInfoBodyDesc}>
                    {children}
                </div>

                {
                    link && (
                        <ButtonDefault
                            className={cl.textInfoBodyLink}
                            link={link}
                            outline
                        >
                            Подробнее
                        </ButtonDefault>
                    )
                }

            </div>
        </section>
    )
}