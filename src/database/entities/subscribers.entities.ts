import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class Subscribers {

    @PrimaryGeneratedColumn()
    id!: string

    @Column({ type: 'varchar'})
    email!: string

    @Column({ type: 'varchar'})
    firstName!: string

    @Column({ type: 'varchar'})
    lastName!: string

    @CreateDateColumn()
    createdAt!: Date
}

export default Subscribers