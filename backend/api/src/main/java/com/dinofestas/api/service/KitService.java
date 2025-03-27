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

    public List<Kit> listarTodos() {
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
        return kitRepository.findById(id)
                .map(kit -> {
                    kit.setNome(kitAtualizado.getNome());
                    kit.setItens(kitAtualizado.getItens());
                    kit.setImagens(kitAtualizado.getImagens());
                    return kitRepository.save(kit);
                }).orElseThrow(() -> new RuntimeException("Kit não encontrado"));
    }
}
