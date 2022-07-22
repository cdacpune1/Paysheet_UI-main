import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EmpapiService {

  constructor(private _http: HttpClient) { }
  flag = false;
  setviewFlag() {
    debugger
    this.flag = true;
  }
  getviewFlag() {
    return this.flag;
  }
  postEmployee(data: any) {
    return this._http.post<any>("http://localhost:3000/posts", data).pipe(map((res: any) => {
      return res;
    }))
  }

  getEmployee() {
    debugger
    return this._http.get<any>("http://localhost:3000/posts").pipe(map((res: any) => {
      debugger
      return res;
    }))
  }

  updateEmployee(data: any, id: number) {
    return this._http.put<any>("http://localhost:3000/posts/" + id, data).pipe(map((res: any) => {
      return res;
    }))
  }

  deleteEmployee(id: number) {
    return this._http.delete<any>("http://localhost:3000/posts/" + id).pipe(map((res: any) => {
      return res;
    }))
  }
}
