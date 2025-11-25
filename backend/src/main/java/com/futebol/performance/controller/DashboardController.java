package com.futebol.performance.controller;

import com.futebol.performance.service.JogadorService;
import com.futebol.performance.model.Jogador;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.ArrayList;


@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:4200")
public class DashboardController {
    
    @Autowired
    private JogadorService jogadorService;
    
    @GetMapping("/stats")
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();
        
        try {
            stats.put("totalJogadores", jogadorService.findAll().size());
            stats.put("totalSessoes", 0);
        } catch (Exception e) {
            stats.put("totalJogadores", 0);
            stats.put("totalSessoes", 0);
        }
        
        return stats;
    }
    
    @GetMapping("/grafico-performance")
    public Map<String, Object> getGraficoPerformance() {
        Map<String, Object> grafico = new HashMap<>();
        
        try {
            int totalJogadores = jogadorService.findAll().size();
            String[] labels = {"Jan", "Fev", "Mar", "Abr", "Mai", "Jun"};
            Double[] performanceData = new Double[6];
            
            for (int i = 0; i < 6; i++) {
                performanceData[i] = totalJogadores > 0 ? 7000.0 + (totalJogadores * 200) + (i * 150) : 0.0;
            }
            
            grafico.put("labels", labels);
            grafico.put("performanceData", performanceData);
            grafico.put("totalJogadores", totalJogadores);
            
        } catch (Exception e) {
            String[] labels = {"Erro"};
            grafico.put("labels", labels);
            grafico.put("performanceData", new Double[]{0.0});
            grafico.put("totalJogadores", 0);
        }
        
        return grafico;
    }
    
    @GetMapping("/top-jogadores")
    public Map<String, Object> getTopJogadores() {
        Map<String, Object> ranking = new HashMap<>();
        
        try {
            List<Jogador> jogadores = jogadorService.findAll();
            List<Map<String, Object>> topJogadores = new ArrayList<>();
            
            for (int i = 0; i < Math.min(jogadores.size(), 5); i++) {
                Jogador jogador = jogadores.get(i);
                Map<String, Object> jogadorRank = new HashMap<>();
                
                double score = 7.0 + (Math.random() * 3);
                
                jogadorRank.put("nome", jogador.getNome());
                jogadorRank.put("posicao", jogador.getPosicao());
                jogadorRank.put("score", Math.round(score * 10.0) / 10.0);
                jogadorRank.put("posicaoRank", i + 1);
                
                topJogadores.add(jogadorRank);
            }
            
            ranking.put("topJogadores", topJogadores);
            
        } catch (Exception e) {
            ranking.put("topJogadores", new ArrayList<>());
        }
        
        return ranking;
    }
    
    @GetMapping("/distribuicao-posicoes")
    public Map<String, Object> getDistribuicaoPosicoes() {
        Map<String, Object> distribuicao = new HashMap<>();
        
        try {
            List<Jogador> jogadores = jogadorService.findAll();
            Map<String, Integer> contadorPosicoes = new HashMap<>();
            
            for (Jogador jogador : jogadores) {
                String posicao = jogador.getPosicao();
                contadorPosicoes.put(posicao, contadorPosicoes.getOrDefault(posicao, 0) + 1);
            }
            
            distribuicao.put("posicoes", contadorPosicoes);
            
        } catch (Exception e) {
            distribuicao.put("posicoes", new HashMap<>());
        }
        
        return distribuicao;
    }
    
    @GetMapping("/analise-fisica")
    public Map<String, Object> getAnaliseFisica() {
        Map<String, Object> analise = new HashMap<>();
        
        try {
            List<Jogador> jogadores = jogadorService.findAll();
            
            if (!jogadores.isEmpty()) {
                // Calcula médias de altura e peso
                double somaAltura = 0, somaPeso = 0;
                int countAltura = 0, countPeso = 0;
                
                for (Jogador jogador : jogadores) {
                    if (jogador.getAltura() != null) {
                        somaAltura += jogador.getAltura();
                        countAltura++;
                    }
                    if (jogador.getPeso() != null) {
                        somaPeso += jogador.getPeso();
                        countPeso++;
                    }
                }
                
                analise.put("alturaMedia", countAltura > 0 ? Math.round((somaAltura / countAltura) * 100.0) / 100.0 : 0);
                analise.put("pesoMedio", countPeso > 0 ? Math.round((somaPeso / countPeso) * 100.0) / 100.0 : 0);
                analise.put("totalJogadores", jogadores.size());
                
                // Distribuição por faixa etária
                Map<String, Integer> faixaEtaria = new HashMap<>();
                faixaEtaria.put("18-22", 0);
                faixaEtaria.put("23-27", 0);
                faixaEtaria.put("28-32", 0);
                faixaEtaria.put("33+", 0);
                
                for (Jogador jogador : jogadores) {
                    if (jogador.getDataNascimento() != null) {
                        java.time.LocalDate nascimento = jogador.getDataNascimento();
                        int idade = java.time.Period.between(nascimento, java.time.LocalDate.now()).getYears();
                        
                        if (idade >= 18 && idade <= 22) faixaEtaria.put("18-22", faixaEtaria.get("18-22") + 1);
                        else if (idade >= 23 && idade <= 27) faixaEtaria.put("23-27", faixaEtaria.get("23-27") + 1);
                        else if (idade >= 28 && idade <= 32) faixaEtaria.put("28-32", faixaEtaria.get("28-32") + 1);
                        else if (idade >= 33) faixaEtaria.put("33+", faixaEtaria.get("33+") + 1);
                    }
                }
                
                analise.put("faixaEtaria", faixaEtaria);
                
            } else {
                analise.put("alturaMedia", 0);
                analise.put("pesoMedio", 0);
                analise.put("totalJogadores", 0);
                analise.put("faixaEtaria", new HashMap<>());
            }
            
        } catch (Exception e) {
            analise.put("alturaMedia", 0);
            analise.put("pesoMedio", 0);
            analise.put("totalJogadores", 0);
            analise.put("faixaEtaria", new HashMap<>());
        }
        
        return analise;
    }
}