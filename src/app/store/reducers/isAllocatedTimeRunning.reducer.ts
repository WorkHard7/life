import {createReducer, on} from "@ngrx/store";
import {startAllocatedTime, stopAllocatedTime} from "../actions/isAllocatedTimeRunning.actions";

export interface isAllocatedTimeRunningState {
  isAllocatedTimeRunning: boolean;
}

export const initialIsAllocatedTimeRunningState: isAllocatedTimeRunningState = {
  isAllocatedTimeRunning: false
}

export const isAllocatedTimeRunningReducer = createReducer(
  initialIsAllocatedTimeRunningState,
  on(startAllocatedTime, state => ({...state, isAllocatedTimeRunning: true})),
  on(stopAllocatedTime, state => ({...state, isAllocatedTimeRunning: false}))
);
