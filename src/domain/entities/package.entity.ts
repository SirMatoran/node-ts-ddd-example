import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { Point } from './point.entity'
import { State } from './state.entity'

@Entity()
export class Package {
    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column()
    name!: string

    @Column()
    lastname!: string

    @Column()
    address!: string

    @ManyToOne(() => Point)
    @JoinColumn({ name: 'from_point_id' })
    from_point!: Point

    @ManyToOne(() => Point)
    @JoinColumn({ name: 'to_point_id' })
    to_point!: Point

    @ManyToMany(() => Point)
    @JoinTable({
        name: 'packages_states',
        joinColumn: {
            name: 'package_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'state_id',
            referencedColumnName: 'id',
        },
    })
    states!: State[]

    @CreateDateColumn()
    created_at!: Date

    @UpdateDateColumn()
    updated_at!: Date
}
