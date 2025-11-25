package com.futebol.performance.dto;

import java.time.LocalDateTime;

public class SessaoPerformanceDTO {
    private Long id;
    private JogadorDTO jogador;
    private String tipoSessao;
    private LocalDateTime data;
    private Integer duracaoMinutos;
    private Double distanciaPercorridaMetros;
    private Double velocidadeMediaKmH;
    private Double velocidadeMaximaKmH;
    private Integer batimentosMedios;
    private Integer batimentosMaximos;
    private Integer numeroSprints;
    private String observacoes;
    private Double distanciaPorMinuto;
    private Double cargaTrabalho;
    private Double sprintsPorMinuto;
    private String intensidade;

    public SessaoPerformanceDTO() {}

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public JogadorDTO getJogador() { return jogador; }
    public void setJogador(JogadorDTO jogador) { this.jogador = jogador; }

    public String getTipoSessao() { return tipoSessao; }
    public void setTipoSessao(String tipoSessao) { this.tipoSessao = tipoSessao; }

    public LocalDateTime getData() { return data; }
    public void setData(LocalDateTime data) { this.data = data; }

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

    public Double getDistanciaPorMinuto() { return distanciaPorMinuto; }
    public void setDistanciaPorMinuto(Double distanciaPorMinuto) { this.distanciaPorMinuto = distanciaPorMinuto; }

    public Double getCargaTrabalho() { return cargaTrabalho; }
    public void setCargaTrabalho(Double cargaTrabalho) { this.cargaTrabalho = cargaTrabalho; }

    public Double getSprintsPorMinuto() { return sprintsPorMinuto; }
    public void setSprintsPorMinuto(Double sprintsPorMinuto) { this.sprintsPorMinuto = sprintsPorMinuto; }

    public String getIntensidade() { return intensidade; }
    public void setIntensidade(String intensidade) { this.intensidade = intensidade; }
}