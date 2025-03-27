package com.dinofestas.api.controller;

import com.dinofestas.api.model.Kit;
import com.dinofestas.api.service.KitService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kits")
public class KitController {

    private final KitService kitService;

    public KitController(KitService kitService) {
        this.kitService = kitService;
    }

    @GetMapping
    public List<Kit> listarTodos() {
        return kitService.listarTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Kit> buscarPorId(@PathVariable Long id) {
        Optional<Kit> kit = kitService.buscarPorId(id);
        return kit.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Kit> criar(@RequestBody Kit kit) {
        Kit novoKit = kitService.salvar(kit);
        return ResponseEntity.ok(novoKit);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Kit> atualizar(@PathVariable Long id, @RequestBody Kit kit) {
        try {
            Kit kitAtualizado = kitService.atualizar(id, kit);
            return ResponseEntity.ok(kitAtualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        kitService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
