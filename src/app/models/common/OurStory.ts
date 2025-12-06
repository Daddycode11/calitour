import { CaliTourApi } from '../../common/utils/Constants';

export interface Story {
  title: string;
  description: string;
  image: string;
}

export function toStory(apiResponse: any): Story {
  const data = apiResponse?.data;

  const title = data?.header?.title ?? '';
  const description = data?.header?.body ?? '';

  // Always prefer large format, fallback to original url
  const image = `${CaliTourApi.URL}${data.image.url}`;

  return { title, description, image };
}
