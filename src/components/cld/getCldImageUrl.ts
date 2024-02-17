import { constructCloudinaryUrl } from '@cloudinary-util/url-loader';
import type { ImageOptions, ConfigOptions, AnalyticsOptions } from '@cloudinary-util/url-loader';

/**
 * getCldImageUrl
 */

export type GetCldImageUrlOptions = ImageOptions;
export type GetCldImageUrlConfig = ConfigOptions;
export type GetCldImageUrlAnalytics = AnalyticsOptions;

// @deprecated GetCldImageUrl
export interface GetCldImageUrl {
  options: GetCldImageUrlOptions;
  config?: GetCldImageUrlConfig;
  analytics?: GetCldImageUrlAnalytics;
}

export function checkForCloudName(cloudName: string | undefined) {
    if (!cloudName) {
      throw new Error('A Cloudinary Cloud name is required, please make sure PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment.');
    }
  }

export function getCldImageUrl(options: GetCldImageUrlOptions, config?: GetCldImageUrlConfig/* , analytics?: GetCldImageUrlAnalytics */) {
  const cloudName = config?.cloud?.cloudName ??import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME;
  checkForCloudName(cloudName);
  return constructCloudinaryUrl({
    options,
    config: Object.assign({
      cloud: {
        cloudName: cloudName
      },
    }, config),
    // analytics: Object.assign({
    //   sdkCode: NEXT_CLOUDINARY_ANALYTICS_ID,
    //   sdkSemver: NEXT_CLOUDINARY_VERSION,
    //   techVersion: NEXT_VERSION,
    //   feature: ''
    // }, analytics)
  });
}