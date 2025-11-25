import { Jogador } from './jogador.model';

export interface SessaoPerformance {
  id?: number;
  jogador: Jogador;
  tipoSessao: string;
  data: string;
  duracaoMinutos?: number;
  distanciaPercorridaMetros?: number;
  velocidadeMediaKmH?: number;
  velocidadeMaximaKmH?: number;
  batimentosMedios?: number;
  batimentosMaximos?: number;
  numeroSprints?: number;
  observacoes?: string;
  
  // Campos calculados
  distanciaPorMinuto?: number;
  cargaTrabalho?: number;
  sprintsPorMinuto?: number;
  intensidade?: string;
}