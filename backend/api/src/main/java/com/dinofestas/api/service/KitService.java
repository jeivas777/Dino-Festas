package com.dinofestas.api.service;

import com.dinofestas.api.model.Kit;
import com.dinofestas.api.repository.KitRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class KitService {

    private final KitRepository kitRepository;

    public KitService(KitRepository kitRepository) {
        this.kitRepository = kitRepository;
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
        kitRepository.deleteById(id);
    }

    public Kit atualizar(Long id, Kit kitAtualizado) {
        System.out.println("ID do kit " + id);
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

