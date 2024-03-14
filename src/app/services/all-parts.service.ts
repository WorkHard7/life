import {Injectable} from '@angular/core';
import {AllEvents} from "../model/events";

@Injectable({
  providedIn: 'root'
})
export class AllPartsService {

  allSpeeches: AllEvents[] = [
    {
      index: 0,
      title: 'Cântare, rugăciune | Cuvinte introductive',
      hours: 19,
      minutes: 6,
      seconds: 0,
      duration: 6
    },
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
    },
    {
      index: 4,
      title: 'Să fim mai eficienți în predicare',
      hours: 19,
      minutes: 47,
      seconds: 0,
      duration: 15
    },
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
    },
    {
      index: 7,
      title: 'Cuvinte de încheiere, anunțuri',
      hours: 20,
      minutes: 40,
      seconds: 0,
      duration: 3
    }
  ]
}
