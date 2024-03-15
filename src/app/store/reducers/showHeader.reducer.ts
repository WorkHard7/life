import {createReducer, on} from "@ngrx/store";
import {hideHeader, showHeader} from "../actions/showHeader.actions";

export interface ShowHeaderState {
  showHeader: boolean;
}

export const initialShowHeaderState: ShowHeaderState = {
  showHeader: true
}

export const showHeaderReducer = createReducer(
  initialShowHeaderState,
  on(showHeader, state => ({...state, showHeader: true})),
  on(hideHeader, state => ({...state, showHeader: false}))
);
