import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid", { name: "user_id" })
  userId: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  name: string;

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string;

  @Column({ name: "deleted_at", type: "timestamp", nullable: true })
  deletedAt: Date;
}
