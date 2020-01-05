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

 Date: 01/01/2020 18:14:34
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
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '中文名称',
  `pinyin` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '拼音名称',
  `code` int(11) NOT NULL COMMENT '城市code',
  `pre` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '拼音前缀',
  `status` int(11) NOT NULL DEFAULT 0 COMMENT '是否开通 0 未开通 1 已开通',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of city
-- ----------------------------
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 15:06:15', 1, '北京市', 'beijing', 131, 'bj', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-11-23 23:45:47', 2, '上海市', 'shanghai', 289, 'shh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-05 02:18:01', 3, '广州市', 'guangzhou', 257, 'gzh', 1);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 4, '深圳市', 'shenzhen', 340, 'szh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 5, '重庆市', 'chongqing', 132, 'chq', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 6, '天津市', 'tianjin', 332, 'tj', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 7, '石家庄市', 'shijiazhuang', 150, 'shjzh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 8, '南京市', 'nanjing', 315, 'nj', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 9, '成都市', 'chengdu', 75, 'chd', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 10, '沈阳市', 'shenyang', 58, 'shy', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 11, '杭州市', 'hangzhou', 179, 'hzh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 12, '武汉市', 'wuhan', 218, 'wh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 13, '长沙市', 'changsha', 158, 'cs', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 14, '苏州市', 'suzhou', 224, 'suz', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 15, '大连市', 'dalian', 167, 'dl', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 16, '长春市', 'changchun', 53, 'chc', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 17, '西安市', 'xian', 233, 'xian', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 18, '昆明市', 'kunming', 104, 'km', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 19, '佛山市', 'foshan', 138, 'fsh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 20, '哈尔滨市', 'haerbin', 48, 'hrb', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 21, '郑州市', 'zhengzhou', 268, 'zhzh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 22, '宁波市', 'ningbo', 180, 'nbo', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 23, '无锡市', 'wuxi', 317, 'wuxi', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 24, '青岛市', 'qingdao', 236, 'qd', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 25, '南昌市', 'nanchang', 163, 'nanchang', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 26, '福州市', 'fuzhou', 300, 'fuzhou', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 27, '东莞市', 'dongguan', 119, 'dongguan', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 28, '南宁市', 'nanning', 261, 'nanning', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 29, '合肥市', 'hefei', 127, 'hefei', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 30, '厦门市', 'xiamen', 194, 'xiamen', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 31, '香港特别行政区', 'hongkong', 2912, 'hk', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 32, '台北市', 'taibei', 9002, 'shh', 0);
INSERT INTO `city` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 33, '高雄市', 'gaoxiong', 9019, 'cs', 0);

