import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Admin from "./admin.entities";


@Entity()
class RefreshToken {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'varchar'})
    token!: string

    @ManyToOne(() => Admin, admin => admin.refreshTokens, { onDelete: 'CASCADE'})
    admin!: Admin

    @Column({ type: 'boolean', default: false})
    tokenUsed!: boolean

    @Column({ type: 'timestamptz'})
    expiresAt!: Date

    @CreateDateColumn()
    createdAt!: Date;
  
    @UpdateDateColumn()
    updatedAt!: Date;
}

export default RefreshToken