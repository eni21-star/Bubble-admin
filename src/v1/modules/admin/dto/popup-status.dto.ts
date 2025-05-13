import { IsBoolean } from "class-validator";



class PopupStatusDto {

    @IsBoolean()
    status!: boolean

}

export default PopupStatusDto