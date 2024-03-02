import {Events} from "../model/events";

export const GEMS: Events[] = [
  {
    title: 'Comori din Cuvântul lui Dumnezeu',
    hours: 19,
    minutes: 16,
    seconds: 10,
    duration: 10
  },
  {
    title: 'Nestemate spirituale',
    hours: 19,
    minutes: 26,
    seconds: 30,
    duration: 10
  },
  {
    title: 'Citirea Bibliei',
    hours: 19,
    minutes: 31,
    seconds: 0,
    duration: 4
  }
]

export const PREACHING: Events[] = []

export const CHRISTIAN_LIFE: ReadonlyArray<Events> = [
  {
    title: 'Tema A',
    hours: 20,
    minutes: '0' + 5,
    seconds: 40,
    duration: 15
  },
  {
    title: 'Studiul Bibliei',
    hours: 20,
    minutes: 36,
    seconds: 20,
    duration: 30
  }
]
