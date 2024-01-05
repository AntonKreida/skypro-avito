import type { RootState } from "../store";


export const selectorUser = (state: RootState) => state.user;
export const selectorSalesman = (state: RootState) => state.salesman;
