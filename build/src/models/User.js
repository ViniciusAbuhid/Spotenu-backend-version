"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoles = exports.User = void 0;
class User {
    constructor(name, email, nickname, approved, description, role) {
        this.name = name;
        this.email = email;
        this.nickname = nickname;
        this.approved = approved;
        this.description = description;
        this.role = role;
    }
    getName() {
        return this.name;
    }
    getEmail() {
        return this.email;
    }
    getNickname() {
        return this.nickname;
    }
    getRole() {
        return this.role;
    }
    getDescription() {
        return this.description;
    }
    getApproval() {
        return this.approved;
    }
}
exports.User = User;
var UserRoles;
(function (UserRoles) {
    UserRoles["OUVINTE_NAO_PAGANTE"] = "OUVINTE N\u00C3O PAGANTE";
    UserRoles["OUVINTE_PAGANTE"] = "OUVINTE PAGANTE";
    UserRoles["BANDA"] = "BANDA";
    UserRoles["ADMIN"] = "ADMIN";
})(UserRoles = exports.UserRoles || (exports.UserRoles = {}));
