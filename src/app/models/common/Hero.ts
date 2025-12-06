import { CaliTourApi } from '../../common/utils/Constants';

export interface Hero {
  title: string;
  description: string;
  carousel: string[]; //all large image urls
}

export function toHero(apiResponse: any): Hero {
  const data = apiResponse?.data;

  const title = data?.title ?? '';
  const description = data?.description ?? '';

  const carousel: string[] = (data?.carousel ?? [])
    .map((item: any) => {
      if (item?.formats?.large?.url) {
        return `${CaliTourApi.URL}${item.formats.large.url}`;
      }
      if (item?.url) {
        return `${CaliTourApi.URL}${item.url}`;
      }
      return '';
    })
    .filter((url: string) => url !== '');

  return {
    title,
    description,
    carousel,
  };
}
