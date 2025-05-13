import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Admin from "./admin.entities";

@Entity()

class Reports {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string
    
    @Column({ type: 'varchar'})
    title!: string

    @Column({type: 'varchar'})
    fileUrl!: string
                            
    @Column({type: 'varchar'})
    section!: string

    @ManyToOne(()=> Admin, admin => admin.reports, { cascade: true, onDelete: 'CASCADE'} )
    createdBy!: Admin

    @CreateDateColumn()
    createdAt!: Date

}

export default Reports