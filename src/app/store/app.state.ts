import {HeaderState} from "./reducers/showHeader.reducer";
import {isTimeRunningState} from "./reducers/isTimeRunning.reducer";
import {isAllocatedTimeRunningState} from "./reducers/isAllocatedTimeRunning.reducer";

export interface AppState {
  showHeader: HeaderState,
  isTimeRunning: isTimeRunningState,
  isAllocatedTimeRunning: isAllocatedTimeRunningState
}
