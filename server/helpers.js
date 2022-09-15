import jwt from 'jsonwebtoken'
import configs from './configs'

export async function responseHelpers(ctx, next) {
  ctx.resolve = (data) => {
    const response = {
      code: 200,
      data: data || {},
      success: true,
    }

    ctx.status = response.code
    ctx.body = response
  }

  ctx.notFound = (data) => {
    const response = {
      code: 404,
      data: data || {},
      success: false,
    }

    ctx.status = response.code
    ctx.body = response
  }

  ctx.permissionDenied = (data) => {
    const response = {
      code: 403,
      data: data || {},
      success: false,
    }

    ctx.status = response.code
    ctx.body = response
  }

  await next()
}

export function generateTokens(payload) {
  const accessToken = jwt.sign(payload, configs.JWT_ACCESS_SECRET, { expiresIn: '15min' })
  const refreshToken = jwt.sign(payload, configs.JWT_REFRESH_SECRET, { expiresIn: '30d' })
  return {
    accessToken,
    refreshToken,
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

export function authMiddleware(ctx, next) {
  try {
    const authorizationHeader = ctx.headers.authorization
    if (!authorizationHeader) {
      console.log('No authorized user middleware')
      ctx.notFound('No authorized user 401')
      return
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      console.log('No authorized user middleware')
      ctx.notFound('No authorized user 401')
      return
    }

    const userData = validateAccessToken(accessToken)
    if (!userData) {
      console.log('No authorized user middleware')
      ctx.notFound('No authorized user 401')
      return
    }

    ctx.state.user = userData
    next()
  } catch (e) {
    console.log('No authorized user')
    ctx.notFound('No authorized user 401')
  }
}
