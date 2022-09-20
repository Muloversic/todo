import jwt from 'jsonwebtoken'
import configs from './configs'

export function generateTokens(payload, isNewRefresh) {
  const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, { expiresIn: '15s' })
  if (isNewRefresh) {
    const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken,
    }
  }

  return {
    accessToken,
  }
}

export function validateAccessToken(token) {
  try {
    const userData = jwt.verify(token, configs.JWT_ACCESS_SECRET)
    return userData
  } catch (e) {
    return null
  }
}

export function validateRefreshToken(token) {
  try {
    const userData = jwt.verify(token, configs.JWT_REFRESH_SECRET)
    return userData
  } catch (e) {
    return null
  }
}
