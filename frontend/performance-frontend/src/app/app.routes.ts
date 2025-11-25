import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JogadoresListaComponent } from './components/jogadores/jogadores-lista.component';
import { JogadorFormComponent } from './components/jogadores/jogador-form.component';
import { SessaoFormComponent } from './components/sessoes/sessao-form.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'jogadores', component: JogadoresListaComponent },
  { path: 'jogadores/novo', component: JogadorFormComponent },
  { path: 'jogadores/:id/editar', component: JogadorFormComponent },
  { path: 'sessoes/nova', component: SessaoFormComponent },
  { path: 'sessoes/:id/editar', component: SessaoFormComponent },
  { path: '**', redirectTo: '/dashboard' }
];