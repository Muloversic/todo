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
  ctx.resolve = (data) => {
    const response = {
      code: 200,
      ...data,
      success: true,
    }

    ctx.status = response.code
    ctx.response.body = response
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
      code: 401,
      data: data || {},
      success: false,
    }

    ctx.status = response.code
    ctx.body = response
  }

  ctx.noAccess = (data) => {
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

export function sendEvent(client) {
  return async (ctx, next) => {
    ctx.sendEvent = (event, data) => {
      const { _id } = data.creator
      client.to(_id).emit(NOTIFICATION_SENT, event)
      console.log(client.sockets.adapter.rooms, 'event sent')
    }

    await next()
  }
}
