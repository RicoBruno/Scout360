package com.futebol.performance.service;

import com.futebol.performance.model.Jogador;
import com.futebol.performance.repository.JogadorRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class JogadorServiceTest {
    
    @Mock
    private JogadorRepository jogadorRepository;
    
    @InjectMocks
    private JogadorService jogadorService;
    
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }
    
    @Test
    void testFindAll() {
        // Arrange
        Jogador jogador1 = new Jogador("João", "Atacante");
        Jogador jogador2 = new Jogador("Pedro", "Meio-campo");
        List<Jogador> jogadores = Arrays.asList(jogador1, jogador2);
        
        when(jogadorRepository.findAll()).thenReturn(jogadores);
        
        // Act
        List<Jogador> result = jogadorService.findAll();
        
        // Assert
        assertEquals(2, result.size());
        assertEquals("João", result.get(0).getNome());
        assertEquals("Pedro", result.get(1).getNome());
        verify(jogadorRepository, times(1)).findAll();
    }
    
    @Test
    void testFindById() {
        // Arrange
        Jogador jogador = new Jogador("João", "Atacante");
        jogador.setId(1L);
        
        when(jogadorRepository.findById(1L)).thenReturn(Optional.of(jogador));
        
        // Act
        Optional<Jogador> result = jogadorService.findById(1L);
        
        // Assert
        assertTrue(result.isPresent());
        assertEquals("João", result.get().getNome());
        verify(jogadorRepository, times(1)).findById(1L);
    }
    
    @Test
    void testSave() {
        // Arrange
        Jogador jogador = new Jogador("João", "Atacante");
        
        when(jogadorRepository.save(jogador)).thenReturn(jogador);
        
        // Act
        Jogador result = jogadorService.save(jogador);
        
        // Assert
        assertEquals("João", result.getNome());
        assertEquals("Atacante", result.getPosicao());
        verify(jogadorRepository, times(1)).save(jogador);
    }
}