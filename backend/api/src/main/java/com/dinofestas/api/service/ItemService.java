package com.dinofestas.api.service;

import com.dinofestas.api.model.Item;
import com.dinofestas.api.repository.ItemRepository;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

@Service
public class ItemService {

    private final S3Service s3Service;
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository, S3Service s3Service) {
        this.itemRepository = itemRepository;
        this.s3Service = s3Service;
    }

    public Page<Item> listarTodos(String query, Pageable pageable) {
        if (query != null && !query.trim().isEmpty()) {
            return itemRepository.findByNomeContainingIgnoreCase(query, pageable);
        }
        return itemRepository.findAll(pageable);
    }

    public Optional<Item> buscarPorId(Long id) {
        return itemRepository.findById(id);
    }

    public Item salvar(Item item) {
        return itemRepository.save(item);
    }

    public void excluir(Long id) {
        // Find the item by its ID
        Item item = itemRepository.findById(id).orElseThrow(() -> new RuntimeException("Item not found"));

        // Get the filename or key of the image to delete from S3
        String imageUrl = item.getImagens().get(0);
        String filename = imageUrl.replace("https://" + s3Service.getBucketName() + ".s3.amazonaws.com/", "");

        // Delete the image from S3
        s3Service.deleteFile(filename);

        // Then, delete the item from the database
        itemRepository.delete(item);
    }

    public Item atualizar(Long id, Item itemAtualizado) {
        return itemRepository.findById(id)
                .map(item -> {
                    item.setNome(itemAtualizado.getNome());
                    item.setValor(itemAtualizado.getValor());
                    item.setImagens(itemAtualizado.getImagens());
                    item.setCategoria(itemAtualizado.getCategoria());
                    item.setCodigo(itemAtualizado.getCodigo());
                    return itemRepository.save(item);
                }).orElseThrow(() -> new RuntimeException("Item não encontrado"));
    }
}
