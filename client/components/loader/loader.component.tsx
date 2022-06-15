import { TireIcon } from "../icons/tire.icon"
import { CSSTransition } from 'react-transition-group';
import cl from "./loader.module.scss";

export const Loader = ({loading}:{loading: boolean})=>{
    return(
        <CSSTransition
            in={loading}
            timeout={300}
            classNames="loader"
            unmountOnExit
        >
          <div className={cl.pageLoader}>
            <div className={cl.pageLoaderBody}>
                <div className={cl.pageLoaderAnimationIcon}>
                  <TireIcon className={cl.pageLoaderIcon} />
                </div>
                
                <div className={cl.pageLoaderTitle}>
                  Загрузка...
                </div>
            </div>
          </div>
      </CSSTransition>
    )
}