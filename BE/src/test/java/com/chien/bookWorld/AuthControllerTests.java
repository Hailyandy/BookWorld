package com.chien.bookWorld;

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.AFTER_TEST_METHOD;
import static org.springframework.test.context.jdbc.SqlConfig.TransactionMode.ISOLATED;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;

import com.chien.bookWorld.controller.AuthController;
import com.chien.bookWorld.dto.OTPDto;
import com.chien.bookWorld.dto.OTPVerificationDto;
import com.chien.bookWorld.entity.User;
import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.jwt.JwtUtils;
import com.chien.bookWorld.payload.request.LoginRequest;
import com.chien.bookWorld.payload.request.SignupRequest;
import com.chien.bookWorld.payload.response.AppExceptionBody;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.UserRepository;
import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.FixMethodOrder;
import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.MethodOrderer.OrderAnnotation;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
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
@TestMethodOrder(OrderAnnotation.class)
class AuthControllerTests {

  @Autowired
  private MockMvc mvc;
  @Autowired
  private UserRepository userRepository;
  @Autowired
  private JwtUtils jwtUtils;
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
  @Order(1)
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
  @Order(2)
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
  @Order(3)
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
  @Order(4)
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
  //3
  @Test
  @Order(5)
  public void testRegisterUserEmailIsPresent() throws Exception {
    MvcResult mvcResult = mvc.perform(
        post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new SignupRequest("chien9pm@gmail.com", "123456789", new HashSet<>(
                List.of("user")))))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(400, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Lỗi: Email này đã được đăng ký trước đó!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Order(6)
  public void testRegisterUserSendOTPSuccess() throws Exception {
    MvcResult mvcResult = mvc.perform(
        post("/api/auth/signup").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new SignupRequest("chien9pt@gmail.com", "123456", new HashSet<>(
                List.of("user")))))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Hãy kiểm tra mã trong mail '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Order(7)
  public void testRegisterUserReSendOTPNotFound() throws Exception {
    MvcResult mvcResult = mvc.perform(
        put("/api/auth/getOtp").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new OTPDto("chien9ptz@gmail.com")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Không tìm thấy tài khoản với username '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Order(8)
  public void testRegisterUserOTPVerification() throws Exception {
    MvcResult mvcResult = mvc.perform(
        put("/api/auth/otpVerification").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new OTPVerificationDto("chien9pt@gmail.com", "1234567")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(401, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Mã OTP không phải là '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Order(9)
  public void testRegisterUserOTPVerificationExpired() throws Exception {
    MvcResult mvcResult = mvc.perform(
        put("/api/auth/otpVerification").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new OTPVerificationDto("user100@gmail.com", "123456")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(400, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "' của bạn đã hết hạn hoặc không tồn tại! Vui lòng tạo lại OTP!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Order(10)
  public void testRegisterUserOTPVerificationNotFound() throws Exception {
    MvcResult mvcResult = mvc.perform(
        put("/api/auth/otpVerification").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new OTPVerificationDto("user200@gmail.com", "123456")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(404, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Không tìm thấy tài khoản với username '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Order(11)
  public void testRegisterUserOTPVerificationRoleUserSuccess() throws Exception {
    User user = userRepository.findByUsername("chien9pt@gmail.com")
        .orElseThrow(() -> new AppException(404, 44,
            "Không tìm thấy tài khoản với username '" + "chien9pt@gmail.com" + "'!"));
    String otpDb ="";
    if (user.getVerificationCode() != null && jwtUtils.validateJwtToken(
        user.getVerificationCode())) {
      otpDb = jwtUtils.getUserNameFromJwtToken(user.getVerificationCode());
    }

    MvcResult mvcResult = mvc.perform(
        put("/api/auth/otpVerification").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new OTPVerificationDto("chien9pt@gmail.com", otpDb)))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Tài khoản đã được đăng ký thành công!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  //3
  @Test
  @Order(12)
  public void testRegisterUserReSendOTPSuccess() throws Exception {
    MvcResult mvcResult = mvc.perform(
        put("/api/auth/getOtp").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new OTPDto("user104@gmail.com")))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Hãy kiểm tra mã trong mail '";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }
  @Test
  @Order(13)
//  @Sql(
//      scripts = "/drop.sql",
//      config = @SqlConfig(transactionMode = ISOLATED),
//      executionPhase = AFTER_TEST_METHOD
//  )
  public void testRegisterUserOTPVerificationRoleArthorSuccess() throws Exception {
    User user = userRepository.findByUsername("user104@gmail.com")
        .orElseThrow(() -> new AppException(404, 44,
            "Không tìm thấy tài khoản với username '" + "user104@gmail.com" + "'!"));
    String otpDb ="";
    if (user.getVerificationCode() != null && jwtUtils.validateJwtToken(
        user.getVerificationCode())) {
      otpDb = jwtUtils.getUserNameFromJwtToken(user.getVerificationCode());
    }

    MvcResult mvcResult = mvc.perform(
        put("/api/auth/otpVerification").contentType(MediaType.APPLICATION_JSON)
            .content(mapToJson(new OTPVerificationDto("user104@gmail.com", otpDb)))).andReturn();

    int status = mvcResult.getResponse().getStatus();
    Assert.assertEquals(200, status);

    String content = mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8);
    AppExceptionBody response = mapFromJson(content, AppExceptionBody.class);
//    Assert.assertEquals("Thành công!", response.getMessage());

    String expectedMessage = "Tài khoản đã được đăng ký thành công! Vui lòng đợi quản trị viên phê duyệt tài khoản của bạn!";
    String actualMessage = response.getMessage();

    Assert.assertTrue(actualMessage.contains(expectedMessage));
  }

  @AfterAll
//  @Sql(scripts = "classpath:drop.sql")
  public static void drop() {
  }
}
