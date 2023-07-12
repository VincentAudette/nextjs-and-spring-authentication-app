package webflix.webflix.Controllers;

import java.util.ArrayList;

import pojo.Film;
import pojo.Bandeannonce;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import dto.RechercheFilm;
import webflix.webflix.Repository.FilmRepository;

@RestController
public class FilmController {

    private static final String prefixMap = "/api/hibernate";

    @GetMapping(prefixMap + "/films")
    public ArrayList<Film> Films(@RequestParam(name="firstResult") int firstResult, @RequestParam(name="maxResult") int maxResult) {
        return FilmRepository.getFilms(firstResult, maxResult);
    }
    
    @GetMapping(prefixMap + "/films/{idFilm}")
    public Film Film(@PathVariable(name="idFilm") int idFilm) {
        return FilmRepository.getFilm(idFilm);
    }

    @GetMapping(prefixMap + "/films/recherche/nom") //  /recherche/nom?nom='titre du film'
    public ArrayList<Film> rechercheFilmName(@RequestParam(name="nom") String filmName) {
        return FilmRepository.getFilmsByTitre(filmName);
    }

    @GetMapping(prefixMap + "/films/recherche/realisateur") //  /recherche/genre?genre=genreDuFilm (+ first and max)
    public ArrayList<Film> rechercheFilmRealisateur(@RequestParam(name="realisateur") String realisateur, @RequestParam(name="firstResult") int firstResult, @RequestParam(name="maxResult") int maxResult) {
        return FilmRepository.getFilmsByRealisateur(realisateur, firstResult, maxResult);
    }
    
    @GetMapping(prefixMap + "/films/recherche/acteur") //  /recherche/genre?genre=genreDuFilm (+ first and max)
    public ArrayList<Film> rechercheFilmActeur(@RequestParam(name="acteur") String acteur, @RequestParam(name="firstResult") int firstResult, @RequestParam(name="maxResult") int maxResult) {
        return FilmRepository.getFilmsByActeur(acteur, firstResult, maxResult);
    }

    @GetMapping(prefixMap + "/films/recherche/langue") //  /recherche/genre?genre=genreDuFilm (+ first and max)
    public ArrayList<Film> rechercheFilmLangue(@RequestParam(name="langue") String langue, @RequestParam(name="firstResult") int firstResult, @RequestParam(name="maxResult") int maxResult) {
        return FilmRepository.getFilmsByLangue(langue, firstResult, maxResult);
    }

    @GetMapping(prefixMap + "/films/recherche/pays") //  /recherche/genre?genre=genreDuFilm (+ first and max)
    public ArrayList<Film> rechercheFilmPays(@RequestParam(name="pays") String pays, @RequestParam(name="firstResult") int firstResult, @RequestParam(name="maxResult") int maxResult) {
        return FilmRepository.getFilmsByPays(pays, firstResult, maxResult);
    }

    @GetMapping(prefixMap + "/films/recherche/annee") //  /recherche/genre?genre=genreDuFilm (+ first and max)
    public ArrayList<Film> rechercheFilmAnnee(@RequestParam(name="anneeBegin") int anneeBegin, @RequestParam(name="anneeEnd") int anneeEnd, @RequestParam(name="firstResult") int firstResult, @RequestParam(name="maxResult") int maxResult) {
        return FilmRepository.getFilmsByAnnee(anneeBegin, anneeEnd, firstResult, maxResult);
    }

    @PostMapping (prefixMap + "/films/recherche") //  /recherche/genre?genre=genreDuFilm (+ first and max)
    public ArrayList<Film> rechercheFilm(@RequestBody RechercheFilm rechercheFilm) {
        return FilmRepository.getFilmsRecherche(rechercheFilm);
    }

    @GetMapping(prefixMap + "/films/bandeannonce/{idFilm}")
    public Bandeannonce firstBandeAnnonceFilm(@PathVariable(name="idFilm") int idFilm) {
        return FilmRepository.getFirstBandeAnnonceFilm(idFilm);
    }
}