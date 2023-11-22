package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.Role;
import com.chien.bookWorld.entity.User;
import jakarta.transaction.Transactional;
import java.util.Collection;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

        @Query(value = "SELECT * FROM user WHERE name LIKE :name", nativeQuery = true)
        List<User> findByName(@Param("name") String name);

        @Query(value = "SELECT * FROM user WHERE phone LIKE :phone", nativeQuery = true)
        List<User> findByPhone(@Param("phone") String phone);

        @Query(value = "SELECT * FROM user WHERE user_name = :userName", nativeQuery = true)
        Optional<User> findByUsername(@Param("userName") String username);

        List<User> findByEnabled(Boolean enabled);

        @Modifying
        @Transactional
        @Query(value = "UPDATE user SET enabled = :enabled WHERE id IN :ids", nativeQuery = true)
        Optional<Integer> updateEnabledById(@Param("ids") Collection<Long> ids,
                        @Param("enabled") Boolean enabled);

        @Modifying
        @Transactional
        @Query(value = "UPDATE user SET verification_code = :verificationCode WHERE user_name = :userName", nativeQuery = true)
        Integer updateVerificationCodeByUserName(@Param("userName") String userName,
                        @Param("verificationCode") String verificationCode);

        @Query(nativeQuery = true, value = "SELECT DISTINCT user.*\n" + //
                        "FROM user\n" + //
                        "JOIN user_role ON user.id = user_role.user_id\n" + //
                        "JOIN role ON user_role.role_id = role.id\n" + //
                        "WHERE user.name LIKE :name \n" + //
                        "AND role.name NOT IN ('ROLE_ADMIN') AND user.id <> :userId")
        List<User> findByNameAndNotRoleAdmin(@Param("name") String name, @Param("userId") Long userId);
}
