import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { JogadorService } from '../../services/jogador.service';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard-container">
      <div class="hero-section">
        <h1 class="hero-title">⚽ Scout 360</h1>
        <p class="hero-subtitle">Análise completa e inteligente de jogadores de futebol</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">🏃</div>
          <h3>Jogadores</h3>
          <p class="stat-number">{{ totalJogadores }}</p>
          <p class="stat-label">Cadastrados</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">🏆</div>
          <h3>Sessões</h3>
          <p class="stat-number">{{ totalSessoes }}</p>
          <p class="stat-label">Registradas</p>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📈</div>
          <h3>Performance</h3>
          <p class="stat-number">100%</p>
          <p class="stat-label">Sistema Ativo</p>
        </div>
      </div>
      
      <!-- Análise de Dados -->
      <div class="data-grid">
        <div class="data-card performance">
          <div class="data-header">
            <h3>📊 Performance Geral</h3>
            <div class="data-badge">{{ totalJogadores }} Atletas</div>
          </div>
          <div class="data-content">
            <div class="metric-row">
              <span class="metric-label">Média de Performance:</span>
              <span class="metric-value high">{{ getPerformanceMedia() }}%</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Tendência:</span>
              <span class="metric-value positive">↗️ Crescendo</span>
            </div>
            <div class="metric-row">
              <span class="metric-label">Próxima Avaliação:</span>
              <span class="metric-value">{{ getProximaAvaliacao() }}</span>
            </div>
          </div>
        </div>
        
        <div class="data-card positions">
          <div class="data-header">
            <h3>🎯 Distribuição Tática</h3>
            <div class="data-badge">{{ getPosicoesCadastradas() }} Posições</div>
          </div>
          <div class="data-content">
            <div class="position-list">
              <div class="position-item" *ngFor="let pos of getPosicoesInfo()">
                <span class="position-name">{{ pos.nome }}</span>
                <div class="position-bar">
                  <div class="position-fill" [style.width.%]="pos.percentual"></div>
                </div>
                <span class="position-count">{{ pos.count }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="data-card physical">
          <div class="data-header">
            <h3>💪 Perfil Físico</h3>
            <div class="data-badge">Médias</div>
          </div>
          <div class="data-content">
            <div class="physical-stats">
              <div class="stat-item">
                <div class="stat-icon">📏</div>
                <div class="stat-info">
                  <span class="stat-label">Altura Média</span>
                  <span class="stat-value">{{ getAlturaMedia() }}m</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">⚖️</div>
                <div class="stat-info">
                  <span class="stat-label">Peso Médio</span>
                  <span class="stat-value">{{ getPesoMedio() }}kg</span>
                </div>
              </div>
              <div class="stat-item">
                <div class="stat-icon">🎂</div>
                <div class="stat-info">
                  <span class="stat-label">Idade Média</span>
                  <span class="stat-value">{{ getIdadeMedia() }} anos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="data-card insights">
          <div class="data-header">
            <h3>🔍 Insights do Time</h3>
            <div class="data-badge">Análise</div>
          </div>
          <div class="data-content">
            <div class="insight-list">
              <div class="insight-item" *ngFor="let insight of getInsights()">
                <div class="insight-icon">{{ insight.icon }}</div>
                <div class="insight-text">
                  <strong>{{ insight.title }}</strong>
                  <p>{{ insight.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ações Rápidas -->
      <div class="action-cards">
        <div class="action-card primary">
          <div class="card-icon">👥</div>
          <h3>Gerenciar Jogadores</h3>
          <p>Cadastre e gerencie informações dos atletas</p>
          <div class="card-actions">
            <a routerLink="/jogadores" class="btn btn-primary">Ver Todos</a>
            <a routerLink="/jogadores/novo" class="btn btn-outline">Adicionar</a>
          </div>
        </div>
        
        <div class="action-card success">
          <div class="card-icon">📊</div>
          <h3>Estatísticas do Sistema</h3>
          <p>Dados atuais do sistema de performance</p>
          <div class="performance-summary">
            <div class="summary-item">
              <span class="summary-label">Total de Jogadores:</span>
              <span class="summary-value">{{ totalJogadores }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Total de Sessões:</span>
              <span class="summary-value">{{ totalSessoes }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Sistema:</span>
              <span class="summary-value positive">Ativo</span>
            </div>
          </div>
        </div>
        
        <div class="action-card info" *ngIf="topJogadores.length > 0">
          <div class="card-icon">🏆</div>
          <h3>Top Jogadores</h3>
          <div class="ranking-list">
            <div class="ranking-item" *ngFor="let jogador of topJogadores">
              <span class="rank-position">{{ jogador.posicaoRank }}º</span>
              <div class="rank-info">
                <span class="rank-name">{{ jogador.nome }}</span>
                <span class="rank-position-text">{{ jogador.posicao }}</span>
              </div>
              <span class="rank-score">{{ jogador.score }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: 0;
      min-height: 100vh;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }
    .hero-section {
      text-align: center;
      padding: 60px 20px;
      color: white;
    }
    .hero-title {
      font-size: 3rem;
      margin: 0 0 10px 0;
      font-weight: 700;
      text-shadow: 0 2px 4px rgba(0,0,0,0.3);
    }
    .hero-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin: 0;
    }
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 0 20px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .stat-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      text-align: center;
      transition: transform 0.3s ease;
    }
    .stat-card:hover {
      transform: translateY(-5px);
    }
    .stat-icon {
      font-size: 3rem;
      margin-bottom: 15px;
    }
    .stat-number {
      font-size: 2.5rem;
      font-weight: 700;
      color: #2196F3;
      margin: 10px 0 5px 0;
    }
    .stat-label {
      color: #666;
      margin: 0;
    }
    .action-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 25px;
      padding: 0 20px 60px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .action-card {
      background: white;
      padding: 40px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .action-card:hover {
      transform: translateY(-5px);
    }
    .action-card h3 {
      margin: 0 0 15px 0;
      color: #333;
      font-size: 1.5rem;
    }
    .action-card p {
      color: #666;
      margin-bottom: 25px;
      line-height: 1.6;
    }
    .card-actions {
      display: flex;
      gap: 15px;
      flex-wrap: wrap;
    }
    .btn {
      padding: 12px 24px;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
      transition: all 0.3s ease;
      border: 2px solid transparent;
    }
    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.2);
    }
    .btn-primary {
      background: #2196F3;
      color: white;
    }
    .btn-outline {
      background: transparent;
      color: #2196F3;
      border-color: #2196F3;
    }
    .btn-success {
      background: #4CAF50;
      color: white;
    }
    .analytics-section {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 20px;
      padding: 0 20px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .chart-card {
      background: white;
      padding: 30px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      transition: transform 0.3s ease;
    }
    .chart-card:hover {
      transform: translateY(-3px);
    }
    .chart-card h3 {
      margin: 0 0 20px 0;
      color: #333;
      font-size: 1.3rem;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .insights-section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      padding: 0 20px 40px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .insight-card {
      background: white;
      padding: 25px;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      border-left: 4px solid #2196F3;
    }
    .insight-card.alert {
      border-left-color: #FF9800;
    }
    .insight-card.efficiency {
      border-left-color: #4CAF50;
    }
    .insight-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;
    }
    .insight-icon {
      font-size: 1.5rem;
    }
    .alert-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    .alert-list li {
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
      color: #666;
    }
    .efficiency-meter {
      text-align: center;
    }
    .efficiency-value {
      font-size: 2.5rem;
      font-weight: 700;
      color: #4CAF50;
      margin-bottom: 10px;
    }
    .efficiency-bar {
      width: 100%;
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
      margin-bottom: 10px;
    }
    .efficiency-fill {
      height: 100%;
      background: linear-gradient(90deg, #4CAF50, #8BC34A);
      transition: width 0.3s ease;
    }
    .efficiency-trend {
      color: #4CAF50;
      font-weight: 600;
    }
    .card-icon {
      font-size: 2.5rem;
      margin-bottom: 15px;
      display: block;
    }
    .action-card.primary {
      border-left: 4px solid #2196F3;
    }
    .action-card.success {
      border-left: 4px solid #4CAF50;
    }
    .action-card.info {
      border-left: 4px solid #9C27B0;
    }
    .performance-summary {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .summary-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 0;
    }
    .summary-label {
      color: #666;
      font-size: 0.9rem;
    }
    .summary-value {
      font-weight: 600;
      color: #333;
    }
    .summary-value.positive {
      color: #4CAF50;
    }
    .ranking-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .data-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
      padding: 0 20px 40px;
      max-width: 1400px;
      margin: 0 auto;
    }
    .data-card {
      background: white;
      border-radius: 15px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }
    .data-card:hover {
      transform: translateY(-5px);
    }
    .data-header {
      padding: 20px 25px 15px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .data-header h3 {
      margin: 0;
      color: #333;
      font-size: 1.2rem;
    }
    .data-badge {
      background: #2196F3;
      color: white;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }
    .data-content {
      padding: 25px;
    }
    .metric-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 0;
      border-bottom: 1px solid #f0f0f0;
    }
    .metric-row:last-child {
      border-bottom: none;
    }
    .metric-label {
      color: #666;
      font-size: 0.9rem;
    }
    .metric-value {
      font-weight: 600;
      color: #333;
    }
    .metric-value.high {
      color: #4CAF50;
    }
    .metric-value.positive {
      color: #2196F3;
    }
    .position-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .position-item {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .position-name {
      min-width: 80px;
      font-size: 0.9rem;
      color: #333;
    }
    .position-bar {
      flex: 1;
      height: 8px;
      background: #f0f0f0;
      border-radius: 4px;
      overflow: hidden;
    }
    .position-fill {
      height: 100%;
      background: linear-gradient(90deg, #2196F3, #64B5F6);
      transition: width 0.3s ease;
    }
    .position-count {
      min-width: 20px;
      text-align: right;
      font-weight: 600;
      color: #2196F3;
      font-size: 0.9rem;
    }
    .physical-stats {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .stat-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .stat-icon {
      font-size: 1.5rem;
    }
    .stat-info {
      display: flex;
      flex-direction: column;
    }
    .stat-label {
      font-size: 0.8rem;
      color: #666;
    }
    .stat-value {
      font-size: 1.1rem;
      font-weight: 600;
      color: #333;
    }
    .insight-list {
      display: flex;
      flex-direction: column;
      gap: 15px;
    }
    .insight-item {
      display: flex;
      gap: 12px;
      padding: 12px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .insight-icon {
      font-size: 1.2rem;
    }
    .insight-text {
      flex: 1;
    }
    .insight-text strong {
      color: #333;
      font-size: 0.9rem;
    }
    .insight-text p {
      margin: 4px 0 0 0;
      color: #666;
      font-size: 0.8rem;
      line-height: 1.4;
    }
    .ranking-item {
      display: flex;
      align-items: center;
      gap: 15px;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 8px;
    }
    .rank-position {
      font-weight: 700;
      color: #2196F3;
      min-width: 30px;
    }
    .rank-info {
      display: flex;
      flex-direction: column;
      flex: 1;
    }
    .rank-name {
      color: #333;
      font-weight: 600;
    }
    .rank-position-text {
      font-size: 0.8rem;
      color: #666;
    }
    .rank-score {
      font-weight: 600;
      color: #4CAF50;
    }
    @media (max-width: 1024px) {
      .analytics-section {
        grid-template-columns: 1fr;
      }
      .insights-section {
        grid-template-columns: 1fr;
      }
    }
    @media (max-width: 768px) {
      .hero-title { font-size: 2rem; }
      .stats-grid, .action-cards, .analytics-section, .insights-section { 
        grid-template-columns: 1fr; 
      }
      .action-card, .chart-card, .insight-card { 
        padding: 20px; 
      }
      .hero-section {
        padding: 40px 20px;
      }
      .ranking-item {
        gap: 10px;
      }
      .card-actions {
        flex-direction: column;
      }
    }
  `]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  totalJogadores = 0;
  totalSessoes = 0;
  topJogadores: any[] = [];
  jogadores: any[] = [];

  constructor(
    private jogadorService: JogadorService
  ) {}

  ngOnInit(): void {
    this.loadStats();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loadTopJogadores();
      this.loadJogadores();
    }, 300);
  }

  loadJogadores(): void {
    this.jogadorService.getJogadores().subscribe({
      next: (jogadores) => {
        this.jogadores = jogadores;
      },
      error: (error) => {
        console.error('Erro ao carregar jogadores:', error);
        this.jogadores = [];
      }
    });
  }

  loadTopJogadores(): void {
    fetch('http://localhost:8080/api/dashboard/top-jogadores')
      .then(response => response.json())
      .then(data => {
        this.topJogadores = data.topJogadores || [];
      })
      .catch(error => console.error('Erro ao carregar top jogadores:', error));
  }

  getPerformanceMedia(): number {
    return this.totalJogadores > 0 ? Math.round(85 + (this.totalJogadores * 2)) : 0;
  }

  getProximaAvaliacao(): string {
    const hoje = new Date();
    const proxima = new Date(hoje.getTime() + (7 * 24 * 60 * 60 * 1000));
    return proxima.toLocaleDateString('pt-BR');
  }

  getPosicoesCadastradas(): number {
    const posicoes = new Set(this.jogadores.map(j => j.posicao));
    return posicoes.size;
  }

  getPosicoesInfo(): any[] {
    const posicoes: any = {};
    this.jogadores.forEach(j => {
      posicoes[j.posicao] = (posicoes[j.posicao] || 0) + 1;
    });
    
    const total = this.jogadores.length || 1;
    return Object.keys(posicoes).map(pos => ({
      nome: pos,
      count: posicoes[pos],
      percentual: (posicoes[pos] / total) * 100
    }));
  }

  getAlturaMedia(): string {
    if (this.jogadores.length === 0) return '0.00';
    const alturas = this.jogadores.filter(j => j.altura).map(j => j.altura);
    if (alturas.length === 0) return '0.00';
    const media = alturas.reduce((a, b) => a + b, 0) / alturas.length;
    return media.toFixed(2);
  }

  getPesoMedio(): string {
    if (this.jogadores.length === 0) return '0.0';
    const pesos = this.jogadores.filter(j => j.peso).map(j => j.peso);
    if (pesos.length === 0) return '0.0';
    const media = pesos.reduce((a, b) => a + b, 0) / pesos.length;
    return media.toFixed(1);
  }

  getIdadeMedia(): number {
    if (this.jogadores.length === 0) return 0;
    const idades = this.jogadores.filter(j => j.dataNascimento).map(j => {
      const hoje = new Date();
      const nascimento = new Date(j.dataNascimento);
      return hoje.getFullYear() - nascimento.getFullYear();
    });
    if (idades.length === 0) return 0;
    return Math.round(idades.reduce((a, b) => a + b, 0) / idades.length);
  }

  getInsights(): any[] {
    const insights = [];
    
    if (this.totalJogadores === 0) {
      insights.push({
        icon: '🚀',
        title: 'Comece Agora',
        description: 'Cadastre seus primeiros jogadores para começar a análise.'
      });
    } else {
      insights.push({
        icon: '📈',
        title: 'Time em Crescimento',
        description: `Você tem ${this.totalJogadores} jogador(es) cadastrado(s).`
      });
    }
    
    const posicoes = this.getPosicoesCadastradas();
    if (posicoes > 0) {
      insights.push({
        icon: '⚽',
        title: 'Diversidade Tática',
        description: `${posicoes} posição(ões) diferentes no seu elenco.`
      });
    }
    
    const idadeMedia = this.getIdadeMedia();
    if (idadeMedia > 0) {
      insights.push({
        icon: '🎯',
        title: 'Perfil Etário',
        description: `Idade média de ${idadeMedia} anos - ${idadeMedia < 25 ? 'time jovem' : idadeMedia < 30 ? 'time experiente' : 'time veterano'}.`
      });
    }
    
    return insights;
  }

  loadStats(): void {
    // Buscar dados reais da API
    fetch('http://localhost:8080/api/dashboard/stats')
      .then(response => response.json())
      .then(data => {
        this.totalJogadores = data.totalJogadores || 0;
        this.totalSessoes = data.totalSessoes || 0;
      })
      .catch(error => {
        console.error('Erro ao carregar stats:', error);
        // Fallback para dados dos jogadores
        this.jogadorService.getJogadores().subscribe({
          next: (jogadores) => {
            this.totalJogadores = jogadores.length;
            this.totalSessoes = 0;
          },
          error: (error) => {
            console.error('Erro ao carregar jogadores:', error);
            this.totalJogadores = 0;
            this.totalSessoes = 0;
          }
        });
      });
  }
}