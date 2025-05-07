import { IsNotEmpty, isString, IsString } from "class-validator";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Images from "./images.entities";

@Entity()
class Incidents {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({ type: 'varchar'})
    insuredName!: string

    @Column({ type: 'varchar'})
    policyNumber!: string

    @Column({ type: 'text'})
    description!: string

    @Column({ type: 'text'})
    imageUrl!: string
    
    @CreateDateColumn()
    createdAt!: Date

}

export default Incidents