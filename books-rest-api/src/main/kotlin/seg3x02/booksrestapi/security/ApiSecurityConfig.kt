package seg3x02.booksrestapi.security

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.http.HttpMethod
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter
import org.springframework.security.config.http.SessionCreationPolicy
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.crypto.password.PasswordEncoder
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter
import seg3x02.booksrestapi.security.jwt.JwtUtils

@Configuration
@EnableWebSecurity
class ApiSecurityConfig(var userDetailsService: UserDetailsServiceImpl,
                        var unauthorizedHandler: AuthenticationEntry,
                        var jwtUtils: JwtUtils): WebSecurityConfigurerAdapter() {
    @Bean
    fun authenticationJwtTokenFilter(): AuthenticationFilter {
        return AuthenticationFilter(jwtUtils,userDetailsService)
    }

    @Throws(Exception::class)
    override fun configure(authenticationManagerBuilder: AuthenticationManagerBuilder) {
        authenticationManagerBuilder.userDetailsService(userDetailsService)
            .passwordEncoder(passwordEncoder())
    }

    @Bean
    @Throws(Exception::class)
    override fun authenticationManagerBean(): AuthenticationManager {
        return super.authenticationManagerBean()
    }

    @Bean
    fun passwordEncoder(): PasswordEncoder {
        return BCryptPasswordEncoder()
    }

    @Throws(Exception::class)
    override fun configure(http: HttpSecurity) {
         http.cors().and().csrf().disable()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and()
            .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
            .authorizeRequests().antMatchers("/auth/**").permitAll()
            .antMatchers(HttpMethod.GET,"/books-api/**").hasAnyRole("USER", "ADMIN")
            .antMatchers(HttpMethod.POST, "/books-api/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.DELETE, "/books-api/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.PUT, "/books-api/**").hasRole("ADMIN")
            .antMatchers(HttpMethod.PATCH, "/books-api/**").hasRole("ADMIN")
            .anyRequest().authenticated()
        http.addFilterBefore(authenticationJwtTokenFilter(),
            UsernamePasswordAuthenticationFilter::class.java)
    }
}
