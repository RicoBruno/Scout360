import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jogador } from '../models/jogador.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JogadorService {
  private apiUrl = `${environment.apiBaseUrl}/jogadores`;

  constructor(private http: HttpClient) { }

  getJogadores(nome?: string, posicao?: string): Observable<Jogador[]> {
    let params = new HttpParams();
    if (nome && nome.trim()) {
      params = params.set('nome', nome.trim());
    }
    if (posicao && posicao.trim() && posicao !== '') {
      params = params.set('posicao', posicao.trim());
    }
    
    return this.http.get<Jogador[]>(this.apiUrl, { params });
  }

  getJogadorById(id: number): Observable<Jogador> {
    return this.http.get<Jogador>(`${this.apiUrl}/${id}`);
  }

  createJogador(jogador: Jogador): Observable<Jogador> {
    return this.http.post<Jogador>(this.apiUrl, jogador);
  }

  updateJogador(id: number, jogador: Jogador): Observable<Jogador> {
    return this.http.put<Jogador>(`${this.apiUrl}/${id}`, jogador);
  }

  deleteJogador(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}