import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET_KEY || "default-secret-key";

export const generateJwt = async (payload) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" }, (err, res) => {
            if (err) {
                console.log(err);
                reject("Not generate JWT");
            }
            resolve(res);
        })
    })
};

export const verifyJwt = (token: string) => {
    if (!token) {
        throw new Error("Not authorized");
    }

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        return decoded;
    } catch (error) {
        console.log(error);
        throw new Error("Invalid JWT");
    }
};