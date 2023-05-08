import {Injectable} from '@angular/core';
import {SPEECHES} from "../mock/mock-parts.service";
import {ProcessParts} from "../model/process-parts";
import {catchError, Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PartsService {

  constructor() {
  }

  getParts(): Observable<ProcessParts[]> {
    return of<ProcessParts[]>(
      SPEECHES
    ).pipe(
      catchError(err => {
        throw new Error('Error occurred while fetching the data')
      }))
  }
}
