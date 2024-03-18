import {createReducer, on} from "@ngrx/store";
import {hideHeader, showHeader} from "../actions/showHeader.actions";

export interface HeaderState {
  showHeader: boolean;
}

export const initialHeaderState: HeaderState = {
  showHeader: true
}

export const showHeaderReducer = createReducer(
  initialHeaderState,
  on(showHeader, state => ({...state, showHeader: true})),
  on(hideHeader, state => ({...state, showHeader: false}))
);
