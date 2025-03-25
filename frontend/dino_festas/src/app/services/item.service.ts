import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Item {
 nome: string;
  
}

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private baseEndpoint = 'http://localhost:8080/api/Items'
  
  constructor(private http:HttpClient) {}
  
  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(`${this.baseEndpoint}`)
  }

  createItem(Item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseEndpoint}`, Item)
  }

  updateItem(id: number, Item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseEndpoint}`, Item)
  }

  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`)
  }
}
