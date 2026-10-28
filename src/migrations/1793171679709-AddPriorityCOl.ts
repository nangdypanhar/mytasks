import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPriorityCOl1793171679709 implements MigrationInterface {
    name = 'AddPriorityCOl1793171679709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" ADD "priority" boolean NOT NULL DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "task" DROP COLUMN "priority"`);
    }

}
