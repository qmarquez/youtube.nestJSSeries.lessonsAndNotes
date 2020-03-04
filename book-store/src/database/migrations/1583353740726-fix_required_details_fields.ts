import {MigrationInterface, QueryRunner} from "typeorm";

export class fixRequiredDetailsFields1583353740726 implements MigrationInterface {
    name = 'fixRequiredDetailsFields1583353740726'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "name" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "name" SET NOT NULL`, undefined);
    }

}
