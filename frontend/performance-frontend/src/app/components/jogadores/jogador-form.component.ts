import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { JogadorService } from '../../services/jogador.service';
import { Jogador } from '../../models/jogador.model';

@Component({
  selector: 'app-jogador-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './jogador-form.component.html',
  styleUrls: ['./jogador-form.component.scss']
})
export class JogadorFormComponent implements OnInit {
  jogadorForm: FormGroup;
  isEditMode = false;
  jogadorId: number | null = null;
  posicoes: string[] = ['Goleiro', 'Zagueiro', 'Lateral', 'Meio-campo', 'Atacante'];

  constructor(
    private fb: FormBuilder,
    private jogadorService: JogadorService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.jogadorForm = this.createForm();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id'] && params['id'] !== 'novo') {
        this.isEditMode = true;
        this.jogadorId = +params['id'];
        this.loadJogador();
      }
    });
  }

  createForm(): FormGroup {
    return this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(2)]],
      apelido: [''],
      posicao: ['', Validators.required],
      dataNascimento: [''],
      numeroCamisa: ['', [Validators.min(1), Validators.max(99)]],
      time: [''],
      peso: ['', [Validators.min(40), Validators.max(150)]],
      altura: ['', [Validators.min(1.5), Validators.max(2.2)]],
      frequenciaCardiacaMaximaTeorica: ['', [Validators.min(120), Validators.max(220)]]
    });
  }

  loadJogador(): void {
    if (this.jogadorId) {
      this.jogadorService.getJogadorById(this.jogadorId).subscribe({
        next: (jogador) => {
          this.jogadorForm.patchValue({
            nome: jogador.nome,
            apelido: jogador.apelido,
            posicao: jogador.posicao,
            dataNascimento: jogador.dataNascimento,
            numeroCamisa: jogador.numeroCamisa,
            time: jogador.time,
            peso: jogador.peso,
            altura: jogador.altura,
            frequenciaCardiacaMaximaTeorica: jogador.frequenciaCardiacaMaximaTeorica
          });
        },
        error: (error) => {
          console.error('Erro ao carregar jogador:', error);
          alert('Erro ao carregar dados do jogador');
          this.router.navigate(['/jogadores']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.jogadorForm.valid) {
      const jogadorData: Jogador = this.jogadorForm.value;

      if (this.isEditMode && this.jogadorId) {
        this.jogadorService.updateJogador(this.jogadorId, jogadorData).subscribe({
          next: () => {
            alert('Jogador atualizado com sucesso!');
            this.router.navigate(['/jogadores']);
          },
          error: (error) => {
            console.error('Erro ao atualizar jogador:', error);
            alert('Erro ao atualizar jogador');
          }
        });
      } else {
        this.jogadorService.createJogador(jogadorData).subscribe({
          next: () => {
            alert('Jogador criado com sucesso!');
            this.router.navigate(['/jogadores']);
          },
          error: (error) => {
            console.error('Erro ao criar jogador:', error);
            alert('Erro ao criar jogador');
          }
        });
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  markFormGroupTouched(): void {
    Object.keys(this.jogadorForm.controls).forEach(key => {
      const control = this.jogadorForm.get(key);
      control?.markAsTouched();
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.jogadorForm.get(fieldName);
    return !!(field && field.invalid && field.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.jogadorForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return `${fieldName} é obrigatório`;
      if (field.errors['minlength']) return `${fieldName} deve ter pelo menos ${field.errors['minlength'].requiredLength} caracteres`;
      if (field.errors['min']) return `Valor mínimo: ${field.errors['min'].min}`;
      if (field.errors['max']) return `Valor máximo: ${field.errors['max'].max}`;
    }
    return '';
  }

  cancelar(): void {
    this.router.navigate(['/jogadores']);
  }
}