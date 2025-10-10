const express = require('express');
const router = express.Router();
const demonSlayerService = require('../services/apiService');

// Página principal
router.get("/", async (req, res) => {
    try {
        res.render("index");
    } catch (error) {
        res.status(500).send("Error al cargar la página principal");
    }
});

// Mostrar lista de personajes con paginación
router.get("/listaPersonajes", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const listaPersonajes = await demonSlayerService.getAllCharacters(limit, page);
        res.render("todos", {
            personaje: null,
            listaPersonajes,
            error: null,
            page,
            limit
        });
    } catch (error) {
        res.render("todos", {
            personaje: null,
            listaPersonajes: [],
            error: "Error al obtener los personajes",
            page: 1,
            limit: 5
        });
    }
});

// Buscar personaje por nombre
router.get("/personaje", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const nombre = req.query.nombre;
        const personajes = await demonSlayerService.getCharacterByName(nombre);
        const listaPersonajes = await demonSlayerService.getAllCharacters(limit, page);

        let personaje = personajes.find(p =>
            p.name.toLowerCase().includes(nombre.toLowerCase())
        );

        res.render("buscar", {
            listaPersonajes,
            personaje: personaje || null,
            error: personaje ? null : `No se encontró el personaje "${nombre}".`,
            page: 1,
            limit: 5
        });
    } catch (error) {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const listaPersonajes = await demonSlayerService.getAllCharacters(limit, page);
        res.render("buscar", {
            listaPersonajes,
            personaje: null,
            error: "Ocurrió un error al buscar el personaje.",
            page: 1,
            limit: 5
        });
    }
});

// Detalle por ID
router.get("/personaje/:id", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 5;
        const personaje = await demonSlayerService.getCharacterById(req.params.id);
        const listaPersonajes = await demonSlayerService.getAllCharacters(limit, page);

        res.render("index", {
            listaPersonajes,
            personaje,
            error: null,
            page: 1,
            limit: 5
        });
    } catch (error) {
        res.status(500).send("Error al obtener el detalle del personaje");
    }
});


//acerca de 
router.get("/about", async (req, res) => {
    try {
        res.render("about");
    }
    catch (error) {
        res.status(500).send("Error al cargar pagina");
    }
});
module.exports = router;
