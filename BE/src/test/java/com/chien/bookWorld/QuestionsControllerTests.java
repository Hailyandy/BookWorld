package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

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
class QuestionsControllerTests {

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
  public void testCreateQuestions() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/questions").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"idBook\": 1,\n"
                + "    \"questionDtos\": [\n"
                + "        {\n"
                + "            \"questionsText\": \"Đây là câu hỏi?\",\n"
                + "            \"optionText\": {\n"
                + "                \"Lựa chọn A\": 1,\n"
                + "                \"Lựa chọn B\": 0,\n"
                + "                \"Lựa chọn C\": 0,\n"
                + "                \"Lựa chọn D\": 0\n"
                + "            },\n"
                + "            \"scoring\": 5\n"
                + "        }\n"
                + "    ]\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Tạo câu hỏi thành công!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testCreateQuestionsUser() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/questions").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"idBook\": 1,\n"
                + "    \"questionDtos\": [\n"
                + "        {\n"
                + "            \"questionsText\": \"Đây là câu hỏi?\",\n"
                + "            \"optionText\": {\n"
                + "                \"Lựa chọn A\": 1,\n"
                + "                \"Lựa chọn B\": 0,\n"
                + "                \"Lựa chọn C\": 0,\n"
                + "                \"Lựa chọn D\": 0\n"
                + "            },\n"
                + "            \"scoring\": 5\n"
                + "        }\n"
                + "    ]\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Tài khoản của bạn không có quyền sử dụng API này!", response.getMessage());
  }

  @Test
  @Order(4)
  public void testCreateQuestionsNotFound() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/questions").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"idBook\": 100,\n"
                + "    \"questionDtos\": [\n"
                + "        {\n"
                + "            \"questionsText\": \"Đây là câu hỏi?\",\n"
                + "            \"optionText\": {\n"
                + "                \"Lựa chọn A\": 1,\n"
                + "                \"Lựa chọn B\": 0,\n"
                + "                \"Lựa chọn C\": 0,\n"
                + "                \"Lựa chọn D\": 0\n"
                + "            },\n"
                + "            \"scoring\": 5\n"
                + "        }\n"
                + "    ]\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Không có cuốn sách phù hợp với id book", response.getMessage());
  }

  @Test
  @Order(5)
  public void testGetQuestionsByBook() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/questions?idBook=1").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(6)
  public void testCheckQuestion() throws Exception {

    MvcResult mvcResult = mvc.perform(
        put("/api/questions").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"idBook\": 1,\n"
                + "    \"listAnswer\": [\n"
                + "        {\n"
                + "            \"score\": 6,\n"
                + "            \"questionId\": \"6f48d23d-a9d3-4ed6-93c4-09c689c78c4d\",\n"
                + "            \"idAnswer\": 4,\n"
                + "            \"answer\": \"aa\"\n"
                + "        }\n"
                + "    ]\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(7)
  public void testGetScoringByBook() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/questions/scoring/top?idBook=1").header("Authorization", "Bearer " + userToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    PageResponse response = mapFromJson(content, PageResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }
}
