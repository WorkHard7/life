import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectShowHeaderState = (state: AppState) => state.showHeader;

export const selectHeader = createSelector(
  selectShowHeaderState,
  (state) => state.showHeader
)
