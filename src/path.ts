/**
 * Check if a param route path matches a given check path, supporting optional parameters
 * 检查参数路由路径是否匹配给定的检查路径，支持可选参数
 *
 * @param routePath - Route path with params (e.g., '/user/:id/profile' or '/user/:id?')
 * @param checkPath - Path to check (e.g., '/user/123/profile')
 */
export const isMatchParamRoute = (routePath: string, checkPath: string) => {
  const routeSegments = routePath.split('/').filter(Boolean);
  const checkPathSegments = checkPath.split('/').filter(Boolean);

  // 检查路径的最小长度要求（必需参数的数量）
  const requiredCount = routeSegments.filter(seg => !seg.endsWith('?')).length;
  if (checkPathSegments.length < requiredCount) {
    return false;
  }

  // 检查路径的最大长度限制
  if (checkPathSegments.length > routeSegments.length) {
    return false;
  }

  // 逐段匹配
  for (let i = 0; i < checkPathSegments.length; i++) {
    const routeSegment = routeSegments[i];
    const checkSegment = checkPathSegments[i];

    const isParam = routeSegment.startsWith(':');
    // 如果是参数（包括可选参数），匹配任意值
    if (isParam) {
      continue;
    }

    // 静态段必须完全匹配
    if (routeSegment !== checkSegment) {
      return false;
    }
  }

  return true;
};
