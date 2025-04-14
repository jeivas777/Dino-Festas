package com.dinofestas.api.controller;

import com.dinofestas.api.model.Kit;
import com.dinofestas.api.service.KitService;
import com.dinofestas.api.service.S3Service;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/kits")
public class KitController {

    private final KitService kitService;
    private final S3Service s3Service;

    public KitController(KitService kitService, S3Service s3Service) {
        this.kitService = kitService;
        this.s3Service = s3Service;
    }

    @GetMapping
    public List<Kit> listarTodos(@RequestParam(required = false) String query) {
        System.out.println("Query recebida: " + query);

        return kitService.listarTodos(query);
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

    // 🔽 Upload de imagens
    @PostMapping("/upload-imagens")
    public ResponseEntity<List<String>> uploadImagens(@RequestParam("files") List<MultipartFile> files) {
        List<String> urls = new ArrayList<>();
        try {
            for (MultipartFile file : files) {
                String url = s3Service.uploadFile(file);
                urls.add(url);
            }
            return ResponseEntity.ok(urls);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }
}
