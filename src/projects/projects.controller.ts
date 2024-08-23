import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../auth/roles.enum';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.ProjectManager)
  async create(@Body() createProjectDto: CreateProjectDto) {
    try {
      const project = await this.projectsService.create(createProjectDto);
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Project created successfully',
        data: project,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error creating project');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.ProjectManager)
  async findAll() {
    try {
      const projects = await this.projectsService.findAll();
      return {
        statusCode: HttpStatus.OK,
        message: 'Projects retrieved successfully',
        data: projects,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving projects');
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.ProjectManager, UserRole.Engineer)
  async findOne(@Param('id') id: string) {
    try {
      const project = await this.projectsService.findOne(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Project retrieved successfully',
        data: project,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving project');
    }
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin, UserRole.ProjectManager)
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    try {
      const updatedProject = await this.projectsService.update(
        +id,
        updateProjectDto,
      );
      return {
        statusCode: HttpStatus.OK,
        message: 'Project updated successfully',
        data: updatedProject,
      };
    } catch (error) {
      throw new InternalServerErrorException('Error updating project');
    }
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    try {
      await this.projectsService.remove(+id);
      return {
        statusCode: HttpStatus.OK,
        message: 'Project deleted successfully',
      };
    } catch (error) {
      throw new InternalServerErrorException('Error deleting project');
    }
  }
}
