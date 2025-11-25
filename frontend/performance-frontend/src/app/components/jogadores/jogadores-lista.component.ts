import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { JogadorService } from '../../services/jogador.service';
import { Jogador } from '../../models/jogador.model';

@Component({
  selector: 'app-jogadores-lista',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './jogadores-lista.component.html',
  styleUrls: ['./jogadores-lista.component.scss']
})
export class JogadoresListaComponent implements OnInit {
  jogadores: Jogador[] = [];
  filtroNome: string = '';
  filtroPosicao: string = '';
  posicoes: string[] = ['Goleiro', 'Zagueiro', 'Lateral', 'Meio-campo', 'Atacante'];

  constructor(
    private jogadorService: JogadorService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadJogadores();
  }

  loadJogadores(): void {
    this.jogadorService.getJogadores(this.filtroNome, this.filtroPosicao).subscribe({
      next: (jogadores) => {
        this.jogadores = jogadores;
      },
      error: (error) => {
        console.error('Erro ao carregar jogadores:', error);
      }
    });
  }

  filtrar(): void {
    this.loadJogadores();
  }

  onPosicaoChange(): void {
    this.loadJogadores();
  }

  limparFiltros(): void {
    this.filtroNome = '';
    this.filtroPosicao = '';
    this.loadJogadores();
  }

  verDetalhes(id: number): void {
    this.router.navigate(['/jogadores', id]);
  }

  editarJogador(id: number): void {
    this.router.navigate(['/jogadores', id, 'editar']);
  }

  excluirJogador(id: number, nome: string): void {
    if (confirm(`Tem certeza que deseja excluir o jogador ${nome}?`)) {
      this.jogadorService.deleteJogador(id).subscribe({
        next: () => {
          this.loadJogadores();
        },
        error: (error) => {
          console.error('Erro ao excluir jogador:', error);
          alert('Erro ao excluir jogador');
        }
      });
    }
  }

  novoJogador(): void {
    this.router.navigate(['/jogadores/novo']);
  }

  calcularIdade(dataNascimento: string): number {
    if (!dataNascimento) return 0;
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
      idade--;
    }
    return idade;
  }

  formatarPosicao(posicao: string): string {
    return posicao;
  }
}