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
