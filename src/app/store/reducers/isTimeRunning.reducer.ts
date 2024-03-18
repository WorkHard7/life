import {createReducer, on} from "@ngrx/store";
import {startTime, stopTime} from "../actions/isTimeRunning.actions";

export interface isTimeRunningState {
  isTimeRunning: boolean;
}

export const initialIsTimeRunningState: isTimeRunningState = {
  isTimeRunning: false
}

export const isTimeRunningReducer = createReducer(
  initialIsTimeRunningState,
  on(startTime, state => ({...state, isTimeRunning: true})),
  on(stopTime, state => ({...state, isTimeRunning: false}))
);
