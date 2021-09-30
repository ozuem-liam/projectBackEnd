import jwt from 'jsonwebtoken';

export const accessSecret =
  'eb9f758fbb9fd95965884a39234166d7:tpb30797e5837b18d5eafe372a24b0eae40f6f576323b35d6eaa31bc3df30c2a31';

export function jwtTokens({ id }) {
  const customer = { id };
  const accessToken = jwt.sign(customer, accessSecret, {
    expiresIn: 3 * 86400,
  });
  return { accessToken };
}
