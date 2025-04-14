package com.dinofestas.api.model;

import jakarta.persistence.*;
import java.util.List;

import com.dinofestas.api.converter.JsonStringListConverter;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "itens")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    private Double preco;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "kit_id", nullable = false)
    @JsonBackReference
    private Kit kit; // Relacionamento com Kit

    @Column(columnDefinition = "TEXT")
    @Convert(converter = JsonStringListConverter.class)
    private List<String> imagens;

    // Construtor padrão
    public Item() {}

    // Construtor com parâmetros
    public Item(String nome, String descricao, Double preco, Kit kit) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.kit = kit;
    }

    // Getters e Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Kit getKit() {
        return kit;
    }

    public void setKit(Kit kit) {
        this.kit = kit;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
}
