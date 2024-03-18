import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectHeaderState = (state: AppState) => state.showHeader;

export const selectHeader = createSelector(
  selectHeaderState,
  (state) => state.showHeader
)
