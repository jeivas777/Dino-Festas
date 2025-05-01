package com.dinofestas.api.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dinofestas.api.model.CategoriasDisponiveis;
import com.dinofestas.api.service.CategoriasDisponiveisService;

@RestController
@RequestMapping("/api/categoriasDisponiveis")
public class CategoriasDisponiveisController {
    private final CategoriasDisponiveisService categoriasDisponiveisService;

    public CategoriasDisponiveisController(CategoriasDisponiveisService categoriasDisponiveisService) {
        this.categoriasDisponiveisService = categoriasDisponiveisService;
    }

    @GetMapping
    public List<CategoriasDisponiveis> listarTodos(@RequestParam(required = false) String query) {
        return categoriasDisponiveisService.listarTodos(query);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriasDisponiveis> buscarPorId(@PathVariable Long id) {
        Optional<CategoriasDisponiveis> categoria = categoriasDisponiveisService.buscarPorId(id);
        return categoria.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<CategoriasDisponiveis> criar(@RequestBody CategoriasDisponiveis categoria) {
        CategoriasDisponiveis novoCategoriasDisponiveis = categoriasDisponiveisService.salvar(categoria);
        return ResponseEntity.ok(novoCategoriasDisponiveis);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CategoriasDisponiveis> atualizar(@PathVariable Long id, @RequestBody CategoriasDisponiveis categoria) {
        try {
            CategoriasDisponiveis categoriaAtualizado = categoriasDisponiveisService.atualizar(id, categoria);
            return ResponseEntity.ok(categoriaAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        categoriasDisponiveisService.excluir(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/atualizar-todas")
    public ResponseEntity<Void> atualizarTodas(@RequestBody List<CategoriasDisponiveis> categorias) {
        categoriasDisponiveisService.atualizarTodas(categorias);
        return ResponseEntity.ok().build();
    }
}
