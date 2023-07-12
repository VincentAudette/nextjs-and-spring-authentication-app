package webflix.webflix.Controllers;

import java.util.ArrayList;

import pojo.CorrelationFilm;
import pojo.OlapLocation;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import dto.AnalyticsDTO;
import webflix.webflix.Repository.AnalyticsRepository;

@RestController
public class Analytics {

    private static final String prefixMap = "/api/hibernate/analytics";

    @PostMapping(prefixMap + "/stats")
    public ArrayList<OlapLocation> getAnalytics(@RequestBody AnalyticsDTO analyticsDTO) {
        return AnalyticsRepository.getAnalytics(analyticsDTO);
    }

    @PostMapping(prefixMap + "/statsV2")
    public long getAnalyticsV2(@RequestBody AnalyticsDTO analyticsDTO) {
        return AnalyticsRepository.getAnalyticsV2(analyticsDTO);
    }

    @GetMapping(prefixMap + "/film/cote-moyenne/{idFilm}") 
    public double getMoyenneCoteFilm(@PathVariable(name="idFilm") int idFilm) {
        return AnalyticsRepository.getMoyenneCoteFilm(idFilm);
    }

    @GetMapping(prefixMap + "/film/correlation/{idFilm}") 
    public ArrayList<CorrelationFilm> getCorrelationFilm(@PathVariable(name="idFilm") int idFilm) {
        return AnalyticsRepository.getCorrelationFilm(idFilm,0,3);
    }
}