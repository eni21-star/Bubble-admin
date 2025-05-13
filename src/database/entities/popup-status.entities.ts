import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
class PopupStatus {

    @PrimaryGeneratedColumn('uuid')
    id!: string

    @Column({ type: 'boolean', default: false})
    isEnabled!: boolean
}


export default PopupStatus