package com.futebol.performance.repository;

import com.futebol.performance.model.SessaoPerformance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface SessaoPerformanceRepository extends JpaRepository<SessaoPerformance, Long> {
    List<SessaoPerformance> findByJogadorId(Long jogadorId);
    List<SessaoPerformance> findByTipoSessao(String tipoSessao);
    List<SessaoPerformance> findByDataSessaoBetween(LocalDateTime inicio, LocalDateTime fim);
    
    @Query("SELECT s FROM SessaoPerformance s WHERE s.jogador.id = :jogadorId ORDER BY s.dataSessao DESC")
    List<SessaoPerformance> findByJogadorIdOrderByDataDesc(@Param("jogadorId") Long jogadorId);
    
    @Query("SELECT s FROM SessaoPerformance s WHERE s.dataSessao >= :dataInicio ORDER BY s.dataSessao DESC")
    List<SessaoPerformance> findRecentSessoes(@Param("dataInicio") LocalDateTime dataInicio);
}