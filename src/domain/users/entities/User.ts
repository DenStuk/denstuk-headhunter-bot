import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Setting } from "../../settings/entities/Setting";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column("varchar", { length: 100 })
    public name!: string;

    @Column("varchar", { length: 100 })
    public telegramId!: string;

    @OneToMany(type => Setting, setting => setting.user)
    public settings!: Setting[];

}