-- ----------------------------
-- Table structure for house
-- ----------------------------
DROP TABLE IF EXISTS `house`;
CREATE TABLE `house`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '标题',
  `content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '内容详情',
  `imgs` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '' COMMENT '图片列表1',
  `status` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0' COMMENT '状态',
  `comment_count` int(11) NOT NULL DEFAULT 0 COMMENT '评论数',
  `click_count` int(11) NOT NULL DEFAULT 0 COMMENT '点击数',
  `like_count` int(11) NOT NULL DEFAULT 0 COMMENT '点赞数',
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `cityId` int(11) NULL DEFAULT NULL,
  `subwayId` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_66ced5049503a82d736c336b4cf`(`userId`) USING BTREE,
  INDEX `FK_4fac8b0770dac18ba475634cdc6`(`cityId`) USING BTREE,
  INDEX `FK_b194bb1a2efe39cf7470e099c28`(`subwayId`) USING BTREE,
  CONSTRAINT `FK_4fac8b0770dac18ba475634cdc6` FOREIGN KEY (`cityId`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_66ced5049503a82d736c336b4cf` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_b194bb1a2efe39cf7470e099c28` FOREIGN KEY (`subwayId`) REFERENCES `subway` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of house
-- ----------------------------
INSERT INTO `house` VALUES ('2019-11-06 21:17:22', '2019-12-05 17:33:45', '89d892f8-6a9a-467d-b7b0-23e5c47d04e2', '1234', 'asdasd', '0b674fe76102a4e0488ce3e2e3bc605e/1573983857390.png,0b674fe76102a4e0488ce3e2e3bc605e/1574182466101.png,0b674fe76102a4e0488ce3e2e3bc605e/house/1575537076788.gif', '0', 0, 0, 0, NULL, NULL, NULL);

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
INSERT INTO `role_permission` VALUES ('106b2de4-7423-48a0-ad3c-f585928d1d25', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('187ce680-4388-4096-8894-1274777bc056', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('1c5008c8-5dcc-41de-9f69-60873424f216', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('2b8f8412-acad-447a-9b5a-a5ccb2001990', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('33418f6e-0c17-48ab-9e7e-415716bf63d2', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('4add5c1b-972e-41d7-99d5-2060868acb24', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('561311a8-e37f-415d-8a62-4e06a9a3a0bc', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('6c5652bd-073e-4faf-99a9-26eeadeb9f2b', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('6e611ae7-fd20-44a9-935b-43574b2bbd3e', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('70413f64-7aae-45a1-8742-4b07da967404', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('7cf99844-e99b-409f-aef9-924aa3a06a3b', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('8610715e-830a-4181-be8f-7f4b6f751559', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('a41d8e7c-2707-48d8-8dbd-50d6b2f66bed', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('b2df8029-b41b-4fb1-9948-30714dac0892', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('b894f1fa-ed74-4368-8666-18b971809efb', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('c23cfc33-05e7-47e8-8434-f20da372149c', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('ca8ab26d-0637-42d0-b61b-3f671ef958f3', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('cdf2372c-31ec-42f1-b552-fb58e9f124fb', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('d6c57cba-04bb-4e50-8893-120e4276698b', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e06ea503-4bb3-4ec3-a58b-d86825ce2fec', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e1bb48eb-29f0-4b06-97dc-31e06f923256', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e2ceb8b7-deaf-49e6-8ce2-bde931ae5bc2', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('e5575e16-c92a-4432-917e-e9a51fce47d7', '9adf12e6-079e-4695-aab8-6e19cbe1082e');
INSERT INTO `role_permission` VALUES ('eaa57ea0-a2ea-43d7-bfcc-1d7805bc94b4', '9adf12e6-079e-4695-aab8-6e19cbe1082e');

-- ----------------------------
-- Table structure for subway
-- ----------------------------
DROP TABLE IF EXISTS `subway`;
CREATE TABLE `subway`  (
  `created_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '城市名称',
  `city_id` int(11) NOT NULL COMMENT '城市名称',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_e85914334f53a2824b96f4b42b9`(`city_id`) USING BTREE,
  CONSTRAINT `FK_e85914334f53a2824b96f4b42b9` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 385 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subway
-- ----------------------------
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 1, '地铁16号线(西苑-北安河)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 2, '地铁s1线(石厂-金安桥)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 3, '地铁燕房线(阎村东-燕山)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 4, '西郊线(香山-巴沟)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 5, '地铁s1线(金安桥-石厂)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 6, '地铁15号线(清华东路西口-俸伯)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 7, '地铁8号线(南锣鼓巷-朱辛庄)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 8, '地铁15号线(俸伯-清华东路西口)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 9, '地铁14号线东段(北京南站-善各庄)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 10, '地铁14号线西段(西局-张郭庄)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 11, '地铁昌平线(昌平西山口-西二旗)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 12, '地铁14号线东段(善各庄-北京南站)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 13, '地铁昌平线(西二旗-昌平西山口)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 14, '房山线(郭公庄-阎村东)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 15, '地铁4号线大兴线(安河桥北-天宫院)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 16, '地铁7号线(焦化厂-北京西站)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 17, '亦庄线(次渠-宋家庄)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 18, '地铁9号线(国家图书馆-郭公庄)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 19, '亦庄线(宋家庄-次渠)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 20, '地铁14号线西段(张郭庄-西局)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 21, '地铁6号线(海淀五路居-潞城)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 22, '地铁9号线(郭公庄-国家图书馆)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 23, '房山线(阎村东-郭公庄)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 24, '地铁6号线(潞城-海淀五路居)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 25, '地铁4号线大兴线(天宫院-安河桥北)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 26, '地铁7号线(北京西站-焦化厂)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 27, '地铁8号线(朱辛庄-南锣鼓巷)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 28, '西郊线(巴沟-香山)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 29, '地铁燕房线(燕山-阎村东)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 30, '地铁16号线(北安河-西苑)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 31, '地铁2号线(内环(积水潭-积水潭))', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 32, '机场线(东直门-东直门)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 33, '地铁1号线(苹果园-四惠东)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 34, '地铁5号线(宋家庄-天通苑北)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 35, '地铁1号线(四惠东-苹果园)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 36, '八通线(土桥-四惠)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 37, '地铁10号线(外环(巴沟-巴沟))', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 38, '地铁2号线(外环(西直门-西直门))', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 39, '地铁5号线(天通苑北-宋家庄)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 40, '地铁13号线(东直门-西直门)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 41, '地铁10号线(内环(车道沟-车道沟))', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 42, '八通线(四惠-土桥)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 43, '地铁13号线(西直门-东直门)', 1);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 44, '轨道交通浦江线(沈杜公路-汇臻路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 45, '地铁8号线(市光路-沈杜公路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 46, '地铁13号线(金运路-世博大道)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 47, '地铁9号线(曹路-松江南站)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 48, '地铁1号线(莘庄-富锦路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 49, '地铁2号线(徐泾东-广兰路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 50, '地铁7号线(花木路-美兰湖)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 51, '地铁3号线(江杨北路-上海南站)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 52, '地铁8号线(沈杜公路-市光路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 53, '地铁6号线(港城路-东方体育中心)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 54, '地铁9号线(松江南站-曹路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 55, '地铁6号线(东方体育中心-港城路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 56, '地铁10号线(虹桥火车站-新江湾城)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 57, '地铁2号线东延伸段(广兰路-浦东国际机场)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 58, '地铁12号线(七莘路-金海路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 59, '地铁7号线(美兰湖-花木路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 60, '地铁10号线(新江湾城-虹桥火车站)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 61, '地铁5号线(闵行开发区-莘庄)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 62, '地铁16号线(龙阳路-滴水湖)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 63, '地铁16号线(滴水湖-龙阳路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 64, '地铁4号线(内圈(宜山路-宜山路))', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 65, '地铁11号线(嘉定北-迪士尼)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 66, '地铁10号线(航中路-新江湾城)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 67, '地铁12号线(金海路-七莘路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 68, '地铁11号线(迪士尼-嘉定北)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 69, '磁悬浮(龙阳路-浦东国际机场)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 70, '地铁10号线(新江湾城-航中路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 71, '地铁11号线(迪士尼-花桥)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 72, '地铁4号线(外圈(宜山路-宜山路))', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 73, '地铁11号线(花桥-迪士尼)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 74, '地铁2号线(广兰路-徐泾东)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 75, '地铁5号线(莘庄-闵行开发区)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 76, '地铁2号线东延伸段(浦东国际机场-广兰路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 77, '地铁1号线(富锦路-莘庄)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 78, '地铁3号线(上海南站-江杨北路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 79, '地铁13号线(世博大道-金运路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 80, '磁悬浮(浦东国际机场-龙阳路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 81, '轨道交通17号线(东方绿舟-虹桥火车站)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 82, '轨道交通17号线(虹桥火车站-东方绿舟)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 83, '轨道交通浦江线(汇臻路-沈杜公路)', 2);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 84, '地铁7号线(广州南站-大学城南)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 85, '地铁9号线(高增-飞鹅岭)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 86, '地铁13号线(新沙-鱼珠)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 87, '地铁6号线(香雪-浔峰岗)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 88, '地铁6号线(浔峰岗-香雪)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 89, '地铁7号线(大学城南-广州南站)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 90, '知识城线(新和-镇龙)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 91, '知识城线(镇龙-新和)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 92, '地铁9号线(飞鹅岭-高增)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 93, '地铁13号线(鱼珠-新沙)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 94, '地铁2号线(广州南站-嘉禾望岗)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 95, '地铁4号线(南沙客运港-黄村)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 96, '地铁3号线(番禺广场-天河客运站)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 97, '地铁1号线(西朗-广州东站)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 98, '地铁5号线(文冲-滘口)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 99, '地铁4号线(黄村-南沙客运港)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 100, 'apm线(林和西-广州塔)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 101, '广佛线(燕岗-新城东)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 102, '地铁8号线(凤凰新村-万胜围)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 103, '地铁1号线(广州东站-西朗)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 104, '广佛线(新城东-燕岗)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 105, '地铁8号线(万胜围-凤凰新村)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 106, '地铁3号线(天河客运站-番禺广场)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 107, '地铁2号线(嘉禾望岗-广州南站)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 108, '地铁3号线北延段(体育西路-机场北(2号航站楼))', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 109, '地铁5号线(滘口-文冲)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 110, '地铁3号线北延段(机场北(2号航站楼)-体育西路)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 111, 'apm线(广州塔-林和西)', 3);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 112, '7号线(太安-西丽湖)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 113, '9号线(红树湾南-文锦)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 114, '7号线(西丽湖-太安)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 115, '11号线(福田-碧头)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 116, '9号线(文锦-红树湾南)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 117, '11号线(碧头-福田)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 118, '1号线(罗宝线)(罗湖-机场东)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 119, '1号线(罗宝线)(机场东-罗湖)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 120, '4号线(龙华线)(福田口岸-清湖)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 121, '4号线(龙华线)(清湖-福田口岸)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 122, '2号线(蛇口线)(赤湾-新秀)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 123, '2号线(蛇口线)(新秀-赤湾)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 124, '3号线(龙岗线)(益田-双龙)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 125, '5号线(环中线)(黄贝岭-前海湾)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 126, '5号线(环中线)(前海湾-黄贝岭)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 127, '3号线(龙岗线)(双龙-益田)', 4);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 128, '轨道交通5号线(园博中心-大龙山)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 129, '轨道交通3号线北延伸线(举人坝-碧津)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 130, '轨道交通3号线北延伸线(碧津-举人坝)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 131, '轨道交通10号线(鲤鱼池-王家庄)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 132, '国博线(礼嘉-悦来)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 133, '轨道交通2号线(较场口-鱼洞)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 134, '轨道交通3号线(鱼洞-江北机场t2航站楼)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 135, '轨道交通3号线(江北机场t2航站楼-鱼洞)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 136, '轨道交通2号线(鱼洞-较场口)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 137, '轨道交通1号线(尖顶坡-小什字)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 138, '轨道交通6号线(北碚-茶园)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 139, '轨道交通1号线(小什字-尖顶坡)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 140, '国博线(悦来-礼嘉)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 141, '轨道交通6号线(茶园-北碚)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 142, '轨道交通5号线(大龙山-园博中心)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 143, '轨道交通10号线(王家庄-鲤鱼池)', 5);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 144, '地铁6号线(梅林路-南孙庄)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 145, '地铁6号线(南孙庄-梅林路)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 146, '地铁3号线(南站-小淀)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 147, '地铁3号线(小淀-南站)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 148, '地铁2号线(滨海国际机场-曹庄)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 149, '地铁2号线(曹庄-滨海国际机场)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 150, '津滨轻轨地铁9号线(东海路-天津站)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 151, '地铁1号线(财经大学-刘园)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 152, '地铁1号线(刘园-财经大学)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 153, '津滨轻轨地铁9号线(天津站-东海路)', 6);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 154, '地铁3号线(石家庄站-市二中)', 7);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 155, '地铁1号线(洨河大道-西王)', 7);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 156, '地铁1号线(西王-洨河大道)', 7);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 157, '地铁3号线(市二中-石家庄站)', 7);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 158, '地铁s9号线(高淳-翔宇路南)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 159, '地铁s3号线(高家冲-南京南站)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 160, '地铁s7号线(无想山-空港新城江宁)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 161, '地铁4号线(龙江-仙林湖)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 162, '地铁s9号线(翔宇路南-高淳)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 163, '地铁4号线(仙林湖-龙江)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 164, '地铁s7号线(空港新城江宁-无想山)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 165, '地铁2号线(经天路-油坊桥)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 166, '地铁s8号线(金牛湖-泰山新村)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 167, '地铁3号线(秣周东路-林场)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 168, '地铁s1号线(空港新城江宁-南京南站)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 169, '地铁3号线(林场-秣周东路)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 170, '地铁s8号线(泰山新村-金牛湖)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 171, '地铁1号线(迈皋桥-中国药科大学)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 172, '地铁10号线(雨山路-安德门)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 173, '地铁s1号线(南京南站-空港新城江宁)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 174, '地铁2号线(油坊桥-经天路)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 175, '地铁1号线(中国药科大学-迈皋桥)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 176, '地铁10号线(安德门-雨山路)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 177, '地铁s3号线(南京南站-高家冲)', 8);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 178, '地铁10号线(双流机场2航站楼-太平园)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 179, '地铁4号线(万盛-西河)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 180, '地铁7号线(内环(崔家店-崔家店))', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 181, '地铁4号线(西河-万盛)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 182, '地铁1号线(五根松-韦家碾)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 183, '地铁3号线(太平园-军区总医院)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 184, '地铁3号线(军区总医院-太平园)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 185, '地铁2号线(犀浦-龙泉驿)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 186, '地铁1号线(科学城-韦家碾)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 187, '地铁2号线(龙泉驿-犀浦)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 188, '地铁1号线(韦家碾-科学城)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 189, '地铁7号线(外环(崔家店-崔家店))', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 190, '地铁10号线(太平园-双流机场2航站楼)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 191, '地铁1号线(韦家碾-五根松)', 9);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 192, '地铁1号线(黎明广场-十三号街)', 10);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 193, '地铁2号线(全运路-蒲田路)', 10);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 194, '地铁2号线(蒲田路-全运路)', 10);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 195, '地铁1号线(十三号街-黎明广场)', 10);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 196, '地铁4号线(浦沿-彭埠)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 197, '地铁4号线(彭埠-浦沿)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 198, '地铁2号线(朝阳-良渚)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 199, '地铁2号线(良渚-朝阳)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 200, '地铁1号线(湘湖-临平)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 201, '地铁1号线(临平-湘湖)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 202, '地铁1号线(下沙江滨-湘湖)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 203, '地铁1号线(湘湖-下沙江滨)', 11);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 204, '阳逻线(金台-后湖大道)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 205, '阳逻线(后湖大道-金台)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 206, '轨道交通2号线(天河机场-光谷广场)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 207, '轨道交通2号线(光谷广场-天河机场)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 208, '轨道交通6号线(东风公司-金银湖公园)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 209, '轨道交通8号线(梨园-金潭路)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 210, '轨道交通1号线(汉口北-径河)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 211, '轨道交通4号线(黄金口-武汉火车站)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 212, '轨道交通4号线(武汉火车站-黄金口)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 213, '轨道交通1号线(径河-汉口北)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 214, '轨道交通3号线(宏图大道-沌阳大道)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 215, '轨道交通6号线(金银湖公园-东风公司)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 216, '轨道交通3号线(沌阳大道-宏图大道)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 217, '轨道交通8号线(金潭路-梨园)', 12);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 218, '地铁1号线(开福区政府-尚双塘)', 13);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 219, '磁浮快线(磁浮机场站-磁浮高铁站)', 13);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 220, '磁浮快线(磁浮高铁站-磁浮机场站)', 13);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 221, '地铁2号线(梅溪湖西-光达)', 13);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 222, '地铁2号线(光达-梅溪湖西)', 13);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 223, '地铁1号线(尚双塘-开福区政府)', 13);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 224, '地铁4号线支线(木里-红庄)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 225, '地铁4号线(同里-龙道浜)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 226, '地铁4号线支线(红庄-木里)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 227, '地铁11号线(花桥-迪士尼)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 228, '地铁2号线(桑田岛-骑河)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 229, '地铁2号线(骑河-桑田岛)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 230, '地铁11号线(迪士尼-花桥)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 231, '地铁4号线(龙道浜-同里)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 232, '地铁1号线(木渎-钟南街)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 233, '地铁1号线(钟南街-木渎)', 14);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 234, '地铁2号线(海之韵-辛寨子)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 235, '地铁12号线(河口-旅顺新港)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 236, '地铁1号线(河口-姚家)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 237, '地铁12号线(旅顺新港-河口)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 238, '地铁1号线(姚家-河口)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 239, '地铁2号线(辛寨子-海之韵)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 240, '地铁3号线九里支线(开发区-九里)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 241, '地铁3号线(金石滩-大连火车站)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 242, '地铁3号线保税区线(大连火车站-保税区)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 243, '地铁3号线九里线(九里-大连火车站)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 244, '地铁3号线保税区线(保税区-大连火车站)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 245, '地铁3号线九里线(大连火车站-九里)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 246, '地铁3号线九里支线(九里-开发区)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 247, '地铁3号线(大连火车站-金石滩)', 15);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 248, '地铁1号线(红嘴子-北环城路)', 16);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 249, '地铁1号线(北环城路-红嘴子)', 16);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 250, '轻轨3号线(长春站-长影世纪城)', 16);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 251, '轻轨4号线(车场-长春站北)', 16);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 252, '轻轨3号线(长影世纪城-长春站)', 16);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 253, '轻轨4号线(长春站北-车场)', 16);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 254, '地铁3号线(鱼化寨-保税区)', 17);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 255, '地铁1号线(后卫寨-纺织城)', 17);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 256, '地铁1号线(纺织城-后卫寨)', 17);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 257, '地铁3号线(保税区-鱼化寨)', 17);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 258, '地铁2号线(北客站-韦曲南)', 17);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 259, '地铁2号线(韦曲南-北客站)', 17);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 260, '地铁1号线支线(昆明南火车站-春融街)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 261, '地铁3号线(东部汽车站-西山公园)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 262, '地铁1号线(环城南路-大学城南)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 263, '地铁2号线(环城南路-北部汽车站)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 264, '地铁1号线(大学城南-环城南路)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 265, '地铁2号线(北部汽车站-环城南路)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 266, '地铁1号线支线(春融街-昆明南火车站)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 267, '地铁3号线(西山公园-东部汽车站)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 268, '地铁6号线(机场中心-东部汽车站)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 269, '地铁6号线(东部汽车站-机场中心)', 18);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 270, '广佛线(燕岗-新城东)', 19);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 271, '广佛线(新城东-燕岗)', 19);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 272, '地铁1号线(哈东站-哈南站)', 20);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 273, '地铁1号线(哈南站-哈东站)', 20);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 274, '地铁3号线(哈尔滨西站-医大二院)', 20);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 275, '地铁3号线(医大二院-哈尔滨西站)', 20);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 276, '城郊线(南四环-新郑机场)', 21);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 277, '地铁2号线(刘庄-南四环)', 21);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 278, '地铁2号线(南四环-刘庄)', 21);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 279, '地铁1号线(河南工业大学-文苑北路)', 21);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 280, '地铁1号线(文苑北路-河南工业大学)', 21);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 281, '城郊线(新郑机场-南四环)', 21);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 282, '地铁1号线(霞浦-高桥西)', 22);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 283, '地铁2号线(栎社国际机场-清水浦)', 22);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 284, '地铁1号线(高桥西-霞浦)', 22);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 285, '地铁2号线(清水浦-栎社国际机场)', 22);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 286, '地铁1号线(堰桥-长广溪)', 23);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 287, '地铁2号线(梅园开原寺-无锡东站)', 23);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 288, '地铁1号线(长广溪-堰桥)', 23);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 289, '地铁2号线(无锡东站-梅园开原寺)', 23);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 290, '地铁3号线(青岛北站-青岛站)', 24);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 291, '地铁11号线(苗岭路-钱谷山)', 24);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 292, '地铁3号线(青岛站-青岛北站)', 24);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 293, '地铁2号线(李村公园-芝泉路)', 24);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 294, '地铁11号线(钱谷山-苗岭路)', 24);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 295, '地铁2号线(芝泉路-李村公园)', 24);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 296, '轨道交通1号线(瑶湖西-双港)', 25);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 297, '轨道交通2号线(南路-地铁大厦)', 25);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 298, '轨道交通1号线(双港-瑶湖西)', 25);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 299, '轨道交通2号线(地铁大厦-南路)', 25);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 300, '地铁1号线(象峰-福州火车南站)', 26);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 301, '地铁1号线(福州火车南站-象峰)', 26);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 302, '地铁2号线(虎门火车站-东莞火车站)', 27);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 303, '地铁2号线(东莞火车站-虎门火车站)', 27);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 304, '地铁2号线(西津-玉洞)', 28);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 305, '地铁1号线(火车东站-石埠)', 28);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 306, '地铁1号线(石埠-火车东站)', 28);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 307, '地铁2号线(玉洞-西津)', 28);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 308, '地铁1号线(合肥火车站-九联圩)', 29);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 309, '地铁2号线(三十埠-南岗)', 29);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 310, '地铁1号线(九联圩-合肥火车站)', 29);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 311, '地铁2号线(南岗-三十埠)', 29);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 312, '地铁1号线(镇海路-岩内)', 30);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 313, '地铁1号线(岩内-镇海路)', 30);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 314, '505(三圣-兆康)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 315, '505(兆康-三圣)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 316, '507(田景-屯门码头)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 317, '507(屯门码头-田景)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 318, '610(屯门码头-元朗)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 319, '610(元朗-屯门码头)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 320, '614(屯门码头-元朗)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 321, '614(元朗-屯门码头)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 322, '614p(兆康-屯门码头)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 323, '614p(屯门码头-兆康)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 324, '615(屯门码头-元朗)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 325, '615(元朗-屯门码头)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 326, '615p(屯门码头-兆康)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 327, '615p(兆康-屯门码头)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 328, '705(天水围-天水围)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 329, '706(天水围-天水围)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 330, '751(天逸-友爱)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 331, '751(友爱-天逸)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 332, '761p(天逸-元朗)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 333, '761p(元朗-天逸)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 334, '南港岛线(海怡半岛-金钟)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 335, '南港岛线(金钟-海怡半岛)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 336, '迪士尼线(欣澳-迪士尼)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 337, '迪士尼线(迪士尼-欣澳)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 338, '东涌线(东涌-香港)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 339, '东涌线(香港-东涌)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 340, '港岛线(坚尼地城-柴湾)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 341, '港岛线(柴湾-坚尼地城)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 342, '观塘线(调景岭-黄埔)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 343, '观塘线(黄埔-调景岭)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 344, '机场快线(香港-博览馆)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 345, '机场快线(博览馆-香港)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 346, '将军澳线(北角-宝琳)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 347, '将军澳线(宝琳-北角)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 348, '将军澳线(北角-康城)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 349, '将军澳线(康城-北角)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 350, '荃湾线(中环-荃湾)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 351, '荃湾线(荃湾-中环)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 352, '东铁线(红磡-落马洲)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 353, '东铁线(落马洲-红磡)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 354, '东铁线(罗湖-红磡)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 355, '东铁线(红磡-罗湖)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 356, '马鞍山线(大围-乌溪沙)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 357, '马鞍山线(乌溪沙-大围)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 358, '西铁线(红磡-屯门)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 359, '西铁线(屯门-红磡)', 31);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 360, 'BL板南线(顶埔-南港展览馆)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 361, '小碧潭线(七张-小碧潭)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 362, 'O中和新芦线(南势角-芦洲)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 363, 'A桃园机场捷运直达车(机场第二航厦-台北车站)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 364, '猫空缆车(猫空站-动物园站)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 365, 'O中和新芦线(南势角-回龙)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 366, 'BR文湖线(动物园-南港展览馆)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 367, '猫空缆车(动物园站-猫空站)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 368, '新北投线(新北投-北投)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 369, 'A桃园机场捷运普通车(环北-台北车站)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 370, 'O中和新芦线(回龙-南势角)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 371, 'G松山新店线(新店-松山)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 372, 'BR文湖线(南港展览馆-动物园)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 373, 'R淡水信义线(象山-淡水)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 374, '小碧潭线(小碧潭-七张)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 375, 'BL板南线(南港展览馆-顶埔)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 376, 'O中和新芦线(芦洲-南势角)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 377, 'G松山新店线(松山-新店)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 378, 'R淡水信义线(淡水-象山)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 379, '新北投线(北投-新北投)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 380, 'A桃园机场捷运直达车(台北车站-机场第二航厦)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 381, 'A桃园机场捷运普通车(台北车站-环北)', 32);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 382, '红线(南冈山-小港)', 33);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 383, '橘线(大寮-西子湾)', 33);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 384, '橘线(西子湾-大寮)', 33);
INSERT INTO `subway` VALUES ('2019-10-04 11:34:15', '2019-10-04 11:34:15', 385, '红线(小港-南冈山)', 33);

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
  `mobile` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `gender` enum('0','1','2') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `self_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL COMMENT '自我介绍',
  `emailVerified` int(11) NOT NULL DEFAULT 0,
  `mobileVerified` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username`) USING BTREE,
  UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2`(`email`) USING BTREE,
  UNIQUE INDEX `IDX_29fd51e9cf9241d022c5a4e02e`(`mobile`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2019-08-25 14:50:35', '2019-11-06 23:10:26', '33d11ca6-8050-4d3e-9dcb-74bec03b36ff', 'guest', 'e10adc3949ba59abbe56e057f20f883e', '', '13222222222', '0', NULL, NULL, 0, 0);
INSERT INTO `user` VALUES ('2019-08-17 11:58:53', '2019-12-22 17:54:26', '491446a5-5df3-4ae1-b44a-7a0fcce98453', 'superAdmin', 'e10adc3949ba59abbe56e057f20f883e', 'kk597@sina.com', '14788888888', '1', '0b674fe76102a4e0488ce3e2e3bc605e/avatar/1575541437354.png', '我是个人简介aadcwz', 1, 0);
INSERT INTO `user` VALUES ('2019-08-25 14:50:46', '2019-12-05 19:09:15', 'ace64f4d-c83b-4de2-96fd-09fd778f9296', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin@admin.com', NULL, '0', 'logo.png', NULL, 0, 0);
INSERT INTO `user` VALUES ('2019-08-24 21:58:28', '2019-08-24 21:58:28', 'cc21d2f5-f4fb-48c1-92ad-ee1230ccb2c6', 'yeojongki', 'e10adc3949ba59abbe56e057f20f883e', NULL, NULL, '1', NULL, NULL, 0, 0);

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
INSERT INTO `user_role` VALUES ('1789cb3f-7ec1-4c8e-a7aa-72a8e3e49ee1', 'ace64f4d-c83b-4de2-96fd-09fd778f9296');
INSERT INTO `user_role` VALUES ('1789cb3f-7ec1-4c8e-a7aa-72a8e3e49ee1', 'cc21d2f5-f4fb-48c1-92ad-ee1230ccb2c6');
INSERT INTO `user_role` VALUES ('9adf12e6-079e-4695-aab8-6e19cbe1082e', '491446a5-5df3-4ae1-b44a-7a0fcce98453');

SET FOREIGN_KEY_CHECKS = 1;
