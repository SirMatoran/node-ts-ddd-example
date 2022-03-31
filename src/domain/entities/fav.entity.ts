import { Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity()
export class Fav {
    @PrimaryColumn('int')
    user_id!: number

    @Column()
    flight_number!: number
}
