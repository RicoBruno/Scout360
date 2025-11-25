package com.futebol.performance.repository;

import com.futebol.performance.model.Jogador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface JogadorRepository extends JpaRepository<Jogador, Long> {
    List<Jogador> findByNomeContainingIgnoreCase(String nome);
    List<Jogador> findByPosicao(String posicao);
    List<Jogador> findByNomeContainingIgnoreCaseAndPosicao(String nome, String posicao);
    
    @Query("SELECT j FROM Jogador j LEFT JOIN FETCH j.sessoes")
    List<Jogador> findAllWithSessoes();
}