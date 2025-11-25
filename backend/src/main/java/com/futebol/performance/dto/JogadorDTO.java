package com.futebol.performance.dto;

import java.time.LocalDate;

public class JogadorDTO {
    private Long id;
    private String nome;
    private String apelido;
    private String posicao;
    private LocalDate dataNascimento;
    private Integer numeroCamisa;
    private String time;
    private Double peso;
    private Double altura;
    private Integer frequenciaCardiacaMaximaTeorica;

    public JogadorDTO() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getApelido() { return apelido; }
    public void setApelido(String apelido) { this.apelido = apelido; }

    public String getPosicao() { return posicao; }
    public void setPosicao(String posicao) { this.posicao = posicao; }

    public LocalDate getDataNascimento() { return dataNascimento; }
    public void setDataNascimento(LocalDate dataNascimento) { this.dataNascimento = dataNascimento; }

    public Integer getNumeroCamisa() { return numeroCamisa; }
    public void setNumeroCamisa(Integer numeroCamisa) { this.numeroCamisa = numeroCamisa; }

    public String getTime() { return time; }
    public void setTime(String time) { this.time = time; }

    public Double getPeso() { return peso; }
    public void setPeso(Double peso) { this.peso = peso; }

    public Double getAltura() { return altura; }
    public void setAltura(Double altura) { this.altura = altura; }

    public Integer getFrequenciaCardiacaMaximaTeorica() { return frequenciaCardiacaMaximaTeorica; }
    public void setFrequenciaCardiacaMaximaTeorica(Integer frequenciaCardiacaMaximaTeorica) { 
        this.frequenciaCardiacaMaximaTeorica = frequenciaCardiacaMaximaTeorica; 
    }
}