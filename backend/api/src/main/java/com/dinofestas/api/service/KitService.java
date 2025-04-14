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
        System.out.println(query);
        if(query != null && !query.trim().isEmpty()){
            return kitRepository.findByNomeContainingIgnoreCase(query);
        }
        return kitRepository.findAll();
    }

    public Optional<Kit> buscarPorId(Long id) {
        return kitRepository.findById(id);
    }

    public Kit salvar(Kit kit) {
        if (kit.getItens() != null) {
            kit.getItens().forEach(item -> item.setKit(kit));
        }
        return kitRepository.save(kit);
    }

    public void excluir(Long id) {
        kitRepository.deleteById(id);
    }

    public Kit atualizar(Long id, Kit kitAtualizado) {
        return kitRepository.findById(id)
        .map(kit -> {
            kit.setNome(kitAtualizado.getNome());
            kit.setImagens(kitAtualizado.getImagens());

            if (kitAtualizado.getItens() != null) {
                kitAtualizado.getItens().forEach(item -> item.setKit(kit));
            }

            kit.setItens(kitAtualizado.getItens());

            return kitRepository.save(kit);
        }).orElseThrow(() -> new RuntimeException("Kit não encontrado"));
    }
}
