// reduxHooks.ts
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store"; // importa tu store

// Hook para dispatch tipado
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Hook para useSelector tipado
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
