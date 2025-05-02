import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";



@Entity()
class Popup {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'varchar'})
    fullName!: string

    @Column({ type: 'varchar'})
    email!: string

    @Column({ type: 'varchar'})
    phoneNumber!: string

    @Column({ type: 'varchar'})
    stateOfResidence!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default Popup