import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDatestamps1583353107366 implements MigrationInterface {
    name = 'fixDatestamps1583353107366'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" SET DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" SET DEFAULT now()`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "roles" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "updated_at" DROP DEFAULT`, undefined);
        await queryRunner.query(`ALTER TABLE "users_details" ALTER COLUMN "created_at" DROP DEFAULT`, undefined);
    }

}
