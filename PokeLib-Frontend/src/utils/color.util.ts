import { usePokemonStore } from '@/stores/pokemon';

const { getTypeFromId } = usePokemonStore();

export const getBackgroundColor = (type1: number, type2?: number) => {
  return `linear-gradient(90deg, ${getTypeFromId(type1)?.color}, ${
    type2 ? getTypeFromId(type2)?.color : getTypeFromId(type1)?.color
  })`;
};
