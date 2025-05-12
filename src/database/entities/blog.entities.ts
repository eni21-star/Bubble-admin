import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Admin from "./admin.entities";
import Images from "./images.entities";
import { subsidiaries } from "../../config/subsidiaries.config";


@Entity()
class Blog {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({type: 'varchar'})
    title!: string

    @Column({ type: 'text'})
    content!: string

    @Column({type: 'varchar', enum: subsidiaries })
    subsidiary!: string

    @OneToMany(()=> Images, image => image.blog, { cascade: true, onDelete: 'CASCADE'})
    images!: Images[]

    @ManyToOne(()=> Admin, admin => admin.blogs)
    createdBy!: Admin

    @CreateDateColumn()
    createdAt!: Date
    
    @UpdateDateColumn()
    updatedAt!: Date
}

export default Blog