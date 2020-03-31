import {MigrationInterface, QueryRunner} from "typeorm";

export class bookEntityAdded1585685672687 implements MigrationInterface {
    name = 'bookEntityAdded1585685672687'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying(500) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users_books_books" ("usersId" integer NOT NULL, "booksId" integer NOT NULL, CONSTRAINT "PK_b8d511491d9455cc79cf593a447" PRIMARY KEY ("usersId", "booksId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b9bbcf2f5d44ae9d0ed1c8f1bd" ON "users_books_books" ("usersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ca5d98ba04edb903ab679a01d3" ON "users_books_books" ("booksId") `, undefined);
        await queryRunner.query(`ALTER TABLE "users_books_books" ADD CONSTRAINT "FK_b9bbcf2f5d44ae9d0ed1c8f1bd7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users_books_books" ADD CONSTRAINT "FK_ca5d98ba04edb903ab679a01d3e" FOREIGN KEY ("booksId") REFERENCES "books"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_books_books" DROP CONSTRAINT "FK_ca5d98ba04edb903ab679a01d3e"`, undefined);
        await queryRunner.query(`ALTER TABLE "users_books_books" DROP CONSTRAINT "FK_b9bbcf2f5d44ae9d0ed1c8f1bd7"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ca5d98ba04edb903ab679a01d3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b9bbcf2f5d44ae9d0ed1c8f1bd"`, undefined);
        await queryRunner.query(`DROP TABLE "users_books_books"`, undefined);
        await queryRunner.query(`DROP TABLE "books"`, undefined);
    }

}
