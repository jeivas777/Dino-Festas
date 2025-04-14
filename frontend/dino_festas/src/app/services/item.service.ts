import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Kit } from './kit.service';

export interface Item {
  id?: number;
  nome: string;
  descricao: string;
  preco?: number;
  imagens: string[];
  kit: Kit;
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseEndpoint = 'http://localhost:8080/api/itens';

  constructor(private http: HttpClient) {}

  // Método atualizado para buscar itens com paginação
  getItems(): Observable<any> {
    return this.http.get<any>(`${this.baseEndpoint}`);
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

  uploadImages(files: File[]): Observable<string[]> {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    return this.http.post<string[]>(
      `${this.baseEndpoint}/upload-imagens`,
      formData
    );
  }
}
