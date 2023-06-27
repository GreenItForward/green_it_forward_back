import { Project } from "@/api/project/project.entity";
import { User } from "@/api/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StatsService {

    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Project)
        private projectRepository: Repository<Project>,
    ) { }

    async getTotalUsers(): Promise<number> {
        return this.userRepository.count();
    }

    async getTotalProjects(): Promise<number> {
        return this.projectRepository.count();
    }

    async getTotalDonations() {
        // TODO : implement this method
        return 0;
    }

    async getUsersPerMonth() : Promise<{[key: string]: number}> {
        const users = await this.userRepository.find();
        const usersPerMonth = {};
    
        users.forEach(user => {
            if (user.firstLoginAt !== null) {
                const month = user.firstLoginAt.toLocaleString('default', { month: 'long' });
    
                if (usersPerMonth[month]) {
                    usersPerMonth[month]++;
                } else {
                    usersPerMonth[month] = 1;
                }
            }
        });
    
        return usersPerMonth;
    }
    
}