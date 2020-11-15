/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80014
 Source Host           : localhost:3306
 Source Schema         : xf-test

 Target Server Type    : MySQL
 Target Server Version : 80014
 File Encoding         : 65001

 Date: 15/11/2020 23:35:12
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for city
-- ----------------------------
DROP TABLE IF EXISTS `city`;
CREATE TABLE `city`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '中文名称',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '是否开通 0 未开通 1 已开通',
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '城市 ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '北京', 0, 1100);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '天津', 0, 1200);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '石家庄', 0, 1301);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '呼和浩特', 0, 1501);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '沈阳', 0, 2101);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '大连', 0, 2102);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '长春', 0, 2201);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '哈尔滨', 0, 2301);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '上海', 0, 3100);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '南京', 0, 3201);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '无锡', 0, 3202);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '徐州', 0, 3203);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '常州', 0, 3204);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '苏州', 0, 3205);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '杭州', 0, 3301);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '宁波', 0, 3302);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '温州', 0, 3303);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '合肥', 0, 3401);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '福州', 0, 3501);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '厦门', 0, 3502);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '南昌', 0, 3601);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '济南', 0, 3701);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '青岛', 0, 3702);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '郑州', 0, 4101);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '武汉', 0, 4201);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '长沙', 0, 4301);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:42:45', '广州', 1, 4401);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '深圳', 0, 4403);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '佛山', 0, 4406);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '东莞', 0, 4419);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '南宁', 0, 4501);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '重庆', 0, 5000);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '成都', 0, 5101);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '贵阳', 0, 5201);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '昆明', 0, 5301);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '西安', 0, 6101);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '兰州', 0, 6201);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '乌鲁木齐', 0, 6501);
INSERT INTO `city` VALUES ('2020-11-15 19:11:49', '2020-11-15 19:11:49', '香港', 0, 8100);

-- ----------------------------
-- Table structure for house
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '内容详情',
  `imgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '图片列表',
  `status` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '状态',
  `comment_count` int(11) NOT NULL DEFAULT 0 COMMENT '评论数',
  `click_count` int(11) NOT NULL DEFAULT 0 COMMENT '点击数',
  `like_count` int(11) NOT NULL DEFAULT 0 COMMENT '点赞数',
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `city_id` int(11) NULL DEFAULT NULL,
  `subway_id` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_312570052023c1ecbed7db28b18`(`user_id`) USING BTREE,
  INDEX `FK_588e6d0ace18a8eb8910d1b8634`(`subway_id`) USING BTREE,
  INDEX `FK_277decf3e1604935a84e441004b`(`city_id`) USING BTREE,
  CONSTRAINT `FK_277decf3e1604935a84e441004b` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_312570052023c1ecbed7db28b18` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_588e6d0ace18a8eb8910d1b8634` FOREIGN KEY (`subway_id`) REFERENCES `subway` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of house
-- ----------------------------
INSERT INTO `house` VALUES ('2020-08-17 15:30:41', '2020-08-17 17:20:58', '3651ed2e-b137-40ce-b88f-f22890b7e9c0', '广州南', 'gznz', '0b674fe76102a4e0488ce3e2e3bc605e/house/1597649439893.JPG', '0', 0, 0, 0, '491446a5-5df3-4ae1-b44a-7a0fcce98453', 4401, 54);
INSERT INTO `house` VALUES ('2020-11-15 23:03:18', '2020-11-15 23:03:18', '4a2975cf-5a2b-462b-b1b1-c7c851c990a1', '测试房子', '房子内容', '0b674fe76102a4e0488ce3e2e3bc605e/house/1597649077437.JPG', '0', 0, 0, 0, '491446a5-5df3-4ae1-b44a-7a0fcce98453', 4401, 52);

