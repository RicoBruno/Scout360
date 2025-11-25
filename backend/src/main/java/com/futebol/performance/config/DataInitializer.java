package com.futebol.performance.config;

import com.futebol.performance.model.Jogador;
import com.futebol.performance.model.SessaoPerformance;
import com.futebol.performance.repository.JogadorRepository;
import com.futebol.performance.repository.SessaoPerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private JogadorRepository jogadorRepository;

    @Autowired
    private SessaoPerformanceRepository sessaoRepository;

    @Override
    public void run(String... args) throws Exception {
        // Verifica se já existem dados
        if (jogadorRepository.count() == 0) {
            initializeData();
        }
    }

    private void initializeData() {
        // Criar jogadores
        Jogador joao = new Jogador("João Silva", "ATACANTE");
        joao.setApelido("João");
        joao.setDataNascimento(LocalDate.of(1995, 3, 15));
        joao.setNumeroCamisa(10);
        joao.setTime("Time A");
        joao.setPeso(75.5);
        joao.setAltura(1.80);
        joao.setFrequenciaCardiacaMaximaTeorica(195);
        joao = jogadorRepository.save(joao);

        Jogador pedro = new Jogador("Pedro Santos", "MEIO_CAMPO");
        pedro.setApelido("Pedrinho");
        pedro.setDataNascimento(LocalDate.of(1993, 7, 22));
        pedro.setNumeroCamisa(8);
        pedro.setTime("Time A");
        pedro.setPeso(72.0);
        pedro.setAltura(1.75);
        pedro.setFrequenciaCardiacaMaximaTeorica(197);
        pedro = jogadorRepository.save(pedro);

        Jogador carlos = new Jogador("Carlos Oliveira", "ZAGUEIRO");
        carlos.setApelido("Carlinhos");
        carlos.setDataNascimento(LocalDate.of(1990, 11, 8));
        carlos.setNumeroCamisa(4);
        carlos.setTime("Time A");
        carlos.setPeso(85.0);
        carlos.setAltura(1.88);
        carlos.setFrequenciaCardiacaMaximaTeorica(200);
        carlos = jogadorRepository.save(carlos);

        Jogador rafael = new Jogador("Rafael Costa", "GOLEIRO");
        rafael.setApelido("Rafa");
        rafael.setDataNascimento(LocalDate.of(1988, 1, 30));
        rafael.setNumeroCamisa(1);
        rafael.setTime("Time A");
        rafael.setPeso(82.0);
        rafael.setAltura(1.85);
        rafael.setFrequenciaCardiacaMaximaTeorica(202);
        rafael = jogadorRepository.save(rafael);

        Jogador lucas = new Jogador("Lucas Ferreira", "LATERAL");
        lucas.setApelido("Lukinha");
        lucas.setDataNascimento(LocalDate.of(1996, 9, 12));
        lucas.setNumeroCamisa(2);
        lucas.setTime("Time A");
        lucas.setPeso(70.0);
        lucas.setAltura(1.78);
        lucas.setFrequenciaCardiacaMaximaTeorica(194);
        lucas = jogadorRepository.save(lucas);

        // Criar sessões de performance
        SessaoPerformance sessao1 = new SessaoPerformance(joao, "TREINO", LocalDateTime.of(2024, 1, 15, 10, 0));
        sessao1.setDuracaoMinutos(90);
        sessao1.setDistanciaPercorridaMetros(8500.0);
        sessao1.setVelocidadeMediaKmH(12.5);
        sessao1.setVelocidadeMaximaKmH(28.0);
        sessao1.setBatimentosMedios(150);
        sessao1.setBatimentosMaximos(185);
        sessao1.setNumeroSprints(15);
        sessao1.setObservacoes("Treino técnico com foco em finalização");
        sessaoRepository.save(sessao1);

        SessaoPerformance sessao2 = new SessaoPerformance(joao, "JOGO", LocalDateTime.of(2024, 1, 18, 15, 30));
        sessao2.setDuracaoMinutos(85);
        sessao2.setDistanciaPercorridaMetros(9200.0);
        sessao2.setVelocidadeMediaKmH(13.2);
        sessao2.setVelocidadeMaximaKmH(32.5);
        sessao2.setBatimentosMedios(165);
        sessao2.setBatimentosMaximos(195);
        sessao2.setNumeroSprints(22);
        sessao2.setObservacoes("Partida contra Time B - Vitória 2x1");
        sessaoRepository.save(sessao2);

        SessaoPerformance sessao3 = new SessaoPerformance(pedro, "TREINO", LocalDateTime.of(2024, 1, 16, 9, 30));
        sessao3.setDuracaoMinutos(75);
        sessao3.setDistanciaPercorridaMetros(7800.0);
        sessao3.setVelocidadeMediaKmH(11.8);
        sessao3.setVelocidadeMaximaKmH(25.0);
        sessao3.setBatimentosMedios(145);
        sessao3.setBatimentosMaximos(180);
        sessao3.setNumeroSprints(12);
        sessao3.setObservacoes("Treino de resistência");
        sessaoRepository.save(sessao3);

        SessaoPerformance sessao4 = new SessaoPerformance(pedro, "JOGO", LocalDateTime.of(2024, 1, 18, 15, 30));
        sessao4.setDuracaoMinutos(90);
        sessao4.setDistanciaPercorridaMetros(10500.0);
        sessao4.setVelocidadeMediaKmH(14.0);
        sessao4.setVelocidadeMaximaKmH(30.0);
        sessao4.setBatimentosMedios(160);
        sessao4.setBatimentosMaximos(190);
        sessao4.setNumeroSprints(18);
        sessao4.setObservacoes("Partida contra Time B - Excelente performance");
        sessaoRepository.save(sessao4);

        SessaoPerformance sessao5 = new SessaoPerformance(carlos, "TREINO", LocalDateTime.of(2024, 1, 17, 8, 0));
        sessao5.setDuracaoMinutos(60);
        sessao5.setDistanciaPercorridaMetros(5200.0);
        sessao5.setVelocidadeMediaKmH(8.5);
        sessao5.setVelocidadeMaximaKmH(22.0);
        sessao5.setBatimentosMedios(135);
        sessao5.setBatimentosMaximos(170);
        sessao5.setNumeroSprints(8);
        sessao5.setObservacoes("Treino defensivo");
        sessaoRepository.save(sessao5);

        System.out.println("Dados iniciais carregados com sucesso!");
    }
}