const CrudRepository = require("./crud.repository");
const { User, Role }  = require("../models")

class UserRepository extends CrudRepository {
    constructor() {
        super(User);
    }

    async getUserByEmail(email) {
        const user = await User.findOne({
            where: {
                email: email,
            },
            include:  [
                {
                    model: Role,
                    as: "role",
                    attributes: ["name"],
                }
            ]
        });
        return user;
    }
}

module.exports = UserRepository;