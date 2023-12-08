package com.chien.bookWorld.repository;

import com.chien.bookWorld.entity.Role;
import com.chien.bookWorld.entity.User;
import jakarta.transaction.Transactional;

import java.time.LocalDateTime;
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

        @Query(nativeQuery = true, value = "SELECT DISTINCT user.*\n" + //
                        "FROM user\n" + //
                        "JOIN user_role ON user.id = user_role.user_id\n" + //
                        "JOIN role ON user_role.role_id = role.id\n" + //
                        "WHERE user.name LIKE :name \n" + //
                        "AND role.name NOT IN ('ROLE_ADMIN') AND user.id <> :userId")
        List<User> findByNameAndNotRoleAdmin(@Param("name") String name, @Param("userId") Long userId);

        @Query(
                nativeQuery = true,
                value = "SELECT u.* FROM user u join user_role ur on u.id = ur.user_id join role r on ur.role_id = r.id where r.name = 'ROLE_AUTHOR'"
        )
        List<User> findUserRoleAuthor();

        @Query(nativeQuery = true, value = "SELECT \n" +
                "    months.month AS thang, \n" +
                "    IFNULL(COUNT(user.id), 0) AS count\n" +
                "FROM \n" +
                "    (SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 ) AS months\n" +
                "LEFT JOIN \n" +
                "    user ON MONTH(user.registration_date) = months.month AND YEAR(user.registration_date) = :year_\n" +
                "LEFT JOIN \n" +
                "    user_role ON user.id = user_role.user_id\n" +
                "LEFT JOIN \n" +
                "    role ON user_role.role_id = role.id\n" +
                "WHERE \n" +
                "    role.name = 'ROLE_USER' OR user.id IS NULL\n" +
                "   OR (user.registration_date IS NOT NULL AND YEAR(user.registration_date) = 2023)\n" +
                "GROUP BY \n" +
                "    months.month\n" +
                "ORDER BY \n" +
                "    months.month;\n")
        List<Object[]> countNewUserRegistrationsByMonth(@Param("year_") int year);
}
