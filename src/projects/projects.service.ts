import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createProjectDto: CreateProjectDto) {
    try {
      return await this.prisma.project.create({
        data: createProjectDto,
      });
    } catch (error) {
      throw new InternalServerErrorException('Error creating project');
    }
  }

  async findAll() {
    try {
      return await this.prisma.project.findMany();
    } catch (error) {
      throw new InternalServerErrorException('Error retrieving projects');
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.project.findUnique({
        where: { id },
        include: {
          manager: true,
          engineer: true,
        },
      });
    } catch (error) {
      throw new NotFoundException('Project not found');
    }
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    try {
      return await this.prisma.project.update({
        where: { id },
        data: updateProjectDto,
      });
    } catch (error) {
      throw new NotFoundException('Project not found');
    }
  }

  async remove(id: number) {
    try {
      await this.prisma.project.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException('Project not found');
    }
  }

  async findProjectsForUser(userId: number) {
    try {
      return await this.prisma.project.findMany({
        where: {
          OR: [{ managerId: userId }, { engineerId: userId }],
        },
      });
    } catch (error) {
      throw new NotFoundException('User not found');
    }
  }
}
