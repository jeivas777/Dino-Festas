package com.dinofestas.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dinofestas.api.model.CategoriasDisponiveis;
import com.dinofestas.api.repository.CategoriasDisponiveisRepository;

@Service
public class CategoriasDisponiveisService {
  
    private final CategoriasDisponiveisRepository categoriasDisponiveisRepository;

    public CategoriasDisponiveisService(CategoriasDisponiveisRepository categoriasDisponiveisRepository) {
        this.categoriasDisponiveisRepository = categoriasDisponiveisRepository;
    }

    public List<CategoriasDisponiveis> listarTodos(String query) {
        return categoriasDisponiveisRepository.findAll();
    }

    public Optional<CategoriasDisponiveis> buscarPorId(Long id) {
        return categoriasDisponiveisRepository.findById(id);
    }

    public CategoriasDisponiveis salvar(CategoriasDisponiveis categoria) {
        return categoriasDisponiveisRepository.save(categoria);
    }

    public void excluir(Long id) {
      categoriasDisponiveisRepository.deleteById(id);
    }

    public CategoriasDisponiveis atualizar(Long id, CategoriasDisponiveis categoriaAtualizado) {
        return categoriasDisponiveisRepository.findById(id)
                .map(categoria -> {
                    categoria.setNome(categoriaAtualizado.getNome());
                    return categoriasDisponiveisRepository.save(categoria);
                }).orElseThrow(() -> new RuntimeException("CategoriasDisponiveis não encontrado"));
    }
    
    public void atualizarTodas(List<CategoriasDisponiveis> novasCategorias) {
        categoriasDisponiveisRepository.deleteAll(); // Apaga todas
        categoriasDisponiveisRepository.saveAll(novasCategorias); // Salva as novas
    }
    
}
