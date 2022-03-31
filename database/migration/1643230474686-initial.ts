import {MigrationInterface, QueryRunner} from "typeorm";

export class initial1643230474686 implements MigrationInterface {
    name = 'initial1643230474686'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`point\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`package\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`lastname\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`from_point_id\` varchar(36) NULL, \`to_point_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`state\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`packages_states\` (\`package_id\` varchar(36) NOT NULL, \`state_id\` varchar(36) NOT NULL, INDEX \`IDX_be6a243094a6010c283a55e150\` (\`package_id\`), INDEX \`IDX_07cecd4aa457b0a445dc5f5d14\` (\`state_id\`), PRIMARY KEY (\`package_id\`, \`state_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`package\` ADD CONSTRAINT \`FK_c61fcc5b133b1c3c1538f1da67d\` FOREIGN KEY (\`from_point_id\`) REFERENCES \`point\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`package\` ADD CONSTRAINT \`FK_617ab4cfb4929faec9567d30559\` FOREIGN KEY (\`to_point_id\`) REFERENCES \`point\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`packages_states\` ADD CONSTRAINT \`FK_be6a243094a6010c283a55e1505\` FOREIGN KEY (\`package_id\`) REFERENCES \`package\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`packages_states\` ADD CONSTRAINT \`FK_07cecd4aa457b0a445dc5f5d148\` FOREIGN KEY (\`state_id\`) REFERENCES \`point\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`packages_states\` DROP FOREIGN KEY \`FK_07cecd4aa457b0a445dc5f5d148\``);
        await queryRunner.query(`ALTER TABLE \`packages_states\` DROP FOREIGN KEY \`FK_be6a243094a6010c283a55e1505\``);
        await queryRunner.query(`ALTER TABLE \`package\` DROP FOREIGN KEY \`FK_617ab4cfb4929faec9567d30559\``);
        await queryRunner.query(`ALTER TABLE \`package\` DROP FOREIGN KEY \`FK_c61fcc5b133b1c3c1538f1da67d\``);
        await queryRunner.query(`DROP INDEX \`IDX_07cecd4aa457b0a445dc5f5d14\` ON \`packages_states\``);
        await queryRunner.query(`DROP INDEX \`IDX_be6a243094a6010c283a55e150\` ON \`packages_states\``);
        await queryRunner.query(`DROP TABLE \`packages_states\``);
        await queryRunner.query(`DROP TABLE \`state\``);
        await queryRunner.query(`DROP TABLE \`package\``);
        await queryRunner.query(`DROP TABLE \`point\``);
    }

}
