export async function getTaxRate(sku: string) {
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
        'upc',
        'name',
        'description',
        'price',
        'tax',
        'um',
        'detail',
        'created_at',
        'updated_at',
      ],
      branch: 'T01',
      where: {
        sku: sku,
      },
    }),
  })
    .then((res) => res.json())
    .then((json) => json.data[0]);
}
