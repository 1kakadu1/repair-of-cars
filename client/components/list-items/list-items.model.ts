export interface IListItemsProps{
    className?: string;
    title: string;
    items: {
        name: string
        href?: string;
    }[]
}