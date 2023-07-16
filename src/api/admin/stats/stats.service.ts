import { StripeService } from './../../stripe/stripe.config';
import { Project } from "@/api/project/project.entity";
import { Payment } from "@/api/stripe/stripe.entity";
import { User } from "@/api/user/user.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class StatsService {
    @InjectRepository(User)
    private readonly userRepository: Repository<User>;
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>;

    constructor(
    ) { }

    async getTotalUsers(): Promise<number> {
        return this.userRepository.count();
    }

    async getTotalProjects(): Promise<number> {
        return this.projectRepository.count();
    }

    async getTotalDonations() {
        const projects = await this.projectRepository.find();
        let totalDonations = 0;

        projects.forEach(project => {
            totalDonations += project.amountRaised;
        });

        return totalDonations;
    }

    async getUsersPerMonth(year: number): Promise<{[key: string]: number}> {
        const users = await this.userRepository.find();
        const usersPerMonth = {};
    
        const monthOrder = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre","novembre", "décembre"];
    
        users.forEach(user => {
            if (user.firstLoginAt !== null) {
                const dateYear = user.firstLoginAt.getFullYear();
                const month = user.firstLoginAt.toLocaleString('default', { month: 'long' });
    
                if (year === dateYear) {
                    if (usersPerMonth[month]) {
                        usersPerMonth[month]++;
                    } else {
                        usersPerMonth[month] = 1;
                    }
                }
            }
        });
    
        const orderedUsersPerMonth = {};
        monthOrder.forEach(key => {
            if(usersPerMonth[key]) {
                orderedUsersPerMonth[key] = usersPerMonth[key];
            }
        });

        if (Object.keys(orderedUsersPerMonth).length === 0) {
            orderedUsersPerMonth["Aucune donnée"] = 0;
        }
    
        return orderedUsersPerMonth;
    }
    
    
}