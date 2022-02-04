const UserModel = require('../models/user-model');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const mailService = require('../service/mail-service');
const tokenService = require('../service/token-service');
const UserDto = require('../dtos/user-dto');
const ApiError = require('../exceptions/api-error');

class UserService {
    async registration(email, password) {
        const candidate = await UserModel.findOne(email);

        if(candidate) {
            throw ApiError.BadRequest(`User with ${email} email already exist`);
        }

        const hashPassword = await bcrypt.hash(password, 3);
        const activationLink = uuid.v4();
        const user = await UserModel.create({email, password: hashPassword, activationLink});
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }

    async activate(activationLink) {
        const user = await UserModel.findOne({ activationLink });
        if(!user) {
            throw ApiError.BadRequest('Activation Link not correctly')
        }
        user.isActivated = true;
        await user.save();
    }

    async login(email, password) {
        const user = await UserModel.findOne({email});

        if(!user) {
            throw ApiError.BadRequest(`User with ${email} email not found`);
        }

        const isPassEquals = await bcrypt.compare(password, user.password);

        if(!isPassEquals) {
            throw ApiError.BadRequest('Wrong Password')
        }
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        };
    }
}

module.exports = new UserService();