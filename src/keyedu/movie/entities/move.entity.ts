// movie-info.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

export enum MovieState {
  PAY = 'pay',
  SAMPLE = 'sample',
  OFF = 'off',
}

@Entity('movie_info')
export class MovieInfoEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  movie_no: number;
  @Index()
  @Column({ type: 'smallint', unsigned: true })
  lect_no: number;

  @Index()
  @Column({ type: 'varchar', length: 5, default: '1' })
  movie_listno: string;

  @Column({ type: 'varchar', length: 300 })
  movie_title: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url2: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url3: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url4: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url5: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url6: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url7: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url8: string;

  @Column({ type: 'varchar', length: 128, nullable: true })
  movie_url_new1?: string;

  @Column({ type: 'varchar', length: 128 })
  movie_url_new2: string;

  @Column({ type: 'varchar', length: 128 })
  kollus: string;

  @Column({ type: 'tinyint', unsigned: true, default: 0 })
  movie_time: number;

  @Column({ type: 'varchar', length: 128 })
  upfile_orgname: string;

  @Column({ type: 'varchar', length: 128 })
  upfile_newname: string;

  @Index()
  @Column({ type: 'enum', enum: MovieState, default: MovieState.PAY })
  movie_state: MovieState;

  @Column({ type: 'datetime' })
  reg_date: Date;
}
