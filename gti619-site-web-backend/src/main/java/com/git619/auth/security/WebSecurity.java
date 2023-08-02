package com.git619.auth.security;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {

    /**
     * Variables de la Configuration de sécurité
     */
    private final UserDetailsService userDetailsService;
    private final PasswordEncoder passwordEncoder;

    /**
     * Constructeur avec détails utilisateur et encodeur de mdp
     * @param userDetailsService
     */
    public WebSecurity(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        this.userDetailsService = userDetailsService;
        this.passwordEncoder=passwordEncoder;
    }


    @Override
    @Bean
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }


    /**
     * Notre Provider qui s'occupe de créer un Dao (Data Access Object)
     * On attribut nos deux variables de la classe :  userDetailsService
     * et passwordEncodeur
     * @return le Provider d'authentification (DaoAuthenticationProvider)
     */
    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider() {
            @Override
            protected void additionalAuthenticationChecks(UserDetails userDetails,
                                                          UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
                String rawPassword = (String) authentication.getCredentials();

                if (!passwordEncoder.matches(rawPassword, userDetails.getPassword())) {
                    throw new BadCredentialsException("Bad credentials");
                }
            }
        };
        provider.setUserDetailsService(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }



    /**
     * Filtre de sécuritaire (Filtres Chainé)
     * @param http
     * @return
     * @throws Exception
     */
    @Override
    public void configure(HttpSecurity http) throws Exception{
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/api/user", "/api/login","/api/password-config", "/h2-console/**", "/favicon.ico", "/api/logout").permitAll()
                .anyRequest().authenticated()
                .and().headers().frameOptions().disable()
                .and()
                .addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }


    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter("Q823Le0Ig+boU6tqItopkNxSIznjp858kC/fLH/28fY=");
    }

    /**
     * Methode utilisé par Spring pour injecter AuthenticationManagerBuilder
     * @param auth
     * @param provider
     * @throws Exception
     */

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth,
                                DaoAuthenticationProvider provider) throws Exception {
        auth.authenticationProvider(provider);
    }
}
