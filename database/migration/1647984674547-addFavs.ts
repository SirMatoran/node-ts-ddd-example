import {MigrationInterface, QueryRunner} from "typeorm";

export class addFavs1647984674547 implements MigrationInterface {
    name = 'addFavs1647984674547'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`fav\` (\`user_id\` int NOT NULL, \`flight_number\` int NOT NULL, PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`fav\``);
    }

}
