package com.dinofestas.api.service;

import com.dinofestas.api.model.Kit;
import com.dinofestas.api.repository.KitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KitService {

    private final KitRepository kitRepository;
    private final S3Service s3Service;

    public KitService(KitRepository kitRepository, S3Service s3Service) {
        this.kitRepository = kitRepository;
        this.s3Service = s3Service;
    }

    public List<Kit> listarTodos(String query) {
        if(query != null && !query.trim().isEmpty()){
            return kitRepository.findByNomeContainingIgnoreCase(query);
        }
        return kitRepository.findAll();
    }

    public Optional<Kit> buscarPorId(Long id) {
        return kitRepository.findById(id);
    }

    public Kit salvar(Kit kit) {
        return kitRepository.save(kit);
    }

    public void excluir(Long id) {
        // Find the item by its ID
        Kit kit = kitRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));
        // Get the filename or key of the image to delete from S3
        String imageUrl = kit.getImagens().get(0);
        String filename = imageUrl.replace("https://" + s3Service.getBucketName() + ".s3.amazonaws.com/", "");

        // Delete the image from S3
        s3Service.deleteFile(filename);
        
        kitRepository.deleteById(id);
    }

    public Kit atualizar(Long id, Kit kitAtualizado) {
        return kitRepository.findById(id)
        .map(kit -> {
            kit.setNome(kitAtualizado.getNome());

            kit.setImagens(kitAtualizado.getImagens());

            kit.setValor(kitAtualizado.getValor());

            if (kitAtualizado.getCategorias() != null) {
                kit.getCategorias().clear(); // remove os antigos
                kitAtualizado.getCategorias().forEach(categoria -> {
                    kit.getCategorias().add(categoria); // adiciona à lista
                });
            }

            return kitRepository.save(kit);
        }).orElseThrow(() -> new RuntimeException("Kit não encontrado"));
    }
}

