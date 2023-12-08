package com.chien.bookWorld;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
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
class FriendControllerTests {

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
  public void testAddFriend() throws Exception {

    MvcResult mvcResult = mvc.perform(
        post("/api/friend/add").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)
            .content("{\n"
                + "    \"receiverId\": 2\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Friend request sent!", response.getMessage());
  }

  @Test
  @Order(3)
  public void testGetFriendRequestOfUser() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/friend/request").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(4)
  public void testGetFriendRequestOfUserForbidden() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/friend/request").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You don't have permission to add friends.",
        response.getMessage());
  }

  @Test
  @Order(5)
  public void testAcceptFriendRequestAdmin() throws Exception {

    MvcResult mvcResult = mvc.perform(
        put("/api/friend/accept").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 12\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You don't have permission to add friends.",
        response.getMessage());
  }

  @Test
  @Order(6)
  public void testAcceptFriendRequest() throws Exception {

    MvcResult mvcResult = mvc.perform(
        put("/api/friend/accept").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 12\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Friend accept!", response.getMessage());
  }

  @Test
  @Order(7)
  public void testAcceptFriendRequestSelf() throws Exception {

    MvcResult mvcResult = mvc.perform(
        put("/api/friend/accept").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 9\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You can only accept yourself as a friend.",
        response.getMessage());
  }

  @Test
  @Order(8)
  public void testGetFriends() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/friend/list").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    SuccessResponse response = mapFromJson(content, SuccessResponse.class);

    Assert.assertEquals("Thành công!", response.getMessage());
  }

  @Test
  @Order(9)
  public void testGetFriendsAdmin() throws Exception {

    MvcResult mvcResult = mvc.perform(
        get("/api/friend/list").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You don't have permission to add friends.",
        response.getMessage());
  }

  @Test
  @Order(10)
  public void testRejectFriendRequest() throws Exception {

    MvcResult mvcResult = mvc.perform(
        put("/api/friend/reject").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 12\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Friend reject success!", response.getMessage());
  }

  @Test
  @Order(11)
  public void testRejectFriendRequestAdmin() throws Exception {

    MvcResult mvcResult = mvc.perform(
        put("/api/friend/reject").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 12\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You don't have permission to add friends.", response.getMessage());
  }

  @Test
  @Order(12)
  public void testRejectFriendRequestSelf() throws Exception {

    MvcResult mvcResult = mvc.perform(
        put("/api/friend/reject").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 9\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You can only accept yourself as a friend.", response.getMessage());
  }

  @Test
  @Order(13)
  public void testRemoveFriendIncorrectFormat() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/friend/unfriend").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON)).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(400, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Body phải ở định dạng của một đối tượng JSON với tất cả các tham số bắt buộc!", response.getMessage());
  }

  @Test
  @Order(14)
  public void testRemoveFriendAdmin() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/friend/unfriend").header("Authorization", "Bearer " + adminToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 12\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You don't have permission to add friends.", response.getMessage());
  }

  @Test
  @Order(15)
  public void testRemoveFriendSelf() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/friend/unfriend").header("Authorization", "Bearer " + chien9pmToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 9\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(403, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Forbidden! You can only accept yourself as a friend.", response.getMessage());
  }

  @Test
  @Order(16)
  public void testRemoveFriendNotExist() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/friend/unfriend").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 13\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Error: Does not exist! No friend request has been created yet!", response.getMessage());
  }

  @Test
  @Order(17)
  public void testRemoveFriend() throws Exception {

    MvcResult mvcResult = mvc.perform(
        delete("/api/friend/unfriend").header("Authorization", "Bearer " + authorToken)
            .contentType(MediaType.APPLICATION_JSON).content("{\n"
                + "    \"senderId\": 12\n"
                + "}")).andReturn();
    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);

    Assert.assertEquals("Friend delete!", response.getMessage());
  }
}
