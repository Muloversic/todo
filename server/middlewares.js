import { validateAccessToken } from './helpers'
import { NOTIFICATION_SENT } from './constants'

export async function authMiddleware(ctx, next) {
  try {
    const authorizationHeader = ctx.headers.authorization
    if (!authorizationHeader) {
      console.log('No authorized user middleware')
      ctx.permissionDenied('No authorized user 401')
      return
    }

    const accessToken = authorizationHeader.split(' ')[1]
    if (!accessToken) {
      console.log('No authorized user middleware')
      ctx.permissionDenied('No authorized user 401')
      return
    }

    const userData = validateAccessToken(accessToken)
    if (!userData) {
      console.log('No authorized user middleware')
      ctx.permissionDenied('No authorized user 401')
      return
    }

    ctx.state.user = userData
    await next()
  } catch (e) {
    console.log('No authorized user')
    ctx.notFound('No authorized user 401')
  }
}

export async function responseHelpers(ctx, next) {
  ctx.resolve = (data = {}) => {
    ctx.response.status = 200
    ctx.response.body = {
      code: 200,
      data,
      success: true,
    }
  }

  ctx.notFound = (data = {}) => {
    ctx.response.status = 404
    ctx.response.body = {
      code: 404,
      data,
      success: false,
    }
  }

  ctx.permissionDenied = (data = {}) => {
    ctx.response.status = 401
    ctx.response.body = {
      code: 4041,
      data,
      success: false,
    }
  }

  ctx.noAccess = (data = {}) => {
    ctx.response.status = 403
    ctx.response.body = {
      code: 403,
      data,
      success: false,
    }
  }

  await next()
}

export function sendEvent(client) {
  return async (ctx, next) => {
    ctx.sendEvent = (event, creator) => {
      client.to(creator._id).emit(NOTIFICATION_SENT, event)
    }

    await next()
  }
}
