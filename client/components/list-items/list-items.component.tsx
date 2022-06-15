import Link from "next/link";
import { IListItemsProps } from "./list-items.model";
import st from  "./list-items.module.scss";

export const ListItems = ({className = "", items, title}: IListItemsProps)=>{
    return(
        <div className={st.container + " " + className}>
                <div className={st.title}>
                    {title}
                </div>
                <ul className={st.list}>
                    {
                        items.map((item)=>{
                            if(item.href){
                                return  <li className={st.listItem} key={item.href}><Link href={item.href} > 
                                            <a className={st.listItemText}>
                                                {item.name}
                                            </a>
                                        </Link></li>
                            }
                            return <li key={item.name} className={st.listItem}><span className={st.listItemText}>{item.name}</span></li>
                        })
                    }
                </ul>         
        </div>
    )
}