export const AppConstants = {
  PRODUCT_COLLECTION: 'products',
  TRANSACTION_COLLECTION: 'transactions',
  BARANGAY_COLLECTION: 'barangays',
  SCHEDULES_COLLECTION: 'schedules',
  BOOKING_COLLECTION: 'bookings',
  USER_COLLECTION: 'users',

  PLACEHOLDERS: {
    PRODUCT_PLACEHOLDER: "'https://placehold.co/600x400/orange/white'",
  },
};

export const CaliTourApi = {
  URL: 'http://localhost:1337',
  BASE_URL: 'http://localhost:1337/api',
  SECRET:
    '281b379bdb834d8ce196f4bdd35b10da8d7d934bf5385265ab63bc6623f9d98ba996f6bb789c91bbb451b59014e065aca7c2ca8877091f933c3cbc63ddd56b35343a4050fc9142fdc9e25b524e28b302d49c2cc31991caff8525d8902d3374b0334001434afb28d7967fc381f6ae24fbadc155a63926a3c7a6e6d177356c2f3d',
  STORY: '/story?populate=*',
  ABOUT: '/about?populate=*',
  HERO: '/hero?populate=*',
  DESTINATIONS: '/destinations?=populate=*',
};
