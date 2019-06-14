import { Injectable } from '@angular/core';
import { BaseService } from 'src/shared/base.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { environment } from 'src/environments/environment';
import { Vacina } from './model/vacina';


@Injectable({
  providedIn: 'root'
})
export class VacinaService extends BaseService{

  constructor(private http: HttpClient) {
    super();
   }

   save(vacina: any) : Observable<any>{
    //Primeiro parâmetro == URL
    //Segundo Parâmetro == BODY - Corpo de cada requisição
    return this.http.post(environment.urlWebAPI + "Vacinas/", vacina)
    .catch((error: any) => Observable.throw(error.error));
  }

  listAll() : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Vacinas/")
    .catch((error: any) => Observable.throw(error.error));
  }

  delete(id: number) : Observable<any>{
    return this.http.delete(environment.urlWebAPI + "Vacinas/" + id)
    .catch((error: any) => Observable.throw(error.error));
  }

  update(vacina: Vacina) : Observable<any>{
    return  this.http.put(environment.urlWebAPI + "Vacinas/" + vacina.idVacina, vacina)
    .catch((error: any) => Observable.throw(error.error));
  }

  getById(id: number) : Observable<any>{
    return this.http.get(environment.urlWebAPI + "Vacinas/" + id)
    .catch((error: any) => Observable.throw(error.error));
  }

}
