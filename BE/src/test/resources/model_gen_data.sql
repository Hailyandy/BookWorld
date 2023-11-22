INSERT INTO `book` VALUES 
(6,'The Girl with the Dragon Tattoo',480,'2008-09-23 00:00:00.000000','Viking Canada',
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1684638853i/2429135.jpg',
NULL,
'Harriet Vanger, con cháu của một trong những gia đình giàu có nhất Thụy Điển đã biến mất hơn bốn mươi năm trước. Suốt những năm sau đó, người chú già của cô vẫn tiếp tục tìm kiếm sự thật. Ông thuê Mikael Blomkvist, một nhà báo thập tự chinh vừa bị mắc kẹt vì tội phỉ báng, để điều tra. được hỗ trợ bởi thần đồng nhạc punk có hình xăm và xỏ khuyên Lisbeth Salander. Họ cùng nhau chạm vào mạch máu của tội ác không thể đo lường được và sự tham nhũng đáng kinh ngạc.

Là một hiện tượng xuất bản quốc tế, Cô Gái Có Hình Xăm Rồng của Stieg Larsson kết hợp vụ giết người bí ẩn, câu chuyện gia đình, câu chuyện tình yêu và âm mưu tài chính thành một cuốn tiểu thuyết phức tạp và đầy thú vị.',
NULL),
(7,'Harry Potter and the Philosopher’s Stone',223,'1997-06-26 00:00:00.000000','Bloomsbury Publishing',
'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1170803558l/72193.jpg',
NULL,
'Harry Potter nghĩ mình là một cậu bé bình thường - cho đến khi cậu được một con cú cứu, đưa đến Trường Pháp thuật và Ma thuật Hogwarts, học chơi Quidditch và chiến đấu trong một trận đấu tay đôi chết người.',
NULL);

INSERT INTO `genre` VALUES 
(3,'Tội phạm'),
(4,'Viễn tưởng');

INSERT INTO `book_genre` VALUES 
(6,3),
(6,4),
(7,4);

