export interface Destination {
  name: string;
  summary: string;
  description: string;
  category: string;
  thumbnail: string;
  gallery: string[];
}

export function toDestination(data: any): Destination {
  return {
    name: data.name,
    summary: data.summary,
    description: data.description,
    category: data.category,
    thumbnail: data.thumbnail?.url || '',
    gallery: Array.isArray(data.gallery)
      ? data.gallery.map((img: any) => img?.url ?? '')
      : [],
  };
}

export const swissDestinations: Destination[] = [
  {
    name: 'Matterhorn Hiking',
    summary: 'Iconic alpine adventure in Zermatt.',
    description:
      'Embark on a breathtaking hike around the Matterhorn, Switzerland’s most famous peak. Trails range from beginner-friendly walks to challenging alpine routes, offering panoramic views of glaciers and valleys.',
    category: 'Outdoor Adventure',
    thumbnail: 'https://placehold.co/600x400',
    gallery: [
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
    ],
  },
  {
    name: 'Lake Geneva Cruise',
    summary: 'Relaxing boat ride across Lake Geneva.',
    description:
      'Enjoy a scenic cruise on Lake Geneva, surrounded by vineyards, medieval castles, and the Alps. Perfect for a peaceful day trip with opportunities to stop at charming lakeside towns.',
    category: 'Leisure',
    thumbnail: 'https://placehold.co/600x400',
    gallery: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
  },
  {
    name: 'Swiss Chocolate Workshop',
    summary: 'Hands-on experience with master chocolatiers.',
    description:
      'Learn the art of Swiss chocolate-making in Zurich. Guided by expert chocolatiers, you’ll craft your own pralines and discover the history behind Switzerland’s sweetest tradition.',
    category: 'Culinary',
    thumbnail: 'https://placehold.co/600x400',
    gallery: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
  },
  {
    name: 'Jungfraujoch – Top of Europe',
    summary: 'A train journey to Europe’s highest railway station.',
    description:
      'Ride the cogwheel train to Jungfraujoch, perched at 3,454 meters. Explore the Ice Palace, enjoy views of the Aletsch Glacier, and experience the thrill of being at the ‘Top of Europe’.',
    category: 'Sightseeing',
    thumbnail: 'https://placehold.co/600x400',
    gallery: [
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
      'https://placehold.co/600x400',
    ],
  },
  {
    name: 'Lucerne Old Town Tour',
    summary: 'Discover medieval charm in Lucerne.',
    description:
      'Stroll through Lucerne’s cobblestone streets, visit the Chapel Bridge, and admire the colorful frescoed buildings. A guided tour reveals the city’s rich history and vibrant culture.',
    category: 'Culture & History',
    thumbnail: 'https://placehold.co/600x400',
    gallery: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
  },
];
