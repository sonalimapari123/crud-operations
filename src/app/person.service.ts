import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor(private http:HttpClient) { }
  private url = 'http://localhost:3000/posts';

  getperson(){
    return this.http.get(this.url);
  }
  addperson(params:any){
    return this.http.post(this.url,params)
  }

  updateperson(id: number, params: any) {
    return this.http.put(`${this.url}/${id}`, params); // Include the id in the URL
  }
  deletePerson(id: number){
    debugger
    return this.http.delete(`${this.url}/${id}`)
  }
}
