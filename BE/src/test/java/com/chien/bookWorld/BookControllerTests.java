package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.chien.bookWorld.dto.BookBasketUpdateDto;
import com.chien.bookWorld.dto.BookCreationDto;
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
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
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
class BookControllerTests {

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
  public void testCreateBook() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/book").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n"
                + "    \"name\": \"2 月刊少女野崎くん 15 [Gekkan Shoujo Nozaki-kun 15]\",\n"
                + "    \"numberPages\": 3,\n"
                + "    \"publisher\": \"スクウェア・エニックス\",\n"
                + "    \"publishDate\": \"2023-09-12 15:40:02\",\n"
                + "    \"introducing\": \"She is a Japanese manga artist known for creating The Magic Touch and Oresama Teacher which have both been serialized on the Hana to Yume magazine./nTsubaki began drawing manga in her first year of high school. She was soon selected to be in the top 10 of Hana to Yume Mangaka Course, and subsequently won the Big Challenge contest.\",\n"
                + "    \"urlPoster\": \"https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691733246i/61997573.jpg\",\n"
                + "    \"authorId\": 3,\n"
                + "    \"genreIds\": [1]\n"
                + "}")).andReturn();
//    mapToJson(
//        new BookCreationDto("2 月刊少女野崎くん 15 [Gekkan Shoujo Nozaki-kun 15]", 3L,
//            "スクウェア・エニックス", LocalDateTime.parse("2023-09-12 15:40:02", DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")),
//            "She is a Japanese manga artist known for creating The Magic Touch and Oresama Teacher which have both been serialized on the Hana to Yume magazine./nTsubaki began drawing manga in her first year of high school. She was soon selected to be in the top 10 of Hana to Yume Mangaka Course, and subsequently won the Big Challenge contest.",
//            "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1691733246i/61997573.jpg",
//            3L, List.of(1L)))
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testFindByTitleOrAuthor() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/a").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    PageResponse response = mapFromJson(content, PageResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(4)
  public void testFindByTitleOrAuthorNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/aazz").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Không tìm thấy sách với tên sách hoặc tên tác giả chứa '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(5)
  public void testFindByTitleOrAuthorAndGenre() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/a/6").header("Authorization", "Bearer " + adminToken)
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
  @Order(6)
  public void testFindByTitleOrAuthorAndGenreNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/aazz/6").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    PageResponse response = mapFromJson(content, PageResponse.class);

    String expectedMessage = "Không tìm thấy sách với tên sách hoặc tên tác giả chứa '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(7)
  public void testBookRecommendations() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book").header("Authorization", "Bearer " + userToken)
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
  public void testBookRecommendationsNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    PageResponse response = mapFromJson(content, PageResponse.class);

    String expectedMessage = "Không có sách gợi ý phù hơp!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(9)
  public void testFindTopBook() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/top").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    String expectedMessage = "Thành công!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(10)
  public void testGetBookById() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/search/10").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    String expectedMessage = "Thành công!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(11)
  public void testGetBookByIdNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/search/100").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Error: Does not exist! Book not found!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(12)
  public void testGetAll() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/book/all").header("Authorization", "Bearer " + chien9pmToken)
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
  @Order(13)
  public void testUpdateBook() throws Exception {

    MvcResult mvcResult = mvc.perform(
            patch("/api/book/update/6").header("Authorization", "Bearer " + adminToken)
                .contentType(MediaType.APPLICATION_JSON).content(
                    "{\"id\":6,\"name\":\"new name\"}"))
        .andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    String expectedMessage = "Thành công!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(14)
  public void testUpdateBookUnauthorized() throws Exception {

    MvcResult mvcResult = mvc.perform(
            patch("/api/book/update/6").header("Authorization", "Bearer " + chien9pmToken)
                .contentType(MediaType.APPLICATION_JSON).content(
                    "{\"id\":6,\"name\":\"new name\"}"))
        .andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Không phải tác giả của cuốn sách hoặc bạn ko là admin!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @Test
  @Order(15)
  public void testUpdateBookNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
            patch("/api/book/update/100").header("Authorization", "Bearer " + chien9pmToken)
                .contentType(MediaType.APPLICATION_JSON).content(
                    "{\"id\":6,\"name\":\"new name\"}"))
        .andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    String expectedMessage = "Error: Does not exist! Book not found!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
}
