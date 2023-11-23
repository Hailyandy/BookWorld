package com.chien.bookWorld;

import org.junit.After;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.jdbc.Sql;

@SpringBootTest
class BookWorldApplicationTests {

	@Test
	void contextLoads() {
	}
	@AfterAll
	@Sql(scripts = "classpath:drop.sql")
	public void drop() {
	}

}
