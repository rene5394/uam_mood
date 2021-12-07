import { ApplicationException } from "../common/exceptions/application.exception";
import { UserCreateDto, UserUpdateDto } from "../dtos/user.dto";
import { User } from "./repositories/domain/user";
import { UserRepository } from "./repositories/user.repository";

export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    public async find(id: number): Promise<User | null> {
        return await this.userRepository.find(id);
    }

    public async all(): Promise<User[]> {
        return await this.userRepository.all();
    }

    public async store(entry: UserCreateDto): Promise<void> {
        const originalEntry = await this.userRepository.findByEmail(entry.email);

        if (!originalEntry) {
            await this.userRepository.store(entry as User);
        } else {
            throw new ApplicationException('User already exists.');
        }
    }

    public async update(id: number, entry: UserUpdateDto): Promise<void> {
        let originalEntry = await this.userRepository.find(id);

        if (originalEntry) {
            originalEntry.firstname = entry.firstname;
            originalEntry.lastname = entry.lastname;
            originalEntry.email = entry.email;

            await this.userRepository.update(id, originalEntry);
        } else {
            throw new ApplicationException('Subscription not found.');
        }
    }
}