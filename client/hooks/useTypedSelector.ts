import { TypedUseSelectorHook, useSelector } from "react-redux"
import {AppState} from "../store/state";

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