-- ----------------------------
-- Table structure for permission
-- ----------------------------
DROP TABLE IF EXISTS `permission`;
CREATE TABLE `permission`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标识',
  `module` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '所属模块, 例如用户模块 user',
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_ac6b88c23265b975e0c75c2bc6`(`token`) USING BTREE,
  UNIQUE INDEX `IDX_240853a0c3353c25fb12434ad3`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of permission
-- ----------------------------
INSERT INTO `permission` VALUES ('2019-11-04 22:22:12', '2019-11-04 22:22:12', '106b2de4-7423-48a0-ad3c-f585928d1d25', 'house.create', 'house', '房子创建', '');
INSERT INTO `permission` VALUES ('2019-11-04 22:22:32', '2019-11-04 22:22:32', '187ce680-4388-4096-8894-1274777bc056', 'house.update', 'house', '房子更新', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:55:43', '2019-09-24 22:56:28', '1c5008c8-5dcc-41de-9f69-60873424f216', 'permission.create', 'permission', '权限创建', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:36:51', '2019-09-24 22:36:51', '2b8f8412-acad-447a-9b5a-a5ccb2001990', 'user.delete', 'user', '用户删除', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:57:37', '2019-09-24 22:57:37', '33418f6e-0c17-48ab-9e7e-415716bf63d2', 'permission.update', 'permission', '权限更新', '');
INSERT INTO `permission` VALUES ('2019-10-04 11:03:11', '2019-10-04 11:03:11', '4add5c1b-972e-41d7-99d5-2060868acb24', 'city.list', 'city', '城市列表', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:53:51', '2019-09-24 22:53:51', '561311a8-e37f-415d-8a62-4e06a9a3a0bc', 'role.create', 'role', '角色创建', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:56:40', '2019-09-24 22:56:40', '6c5652bd-073e-4faf-99a9-26eeadeb9f2b', 'permission.delete', 'permission', '权限删除', '');
INSERT INTO `permission` VALUES ('2019-11-04 22:22:50', '2019-11-04 22:22:50', '6e611ae7-fd20-44a9-935b-43574b2bbd3e', 'house.delete', 'house', '房子删除', '');
INSERT INTO `permission` VALUES ('2019-10-04 17:42:39', '2019-10-04 17:42:39', '70413f64-7aae-45a1-8742-4b07da967404', 'city.item', 'city', '城市 Item', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:38:11', '2019-09-24 22:38:11', '7cf99844-e99b-409f-aef9-924aa3a06a3b', 'user.update', 'user', '用户更新', '');
INSERT INTO `permission` VALUES ('2019-10-04 11:03:35', '2019-10-04 11:03:35', '8610715e-830a-4181-be8f-7f4b6f751559', 'city.update', 'city', '城市更新', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:49:26', '2019-09-24 22:53:17', 'a41d8e7c-2707-48d8-8dbd-50d6b2f66bed', 'role.item', 'role', '角色 Item', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:55:13', '2019-09-24 22:55:13', 'b2df8029-b41b-4fb1-9948-30714dac0892', 'permission.list', 'permission', '权限列表', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:38:25', '2019-09-24 22:38:25', 'b894f1fa-ed74-4368-8666-18b971809efb', 'user.create', 'user', '用户创建', '');
INSERT INTO `permission` VALUES ('2019-11-04 22:23:39', '2019-11-04 22:23:39', 'c23cfc33-05e7-47e8-8434-f20da372149c', 'house.list', 'house', '房子列表', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:53:42', '2019-09-24 22:53:42', 'ca8ab26d-0637-42d0-b61b-3f671ef958f3', 'role.update', 'role', '角色更新', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:28:28', '2019-09-24 22:37:04', 'cdf2372c-31ec-42f1-b552-fb58e9f124fb', 'user.list', 'user', '用户列表', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:53:31', '2019-09-24 22:53:31', 'd6c57cba-04bb-4e50-8893-120e4276698b', 'role.list', 'role', '角色列表', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:37:44', '2019-09-24 22:52:59', 'e06ea503-4bb3-4ec3-a58b-d86825ce2fec', 'user.item', 'user', '用户 Item', '');
INSERT INTO `permission` VALUES ('2019-10-05 00:52:05', '2019-10-05 00:52:05', 'e1bb48eb-29f0-4b06-97dc-31e06f923256', 'subway.list', 'subway', '地铁列表', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:54:54', '2019-09-24 22:54:54', 'e2ceb8b7-deaf-49e6-8ce2-bde931ae5bc2', 'role.delete', 'role', '角色删除', '');
INSERT INTO `permission` VALUES ('2019-09-24 22:56:52', '2019-09-24 22:56:52', 'e5575e16-c92a-4432-917e-e9a51fce47d7', 'permission.item', 'permission', '权限 Item', '');
INSERT INTO `permission` VALUES ('2019-11-04 22:23:23', '2019-11-04 22:23:23', 'eaa57ea0-a2ea-43d7-bfcc-1d7805bc94b4', 'house.item', 'house', '房子 Item', '');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '名称',
  `token` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标识',
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_2cfa395daced6c810c8c4aaf1b`(`token`) USING BTREE,
  UNIQUE INDEX `IDX_ae4578dcaed5adff96595e6166`(`name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('2019-09-04 23:17:42', '2019-09-04 23:17:42', '10dc1736-69b4-4193-b59e-51d8360ffe17', '测试角色', 'test', '我是测试角色');
INSERT INTO `role` VALUES ('2019-08-16 22:15:51', '2019-08-16 22:15:51', '1789cb3f-7ec1-4c8e-a7aa-72a8e3e49ee1', '普通用户', 'user', NULL);
INSERT INTO `role` VALUES ('2020-08-18 14:47:42', '2020-08-18 14:47:42', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c', '管理员', 'admin', NULL);
INSERT INTO `role` VALUES ('2019-08-16 01:11:55', '2019-08-16 01:11:55', '9adf12e6-079e-4695-aab8-6e19cbe1082e', '超级管理员', 'superAdmin', NULL);

-- ----------------------------
-- Table structure for role_permission
-- ----------------------------
DROP TABLE IF EXISTS `role_permission`;
CREATE TABLE `role_permission`  (
  `permission_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`permission_id`, `role_id`) USING BTREE,
  INDEX `IDX_e3a3ba47b7ca00fd23be4ebd6c`(`permission_id`) USING BTREE,
  INDEX `IDX_3d0a7155eafd75ddba5a701336`(`role_id`) USING BTREE,
  CONSTRAINT `FK_3d0a7155eafd75ddba5a7013368` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_e3a3ba47b7ca00fd23be4ebd6cf` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of role_permission
-- ----------------------------
INSERT INTO `role_permission` VALUES ('106b2de4-7423-48a0-ad3c-f585928d1d25', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('106b2de4-7423-48a0-ad3c-f585928d1d25', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('187ce680-4388-4096-8894-1274777bc056', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('187ce680-4388-4096-8894-1274777bc056', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('1c5008c8-5dcc-41de-9f69-60873424f216', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('1c5008c8-5dcc-41de-9f69-60873424f216', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('2b8f8412-acad-447a-9b5a-a5ccb2001990', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('33418f6e-0c17-48ab-9e7e-415716bf63d2', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('4add5c1b-972e-41d7-99d5-2060868acb24', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('4add5c1b-972e-41d7-99d5-2060868acb24', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('561311a8-e37f-415d-8a62-4e06a9a3a0bc', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('561311a8-e37f-415d-8a62-4e06a9a3a0bc', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('6c5652bd-073e-4faf-99a9-26eeadeb9f2b', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('6e611ae7-fd20-44a9-935b-43574b2bbd3e', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('70413f64-7aae-45a1-8742-4b07da967404', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('70413f64-7aae-45a1-8742-4b07da967404', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('7cf99844-e99b-409f-aef9-924aa3a06a3b', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('8610715e-830a-4181-be8f-7f4b6f751559', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('8610715e-830a-4181-be8f-7f4b6f751559', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('a41d8e7c-2707-48d8-8dbd-50d6b2f66bed', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('a41d8e7c-2707-48d8-8dbd-50d6b2f66bed', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('b2df8029-b41b-4fb1-9948-30714dac0892', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('b2df8029-b41b-4fb1-9948-30714dac0892', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('b894f1fa-ed74-4368-8666-18b971809efb', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('b894f1fa-ed74-4368-8666-18b971809efb', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('c23cfc33-05e7-47e8-8434-f20da372149c', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('c23cfc33-05e7-47e8-8434-f20da372149c', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('ca8ab26d-0637-42d0-b61b-3f671ef958f3', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('cdf2372c-31ec-42f1-b552-fb58e9f124fb', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('cdf2372c-31ec-42f1-b552-fb58e9f124fb', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('d6c57cba-04bb-4e50-8893-120e4276698b', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('d6c57cba-04bb-4e50-8893-120e4276698b', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e06ea503-4bb3-4ec3-a58b-d86825ce2fec', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('e06ea503-4bb3-4ec3-a58b-d86825ce2fec', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e1bb48eb-29f0-4b06-97dc-31e06f923256', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('e1bb48eb-29f0-4b06-97dc-31e06f923256', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e2ceb8b7-deaf-49e6-8ce2-bde931ae5bc2', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e5575e16-c92a-4432-917e-e9a51fce47d7', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('e5575e16-c92a-4432-917e-e9a51fce47d7', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('eaa57ea0-a2ea-43d7-bfcc-1d7805bc94b4', '4b7f2859-cc69-4781-ae40-2e8dc13aa21c');
INSERT INTO `role_permission` VALUES ('eaa57ea0-a2ea-43d7-bfcc-1d7805bc94b4', '9adf12e6-079e-4695-aab8-6e19cbe1082e');

-- ----------------------------
-- Table structure for subway
-- ----------------------------
DROP TABLE IF EXISTS `subway`;
CREATE TABLE `subway`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '地铁名称',
  `city_id` int(11) NOT NULL COMMENT '城市id',
  `city_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '城市名称',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_e85914334f53a2824b96f4b42b9`(`city_id`) USING BTREE,
  CONSTRAINT `FK_e85914334f53a2824b96f4b42b9` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subway
-- ----------------------------
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 3, 'S1线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 4, '1号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 5, '2号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 6, '4号线大兴线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 7, '5号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 8, '6号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 9, '7号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 10, '8号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 11, '8号线南段', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 12, '9号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 13, '10号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 14, '13号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 15, '14号线东段', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 16, '14号线西段', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 17, '15号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:53', '2020-11-15 18:02:53', 18, '16号线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 19, '八通线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 20, '昌平线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 21, '大兴国际机场线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 22, '房山线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 23, '首都机场线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 24, '西郊线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 25, '燕房线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 26, '亦庄线', 1100, '北京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 27, '1号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 28, '2号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 29, '3号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 30, '4号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 31, '5号线(东川路--闵行开发区)', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 32, '5号线(莘庄--奉贤新城)', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 33, '6号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 34, '7号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 35, '8号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 36, '9号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 37, '10号线(航中路-新江湾城)', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 38, '10号线(虹桥火车站-新江湾城)', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 39, '11号线(嘉定北-迪士尼)', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 40, '11号线(花桥-迪士尼)', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 41, '12号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 42, '13号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 43, '16号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 44, '17号线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 45, '磁悬浮', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 46, '浦江线', 3100, '上海');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 47, '1号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 48, '2号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 49, '3号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 50, '3号线(北延段)', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 51, '4号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 52, '5号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 53, '6号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 54, '7号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 55, '8号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 56, '9号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 57, '13号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 58, '14号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 59, '14号线支线(知识城线)', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 60, '21号线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 61, 'APM线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 62, '广佛线', 4401, '广州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 63, '1号线/罗宝线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 64, '2号线/蛇口线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 65, '3号线/龙岗线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 66, '4号线/龙华线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 67, '5号线/环中线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 68, '7号线/西丽线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 69, '9号线/梅林线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 70, '11号线/机场线', 4403, '深圳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 71, '1号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 72, '2号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 73, '3号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 74, '4号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 75, '6号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 76, '7号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 77, '8号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 78, '8号线(军运专线)', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 79, '11号线', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 80, '21号线(阳逻线)', 4201, '武汉');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 81, '1号线', 1200, '天津');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 82, '2号线', 1200, '天津');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 83, '3号线', 1200, '天津');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 84, '5号线', 1200, '天津');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 85, '6号线', 1200, '天津');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 86, '9号线', 1200, '天津');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 87, 'S1号线(机场线)', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 88, '1号线', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 89, '2号线', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 90, 'S3号线(宁和线)', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 91, '3号线', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 92, '4号线', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 93, 'S7号线(宁溧线)', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 94, 'S8号线(宁天线)', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 95, 'S9号线(宁高线)', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 96, '10号线', 3201, '南京');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 97, '迪士尼', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 98, '东铁线(落馬洲-紅磡)', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 99, '东铁线(羅湖-紅磡)', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 100, '东涌线', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 101, '港岛线', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 102, '观塘线', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 103, '机场快线', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 104, '将军澳线(北角-康城)', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 105, '将军澳线(寶琳-北角)', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 106, '南港岛线', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 107, '屯马线一期', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 108, '西铁线', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 109, '荃湾线', 8100, '香港');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 110, '1号线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 111, '2号线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 112, '3号线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 113, '3号线北延伸段', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 114, '4号线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 115, '5号线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 116, '6号线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 117, '6号线支线(国博线)', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 118, '10号线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 119, '环线', 5000, '重庆');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 120, '1号线(下沙江滨-湘湖)', 3301, '杭州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 121, '1号线(临平-湘湖)', 3301, '杭州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 122, '2号线', 3301, '杭州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 123, '4号线', 3301, '杭州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 124, '5号线', 3301, '杭州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 125, '1号线', 2101, '沈阳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 126, '2号线', 2101, '沈阳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 127, '9号线', 2101, '沈阳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 128, '1号线', 2102, '大连');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 129, '2号线', 2102, '大连');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 130, '3号线', 2102, '大连');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 131, '12号线', 2102, '大连');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 132, '保税区线', 2102, '大连');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 133, '九里线', 2102, '大连');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 134, '九里支线', 2102, '大连');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 135, '1号线(五根松-韦家碾)', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 136, '1号线(科学城-韦家碾)', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 137, '2号线', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 138, '3号线', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 139, '4号线', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 140, '5号线', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 141, '7号线', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 142, '10号线', 5101, '成都');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 143, '1号线', 2201, '长春');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 144, '2号线', 2201, '长春');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 145, '3号线', 2201, '长春');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 146, '4号线', 2201, '长春');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 147, '8号线', 2201, '长春');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 148, '1号线', 3205, '苏州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 149, '2号线', 3205, '苏州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 150, '3号线', 3205, '苏州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 151, '4号线', 3205, '苏州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 152, '4号线支线', 3205, '苏州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 153, '广佛线', 4406, '佛山');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 154, '1号线', 5301, '昆明');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 155, '1号线支线', 5301, '昆明');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 156, '2号线', 5301, '昆明');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 157, '3号线', 5301, '昆明');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 158, '6号线', 5301, '昆明');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 159, '1号线', 6101, '西安');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 160, '2号线', 6101, '西安');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 161, '3号线', 6101, '西安');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 162, '4号线', 6101, '西安');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 163, '机场城际线', 6101, '西安');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 164, '1号线', 4101, '郑州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 165, '2号线', 4101, '郑州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 166, '5号线', 4101, '郑州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 167, '14号线', 4101, '郑州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 168, '城郊线', 4101, '郑州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 169, '1号线', 4301, '长沙');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 170, '2号线', 4301, '长沙');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 171, '4号线', 4301, '长沙');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 172, '磁浮快线', 4301, '长沙');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 173, '1号线', 3302, '宁波');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 174, '2号线', 3302, '宁波');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 175, '3号线/宁奉城际', 3302, '宁波');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 176, '1号线', 3202, '无锡');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 177, '2号线', 3202, '无锡');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 178, '2号线', 3702, '青岛');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 179, '3号线', 3702, '青岛');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 180, '11号线', 3702, '青岛');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 181, '13号线', 3702, '青岛');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 182, '1号线', 3601, '南昌');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 183, '2号线', 3601, '南昌');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 184, '1号线', 3501, '福州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 185, '2号线', 3501, '福州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 186, '2号线', 4419, '东莞');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 187, '1号线', 4501, '南宁');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 188, '2号线', 4501, '南宁');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 189, '3号线', 4501, '南宁');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 190, '1号线', 3401, '合肥');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 191, '2号线', 3401, '合肥');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 192, '3号线', 3401, '合肥');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 193, '1号线', 5201, '贵阳');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 194, '1号线', 3502, '厦门');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 195, '2号线', 3502, '厦门');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 196, '1号线', 2301, '哈尔滨');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 197, '3号线', 2301, '哈尔滨');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 198, '1号线', 1301, '石家庄');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 199, '3号线', 1301, '石家庄');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 200, '1号线', 6501, '乌鲁木齐');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 201, 'S1线', 3303, '温州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 202, '1号线', 3701, '济南');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 203, '3号线', 3701, '济南');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 204, '1号线', 6201, '兰州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 205, '1号线', 3204, '常州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 206, '1号线', 3203, '徐州');
INSERT INTO `subway` VALUES ('2020-11-15 18:02:54', '2020-11-15 18:02:54', 207, '1号线', 1501, '呼和浩特');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` char(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `emailVerified` int(11) NOT NULL DEFAULT 0,
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `mobileVerified` int(11) NOT NULL DEFAULT 0,
  `gender` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `self_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '自我介绍',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username`) USING BTREE,
  UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`(`email`) USING BTREE,
  UNIQUE INDEX `IDX_29fd51e9cf9241d022c5a4e02e`(`mobile`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2019-08-25 14:50:35', '2019-11-06 23:10:26', '33d11ca6-8050-4d3e-9dcb-74bec03b36ff', 'guest', 'e10adc3949ba59abbe56e057f20f883e', NULL, 0, '13222222222', 0, '0', NULL, NULL);
INSERT INTO `user` VALUES ('2019-08-17 11:58:53', '2019-12-22 17:54:26', '491446a5-5df3-4ae1-b44a-7a0fcce98453', 'superAdmin', 'e10adc3949ba59abbe56e057f20f883e', 'kk597@sina.com', 1, '14788888888', 1, '1', '0b674fe76102a4e0488ce3e2e3bc605e/avatar/1575541437354.png', '我是个人简介');
INSERT INTO `user` VALUES ('2019-08-25 14:50:46', '2019-12-05 19:09:15', 'ace64f4d-c83b-4de2-96fd-09fd778f9296', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin@admin.com', 0, NULL, 0, '0', 'logo.png', NULL);
INSERT INTO `user` VALUES ('2020-11-15 23:07:45', '2019-08-24 21:58:28', 'cc21d2f5-f4fb-48c1-92ad-ee1230ccb2c6', 'yeojongki', 'e10adc3949ba59abbe56e057f20f883e', NULL, 0, NULL, 0, '0', NULL, NULL);

-- ----------------------------
-- Table structure for user_role
-- ----------------------------
DROP TABLE IF EXISTS `user_role`;
CREATE TABLE `user_role`  (
  `role_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`role_id`, `user_id`) USING BTREE,
  INDEX `IDX_32a6fc2fcb019d8e3a8ace0f55`(`role_id`) USING BTREE,
  INDEX `IDX_d0e5815877f7395a198a4cb0a4`(`user_id`) USING BTREE,
  CONSTRAINT `FK_32a6fc2fcb019d8e3a8ace0f55f` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `FK_d0e5815877f7395a198a4cb0a46` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user_role
-- ----------------------------
INSERT INTO `user_role` VALUES ('10dc1736-69b4-4193-b59e-51d8360ffe17', '33d11ca6-8050-4d3e-9dcb-74bec03b36ff');
INSERT INTO `user_role` VALUES ('1789cb3f-7ec1-4c8e-a7aa-72a8e3e49ee1', 'cc21d2f5-f4fb-48c1-92ad-ee1230ccb2c6');
INSERT INTO `user_role` VALUES ('4b7f2859-cc69-4781-ae40-2e8dc13aa21c', 'ace64f4d-c83b-4de2-96fd-09fd778f9296');
INSERT INTO `user_role` VALUES ('9adf12e6-079e-4695-aab8-6e19cbe1082e', '491446a5-5df3-4ae1-b44a-7a0fcce98453');

SET FOREIGN_KEY_CHECKS = 1;
