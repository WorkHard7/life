import {AllEvents} from "../model/events";

export const GEMS: AllEvents[] = [
  {
    index: 1,
    title: 'Comori din Cuvântul lui Dumnezeu',
    hours: 19,
    minutes: 16,
    seconds: 10,
    duration: 10
  },
  {
    index: 2,
    title: 'Nestemate spirituale',
    hours: 19,
    minutes: 26,
    seconds: 30,
    duration: 10
  },
  {
    index: 3,
    title: 'Citirea Bibliei',
    hours: 19,
    minutes: 31,
    seconds: 0,
    duration: 4
  }
]

export const CHRISTIAN_LIFE: ReadonlyArray<AllEvents> = [
  {
    index: 5,
    title: 'Tema A',
    hours: 20,
    minutes: '0' + 5,
    seconds: 40,
    duration: 15
  },
  {
    index: 6,
    title: 'Studiul Bibliei',
    hours: 20,
    minutes: 36,
    seconds: 30,
    duration: 30
  }
]

export const FINISH_PART: AllEvents = {
  index: 7,
  title: 'Cuvinte de încheiere, anunțuri',
  hours: 20,
  minutes: 40,
  seconds: 0,
  duration: 3
}
