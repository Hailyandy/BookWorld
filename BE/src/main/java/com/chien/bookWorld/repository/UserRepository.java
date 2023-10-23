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

    @Query(value = "SELECT * FROM user WHERE BINARY(user_name) = BINARY(:userName)", nativeQuery = true)
    Optional<User> findByUsername(@Param("userName") String username);

    List<User> findByEnabled(Boolean enabled);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET enabled = :enabled WHERE id IN :ids", nativeQuery = true)
    Optional<Integer> updateEnabledById(@Param("ids") Collection<Long> ids,
            @Param("enabled") Boolean enabled);

    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET verification_code = :verificationCode WHERE BINARY(user_name) = BINARY(:userName)", nativeQuery = true)
    Integer updateVerificationCodeByUserName(@Param("userName") String userName,
            @Param("verificationCode") String verificationCode);

    @Query(nativeQuery = true, value = "SELECT DISTINCT *\n" + //
            "FROM user u\n" + //
            "JOIN user_role ur ON u.id = ur.user_id\n" + //
            "JOIN role r ON ur.role_id = r.id\n" + //
            "WHERE u.name LIKE '%xuan%'\n" + //
            "  AND r.name NOT IN ('ROLE_ADMIN')")
    List<User> findByNameAndNotRoleAdmin(@Param("name") String name);
}
