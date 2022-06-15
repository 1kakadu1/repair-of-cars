import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { sliceActions } from "../store/slices";

export const useActions = () =>{
    const dispatch = useDispatch();

    return bindActionCreators(sliceActions,dispatch)
}