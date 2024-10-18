export async function getProduct(sku: string, params: URLSearchParams) {
  return await fetch('https://api.redvitalmakro.com/api/generic/product', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      client: 'sysadmin',
      'secret-key': '7uGBvZm0R5TvZgKmaIDu15hf78TE9zKlEQkXij1ofZgjNAVPJN',
    },
    body: JSON.stringify({
      options: {
        model: 'Product',
        attributes: [
          'sku',
          'name',
          'description',
          'price',
          'reference',
          'mark',
          'categoryId',
          'subCategoryId',
          'lineId',
          'detail',
        ],
        where: {
          "Op.or": {
            sku: sku,
            upc: sku
          }
        },
      },
      data: {
        cache: true,
        branch: params.get('branch') || 'T01',
      }
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data.Product[0]);
}

export async function getProductPromotion(params: URLSearchParams) {
  return await fetch('https://api.redvitalmakro.com/api/generic/product/list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      client: 'sysadmin',
      'secret-key': '7uGBvZm0R5TvZgKmaIDu15hf78TE9zKlEQkXij1ofZgjNAVPJN',
    },
    body: JSON.stringify({
      options: {
        model: 'Product',
        attributes: [
          'sku',
          'name',
          'description',
          'mark',
          'price',
          'reference',
          'mark',
          'categoryId',
          'subCategoryId',
          'lineId',
          'detail',
        ],
        limit: 10
      },
      data: {
        cache: true,
        branch: params.get('branch') || 'T01',
        inOffert: false
      }
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data.Product);
}