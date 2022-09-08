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
