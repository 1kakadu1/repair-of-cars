export interface IMenuProps{
    className?: string;
    links: IMenuItem[]
}

export interface IMenuSubProps{
    className?: string;
    links: IMenuItem[];
    open: string;
    active: string; 
    onClose: ()=> void;
}

export interface IMenuItem{
    href: string;
    name: string;
    subMenu?: IMenuSubItem[];
    order?: number;
}

export interface IMenuSubItem{
    href: string;
    name: string;
    preview?: string;
    icon?: JSX.Element;
    parentHref: string;
    description?: string;
}