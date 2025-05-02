import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Blog from "./blog.entities";
import Admin from "./admin.entities";
import { Exclude, Expose } from "class-transformer";


@Entity()
class Images {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string

    @Column({ type: 'text'})
    imageUrl!: string

    @Column({ type: 'varchar'})
    imageFormat!: string

    @Column({type: 'varchar', nullable: true})
    imageSection!: string

    @ManyToOne(()=> Blog, blog => blog.images, { nullable: true})
    readonly blog?: Blog

    @ManyToOne(()=> Admin, Admin => Admin.imagesUploaded, {cascade: true})
    uploadedBy!: Admin

    @CreateDateColumn()
    readonly createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

}

export default Images