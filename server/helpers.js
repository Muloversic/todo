export async function responseHelpers(ctx, next) {
  ctx.resolve = (data) => {
    const response = {
      status: 200,
      body: {
        code: 200,
        data: data || {},
        success: true,
      },
    }

    ctx.status = response.status
    ctx.body = response
  }

  ctx.notFound = (data) => {
    const response = {
      status: 404,
      body: {
        code: 404,
        data: data || {},
        success: false,
      },
    }

    ctx.status = response.status
    ctx.body = response
  }

  ctx.permissionDenied = (data) => {
    const response = {
      status: 403,
      body: {
        code: 403,
        data: data || {},
        success: false,
      },
    }

    ctx.status = response.status
    ctx.body = response
  }

  await next()
}
