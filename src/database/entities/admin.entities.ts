import 'reflect-metadata'
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import RefreshToken from './refresh-token.entities';
import Blog from './blog.entities';
import Images from './images.entities';

enum AdminRoles {
    admin='ADMIN',
    superAdmin='SUPERADMIN'
}

@Entity()
class Admin {

    @PrimaryGeneratedColumn('uuid')
    readonly id!: string;
  
    @Column({unique: true, type: 'varchar'})
    email!: string;
  
    @Column({type: 'varchar'})
    username!: string;
  
    @Column({type: 'varchar', select: false})
    password!: string;
  
    @Column({type: 'varchar', enum: AdminRoles})
    role!: string

    @Column({type: 'jsonb', nullable: true})
    permissions?: Array<string>

    @OneToMany(()=> RefreshToken, refreshToken => refreshToken.admin)
    refreshTokens?: RefreshToken[]

    @OneToMany(()=> Blog, blog => blog.createdBy)
    blogs?: Blog[]

    @ManyToOne(() => Admin, admin => admin.invitedUsers, { nullable: true })
    invitedBy?: Admin;

    @OneToMany(() => Admin, (admin) => admin.invitedBy)
    invitedUsers?: Admin[];
    
    @Column({type: 'varchar', nullable: true})
    invitationToken?: string

    @Column({ type: 'boolean', default: false})
    invitationTokenUsed?: boolean

    @Column({type: 'boolean', nullable: true})
    isAvailable!: boolean 

    @OneToMany(()=> Images, image=> image.uploadedBy)
    imagesUploaded?: Images[]
    
    @CreateDateColumn()
    dateCreated!: Date;
  
}

export default Admin