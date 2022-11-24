package com.pratian.apiZullGateway;

import com.pratian.apiZullGateway.zuulFilter.ErrorFilter;
import com.pratian.apiZullGateway.zuulFilter.PostFilter;
import com.pratian.apiZullGateway.zuulFilter.PreFilter;
import com.pratian.apiZullGateway.zuulFilter.RouteFilter;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.cloud.netflix.zuul.EnableZuulProxy;
import org.springframework.context.annotation.Bean;
import org.springframework.http.codec.ServerCodecConfigurer;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@SpringBootApplication
@EnableEurekaClient
@EnableZuulProxy
public class ApiZullGatewayApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiZullGatewayApplication.class, args);
	}

	@Bean
	public ServerCodecConfigurer serverCodecConfigurer() {
		return ServerCodecConfigurer.create();
	}

	@Bean
	public CorsFilter corsFilter() {
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		final CorsConfiguration config = new CorsConfiguration();
		config.addAllowedOrigin("*");
		config.addAllowedHeader("*");
		config.addAllowedMethod("OPTIONS");
		config.addAllowedMethod("HEAD");
		config.addAllowedMethod("GET");
		config.addAllowedMethod("PUT");
		config.addAllowedMethod("POST");
		config.addAllowedMethod("DELETE");
		config.addAllowedMethod("PATCH");
		source.registerCorsConfiguration("/**", config);
		return new CorsFilter(source);
	}

	@Bean
	public ErrorFilter zuulErrorFilter()
	{
		return new ErrorFilter();
	}

	@Bean
	public PostFilter zuulPostFilter()
	{
		return new PostFilter();
	}

	@Bean
	public PreFilter zuulPreFilter()
	{
		return new PreFilter();
	}

	@Bean
	RouteFilter zuulRouteFilter()
	{
		return new RouteFilter();
	}

}
