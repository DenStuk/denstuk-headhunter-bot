import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CurrencyType } from "../../shared/enums/currency-type";
import { User } from "../../users/entities/user.entity";

@Entity("settings")
export class Setting {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("simple-array")
    public keywords: string[]

    @Column("enum", { nullable: false, enum: CurrencyType })
    public currency: CurrencyType;

    @Column("varchar", { nullable: false })
    public address: string;

    @Column("float")
    public salaryFrom: number;

    @Column("float", { nullable: true })
    public salaryTo: number;

    @ManyToOne(type => User, user => user.settings)
    public user: User;

}