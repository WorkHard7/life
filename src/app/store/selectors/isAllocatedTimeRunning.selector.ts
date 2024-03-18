import {AppState} from "../app.state";
import {createSelector} from "@ngrx/store";

export const selectIsAllocatedTimeRunningState = (state: AppState) => state.isAllocatedTimeRunning;

export const selectIsAllocatedTimeRunning = createSelector(
  selectIsAllocatedTimeRunningState,
  (state) => state.isAllocatedTimeRunning
)
