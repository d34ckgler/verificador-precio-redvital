export async function getProduct(sku: string, params: URLSearchParams) {
  return await fetch('https://api.redvitalmakro.com/api/oasis/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      client: 'sysadmin',
      'secret-key': '7uGBvZm0R5TvZgKmaIDu15hf78TE9zKlEQkXij1ofZgjNAVPJN',
    },
    body: JSON.stringify({
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
      branch: params.get('branch') || 'T01',
      where: {
        sku: sku,
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data.Product[0]);
}
