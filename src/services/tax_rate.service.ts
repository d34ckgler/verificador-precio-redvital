export async function getTaxRate() {
  return await fetch('https://api.redvitalmakro.com/api/general/rate?force=1&currency=BC%24', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      client: 'sysadmin',
      'secret-key': '7uGBvZm0R5TvZgKmaIDu15hf78TE9zKlEQkXij1ofZgjNAVPJN',
    }
  })
    .then((res) => res.json())
    .then((json) => json.data);
}
