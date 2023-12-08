package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
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
class UserControllerTests {

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
  public void testSearchUserByName() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/users/search?name=a").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testUpdateUser() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/users/update/2").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"id\": 2,\n"
                + "    \"phone\": \"0378505701\",\n"
                + "    \"name\": \"xuanbach\",\n"
                + "    \"birthDate\": \"02/12/2002\",\n"
                + "    \"urlAvatar\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkW9hB_sY38Mi2LLqaWJX2rfvHRQj6rd9Q7Q&usqp=CAU\",\n"
                + "    \"nativePlace\": \"Phú Thọ\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(4)
  public void testUpdateUserNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/users/update/2").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"id\": 30,\n"
                + "    \"phone\": \"0378505701\",\n"
                + "    \"name\": \"xuanbach\",\n"
                + "    \"birthDate\": \"02/12/2002\",\n"
                + "    \"urlAvatar\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkW9hB_sY38Mi2LLqaWJX2rfvHRQj6rd9Q7Q&usqp=CAU\",\n"
                + "    \"nativePlace\": \"Phú Thọ\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Error: Does not exist! User not found!", response.getMessage());
  }

  @Test
  @Order(5)
  public void testUpdateUserIncorrect() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/users/update/2").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"id\": 3,\n"
                + "    \"phone\": \"0378505701\",\n"
                + "    \"name\": \"xuanbach\",\n"
                + "    \"birthDate\": \"02/12/2002\",\n"
                + "    \"urlAvatar\": \"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkW9hB_sY38Mi2LLqaWJX2rfvHRQj6rd9Q7Q&usqp=CAU\",\n"
                + "    \"nativePlace\": \"Phú Thọ\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("id user sai!", response.getMessage());
  }

  @Test
  @Order(6)
  public void testGetInfoUser() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/users/2").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(7)
  public void testGetInfoUserNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/users/30").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Error: Does not exist! User not found!", response.getMessage());
  }
}
