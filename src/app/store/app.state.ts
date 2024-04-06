import {isTimeRunningState} from "./reducers/isTimeRunning.reducer";
import {isAllocatedTimeRunningState} from "./reducers/isAllocatedTimeRunning.reducer";

export interface AppState {
  isTimeRunning: isTimeRunningState,
  isAllocatedTimeRunning: isAllocatedTimeRunningState
}
