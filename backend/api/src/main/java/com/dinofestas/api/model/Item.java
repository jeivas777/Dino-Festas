package com.dinofestas.api.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "itens")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    private String descricao;

    @Column(nullable = false)
    private Double preco;

    // Armazenar apenas o ID do Kit
    @Column(name = "kit_id", nullable = false)
    private Long kitId; // Chave estrangeira

    private List<String> imagens;

    // Construtor padrão
    public Item() {}

    // Construtor com parâmetros
    public Item(String nome, String descricao, Double preco, Long kitId) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.kitId = kitId; // Apenas o ID do Kit
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

    public Long getKitId() {
        return kitId;
    }

    public void setKitId(Long kitId) {
        this.kitId = kitId;
    }

    public List<String> getImagens() {
        return imagens;
    }

    public void setImagens(List<String> imagens) {
        this.imagens = imagens;
    }
}
