import { TireIcon } from "../icons/tire.icon"
import { CSSTransition } from 'react-transition-group';
import cl from "./loader.module.scss";

export const Loader = ({loading, opacity = true}:{loading: boolean, opacity?: boolean})=>{
    return(
        <CSSTransition
            in={loading}
            timeout={300}
            classNames="loader"
            unmountOnExit
        >
          <div className={`${cl.pageLoader} ${opacity ? cl.pageLoaderOpacity : cl.pageLoaderOpacityOff}`}>
            <div className={`${cl.pageLoaderBody}`}>
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