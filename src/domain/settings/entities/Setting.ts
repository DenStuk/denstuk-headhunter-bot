import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CurrencyType } from "../../shared/enums/CurrencyType";
import { User } from "../../users/entities/User";

@Entity()
export class Setting {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column("json")
    public keywords!: { words: string[] }

    @Column("enum")
    public currency!: CurrencyType;

    @Column("float")
    public salaryFrom!: number;

    @Column("float")
    public salaryTo!: number;

    @ManyToOne(type => User, user => user.settings)
    public user!: User;

}