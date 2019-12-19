import { createSelector } from "reselect";

const selectShopPage = state => state.shoppage;

export const selectShopPageCollections = createSelector(
  [selectShopPage],
  shoppage => shoppage.collections
);

export const selectCollectionsForPreview = createSelector(
  [selectShopPageCollections],
  collections => Object.keys(collections).map(key => collections[key])
);

export const selectCollection = collectionUrlParam =>
  createSelector(
    [selectShopPageCollections],
    collections => collections[collectionUrlParam]
  );