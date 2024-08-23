import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create a new user with roles
  async create(createUserDto: CreateUserDto) {
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      address,
      kraPin,
      roleIds,
    } = createUserDto;

    // Hash the user's password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user in the database
    return this.prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        phone,
        address,
        kraPin,
        roles: {
          connect: roleIds.map((id) => ({ id })),
        },
      },
      include: { roles: true },
    });
  }

  // Find all users
  async findAll() {
    return this.prisma.user.findMany({
      include: {
        roles: true,
        managedProjects: true,
        assignedProjects: true,
      },
    });
  }

  // Find a user by ID
  async findOne(id: number) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: true,
        managedProjects: true,
        assignedProjects: true,
      },
    });
  }

  // Find a user by email
  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: {
        roles: true,
        managedProjects: true,
        assignedProjects: true,
      },
    });
  }

  // Update a user's details
  async update(id: number, updateUserDto: UpdateUserDto) {
    const { roleIds, ...rest } = updateUserDto;

    return this.prisma.user.update({
      where: { id },
      data: {
        ...rest,
        roles: {
          set: roleIds ? roleIds.map((id) => ({ id })) : undefined,
        },
      },
      include: { roles: true },
    });
  }

  // Delete a user
  async remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }

  // Assign roles to a user
  async assignRoles(userId: number, roleIds: number[]) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        roles: {
          set: roleIds.map((id) => ({ id })),
        },
      },
      include: { roles: true },
    });
  }
}
