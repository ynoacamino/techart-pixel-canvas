import { IsInt, IsHexColor } from 'class-validator';

export class UpdateCellDto {
  @IsInt()
  x: number;

  @IsInt()
  y: number;

  @IsHexColor()
  color: string;
}
export type Board = string[][];
