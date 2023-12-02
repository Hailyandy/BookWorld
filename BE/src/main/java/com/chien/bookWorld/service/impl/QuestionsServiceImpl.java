package com.chien.bookWorld.service.impl;

import java.sql.Timestamp;
import java.util.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

import com.chien.bookWorld.dto.*;
import com.chien.bookWorld.entity.*;
import com.chien.bookWorld.payload.response.PageResponse;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.chien.bookWorld.exception.AppException;
import com.chien.bookWorld.payload.response.SuccessResponse;
import com.chien.bookWorld.repository.BookRepository;
import com.chien.bookWorld.repository.OptionsRepository;
import com.chien.bookWorld.repository.QuestionsRepository;
import com.chien.bookWorld.repository.ScoringRepository;
import com.chien.bookWorld.repository.UserRepository;
import com.chien.bookWorld.service.QuestionsService;

@Service
public class QuestionsServiceImpl implements QuestionsService {

    @Autowired
    private QuestionsRepository questionsRepository;

    @Autowired
    private OptionsRepository optionsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ScoringRepository scoringRepository;

    @Autowired
    private ModelMapper mapper;

    private static final Logger logger = Logger.getLogger(QuestionsServiceImpl.class.getName());

    @Override
    public Map<String, Object> create(QuestionsCreationDto c) {
        // TODO Auto-generated method stub
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();

        boolean isAuthor = roles.contains("ROLE_AUTHOR");

        if (!isAuthor) {
            throw new AppException(403, 43, "Cần quyền là tác giả.");
        }

        Book book = bookRepository.findById(c.getIdBook())
                .orElseThrow(() -> new AppException(404, 44, "Không có cuốn sách phù hợp với id book"));
//        questions.setQuestionText(c.getQuestionsText());
//        questions.setScoring(c.getScoring());
//        questionsRepository.save(questions);
//        Set set = c.getOptionText().keySet();

//        }

        List<QuestionDto> questionsDtos = c.getQuestionDtos();
        for (QuestionDto i : questionsDtos) {
            Questions question = new Questions();
            UUID idQuestion = UUID.randomUUID();
            question.setId(idQuestion);
            question.setBook(book);
            question.setQuestionText(i.getQuestionsText());
            question.setScoring(i.getScoring());
            questionsRepository.save(question);

            Set set = i.getOptionText().keySet();

            for (Object key : set) {
                Integer value = i.getOptionText().get(key);
                Options option = new Options();
                option.setIs_correct(value);
                option.setOptions_text(key.toString());
                option.setQuestions(question);
                optionsRepository.save(option);
            }
        }

        final Map<String, Object> body = new HashMap<>();
        body.put("code", 0);
        body.put("message", "Tạo câu hỏi thành công!");
        return body;
    }

    @Override
    public Map<String, Object> delete(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse findAll() {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse findById(Long id) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Object update(Questions u) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public SuccessResponse getQuestionsByBook(Long idBook) {
        // TODO Auto-generated method stub
        List<Questions> questions = questionsRepository.getQuestionsByBookId(idBook);
        return new SuccessResponse(questions.stream().map(question -> {
            QuestionsDto questionsDto = mapper.map(question, QuestionsDto.class);
            questionsDto.setQuestionsText(question.getQuestionText());
            questionsDto.setIdBook(question.getBook().getId());

            List<Options> options = optionsRepository.findByQuestionId(question.getId());
            questionsDto.setOptionDtos(
                    options.stream().map(a -> mapper.map(a, OptionDto.class)).collect(
                            Collectors.toList())
            );
            return questionsDto;
        }).collect(
                Collectors.toList()));
    }

    public void updateScoring(Long idBook, Integer scoring) {
        // TODO Auto-generated method stub
        Scoring score = new Scoring();
        UserDetailsImpl userDetails = (UserDetailsImpl) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();

        List<String> roles = userDetails.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority).toList();
        boolean isUser = roles.contains("ROLE_USER");
        if (!isUser) {
            throw new AppException(403, 43, "Tác giả và Admin không thể ghi điểm");
        }
        score.setBook(bookRepository.findById(idBook)
                .orElseThrow(() -> new AppException(404, 44, "Không có cuốn sách phù hợp với id book")));
        score.setUser(userRepository.findById(userDetails.getId()).orElseThrow(
                () -> new AppException(404, 44, "Không tìm thấy người dùng")));
        score.setScore(scoring);
        score.setTimestamp(new Timestamp(System.currentTimeMillis()));
        scoringRepository.save(score);

    }

    @Override
    public SuccessResponse checkQuestion(ScoringCreation scoringCreation) {
        Integer score = 0;
        AnswerDto answerDto = new AnswerDto();
        ArrayList<CheckQuestionDto> checkQuestionDtos = new ArrayList<>();
        List<AnswerCheckDto> answerCheckDtos = scoringCreation.getListAnswer();
        for (int i = 0; i < answerCheckDtos.size(); i++) {
            CheckQuestionDto checkQuestionDto = new CheckQuestionDto();
            checkQuestionDto.setUser_answer(answerCheckDtos.get(i).getAnswer());
            checkQuestionDto.setQuestionId(answerCheckDtos.get(i).getQuestionId());
            checkQuestionDto.setUser_answerId(answerCheckDtos.get(i).getIdAnswer());
            Options optionTrue = optionsRepository.findByQuestionIdAndIsCorrect(answerCheckDtos.get(i).getQuestionId());
            checkQuestionDto.setCorrect_answer(optionTrue.getOptions_text());
            checkQuestionDto.setCorrect_answerId(optionTrue.getId());
            if (optionTrue.getId() == answerCheckDtos.get(i).getIdAnswer()) {
                score = score + answerCheckDtos.get(i).getScore();
                checkQuestionDto.setStatus("Đúng");
            } else {
                checkQuestionDto.setStatus("Sai");
            }
            checkQuestionDtos.add(checkQuestionDto);

        }
        logger.info(String.valueOf(score));
        updateScoring(scoringCreation.getIdBook(), score);
        answerDto.setScore(score);
        answerDto.setCheckQuestionDtos(checkQuestionDtos);
        return new SuccessResponse(answerDto);
    }

    @Override
    public PageResponse getScoringTopByBook(Pageable pageable, Long idBook) {

        Page<Scoring> scorings = scoringRepository.getScoringTopByBook(pageable, idBook);
        int totalPages = scorings.getTotalPages();
        int numberPage = scorings.getNumber();
        long totalRecord = scorings.getTotalElements();
        int pageSize = scorings.getSize();

        List<UserScoringDto> userScoringDtos = scorings.stream().map(scoring -> {
            UserScoringDto userScoringDto = new UserScoringDto();
            userScoringDto.setIdUser(scoring.getUser().getId());
            userScoringDto.setUserName(scoring.getUser().getName());
            userScoringDto.setUrlAvatarUser(scoring.getUser().getUrlAvatar());
            userScoringDto.setBookName(scoring.getBook().getName());
            userScoringDto.setScore(scoring.getScore());
            userScoringDto.setTimestamp(scoring.getTimestamp());
            return userScoringDto;
        }).collect(Collectors.toList());
        return new PageResponse(totalPages, pageSize, totalRecord, numberPage, userScoringDtos);
    }
}
