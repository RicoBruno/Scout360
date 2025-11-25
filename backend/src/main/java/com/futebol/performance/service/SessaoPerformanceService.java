package com.futebol.performance.service;

import com.futebol.performance.model.SessaoPerformance;
import com.futebol.performance.repository.SessaoPerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SessaoPerformanceService {
    
    @Autowired
    private SessaoPerformanceRepository sessaoRepository;
    
    public List<SessaoPerformance> findAll() {
        return sessaoRepository.findAll();
    }
    
    public Optional<SessaoPerformance> findById(Long id) {
        return sessaoRepository.findById(id);
    }
    
    public SessaoPerformance save(SessaoPerformance sessao) {
        return sessaoRepository.save(sessao);
    }
    
    public void deleteById(Long id) {
        sessaoRepository.deleteById(id);
    }
    
    public List<SessaoPerformance> findByJogadorId(Long jogadorId) {
        return sessaoRepository.findByJogadorId(jogadorId);
    }
}