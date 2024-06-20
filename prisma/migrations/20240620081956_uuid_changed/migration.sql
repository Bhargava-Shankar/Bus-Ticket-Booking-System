-- DropIndex
DROP INDEX `User_userId_key` ON `user`;

-- AlterTable
ALTER TABLE `user` ADD PRIMARY KEY (`userId`);
