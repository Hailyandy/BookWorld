package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.chien.bookWorld.jwt.JwtUtils;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.response.JwtResponse;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.UserRepository;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
class PdfControllerTests {

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
  public void testCreatePdf() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/pdf").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"idBook\": 20,\n"
                + "    \"urlPdf\": \"https://firebasestorage.googleapis.com/v0/b/ha-pj-a27a8.appspot.com/o/files%2F20020332_LeHuyHaiAnh_P2.pdf?alt=media&token=12ccdff8-ecb5-4ed7-ab59-b04726696c6f\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thêm pdf vào sách thành công!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testCreatePdfNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/pdf").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"idBook\": 100,\n"
                + "    \"urlPdf\": \"https://firebasestorage.googleapis.com/v0/b/ha-pj-a27a8.appspot.com/o/files%2F20020332_LeHuyHaiAnh_P2.pdf?alt=media&token=12ccdff8-ecb5-4ed7-ab59-b04726696c6f\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Không tìm thấy sách với id ", response.getMessage());
  }
}
