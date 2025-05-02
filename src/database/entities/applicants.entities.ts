import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";




@Entity()
class Applicants {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'varchar'})
    fullName!: string

    @Column({ type: 'varchar'})
    contactNumber!: string

    @Column({ type: 'varchar'})
    email!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
    
}

export default Applicants