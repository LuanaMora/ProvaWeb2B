import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Animal } from '../vacina/model/animal';

@Injectable({
  providedIn: 'root'
})
export class AnimalService extends BaseService {


  constructor(private http: HttpClient) {
    super();
   }

   save(animal: any) : Observable<any>{
    //Primeiro parâmetro == URL
    //Segundo Parâmetro == BODY - Corpo de cada requisição
    return this.http.post(environment.urlWebAPI + "Animals/", animal)
    .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Animals/")
    .catch((error: any) => Observable.throw(error.error));
  }

  delete(id: number) : Observable<any>{
    return this.http.delete(environment.urlWebAPI + "Animals/" + id)
    .catch((error: any) => Observable.throw(error.error));
  }

  update(animal: Animal) : Observable<any>{
    return  this.http.put(environment.urlWebAPI + "Animals/" + animal.idAnimal, animal)
    .catch((error: any) => Observable.throw(error.error));
  }

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Animals/" + id)
    .catch((error: any) => Observable.throw(error.error));
  }
}
