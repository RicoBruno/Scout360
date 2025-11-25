package com.futebol.performance.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "sessao_performance")
public class SessaoPerformance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "jogador_id", nullable = false)
    @com.fasterxml.jackson.annotation.JsonIgnore
    private Jogador jogador;
    
    @Column(name = "tipo_sessao", nullable = false)
    private String tipoSessao; // TREINO ou JOGO
    
    @Column(name = "data_sessao", nullable = false)
    private LocalDateTime dataSessao;
    
    @Column(name = "duracao_minutos")
    private Integer duracaoMinutos;
    
    @Column(name = "distancia_percorrida_metros")
    private Double distanciaPercorridaMetros;
    
    @Column(name = "velocidade_media_kmh")
    private Double velocidadeMediaKmH;
    
    @Column(name = "velocidade_maxima_kmh")
    private Double velocidadeMaximaKmH;
    
    @Column(name = "batimentos_medios")
    private Integer batimentosMedios;
    
    @Column(name = "batimentos_maximos")
    private Integer batimentosMaximos;
    
    @Column(name = "numero_sprints")
    private Integer numeroSprints;
    
    private String observacoes;
    
    // Constructors
    public SessaoPerformance() {}
    
    public SessaoPerformance(Jogador jogador, String tipoSessao, LocalDateTime dataSessao) {
        this.jogador = jogador;
        this.tipoSessao = tipoSessao;
        this.dataSessao = dataSessao;
    }
    
    // Calculated methods
    public Double getDistanciaPorMinuto() {
        if (duracaoMinutos != null && duracaoMinutos > 0 && distanciaPercorridaMetros != null) {
            return distanciaPercorridaMetros / duracaoMinutos;
        }
        return 0.0;
    }
    
    public Double getCargaTrabalho() {
        if (duracaoMinutos != null && batimentosMedios != null) {
            return duracaoMinutos * batimentosMedios.doubleValue();
        }
        return 0.0;
    }
    
    public Double getSprintsPorMinuto() {
        if (duracaoMinutos != null && duracaoMinutos > 0 && numeroSprints != null) {
            return numeroSprints.doubleValue() / duracaoMinutos;
        }
        return 0.0;
    }
    
    public String getIntensidade() {
        Double carga = getCargaTrabalho();
        if (carga < 5000) return "Baixa";
        if (carga <= 10000) return "Média";
        return "Alta";
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public Jogador getJogador() { return jogador; }
    public void setJogador(Jogador jogador) { this.jogador = jogador; }
    
    public String getTipoSessao() { return tipoSessao; }
    public void setTipoSessao(String tipoSessao) { this.tipoSessao = tipoSessao; }
    
    public LocalDateTime getDataSessao() { return dataSessao; }
    public void setDataSessao(LocalDateTime dataSessao) { this.dataSessao = dataSessao; }
    
    public Integer getDuracaoMinutos() { return duracaoMinutos; }
    public void setDuracaoMinutos(Integer duracaoMinutos) { this.duracaoMinutos = duracaoMinutos; }
    
    public Double getDistanciaPercorridaMetros() { return distanciaPercorridaMetros; }
    public void setDistanciaPercorridaMetros(Double distanciaPercorridaMetros) { 
        this.distanciaPercorridaMetros = distanciaPercorridaMetros; 
    }
    
    public Double getVelocidadeMediaKmH() { return velocidadeMediaKmH; }
    public void setVelocidadeMediaKmH(Double velocidadeMediaKmH) { this.velocidadeMediaKmH = velocidadeMediaKmH; }
    
    public Double getVelocidadeMaximaKmH() { return velocidadeMaximaKmH; }
    public void setVelocidadeMaximaKmH(Double velocidadeMaximaKmH) { 
        this.velocidadeMaximaKmH = velocidadeMaximaKmH; 
    }
    
    public Integer getBatimentosMedios() { return batimentosMedios; }
    public void setBatimentosMedios(Integer batimentosMedios) { this.batimentosMedios = batimentosMedios; }
    
    public Integer getBatimentosMaximos() { return batimentosMaximos; }
    public void setBatimentosMaximos(Integer batimentosMaximos) { this.batimentosMaximos = batimentosMaximos; }
    
    public Integer getNumeroSprints() { return numeroSprints; }
    public void setNumeroSprints(Integer numeroSprints) { this.numeroSprints = numeroSprints; }
    
    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }
}