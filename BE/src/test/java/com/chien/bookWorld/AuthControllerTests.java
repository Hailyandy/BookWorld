package com.chien.bookWorld;

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.SqlConfig.TransactionMode.ISOLATED;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.chien.bookWorld.controller.AuthController;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.response.AppExceptionBody;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.jdbc.SqlConfig;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

@RunWith(SpringRunner.class)
@SpringBootTest
//@WebMvcTest(AuthController.class)
//@WebAppConfiguration
@AutoConfigureMockMvc
class AuthControllerTests {

  @Autowired
  private MockMvc mvc;
//  private MockMvc mvc;
//  @Autowired
//  WebApplicationContext webApplicationContext;
//  @Before
//  public void setUp() {
//    mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
//  }

  protected String mapToJson(Object obj) throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.writeValueAsString(obj);
  }

  protected <T> T mapFromJson(String json, Class<T> clazz)
      throws JsonParseException, JsonMappingException, IOException {

    ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.readValue(json, clazz);
  }
//1
  @Test
//  @Sql(scripts = "/schema.sql")
  public void testLoginSuccess() throws Exception {
    MvcResult mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("chien9pm@gmail.com", "123456")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);
    Assert.assertEquals("Thành công!", response.getMessage());
  }
  //2
  @Test
  public void testLoginUsernameNotFound() throws Exception {
    MvcResult mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("chien5pm@gmail.com", "123456")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Lỗi: Không tồn tại! Không tìm thấy tài khoản có tên '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  public void testLoginNotEnabled() throws Exception {
    MvcResult mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("chien9pmt@gmail.com", "12345678")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Tài khoản của bạn chưa được quản trị viên phê duyệt, vui lòng đợi!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Sql(
      scripts = "/drop.sql",
      config = @SqlConfig(transactionMode = ISOLATED),
      executionPhase = AFTER_TEST_METHOD
  )
  public void testLoginIncorrectPassword() throws Exception {
    MvcResult mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("chien9pm@gmail.com", "123456789")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(401, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Sai mật khẩu!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @AfterAll
//  @Sql(scripts = "classpath:drop.sql")
  public static void drop() {
  }
}
