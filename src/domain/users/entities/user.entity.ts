import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Setting } from "../../settings/entities/setting.entity";
import { Roles } from "../../shared/enums/roles";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column("varchar", { length: 100, nullable: false })
    public name: string;

    @Column("varchar", { length: 100, unique: true, nullable: false })
    public telegramId: string;

    @Column("enum", { nullable: false, enum: Roles, default: Roles.USER })
    public role: Roles;

    @OneToMany(type => Setting, setting => setting.user, { onDelete: "CASCADE" })
    public settings: Setting[];

    @Column("varchar", { nullable: true })
    public telegramState: string;

    @Column("simple-json", { nullable: true })
    public telegramObject: string;

}