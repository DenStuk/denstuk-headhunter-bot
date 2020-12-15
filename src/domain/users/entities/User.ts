import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Setting } from "../../settings/entities/Setting";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column("varchar", { length: 100, nullable: false })
    public name!: string;

    @Column("varchar", { length: 100, unique: true, nullable: false })
    public telegramId!: string;

    @OneToMany(type => Setting, setting => setting.user)
    public settings: Setting[];

}