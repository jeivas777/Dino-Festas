import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Kit {
  id: number;
  nome: string;
  descricao: string;
  // Outras propriedades do Kit
}

export interface Item {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  kit: Kit; // O kit agora é um objeto completo
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseEndpoint = 'http://localhost:8080/api/items';

  constructor(private http: HttpClient) {}

  // Método atualizado para buscar itens com paginação
  getItems(page: number = 0, size: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString()) // Adiciona o número da página
      .set('size', size.toString()); // Adiciona o tamanho da página

    return this.http.get<any>(`${this.baseEndpoint}`, { params });
  }

  // Método para criar um novo item
  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseEndpoint}`, item);
  }

  // Método para atualizar um item
  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseEndpoint}/${id}`, item);
  }

  // Método para excluir um item
  deleteItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseEndpoint}/${id}`);
  }
}
