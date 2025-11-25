package com.futebol.performance.controller;

import com.futebol.performance.model.Jogador;
import com.futebol.performance.dto.JogadorDTO;
import com.futebol.performance.service.JogadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/jogadores")
@CrossOrigin(origins = "http://localhost:4200")
public class JogadorController {
    
    @Autowired
    private JogadorService jogadorService;
    
    @GetMapping
    public ResponseEntity<List<JogadorDTO>> getAllJogadores(@RequestParam(required = false) String nome,
                                        @RequestParam(required = false) String posicao) {
        try {
            System.out.println("Buscando jogadores - Nome: '" + nome + "', Posição: '" + posicao + "'");
            
            List<Jogador> jogadores;
            
            if ((nome == null || nome.trim().isEmpty()) && (posicao == null || posicao.trim().isEmpty())) {
                jogadores = jogadorService.findAll();
            } else if (nome != null && !nome.trim().isEmpty() && (posicao == null || posicao.trim().isEmpty())) {
                jogadores = jogadorService.findByNome(nome);
            } else if ((nome == null || nome.trim().isEmpty()) && posicao != null && !posicao.trim().isEmpty()) {
                jogadores = jogadorService.findByPosicao(posicao);
            } else {
                jogadores = jogadorService.findByNomeAndPosicao(nome, posicao);
            }
            
            System.out.println("Encontrados " + jogadores.size() + " jogadores");
            List<JogadorDTO> jogadoresDTO = jogadores.stream().map(this::convertToDTO).collect(Collectors.toList());
            System.out.println("Convertidos para DTO: " + jogadoresDTO.size());
            return ResponseEntity.ok(jogadoresDTO);
        } catch (Exception e) {
            System.err.println("Erro ao buscar jogadores: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    private JogadorDTO convertToDTO(Jogador jogador) {
        JogadorDTO dto = new JogadorDTO();
        dto.setId(jogador.getId());
        dto.setNome(jogador.getNome());
        dto.setApelido(jogador.getApelido());
        dto.setPosicao(jogador.getPosicao());
        dto.setDataNascimento(jogador.getDataNascimento());
        dto.setNumeroCamisa(jogador.getNumeroCamisa());
        dto.setTime(jogador.getTime());
        dto.setPeso(jogador.getPeso());
        dto.setAltura(jogador.getAltura());
        dto.setFrequenciaCardiacaMaximaTeorica(jogador.getFrequenciaCardiacaMaximaTeorica());
        return dto;
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Jogador> getJogadorById(@PathVariable Long id) {
        Optional<Jogador> jogador = jogadorService.findById(id);
        return jogador.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<JogadorDTO> createJogador(@RequestBody Jogador jogador) {
        try {
            Jogador savedJogador = jogadorService.save(jogador);
            return ResponseEntity.ok(convertToDTO(savedJogador));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Jogador> updateJogador(@PathVariable Long id, @RequestBody Jogador jogadorDetails) {
        Optional<Jogador> jogador = jogadorService.findById(id);
        if (jogador.isPresent()) {
            Jogador existingJogador = jogador.get();
            existingJogador.setNome(jogadorDetails.getNome());
            existingJogador.setApelido(jogadorDetails.getApelido());
            existingJogador.setPosicao(jogadorDetails.getPosicao());
            existingJogador.setDataNascimento(jogadorDetails.getDataNascimento());
            existingJogador.setNumeroCamisa(jogadorDetails.getNumeroCamisa());
            existingJogador.setTime(jogadorDetails.getTime());
            existingJogador.setPeso(jogadorDetails.getPeso());
            existingJogador.setAltura(jogadorDetails.getAltura());
            existingJogador.setFrequenciaCardiacaMaximaTeorica(jogadorDetails.getFrequenciaCardiacaMaximaTeorica());
            return ResponseEntity.ok(jogadorService.save(existingJogador));
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteJogador(@PathVariable Long id) {
        if (jogadorService.findById(id).isPresent()) {
            jogadorService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}