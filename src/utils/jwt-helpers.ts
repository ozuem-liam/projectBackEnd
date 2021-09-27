import jwt from 'jsonwebtoken';

export const accessSecret = 'htbknsb9y3892hidsonc9i83';
export const refreshSecret = 'htdvsdefwnsb9y38erg92evwdvse';

export function jwtTokens({id}) {
    const customer = {id};
    const accessToken = jwt.sign(customer, accessSecret, {expiresIn: 3 * 86400});   
    // const refreshToken = jwt.sign(customer, refreshSecret, {expiresIn:'20m'});   
    return ({accessToken});
}

