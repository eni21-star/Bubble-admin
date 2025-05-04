import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class Subscribers {

    @PrimaryGeneratedColumn()
    id!: string

    @Column({ type: 'varchar'})
    email!: string

    @CreateDateColumn()
    createdAt!: Date
}

export default Subscribers