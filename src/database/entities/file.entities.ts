import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";


@Entity()
class Files {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'jsonb'})
    file!: any

    @CreateDateColumn()
    createdAt!: Date
}


export default Files