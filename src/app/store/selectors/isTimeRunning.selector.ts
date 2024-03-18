import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectIsTimeRunningState = (state: AppState) => state.isTimeRunning;

export const selectIsTimeRunning = createSelector(
  selectIsTimeRunningState,
  (state) => state.isTimeRunning
)
