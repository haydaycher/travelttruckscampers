export const initialState = {
  locations: [],
  forms: [],
  availableAmenities: [],
  trucks: [],
  truck: {
    name: '',
    rating: 0,
    reviews: [],
    location: '',
    price: 0,
    gallery: [],
    description: '',
  },
  isLoading: false,
  error: null,
  filters: {
    availableAmenities: [],
    form: '',
    location: '',
  },
  favs: [],
};
