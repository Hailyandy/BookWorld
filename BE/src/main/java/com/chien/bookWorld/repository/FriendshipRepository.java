package com.chien.bookWorld.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.chien.bookWorld.entity.Friendship;
import com.chien.bookWorld.entity.FriendshipStatus;
import com.chien.bookWorld.entity.User;
import java.util.List;

@Repository
public interface FriendshipRepository extends JpaRepository<Friendship, Long> {



    // // Tìm mối quan hệ bạn bè dựa trên sender và receiver
    // Friendship findBySenderAndReceiver(User sender, User receiver);

    List<Friendship> findByReceiverIdAndStatus(Long receiverId, FriendshipStatus status);

    @Query(nativeQuery = true, value = "SELECT * FROM friendship WHERE (id_sender = :senderId AND id_receiver = :userId) AND status = 'PENDING'")
    Friendship findFriendRequestsByUsers(@Param("senderId") Long senderId, @Param("userId") Long userId);

    @Query(nativeQuery = true, value = "SELECT * FROM friendship\n" +
            "WHERE status = 'ACCEPTED' AND  (id_sender = :userId or id_receiver = :receiverId)")
    List<Friendship> findByStatusAndSenderIdOrReceiverId(@Param("userId") Long userId,@Param("receiverId") Long receiverId);

    Friendship findBySenderIdAndReceiverIdAndStatus(Long senderId, Long receiverId, FriendshipStatus status);

    Friendship findBySenderIdAndReceiverId(Long senderId, Long receiverId);

    @Query(nativeQuery = true, value = "SELECT COUNT(*) as total_pending_invitations\n" +
            "FROM friendship\n" +
            "WHERE status = 'PENDING' AND id_receiver = :receiverId")
    Long countPendingInvitation(@Param("receiverId") Long receiverId);
}
