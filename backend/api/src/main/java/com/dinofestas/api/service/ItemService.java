package com.dinofestas.api.service;

import com.dinofestas.api.model.Item;
import com.dinofestas.api.repository.ItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<Item> listarTodos() {
        return itemRepository.findAll();
    }

    public Optional<Item> buscarPorId(Long id) {
        return itemRepository.findById(id);
    }

    public Item salvar(Item item) {
        return itemRepository.save(item);
    }

    public void excluir(Long id) {
        itemRepository.deleteById(id);
    }

    public Item atualizar(Long id, Item itemAtualizado) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setNome(itemAtualizado.getNome());
                    item.setDescricao(itemAtualizado.getDescricao());
                    item.setPreco(itemAtualizado.getPreco());
                    item.setImagens(itemAtualizado.getImagens());
                    item.setKitId(itemAtualizado.getKitId());
                    return itemRepository.save(item);
                }).orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }
}
