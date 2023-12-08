package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

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
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

@RunWith(SpringRunner.class)
@SpringBootTest
@AutoConfigureMockMvc
@TestMethodOrder(OrderAnnotation.class)
class CommentControllerTests {

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
  @Sql(scripts = "/schema.sql")
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
  }

  @Test
  @Order(2)
  public void testCreateComment() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/comment").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n"
                + "    \"content\": \"bai post hay\",\n"
                + "    \"postId\": 1,\n"
                + "    \"parentId\": null\n"
                + "}")).andReturn();
//    mapToJson(
//        new BookCreationDto("2 月刊少女野崎くん 15 [Gekkan Shoujo Nozaki-kun 15]", 3L,
//            "スクウェア・エニックス", LocalDateTime.parse("2023-09-12 15:40:02", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
//            "She is a Japanese manga artist known for creating The Magic Touch and Oresama Teacher which have both been serialized on the Hana to Yume magazine./nTsubaki began drawing manga in her first year of high school. She was soon selected to be in the top 10 of Hana to Yume Mangaka Course, and subsequently won the Big Challenge contest.",
//            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691733246i/61997573.jpg",
//            3L, List.of(1L)))
    int status = mvcResult.getResponse().getStatus();
//    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

//    Assert.assertEquals(44, response.getMessage());
    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testCreateCommentPostNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/comment").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n"
                + "    \"content\": \"bai post hay\",\n"
                + "    \"postId\": 10,\n"
                + "    \"parentId\": null\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Post not found!", response.getMessage());
  }

  @Test
  @Order(4)
  public void testGetCommentByPost() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/comment?postId=1")
            .header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    PageResponse response = mapFromJson(content, PageResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(5)
  public void testUpdateComment() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/comment?postId=1")
            .header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n"
                + "    \"id\": \"3834c1a6-62f3-4e9c-b042-d7a5314ae7fa\",\n"
                + "    \"content\": \"bbb\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(6)
  public void testUpdateCommentNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        patch("/api/comment?postId=1")
            .header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n"
                + "    \"id\": \"3834c1a6-62f3-4e9c-b042-d7a5314ae7fb\",\n"
                + "    \"content\": \"bbb\"\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("comment not found!", response.getMessage());
  }

  @Test
  @Order(7)
  public void testDeleteComment() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/comment/3834c1a6-62f3-4e9c-b042-d7a5314ae7fa?postId=1")
            .header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);

    Assert.assertEquals("Comment deleted successfully", content);
  }

  @Test
  @Order(8)
  public void testDeleteCommentNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/comment/3834c1a6-62f3-4e9c-b042-d7a5314ae7fb?postId=1")
            .header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("comment not found!", response.getMessage());
  }
}
