package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.chien.bookWorld.dto.PostDto;
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
class PostControllerTests {

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
  public void testCreatePost() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/post").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"bookId\": 31,\n"
                + "    \"scoring\": 3,\n"
                + "    \"content\": \"Sách rất hay\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Tạo post thành công!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testCreatePostIdNull() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/post").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"scoring\": 3,\n"
                + "    \"content\": \"Sách rất hay\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(400, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Id sách và id pdf không được đồng thời null!", response.getMessage());
  }

  @Test
  @Order(4)
  public void testCreatePostBookNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/post").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"bookId\": 100,\n"
                + "    \"scoring\": 3,\n"
                + "    \"content\": \"Sách rất hay\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Không tìm thấy sách với id '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(5)
  public void testCreatePostPdfNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/post").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"pdfId\": 100,\n"
                + "    \"scoring\": 3,\n"
                + "    \"content\": \"Sách rất hay\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Không tìm thấy pdf với id '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(6)
  public void testGetPostByState() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/post?state=PUBLIC").header("Authorization", "Bearer " + chien9pmToken)
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
  @Order(7)
  public void testGetPostByStateFriend() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/post?state=FRIEND").header("Authorization", "Bearer " + chien9pmToken)
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
  @Order(8)
  public void testGetPostByUser() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/post/current").header("Authorization", "Bearer " + chien9pmToken)
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
  @Order(9)
  public void testGetPostByUserId() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/post/12").header("Authorization", "Bearer " + chien9pmToken)
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
  @Order(10)
  public void testUpdateContentPost() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/post/1").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"content\": \"hay oi la hay\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    PostDto response = mapFromJson(content, PostDto.class);

    String expectedMessage = "hay oi la hay";
    String actualMessage = response.getContent();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(11)
  public void testUpdateContentPostForbidden() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/post/2").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"content\": \"hay oi la hay\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(401, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Không có quyền chỉnh sủa post của người khác!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(12)
  public void testUpdateContentPostNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/post/10").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"content\": \"hay oi la hay\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Error: Does not exist! No book has been created yet!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(13)
  public void testDeletePost() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/post/1").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Successfully deleted!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(14)
  public void testDeletePostForbidden() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/post/2").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(401, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Không thể xóa post của người khác!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
}
