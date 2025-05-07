package com.dinofestas.api.repository;

import com.dinofestas.api.model.Item;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends JpaRepository<Item, Long> {
    Page<Item> findByNomeContainingIgnoreCaseOrTemaContainingIgnoreCase(String nome, String tema, Pageable pageable);

}