import { ApiProperty } from "@nestjs/swagger";
import { Project } from "../project/project.entity";
import { IsNotEmpty } from "class-validator";
import { ProjectDto } from "../project/project.dto";

export class GeneratePdfDto {
    @ApiProperty({ type: () => ProjectDto })
    @IsNotEmpty()
    public readonly project: ProjectDto
}