package com.dinofestas.api.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.dinofestas.api.model.Categoria;
import com.dinofestas.api.repository.CategoriaRepository;

@Service
public class CategoriaService {
  
    private final CategoriaRepository categoriaRepository;

    public CategoriaService(CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public List<Categoria> listarTodos(String query) {
        return categoriaRepository.findAll();
    }

    public Optional<Categoria> buscarPorId(Long id) {
        return categoriaRepository.findById(id);
    }

    public Categoria salvar(Categoria categoria) {
        return categoriaRepository.save(categoria);
    }

    public void excluir(Long id) {
        categoriaRepository.deleteById(id);
    }

    public Categoria atualizar(Long id, Categoria categoriaAtualizado) {
        return categoriaRepository.findById(id)
                .map(categoria -> {
                    categoria.setNome(categoriaAtualizado.getNome());
                    categoria.setQuantidade(categoriaAtualizado.getQuantidade());
                    return categoriaRepository.save(categoria);
                }).orElseThrow(() -> new RuntimeException("Categoria não encontrado"));
    }
}
