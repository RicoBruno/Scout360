import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessaoPerformance } from '../models/sessao-performance.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessaoPerformanceService {
  private apiUrl = `${environment.apiBaseUrl}/sessoes`;

  constructor(private http: HttpClient) { }

  getSessoes(jogadorId?: number, tipoSessao?: string): Observable<SessaoPerformance[]> {
    let params = new HttpParams();
    if (jogadorId) params = params.set('jogadorId', jogadorId.toString());
    if (tipoSessao) params = params.set('tipoSessao', tipoSessao);
    
    return this.http.get<SessaoPerformance[]>(this.apiUrl, { params });
  }

  getSessaoById(id: number): Observable<SessaoPerformance> {
    return this.http.get<SessaoPerformance>(`${this.apiUrl}/${id}`);
  }

  getSessoesByJogador(jogadorId: number): Observable<SessaoPerformance[]> {
    return this.http.get<SessaoPerformance[]>(`${this.apiUrl}/jogador/${jogadorId}`);
  }

  createSessao(sessao: SessaoPerformance): Observable<SessaoPerformance> {
    return this.http.post<SessaoPerformance>(this.apiUrl, sessao);
  }

  updateSessao(id: number, sessao: SessaoPerformance): Observable<SessaoPerformance> {
    return this.http.put<SessaoPerformance>(`${this.apiUrl}/${id}`, sessao);
  }

  deleteSessao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Métodos de cálculo
  calcularDistanciaPorMinuto(distancia: number, duracao: number): number {
    return duracao > 0 ? distancia / duracao : 0;
  }

  calcularCargaTrabalho(duracao: number, batimentos: number): number {
    return duracao * batimentos;
  }

  calcularSprintsPorMinuto(sprints: number, duracao: number): number {
    return duracao > 0 ? sprints / duracao : 0;
  }

  calcularIntensidade(cargaTrabalho: number): string {
    if (cargaTrabalho < 5000) return 'Baixa';
    if (cargaTrabalho <= 10000) return 'Média';
    return 'Alta';
  }
}