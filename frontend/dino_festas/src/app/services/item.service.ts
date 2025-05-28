import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Item {
  id?: number;
  nome: string;
  tema: string;
  categoria: string;
  valor: number;
  codigo: number;
  imagens: string[];
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // página atual (0 = primeira página)
}

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseEndpoint = 'https://dino-festas.onrender.com/api/itens';

  constructor(private http: HttpClient) {}

  getItems(
    query: string = '',
    categoria: string = '',
    page: number = 0,
    size: number = 10
  ): Observable<Page<Item>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    if (query) {
      params = params.set('termoBusca', query);
    }

    if (categoria) {
      params = params.set('filtroCategoria', categoria);
    }

    return this.http.get<Page<Item>>(this.baseEndpoint, { params });
  }

  getItem(id: number): Observable<Item> {
    return this.http.get<Item>(`${this.baseEndpoint}/${id}`);
  }

  createItem(item: Item): Observable<Item> {
    return this.http.post<Item>(`${this.baseEndpoint}`, item);
  }

  updateItem(id: number, item: Item): Observable<Item> {
    return this.http.put<Item>(`${this.baseEndpoint}/${id}`, item);
  }

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
