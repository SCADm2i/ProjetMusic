import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Music } from './music';
import { Playlist } from './playlist';
import { List } from './list';


@Injectable({
  providedIn: 'root'
})
export class BddService {

  constructor(private http: HttpClient) { }

  getBib() {
    const biblioUrl = 'http://localhost:8080/biblio';
    return this.http.get<Music>(biblioUrl);
  }

  getList() {
    const listUrl = 'http://localhost:8080/list';
    return this.http.get<List>(listUrl);
  }

  getPlayList(id: number) {
    const playListsUrl = 'http://localhost:8080/playlist/' + id;
    return this.http.get<Playlist>(playListsUrl);
  }

  addTitleTo(music: Music, playListNo: Playlist) {
    // TODO: implement proper url for playlist
    const pLUrl = 'http://localhost:8080/playList/' + playListNo + '/' + music.id;
    return this.http.post(pLUrl, music);
  }

  delTitle(music: Music, playListNo: number) {
    // TODO: implement proper url for playlist
    const pLUrl = 'http://localhost:8080/playlist/' + playListNo + '/' + music.id;
    return this.http.delete(pLUrl);
  }



  // json server error handling
  //
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }



}
