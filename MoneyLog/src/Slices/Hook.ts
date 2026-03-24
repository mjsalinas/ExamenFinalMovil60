import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { AppDispatch, Rootstate } from ".";

//El dispatch es el medio por el cual se puede actualizar el estado invocando action que ejecutan reducers.
export const useAppDispatch = ()=> useDispatch<AppDispatch>();


export const useAppSelector : TypedUseSelectorHook<Rootstate>=useSelector;

