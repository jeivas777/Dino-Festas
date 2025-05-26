package com.dinofestas.api.repository;

import com.dinofestas.api.model.Item;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByNomeContainingIgnoreCaseOrTemaContainingIgnoreCaseOrCategoriaContainingIgnoreCaseOrCodigo(
        String nome, String tema, String categoria, Long codigo, Pageable pageable);
}