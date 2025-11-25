import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SessaoPerformanceService } from '../../services/sessao-performance.service';
import { JogadorService } from '../../services/jogador.service';
import { SessaoPerformance } from '../../models/sessao-performance.model';
import { Jogador } from '../../models/jogador.model';

@Component({
  selector: 'app-sessao-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sessao-form.component.html',
  styleUrls: ['./sessao-form.component.scss']
})
export class SessaoFormComponent implements OnInit {
  sessaoForm: FormGroup;
  jogadores: Jogador[] = [];
  isEditMode = false;
  sessaoId: number | null = null;
  tiposSessao = ['TREINO', 'JOGO'];
  
  // Campos calculados em tempo real
  distanciaPorMinuto = 0;
  cargaTrabalho = 0;
  sprintsPorMinuto = 0;
  intensidade = 'Baixa';

  constructor(
    private fb: FormBuilder,
    private sessaoService: SessaoPerformanceService,
    private jogadorService: JogadorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.sessaoForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadJogadores();
    this.setupFormSubscriptions();
    
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'nova') {
        this.isEditMode = true;
        this.sessaoId = +params['id'];
        this.loadSessao();
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      jogadorId: ['', Validators.required],
      tipoSessao: ['', Validators.required],
      data: ['', Validators.required],
      duracaoMinutos: ['', [Validators.required, Validators.min(1), Validators.max(180)]],
      distanciaPercorridaMetros: ['', [Validators.min(0), Validators.max(20000)]],
      velocidadeMediaKmH: ['', [Validators.min(0), Validators.max(50)]],
      velocidadeMaximaKmH: ['', [Validators.min(0), Validators.max(60)]],
      batimentosMedios: ['', [Validators.min(60), Validators.max(220)]],
      batimentosMaximos: ['', [Validators.min(60), Validators.max(220)]],
      numeroSprints: ['', [Validators.min(0), Validators.max(100)]],
      observacoes: ['']
    });
  }

  setupFormSubscriptions(): void {
    // Recalcular métricas quando campos relevantes mudarem
    this.sessaoForm.valueChanges.subscribe(() => {
      this.calcularMetricas();
    });
  }

  calcularMetricas(): void {
    const duracao = this.sessaoForm.get('duracaoMinutos')?.value || 0;
    const distancia = this.sessaoForm.get('distanciaPercorridaMetros')?.value || 0;
    const batimentos = this.sessaoForm.get('batimentosMedios')?.value || 0;
    const sprints = this.sessaoForm.get('numeroSprints')?.value || 0;

    this.distanciaPorMinuto = this.sessaoService.calcularDistanciaPorMinuto(distancia, duracao);
    this.cargaTrabalho = this.sessaoService.calcularCargaTrabalho(duracao, batimentos);
    this.sprintsPorMinuto = this.sessaoService.calcularSprintsPorMinuto(sprints, duracao);
    this.intensidade = this.sessaoService.calcularIntensidade(this.cargaTrabalho);
  }

  loadJogadores(): void {
    this.jogadorService.getJogadores().subscribe({
      next: (jogadores) => {
        this.jogadores = jogadores;
      },
      error: (error) => {
        console.error('Erro ao carregar jogadores:', error);
      }
    });
  }

  loadSessao(): void {
    if (this.sessaoId) {
      this.sessaoService.getSessaoById(this.sessaoId).subscribe({
        next: (sessao) => {
          this.sessaoForm.patchValue({
            jogadorId: sessao.jogador.id,
            tipoSessao: sessao.tipoSessao,
            data: sessao.data.substring(0, 16), // Para datetime-local input
            duracaoMinutos: sessao.duracaoMinutos,
            distanciaPercorridaMetros: sessao.distanciaPercorridaMetros,
            velocidadeMediaKmH: sessao.velocidadeMediaKmH,
            velocidadeMaximaKmH: sessao.velocidadeMaximaKmH,
            batimentosMedios: sessao.batimentosMedios,
            batimentosMaximos: sessao.batimentosMaximos,
            numeroSprints: sessao.numeroSprints,
            observacoes: sessao.observacoes
          });
        },
        error: (error) => {
          console.error('Erro ao carregar sessão:', error);
          alert('Erro ao carregar dados da sessão');
          this.router.navigate(['/sessoes']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.sessaoForm.valid) {
      const formData = this.sessaoForm.value;
      const jogadorSelecionado = this.jogadores.find(j => j.id == formData.jogadorId);
      
      if (!jogadorSelecionado) {
        alert('Jogador não encontrado');
        return;
      }

      const sessaoData: SessaoPerformance = {
        jogador: jogadorSelecionado,
        tipoSessao: formData.tipoSessao,
        data: formData.data,
        duracaoMinutos: formData.duracaoMinutos,
        distanciaPercorridaMetros: formData.distanciaPercorridaMetros,
        velocidadeMediaKmH: formData.velocidadeMediaKmH,
        velocidadeMaximaKmH: formData.velocidadeMaximaKmH,
        batimentosMedios: formData.batimentosMedios,
        batimentosMaximos: formData.batimentosMaximos,
        numeroSprints: formData.numeroSprints,
        observacoes: formData.observacoes
      };

      if (this.isEditMode && this.sessaoId) {
        this.sessaoService.updateSessao(this.sessaoId, sessaoData).subscribe({
          next: () => {
            alert('Sessão atualizada com sucesso!');
            this.router.navigate(['/sessoes']);
          },
          error: (error) => {
            console.error('Erro ao atualizar sessão:', error);
            alert('Erro ao atualizar sessão');
          }
        });
      } else {
        this.sessaoService.createSessao(sessaoData).subscribe({
          next: () => {
            alert('Sessão criada com sucesso!');
            this.router.navigate(['/sessoes']);
          },
          error: (error) => {
            console.error('Erro ao criar sessão:', error);
            alert('Erro ao criar sessão');
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.sessaoForm.controls).forEach(key => {
      const control = this.sessaoForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.sessaoForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.sessaoForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} é obrigatório`;
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
      if (field.errors['max']) return `Valor máximo: ${field.errors['max'].max}`;
    }
    return '';
  }

  cancelar(): void {
    this.router.navigate(['/sessoes']);
  }
}