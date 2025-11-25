package com.futebol.performance.service;

import com.futebol.performance.model.Jogador;
import com.futebol.performance.repository.JogadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class JogadorService {
    
    @Autowired
    private JogadorRepository jogadorRepository;
    
    public List<Jogador> findAll() {
        return jogadorRepository.findAll();
    }
    
    public Optional<Jogador> findById(Long id) {
        return jogadorRepository.findById(id);
    }
    
    public Jogador save(Jogador jogador) {
        return jogadorRepository.save(jogador);
    }
    
    public void deleteById(Long id) {
        jogadorRepository.deleteById(id);
    }
    
    public List<Jogador> findByNome(String nome) {
        return jogadorRepository.findByNomeContainingIgnoreCase(nome);
    }
    
    public List<Jogador> findByPosicao(String posicao) {
        return jogadorRepository.findByPosicao(posicao);
    }
    
    public List<Jogador> findAllWithSessoes() {
        return jogadorRepository.findAllWithSessoes();
    }
    
    public List<Jogador> findByNomeAndPosicao(String nome, String posicao) {
        return jogadorRepository.findByNomeContainingIgnoreCaseAndPosicao(nome, posicao);
    }
}