package com.futebol.performance.controller;

import com.futebol.performance.model.SessaoPerformance;
import com.futebol.performance.service.SessaoPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sessoes")
@CrossOrigin(origins = "http://localhost:4200")
public class SessaoPerformanceController {
    
    @Autowired
    private SessaoPerformanceService sessaoService;
    
    @GetMapping
    public List<SessaoPerformance> getAllSessoes() {
        return sessaoService.findAll();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<SessaoPerformance> getSessaoById(@PathVariable Long id) {
        Optional<SessaoPerformance> sessao = sessaoService.findById(id);
        return sessao.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/jogador/{jogadorId}")
    public List<SessaoPerformance> getSessoesByJogador(@PathVariable Long jogadorId) {
        return sessaoService.findByJogadorId(jogadorId);
    }
    
    @PostMapping
    public SessaoPerformance createSessao(@RequestBody SessaoPerformance sessao) {
        return sessaoService.save(sessao);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<SessaoPerformance> updateSessao(@PathVariable Long id, @RequestBody SessaoPerformance sessaoDetails) {
        Optional<SessaoPerformance> sessao = sessaoService.findById(id);
        
        if (sessao.isPresent()) {
            SessaoPerformance sessaoAtualizada = sessao.get();
            sessaoAtualizada.setTipoSessao(sessaoDetails.getTipoSessao());
            sessaoAtualizada.setDataSessao(sessaoDetails.getDataSessao());
            sessaoAtualizada.setDuracaoMinutos(sessaoDetails.getDuracaoMinutos());
            sessaoAtualizada.setDistanciaPercorridaMetros(sessaoDetails.getDistanciaPercorridaMetros());
            sessaoAtualizada.setNumeroSprints(sessaoDetails.getNumeroSprints());
            sessaoAtualizada.setBatimentosMedios(sessaoDetails.getBatimentosMedios());
            
            return ResponseEntity.ok(sessaoService.save(sessaoAtualizada));
        }
        
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteSessao(@PathVariable Long id) {
        sessaoService.deleteById(id);
        return ResponseEntity.ok().build();
    }
}