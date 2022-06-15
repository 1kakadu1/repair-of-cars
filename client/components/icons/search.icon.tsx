import { IIconProps } from "./icon.model"

export const SearchIcon = ({viewBox = "0 0 16 16", className= ""}: IIconProps) =>{
    return(
        <svg width="16" height="16" className={className} viewBox={viewBox} fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 7.5C12 9.98528 9.98528 12 7.5 12C5.01472 12 3 9.98528 3 7.5C3 5.01472 5.01472 3 7.5 3C9.98528 3 12 5.01472 12 7.5ZM11.0195 11.7266C10.0658 12.5217 8.83875 13 7.5 13C4.46243 13 2 10.5376 2 7.5C2 4.46243 4.46243 2 7.5 2C10.5376 2 13 4.46243 13 7.5C13 8.83875 12.5217 10.0658 11.7266 11.0195L14.3536 13.6464L13.6464 14.3536L11.0195 11.7266Z" fill="currentColor"/>
        </svg>
    )
}