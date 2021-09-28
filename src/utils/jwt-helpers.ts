import jwt from 'jsonwebtoken';

export const accessSecret = 'htbknsb9y3892hidsonc9i83';

export function jwtTokens({id}) {
    const customer = {id};
    const accessToken = jwt.sign(customer, accessSecret, {expiresIn: 3 * 86400});   
    return ({accessToken});
}

