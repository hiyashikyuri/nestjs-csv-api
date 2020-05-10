import {MigrationInterface, QueryRunner} from "typeorm";

export class addNullAcceptanceToIndustry1589124832710 implements MigrationInterface {
    name = 'addNullAcceptanceToIndustry1589124832710'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` CHANGE `company` `company` varchar(255) NULL DEFAULT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_entity` CHANGE `industry` `industry` varchar(255) NULL DEFAULT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_entity` CHANGE `industry` `industry` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user_entity` CHANGE `company` `company` varchar(255) NULL", undefined);
    }

}
