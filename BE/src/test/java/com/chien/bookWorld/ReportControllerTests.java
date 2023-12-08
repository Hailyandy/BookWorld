package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.chien.bookWorld.jwt.JwtUtils;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.response.AppExceptionBody;
import com.chien.bookWorld.payload.response.JwtResponse;
import com.chien.bookWorld.payload.response.PageResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.UserRepository;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import org.junit.Assert;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
class ReportControllerTests {

  @Autowired
  private MockMvc mvc;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private JwtUtils jwtUtils;

  @Autowired
  private ModelMapper mapper;
  private static String chien9pmToken;
  private static String userToken;
  private static String adminToken;
  private static String authorToken;

  protected String mapToJson(Object obj) throws JsonProcessingException {
    ObjectMapper objectMapper = new ObjectMapper();
    return objectMapper.writeValueAsString(obj);
  }

  protected <T> T mapFromJson(String json, Class<T> clazz)
      throws JsonParseException, JsonMappingException, IOException {

    ObjectMapper objectMapper = new ObjectMapper();
    objectMapper.registerModule(new JavaTimeModule());
    return objectMapper.readValue(json, clazz);
  }

  @Test
  @Order(1)
  public void testSetUp() throws Exception {
    MvcResult mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("admin@gmail.com", "123456")))).andReturn();

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);
    JwtResponse jwtResponse = mapper.map(response.getData(), JwtResponse.class);
    adminToken = jwtResponse.getToken();
    Assert.assertNotNull(adminToken);

    mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("chien9pm@gmail.com", "123456")))).andReturn();

    content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    response = mapFromJson(content, SuccessResponse.class);
    jwtResponse = mapper.map(response.getData(), JwtResponse.class);
    chien9pmToken = jwtResponse.getToken();
    Assert.assertNotNull(chien9pmToken);

    mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("user1@gmail.com", "12345678")))).andReturn();

    content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    response = mapFromJson(content, SuccessResponse.class);
    jwtResponse = mapper.map(response.getData(), JwtResponse.class);
    userToken = jwtResponse.getToken();
    Assert.assertNotNull(userToken);

    mvcResult = mvc.perform(
        post("/api/auth/signin").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new LoginRequest("author@gmail.com", "123456")))).andReturn();

    content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    response = mapFromJson(content, SuccessResponse.class);
    jwtResponse = mapper.map(response.getData(), JwtResponse.class);
    authorToken = jwtResponse.getToken();
    Assert.assertNotNull(authorToken);
  }

  @Test
  @Order(2)
  public void testCreateReport() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/pdf/report").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"reason\": \"111aa\",\n"
                + "    \"description\": \"1112222\",\n"
                + "    \"pdf_id\": 1\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Tạo report thành công!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testCreateReportNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/pdf/report").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"reason\": \"111aa\",\n"
                + "    \"description\": \"1112222\",\n"
                + "    \"pdf_id\": 10\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Không tìm thấy tài khoản với id '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(4)
  public void testGetAllReport() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/pdf/report").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    PageResponse response = mapFromJson(content, PageResponse.class);

    String expectedMessage = "Thành công!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(5)
  public void testHandlerReport() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/pdf/report/handler").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"status\": 0,\n"
                + "    \"id\": 2\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Xử lý thành công!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(6)
  public void testHandlerReportNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/pdf/report/handler").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"status\": 0,\n"
                + "    \"id\": 10\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Error: Does not exist! No report has been created yet!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
}
